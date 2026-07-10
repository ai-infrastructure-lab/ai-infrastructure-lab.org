import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";

const contentImagesDir = fileURLToPath(
  new URL("./content/images", import.meta.url),
);
const appFontsDir = fileURLToPath(
  new URL("./app/assets/fonts", import.meta.url),
);
const estreeWalkerCompat = fileURLToPath(
  new URL("./scripts/estree-walker-compat.mjs", import.meta.url),
);

export default defineNuxtConfig({
  compatibilityDate: "2026-07-02",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  modules: [
    "@nuxt/content",
    "@nuxt/image",
    "@nuxt/icon",
    "@nuxt/fonts",
    "@nuxtjs/seo",
  ],
  vite: {
    resolve: {
      alias: {
        "estree-walker": estreeWalkerCompat,
      },
    },
    plugins: [tailwindcss()],
  },
  site: {
    url: "https://ai-infrastructure-lab.org",
    name: "The AI Infrastructure Lab",
    description:
      "Academic lab dedicated to AI industry research, AI technology assessment and digital sovereignty. Hosted at Radboud University Nijmegen, The Netherlands.",
    defaultLocale: "en",
  },
  app: {
    head: {
      htmlAttrs: { lang: "en" },
      link: [
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon-16x16.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
        { rel: "manifest", href: "/site.webmanifest" },
      ],
      meta: [
        { name: "theme-color", content: "#0b0f10" },
        { name: "color-scheme", content: "dark" },
        {
          property: "og:image",
          content: "https://ai-infrastructure-lab.org/og-image.png",
        },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        {
          property: "og:image:alt",
          content: "The AI Infrastructure Lab icon on a dark background",
        },
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:image",
          content: "https://ai-infrastructure-lab.org/og-image.png",
        },
      ],
    },
  },
  content: {
    build: {
      markdown: {
        highlight: {
          theme: "github-dark",
        },
      },
    },
  },
  // fonts: {
  //   families: [
  //     {
  //       name: "Satoshi",
  //       provider: "fontshare",
  //       weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
  //       styles: ["normal", "italic"],
  //       global: true,
  //     },
  //     {
  //       name: "General Sans",
  //       provider: "fontshare",
  //       weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
  //       styles: ["normal", "italic"],
  //       global: true,
  //     },
  //   ],
  // },
  nitro: {
    alias: {
      "estree-walker": estreeWalkerCompat,
    },
    publicAssets: [
      { dir: contentImagesDir, baseURL: "/images" },
      { dir: appFontsDir, baseURL: "/fonts" },
    ],
  },
  seo: {
    redirectToCanonicalSiteUrl: true,
  },
  sitemap: {
    sources: ["/api/__sitemap__/urls"],
  },
  robots: {
    allow: "/",
  },
});
