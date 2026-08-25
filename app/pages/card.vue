<script setup lang="ts">
// Full-screen digital business card — meant to be linked/QR'd directly to
// someone you're meeting, not browsed to via the main nav. It opts out of
// the default layout (no Mheader/Mfooter) to fill the whole viewport, and
// is always dark regardless of the visitor's site theme — a fixed "terminal
// card" identity rather than something that should shift with color mode.
import { renderSVG } from "uqr";

definePageMeta({ layout: false });

useSeo({
  title: "business card",
  description: "Scan the QR code to save Maximilian König's contact.",
});

const NAME = "Maximilian König";
const TITLE = "Software Engineer";
const SITE = "maxkoenig.de";
const SITE_URL = `https://${SITE}`;

// Same Base64-in-env / decode-in-browser pattern as MailButton and the
// impressum page: no plaintext e-mail ships in the prerendered static HTML.
// Unlike those, this page decodes immediately on mount rather than gating
// behind a click — the whole point of the page is to hand over contact info.
const cfg = useRuntimeConfig().public.imprint;
const decode = (b64: string) => {
  if (!b64) return "";
  try {
    return atob(b64);
  } catch {
    return "";
  }
};

function buildVcard(email: string) {
  return [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${NAME}`,
    `TITLE:${TITLE}`,
    `EMAIL:${email}`,
    `URL:${SITE_URL}`,
    "END:VCARD",
  ].join("\n");
}

const email = ref("");
const qrSvg = ref("");

onMounted(() => {
  email.value = decode(cfg.email);
  if (email.value) {
    qrSvg.value = renderSVG(buildVcard(email.value), {
      ecc: "M",
      border: 1,
      blackColor: "currentColor",
      whiteColor: "transparent",
    });
  }
});
</script>

<template>
  <!-- full screen, nothing but the card: no site header, no page title/blurb -->
  <div class="h-dvh w-full bg-black text-neutral-200 flex items-center justify-center p-4 sm:p-8">
    <div class="w-full max-w-6xl">
      <!-- daisyUI-style hover-3d: 8 invisible zones on top of the card, each
           tilting it toward the cursor. Pure CSS (:has() + custom props),
           no JS. Desktop/mouse only — a no-op on touch, which is fine. -->
      <div class="card-3d w-full">
        <div
          class="grid grid-cols-1 sm:grid-cols-[1.15fr_0.85fr] border border-white/10 rounded-xl overflow-hidden"
        >
          <!-- left: identity -->
          <div
            class="p-10 sm:p-16 bg-[#0d0d0f] flex flex-col justify-center border-b sm:border-b-0 sm:border-r border-white/10"
          >
            <div
              class="inline-flex w-fit px-3.5 py-2 mb-7 rounded-md text-sm text-primary bg-primary/10 border border-primary/30"
            >
              {{ TITLE }}
            </div>
            <div class="text-4xl sm:text-5xl font-bold text-white mb-9 tracking-tight">
              {{ NAME }}
            </div>

            <div class="flex flex-col gap-5 pt-8 border-t border-white/10">
              <a
                v-if="email"
                :href="`mailto:${email}`"
                class="flex items-center gap-3 text-lg no-underline hover:text-primary transition-colors"
              >
                <UIcon name="i-lucide-mail" class="size-5 text-primary shrink-0" />
                {{ email }}
              </a>
              <div v-else class="flex items-center gap-3 text-lg text-neutral-500">
                <UIcon name="i-lucide-mail" class="size-5 text-primary shrink-0" />
                loading…
              </div>
              <a
                :href="SITE_URL"
                target="_blank"
                class="flex items-center gap-3 text-lg no-underline hover:text-primary transition-colors"
              >
                <UIcon name="i-lucide-globe" class="size-5 text-primary shrink-0" />
                {{ SITE }}
              </a>
            </div>
          </div>

          <!-- right: QR + download -->
          <div
            class="p-10 sm:p-16 flex flex-col items-center justify-center gap-6 bg-[#0b0f10]"
            style="background-image:linear-gradient(rgba(94,234,212,0.06) 1px, transparent 1px),linear-gradient(90deg, rgba(94,234,212,0.06) 1px, transparent 1px);background-size:28px 28px"
          >
            <div
              class="bg-[#111315] p-5 rounded-md border border-primary/25 shadow-[0_0_32px_-8px] shadow-primary/15 size-56 sm:size-72 flex items-center justify-center text-primary"
            >
              <div v-if="qrSvg" class="size-full" v-html="qrSvg" />
              <UIcon v-else name="i-lucide-loader-2" class="size-8 animate-spin text-neutral-600" />
            </div>
            <div class="text-center">
              <div class="text-base font-semibold text-white mb-1.5">scan to save contact</div>
              <div class="text-sm text-neutral-400 leading-relaxed">
                adds {{ NAME }} to your phone
              </div>
            </div>
          </div>
        </div>

        <!-- 8 hover zones for the tilt effect, see .card-3d in <style> -->
        <div aria-hidden="true"></div>
        <div aria-hidden="true"></div>
        <div aria-hidden="true"></div>
        <div aria-hidden="true"></div>
        <div aria-hidden="true"></div>
        <div aria-hidden="true"></div>
        <div aria-hidden="true"></div>
        <div aria-hidden="true"></div>
      </div>

      <noscript>
        <p class="text-neutral-400 text-sm mt-6">
          Enable JavaScript to load the contact card and QR code.
        </p>
      </noscript>
    </div>
  </div>
</template>

<style>
/* Adapted from daisyUI's hover-3d component (https://daisyui.com/components/hover-3d/),
   rewritten as flat CSS since this page doesn't use daisyUI. Pure CSS, no JS:
   8 invisible zone divs sit on top of the card; :has() detects which zone the
   cursor is in and a per-zone --transform/--shine/--shadow triple drives the
   tilt, sheen and shadow. Desktop/mouse only — harmless no-op on touch. */
.card-3d {
  display: inline-grid;
  width: 100%;
  perspective: 75rem;
  --transform: 0, 0;
  --shine: 100% 100%;
  --shadow: 0rem 0rem 0rem;
  --ease: linear(0, 0.931 13.8%, 1.196 21.4%, 1.343 29.8%, 1.378 36%, 1.365 43.2%, 1.059 78%, 1);
  filter: drop-shadow(var(--shadow) 0.1rem rgba(0, 0, 0, 0.03)) drop-shadow(var(--shadow) 0.2rem rgba(0, 0, 0, 0.03))
    drop-shadow(var(--shadow) 0.3rem rgba(0, 0, 0, 0.03)) drop-shadow(var(--shadow) 0.4rem rgba(0, 0, 0, 0.03));
  transition: filter ease-out 400ms;
}
.card-3d > :nth-child(n + 2) {
  isolation: isolate;
  z-index: 1;
  scale: 1.2;
}
.card-3d > :first-child {
  position: relative;
  overflow: hidden;
  grid-area: 1 / 1 / 4 / 4;
  transform: rotate3d(var(--transform), 0, 4deg);
  transition:
    transform var(--ease) 500ms,
    scale var(--ease) 500ms,
    outline-color ease-out 500ms;
  outline: 0.5px solid transparent;
  outline-offset: -1px;
}
.card-3d > :first-child::before {
  content: "";
  pointer-events: none;
  position: absolute;
  z-index: 1;
  width: 33.3333%;
  height: 33.3333%;
  scale: 500%;
  opacity: 0;
  filter: blur(0.75rem);
  background-image: radial-gradient(circle at 50%, rgba(255, 255, 255, 0.2) 10%, transparent 50%);
  translate: var(--shine);
  transition:
    translate ease-out 400ms,
    opacity ease-out 400ms;
}
.card-3d:hover {
  --ease: linear(0, 0.708 15.2%, 0.927 23.6%, 1.067 33%, 1.12 41%, 1.13 50.2%, 1.019 83.2%, 1);
}
.card-3d:hover > :first-child {
  outline-color: rgba(255, 255, 255, 0.1);
  scale: 1.015;
}
.card-3d:hover > :first-child::before {
  opacity: 0.6;
}
.card-3d > :nth-child(2) { grid-area: 1 / 1 / 2 / 2; }
.card-3d > :nth-child(3) { grid-area: 1 / 2 / 2 / 3; }
.card-3d > :nth-child(4) { grid-area: 1 / 3 / 2 / 4; }
.card-3d > :nth-child(5) { grid-area: 2 / 1 / 3 / 2; }
.card-3d > :nth-child(6) { grid-area: 2 / 3 / 3 / 4; }
.card-3d > :nth-child(7) { grid-area: 3 / 1 / 4 / 2; }
.card-3d > :nth-child(8) { grid-area: 3 / 2 / 4 / 3; }
.card-3d > :nth-child(9) { grid-area: 3 / 3 / 4 / 4; }

.card-3d:has(> :nth-child(2):hover) { --transform: -0.4, 0.4; --shine: 0% 0%; --shadow: -0.2rem -0.2rem; }
.card-3d:has(> :nth-child(3):hover) { --transform: -0.4, 0; --shine: 100% 0%; --shadow: 0rem -0.2rem; }
.card-3d:has(> :nth-child(4):hover) { --transform: -0.4, -0.4; --shine: 200% 0%; --shadow: 0.2rem -0.2rem; }
.card-3d:has(> :nth-child(5):hover) { --transform: 0, 0.4; --shine: 0% 100%; --shadow: -0.2rem 0rem; }
.card-3d:has(> :nth-child(6):hover) { --transform: 0, -0.4; --shine: 200% 100%; --shadow: 0.2rem 0rem; }
.card-3d:has(> :nth-child(7):hover) { --transform: 0.4, 0.4; --shine: 0% 200%; --shadow: -0.2rem 0.2rem; }
.card-3d:has(> :nth-child(8):hover) { --transform: 0.4, 0; --shine: 100% 200%; --shadow: 0rem 0.2rem; }
.card-3d:has(> :nth-child(9):hover) { --transform: 0.4, -0.4; --shine: 200% 200%; --shadow: 0.2rem 0.2rem; }
</style>
