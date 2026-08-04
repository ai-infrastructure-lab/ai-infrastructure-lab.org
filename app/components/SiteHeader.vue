<script setup lang="ts">
type MenuLink = {
  name: string;
  link: string;
};

type HeaderImage = {
  src: string;
  alt: string;
};

const fallbackHeaderImages: HeaderImage[] = [
  {
    src: "/images/infinite-hyperscaler-cyan-low-angle2.webp",
    alt: "Hyperscale data infrastructure",
  },
  { src: "/images/infra2.webp", alt: "Offshore wind farm" },
  { src: "/images/infra3.webp", alt: "Rare-earth processing mine" },
];

const route = useRoute();
const isMenuOpen = ref(false);
const heroGraphic = ref<HTMLElement | null>(null);
const heroMaskX = ref("50%");
const heroMaskY = ref("50%");
const isHeroMaskActive = ref(false);
const isHomePage = computed(() => route.path === "/");
const activeHeaderImageIndex = ref(0);
let headerImageRotation: ReturnType<typeof setInterval> | undefined;

const heroMaskStyle = computed(() => ({
  "--hero-mask-x": heroMaskX.value,
  "--hero-mask-y": heroMaskY.value,
}));

const fallbackLinks: MenuLink[] = [
  { name: "Projects", link: "/projects" },
  { name: "Publications", link: "/publications" },
  { name: "Blog", link: "/blog" },
  { name: "About", link: "/about" },
];

const { data } = await useAsyncData("menu", () =>
  queryCollection("siteData").where("stem", "=", "menu").first(),
);
const { data: headerImagesData } = await useAsyncData("header-images", () =>
  queryCollection("siteData").where("stem", "=", "header-images").first(),
);
const { data: currentPage } = await useAsyncData(
  "header-current-page",
  () => queryCollection("pages").path(route.path).first(),
  { watch: [() => route.path] },
);

const links = computed<MenuLink[]>(() => {
  const document = data.value as {
    menu?: MenuLink[];
    meta?: { menu?: MenuLink[] };
  } | null;
  const menu = document?.meta?.menu || document?.menu || [];

  return menu.length ? menu : fallbackLinks;
});

const headerImages = computed<HeaderImage[]>(() => {
  const document = headerImagesData.value as { images?: HeaderImage[] } | null;

  return document?.images?.length ? document.images : fallbackHeaderImages;
});

const activeHeaderImage = computed(
  () =>
    headerImages.value[activeHeaderImageIndex.value] || headerImages.value[0],
);

const rotateHeaderImage = () => {
  activeHeaderImageIndex.value =
    (activeHeaderImageIndex.value + 1) % headerImages.value.length;
};

const collapsedMenuTitle = computed(() => {
  if (route.path === "/") return "";

  const document = currentPage.value as { title?: string } | null;
  if (document?.title) return document.title;

  const [segment] = route.path.split("/").filter(Boolean);
  const titles: Record<string, string> = {
    aiwalks: "AI walks",
    blog: "Blog",
    projects: "Projects",
    publications: "Publications",
  };

  return titles[segment] || segment || "";
});

const isActiveLink = (link: string) => {
  const [path] = link.split("#");

  if (link.includes("#")) {
    return route.fullPath === link;
  }

  return route.path === path || route.path.startsWith(`${path}/`);
};

const updateHeroMask = (event: PointerEvent) => {
  if (event.pointerType && event.pointerType !== "mouse") return;

  const element = heroGraphic.value;
  if (!element) return;

  const rect = element.getBoundingClientRect();
  heroMaskX.value = `${event.clientX - rect.left}px`;
  heroMaskY.value = `${event.clientY - rect.top}px`;
  isHeroMaskActive.value = true;
};

onMounted(() => {
  window.addEventListener("pointermove", updateHeroMask);
  headerImageRotation = window.setInterval(rotateHeaderImage, 10_000);
});

onUnmounted(() => {
  window.removeEventListener("pointermove", updateHeroMask);
  if (headerImageRotation) window.clearInterval(headerImageRotation);
});

watch(
  headerImages,
  (images) => {
    activeHeaderImageIndex.value %= images.length;
  },
  { immediate: true },
);

watch(
  () => route.fullPath,
  () => {
    isMenuOpen.value = false;
  },
);
</script>

<template>
  <header class="relative z-50">
    <section
      class="mx-auto flex w-full max-w-[104rem] items-center gap-x-3 px-5 pb-1 pt-2 sm:pt-4 sm:px-8 lg:block lg:px-12"
    >
      <div class="relative shrink-0 self-center lg:hidden">
        <button
          class="site-menu-toggle group flex size-10 -scale-x-100 flex-col items-end justify-center gap-2 text-fg translate-y-[0.22rem] transition hover:text-hi"
          type="button"
          :aria-expanded="isMenuOpen"
          aria-controls="mobile-navigation"
          aria-label="Toggle navigation"
          @click="isMenuOpen = !isMenuOpen"
        >
          <span
            class="h-0.5 w-8 bg-current transition"
            :class="{ 'translate-y-[10px] rotate-45': isMenuOpen }"
          />
          <span
            class="h-0.5 w-6 bg-current transition"
            :class="{ 'opacity-0': isMenuOpen }"
          />
          <span
            class="h-0.5 w-8 bg-current transition"
            :class="{ '-translate-y-[10px] -rotate-45': isMenuOpen }"
          />
        </button>
      </div>
      <component
        :is="isHomePage ? 'h1' : 'div'"
        class="landing-hero landing-hero--menu relative min-w-0 flex-1 w-full! max-w-full!"
      >
        <NuxtLink
          to="/"
          class="landing-hero__graphic"
          aria-label="AI Infrastructure Lab home"
        >
          <span
            ref="heroGraphic"
            class="landing-hero__graphic-frame"
            :style="heroMaskStyle"
          >
            <span class="landing-hero__graphic-base" aria-hidden="true" />
            <span
              class="landing-hero__graphic-reveal"
              :class="{
                'landing-hero__graphic-reveal--active': isHeroMaskActive,
              }"
              aria-hidden="true"
            >
              <img
                :key="activeHeaderImage.src"
                class="landing-hero__graphic-image"
                :src="activeHeaderImage.src"
                alt=""
              />
            </span>
          </span>
        </NuxtLink>
        <span
          v-if="collapsedMenuTitle"
          class="pointer-events-none absolute left-0 top-full mt-0.5 font-mono text-[0.625rem] font-normal leading-none tracking-wide text-fg2 lg:hidden"
        >
          {{ collapsedMenuTitle }}
        </span>
      </component>
    </section>
  </header>

  <nav
    class="sticky top-0 z-50 mx-auto hidden h-16 lg:-mt-6 w-full max-w-[104rem] items-center justify-start gap-x-3 overflow-x-auto bg-bg/0 scroll-up:bg-bg/0 px-5 xl:backdrop-blur-md transition duration-300 sm:px-8 lg:flex md:gap-x-12 lg:px-12"
    aria-label="Main navigation"
  >
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
