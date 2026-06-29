<script setup lang="ts">
import ProjectDisplay from "~/components/projectDisplay.vue";
import { SOCIAL_LINKS } from "~/utils/site";

useSeo({
  description:
    "Max König — software developer & student building web apps, IoT and AI projects.",
});

const socials = SOCIAL_LINKS;

// surface the 3 most recent jobs on the landing page (studies excluded).
// getCachedData reuses the payload from the initial load: without it,
// useAsyncData re-runs the query in the browser on in-app navigation, where the
// career collection dump isn't loaded, so it returned empty and the section
// disappeared until a hard reload.
const { data: jobs } = await useAsyncData(
  "home-career",
  () => queryCollection("career").where("type", "=", "work").limit(3).all(),
  {
    getCachedData: (key, nuxtApp) =>
      nuxtApp.payload.data[key] ?? nuxtApp.static.data[key],
  }
);
</script>

<template>
  <div class="flex flex-col">
    <!-- hero -->
    <section
      class="relative flex min-h-[88vh] w-full items-center justify-center overflow-hidden"
    >
      <ClientOnly>
        <HeroThree />
      </ClientOnly>

      <!-- readability + edge fade -->
      <div
        class="pointer-events-none absolute inset-0 bg-linear-to-b from-default/40 via-transparent to-default"
      />

      <div class="relative z-10 flex flex-col items-center gap-6 px-6 text-center">
        <p class="text-primary text-sm">
          <span class="opacity-70">~</span> whoami
        </p>

        <h1 class="text-5xl sm:text-7xl tracking-tight">Max König</h1>

        <p class="text-muted max-w-xl text-lg">
          software developer & student — building web apps, IoT and AI projects.
        </p>

        <div class="flex flex-wrap items-center justify-center gap-3">
          <UButton to="/projects" size="lg" trailing-icon="i-lucide-arrow-right">
            view projects
          </UButton>
          <UButton to="/contact" size="lg" color="neutral" variant="subtle">
            get in touch
          </UButton>
        </div>

        <div class="flex items-center gap-2 pt-2">
          <UButton
            v-for="s in socials"
            :key="s.label"
            :to="s.to"
            :icon="s.icon"
            :aria-label="s.label"
            target="_blank"
            color="neutral"
            variant="ghost"
            size="lg"
          />
        </div>
      </div>

      <UIcon
        name="i-lucide-chevron-down"
        class="absolute bottom-6 left-1/2 size-6 -translate-x-1/2 text-muted motion-safe:animate-bounce"
      />
    </section>

    <!-- projects -->
    <UContainer class="flex flex-col gap-12 py-16">
      <section class="flex flex-col gap-4">
        <div class="flex items-center justify-between">
          <h2 class="text-xl">some of my projects…</h2>
          <UButton to="/projects" variant="link" trailing-icon="i-lucide-arrow-right">
            all
          </UButton>
        </div>
        <ProjectDisplay collection-name="studentProject" :limit="2" />
        <ProjectDisplay collection-name="personalProject" :limit="2" />
      </section>

      <!-- experience -->
      <section v-if="jobs?.length" class="flex flex-col gap-4">
        <div class="flex items-center justify-between">
          <h2 class="text-xl">where i've worked…</h2>
          <UButton to="/career" variant="link" trailing-icon="i-lucide-arrow-right">
            all
          </UButton>
        </div>
        <ul class="flex flex-col">
          <li
            v-for="job in jobs"
            :key="job.path"
            class="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-default py-3 last:border-b-0"
          >
            <span class="text-muted font-mono text-xs">
              {{ job.start }} → {{ job.current ? "present" : job.end }}
            </span>
            <span class="text-default">{{ job.role }}</span>
            <span class="text-muted">· {{ job.company }}</span>
            <UBadge
              v-if="job.current"
              color="primary"
              variant="subtle"
              size="sm"
              class="font-mono"
            >
              now
            </UBadge>
          </li>
        </ul>
      </section>
    </UContainer>
  </div>
</template>
