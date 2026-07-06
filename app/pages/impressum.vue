<script setup lang="ts">
import { ref } from "vue";

useSeo({
  title: "impressum",
  description: "Legal notice / Impressum according to § 5 DDG.",
});

// ALL imprint fields (name, address, e-mail) are stored Base64-ENCODED in
// the env, so no plaintext detail ever ships in the delivered HTML or the JS
// payload — a crawler grepping the static files finds nothing harvestable. They
// are decoded in the browser only after the visitor clicks "Angaben anzeigen",
// so the rendered DOM stays free of any personal data until then (defeats JS-
// rendering crawlers too, since they don't click). See nuxt.config runtimeConfig.
const cfg = useRuntimeConfig().public.imprint;
const decode = (b64: string) => {
  if (!b64) return "";
  try {
    return atob(b64);
  } catch {
    return "";
  }
};
const reverse = (s: string) => s.split("").reverse().join("");

// <noscript> fallback: reversed plaintext, readable to no-JS humans via a CSS
// bidi-override but not plainly grep-able in the raw HTML source.
const nameReversed = reverse(decode(cfg.name));
const addressReversed = [cfg.street, cfg.city, cfg.country]
  .map(decode)
  .filter(Boolean)
  .map(reverse);
const emailReversed = reverse(decode(cfg.email));

// Revealed only on explicit user interaction.
const revealed = ref(false);
const name = ref("");
const address = ref<string[]>([]);
const email = ref("");
const reveal = () => {
  name.value = decode(cfg.name);
  address.value = [cfg.street, cfg.city, cfg.country].map(decode).filter(Boolean);
  email.value = decode(cfg.email);
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

    <section class="flex flex-col gap-6">
      <template v-if="revealed">
        <address class="text-muted not-italic leading-relaxed">
          {{ name }}<br />
          <template v-for="line in address" :key="line">
            {{ line }}<br />
          </template>
        </address>

        <div class="flex flex-col gap-2">
          <h2 class="text-xl">Kontakt</h2>
          <p class="text-muted">
            E-Mail:
            <ULink
              :to="`mailto:${email}`"
              class="text-default hover:text-primary underline decoration-default/40 underline-offset-4 transition-colors hover:decoration-primary"
            >
              {{ email }}
            </ULink>
          </p>
        </div>
      </template>

      <template v-else>
        <UButton
          color="neutral"
          variant="outline"
          icon="i-lucide-eye"
          class="w-fit"
          @click="reveal"
        >
          Angaben anzeigen
        </UButton>
        <noscript>
          <address class="text-muted not-italic leading-relaxed">
            <span style="unicode-bidi: bidi-override; direction: rtl">{{
              nameReversed
            }}</span
            ><br />
            <template v-for="line in addressReversed" :key="line">
              <span style="unicode-bidi: bidi-override; direction: rtl">{{
                line
              }}</span
              ><br />
            </template>
          </address>
          <p class="text-muted">
            E-Mail:
            <span style="unicode-bidi: bidi-override; direction: rtl">{{
              emailReversed
            }}</span>
          </p>
        </noscript>
      </template>
    </section>
  </UContainer>
</template>
