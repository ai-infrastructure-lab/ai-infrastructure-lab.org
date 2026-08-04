<script setup lang="ts">
import { renderInlineMarkdown } from "~/utils/renderInlineMarkdown";

const props = defineProps<{
  title?: string;
  subtitle?: string;
  notes?: string;
}>();

const subtitleHtml = computed(() => renderInlineMarkdown(props.subtitle));
const notesHtml = computed(() => renderInlineMarkdown(props.notes));
</script>

<template>
  <section class="flex min-h-[60svh] flex-col justify-end pb-8 pt-24">
    <div class="">
      <p
        v-if="subtitle"
        class="mt-12 max-w-4xl text-[clamp(1.35rem,2.15vw,2.2rem)] font-light leading-[1.18] tracking-normal text-fg"
        v-html="subtitleHtml"
      />
      <div
        v-if="notes"
        class="mt-8 max-w-3xl text-sm leading-6 text-fg2"
        v-html="notesHtml"
      />
      <div v-else class="mt-8 max-w-3xl text-base leading-8 text-fg2">
        <slot />
      </div>
    </div>
  </section>
</template>
