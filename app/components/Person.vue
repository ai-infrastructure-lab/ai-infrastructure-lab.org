<script setup lang="ts">
defineProps<{
  image?: string
  name?: string
}>()
</script>

<template>
  <section class="grid gap-5 border-t border-fg/15 py-8 first:border-t-0 sm:grid-cols-[7rem_1fr]">
    <NuxtImg
      v-if="image"
      :src="image"
      :alt="name || ''"
      class="size-28 object-cover grayscale"
      width="112"
      height="112"
    />
    <div class="leading-7">
      <slot />
    </div>
  </section>
</template>
