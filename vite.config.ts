/// <reference types="vitest" />

import { defineConfig } from "vite";
import { resolve } from "node:path";
import WindiCSS from "vite-plugin-windicss";
import vue from "@vitejs/plugin-vue";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import ViteComponents from "unplugin-vue-components/vite";
import vueI18n from "@intlify/vite-plugin-vue-i18n";
import branch from "git-branch";

if (!process.env.VITE_ADMISSIONS_API_ENDPOINT) {
  // Branch name is exposed on a env var in Render builds
  // On Render there's apparently no .git directory. So
  // branch.sync() does not give correct result.
  switch (process.env.RENDER_GIT_BRANCH || branch.sync()) {
    // production
    case "master":
    case "main":
      process.env.VITE_ADMISSIONS_API_ENDPOINT =
        "https://admissions-backend-prd.birkhoff.me";
      break;
  
    // staging
    case "develop":
      process.env.VITE_ADMISSIONS_API_ENDPOINT =
        "https://admissions-backend-stg.birkhoff.me";
      break;
  
    // mr preview
    default:
      process.env.VITE_ADMISSIONS_API_ENDPOINT =
        "https://9f88298d-a5f9-4017-ac13-88e38a638293.mock.pstmn.io";
      break;
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/],
    }),
    vueI18n({
      include: resolve(__dirname, "./locales/**"),
    }),
    WindiCSS(),
    ViteComponents({
      resolvers: [
        IconsResolver({
          prefix: "i",
        }),
      ],
    }),
    Icons({ autoInstall: true }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  test: {},
});
