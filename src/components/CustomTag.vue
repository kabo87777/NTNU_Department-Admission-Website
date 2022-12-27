<template>
	<div
		v-bind="$attrs"
		:class="colorStyle"
		border="1 rounded-lg"
		class="px-2 min-w-15 text-sm text-center"
	>
		<slot />
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
	// Appearance
	flag: { type: String, default: "disable" },
});

const designClass: { [key: string]: any } = {
	disable: "border-nGrey bg-nGrey-50 text-nGrey",
	success: "border-success-700 bg-success-50 text-success",
	warning: "border-warning-700 bg-warning-50 text-warning",
	danger: "border-danger-700 bg-danger-50 text-danger",
	info: "border-info-700 bg-info-50 text-info",
};

const colorStyle = computed(() => {
	return designClass[props.flag];
});
</script>
