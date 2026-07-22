<script setup lang="ts">
defineProps<{ author?: string }>()
</script>

<template>
  <p v-if="author" class="!my-1 text-xs font-normal normal-case tracking-normal text-fg2">{{ author }}</p>
</template>
