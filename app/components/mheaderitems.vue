<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";
const props = defineProps({
  orientation: String,
});

const items = ref<NavigationMenuItem[][]>([
  [
    {
      label: "projects",
      icon: "i-lucide-book-open",
      to: "/projects",
      children: [
        {
          label: "personal projects",
          description: "my personal projects.",
          icon: "i-lucide-house",
          to: "/projects/personal",
        },
        {
          label: "student projects",
          description: "my projects as a student.",
          icon: "i-lucide-cloud-download",
          to: "/projects/student",
        },
        {
          label: "research",
          icon: "i-lucide-graduation-cap",
          description: "my theses and research papers.",
          to: "/projects/research",
        },
      ],
    },
    {
      label: "skills",
      icon: "i-lucide-cpu",
      to: "/skills",
    },
    {
      label: "career",
      icon: "i-lucide-rocket",
      to: "/career",
    },
    {
      label: "contact",
      icon: "i-lucide-mail",
      to: "/contact",
    },
  ],
  [
    {
      label: "GitHub",
      icon: "i-simple-icons-github",
      to: "https://github.com/makoeta",
      target: "_blank",
    },
  ],
]);
</script>

<template>
  <UNavigationMenu
    highlight
    highlight-color="primary"
    :orientation="props.orientation"
    :items="items"
    class="w-full"
  />
</template>
