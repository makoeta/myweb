<template>
  <UBlogPosts>
    <UBlogPost
      v-for="(post, index) in page"
      :key="index"
      v-bind="post"
      :to="post.path"
    >
    </UBlogPost>
  </UBlogPosts>
</template>

<script lang="ts" setup>
const props = defineProps<{
  collectionName: String;
}>();

const collectionName = props.collectionName + "";

const { data: page } = await useAsyncData(collectionName, () => {
  return queryCollection(collectionName).limit(2).all();
});

console.log("here: ", page.value);
</script>

<style></style>
