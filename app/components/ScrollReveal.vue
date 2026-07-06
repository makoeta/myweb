<script lang="ts" setup>
// Reveals its content with a fade + upward slide once it scrolls into view.
// Dependency-free (native IntersectionObserver) and SSR-safe: the markup is
// always rendered (good for crawlers), only its opacity/transform animate in.
withDefaults(
  defineProps<{
    // stagger delay in ms, e.g. for cascading a list of cards
    delay?: number;
    // element tag to render as
    as?: string;
  }>(),
  { delay: 0, as: "div" }
);

const el = ref<HTMLElement | null>(null);
const visible = ref(false);
let observer: IntersectionObserver | null = null;

onMounted(() => {
  // no IntersectionObserver (or it's already in view on load) → show immediately
  if (typeof IntersectionObserver === "undefined") {
    visible.value = true;
    return;
  }
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          visible.value = true;
          observer?.disconnect();
        }
      }
    },
    { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
  );
  if (el.value) observer.observe(el.value);
});

onBeforeUnmount(() => observer?.disconnect());
</script>

<template>
  <component
    :is="as"
    ref="el"
    class="reveal motion-reduce:translate-y-0! motion-reduce:opacity-100! motion-reduce:transition-none!"
    :class="{ 'reveal--visible': visible }"
    :style="{ transitionDelay: `${delay}ms` }"
  >
    <slot />
  </component>
</template>

<style scoped>
.reveal {
  opacity: 0;
  transform: translateY(2rem);
  transition:
    opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
  will-change: opacity, transform;
}
.reveal--visible {
  opacity: 1;
  transform: translateY(0);
}
</style>
