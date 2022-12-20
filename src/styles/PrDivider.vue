<template>
	<div flex="~ gap-4" my="2">
		<div flex="grow" h="1px" my="1" :class="colorStyle" />
		<div flex="~" class="<md:hidden">
			<div :class="colorStyle" w="4px" h="8px" />
			<div :class="colorStyle" w="4px" h="2px" mt="3px" />
			<div :class="colorStyle" w="4px" h="8px" />
			<div :class="colorStyle" w="4px" h="2px" mt="3px" />
			<div :class="colorStyle" w="4px" h="8px" />
			<div :class="colorStyle" w="4px" h="2px" mt="3px" />
			<div :class="colorStyle" w="4px" h="8px" />
			<div :class="colorStyle" w="4px" h="2px" mt="3px" />
			<div :class="colorStyle" w="4px" h="8px" />
			<div :class="colorStyle" w="4px" h="2px" mt="3px" />
			<div :class="colorStyle" w="4px" h="8px" />
			<div :class="colorStyle" w="4px" h="2px" mt="3px" />
			<div :class="colorStyle" w="4px" h="8px" />
			<div :class="colorStyle" w="4px" h="2px" mt="3px" />
			<div :class="colorStyle" w="4px" h="8px" />
			<div :class="colorStyle" w="4px" h="2px" mt="3px" />
		</div>
		<div
			flex="grow"
			h="1px"
			my="1"
			class="<md:hidden"
			:class="colorStyle"
		/>
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
	Admin: { type: Boolean, default: false, create: true },
	Reviewer: { type: Boolean, default: false, create: true },
	Applicant: { type: Boolean, default: false, create: true },
});

const colorStyle = computed(() => {
	if (props.Admin) return "bg-nRed-500 text-pAdmin";
	if (props.Applicant) return "bg-nGold-500 text-pApplicant";
	if (props.Reviewer) return "bg-nBlue-500 text-pReviewer";
});
</script>
