<script setup lang="ts">
type MenuLink = {
  name: string;
  link: string;
};

const route = useRoute();
const isMenuOpen = ref(false);

const fallbackLinks: MenuLink[] = [
  { name: "Projects", link: "/projects" },
  { name: "Publications", link: "/publications" },
  { name: "Blog", link: "/blog" },
  { name: "About", link: "/about" },
];

const { data } = await useAsyncData("menu", () =>
  queryCollection("siteData").where("stem", "=", "menu").first(),
);

const links = computed<MenuLink[]>(() => {
  const document = data.value as
    | { menu?: MenuLink[]; meta?: { menu?: MenuLink[] } }
    | null;
  const menu = document?.meta?.menu || document?.menu || [];

  return menu.length ? menu : fallbackLinks;
});

const isActiveLink = (link: string) => {
  const [path] = link.split("#");

  if (link.includes("#")) {
    return route.fullPath === link;
  }

  return route.path === path || route.path.startsWith(`${path}/`);
};

watch(
  () => route.fullPath,
  () => {
    isMenuOpen.value = false;
  },
);
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 transition duration-300 scroll-down:-translate-y-full scroll-up:translate-y-0 scrolled:bg-bg/80 scrolled:backdrop-blur-md"
  >
    <nav
      class="mx-auto flex h-18 w-full max-w-[104rem] items-center justify-end gap-x-3 overflow-x-auto px-5 sm:px-8 lg:gap-x-7 lg:px-12"
      aria-label="Main navigation"
    >
      <NuxtLink
        to="/"
        class="font-mono text-2xl font-light leading-none text-fg shrink-0 hover:underline hover:text-hi"
      >
        AI Infrastructure Lab
      </NuxtLink>
      <div class="flex w-full"></div>

      <button
        class="group flex size-11 shrink-0 flex-col items-end justify-center gap-1.5 text-fg transition hover:text-hi lg:hidden"
        type="button"
        :aria-expanded="isMenuOpen"
        aria-controls="mobile-navigation"
        aria-label="Toggle navigation"
        @click="isMenuOpen = !isMenuOpen"
      >
        <span
          class="h-px w-7 bg-current transition"
          :class="{ 'translate-y-[7px] rotate-45': isMenuOpen }"
        />
        <span
          class="h-px w-5 bg-current transition"
          :class="{ 'opacity-0': isMenuOpen }"
        />
        <span
          class="h-px w-7 bg-current transition"
          :class="{ '-translate-y-[7px] -rotate-45': isMenuOpen }"
        />
      </button>

      <NuxtLink
        v-for="link in links"
        :key="link.link"
        :to="link.link"
        class="hidden shrink-0 font-mono text-2xl font-light leading-none text-fg no-underline transition hover:text-hi hover:underline lg:block"
        :class="{
          underline: isActiveLink(link.link),
        }"
        :aria-current="isActiveLink(link.link) ? 'page' : undefined"
      >
        {{ link.name }}
      </NuxtLink>
    </nav>
  </header>

  <Teleport to="body">
    <div
      id="mobile-navigation"
      class="fixed inset-0 z-40 flex min-h-dvh items-center bg-bg/95 px-5 transition duration-300 sm:px-8 lg:hidden"
      :class="
        isMenuOpen
          ? 'pointer-events-auto opacity-100'
          : 'pointer-events-none opacity-0'
      "
    >
      <div class="flex flex-col items-start gap-4">
        <NuxtLink
          v-for="link in links"
          :key="`mobile-${link.link}`"
          :to="link.link"
          class="font-mono text-2xl font-light leading-none text-fg no-underline transition hover:text-hi hover:underline"
          :class="{
            'text-hi': isActiveLink(link.link),
          }"
          :aria-current="isActiveLink(link.link) ? 'page' : undefined"
        >
          {{ link.name }}
        </NuxtLink>
      </div>
    </div>
  </Teleport>
</template>
