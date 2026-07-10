<script setup lang="ts">
const { data: items } = await useAsyncData("blog-list", () =>
  queryCollection("pages")
    .where("path", "LIKE", "/blog/%")
    .where("status", "=", "published")
    .order("date", "DESC")
    .limit(3)
    .all(),
);

const formatDateStamp = (date?: string | Date) => {
  if (!date) return null;

  const value = new Date(date);

  return {
    day: value.toLocaleDateString("en", { day: "2-digit" }),
    month: value.toLocaleDateString("en", { month: "short" }),
    year: value.toLocaleDateString("en", { year: "2-digit" }),
  };
};
</script>

<template>
  <ContentSection
    title="Blog"
    to="/blog"
    content-class="grid gap-12 md:grid-cols-3"
  >
    <NuxtLink
      v-for="item in items"
      :key="item.path"
      :to="item.path"
      class="glow-card group relative flex flex-col overflow-hidden rounded-md border border-fg/10 bg-bg2 p-5 tracking-normal text-fg no-underline transition"
    >
      <div class="relative z-10">
        <div class="flex items-start justify-between gap-4">
          <p class="block-label">Blog</p>
          <time
            v-if="item.date"
            :datetime="new Date(item.date).toISOString()"
            class="flex h-16 w-14 shrink-0 flex-col items-center justify-center gap-1 rounded-sm border border-fg/20 text-center uppercase leading-none text-fg"
          >
            <span class="text-[1.8rem] font-normal leading-none">{{
              formatDateStamp(item.date)?.day
            }}</span>
            <span class="flex items-center gap-1 text-[0.62rem] font-normal leading-none tracking-normal">
              <span>{{ formatDateStamp(item.date)?.month }}</span>
              <span>{{ formatDateStamp(item.date)?.year }}</span>
            </span>
          </time>
        </div>

        <h3
          class="mt-8 text-4xl! font-normal! normal-case! tracking-normal! text-fg "
        >
          {{ item.title }}
        </h3>
      </div>

      <p class="relative z-10 mt-8 text-[clamp(1rem,1.6vw,1.35rem)]! leading-[1.45]! tracking-normal! text-fg2 font-light">
        {{ item.description }}
      </p>
      <span class="card-read-more relative z-10">Read more</span>
    </NuxtLink>
  </ContentSection>
</template>
