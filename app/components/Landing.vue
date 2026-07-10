<script setup lang="ts">
const props = defineProps<{
  title?: string;
  subtitle?: string;
  notes?: string;
}>();

const notesHtml = computed(() => {
  if (!props.notes) return "";

  const escaped = props.notes
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

  return escaped.replace(
    /\[([^\]]+)\]\(([^)]+)\)(?:\{[^}]*\})?/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>',
  );
});
</script>

<template>
  <section class="flex min-h-[66vh] flex-col justify-end pb-20 pt-16">
    <div class="max-w-6xl">
      <p
        v-if="subtitle"
        class="mt-10 max-w-4xl text-[clamp(2rem,3vw,2.65rem)] font-light leading-[1.12] tracking-normal text-fg"
      >
        {{ subtitle }}
      </p>
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
