<script setup lang="ts">
import ProjectDisplay from "~/components/projectDisplay.vue";
useSeo({
  title: "projects",
  description:
    "A selection of things Max König has built — personal and student software, web, IoT and AI projects.",
});
</script>

<template>
  <UContainer class="py-12 flex flex-col gap-12">
    <div class="flex flex-col gap-2">
      <p class="text-primary text-sm">
        <span class="opacity-70">~</span> projects --all
      </p>
      <h1 class="text-3xl">projects</h1>
      <p class="text-muted">a selection of things i have built.</p>
    </div>

    <section class="flex flex-col gap-4">
      <div class="flex items-center justify-between">
        <h2 class="text-xl">student projects</h2>
        <UButton to="/projects/student" variant="link" trailing-icon="i-lucide-arrow-right">
          all
        </UButton>
      </div>
      <ProjectDisplay collection-name="studentProject" :limit="0" />
    </section>

    <section class="flex flex-col gap-4">
      <div class="flex items-center justify-between">
        <h2 class="text-xl">personal projects</h2>
        <UButton to="/projects/personal" variant="link" trailing-icon="i-lucide-arrow-right">
          all
        </UButton>
      </div>
      <ProjectDisplay collection-name="personalProject" :limit="0" />
    </section>
  </UContainer>
</template>
