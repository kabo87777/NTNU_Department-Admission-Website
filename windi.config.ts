import { defineConfig } from "windicss/helpers";
import AspectRatio from "windicss/plugin/aspect-ratio";
import Filters from "windicss/plugin/filters";
import Forms from "windicss/plugin/forms";
import LineClamp from "windicss/plugin/line-clamp";
import SrollSnap from "windicss/plugin/scroll-snap";

export default defineConfig({
	darkMode: "class",
	attributify: true,
	plugins: [AspectRatio, Filters, Forms, LineClamp, SrollSnap],
	theme: {
		textColor: {
			// secondary: '',
			success: "#62AE01",
			warning: "#BE9505",
			danger: "#BB0F17",
			info: "#6B23B4",
			body: "#0C0C0D",
		},
		extend: {
			colors: {
				mPrimary: "#93282C",
				jPrimary: "#003A5C",
				aPrimary: "#8A7B27",
				// secondary: '',
				success: "#92E826",
				warning: "#F2C831",
				danger: "#F23740",
				info: "#9F6AD4",
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
					DEFAULT: "#003A5C",
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
		},
	},
});
