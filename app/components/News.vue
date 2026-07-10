<script setup lang="ts">
type NewsItem = {
  title: string;
  date?: string | Date;
  author?: string;
  status?: string;
  body?: string;
};

const { data } = await useAsyncData("news-list", () =>
  queryCollection("siteData").where("stem", "=", "news").first(),
);

const items = computed<NewsItem[]>(() => {
  const document = data.value as
    | { items?: NewsItem[]; meta?: { items?: NewsItem[] } }
    | null;

  return [...(document?.meta?.items || document?.items || [])]
    .filter((item) => item.status === "published")
    .sort(
      (a, b) =>
        new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime(),
    );
});

const formatDateBlock = (date?: string | Date) => {
  if (!date) return null;

  const value = new Date(date);

  return {
    day: value.toLocaleDateString("en", { day: "2-digit" }),
    month: value.toLocaleDateString("en", { month: "short" }),
    year: value.toLocaleDateString("en", { year: "2-digit" }),
  };
};

const formatBodyParagraphs = (body?: string) =>
  body
    ?.split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean) || [];
</script>

<template>
  <ContentSection
    title="News"
    section-id="news"
    content-class="grid gap-x-8 gap-y-10 md:grid-cols-2 xl:grid-cols-3"
  >
    <article
      v-for="item in items"
      :key="`${item.date || 'undated'}-${item.title}`"
      class="grid grid-cols-[3.75rem_1fr] gap-4 border-t border-fg/15 py-6 tracking-normal first:border-t-0 md:border-t-0"
    >
      <time
        v-if="item.date"
        :datetime="new Date(item.date).toISOString()"
        class="flex h-16 w-14 shrink-0 flex-col items-center justify-center gap-1 rounded bg-bg2 text-center uppercase leading-none text-fg transition hover:text-fg"
      >
        <span class="text-[1.8rem] font-normal leading-none">{{
          formatDateBlock(item.date)?.day
        }}</span>
        <span
          class="flex items-center gap-1 text-[0.62rem] font-normal leading-none tracking-normal"
        >
          <span>{{ formatDateBlock(item.date)?.month }}</span>
          <span>'{{ formatDateBlock(item.date)?.year }}</span>
        </span>
      </time>
      <div>
        <h3
          class="mt-0 mb-0 text-md! font-normal! normal-case! tracking-normal! text-fg"
        >
          {{ item.title }}
        </h3>
        <div v-if="item.body" class="prose-lab prose-lab--news mt-2">
          <p
            v-for="paragraph in formatBodyParagraphs(item.body)"
            :key="paragraph"
          >
            {{ paragraph }}
          </p>
        </div>
      </div>
    </article>
  </ContentSection>
</template>
