<script setup lang="ts">
import { SOCIAL_LINKS } from "~/utils/site";
useSeo({
  title: "contact",
  description: "Get in touch with Max König.",
});

const links = SOCIAL_LINKS.map((s) => ({ ...s, label: s.label.toLowerCase() }));
</script>

<template>
  <UContainer class="py-12 flex flex-col gap-8 max-w-2xl">
    <div class="flex flex-col gap-2">
      <p class="text-primary text-sm">
        <span class="opacity-70">~</span> contact --reach
      </p>
      <h1 class="text-3xl">contact</h1>
      <p class="text-muted">feel free to reach out — i'm always happy to chat.</p>
    </div>

    <div class="flex flex-col gap-3">
      <UButton
        v-for="link in links"
        :key="link.label"
        :to="link.to"
        :icon="link.icon"
        target="_blank"
        color="neutral"
        variant="subtle"
        size="lg"
        class="justify-start"
      >
        {{ link.label }}
      </UButton>
    </div>
  </UContainer>
</template>
