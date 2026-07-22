<script setup lang="ts">
const route = useRoute()
const path = computed(() => {
  const slug = route.params.slug
  const segments = Array.isArray(slug) ? slug : slug ? [slug] : []
  return `/${segments.join('/')}` || '/'
})

const { data: page } = await useAsyncData(`page:${path.value}`, () =>
  queryCollection('pages').path(path.value).first()
)

const isNewsItem = computed(() => path.value.startsWith('/news/'))

if (!page.value || isNewsItem.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found' })
}

useSeoMeta({
  title: () => page.value?.title || 'The AI Infrastructure Lab',
  description: () => page.value?.description,
  ogTitle: () => page.value?.title || 'The AI Infrastructure Lab',
  ogDescription: () => page.value?.description
})

const section = computed(() => {
  const [, firstSegment] = path.value.split('/')

  if (firstSegment === 'aiwalks') return 'AI walk'
  if (firstSegment === 'projects') return 'Project'
  if (firstSegment === 'blog') return 'Blog'
  if (firstSegment) return firstSegment
  return 'Page'
})

const formattedDate = computed(() => {
  if (!page.value?.date) return null

  return new Date(page.value.date).toLocaleDateString('en', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})

const showHeroDescription = computed(() => path.value !== '/about' && page.value?.description)
const showSectionLabel = computed(() => !['/about', '/people', '/publications'].includes(path.value))
</script>

<template>
  <article v-if="page" class="pt-8">
    <header class="w-full py-8 text-center lg:py-24">
      <div class="mx-auto flex max-w-5xl flex-col items-center justify-between">
        <div>
          <h1
            class="mx-auto max-w-5xl text-[clamp(2.75rem,7vw,5.75rem)] font-normal leading-[0.92] tracking-normal text-fg"
          >
            {{ page.title }}
          </h1>
          <p v-if="showSectionLabel" class="block-label mt-6 text-hi!">{{ section }}</p>
        </div>
        <div v-if="showHeroDescription" class="mx-auto mt-6 max-w-2xl lg:mt-8">
          <p
            class="text-xl font-light leading-9 tracking-normal text-fg2"
          >
            {{ page.description }}
          </p>
        </div>
      </div>
    </header>

    <div v-if="formattedDate || page.author" class="pt-1 text-center text-xs tracking-normal text-fg2">
      <time v-if="formattedDate" :datetime="new Date(page.date).toISOString()">
        {{ formattedDate }}
      </time>
      <p v-if="page.author" class="mt-1 text-xs font-normal normal-case tracking-normal text-fg2">
        {{ page.author }}
      </p>
    </div>

    <div class="prose-lab prose-lab--article mt-4">
      <ContentRenderer :value="page" />
    </div>
  </article>
</template>
