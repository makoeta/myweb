<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    collectionName: string;
    limit?: number;
  }>(),
  { limit: 2 }
);

// getCachedData reuses the SSR payload on in-app navigation: without it,
// useAsyncData re-runs queryCollection in the browser, where the collection
// dump isn't loaded, so it returns empty and the spotlight cards disappear
// until a hard reload.
const { data: page } = await useAsyncData(
  `projects-${props.collectionName}-${props.limit}`,
  () => {
    const q = queryCollection(props.collectionName as "personalProject");
    return (props.limit ? q.limit(props.limit) : q).all();
  },
  {
    getCachedData: (key, nuxtApp) =>
      nuxtApp.payload.data[key] ?? nuxtApp.static.data[key],
  }
);
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
    <UBlogPost
      v-for="post in page"
      :key="post.path"
      :title="post.title"
      :description="post.description"
      :image="post.image || undefined"
      :badge="post.tags?.[0]"
      :to="post.path"
      variant="subtle"
      class="w-full"
      :ui="{
        header: 'bg-default',
        image: 'object-contain object-center',
      }"
    />
  </div>
</template>
