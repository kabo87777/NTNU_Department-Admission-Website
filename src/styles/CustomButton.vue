<template>
	<button
		v-if="props.type === 'Reviewer'"
		v-bind="$attrs"
		class="flex items-center justify-center gap-2 text-pReviewer"
		:class="btnSize"
		border="2 opacity-30 nBlue-500 rounded-lg"
		hover="text-title bg-nBlue-200 border-nBlue-200"
		active="text-white bg-nBlue-500"
	>
		<i v-if="showIcon" :class="iconType" :style="iconSize" mt="2px" />
		<slot />
	</button>
	<button
		v-if="props.type === 'Admin'"
		v-bind="$attrs"
		class="flex items-center justify-center gap-2 text-pAdmin"
		:class="btnSize"
		border="2 opacity-30 nRed-600 rounded-lg"
		hover="text-title bg-nRed-200 border-nRed-200"
		active="text-white bg-nRed-600"
	>
		<i v-if="showIcon" :class="iconType" :style="iconSize" mt="2px" />
		<slot />
	</button>
	<button
		v-if="props.type === 'Applicant'"
		v-bind="$attrs"
		class="flex items-center justify-center gap-2 text-pApplicant"
		:class="btnSize"
		border="2 opacity-30 nGold-500 rounded-lg"
		hover="text-title bg-nGold-300 border-nGold-300"
		active="text-white bg-nGold-500"
	>
		<i v-if="showIcon" :class="iconType" :style="iconSize" mt="2px" />
		<slot />
	</button>
	<button
		v-if="props.type === 'White'"
		v-bind="$attrs"
		:class="btnSize"
		class="flex items-center justify-center gap-2 text-secondary"
		border="rounded-lg"
		hover="bg-nGrey-200 text-title"
		active="bg-nGrey-600 text-white"
	>
		<i v-if="showIcon" :class="iconType" :style="iconSize" mt="2px" />
		<slot />
	</button>
	<button
		v-if="props.type === 'Grey'"
		v-bind="$attrs"
		:class="btnSize"
		class="flex items-center justify-center gap-2 text-body"
		border="2 opacity-30 nGrey-600 rounded-lg"
		hover="bg-nGrey-200 text-title border-nGrey-200"
		active="bg-nGrey-600 text-white"
	>
		<i v-if="showIcon" :class="iconType" :style="iconSize" mt="2px" />
		<slot />
	</button>
</template>

<script setup lang="ts">
import { computed } from "vue";
import "primeicons/primeicons.css";
const props = defineProps(["type", "size", "icon"]);
const btnSize = computed(() => {
	switch (props.size) {
		case "xs":
			return "text-xs";
		case "sm":
			return "text-sm";
		case "base":
			return "text-base";
		case "lg":
			return "text-lg";
		case "xl":
			return "text-xl";
		case "2xl":
			return "text-2xl";
		case "3xl":
			return "text-3xl";
		case "4xl":
			return "text-4xl";
		default:
			return "text-base";
	}
});
const iconSize = computed(() => {
	switch (props.size) {
		case "xs":
			return "font-size: 0.75rem";
		case "sm":
			return "font-size: 0.875rem";
		case "base":
			return "font-size: 1rem";
		case "lg":
			return "font-size: 1.125rem";
		case "xl":
			return "font-size: 1.25rem";
		case "2xl":
			return "font-size: 1.5rem";
		case "3xl":
			return "font-size: 1.875rem";
		case "4xl":
			return "font-size: 2.25rem";
		default:
			return "font-size: 1rem";
	}
});
const showIcon = computed(() => {
	if (props.icon) return true;
	else return false;
});
const iconType = computed(() => {
	return props.icon;
});
</script>
