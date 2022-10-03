import { defineConfig } from "vite";
import WindiCSS from "vite-plugin-windicss";
import vue from "@vitejs/plugin-vue";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import ViteComponents from "unplugin-vue-components/vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue({
			include: [/\.vue$/],
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
