<script setup lang="ts">
defineProps<{ author?: string }>()
</script>

<template>
  <p v-if="author" class="!my-2 text-sm font-bold uppercase tracking-wider text-hi">{{ author }}</p>
</template>
