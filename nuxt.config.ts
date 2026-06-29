import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["./app/assets/css/main.css"],
  modules: [
    "@nuxt/content",
    "@nuxt/eslint",
    "@nuxt/devtools",
    "@nuxt/icon",
    "@nuxt/ui",
  ],
  pages: true,
  // Static site: fully prerendered for GitHub Pages.
  // Base URL is injected at build time via NUXT_APP_BASE_URL (see deploy workflow).
  ssr: true,
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ["/"],
    },
  },
  vite: { plugins: [tailwindcss()] },
});
