<template>
	<div
		class="flex justify-center gap-6"
		:class="colorStyle"
		v-bind="$attrs"
		bg="opacity-90"
		border="2 rounded-lg"
	>
		<NButton
			v-if="props.optionNum >= 1"
			:Admin="isAdmin"
			:Applicant="isApplicant"
			:Reviewer="isReviewer"
			:isSelected="choseOption === 1"
			@click="pickOption(1)"
			white
			class="w-full h-full"
		>
			<slot name="Select1" />
		</NButton>
		<NButton
			v-if="props.optionNum >= 2"
			:Admin="isAdmin"
			:Applicant="isApplicant"
			:Reviewer="isReviewer"
			:isSelected="choseOption === 2"
			@click="pickOption(2)"
			white
			class="w-full h-full"
		>
			<slot name="Select2" />
		</NButton>
		<NButton
			v-if="props.optionNum >= 3"
			:Admin="isAdmin"
			:Applicant="isApplicant"
			:Reviewer="isReviewer"
			:isSelected="choseOption === 3"
			@click="pickOption(3)"
			white
			class="w-full h-full"
		>
			<slot name="Select3" />
		</NButton>
		<NButton
			v-if="props.optionNum >= 4"
			:Admin="isAdmin"
			:Applicant="isApplicant"
			:Reviewer="isReviewer"
			:isSelected="choseOption === 4"
			@click="pickOption(4)"
			white
			class="w-full h-full"
		>
			<slot name="Select4" />
		</NButton>
		<NButton
			v-if="props.optionNum >= 5"
			:Admin="isAdmin"
			:Applicant="isApplicant"
			:Reviewer="isReviewer"
			:isSelected="choseOption === 5"
			@click="pickOption(5)"
			white
			class="w-full h-full"
		>
			<slot name="Select5" />
		</NButton>
	</div>
</template>

<script setup lang="ts">
import NButton from "@/styles/CustomButton.vue";
import { ref, computed } from "vue";

const props = defineProps({
	Admin: { type: Boolean, default: false, create: true },
	Reviewer: { type: Boolean, default: false, create: true },
	Applicant: { type: Boolean, default: false, create: true },
	optionNum: { type: Number, default: 2 },
});

const emits = defineEmits(["currentTab"]);

const isAdmin = props.Admin;
const isApplicant = props.Applicant;
const isReviewer = props.Reviewer;

const choseOption = ref(1);

const colorStyle = computed(() => {
	if (props.Admin) return "bg-nRed-50 border-nRed-100";
	if (props.Applicant) return "bg-nGold-50 border-nGold-100";
	if (props.Reviewer) return "bg-nBlue-50 border-nBlue-100";
	else return "bg-nGrey-700 text-body";
});

function pickOption(pickNumber: number) {
	choseOption.value = pickNumber;
	emits("currentTab", pickNumber);
}
</script>
