<script setup lang="ts">
import { SITE_NAME } from "~/composables/useSeo";

// Site-wide head + social-card defaults. Per-page `useSeo()` overrides the
// title/description/url; these supply the shared fallbacks.
const url = useRequestURL();

useHead({
  htmlAttrs: { lang: "en" },
  link: [{ rel: "icon", href: withBase("/favicon.ico") }],
});

useSeoMeta({
  ogSiteName: SITE_NAME,
  ogType: "website",
  ogImage: `${url.origin}${withBase("/og.png")}`,
  twitterCard: "summary_large_image",
  twitterImage: `${url.origin}${withBase("/og.png")}`,
});
</script>

<template>
  <UApp>
    <NuxtLayout>
      <UMain>
        <NuxtPage />
      </UMain>
    </NuxtLayout>
  </UApp>
</template>
