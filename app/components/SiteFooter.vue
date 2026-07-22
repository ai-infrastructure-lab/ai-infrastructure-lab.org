<script setup lang="ts">
type SocialLink = {
  label: string;
  href?: string;
  icon: string;
  rel?: string;
};

const { data: footer } = await useAsyncData("footer", () =>
  queryCollection("pages").path("/footer").first(),
);

const { data: socialData } = await useAsyncData("social", () =>
  queryCollection("siteData").where("stem", "=", "social").first(),
);

const socialLinks = computed<SocialLink[]>(() => {
  const document = socialData.value as
    | {
        linkedin?: string;
        mastodon?: string;
        meta?: { linkedin?: string; mastodon?: string };
      }
    | null;
  const links = document?.meta || document || {};

  return [
    {
      label: "LinkedIn",
      href: links.linkedin,
      icon: "carbon:logo-linkedin",
    },
    {
      label: "Mastodon",
      href: links.mastodon,
      icon: "carbon:logo-mastodon",
      rel: "me noopener noreferrer",
    },
  ].filter((link) => link.href);
});
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
      <div class="flex flex-col items-start gap-4 md:items-end">
        <div v-if="socialLinks.length" class="flex items-center gap-3">
          <a
            v-for="link in socialLinks"
            :key="link.label"
            :href="link.href"
            :aria-label="link.label"
            class="flex items-center justify-center text-fg2 no-underline transition hover:text-hi"
            target="_blank"
            :rel="link.rel || 'noopener noreferrer'"
          >
            <Icon :name="link.icon" class="text-2xl" aria-hidden="true" />
          </a>
        </div>
        <NuxtLink to="/" class="text-xs uppercase tracking-wider no-underline">
          AI Infrastructure Lab
        </NuxtLink>
      </div>
    </div>
  </footer>
</template>
