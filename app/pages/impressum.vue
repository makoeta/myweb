<script setup lang="ts">
import { ref } from "vue";

useSeo({
  title: "impressum",
  description: "Legal notice / Impressum according to § 5 DDG.",
});

// Postal name/address come from .env (NUXT_PUBLIC_IMPRINT_*) so the private
// address stays out of the repo — see nuxt.config.ts runtimeConfig.public.imprint.
const cfg = useRuntimeConfig().public.imprint;
const imprint = {
  name: cfg.name,
  address: [cfg.street, cfg.city, cfg.country].filter(Boolean),
};

// E-mail + phone are stored Base64-ENCODED in the env, so no `name@domain`
// pattern ever ships in the delivered HTML or the JS bundle — a crawler grepping
// the static files finds nothing harvestable. They are only decoded in the
// browser, and only after the visitor explicitly asks via the button below, so
// the rendered DOM stays free of any contact string until then (defeats JS-
// rendering crawlers too, since they don't click).
const decode = (b64: string) => {
  if (!b64) return "";
  try {
    return atob(b64);
  } catch {
    return "";
  }
};
const reverse = (s: string) => s.split("").reverse().join("");

// <noscript> fallback: the reversed plaintext, readable to no-JS humans via a
// CSS bidi-override but not a valid e-mail pattern in the raw HTML source.
const emailReversed = reverse(decode(cfg.email));
const phoneReversed = reverse(decode(cfg.phone));
const hasPhone = Boolean(cfg.phone);

// Revealed only on explicit user interaction.
const email = ref("");
const phone = ref("");
const revealed = ref(false);
const reveal = () => {
  email.value = decode(cfg.email);
  phone.value = decode(cfg.phone);
  revealed.value = true;
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

      <template v-if="revealed">
        <p class="text-muted">
          E-Mail:
          <ULink
            :to="`mailto:${email}`"
            class="text-default hover:text-primary underline decoration-default/40 underline-offset-4 transition-colors hover:decoration-primary"
          >
            {{ email }}
          </ULink>
        </p>
        <p v-if="phone" class="text-muted">Telefon: {{ phone }}</p>
      </template>

      <template v-else>
        <UButton
          color="neutral"
          variant="outline"
          icon="i-lucide-mail"
          class="w-fit"
          @click="reveal"
        >
          Kontaktdaten anzeigen
        </UButton>
        <noscript>
          <p class="text-muted">
            E-Mail:
            <span style="unicode-bidi: bidi-override; direction: rtl">{{
              emailReversed
            }}</span>
          </p>
          <p v-if="hasPhone" class="text-muted">
            Telefon:
            <span style="unicode-bidi: bidi-override; direction: rtl">{{
              phoneReversed
            }}</span>
          </p>
        </noscript>
      </template>
    </section>
  </UContainer>
</template>
