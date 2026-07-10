<script setup lang="ts">
defineProps<{
  title: string
  to?: string
  hideHeader?: boolean
  contentClass?: string
  sectionId?: string
}>()
</script>

<template>
  <section :id="sectionId" class="my-16">
    <div v-if="!hideHeader" class="mb-6 flex items-end justify-between gap-4">
      <h2 class="block-label !m-0">{{ title }}</h2>
      <NuxtLink
        v-if="to"
        :to="to"
        class="block-label no-underline transition hover:text-hi"
      >
        View all
      </NuxtLink>
    </div>
    <div :class="contentClass || 'grid gap-4 md:grid-cols-3'">
      <slot />
    </div>
  </section>
</template>
