<script setup lang="ts">
useSeo({
  title: "skills",
  description:
    "The core languages, frameworks and tools Maximilian König works with.",
});

// A curated stack — not the full github.com/makoeta badge wall. Each row pairs
// a label with a verified simple-icons slug and a short note on what it's for.
interface Skill {
  name: string;
  icon: string;
  note: string;
}
interface Category {
  title: string;
  icon: string;
  items: Skill[];
}

const categories: Category[] = [
  {
    title: "languages",
    icon: "i-lucide-code-xml",
    items: [
      { name: "Python", icon: "i-simple-icons-python", note: "ML, scripting & backends" },
      { name: "TypeScript", icon: "i-simple-icons-typescript", note: "day-to-day, front & back" },
      { name: "Java", icon: "i-simple-icons-openjdk", note: "backend services" },
      { name: "Rust", icon: "i-simple-icons-rust", note: "systems & performance work" },
    ],
  },
  {
    title: "frameworks",
    icon: "i-lucide-layout-template",
    items: [
      { name: "LangChain", icon: "i-simple-icons-langchain", note: "LLM app orchestration" },
      { name: "Agno", icon: "i-lucide-bot", note: "agentic AI framework" },
      { name: "Vue / Nuxt", icon: "i-simple-icons-nuxt", note: "frontend framework of choice" },
      { name: "FastAPI", icon: "i-simple-icons-fastapi", note: "Python web APIs" },
      { name: "Angular", icon: "i-simple-icons-angular", note: "component-based frontends" },
      { name: "Spring", icon: "i-simple-icons-spring", note: "Java web backends" },
    ],
  },
  {
    title: "machine learning",
    icon: "i-lucide-brain-circuit",
    items: [
      { name: "PyTorch", icon: "i-simple-icons-pytorch", note: "deep learning" },
      { name: "TensorFlow", icon: "i-simple-icons-tensorflow", note: "deep learning" },
      { name: "scikit-learn", icon: "i-simple-icons-scikitlearn", note: "classical ML" },
    ],
  },
  {
    title: "databases",
    icon: "i-lucide-database",
    items: [
      { name: "PostgreSQL", icon: "i-simple-icons-postgresql", note: "relational, my default" },
      { name: "MongoDB", icon: "i-simple-icons-mongodb", note: "document store" },
      { name: "MySQL", icon: "i-simple-icons-mysql", note: "relational" },
      { name: "SQLite", icon: "i-simple-icons-sqlite", note: "embedded & local" },
    ],
  },
  {
    title: "tools & infrastructure",
    icon: "i-lucide-wrench",
    items: [
      { name: "Docker", icon: "i-simple-icons-docker", note: "containerization" },
      { name: "Git", icon: "i-simple-icons-git", note: "version control" },
      { name: "GitHub Actions", icon: "i-simple-icons-githubactions", note: "CI/CD pipelines" },
      { name: "Linux", icon: "i-simple-icons-linux", note: "daily driver & servers" },
      { name: "Raspberry Pi", icon: "i-simple-icons-raspberrypi", note: "IoT & hardware projects" },
    ],
  },
];
</script>

<template>
  <UContainer class="max-w-3xl py-16">
    <header class="mb-12 flex flex-col gap-2">
      <p class="text-primary text-sm">
        <span class="opacity-70">~</span> skills --list
      </p>
      <h1 class="text-3xl sm:text-4xl">things i work with</h1>
      <p class="text-muted">the core of my stack — the tools i reach for most.</p>
    </header>

    <div class="flex flex-col gap-10">
      <ScrollReveal
        v-for="(cat, i) in categories"
        :key="cat.title"
        as="section"
        :delay="i * 70"
        class="flex flex-col gap-1"
      >
        <h2 class="mb-1 flex items-center gap-2 text-sm text-muted">
          <UIcon :name="cat.icon" class="size-4 text-primary" />
          <span class="font-mono">{{ cat.title }}</span>
          <span class="h-px flex-1 bg-muted/20" />
        </h2>

        <ul class="flex flex-col">
          <li
            v-for="(s, j) in cat.items"
            :key="s.name"
            class="skill-row group flex select-none items-center gap-4 border-b border-default py-3.5 last:border-b-0"
          >
            <span
              class="w-6 shrink-0 font-mono text-xs text-muted/60"
              aria-hidden="true"
            >
              {{ String(j + 1).padStart(2, "0") }}
            </span>
            <UIcon
              :name="s.icon"
              class="size-5 shrink-0 text-muted transition-colors group-hover:text-primary"
              aria-hidden="true"
            />
            <span class="text-default">{{ s.name }}</span>
            <span class="ml-auto text-right text-sm text-muted">{{ s.note }}</span>
          </li>
        </ul>
      </ScrollReveal>
    </div>
  </UContainer>
</template>

<style scoped>
/* accent the row on hover via a left bar + tint — no layout shift, so text
   stays put and can be cleanly selected/copied mid-drag */
.skill-row {
  box-shadow: inset 2px 0 0 0 transparent;
  transition:
    border-color 0.2s,
    box-shadow 0.2s,
    background-color 0.2s;
}
.skill-row:hover {
  border-color: color-mix(in oklch, var(--ui-primary) 40%, transparent);
  box-shadow: inset 2px 0 0 0 var(--ui-primary);
  background-color: color-mix(in oklch, var(--ui-primary) 4%, transparent);
}
</style>
