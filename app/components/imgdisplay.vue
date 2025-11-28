<script lang="ts" setup>
const pauseOnHover = true;
</script>

<template>
  <div class="relative w-full h-[400px] bg-muted overflow-hidden">
    <div>
      <UMarquee
        reverse
        orientation="vertical"
        :overlay="false"
        :ui="{
          root: '[--duration:40s] absolute w-[460px] -left-[100px] -top-[300px] h-[940px] transform-3d rotate-x-55 rotate-y-0 rotate-z-30',
        }"
      >
        <img
          v-for="i in 4"
          :key="i"
          :src="`/blocks/image${i}.png`"
          width="460"
          height="258"
          :alt="`Nuxt UI Screenshot ${i}`"
          class="aspect-video border border-default rounded-lg bg-white"
        />
      </UMarquee>
      <UMarquee
        orientation="vertical"
        :overlay="false"
        :ui="{
          root: '[--duration:40s] absolute w-[460px] -top-[400px] left-[480px] h-[1160px] transform-3d rotate-x-55 rotate-y-0 rotate-z-30',
        }"
      >
        <img
          v-for="i in [5, 6, 7, 8]"
          :key="i"
          :src="`/blocks/image${i}.png`"
          width="460"
          height="258"
          :alt="`Nuxt UI Screenshot ${i}`"
          class="aspect-video border border-default rounded-lg bg-white"
        />
      </UMarquee>
    </div>

    <div class="relative left-[1170px] top-5">
      <UMarquee
        reverse
        orientation="vertical"
        :overlay="false"
        :ui="{
          root: '[--duration:40s] absolute w-[460px] -left-[130px] -top-[380px] h-[1160px] transform-3d rotate-x-55 rotate-y-0 rotate-z-30',
        }"
      >
        <img
          v-for="i in 4"
          :key="i"
          :src="`/blocks/image${i}.png`"
          width="460"
          height="258"
          :alt="`Nuxt UI Screenshot ${i}`"
          class="aspect-video border border-default rounded-lg bg-white"
        />
      </UMarquee>
      <UMarquee
        orientation="vertical"
        :overlay="false"
        :ui="{
          root: '[--duration:40s] absolute w-[460px] -top-[400px] left-[480px] h-[1160px] transform-3d rotate-x-55 rotate-y-0 rotate-z-30',
        }"
      >
        <img
          v-for="i in [5, 6, 7, 8]"
          :key="i"
          :src="`/blocks/image${i}.png`"
          width="460"
          height="258"
          :alt="`Nuxt UI Screenshot ${i}`"
          class="aspect-video border border-default rounded-lg bg-white"
        />
      </UMarquee>
    </div>
  </div>
</template>
