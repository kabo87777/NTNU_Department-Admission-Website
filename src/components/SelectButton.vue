<template>
	<div
		class="flex justify-center gap-6"
		:class="colorStyle"
		v-bind="$attrs"
		bg="opacity-90"
		border="1 rounded-lg"
	>
		<NButton
			v-if="props.optionNum >= 1"
			:Admin="isAdmin"
			:Applicant="isApplicant"
			:Reviewer="isReviewer"
			:isSelected="choseOption === 1"
			:disabled="isDisable"
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
			:disabled="isDisable"
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
			:disabled="isDisable"
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
			:disabled="isDisable"
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
			:disabled="isDisable"
			@click="pickOption(5)"
			white
			class="w-full h-full"
		>
			<slot name="Select5" />
		</NButton>
		<NButton
			v-if="props.optionNum >= 6"
			:Admin="isAdmin"
			:Applicant="isApplicant"
			:Reviewer="isReviewer"
			:isSelected="choseOption === 6"
			:disabled="isDisable"
			@click="pickOption(6)"
			white
			class="w-full h-full"
		>
			<slot name="Select6" />
		</NButton>
	</div>
</template>

<script setup lang="ts">
import NButton from "@/styles/CustomButton.vue";
import { ref, computed, onMounted } from "vue";

const props = defineProps({
	Admin: { type: Boolean, default: false, create: true },
	Reviewer: { type: Boolean, default: false, create: true },
	Applicant: { type: Boolean, default: false, create: true },
	optionNum: { type: Number, default: 2 },
	disabled: { type: Boolean, default: false, created: true },
	initial: { type: Number, default: 1 },
});

const emits = defineEmits(["currentTab"]);

const isAdmin = computed(() => props.Admin);
const isApplicant = computed(() => props.Applicant);
const isReviewer = computed(() => props.Reviewer);

const choseOption = ref(1);

onMounted(() => {
	pickOption(props.initial);
});

const colorStyle = computed(() => {
	if (props.Admin) return "bg-nRed-50 border-nRed-200";
	if (props.Applicant) return "bg-nGold-50 border-nGold-100";
	if (props.Reviewer) return "bg-nBlue-50 border-nBlue-100";
	else return "bg-nGrey-700 text-body";
});

const isDisable = computed(() => {
	if (props.disabled) return true;
	else return false;
});

function pickOption(pickNumber: number) {
	choseOption.value = pickNumber;
	emits("currentTab", pickNumber);
}
</script>
