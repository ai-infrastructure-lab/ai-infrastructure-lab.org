<script setup lang="ts">
const { data: items } = await useAsyncData("projects-list", () =>
  queryCollection("pages")
    .where("path", "LIKE", "/projects/%")
    .where("status", "=", "published")
    .order("date", "DESC")
    .limit(5)
    .all(),
);

const visibleItems = computed(() => items.value?.slice(0, 4) || []);
const hasMoreItems = computed(() => (items.value?.length || 0) > 4);
</script>

<template>
  <ContentSection
    title="Projects"
    to="/projects"
    content-class="grid gap-12 md:grid-cols-2"
  >
    <NuxtLink
      v-for="item in visibleItems"
      :key="item.path"
      :to="item.path"
      class="glow-card group flex aspect-[6/4] flex-col justify-between rounded-md border border-fg/10 bg-bg2 p-5 tracking-normal text-fg no-underline transition"
    >
      <div>
        <p class="block-label">Project</p>
        <h3
          class="mt-8 text-[clamp(2rem,9vw,3rem)]! font-normal! leading-[1.02]! normal-case! tracking-normal! text-fg"
        >
          {{ item.title }}
        </h3>
      </div>
      <div class="mt-8">
        <p class="text-[clamp(1rem,2vw,1.5rem)]! leading-[1.35]! tracking-normal! text-fg2 font-light">
          {{ item.description }}
        </p>
        <span class="card-read-more">Read more</span>
      </div>
    </NuxtLink>

    <NuxtLink
      v-if="hasMoreItems"
      to="/projects"
      class="block-label mt-4 w-fit no-underline transition hover:text-hi md:col-span-2"
    >
      Read more
    </NuxtLink>
  </ContentSection>
</template>
