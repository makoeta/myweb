<script setup lang="ts">
import Imgdisplay from "~/components/imgdisplay.vue";
import ProjectDisplay from "~/components/projectDisplay.vue";
</script>

<template>
  <div class="w-screen flex flex-col gap-6 m-auto">
    <Imgdisplay />

    <div class="flex flex-col w-screen justify-center gap-4">
      <ProjectDisplay collectionName="personalProject" />

      <ProjectDisplay collectionName="studentProject" />
    </div>
  </div>
</template>
