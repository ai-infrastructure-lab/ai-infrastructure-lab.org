<script setup lang="ts">
import { renderInlineMarkdown } from "~/utils/renderInlineMarkdown";

const props = defineProps<{
  title: string;
  description: string;
  section: "news" | "blog" | "aiwalks" | "projects";
}>();

const { data: items } = await useAsyncData(`listing:${props.section}`, () =>
  queryCollection("pages")
    .where("path", "LIKE", `/${props.section}/%`)
    .where("status", "=", "published")
    .order("date", "DESC")
    .all(),
);

const listingGridClass = computed(() => {
  if (props.section === "projects") return "grid gap-12 md:grid-cols-2";
  if (props.section === "blog") return "grid gap-12 md:grid-cols-3";
  if (props.section === "aiwalks") return "grid gap-4";
  return "grid gap-3";
});

const itemVariant = computed(() =>
  props.section === "news" ? "list" : "card",
);
const descriptionHtml = computed(() => renderInlineMarkdown(props.description));

useSeoMeta({
  title: props.title,
  description: props.description,
  ogTitle: props.title,
  ogDescription: props.description,
});
</script>

<template>
  <section class="pt-8">
    <header
      v-if="description"
      class="mx-auto max-w-5xl py-10 text-center lg:py-24"
    >
      <div class="mx-auto max-w-2xl">
        <p
          class="text-lg font-light leading-8 tracking-normal text-fg2"
          v-html="descriptionHtml"
        />
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
