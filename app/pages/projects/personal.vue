<script setup lang="ts">
import ProjectDisplay from "~/components/projectDisplay.vue";
useSeo({
  title: "personal projects",
  description: "Things Maximilian König builds for fun and curiosity.",
});
</script>

<template>
  <UContainer class="py-12 flex flex-col gap-8">
    <div class="flex flex-col gap-2">
      <p class="text-primary text-sm">
        <span class="opacity-70">~</span> projects --personal
      </p>
      <h1 class="text-3xl">personal projects</h1>
      <p class="text-muted">things i build for fun and curiosity.</p>
    </div>
    <ProjectDisplay collection-name="personalProject" :limit="0" />
  </UContainer>
</template>
