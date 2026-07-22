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
    <header class="mx-auto max-w-5xl py-10 text-center lg:py-24">
      <h1
        class="mx-auto max-w-5xl text-[clamp(2.75rem,7vw,5.75rem)] font-normal leading-[0.92] tracking-normal text-fg"
      >
        Publications
      </h1>
      <div class="mx-auto mt-8 max-w-2xl lg:mt-12">
        <p class="text-lg font-light leading-8 tracking-normal text-fg2">
        </p>
      </div>
    </header>

    <div class="mx-auto max-w-5xl space-y-14">
      <Publications :show-header="false" />
    </div>
  </section>
</template>
