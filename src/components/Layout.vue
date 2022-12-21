<template>
	<div pos="relative inset-0" h="full" flex="~ col gap-0">
		<!-- Header -->
		<div pos="inset-x-0" text="4xl title" font="tracking-widest medium">
			<div mb="3"><slot name="Header" /></div>
			<div w="full" h="1" my="1" :class="colorStyle" />
		</div>
		<!-- Body -->
		<div flex="grow" overflow="scroll" text="body">
			<div flex="~ col gap-6" mt="4" mb="1/3">
				<slot name="Body" />
			</div>
		</div>
		<!-- Footer -->
		<div>
			<div w="full" h="1" my="1" :class="colorStyle" />
			<div mt="3"><slot name="Footer" /></div>
		</div>
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
	else return "bg-nGrey-700 text-body";
});
</script>
