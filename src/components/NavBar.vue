<template>
	<!-- <Menubar class="!bg-ntnuRed !rounded-none !border-0 sticky top-0 h-60px">
		<template>
			<img alt="logo" src="../assets/NTNU_LOGO.png" class="flex flex-row w-178000/840641 h-32000/149391 order-none"/>
			<img alt="logo2" src="../assets/CSIE.png" class="flex flex-row items-end p-0 gap-7px w-438px h-20px order-2 flex-none flex-grow-0"/>
		</template>
		
	</Menubar> -->
	<Toast class="my-10" />
	<nav
		class="flex flex-auto w-full h-60px mx-auto bg-ntnuRed items-center justify-between sticky top-0 z-50"
	>
		<img
			alt="logo"
			src="../assets/NTNU_LOGO.png"
			class="ml-4 w-178px h-32px"
		/>
		<nav class="w-0 h-30px border-1 mx-1 border-white"></nav>
		<img
			alt="logo2"
			src="../assets/CSIE.png"
			class="items-end px-2 gap-7px w-438px h-20px"
		/>
		<div class="w-full block">
			<Button
				class="border-white text-white p-button-sm p-button-outlined float-right mx-5"
				:label="$t('語言')"
				icon="pi pi-angle-down"
				iconPos="right"
				@click="toggle"
				aria-haspopup="true"
				aria-controls="overlay_menu"
			/>
			<Menu id="overlay_menu" ref="menu" :model="items" :popup="true" />
		</div>
	</nav>
</template>

<script setup lang="ts">
import Menu from "primevue/menu";
import Button from "primevue/button";

import { ref } from "vue";

import { useI18n } from "vue-i18n";
const { t, locale, availableLocales } = useI18n();

const menu = ref();

let items = ref(
	(availableLocales as string[]).map((loc: string) => {
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

<style scoped></style>
