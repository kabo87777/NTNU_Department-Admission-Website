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
			<h3>Left Sidebar</h3>
		</Sidebar>
		<!-- <Button icon="pi pi-arrow-right" @click="visibleLeft = true"  /> -->
	</div>
</template>

<script setup lang="ts">
import Sidebar from "primevue/sidebar";
import { ref } from "vue";
const visibleLeft = ref(true);
</script>
