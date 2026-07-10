<script setup lang="ts">
defineProps<{ repo?: string }>()
</script>

<template>
  <span class="font-mono text-xs text-fg2">{{ repo || 'site' }}</span>
</template>
