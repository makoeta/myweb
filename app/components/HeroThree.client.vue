<script setup lang="ts">
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";

const container = ref<HTMLDivElement | null>(null);
const colorMode = useColorMode();

let renderer: THREE.WebGLRenderer | undefined;
let composer: EffectComposer | undefined;
let bloomPass: UnrealBloomPass | undefined;
let scene: THREE.Scene | undefined;
let camera: THREE.PerspectiveCamera | undefined;
let group: THREE.Group | undefined;
let outer: THREE.LineSegments | undefined;
const materials: THREE.Material[] = [];
const geometries: THREE.BufferGeometry[] = [];

let raf = 0;
let initialized = false;
let resizeObserver: ResizeObserver | undefined;
let intersectionObserver: IntersectionObserver | undefined;

// honor the user's motion preference and pause work when the hero scrolls away
let reducedMotion = false;
let visible = true;

// pointer parallax (normalized -1..1) + eased target
const pointer = { x: 0, y: 0 };
const target = { x: 0, y: 0 };

// scroll progress (0 at top, 1 after one viewport) eased toward target
let scrollTarget = 0;
let scrollEased = 0;

let spin = 0;

function themeColor(): THREE.Color {
  // Nuxt UI exposes --ui-primary as oklch(), which THREE.Color can't parse.
  // Let the browser resolve it to rgb() via a probe element instead.
  const probe = document.createElement("span");
  probe.style.cssText = "color:var(--ui-primary);display:none";
  document.body.appendChild(probe);
  const resolved = getComputedStyle(probe).color;
  probe.remove();
  const m = resolved.startsWith("rgb") ? resolved.match(/[\d.]+/g) : null;
  if (m && m.length >= 3) {
    return new THREE.Color(
      Number(m[0]) / 255,
      Number(m[1]) / 255,
      Number(m[2]) / 255
    );
  }
  return new THREE.Color("#10b981"); // emerald fallback (matches green theme)
}

function buildObject() {
  const color = themeColor();
  group = new THREE.Group();

  const core = new THREE.IcosahedronGeometry(1.6, 1);
  geometries.push(core);

  // main wireframe edges
  const wireGeo = new THREE.WireframeGeometry(core);
  geometries.push(wireGeo);
  const wireMat = new THREE.LineBasicMaterial({
    color,
    transparent: true,
    opacity: 0.55,
  });
  materials.push(wireMat);
  group.add(new THREE.LineSegments(wireGeo, wireMat));

  // glowing vertices
  const dotMat = new THREE.PointsMaterial({
    color,
    size: 0.09,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.95,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  materials.push(dotMat);
  group.add(new THREE.Points(core, dotMat));

  // faint outer ghost shell, counter-rotating for depth
  const outerGeo = new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(2.15, 1));
  geometries.push(outerGeo);
  const outerMat = new THREE.LineBasicMaterial({
    color,
    transparent: true,
    opacity: 0.12,
  });
  materials.push(outerMat);
  outer = new THREE.LineSegments(outerGeo, outerMat);
  group.add(outer);

  scene!.add(group);
}

function applyThemeColor() {
  const color = themeColor();
  for (const m of materials) {
    (m as THREE.LineBasicMaterial | THREE.PointsMaterial).color = color;
  }
}

// render a single static frame — used for reduced-motion and after resizes
function renderFrame() {
  if (!renderer || !scene || !camera) return;
  if (composer) composer.render();
  else renderer.render(scene, camera);
}

function startLoop() {
  if (reducedMotion || !initialized || !visible || raf) return;
  raf = requestAnimationFrame(animate);
}

function stopLoop() {
  cancelAnimationFrame(raf);
  raf = 0;
}

function animate() {
  raf = requestAnimationFrame(animate);

  scrollEased += (scrollTarget - scrollEased) * 0.06;
  target.x += (pointer.x - target.x) * 0.05;
  target.y += (pointer.y - target.y) * 0.05;

  spin += 0.0025 + scrollEased * 0.02; // scroll spins it faster

  if (group) {
    group.rotation.y = spin + target.x * 0.5;
    group.rotation.x = target.y * 0.4 + scrollEased * 0.4;
  }
  if (outer) outer.rotation.y = -spin * 0.7; // counter-rotate the shell

  if (camera) {
    camera.position.z = 5 + scrollEased * 3.5; // scroll pulls back
    camera.position.x = target.x * 0.4;
    camera.position.y = target.y * 0.4;
    camera.lookAt(0, 0, 0);
  }

  composer!.render();
}

function tryInit() {
  if (initialized || !container.value) return;
  const w = container.value.clientWidth;
  const h = container.value.clientHeight;
  if (w === 0 || h === 0) return; // not laid out yet — observer will retry
  initialized = true;

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(55, w / h, 0.1, 100);
  camera.position.set(0, 0, 5);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(w, h);
  container.value.appendChild(renderer.domElement);

  // recover gracefully if the GPU drops the context (tab switches, etc.)
  renderer.domElement.addEventListener("webglcontextlost", onContextLost);
  renderer.domElement.addEventListener("webglcontextrestored", onContextRestored);

  // bloom post-processing so the additive vertices actually glow
  composer = new EffectComposer(renderer);
  composer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  composer.setSize(w, h);
  composer.addPass(new RenderPass(scene, camera));
  bloomPass = new UnrealBloomPass(
    new THREE.Vector2(w, h),
    0.85, // strength
    0.6, // radius
    0.15 // threshold — only the bright dots/edges bloom
  );
  composer.addPass(bloomPass);
  composer.addPass(new OutputPass());

  buildObject();
  if (reducedMotion) {
    // draw a single, gently-angled frame and stop — no continuous animation
    if (group) group.rotation.set(0.25, 0.5, 0);
    renderFrame();
  } else {
    startLoop();
  }
}

function onContextLost(e: Event) {
  e.preventDefault();
  cancelAnimationFrame(raf);
}

function onContextRestored() {
  if (reducedMotion) renderFrame();
  else startLoop();
}

function onResize() {
  if (!initialized) {
    tryInit();
    return;
  }
  if (!renderer || !camera || !container.value) return;
  const { clientWidth: w, clientHeight: h } = container.value;
  if (w === 0 || h === 0) return;
  renderer.setSize(w, h);
  composer?.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  if (!raf) renderFrame(); // keep the static frame correct while paused
}

function onPointerMove(e: PointerEvent) {
  pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
}

function onScroll() {
  scrollTarget = Math.min(window.scrollY / window.innerHeight, 1);
}

watch(
  () => colorMode.value,
  () => {
    if (!initialized) return;
    applyThemeColor();
    if (!raf) renderFrame(); // repaint the static frame while paused
  }
);

const motionQuery =
  typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)")
    : undefined;

function onMotionPreferenceChange() {
  reducedMotion = !!motionQuery?.matches;
  if (reducedMotion) {
    stopLoop();
    if (group) group.rotation.set(0.25, 0.5, 0);
    renderFrame();
  } else {
    startLoop();
  }
}

let started = false;

// Attach the ResizeObserver + kick init. This needs the container element,
// which — on SSR hydration inside <ClientOnly>/Suspense — is NOT yet bound to
// the template ref when onMounted fires. So we call this both from onMounted
// (client-nav case, ref already set) and from a watcher on the ref (hard-reload
// case, ref populates a tick later). Runs at most once.
function start() {
  if (started || !container.value) return;
  started = true;

  resizeObserver = new ResizeObserver(onResize);
  resizeObserver.observe(container.value);

  // also try once after paint, in case the observer hasn't fired yet
  requestAnimationFrame(() => requestAnimationFrame(tryInit));
  tryInit();
}

watch(container, () => start());

onMounted(() => {
  reducedMotion = !!motionQuery?.matches;
  motionQuery?.addEventListener("change", onMotionPreferenceChange);

  onScroll();
  window.addEventListener("resize", onResize);
  // parallax + scroll-driven motion are pointless under reduced motion
  if (!reducedMotion) {
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // pause the render loop whenever the hero is scrolled out of view
  if (container.value) {
    intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visible = !!entry?.isIntersecting;
        if (visible) startLoop();
        else stopLoop();
      },
      { threshold: 0 }
    );
    intersectionObserver.observe(container.value);
  }

  start();
});

onBeforeUnmount(() => {
  cancelAnimationFrame(raf);
  resizeObserver?.disconnect();
  intersectionObserver?.disconnect();
  motionQuery?.removeEventListener("change", onMotionPreferenceChange);
  window.removeEventListener("resize", onResize);
  window.removeEventListener("pointermove", onPointerMove);
  window.removeEventListener("scroll", onScroll);
  renderer?.domElement.removeEventListener("webglcontextlost", onContextLost);
  renderer?.domElement.removeEventListener("webglcontextrestored", onContextRestored);
  for (const g of geometries) g.dispose();
  for (const m of materials) m.dispose();
  bloomPass?.dispose();
  composer?.dispose();
  renderer?.dispose();
  if (renderer?.domElement && container.value?.contains(renderer.domElement)) {
    container.value.removeChild(renderer.domElement);
  }
});
</script>

<template>
  <div ref="container" class="absolute inset-0 h-full w-full" aria-hidden="true" />
</template>
