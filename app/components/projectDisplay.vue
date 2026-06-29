<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    collectionName: string;
    limit?: number;
  }>(),
  { limit: 2 }
);

const { data: page } = await useAsyncData(
  `projects-${props.collectionName}-${props.limit}`,
  () => {
    const q = queryCollection(props.collectionName as "personalProject");
    return (props.limit ? q.limit(props.limit) : q).all();
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
    />
  </div>
</template>
