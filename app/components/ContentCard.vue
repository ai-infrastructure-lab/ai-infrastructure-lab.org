<script setup lang="ts">
defineProps<{
  item: {
    path: string;
    title?: string;
    description?: string;
    date?: string;
    author?: string;
  };
  variant?: "card" | "list";
  section?: "news" | "blog" | "datawalks" | "projects";
}>();

const formatSection = (section?: "news" | "blog" | "datawalks" | "projects") => {
  if (section === "datawalks") return "Data walk";
  if (section === "projects") return "Project";
  if (section === "news") return "News";
  if (section === "blog") return "Blog";
  return "Item";
};

const formatDate = (date?: string | Date) => {
  if (!date) return null;

  return new Date(date).toLocaleDateString("en", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const formatDateStamp = (date?: string | Date) => {
  if (!date) return null;

  const value = new Date(date);

  return {
    day: value.toLocaleDateString("en", { day: "2-digit" }),
    month: value.toLocaleDateString("en", { month: "short" }),
    year: value.toLocaleDateString("en", { year: "2-digit" }),
  };
};
</script>

<template>
  <NuxtLink
    v-if="variant === 'card' && section === 'datawalks'"
    :to="item.path"
    class="glow-card group relative min-h-80 overflow-hidden rounded-md border border-fg/10 bg-bg2 p-5 tracking-normal text-fg no-underline transition"
  >
    <div class="relative z-10 max-w-2xl">
      <time
        v-if="item.date"
        :datetime="new Date(item.date).toISOString()"
        class="text-xs font-normal uppercase tracking-normal text-fg2"
      >
        {{ formatDate(item.date) }}
      </time>
      <h3
        class="mt-2 text-5xl! font-normal! normal-case! tracking-normal! text-fg"
      >
        {{ item.title }}
      </h3>
      <p class="mt-2 text-[clamp(0.86rem,1.2vw,1.05rem)]! leading-[1.55]! tracking-normal! text-fg2">
        {{ item.description }}
      </p>
      <span class="card-read-more">Read more</span>
    </div>

    <div class="absolute inset-x-0 bottom-0 h-36 overflow-hidden" aria-hidden="true">
      <svg
        class="absolute inset-x-0 bottom-0 h-full w-full text-fg/25 transition group-hover:text-hi/35"
        viewBox="0 0 1440 160"
        preserveAspectRatio="xMidYMid slice"
      >
        <path
          d="M0 96 C150 58 280 64 420 92 C570 124 700 42 870 76 C1025 104 1154 78 1284 54 C1364 40 1418 48 1440 52"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          vector-effect="non-scaling-stroke"
        />
        <path
          d="M0 130 C180 106 320 112 484 130 C658 150 795 104 974 122 C1130 138 1274 108 1440 124"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          vector-effect="non-scaling-stroke"
        />
        <path
          d="M90 118 C205 86 292 100 384 78 C492 52 588 82 700 66 C818 48 908 88 1014 72 C1130 56 1220 80 1348 46"
          fill="none"
          stroke="currentColor"
          stroke-width="5"
          stroke-linecap="round"
          stroke-dasharray="1 15"
          vector-effect="non-scaling-stroke"
        />
        <g class="text-hi/60 transition group-hover:text-hi/90">
          <circle cx="90" cy="118" r="3.5" fill="currentColor" />
          <circle cx="384" cy="78" r="3.5" fill="currentColor" />
          <circle cx="700" cy="66" r="3.5" fill="currentColor" />
          <circle cx="1014" cy="72" r="3.5" fill="currentColor" />
          <circle cx="1348" cy="46" r="3.5" fill="currentColor" />
        </g>
      </svg>
    </div>
  </NuxtLink>

  <NuxtLink
    v-else-if="variant === 'card' && section === 'blog'"
    :to="item.path"
    class="glow-card group relative flex flex-col overflow-hidden rounded-md border border-fg/10 bg-bg2 p-5 tracking-normal text-fg no-underline transition"
  >
    <div class="relative z-10">
      <div class="flex items-start justify-between gap-4">
        <p class="block-label">
          {{ formatSection(section) }}
        </p>
        <time
          v-if="item.date"
          :datetime="new Date(item.date).toISOString()"
          class="flex h-16 w-14 shrink-0 flex-col items-center justify-center gap-1 rounded-sm border border-fg/20 text-center uppercase leading-none text-fg"
        >
          <span class="text-[1.8rem] font-normal leading-none">
            {{ formatDateStamp(item.date)?.day }}
          </span>
          <span class="flex items-center gap-1 text-[0.62rem] font-normal leading-none tracking-normal">
            <span>{{ formatDateStamp(item.date)?.month }}</span>
            <span>{{ formatDateStamp(item.date)?.year }}</span>
          </span>
        </time>
      </div>

      <h3
        class="mt-8 text-4xl! font-normal! normal-case! tracking-normal! text-fg"
      >
        {{ item.title }}
      </h3>
    </div>

    <p class="relative z-10 mt-8 text-[clamp(1rem,1.6vw,1.35rem)]! leading-[1.45]! tracking-normal! text-fg2">
      {{ item.description }}
    </p>
    <span class="card-read-more relative z-10">Read more</span>
  </NuxtLink>

  <NuxtLink
    v-else-if="variant === 'card'"
    :to="item.path"
    class="glow-card group flex aspect-[4/3] flex-col justify-between rounded-md border border-fg/10 bg-bg2 p-5 tracking-normal text-fg no-underline transition"
  >
    <div>
      <p class="block-label">
        {{ formatSection(section) }}
      </p>
      <h3
        class="mt-8 text-[clamp(2rem,9vw,3rem)]! font-normal! leading-[1.02]! normal-case! tracking-normal! text-fg"
      >
        {{ item.title }}
      </h3>
    </div>
    <div class="mt-8">
      <p class="text-[clamp(1rem,2vw,1.5rem)]! leading-[1.35]! tracking-normal! text-fg2">
        {{ item.description }}
      </p>
      <span class="card-read-more">Read more</span>
    </div>
  </NuxtLink>

  <NuxtLink
    v-else
    :to="item.path"
    class="group grid gap-5 border-t border-fg/15 py-6 tracking-normal text-fg no-underline transition hover:border-hi/60 md:grid-cols-[10rem_1fr] lg:grid-cols-[12rem_1fr]"
  >
    <div class="flex items-center justify-between gap-4 md:block">
      <p class="block-label text-hi!">
        {{ formatSection(section) }}
      </p>
      <time
        v-if="item.date"
        :datetime="new Date(item.date).toISOString()"
        class="mt-0 block text-sm text-fg2 md:mt-3"
      >
        {{ formatDate(item.date) }}
      </time>
    </div>

    <div class="max-w-4xl">
      <h3
        class="m-0 text-[clamp(1.6rem,3vw,2.75rem)]! font-normal! leading-[1.02]! normal-case! tracking-[-0.045em]! text-fg transition group-hover:text-hi"
      >
        {{ item.title }}
      </h3>
      <p class="mt-3 max-w-2xl text-base! leading-7! tracking-normal! text-fg2">
        {{ item.description }}
      </p>
    </div>
  </NuxtLink>
</template>
