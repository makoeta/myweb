<script setup lang="ts">
import Mfooter from "~/components/mfooter.vue";
import Mheader from "~/components/mheader.vue";
</script>

<template>
  <div>
    <Mheader />
    <slot />
    <Mfooter />
  </div>
</template>
