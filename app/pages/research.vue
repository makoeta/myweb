<script setup lang="ts">
import { PAPERS, RESEARCH_STATUS_META } from "~/utils/research";

useSeo({
  title: "research",
  description:
    "Maximilian König's scientific work — bachelor & master theses and research papers.",
});
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
      <UCard v-for="p in PAPERS" :key="p.kind">
        <div class="flex flex-col gap-3">
          <div class="flex items-start justify-between gap-3">
            <div class="flex flex-col gap-1">
              <span
                class="text-xs text-muted uppercase tracking-wide"
              >{{ p.kind }}</span>
              <h2 class="text-lg">{{ p.title }}</h2>
            </div>
            <UBadge :color="RESEARCH_STATUS_META[p.status].color" variant="subtle">
              {{ RESEARCH_STATUS_META[p.status].label }}
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
