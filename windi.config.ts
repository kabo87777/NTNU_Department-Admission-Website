import { defineConfig } from "windicss/helpers";
import AspectRatio from "windicss/plugin/aspect-ratio";
import Filters from "windicss/plugin/filters";
import Forms from "windicss/plugin/forms";
import LineClamp from "windicss/plugin/line-clamp";
import SrollSnap from "windicss/plugin/scroll-snap";

export default defineConfig({
	darkMode: "class",
	attributify: true,
	plugins: [
		AspectRatio,
		Filters,
		Forms,
		LineClamp,
		SrollSnap,
		require("@windicss/plugin-scrollbar"),
	],
	theme: {
		textColor: {
			success: "#62AE01",
			warning: "#BE9505",
			danger: "#BB0F17",
			info: "#6B23B4",
			// Grayscale Color
			title: "#0C0C0D", // Gray-900
			body: "#444547", // Gray-700
			secondary: "#757A80", // Gray-500
			disabled: "#BABDBF", // Gray-300
		},
		extend: {
			textColor: {
				pAdmin: "#62373E", // nRed-700 避免與 danger 撞色，使用較深的顏色
				pReviewer: "#18528C", // nBlue-600
				pApplicant: "#736028", // nGold-600
				white: "#FFFFFF", // white
			},
			colors: {
				// FIXME: "ntnuRed" & "blackLight" 是舊的屬性，但仍被用於此系統某些角落，
				//		  待頁面全面整理確認無引用之後，再進行移除
				ntnuRed: "#94282c",
				blackLight: "#2D2926",
				// secondary: '',
				success: {
					DEFAULT: "#92E826",
					50: "#F3FFE4",
					100: "#E3FFBF",
					500: "#92E826",
					700: "#62AE01",
				},
				warning: {
					DEFAULT: "#F2C831",
					50: "#FFF9E4",
					100: "#FFF1C0",
					500: "#F2C831",
					700: "#BE9505",
				},
				danger: {
					DEFAULT: "#F23740",
					50: "#FFEBEC",
					100: "#FFBEC1",
					500: "#F23740",
					700: "#BB0F17",
				},
				info: {
					DEFAULT: "#9F6AD4",
					50: "#F8F1FF",
					100: "#EBD7FF",
					500: "#9F6AD4",
					700: "#6B23B4",
				},
				nRed: {
					DEFAULT: "#93282C",
					50: "#FFF5F3",
					100: "#FFE4DF",
					200: "#F3BAAE",
					300: "#D18A7C",
					400: "#B15951",
					500: "#93282C",
					600: "#79363C",
					700: "#62373E",
					800: "#4D3639",
					900: "#332426",
				},
				nBlue: {
					DEFAULT: "#2459A4",
					50: "#F4F7FF",
					100: "#DFE7FD",
					200: "#A5B9EC",
					300: "#6C91DA",
					400: "#4370BE",
					500: "#2459A4",
					600: "#18528C",
					700: "#0B4873",
					800: "#003A5C",
					900: "#0D2E41",
				},
				nGold: {
					DEFAULT: "#8A7B27",
					50: "#FFFFE7",
					100: "#FAFAC7",
					200: "#EFEDA4",
					300: "#DBD379",
					400: "#B9AF3E",
					500: "#8A7B27",
					600: "#736028",
					700: "#624F2A",
					800: "#544830",
					900: "#363229",
				},
				nGrey: {
					DEFAULT: "#757A80",
					50: "#F5F6F6",
					100: "#ECEDED",
					200: "#D9DADA",
					300: "#BABDBF",
					400: "#969B9E",
					500: "#757A80",
					600: "#616366",
					700: "#444547",
					800: "#292A2B",
					900: "#0C0C0D",
				},
			},
			fontFamily: {
				sans: '"Noto Sans TC", "Helvetica Neue", sans-serif',
				// mono: '"Fira Code", monospace',
			},
		},
	},
});
