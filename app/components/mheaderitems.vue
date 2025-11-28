<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";
const props = defineProps({
  orientation: String,
});
const route = useRoute();

const items = ref<NavigationMenuItem[][]>([
  [
    {
      label: "projects",
      icon: "i-lucide-book-open",
      children: [
        {
          label: "personal projects",
          description: "my personal projects.",
          icon: "i-lucide-house",
        },
        {
          label: "student projects",
          description: "my projects as a student.",
          icon: "i-lucide-cloud-download",
        },
        {
          label: "thesis",
          icon: "i-lucide-smile",
          description: "my thesis.",
        },
      ],
    },
    {
      label: "career",
      icon: "i-lucide-database",
      children: [
        {
          label: "acadamic",
          icon: "i-lucide-file-text",
          description: "my degrees and qualification",
          to: "/docs/composables/define-shortcuts",
        },
        {
          label: "professional",
          icon: "i-lucide-file-text",
          description: "my work experience",
          to: "/docs/composables/use-overlay",
        },
      ],
    },
    {
      label: "contact",
      icon: "i-lucide-database",
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
