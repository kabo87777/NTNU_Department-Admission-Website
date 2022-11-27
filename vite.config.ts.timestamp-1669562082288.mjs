// vite.config.ts
import { defineConfig } from "file:///mnt/c/Users/%E6%9D%8E%E5%A9%95%E5%AF%A7/frontend/node_modules/.pnpm/vite@3.1.8/node_modules/vite/dist/node/index.js";
import { resolve } from "node:path";
import WindiCSS from "file:///mnt/c/Users/%E6%9D%8E%E5%A9%95%E5%AF%A7/frontend/node_modules/.pnpm/vite-plugin-windicss@1.8.8_vite@3.1.8/node_modules/vite-plugin-windicss/dist/index.mjs";
import vue from "file:///mnt/c/Users/%E6%9D%8E%E5%A9%95%E5%AF%A7/frontend/node_modules/.pnpm/@vitejs+plugin-vue@3.1.2_vite@3.1.8+vue@3.2.41/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import Icons from "file:///mnt/c/Users/%E6%9D%8E%E5%A9%95%E5%AF%A7/frontend/node_modules/.pnpm/unplugin-icons@0.14.12/node_modules/unplugin-icons/dist/vite.mjs";
import IconsResolver from "file:///mnt/c/Users/%E6%9D%8E%E5%A9%95%E5%AF%A7/frontend/node_modules/.pnpm/unplugin-icons@0.14.12/node_modules/unplugin-icons/dist/resolver.mjs";
import ViteComponents from "file:///mnt/c/Users/%E6%9D%8E%E5%A9%95%E5%AF%A7/frontend/node_modules/.pnpm/unplugin-vue-components@0.22.8_vue@3.2.41/node_modules/unplugin-vue-components/dist/vite.mjs";
import vueI18n from "file:///mnt/c/Users/%E6%9D%8E%E5%A9%95%E5%AF%A7/frontend/node_modules/.pnpm/@intlify+vite-plugin-vue-i18n@6.0.3_vite@3.1.8+vue-i18n@9.1.10/node_modules/@intlify/vite-plugin-vue-i18n/lib/index.mjs";
import branch from "file:///mnt/c/Users/%E6%9D%8E%E5%A9%95%E5%AF%A7/frontend/node_modules/.pnpm/git-branch@2.0.1/node_modules/git-branch/index.js";
var __vite_injected_original_dirname = "/mnt/c/Users/\u674E\u5A55\u5BE7/frontend";
if (!process.env.VITE_ADMISSIONS_API_ENDPOINT) {
  if (process.env.VERCEL_ENV) {
    if (process.env.VERCEL_ENV === "production")
      process.env.VITE_ADMISSIONS_API_ENDPOINT = "https://admissions-backend-prd.birkhoff.me";
    else
      process.env.VITE_ADMISSIONS_API_ENDPOINT = "https://admissions-backend-stg.birkhoff.me";
  } else {
    const gitBranch = branch.sync() || "";
    if (gitBranch === "main")
      process.env.VITE_ADMISSIONS_API_ENDPOINT = "https://admissions-backend-prd.birkhoff.me";
    else if (gitBranch === "develop")
      process.env.VITE_ADMISSIONS_API_ENDPOINT = "https://admissions-backend-stg.birkhoff.me";
    else
      process.env.VITE_ADMISSIONS_API_ENDPOINT = "http://127.0.0.1:3000";
  }
}
if (!process.env.VITE_IS_SKIP_CAPTCHA) {
  process.env.VITE_IS_SKIP_CAPTCHA = process.env.VERCEL_ENV === "production" ? "false" : "true";
}
console.log(
  "VITE_ADMISSIONS_API_ENDPOINT =",
  process.env.VITE_ADMISSIONS_API_ENDPOINT
);
var vite_config_default = defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/]
    }),
    vueI18n({
      include: resolve(__vite_injected_original_dirname, "./locales/**")
    }),
    WindiCSS(),
    ViteComponents({
      resolvers: [
        IconsResolver({
          prefix: "i"
        })
      ]
    }),
    Icons({ autoInstall: true })
  ],
  resolve: {
    alias: {
      "@": resolve(__vite_injected_original_dirname, "./src")
    }
  },
  test: {}
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvbW50L2MvVXNlcnMvXHU2NzRFXHU1QTU1XHU1QkU3L2Zyb250ZW5kXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvbW50L2MvVXNlcnMvXHU2NzRFXHU1QTU1XHU1QkU3L2Zyb250ZW5kL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9tbnQvYy9Vc2Vycy8lRTYlOUQlOEUlRTUlQTklOTUlRTUlQUYlQTcvZnJvbnRlbmQvdml0ZS5jb25maWcudHNcIjsvLy8gPHJlZmVyZW5jZSB0eXBlcz1cInZpdGVzdFwiIC8+XG5cbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSBcIm5vZGU6cGF0aFwiO1xuaW1wb3J0IFdpbmRpQ1NTIGZyb20gXCJ2aXRlLXBsdWdpbi13aW5kaWNzc1wiO1xuaW1wb3J0IHZ1ZSBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCI7XG5pbXBvcnQgSWNvbnMgZnJvbSBcInVucGx1Z2luLWljb25zL3ZpdGVcIjtcbmltcG9ydCBJY29uc1Jlc29sdmVyIGZyb20gXCJ1bnBsdWdpbi1pY29ucy9yZXNvbHZlclwiO1xuaW1wb3J0IFZpdGVDb21wb25lbnRzIGZyb20gXCJ1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlXCI7XG5pbXBvcnQgdnVlSTE4biBmcm9tIFwiQGludGxpZnkvdml0ZS1wbHVnaW4tdnVlLWkxOG5cIjtcbmltcG9ydCBicmFuY2ggZnJvbSBcImdpdC1icmFuY2hcIjtcblxuaWYgKCFwcm9jZXNzLmVudi5WSVRFX0FETUlTU0lPTlNfQVBJX0VORFBPSU5UKSB7XG4gIGlmIChwcm9jZXNzLmVudi5WRVJDRUxfRU5WKSB7XG4gICAgLy8gcHJvamVjdCBiZWluZyBidWlsdCBvbiBWZXJjZWxcbiAgICBpZiAocHJvY2Vzcy5lbnYuVkVSQ0VMX0VOViA9PT0gXCJwcm9kdWN0aW9uXCIpXG4gICAgICBwcm9jZXNzLmVudi5WSVRFX0FETUlTU0lPTlNfQVBJX0VORFBPSU5UID1cbiAgICAgICAgXCJodHRwczovL2FkbWlzc2lvbnMtYmFja2VuZC1wcmQuYmlya2hvZmYubWVcIjtcbiAgICBlbHNlXG4gICAgICBwcm9jZXNzLmVudi5WSVRFX0FETUlTU0lPTlNfQVBJX0VORFBPSU5UID1cbiAgICAgICAgXCJodHRwczovL2FkbWlzc2lvbnMtYmFja2VuZC1zdGcuYmlya2hvZmYubWVcIjtcbiAgfSBlbHNlIHtcbiAgICAvLyBwcm9qZWN0IGJlaW5nIGJ1aWx0IGxvY2FsbHlcbiAgICBjb25zdCBnaXRCcmFuY2ggPSBicmFuY2guc3luYygpIHx8IFwiXCI7XG5cbiAgICAvLyB1c2UgcmVzcGVjdGl2ZSBlbmRwb2ludHMgZm9yIHByb2QgJiBzdGFnaW5nIGJyYW5jaC5cbiAgICAvLyBmb3Igb3RoZXIgYnJhbmNoZXMsIHVzZSBsb2NhbGhvc3QuXG4gICAgaWYgKGdpdEJyYW5jaCA9PT0gXCJtYWluXCIpXG4gICAgICBwcm9jZXNzLmVudi5WSVRFX0FETUlTU0lPTlNfQVBJX0VORFBPSU5UID1cbiAgICAgICAgXCJodHRwczovL2FkbWlzc2lvbnMtYmFja2VuZC1wcmQuYmlya2hvZmYubWVcIjtcbiAgICBlbHNlIGlmIChnaXRCcmFuY2ggPT09IFwiZGV2ZWxvcFwiKVxuICAgICAgcHJvY2Vzcy5lbnYuVklURV9BRE1JU1NJT05TX0FQSV9FTkRQT0lOVCA9XG4gICAgICAgIFwiaHR0cHM6Ly9hZG1pc3Npb25zLWJhY2tlbmQtc3RnLmJpcmtob2ZmLm1lXCI7XG4gICAgZWxzZSBwcm9jZXNzLmVudi5WSVRFX0FETUlTU0lPTlNfQVBJX0VORFBPSU5UID0gXCJodHRwOi8vMTI3LjAuMC4xOjMwMDBcIjtcbiAgfVxufVxuXG5pZiAoIXByb2Nlc3MuZW52LlZJVEVfSVNfU0tJUF9DQVBUQ0hBKSB7XG4gIC8vIGJ5IGRlZmF1bHQsIHdlIG9ubHkgZW5hYmxlIENBUFRDSEEgZm9yIFZlcmNlbCBwcm9kdWN0aW9uIGVudmlyb25tZW50XG4gIHByb2Nlc3MuZW52LlZJVEVfSVNfU0tJUF9DQVBUQ0hBID1cbiAgICBwcm9jZXNzLmVudi5WRVJDRUxfRU5WID09PSBcInByb2R1Y3Rpb25cIiA/IFwiZmFsc2VcIiA6IFwidHJ1ZVwiO1xufVxuXG5jb25zb2xlLmxvZyhcbiAgXCJWSVRFX0FETUlTU0lPTlNfQVBJX0VORFBPSU5UID1cIixcbiAgcHJvY2Vzcy5lbnYuVklURV9BRE1JU1NJT05TX0FQSV9FTkRQT0lOVFxuKTtcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICB2dWUoe1xuICAgICAgaW5jbHVkZTogWy9cXC52dWUkL10sXG4gICAgfSksXG4gICAgdnVlSTE4bih7XG4gICAgICBpbmNsdWRlOiByZXNvbHZlKF9fZGlybmFtZSwgXCIuL2xvY2FsZXMvKipcIiksXG4gICAgfSksXG4gICAgV2luZGlDU1MoKSxcbiAgICBWaXRlQ29tcG9uZW50cyh7XG4gICAgICByZXNvbHZlcnM6IFtcbiAgICAgICAgSWNvbnNSZXNvbHZlcih7XG4gICAgICAgICAgcHJlZml4OiBcImlcIixcbiAgICAgICAgfSksXG4gICAgICBdLFxuICAgIH0pLFxuICAgIEljb25zKHsgYXV0b0luc3RhbGw6IHRydWUgfSksXG4gIF0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgXCJAXCI6IHJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjXCIpLFxuICAgIH0sXG4gIH0sXG4gIHRlc3Q6IHt9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBRUEsU0FBUyxvQkFBb0I7QUFDN0IsU0FBUyxlQUFlO0FBQ3hCLE9BQU8sY0FBYztBQUNyQixPQUFPLFNBQVM7QUFDaEIsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sbUJBQW1CO0FBQzFCLE9BQU8sb0JBQW9CO0FBQzNCLE9BQU8sYUFBYTtBQUNwQixPQUFPLFlBQVk7QUFWbkIsSUFBTSxtQ0FBbUM7QUFZekMsSUFBSSxDQUFDLFFBQVEsSUFBSSw4QkFBOEI7QUFDN0MsTUFBSSxRQUFRLElBQUksWUFBWTtBQUUxQixRQUFJLFFBQVEsSUFBSSxlQUFlO0FBQzdCLGNBQVEsSUFBSSwrQkFDVjtBQUFBO0FBRUYsY0FBUSxJQUFJLCtCQUNWO0FBQUEsRUFDTixPQUFPO0FBRUwsVUFBTSxZQUFZLE9BQU8sS0FBSyxLQUFLO0FBSW5DLFFBQUksY0FBYztBQUNoQixjQUFRLElBQUksK0JBQ1Y7QUFBQSxhQUNLLGNBQWM7QUFDckIsY0FBUSxJQUFJLCtCQUNWO0FBQUE7QUFDQyxjQUFRLElBQUksK0JBQStCO0FBQUEsRUFDbEQ7QUFDRjtBQUVBLElBQUksQ0FBQyxRQUFRLElBQUksc0JBQXNCO0FBRXJDLFVBQVEsSUFBSSx1QkFDVixRQUFRLElBQUksZUFBZSxlQUFlLFVBQVU7QUFDeEQ7QUFFQSxRQUFRO0FBQUEsRUFDTjtBQUFBLEVBQ0EsUUFBUSxJQUFJO0FBQ2Q7QUFHQSxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxJQUFJO0FBQUEsTUFDRixTQUFTLENBQUMsUUFBUTtBQUFBLElBQ3BCLENBQUM7QUFBQSxJQUNELFFBQVE7QUFBQSxNQUNOLFNBQVMsUUFBUSxrQ0FBVyxjQUFjO0FBQUEsSUFDNUMsQ0FBQztBQUFBLElBQ0QsU0FBUztBQUFBLElBQ1QsZUFBZTtBQUFBLE1BQ2IsV0FBVztBQUFBLFFBQ1QsY0FBYztBQUFBLFVBQ1osUUFBUTtBQUFBLFFBQ1YsQ0FBQztBQUFBLE1BQ0g7QUFBQSxJQUNGLENBQUM7QUFBQSxJQUNELE1BQU0sRUFBRSxhQUFhLEtBQUssQ0FBQztBQUFBLEVBQzdCO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLElBQ2pDO0FBQUEsRUFDRjtBQUFBLEVBQ0EsTUFBTSxDQUFDO0FBQ1QsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
