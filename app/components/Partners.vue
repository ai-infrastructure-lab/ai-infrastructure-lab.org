<script setup lang="ts">
type Partner = {
  title: string
  url?: string
  image?: string
  imageDark?: string
  imageLight?: string
}

const { data } = await useAsyncData('partners', () =>
  queryCollection('siteData').where('stem', '=', 'partners').first()
)

const partners = computed<Partner[]>(() => {
  const document = data.value as { items?: Partner[]; meta?: { items?: Partner[] } } | null

  return document?.meta?.items || document?.items || []
})
</script>

<template>
  <ContentSection
    title="Partners"
    content-class="grid grid-cols-2 items-center gap-3 sm:grid-cols-3 md:gap-6"
  >
    <a
      v-for="partner in partners"
      :key="partner.title"
      :href="partner.url"
      class="flex min-h-24 items-center justify-center rounded-md border border-fg/10 bg-bg2 p-4 no-underline transition hover:border-hi/40 hover:text-hi"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div v-if="partner.image" class="flex h-16 w-full items-center justify-center sm:h-20">
        <img
          :src="`/${partner.imageLight || partner.image}`"
          :alt="partner.title"
          class="theme-logo theme-logo--dark max-h-full max-w-[9rem] object-contain sm:max-w-[11rem]"
          loading="lazy"
        >
        <img
          :src="`/${partner.imageDark || partner.image}`"
          :alt="partner.title"
          class="theme-logo theme-logo--light max-h-full max-w-[9rem] object-contain sm:max-w-[11rem]"
          loading="lazy"
        >
      </div>
    </a>
  </ContentSection>
</template>
