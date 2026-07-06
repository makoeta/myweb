<script setup lang="ts">
import type { BadgeProps } from "@nuxt/ui";

useSeo({
  title: "research",
  description:
    "Maximilian König's scientific work — bachelor & master theses and research papers.",
});

type Status = "done" | "ongoing" | "planned";

interface Paper {
  kind: string;
  title: string;
  status: Status;
  description: string;
  to?: string;
  cta?: string;
}

const papers: Paper[] = [
  {
    kind: "Bachelor Thesis",
    title: "Web Application Frameworks",
    status: "done",
    description:
      "A study of modern web application frameworks. Completed — reach out if you'd like to know more.",
    to: "/contact",
    cta: "contact me for more information",
  },
  {
    kind: "Research Paper",
    title: "In-Context Reinforcement Learning",
    status: "ongoing",
    description:
      "An ongoing research paper on in-context reinforcement learning, built around the FastICRL project.",
    to: "/projects/student/fasticrl",
    cta: "see the FastICRL project",
  },
  {
    kind: "Master Thesis",
    title: "Master Thesis",
    status: "planned",
    description:
      "Planned to build on top of my in-context reinforcement learning research paper.",
  },
];

const statusMeta: Record<
  Status,
  { label: string; color: BadgeProps["color"] }
> = {
  done: { label: "done", color: "success" },
  ongoing: { label: "ongoing", color: "info" },
  planned: { label: "planned", color: "neutral" },
};
</script>

<template>
  <UContainer class="py-12 flex flex-col gap-8 max-w-2xl">
    <div class="flex flex-col gap-2">
      <p class="text-primary text-sm">
        <span class="opacity-70">~</span> research --papers
      </p>
      <h1 class="text-3xl">research</h1>
      <p class="text-muted">my scientific work — theses and research papers.</p>
    </div>

    <div class="flex flex-col gap-4">
      <UCard v-for="p in papers" :key="p.kind">
        <div class="flex flex-col gap-3">
          <div class="flex items-start justify-between gap-3">
            <div class="flex flex-col gap-1">
              <span
                class="text-xs text-muted uppercase tracking-wide"
              >{{ p.kind }}</span>
              <h2 class="text-lg">{{ p.title }}</h2>
            </div>
            <UBadge :color="statusMeta[p.status].color" variant="subtle">
              {{ statusMeta[p.status].label }}
            </UBadge>
          </div>

          <p class="text-muted text-sm">{{ p.description }}</p>

          <UButton
            v-if="p.to"
            :to="p.to"
            variant="link"
            class="self-start px-0"
            trailing-icon="i-lucide-arrow-right"
          >
            {{ p.cta }}
          </UButton>
        </div>
      </UCard>
    </div>
  </UContainer>
</template>
