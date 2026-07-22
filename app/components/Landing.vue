<script setup lang="ts">
const props = defineProps<{
  title?: string;
  subtitle?: string;
  notes?: string;
}>();

const infrastructureWord = ref<HTMLElement | null>(null);
const heroMaskX = ref("50%");
const heroMaskY = ref("50%");
const isInfrastructureHovered = ref(false);

const heroMaskStyle = computed(() => ({
  "--hero-mask-x": heroMaskX.value,
  "--hero-mask-y": heroMaskY.value,
}));

const updateHeroMask = (event: PointerEvent) => {
  if (event.pointerType && event.pointerType !== "mouse") return;

  const element = infrastructureWord.value;
  if (!element) return;

  const rect = element.getBoundingClientRect();
  heroMaskX.value = `${event.clientX - rect.left}px`;
  heroMaskY.value = `${event.clientY - rect.top}px`;
};
</script>

<template>
  <section class="flex min-h-[72vh] flex-col justify-end pb-20 pt-16">
    <div class="">
      <h1 class="landing-hero w-full! max-w-full!" aria-label="AI Infrastructure Lab">
        <div class="landing-hero__small"><span>AI</span></div>
        <span
          ref="infrastructureWord"
          class="landing-hero__infrastructure"
          :class="{
            'landing-hero__infrastructure--hovered': isInfrastructureHovered,
          }"
          :style="heroMaskStyle"
          @pointerenter="isInfrastructureHovered = true"
          @pointerleave="isInfrastructureHovered = false"
          @pointermove="updateHeroMask"
        >
          <span class="landing-hero__word-base">Infrastructure</span>
          <span class="landing-hero__word-image" aria-hidden="true">
            Infrastructure
          </span>
        </span>
        <div class="landing-hero__small landing-hero__small--lab"><span>Lab</span></div>
      </h1>

      <MDC
        v-if="subtitle"
        :value="subtitle"
        tag="p"
        unwrap="p"
        class="mt-12 max-w-4xl text-[clamp(1.35rem,2.15vw,2.2rem)] font-light leading-[1.18] tracking-normal text-fg"
      />
      <MDC
        v-if="notes"
        :value="notes"
        tag="div"
        unwrap="p"
        class="mt-8 max-w-3xl text-sm leading-6 text-fg2"
      />
      <div v-else class="mt-8 max-w-3xl text-base leading-8 text-fg2">
        <slot />
      </div>
    </div>
  </section>
</template>
