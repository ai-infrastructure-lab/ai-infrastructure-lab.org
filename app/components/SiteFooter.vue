<script setup lang="ts">
const { data: footer } = await useAsyncData("footer", () =>
  queryCollection("pages").path("/footer").first(),
);
</script>

<template>
  <footer class="border-t border-fg/10 py-10">
    <div
      class="mx-auto grid w-full max-w-[104rem] gap-8 px-5 text-sm text-fg2 sm:px-8 md:grid-cols-[1fr_auto] lg:px-12"
    >
      <ContentRenderer
        v-if="footer"
        :value="footer"
        class="max-w-3xl leading-7"
      />
      <NuxtLink to="/" class="text-xs uppercase tracking-wider no-underline">
        AI Infrastructure Lab
      </NuxtLink>
    </div>
  </footer>
</template>
