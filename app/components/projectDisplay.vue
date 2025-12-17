<template>
  <div class="grid grid-cols-2 gap-4 justify-between">
    <UBlogPost
      v-for="(post, index) in page"
      :key="index"
      v-bind="post"
      :to="post.path"
      class="w-152"
    >
    </UBlogPost>
  </div>
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
