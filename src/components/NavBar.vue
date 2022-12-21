<template>
	<!-- <Menubar class="!bg-ntnuRed !rounded-none !border-0 sticky top-0 h-60px">
		<template>
			<img alt="logo" src="../assets/NTNU_LOGO.png" class="flex flex-row w-178000/840641 h-32000/149391 order-none"/>
			<img alt="logo2" src="../assets/CSIE.png" class="flex flex-row items-end p-0 gap-7px w-438px h-20px order-2 flex-none flex-grow-0"/>
		</template>

	</Menubar> -->
	<Toast class="my-10" />
	<nav class="flex items-center fixed w-screen h-15 z-100 bg-nRed px-4">
		<!-- NTNU LOGO -->
		<img alt="logo" src="/assets/NTNU_LOGO.png" h="8" />
		<div class="w-1px h-8 mx-2 bg-white <md:hidden" />
		<!-- CSIE TITLE -->
		<img alt="logo2" src="/assets/CSIE.png" class="h-5 <md:hidden" />
		<!-- I18n switch Button -->
		<div flex="~" justify="end" w="full" m="2">
			<div v-show="props.showSwitchLang !== false">
				<Button
					class="p-button"
					@click="toggle"
					aria-haspopup="true"
					aria-controls="overlay_menu"
				>
					<div flex="~ gap-2" justify="end" w="full">
						<i class="pi pi-globe" />
						<div m="r-auto b-1px">{{ $t("語言") }}</div>
						<i class="pi pi-chevron-down" />
					</div>
				</Button>
				<Menu
					id="overlay_menu"
					ref="menu"
					:model="items"
					:popup="true"
				/>
			</div>
		</div>
	</nav>
</template>

<script setup lang="ts">
import Menu from "primevue/menu";
import Button from "primevue/button";

import { ref } from "vue";

import { useI18n } from "vue-i18n";
const { t, locale, availableLocales } = useI18n();

const props = defineProps(["showSwitchLang"]);

const menu = ref();

let items = ref(
	availableLocales.map((loc: string) => {
		return {
			label: t("語言名稱", "", { locale: loc }),
			icon: "",
			command: () => {
				locale.value = loc;
				window.localStorage.setItem("lastLocale", loc);
			},
		};
	})
);

const toggle = (event: MouseEvent) => {
	menu.value.toggle(event);
};
</script>

<style scoped="scss">
.p-button {
	width: 160px;
	height: 36px;
	font-size: 14px;
	font-weight: 400;
	border-color: white !important;
	color: #94282c !important;
	background-color: white !important;
	padding: 12px !important;
}
.pi {
	margin-top: auto;
	margin-bottom: auto;
	font-size: 14px;
	font-weight: 400;
}
</style>
