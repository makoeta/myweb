<script setup lang="ts">
useSeo({
  title: "career",
  description:
    "Max König's professional path — software engineering roles, internships and working-student positions.",
});

const { data: jobs } = await useAsyncData("career", () =>
  queryCollection("career").all()
);
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

    <ol v-if="jobs?.length" class="relative flex flex-col">
      <li
        v-for="(job, i) in jobs"
        :key="job.path"
        class="relative grid grid-cols-[auto_1fr] gap-x-5"
      >
        <!-- rail + type marker -->
        <div class="relative flex w-6 justify-center">
          <span
            v-if="i < jobs.length - 1"
            class="absolute top-7 bottom-0 w-px bg-muted/30"
          />
          <span
            class="relative z-10 mt-1 flex size-6 items-center justify-center rounded-full border-2 bg-default"
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
            <UIcon
              :name="
                job.type === 'education'
                  ? 'i-lucide-graduation-cap'
                  : 'i-lucide-briefcase'
              "
              class="size-3.5"
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
            >
              {{ t }}
            </UBadge>
          </div>

          <div class="prose prose-sm dark:prose-invert mt-4 max-w-none text-muted">
            <ContentRenderer :value="job" />
          </div>
        </div>
      </li>
    </ol>

    <p v-else class="text-muted">no entries yet.</p>
  </UContainer>
</template>
