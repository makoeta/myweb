<script setup lang="ts">
import ProjectDisplay from "~/components/projectDisplay.vue";
useSeo({
  title: "student projects",
  description: "Projects from Max König's studies and coursework.",
});
</script>

<template>
  <UContainer class="py-12 flex flex-col gap-8">
    <div class="flex flex-col gap-2">
      <p class="text-primary text-sm">
        <span class="opacity-70">~</span> projects --student
      </p>
      <h1 class="text-3xl">student projects</h1>
      <p class="text-muted">projects from my studies and coursework.</p>
    </div>
    <ProjectDisplay collection-name="studentProject" :limit="0" />
  </UContainer>
</template>
