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
  vite: { plugins: [tailwindcss()] },
});
