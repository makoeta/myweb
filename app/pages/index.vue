<script setup lang="ts">
import ProjectDisplay from "~/components/projectDisplay.vue";
import { SOCIAL_LINKS } from "~/utils/site";
import { PAPERS, RESEARCH_STATUS_META } from "~/utils/research";

useSeo({
  description:
    "Maximilian König — software developer & student building web apps, IoT and AI projects.",
});

const socials = SOCIAL_LINKS;

// rotating role line under the headline — cycles with the decrypt effect.
const roles = ["web apps", "agentic systems", "AI projects"];
const roleIndex = ref(0);
let roleTimer: ReturnType<typeof setInterval> | undefined;

onMounted(() => {
  roleTimer = setInterval(() => {
    roleIndex.value = (roleIndex.value + 1) % roles.length;
  }, 4200);
});
onBeforeUnmount(() => clearInterval(roleTimer));

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
      class="relative flex min-h-screen w-full items-center justify-center overflow-hidden"
    >
      <ClientOnly>
        <HeroThree />
      </ClientOnly>

      <!-- faint grid, scanlines + readability/edge fade overlays -->
      <div class="hero-grid pointer-events-none absolute inset-0" />
      <div
        class="pointer-events-none absolute inset-0 bg-linear-to-b from-default/40 via-transparent to-default"
      />

      <div class="relative z-10 flex flex-col items-center gap-6 px-6 text-center">
        <!-- radial glow lifting the headline off the 3D scene -->
        <div class="hero-glow pointer-events-none absolute -z-10" />

        <p class="text-primary text-sm">
          <span class="opacity-70">~</span> whoami
        </p>

        <h1 class="text-4xl sm:text-7xl tracking-tight wrap-break-word">
          <span class="text-primary/60 mr-1">&gt;</span>
          <DecryptText text="Maximilian König" :interval="32" :cycles-per-char="6" />
        </h1>

        <p class="text-muted max-w-full text-base sm:text-lg">
          software developer &amp; student — building
          <span class="text-default">
            <DecryptText
              :key="roleIndex"
              :text="roles[roleIndex] ?? ''"
              :interval="40"
              :cycles-per-char="5"
              watch-text
            />
          </span>
          <span class="cursor-blink text-primary">█</span>
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
          <MailButton color="neutral" variant="ghost" size="lg" />
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
        <ScrollReveal as="div" class="flex items-center justify-between">
          <h2 class="text-xl">some of my projects…</h2>
          <UButton to="/projects" variant="link" trailing-icon="i-lucide-arrow-right">
            all
          </UButton>
        </ScrollReveal>
        <ScrollReveal :delay="80">
          <ProjectDisplay collection-name="studentProject" :limit="3" />
        </ScrollReveal>
        <ScrollReveal :delay="160">
          <ProjectDisplay collection-name="personalProject" :limit="2" />
        </ScrollReveal>
      </section>

      <!-- experience -->
      <section v-if="jobs?.length" class="flex flex-col gap-4">
        <ScrollReveal as="div" class="flex items-center justify-between">
          <h2 class="text-xl">where i've worked…</h2>
          <UButton to="/career" variant="link" trailing-icon="i-lucide-arrow-right">
            all
          </UButton>
        </ScrollReveal>
        <ul class="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <ScrollReveal
            v-for="(job, i) in jobs"
            :key="job.path"
            as="li"
            :delay="i * 90"
          >
            <UCard class="h-full" :ui="{ body: 'p-6 sm:p-7' }">
              <div class="flex flex-col gap-3">
                <div class="flex items-center justify-between gap-2">
                  <span class="text-muted font-mono text-sm">
                    {{ job.start }} → {{ job.current ? "present" : job.end }}
                  </span>
                  <UBadge
                    v-if="job.current"
                    color="primary"
                    variant="subtle"
                    class="font-mono"
                  >
                    now
                  </UBadge>
                </div>
                <h3 class="text-xl text-default">{{ job.role }}</h3>
                <p class="text-muted text-base">{{ job.company }}</p>
              </div>
            </UCard>
          </ScrollReveal>
        </ul>
      </section>

      <!-- research -->
      <section class="flex flex-col gap-4">
        <ScrollReveal as="div" class="flex items-center justify-between">
          <h2 class="text-xl">research…</h2>
          <UButton to="/research" variant="link" trailing-icon="i-lucide-arrow-right">
            all
          </UButton>
        </ScrollReveal>
        <ul class="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <ScrollReveal
            v-for="(p, i) in PAPERS"
            :key="p.kind"
            as="li"
            :delay="i * 90"
          >
            <UCard class="h-full" :ui="{ body: 'p-6 sm:p-7' }">
              <div class="flex flex-col gap-3">
                <div class="flex items-center justify-between gap-2">
                  <span class="text-muted font-mono text-xs uppercase tracking-wide">
                    {{ p.kind }}
                  </span>
                  <UBadge :color="RESEARCH_STATUS_META[p.status].color" variant="subtle">
                    {{ RESEARCH_STATUS_META[p.status].label }}
                  </UBadge>
                </div>
                <h3 class="text-xl text-default">{{ p.title }}</h3>
                <p class="text-muted text-base">{{ p.description }}</p>
              </div>
            </UCard>
          </ScrollReveal>
        </ul>
      </section>
    </UContainer>
  </div>
</template>

<style scoped>
/* faint terminal grid + scanlines behind the 3D scene */
.hero-grid {
  background-image:
    linear-gradient(
      to bottom,
      transparent,
      transparent 2px,
      color-mix(in oklch, var(--ui-primary) 6%, transparent) 3px
    ),
    linear-gradient(
      to right,
      color-mix(in oklch, var(--ui-text-muted) 8%, transparent) 1px,
      transparent 1px
    ),
    linear-gradient(
      to bottom,
      color-mix(in oklch, var(--ui-text-muted) 8%, transparent) 1px,
      transparent 1px
    );
  background-size:
    100% 4px,
    44px 44px,
    44px 44px;
  /* fade the grid out toward the edges so it reads as a glow, not a wall */
  mask-image: radial-gradient(ellipse 70% 60% at 50% 45%, black, transparent 80%);
  -webkit-mask-image: radial-gradient(
    ellipse 70% 60% at 50% 45%,
    black,
    transparent 80%
  );
  opacity: 0.6;
}

/* soft radial bloom behind the headline */
.hero-glow {
  width: min(40rem, 90vw);
  height: min(40rem, 90vw);
  background: radial-gradient(
    circle,
    color-mix(in oklch, var(--ui-primary) 22%, transparent),
    transparent 65%
  );
  filter: blur(20px);
}

.cursor-blink {
  animation: cursor-blink 1.1s step-end infinite;
}
@keyframes cursor-blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .cursor-blink {
    animation: none;
  }
}
</style>
