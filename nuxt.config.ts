import type { NuxtConfig } from "nuxt/config";

const nuxtConfig: NuxtConfig = {
  // https://github.com/nuxt-themes/alpine
  extends: "@nuxt-themes/alpine",
  experimental: {
    componentIslands: true, // false or 'local+remote'
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
  app: {
    head: {
      link: [
        {
          type: "text/css",
          rel: "stylesheet",
          href: "https://github.githubassets.com/assets/gist-embed-4ac6018bcc05457cde2f66d2e7299d11.css",
        },
      ],
    },
  },
};

export default defineNuxtConfig(nuxtConfig);
