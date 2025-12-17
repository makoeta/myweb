<script setup lang="ts">
import Imgdisplay from "~/components/imgdisplay.vue";
import ProjectDisplay from "~/components/projectDisplay.vue";
</script>

<template>
  <div class="w-screen flex flex-col gap-6 m-auto justify-center">
    <Imgdisplay />

    <div class="w-screen flex flex-col items-center">
      <div class="flex flex-col items-center w-fit gap-y-4">
        <div class="self-start">Some of my projects...</div>
        <ProjectDisplay collectionName="personalProject" />

        <ProjectDisplay collectionName="studentProject" />
      </div>
    </div>
  </div>
</template>
