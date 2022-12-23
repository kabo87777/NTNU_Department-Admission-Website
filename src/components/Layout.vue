<template>
	<div pos="relative inset-0" h="full" flex="~ col gap-0">
		<!-- Header -->
		<div pos="inset-x-0" text="4xl title" font="medium">
			<div mb="3" :class="letterSpace"><slot name="Header" /></div>
			<div w="full" h="1" my="1" :class="colorStyle" />
		</div>
		<!-- Body -->
		<div
			text="body"
			flex="grow"
			pos="relative"
			overflow="x-hidden y-auto"
			:scrollbar="scrollbarStyle"
		>
			<div h="4" v-if="margin" />
			<div flex="~ col gap-6">
				<slot name="Body" />
			</div>
		</div>
		<!-- Footer -->
		<div v-if="footer">
			<div w="full" h="1" my="1" :class="colorStyle" />
			<div mt="3"><slot name="Footer" /></div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();

const letterSpace = computed(() => {
	if (locale.value == "zh") return "tracking-[.125em]";
	if (locale.value == "en") return "";
	else return "";
});

const props = defineProps({
	Admin: { type: Boolean, default: false, create: true },
	Reviewer: { type: Boolean, default: false, create: true },
	Applicant: { type: Boolean, default: false, create: true },
	noMargin: { type: Boolean, default: false, create: true },
	noFooter: { type: Boolean, default: false, create: true },
});

const colorStyle = computed(() => {
	if (props.Admin) return "bg-nRed-500 text-pAdmin";
	if (props.Applicant) return "bg-nGold-500 text-pApplicant";
	if (props.Reviewer) return "bg-nBlue-500 text-pReviewer";
	else return "bg-nGrey-700 text-body";
});

const scrollbarStyle = computed(() => {
	if (props.Admin) return "thin thumb-nRed-100 thumb-rounded-full";
	if (props.Applicant) return "thin thumb-nGold-100 thumb-rounded-full";
	if (props.Reviewer) return "thin thumb-nBlue-100 thumb-rounded-full";
	else return "thin thumb-nGrey-100 thumb-rounded-full";
});

const margin = computed(() => {
	if (props.noMargin) return false;
	else return true;
});

const footer = computed(() => {
	if (props.noFooter) return false;
	else return true;
});
</script>
