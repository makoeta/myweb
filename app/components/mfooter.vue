<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";
import { SOCIAL_LINKS } from "~/utils/site";

const items: NavigationMenuItem[] = [
  {
    label: "projects",
    to: "/projects",
  },
  {
    label: "career",
    to: "/career",
  },
  {
    label: "impressum",
    to: "/impressum",
  },
];
</script>

<template>
  <UFooter>
    <template #left>
      <p class="text-muted text-sm">
        Copyright © {{ new Date().getFullYear() }} Maximilian König
      </p>
    </template>

    <UNavigationMenu :items="items" variant="link" />

    <template #right>
      <UButton
        v-for="s in SOCIAL_LINKS"
        :key="s.label"
        :icon="s.icon"
        :to="s.to"
        :aria-label="s.label"
        color="neutral"
        variant="ghost"
        target="_blank"
      />
    </template>
  </UFooter>
</template>
