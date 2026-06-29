<script setup lang="ts">
const route = useRoute();

const { data: doc } = await useAsyncData(
  `project-${route.path}`,
  async () => {
    const personal = await queryCollection("personalProject").path(route.path).first();
    if (personal) return personal;
    return await queryCollection("studentProject").path(route.path).first();
  },
  {
    getCachedData: (key, nuxtApp) =>
      nuxtApp.payload.data[key] ?? nuxtApp.static.data[key],
  }
);

if (!doc.value) {
  throw createError({ statusCode: 404, statusMessage: "project not found" });
}

useSeo({
  title: doc.value?.title ?? "project",
  description:
    doc.value?.description || `${doc.value?.title ?? "A project"} by Max König.`,
  image: doc.value?.image || undefined,
});
</script>

<template>
  <UContainer v-if="doc" class="py-12 flex flex-col gap-8 max-w-3xl">
    <UButton to="/projects" variant="link" icon="i-lucide-arrow-left" class="self-start">
      back to projects
    </UButton>

    <div class="flex flex-col gap-3">
      <h1 class="text-3xl">{{ doc.title }}</h1>
      <p v-if="doc.description" class="text-muted text-lg">{{ doc.description }}</p>
      <div v-if="doc.tags?.length" class="flex gap-2 flex-wrap">
        <UBadge v-for="t in doc.tags" :key="t" color="neutral" variant="subtle">{{ t }}</UBadge>
      </div>
      <div v-if="doc.repo || doc.link" class="flex gap-2 flex-wrap">
        <UButton
          v-if="doc.repo"
          :to="doc.repo"
          target="_blank"
          icon="i-simple-icons-github"
          color="neutral"
          variant="subtle"
        >
          view on github
        </UButton>
        <UButton
          v-if="doc.link"
          :to="doc.link"
          target="_blank"
          icon="i-lucide-external-link"
          color="neutral"
          variant="subtle"
        >
          live
        </UButton>
      </div>
    </div>

    <img
      v-if="doc.image"
      :src="doc.image"
      :alt="doc.title"
      class="w-full rounded-lg border border-default bg-white"
    />

    <div class="prose dark:prose-invert max-w-none">
      <ContentRenderer :value="doc" />
    </div>
  </UContainer>
</template>
