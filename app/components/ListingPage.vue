<script setup lang="ts">
const props = defineProps<{
  title: string
  description: string
  section: 'news' | 'blog' | 'aiwalks' | 'projects'
}>()

const { data: items } = await useAsyncData(`listing:${props.section}`, () =>
  queryCollection('pages')
    .where('path', 'LIKE', `/${props.section}/%`)
    .where('status', '=', 'published')
    .order('date', 'DESC')
    .all()
)

const listingGridClass = computed(() => {
  if (props.section === 'projects') return 'grid gap-12 md:grid-cols-2'
  if (props.section === 'blog') return 'grid gap-12 md:grid-cols-3'
  if (props.section === 'aiwalks') return 'grid gap-4'
  return 'grid gap-3'
})

const itemVariant = computed(() => (props.section === 'news' ? 'list' : 'card'))

useSeoMeta({
  title: props.title,
  description: props.description,
  ogTitle: props.title,
  ogDescription: props.description
})
</script>

<template>
  <section class="pt-8">
    <header class="mx-auto max-w-5xl py-10 text-center lg:py-24">
      <h1
        class="mx-auto max-w-5xl text-[clamp(2.75rem,7vw,5.75rem)] font-normal leading-[0.92] tracking-normal text-fg"
      >
        {{ title }}
      </h1>
      <div class="mx-auto mt-8 max-w-2xl lg:mt-12">
        <p class="text-lg font-light leading-8 tracking-normal text-fg2">
          {{ description }}
        </p>
      </div>
    </header>

    <div class="mt-10" :class="listingGridClass">
      <ContentCard
        v-for="item in items"
        :key="item.path"
        :item="item"
        :section="props.section"
        :variant="itemVariant"
      />
    </div>
  </section>
</template>
