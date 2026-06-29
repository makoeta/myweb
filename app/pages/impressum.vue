<script setup lang="ts">
useSeo({
  title: "impressum",
  description: "Legal notice / Impressum according to § 5 DDG.",
});

// Values come from .env (NUXT_PUBLIC_IMPRINT_*) so the postal address stays out
// of the repo — see nuxt.config.ts runtimeConfig.public.imprint and .env.example.
const cfg = useRuntimeConfig().public.imprint;
const imprint = {
  name: cfg.name,
  address: [cfg.street, cfg.city, cfg.country].filter(Boolean),
  email: cfg.email,
  phone: cfg.phone,
};
</script>

<template>
  <UContainer class="py-12 flex flex-col gap-8 max-w-2xl">
    <header class="flex flex-col gap-2">
      <p class="text-primary text-sm">
        <span class="opacity-70">~</span> legal --imprint
      </p>
      <h1 class="text-3xl">impressum</h1>
      <p class="text-muted">Angaben gemäß § 5 TMG</p>
    </header>

    <section class="flex flex-col gap-2">
      <address class="text-muted not-italic leading-relaxed">
        {{ imprint.name }}<br />
        <template v-for="line in imprint.address" :key="line">
          {{ line }}<br />
        </template>
      </address>
    </section>

    <section class="flex flex-col gap-2">
      <h2 class="text-xl">Kontakt</h2>
      <p class="text-muted">
        E-Mail:
        <ULink
          :to="`mailto:${imprint.email}`"
          class="text-default hover:text-primary underline decoration-default/40 underline-offset-4 transition-colors hover:decoration-primary"
        >
          {{ imprint.email }}
        </ULink>
      </p>
      <p v-if="imprint.phone" class="text-muted">
        Telefon: {{ imprint.phone }}
      </p>
    </section>
  </UContainer>
</template>
