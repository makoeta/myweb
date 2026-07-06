<script setup lang="ts">
// Character-scramble "decrypt" reveal: each glyph cycles through random
// symbols before settling into the final character, left to right.
// Used for the hero headline and the rotating role line.
const props = withDefaults(
  defineProps<{
    // the text to resolve to
    text: string;
    // ms between scramble frames
    interval?: number;
    // how many frames each character scrambles before locking
    cyclesPerChar?: number;
    // delay before the animation starts (ms)
    delay?: number;
    // re-run the reveal whenever `text` changes (for rotating words)
    watchText?: boolean;
  }>(),
  { interval: 35, cyclesPerChar: 8, delay: 0, watchText: false }
);

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!<>-_\\/[]{}=+*^?#";

const display = ref(props.text);
let frame = 0;
let timer: ReturnType<typeof setInterval> | undefined;
let startTimer: ReturnType<typeof setTimeout> | undefined;
let reducedMotion = false;

function randGlyph() {
  return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
}

function run() {
  const target = props.text;
  if (reducedMotion) {
    display.value = target;
    return;
  }
  clearInterval(timer);
  frame = 0;
  const total = target.length * props.cyclesPerChar;

  timer = setInterval(() => {
    frame++;
    let out = "";
    for (let i = 0; i < target.length; i++) {
      const settleAt = i * props.cyclesPerChar;
      const ch = target[i];
      if (frame >= settleAt + props.cyclesPerChar || ch === " ") {
        out += ch;
      } else if (frame >= settleAt) {
        out += randGlyph();
      } else {
        out += randGlyph();
      }
    }
    display.value = out;
    if (frame >= total) {
      display.value = target;
      clearInterval(timer);
    }
  }, props.interval);
}

function start() {
  clearTimeout(startTimer);
  if (props.delay > 0) {
    // show scrambled placeholder during the delay so nothing "pops"
    display.value = props.text.replace(/[^ ]/g, () => randGlyph());
    startTimer = setTimeout(run, props.delay);
  } else {
    run();
  }
}

onMounted(() => {
  reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  start();
});

if (props.watchText) {
  watch(
    () => props.text,
    () => start()
  );
}

onBeforeUnmount(() => {
  clearInterval(timer);
  clearTimeout(startTimer);
});
</script>

<template>
  <span class="tabular-nums">{{ display }}</span>
</template>
