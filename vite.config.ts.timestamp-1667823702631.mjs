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
  switch (process.env.RENDER_GIT_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || branch.sync() || "") {
    case "master":
    case "main":
      process.env.VITE_ADMISSIONS_API_ENDPOINT = "https://admissions-backend-prd.birkhoff.me";
      break;
    default:
      process.env.VITE_ADMISSIONS_API_ENDPOINT = "https://admissions-backend-stg.birkhoff.me";
      break;
  }
}
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvbW50L2MvVXNlcnMvXHU2NzRFXHU1QTU1XHU1QkU3L2Zyb250ZW5kXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvbW50L2MvVXNlcnMvXHU2NzRFXHU1QTU1XHU1QkU3L2Zyb250ZW5kL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9tbnQvYy9Vc2Vycy8lRTYlOUQlOEUlRTUlQTklOTUlRTUlQUYlQTcvZnJvbnRlbmQvdml0ZS5jb25maWcudHNcIjsvLy8gPHJlZmVyZW5jZSB0eXBlcz1cInZpdGVzdFwiIC8+XG5cbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSBcIm5vZGU6cGF0aFwiO1xuaW1wb3J0IFdpbmRpQ1NTIGZyb20gXCJ2aXRlLXBsdWdpbi13aW5kaWNzc1wiO1xuaW1wb3J0IHZ1ZSBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCI7XG5pbXBvcnQgSWNvbnMgZnJvbSBcInVucGx1Z2luLWljb25zL3ZpdGVcIjtcbmltcG9ydCBJY29uc1Jlc29sdmVyIGZyb20gXCJ1bnBsdWdpbi1pY29ucy9yZXNvbHZlclwiO1xuaW1wb3J0IFZpdGVDb21wb25lbnRzIGZyb20gXCJ1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlXCI7XG5pbXBvcnQgdnVlSTE4biBmcm9tIFwiQGludGxpZnkvdml0ZS1wbHVnaW4tdnVlLWkxOG5cIjtcbmltcG9ydCBicmFuY2ggZnJvbSBcImdpdC1icmFuY2hcIjtcblxuaWYgKCFwcm9jZXNzLmVudi5WSVRFX0FETUlTU0lPTlNfQVBJX0VORFBPSU5UKSB7XG4gIC8vIEJyYW5jaCBuYW1lIGlzIGV4cG9zZWQgb24gYSBlbnYgdmFyIGluIFJlbmRlciBidWlsZHNcbiAgLy8gT24gUmVuZGVyIHRoZXJlJ3MgYXBwYXJlbnRseSBubyAuZ2l0IGRpcmVjdG9yeS4gU29cbiAgLy8gYnJhbmNoLnN5bmMoKSBkb2VzIG5vdCBnaXZlIGNvcnJlY3QgcmVzdWx0LlxuICBzd2l0Y2ggKHByb2Nlc3MuZW52LlJFTkRFUl9HSVRfQlJBTkNIIHx8IHByb2Nlc3MuZW52LlZFUkNFTF9HSVRfQ09NTUlUX1JFRiB8fCBicmFuY2guc3luYygpIHx8IFwiXCIpIHtcbiAgICAvLyBwcm9kdWN0aW9uXG4gICAgY2FzZSBcIm1hc3RlclwiOlxuICAgIGNhc2UgXCJtYWluXCI6XG4gICAgICBwcm9jZXNzLmVudi5WSVRFX0FETUlTU0lPTlNfQVBJX0VORFBPSU5UID1cbiAgICAgICAgXCJodHRwczovL2FkbWlzc2lvbnMtYmFja2VuZC1wcmQuYmlya2hvZmYubWVcIjtcbiAgICAgIGJyZWFrO1xuXG4gICAgLy8gc3RhZ2luZ1xuICAgIGRlZmF1bHQ6XG4gICAgICBwcm9jZXNzLmVudi5WSVRFX0FETUlTU0lPTlNfQVBJX0VORFBPSU5UID1cbiAgICAgICAgXCJodHRwczovL2FkbWlzc2lvbnMtYmFja2VuZC1zdGcuYmlya2hvZmYubWVcIjtcbiAgICAgIGJyZWFrO1xuICB9XG59XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgdnVlKHtcbiAgICAgIGluY2x1ZGU6IFsvXFwudnVlJC9dLFxuICAgIH0pLFxuICAgIHZ1ZUkxOG4oe1xuICAgICAgaW5jbHVkZTogcmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9sb2NhbGVzLyoqXCIpLFxuICAgIH0pLFxuICAgIFdpbmRpQ1NTKCksXG4gICAgVml0ZUNvbXBvbmVudHMoe1xuICAgICAgcmVzb2x2ZXJzOiBbXG4gICAgICAgIEljb25zUmVzb2x2ZXIoe1xuICAgICAgICAgIHByZWZpeDogXCJpXCIsXG4gICAgICAgIH0pLFxuICAgICAgXSxcbiAgICB9KSxcbiAgICBJY29ucyh7IGF1dG9JbnN0YWxsOiB0cnVlIH0pLFxuICBdLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgIFwiQFwiOiByZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyY1wiKSxcbiAgICB9LFxuICB9LFxuICB0ZXN0OiB7fSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUVBLFNBQVMsb0JBQW9CO0FBQzdCLFNBQVMsZUFBZTtBQUN4QixPQUFPLGNBQWM7QUFDckIsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sV0FBVztBQUNsQixPQUFPLG1CQUFtQjtBQUMxQixPQUFPLG9CQUFvQjtBQUMzQixPQUFPLGFBQWE7QUFDcEIsT0FBTyxZQUFZO0FBVm5CLElBQU0sbUNBQW1DO0FBWXpDLElBQUksQ0FBQyxRQUFRLElBQUksOEJBQThCO0FBSTdDLFVBQVEsUUFBUSxJQUFJLHFCQUFxQixRQUFRLElBQUkseUJBQXlCLE9BQU8sS0FBSyxLQUFLLElBQUk7QUFBQSxJQUVqRyxLQUFLO0FBQUEsSUFDTCxLQUFLO0FBQ0gsY0FBUSxJQUFJLCtCQUNWO0FBQ0Y7QUFBQSxJQUdGO0FBQ0UsY0FBUSxJQUFJLCtCQUNWO0FBQ0Y7QUFBQSxFQUNKO0FBQ0Y7QUFHQSxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxJQUFJO0FBQUEsTUFDRixTQUFTLENBQUMsUUFBUTtBQUFBLElBQ3BCLENBQUM7QUFBQSxJQUNELFFBQVE7QUFBQSxNQUNOLFNBQVMsUUFBUSxrQ0FBVyxjQUFjO0FBQUEsSUFDNUMsQ0FBQztBQUFBLElBQ0QsU0FBUztBQUFBLElBQ1QsZUFBZTtBQUFBLE1BQ2IsV0FBVztBQUFBLFFBQ1QsY0FBYztBQUFBLFVBQ1osUUFBUTtBQUFBLFFBQ1YsQ0FBQztBQUFBLE1BQ0g7QUFBQSxJQUNGLENBQUM7QUFBQSxJQUNELE1BQU0sRUFBRSxhQUFhLEtBQUssQ0FBQztBQUFBLEVBQzdCO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLElBQ2pDO0FBQUEsRUFDRjtBQUFBLEVBQ0EsTUFBTSxDQUFDO0FBQ1QsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
