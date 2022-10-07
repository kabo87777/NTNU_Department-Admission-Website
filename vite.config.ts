import { defineConfig } from "vite";
import { resolve } from "node:path";
import WindiCSS from "vite-plugin-windicss";
import vue from "@vitejs/plugin-vue";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import ViteComponents from "unplugin-vue-components/vite";
import vueI18n from "@intlify/vite-plugin-vue-i18n";

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
});
