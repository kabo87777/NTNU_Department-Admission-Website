<template>
	<!-- NTNU School Logo -->
	<img
		src="/assets/login-page/NTNU-logo-B1.png"
		class="w-48 py-4 md:hidden"
		v-if="showLogo"
	/>
	<!-- Title -->
	<div mx="8" space="y-2">
		<div text="lg secondary">
			<slot name="Subtitle" />
		</div>
		<div text="4xl title" font="medium">
			<slot name="Chinese" />
		</div>
		<div text="2xl title" font="medium">
			<slot name="English" />
		</div>
	</div>
	<!-- Divider -->
	<div mx="8">
		<Divider align="center">
			<div p="x-2 y-6" text="secondary">
				<slot name="Divider" />
			</div>
		</Divider>
	</div>
</template>

<script setup lang="ts">
import Divider from "primevue/divider";
import { computed } from "vue";

const props = defineProps(["logo"]);
const showLogo = computed(() => {
	if (props.logo === "true") return true;
	else return false;
});
</script>
