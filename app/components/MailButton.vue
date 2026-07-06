<script setup lang="ts">
// Contact e-mail button. The address lives Base64-encoded in the env
// (NUXT_PUBLIC_IMPRINT_EMAIL) and is only decoded + navigated to on click, so no
// plaintext `mailto:` ever ships in the static HTML for crawlers to harvest.
// Renders a plain <button> (no href) until the visitor actually clicks it.
const cfg = useRuntimeConfig().public.imprint;
const decode = (b64: string) => {
  if (!b64) return "";
  try {
    return atob(b64);
  } catch {
    return "";
  }
};
const openMail = () => {
  const addr = decode(cfg.email);
  if (addr) window.location.href = `mailto:${addr}`;
};
</script>

<template>
  <UButton icon="i-lucide-mail" aria-label="email" @click="openMail">
    <slot />
  </UButton>
</template>
