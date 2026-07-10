<script setup lang="ts">
const { data: page } = await useAsyncData('page:/', () =>
  queryCollection('pages').path('/').first()
)

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found' })
}

useSeoMeta({
  title: () => page.value?.title || 'The AI Infrastructure Lab',
  description: () => page.value?.description,
  ogTitle: () => page.value?.title || 'The AI Infrastructure Lab',
  ogDescription: () => page.value?.description
})
</script>

<template>
  <article class="prose-lab">
    <ContentRenderer v-if="page" :value="page" />
  </article>
</template>
