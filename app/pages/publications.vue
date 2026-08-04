<script setup lang="ts">
useSeoMeta({
  title: "Publications",
  description: "Research publications from The AI Infrastructure Lab.",
  ogTitle: "Publications",
  ogDescription: "Research publications from The AI Infrastructure Lab.",
});
</script>

<template>
  <section class="pt-8">
    <div class="mx-auto max-w-5xl space-y-14">
      <Publications :show-header="false" />
    </div>
  </section>
</template>
