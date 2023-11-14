import type { NuxtConfig } from "nuxt/config";

const nuxtConfig: NuxtConfig = {
  // https://github.com/nuxt-themes/alpine
  extends: "@nuxt-themes/alpine",
  experimental: {
    componentIslands: true, // false or 'local+remote'
    // noScripts for public production on cf pages, scripts for nuxt studio
    noScripts: !process.env.NUXT_PUBLIC_STUDIO_API_URL,
  },
  modules: [
    ["@nuxtjs/tailwindcss", { viewer: false }],
    "nuxt-content-assets",
    // https://github.com/nuxt-modules/plausible
    "@nuxtjs/plausible",
    // https://github.com/nuxt/devtools
    "@nuxt/devtools",
    "nuxt-simple-sitemap",
  ],
  site: { url: "https://blog.vikfand.com" },

  hooks: {
    // Bug that causes nuxi build to not exit, just hanging there. Only with nuxt-content-assets
    // https://github.com/nuxt/cli/issues/193  https://github.com/davestewart/nuxt-content-assets/issues/49
    close: (nuxt) => {
      if (!nuxt.options._prepare) process.exit();
    },
  },
};

export default defineNuxtConfig(nuxtConfig);
