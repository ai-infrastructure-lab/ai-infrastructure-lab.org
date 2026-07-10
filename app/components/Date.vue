<script setup lang="ts">
defineProps<{ date?: string }>()
</script>

<template>
  <time v-if="date" class="block text-sm font-bold uppercase tracking-wider text-fg2">
    {{ new Date(date).toLocaleDateString('en', { year: 'numeric', month: 'long', day: 'numeric' }) }}
  </time>
</template>
