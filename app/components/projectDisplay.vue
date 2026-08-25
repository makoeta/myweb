<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    collectionName: string;
    limit?: number;
    /** Skip the own grid wrapper so a parent can lay multiple
     * ProjectDisplay instances out in one shared grid (e.g. the landing
     * page combining student + personal into a single 2x2). */
    bare?: boolean;
  }>(),
  { limit: 2, bare: false }
);

// getCachedData reuses the SSR payload on in-app navigation: without it,
// useAsyncData re-runs queryCollection in the browser, where the collection
// dump isn't loaded, so it returns empty and the spotlight cards disappear
// until a hard reload.
const { data: page } = await useAsyncData(
  `projects-${props.collectionName}-${props.limit}`,
  () => {
    const q = queryCollection(props.collectionName as "personalProject");
    // Limited (spotlight) usage — e.g. the landing page — shows only
    // hand-picked `featured` entries. The full listing pages pass
    // limit=0 and intentionally see everything, featured or not.
    const filtered = props.limit ? q.where("featured", "=", true) : q;
    return (props.limit ? filtered.limit(props.limit) : filtered).all();
  },
  {
    getCachedData: (key, nuxtApp) =>
      nuxtApp.payload.data[key] ?? nuxtApp.static.data[key],
  }
);
</script>

<template>
  <!-- `bare` skips the own grid wrapper (a fragment root) so a parent can
  lay multiple ProjectDisplay instances out in one shared grid. -->
  <div v-if="!bare" class="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
    <UBlogPost
      v-for="post in page"
      :key="post.path"
      :title="post.title"
      :description="post.description"
      :image="post.image ? withBase(post.image) : undefined"
      :badge="post.tags?.[0]"
      :to="post.path"
      variant="subtle"
      class="w-full"
      :ui="{
        header: 'bg-default',
        image: 'object-fill object-center',
        description: 'text-xs',
      }"
    />
  </div>
  <template v-else>
    <UBlogPost
      v-for="post in page"
      :key="post.path"
      :title="post.title"
      :description="post.description"
      :image="post.image ? withBase(post.image) : undefined"
      :badge="post.tags?.[0]"
      :to="post.path"
      variant="subtle"
      class="w-full"
      :ui="{
        header: 'bg-default',
        image: 'object-fill object-center',
        description: 'text-xs',
      }"
    />
  </template>
</template>
