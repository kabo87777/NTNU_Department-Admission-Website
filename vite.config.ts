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
import minimatch from "minimatch";

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
    }
    else {
      process.env.VITE_ADMISSIONS_API_ENDPOINT =
        "https://admissions-backend-stg.birkhoff.me";
    }
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

if (process.env.VERCEL_ENV) {
  // project being built on Vercel
  if (process.env.VERCEL_ENV === "production") {
    process.env.VITE_BASEURL = "https://admissions.birkhoff.me"

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
  else {
    process.env.VITE_BASEURL = "https://admissions-frontend-staging.birkhoff.me"
  }
} else {
  // project being built locally
  process.env.VITE_BASEURL = "http://127.0.0.1:5173"
}

if (!process.env.VITE_IS_SKIP_CAPTCHA) {
  // by default, we only enable CAPTCHA for Vercel production environment
  process.env.VITE_IS_SKIP_CAPTCHA =
    process.env.VERCEL_ENV === "production" ? "false" : "true";
}

console.log(Object.keys(process.env).filter(e => e.startsWith("VITE_")).map(e => `${e}=${process.env[e]}`))

const moduleChunks = {
  landing: [
    "@/views/*.vue",
    "@/views/admission/*.vue",
    "@/views/admission/applicant/login/*.vue",
    "@/views/admission/reviewer/login/*.vue",
    "@/views/admission/manager/login/*.vue",
    "@/views/recruitment/*.vue",
    "@/views/recruitment/applicant/login/*.vue",
    "@/views/recruitment/reviewer/login/*.vue",
    "@/views/recruitment/manager/login/*.vue",
  ],
  admissionReviewer: [
    "@/views/admission/reviewer/*.vue"
  ],
  admissionApplicant: [
    "@/views/admission/applicant/*.vue",
    "@/views/admission/applicant/pages/*.vue",
  ],
  admissionManager: [
    "@/views/admission/manager/*.vue",
    "@/views/admission/manager/applicantsUploadList/*.vue",
  ],
  admissionRecommender: [
    "@/views/admission/recommender/*.vue"
  ],
  recruitmentApplicant: [
    "@/views/recruitment/applicant/*.vue",
    "@/views/recruitment/applicant/pages/*.vue",
  ],
  recruitmentManager: [
    "@/views/recruitment/manager/*.vue",
    "@/views/recruitment/manager/pages/*.vue",
  ],
  recruitmentReviewer: [
    "@/views/recruitment/reviewer/*.vue"
  ],
}

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks(id, { getModuleInfo, getModuleIds }) {
          const relativePath = id.replace(__dirname, "");

          for (const [moduleName, globs] of Object.entries(moduleChunks)) {
            if (globs.some(g => minimatch(relativePath, g.replace(/^@\//, "/src/")))) {
              return moduleName;
            }
          }
        }
      }
    }
  },
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
    Icons({ autoInstall: true })
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  test: {},
});
