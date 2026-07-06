<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";
import Mheaderitems from "./mheaderitems.vue";

const route = useRoute();

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: "projects",
    to: "/projects",
    icon: "i-lucide-book-open",
    active: route.path.startsWith("/projects"),
    children: [
      {
        label: "student projects",
        icon: "i-lucide-file-text",
        description: "My projects as a student.",
        to: "/projects/student",
      },
      {
        label: "personal projects",
        icon: "i-lucide-file-text",
        description: "My personal projects.",
        to: "/projects/personal",
      },
      {
        label: "research",
        icon: "i-lucide-graduation-cap",
        description: "My theses and research papers.",
        to: "/projects/research",
      },
    ],
  },
  {
    label: "career",
    to: "/career",
    icon: "i-lucide-rocket",
    active: route.path.startsWith("/career"),
  },
  {
    label: "legal",
    icon: "i-simple-icons-figma",
    active: route.path.startsWith("/legal"),
  },
]);
</script>

<template>
  <UHeader toggle-side="left">
    <template #title> Maximilian König </template>

    <Mheaderitems orientation="horizontal" />

    <template #right>
      <UColorModeSelect />
    </template>

    <template #body>
      <Mheaderitems orientation="vertical" />
    </template>
  </UHeader>
</template>
