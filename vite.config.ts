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

process.env.VITE_ADMISSION_APPLICANT_USERNAME = "1110101"
process.env.VITE_ADMISSION_APPLICANT_PASSWORD = "Example123"
process.env.VITE_ADMISSION_REVIEWER_USERNAME = "ntnuareviewer1@yopmail.com"
process.env.VITE_ADMISSION_REVIEWER_PASSWORD = "Example123"
process.env.VITE_ADMISSION_MANAGER_USERNAME = "ntnuaadmin1@yopmail.com"
process.env.VITE_ADMISSION_MANAGER_PASSWORD = "Example123"
process.env.VITE_RECRUITMENT_APPLICANT_USERNAME = "ntnurapplicant1@yopmail.com"
process.env.VITE_RECRUITMENT_APPLICANT_PASSWORD = "Example123"
process.env.VITE_RECRUITMENT_REVIEWER_USERNAME = "ntnurreviewer1@yopmail.com"
process.env.VITE_RECRUITMENT_REVIEWER_PASSWORD = "Example123"
process.env.VITE_RECRUITMENT_MANAGER_USERNAME = "ntnuradmin1@yopmail.com"
process.env.VITE_RECRUITMENT_MANAGER_PASSWORD = "Example123"

if (!process.env.VITE_ADMISSIONS_API_ENDPOINT) {
  if (process.env.VERCEL_ENV) {
    // project being built on Vercel
    if (process.env.VERCEL_ENV === "production") {
      process.env.VITE_ADMISSIONS_API_ENDPOINT =
        "https://admissions-backend-prd.birkhoff.me";

      process.env.VITE_ADMISSION_APPLICANT_USERNAME = ""
      process.env.VITE_ADMISSION_APPLICANT_PASSWORD = ""
      process.env.VITE_ADMISSION_REVIEWER_USERNAME = ""
      process.env.VITE_ADMISSION_REVIEWER_PASSWORD = ""
      process.env.VITE_ADMISSION_MANAGER_USERNAME = ""
      process.env.VITE_ADMISSION_MANAGER_PASSWORD = ""
      process.env.VITE_RECRUITMENT_APPLICANT_USERNAME = ""
      process.env.VITE_RECRUITMENT_APPLICANT_PASSWORD = ""
      process.env.VITE_RECRUITMENT_REVIEWER_USERNAME = ""
      process.env.VITE_RECRUITMENT_REVIEWER_PASSWORD = ""
      process.env.VITE_RECRUITMENT_MANAGER_USERNAME = ""
      process.env.VITE_RECRUITMENT_MANAGER_PASSWORD = ""
    }
    else
      process.env.VITE_ADMISSIONS_API_ENDPOINT =
        "https://admissions-backend-stg.birkhoff.me";
  } else {
    // project being built locally
    const gitBranch = branch.sync() || "";

    // use respective endpoints for prod & staging branch.
    // for other branches, use localhost.
    if (gitBranch === "main")
      process.env.VITE_ADMISSIONS_API_ENDPOINT =
        "https://admissions-backend-prd.birkhoff.me";
    else if (gitBranch === "develop")
      process.env.VITE_ADMISSIONS_API_ENDPOINT =
        "https://admissions-backend-stg.birkhoff.me";
    else process.env.VITE_ADMISSIONS_API_ENDPOINT = "http://127.0.0.1:3000";
  }
}

if (!process.env.VITE_IS_SKIP_CAPTCHA) {
  // by default, we only enable CAPTCHA for Vercel production environment
  process.env.VITE_IS_SKIP_CAPTCHA =
    process.env.VERCEL_ENV === "production" ? "false" : "true";
}

console.log(
  "VITE_ADMISSIONS_API_ENDPOINT =",
  process.env.VITE_ADMISSIONS_API_ENDPOINT
);

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
