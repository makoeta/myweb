<script setup lang="ts">
useSeo({
  title: "career",
  description:
    "Maximilian König's professional path — software engineering roles, internships and working-student positions.",
});

// getCachedData reuses the SSR payload on in-app navigation: without it,
// useAsyncData re-runs queryCollection in the browser, where the collection
// dump isn't loaded, so it returns empty until a hard reload.
const { data: jobs } = await useAsyncData(
  "career",
  () => queryCollection("career").all(),
  {
    getCachedData: (key, nuxtApp) =>
      nuxtApp.payload.data[key] ?? nuxtApp.static.data[key],
  }
);

// scroll-driven timeline rail: `progress` (0..1) tracks how far the timeline has
// travelled through the viewport, driving the fill line + glowing head marker.
const timeline = ref<HTMLElement | null>(null);
const progress = ref(0);
// rail geometry (px, relative to the <ol>): spans first→last marker center so
// the track/fill/head stop exactly on the last icon, not the container's edge.
const railTop = ref(0);
const railHeight = ref(0);
let ticking = false;

function measure() {
  const el = timeline.value;
  if (!el) return;
  const markers = el.querySelectorAll<HTMLElement>("[data-marker]");
  if (!markers.length) return;

  const elTop = el.getBoundingClientRect().top;
  const first = markers[0]!.getBoundingClientRect();
  const last = markers[markers.length - 1]!.getBoundingClientRect();
  const firstCenter = first.top + first.height / 2;
  const lastCenter = last.top + last.height / 2;

  railTop.value = firstCenter - elTop;
  railHeight.value = lastCenter - firstCenter;

  const vh = window.innerHeight;
  const scrollY = window.scrollY;
  const maxScroll = document.documentElement.scrollHeight - vh;
  // Work in document/scroll coords. `s0` is the scroll pos where the first icon
  // hits 75% vh (fill begins); `s1` where the last icon hits 50% vh (fill full),
  // but capped at maxScroll — little content trails the last entry, so without
  // the cap that line is never reached and the rail stops short near the top.
  const s0 = firstCenter + scrollY - vh * 0.75;
  const s1 = Math.min(lastCenter + scrollY - vh * 0.5, maxScroll);
  const p = (scrollY - s0) / Math.max(1, s1 - s0);
  progress.value = Math.min(1, Math.max(0, p));
}

function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    measure();
    ticking = false;
  });
}

onMounted(() => {
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  measure();
});
onBeforeUnmount(() => {
  window.removeEventListener("scroll", onScroll);
  window.removeEventListener("resize", onScroll);
});
</script>

<template>
  <UContainer class="max-w-3xl py-16">
    <header class="mb-12 flex flex-col gap-2">
      <p class="text-primary text-sm">
        <span class="opacity-70">~</span> career --history
      </p>
      <h1 class="text-3xl sm:text-4xl">where i've worked</h1>
      <p class="text-muted">my professional path so far.</p>
      <div class="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted">
        <span class="inline-flex items-center gap-1.5">
          <UIcon name="i-lucide-briefcase" class="size-3.5 text-primary" /> work
        </span>
        <span class="inline-flex items-center gap-1.5">
          <UIcon name="i-lucide-graduation-cap" class="size-3.5 text-sky-500" /> education
        </span>
      </div>
    </header>

    <ol v-if="jobs?.length" ref="timeline" class="relative flex flex-col">
      <!-- animated scroll rail: faint track + gradient fill that grows with scroll -->
      <div
        class="pointer-events-none absolute left-3 w-px -translate-x-1/2"
        :style="{ top: `${railTop}px`, height: `${railHeight}px` }"
      >
        <div class="absolute inset-0 bg-muted/25" />
        <div
          class="absolute inset-x-0 top-0 bg-linear-to-b from-primary to-sky-500 shadow-[0_0_8px] shadow-primary/50 transition-[height] duration-150 ease-out motion-reduce:transition-none"
          :style="{ height: `${progress * 100}%` }"
        />
      </div>
      <!-- glowing head riding the fill -->
      <div
        class="pointer-events-none absolute left-3 z-20 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_16px_3px] shadow-primary/60 transition-[top,opacity] duration-150 ease-out motion-reduce:transition-none"
        :class="progress > 0.001 && progress < 0.999 ? 'opacity-100' : 'opacity-0'"
        :style="{ top: `${railTop + progress * railHeight}px` }"
      />

      <ScrollReveal
        v-for="(job, i) in jobs"
        :key="job.path"
        as="li"
        :delay="i * 90"
        class="relative grid grid-cols-[auto_1fr] gap-x-5"
      >
        <!-- type marker -->
        <div class="relative flex w-6 justify-center">
          <span
            data-marker
            class="group relative z-10 mt-1 flex size-6 items-center justify-center rounded-full border-2 bg-default transition-transform duration-300 hover:scale-110"
            :class="[
              job.type === 'education'
                ? 'border-sky-500/70 text-sky-500'
                : 'border-primary/70 text-primary',
              job.current
                ? job.type === 'education'
                  ? 'ring-4 ring-sky-500/10'
                  : 'ring-4 ring-primary/10'
                : '',
            ]"
          >
            <!-- pulse halo on the current role -->
            <span
              v-if="job.current"
              class="absolute inset-0 rounded-full motion-safe:animate-ping"
              :class="job.type === 'education' ? 'bg-sky-500/20' : 'bg-primary/20'"
            />
            <UIcon
              :name="
                job.type === 'education'
                  ? 'i-lucide-graduation-cap'
                  : 'i-lucide-briefcase'
              "
              class="relative size-3.5"
            />
          </span>
        </div>

        <!-- content -->
        <div class="pb-12">
          <div class="flex flex-wrap items-center gap-2">
            <span class="text-muted font-mono text-xs">
              {{ job.start }} → {{ job.current ? "present" : job.end }}
            </span>
            <UBadge
              v-if="job.current"
              color="primary"
              variant="subtle"
              size="sm"
              class="font-mono"
            >
              now
            </UBadge>
          </div>

          <h2 class="mt-2 text-xl">{{ job.role }}</h2>
          <p class="text-muted mt-0.5">
            <ULink
              v-if="job.companyUrl"
              :to="job.companyUrl"
              target="_blank"
              class="text-default hover:text-primary underline decoration-default/40 underline-offset-4 transition-colors hover:decoration-primary"
            >
              {{ job.company }}
            </ULink>
            <span v-else class="text-default">{{ job.company }}</span>
            <span v-if="job.location"> · {{ job.location }}</span>
          </p>

          <div v-if="job.tags?.length" class="mt-3 flex flex-wrap gap-1.5">
            <UBadge
              v-for="t in job.tags"
              :key="t"
              color="neutral"
              variant="outline"
              size="sm"
              class="transition-colors hover:border-primary/50 hover:text-primary"
            >
              {{ t }}
            </UBadge>
          </div>

          <div class="prose prose-sm dark:prose-invert mt-4 max-w-none text-muted">
            <ContentRenderer :value="job" />
          </div>
        </div>
      </ScrollReveal>
    </ol>

    <p v-else class="text-muted">no entries yet.</p>
  </UContainer>
</template>
