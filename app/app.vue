<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'

const route = useRoute()
const { y } = useWindowScroll()
const lastY = ref(0)

const handleThemeToggle = (event: KeyboardEvent) => {
  if (event.key.toLowerCase() !== 'd' || event.metaKey || event.ctrlKey || event.altKey) return

  const target = event.target
  if (
    target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement ||
    target instanceof HTMLSelectElement ||
    (target instanceof HTMLElement && target.isContentEditable)
  ) {
    return
  }

  const root = document.documentElement
  root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light'
}

onMounted(() => {
  window.addEventListener('keydown', handleThemeToggle)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleThemeToggle)
})

watch(
  y,
  (current) => {
    if (!import.meta.client) return

    const nextDirection = current > lastY.value && current > 96 ? 'down' : 'up'
    document.documentElement.dataset.scrollDirection = nextDirection
    document.documentElement.dataset.scrolled = String(current > 12)
    lastY.value = current
  },
  { immediate: true }
)

useSeoMeta({
  titleTemplate: (title) =>
    title ? `${title} | The AI Infrastructure Lab` : 'The AI Infrastructure Lab',
  ogSiteName: 'The AI Infrastructure Lab',
  ogType: 'website',
  ogImage: 'https://ai-infrastructure-lab.org/og-image.png',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: 'The AI Infrastructure Lab icon on a dark background',
  twitterCard: 'summary_large_image',
  twitterImage: 'https://ai-infrastructure-lab.org/og-image.png'
})
</script>

<template>
  <div class="min-h-screen overflow-x-clip bg-bg text-fg">
    <SiteHeader />
    <main :key="route.fullPath" class="relative z-10 mx-auto w-full max-w-[104rem] px-5 pb-24 pt-28 sm:px-8 lg:px-12">
      <NuxtPage />
    </main>
    <SiteFooter class="relative z-10" />
  </div>
</template>
