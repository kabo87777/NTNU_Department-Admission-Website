<template>
	<button
		v-bind="$attrs"
		class="flex justify-center items-center p-4 gap-2"
		:class="btnState"
		:text="btnText"
		border="2 rounded-lg"
	>
		<i v-if="btnIcon.show" :class="btnIcon.type" :style="btnIcon.size" />
		<i v-if="btnIcon.show" :class="btnIcon.type" :style="btnIcon.size" />
		<slot />
	</button>
</template>

<script setup lang="ts">
import { computed } from "vue";
import "primeicons/primeicons.css";

const props = defineProps({
	type: { type: String, default: "Secondary" },
	size: { type: String, default: "base" },
	icon: { type: String, default: "" },
	// Status
	isSelected: { type: Boolean, default: false, created: true },
	disabled: { type: Boolean, default: false, created: true },
	// Appearance
	filled: { type: Boolean, default: false, create: true },
	white: { type: Boolean, default: false, create: true },
	// Abbrivation
	Applicant: { type: Boolean, default: false, created: true },
	Admin: { type: Boolean, default: false, created: true },
	Reviewer: { type: Boolean, default: false, created: true },
	Secondary: { type: Boolean, default: false, created: true },
	Success: { type: Boolean, default: false, created: true },
	Danger: { type: Boolean, default: false, created: true },
});

// Preset Design Style
const designClass: { [key: string]: any } = {
	Reviewer: {
		normal: "border-nBlue-500 text-pReviewer",
		fill: "bg-nBlue-200 text-title !border-1",
		hover: "hover:border-nBlue-500 hover:bg-nBlue-400 hover:text-white",
		active: "active:bg-nBlue-600 active:text-white",
		isSelect: "!border-3 border-opacity-80 font-medium text-pReviewer",
	},
	Admin: {
		normal: "border-nRed-600 text-pAdmin",
		fill: "bg-nRed-200 text-title !border-1",
		hover: "hover:border-nRed-600 hover:bg-nRed-400 hover:text-white",
		active: "active:bg-nRed-700 active:text-white",
		isSelect: "!border-3 border-opacity-80 font-medium text-pAdmin",
	},
	Applicant: {
		normal: "border-nGold-500 text-pApplicant",
		fill: "bg-nGold-300 text-title !border-1",
		hover: "hover:border-nGold-500 hover:bg-nGold-500 hover:text-white",
		active: "active:bg-nGold-600 active:text-white",
		isSelect: "!border-3 border-opacity-80 font-medium text-pApplicant",
	},
	Secondary: {
		normal: "border-nGrey-600 text-secondary",
		fill: "bg-nGrey-200 text-title !border-1",
		hover: "hover:border-nGrey-600 hover:bg-nGrey-400 hover:text-white",
		active: "active:bg-nGrey-700 active:text-white",
		isSelect: "!border-3 border-opacity-80 font-medium text-title",
	},
	Success: {
		normal: "border-success-700 text-success",
		fill: "bg-success-100 text-title !border-1",
		hover: "hover:border-success-700 hover:bg-success-100 hover:text-title",
		active: "!active:bg-success-700 !active:text-white",
		isSelect: "!border-3 border-opacity-80 font-medium text-title",
	},
	Danger: {
		normal: "border-danger-700 text-danger",
		fill: "bg-danger-100 text-title !border-1",
		hover: "hover:border-danger-700 hover:bg-danger-100 hover:text-title",
		active: "!active:bg-danger-700 !active:text-white",
		isSelect: "!border-3 border-opacity-80 font-medium text-title",
	},
};

// Handle Button Style
const btnState = computed(() => {
	// Deal with type "Grey", "White" on previous version
	let type = props.type,
		fill = props.filled;
	if (type === "White") {
		type = "Secondary";
		fill = true;
	} else if (type === "Grey") type = "Secondary";

	type = propId(type);
	const normal = designClass[type].normal;
	const hover = props.disabled ? null : designClass[type].hover;
	const active = props.disabled ? null : designClass[type].active;
	const appear = appearance(type, fill, props.white, props.isSelected);
	const disabled = props.disabled ? "opacity-30 cursor-default" : null;
	return normal + " " + appear + " " + disabled + " " + hover + " " + active;
});

const btnText = computed(() => props.size);

const btnIcon = computed(() => {
	const show = props.size ? true : false;
	const type = props.icon ? props.icon + " mt-0.5" : null;
	let size = iconSize(props.size);
	if (props.isSelected) size += "; " + iconWeight("medium");
	return { show, size, type };
});

// Deal with Props
function propId(type: string) {
	if (props.Applicant) return "Applicant";
	if (props.Admin) return "Admin";
	if (props.Reviewer) return "Reviewer";
	if (props.Secondary) return "Secondary";
	if (props.Success) return "Success";
	if (props.Danger) return "Danger";
	return type;
}

// Deal with Appearance
function appearance(
	type: string,
	isFilled: boolean,
	isWhite: boolean,
	isSelected: boolean
) {
	if (isWhite) {
		if (isSelected) return designClass[type].isSelect;
		else return "!border-3 border-opacity-0 text-body";
	} else if (isFilled) return designClass[type].fill;
	else return "border-opacity-50";
}

// Size Translation ( WindiCSS to SCSS )
function iconSize(windiSize: string) {
	switch (windiSize) {
		case "xs":
			return "font-size:0.75rem";
		case "sm":
			return "font-size:0.875rem";
		case "base":
			return "font-size:1rem";
		case "lg":
			return "font-size:1.125rem";
		case "xl":
			return "font-size:1.25rem";
		case "2xl":
			return "font-size:1.5rem";
		case "3xl":
			return "font-size:1.875rem";
		case "4xl":
			return "font-size:2.25rem";
		default:
			return "font-size:1rem";
	}
}

function iconWeight(windiWeight: string) {
	switch (windiWeight) {
		case "light":
			return "font-weight:400";
		case "normal":
			return "font-weight:500";
		case "medium":
			return "font-weight:600";
		case "semibold":
			return "font-weight:700";
		default:
			return "font-weight:500";
	}
}
</script>
