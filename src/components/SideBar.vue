<template>
	<div>
		<Sidebar
			v-model:visible="visibleLeft"
			:dismissable="true"
			:showCloseIcon="false"
			:baseZIndex="-1"
			:modal="false"
			class="mt-15"
		>
			<Dropdown
				v-model="selectedProgram"
				:options="programs"
				optionLabel="program_name"
				class="w-full h-60px !text-3xl tracking-2px"
			/>
			<Button
				label="專案設定"
				icon="pi pi-cog"
				class="p-button-secondary p-button-text my-5 w-full text-left tracking-2px"
			/>
		</Sidebar>
		<!-- <Button icon="pi pi-arrow-right" @click="visibleLeft = true"  /> -->
	</div>
</template>

<script setup lang="ts">
import Sidebar from "primevue/sidebar";
import { ref } from "vue";
import Dropdown from "primevue/dropdown";
import Button from "primevue/button";

const visibleLeft = ref(true);
const selectedProgram = ref({ program_name: "111年研究生審查" });
const programs = ref([{ program_name: "111年研究生審查" }]);
</script>

<style></style>
