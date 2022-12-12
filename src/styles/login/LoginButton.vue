<template>
	<button
		v-if="props.id === 'Reviewer'"
		v-bind="$attrs"
		class="border-2 text-pReviewer text-lg"
		:class="btnSize"
		border="2 opacity-30 nBlue-500 rounded-lg"
		hover="text-title bg-nBlue-200 border-nBlue-200"
		active="text-white bg-nBlue-500"
	>
		<slot />
	</button>
	<button
		v-if="props.id === 'Admin'"
		v-bind="$attrs"
		class="border-2 text-pAdmin text-lg"
		:class="btnSize"
		border="2 opacity-30 nRed-600 rounded-lg"
		hover="text-title bg-nRed-200 border-nRed-200"
		active="text-white bg-nRed-600"
	>
		<slot />
	</button>
	<button
		v-if="props.id === 'Applicant'"
		v-bind="$attrs"
		class="border-2 text-pApplicant text-lg"
		:class="btnSize"
		border="2 opacity-30 nGold-500 rounded-lg"
		hover="text-title bg-nGold-300 border-nGold-300"
		active="text-white bg-nGold-500"
	>
		<slot />
	</button>
</template>

<script setup lang="ts">
import { computed } from "vue";
const props = defineProps(["id", "size"]);
const btnSize = computed(() => {
	switch (props.size) {
		case "sm":
			return "py-2 text-sm";
		case "lg":
			return "py-4 text-lg";
		default:
			return "py-3 text-base";
	}
});
</script>
