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
        label: "thesis",
        icon: "i-lucide-file-text",
        description: "My thesis.",
        to: "/projects/thesis",
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
    <template #title> Max König </template>

    <Mheaderitems orientation="horizontal" />

    <template #right>
      <UColorModeButton />
    </template>

    <template #body>
      <Mheaderitems orientation="vertical" />
    </template>
  </UHeader>
</template>
