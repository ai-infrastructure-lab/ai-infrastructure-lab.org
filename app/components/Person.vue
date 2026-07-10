<script setup lang="ts">
defineProps<{
  image?: string
  name?: string
}>()
</script>

<template>
  <section class="my-8 grid gap-5 rounded-[1.5rem] border border-fg/10 bg-bg2/60 p-5 sm:grid-cols-[7rem_1fr]">
    <NuxtImg
      v-if="image"
      :src="image"
      :alt="name || ''"
      class="size-28 rounded-2xl object-cover grayscale"
      width="112"
      height="112"
    />
    <div class="leading-7">
      <slot />
    </div>
  </section>
</template>
