<script setup lang="ts">
import publicationsData from "../../content/publications.json";

type Publication = {
  key: string;
  itemType?: string | null;
  title: string;
  authors?: string[];
  year?: number | null;
  date?: string | null;
  publicationTitle?: string | null;
  publisher?: string | null;
  volume?: string | null;
  issue?: string | null;
  pages?: string | null;
  doi?: string | null;
  url?: string | null;
  abstract?: string | null;
  citation?: string | null;
};

const props = withDefaults(
  defineProps<{
    limit?: number;
    compact?: boolean;
    showHeader?: boolean;
  }>(),
  {
    limit: undefined,
    compact: false,
    showHeader: true,
  },
);

const publications = computed<Publication[]>(() => {
  const items = [...((publicationsData.items || []) as Publication[])];

  items.sort((a, b) => {
    const yearDelta = (b.year || 0) - (a.year || 0);
    if (yearDelta) return yearDelta;

    return String(a.title).localeCompare(String(b.title));
  });

  return typeof props.limit === "number" ? items.slice(0, props.limit) : items;
});

function authorsLabel(publication: Publication) {
  return publication.authors?.length ? publication.authors.join(", ") : null;
}

function dateLabel(publication: Publication) {
  if (publication.date) return publication.date;
  if (publication.year) return String(publication.year);
  return null;
}

function venueLabel(publication: Publication) {
  return [
    publication.publicationTitle,
    publication.publisher,
    publication.volume,
    publication.issue ? `(${publication.issue})` : null,
    publication.pages,
  ]
    .filter(Boolean)
    .join(", ");
}
</script>

<template>
  <section
    class="my-16"
    :class="
      showHeader
        ? 'grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-12'
        : 'mx-auto max-w-4xl'
    "
  >
    <div v-if="showHeader" class="flex items-start justify-between gap-4">
      <h2 class="block-label !m-0">Publications</h2>
      <NuxtLink
        to="/publications"
        class="block-label no-underline transition hover:text-hi md:hidden"
      >
        View all
      </NuxtLink>
    </div>

    <div>
      <div v-if="publications.length" class="space-y-8">
        <article
          v-for="publication in publications"
          :key="publication.key"
          class="glow-card group grid gap-4 rounded-md border border-fg/10 bg-bg2 p-5 transition sm:grid-cols-[2.25rem_1fr]"
        >
          <svg
            class="mt-1 h-6 w-6 text-fg2/70 transition group-hover:text-fg2"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M14 2v6h6M16 13H8M16 17H8M10 9H8"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <div>
            <h3
              class="m-0 text-[clamp(1.2rem,2vw,1.8rem)]! font-light! leading-tight! normal-case! tracking-normal! text-fg"
            >
              <a
                v-if="publication.url"
                :href="publication.url"
                class="no-underline transition hover:text-hi"
                rel="noopener noreferrer"
                target="_blank"
              >
                {{ publication.title }}
              </a>
              <span v-else>{{ publication.title }}</span>
            </h3>
            <p
              v-if="dateLabel(publication)"
              class="mt-2 font-mono text-xs tracking-wider"
            >
              {{ dateLabel(publication) }}
            </p>
            <p
              v-if="authorsLabel(publication)"
              class="mt-1 text-sm leading-6 tracking-normal text-fg2"
            >
              {{ authorsLabel(publication) }}
            </p>
            <p
              v-if="venueLabel(publication)"
              class="mt-1 text-sm italic leading-6 tracking-normal text-fg2"
            >
              {{ venueLabel(publication) }}
            </p>
            <p
              v-if="publication.doi"
              class="mt-3 font-mono text-xs tracking-wider text-hi"
            >
              DOI: {{ publication.doi }}
            </p>
          </div>
        </article>
      </div>

      <div
        v-else
        class="border border-fg/15 bg-bg2/50 p-8 text-center text-fg2"
      >
        Publications will appear here after the Zotero sync has run.
      </div>

      <NuxtLink
        v-if="showHeader"
        to="/publications"
        class="block-label mt-8 hidden w-fit no-underline transition hover:text-hi md:block"
      >
        View all
      </NuxtLink>
    </div>
  </section>
</template>
