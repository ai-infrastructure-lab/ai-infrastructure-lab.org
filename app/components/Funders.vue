<script setup lang="ts">
type Funder = {
  title: string
  url?: string
  image?: string
  imageDark?: string
  imageLight?: string
}

const { data } = await useAsyncData('funders', () =>
  queryCollection('siteData').where('stem', '=', 'funders').first()
)

const funders = computed<Funder[]>(() => {
  const document = data.value as { items?: Funder[]; meta?: { items?: Funder[] } } | null

  return document?.meta?.items || document?.items || []
})
</script>

<template>
  <ContentSection
    title="Funders"
    content-class="grid grid-cols-2 items-center gap-3 sm:grid-cols-3 md:gap-6"
  >
    <a
      v-for="funder in funders"
      :key="funder.title"
      :href="funder.url"
      class="flex min-h-24 items-center justify-center rounded-md border border-fg/10 bg-bg2 p-4 no-underline transition hover:border-hi/40 hover:text-hi"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div v-if="funder.image" class="flex h-16 w-full items-center justify-center sm:h-20">
        <img
          :src="`/${funder.imageLight || funder.image}`"
          :alt="funder.title"
          class="theme-logo theme-logo--dark max-h-full max-w-[9rem] object-contain sm:max-w-[11rem]"
          loading="lazy"
        >
        <img
          :src="`/${funder.imageDark || funder.image}`"
          :alt="funder.title"
          class="theme-logo theme-logo--light max-h-full max-w-[9rem] object-contain sm:max-w-[11rem]"
          loading="lazy"
        >
      </div>
    </a>
  </ContentSection>
</template>
