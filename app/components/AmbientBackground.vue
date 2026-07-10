<script setup lang="ts">
import { useEventListener } from '@vueuse/core'

const revealX = ref('42vw')
const revealY = ref('38vh')
const hasPointer = ref(false)

useEventListener(import.meta.client ? window : null, 'pointermove', (event) => {
  if (event.pointerType && event.pointerType !== 'mouse') return

  hasPointer.value = true
  revealX.value = `${event.clientX}px`
  revealY.value = `${event.clientY}px`
})

const revealStyle = computed(() => ({
  '--reveal-x': revealX.value,
  '--reveal-y': revealY.value
}))
</script>

<template>
  <div class="ambient-background" aria-hidden="true">
    <div class="ambient-background__ghost-image" />
    <div
      class="ambient-background__blob"
      :class="{ 'ambient-background__blob--pointer': hasPointer }"
      :style="hasPointer ? revealStyle : undefined"
    >
      <div class="ambient-background__image" />
    </div>
  </div>
</template>
