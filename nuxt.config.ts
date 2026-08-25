import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  modules: [
    "@nuxt/content",
    "@nuxt/eslint",
    "@nuxt/devtools",
    "@nuxt/icon",
    "@nuxt/ui",
  ],
  pages: true,
  runtimeConfig: {
    public: {
      // Impressum (legal notice) details — filled from .env at build time so the
      // private postal address is not committed. Override via NUXT_PUBLIC_IMPRINT_*.
      imprint: {
        name: "",
        street: "",
        city: "",
        country: "",
        email: "",
        phone: "",
      },
    },
  },
  // Static site: fully prerendered for GitHub Pages.
  // Base URL is injected at build time via NUXT_APP_BASE_URL (see deploy workflow).
  ssr: false,
  nitro: {
    prerender: {
      crawlLinks: true,
      // "/card" is intentionally not linked from the main nav (it's a
      // direct/QR link handed to people, not a page to browse to), so
      // crawlLinks won't discover it on its own — list it explicitly.
      routes: ["/", "/card"],
    },
  },
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ["@vue/devtools-core", "@vue/devtools-kit"],
    },
  },
});
