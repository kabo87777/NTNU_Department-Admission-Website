<template>
	<button
		v-bind="$attrs"
		class="flex justify-center items-center gap-2 p-4"
		:class="btnState.normal"
		:hover="btnState.hover"
		:active="btnState.active"
		:text="btnText"
		border="opacity-50 rounded-lg"
	>
		<i
			v-if="btnIcon.show"
			:class="btnIcon.type"
			:style="btnIcon.size"
			mt="0.5"
		/>
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
	filled: { type: Boolean, default: false, create: true },
	disabled: { type: Boolean, default: false, created: true },
	// Abbrivation
	Applicant: { type: Boolean, default: false, created: true },
	Admin: { type: Boolean, default: false, created: true },
	Reviewer: { type: Boolean, default: false, created: true },
	Secondary: { type: Boolean, default: false, created: true },
	Success: { type: Boolean, default: false, created: true },
	Danger: { type: Boolean, default: false, created: true },
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

// Size Translation ( WindiCSS to SCSS )
const iconSize = (windiSize: string) => {
	switch (windiSize) {
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
};

// Preset Design Style
const designClass: { [key: string]: any } = {
	Reviewer: {
		normal: "border-nBlue-500 text-pReviewer",
		fill: "bg-white",
		hover: "border-nBlue-200 bg-nBlue-200 text-title",
		active: "bg-nBlue-500 text-white",
	},
	Admin: {
		normal: "border-nRed-600 text-pAdmin",
		fill: "bg-white",
		hover: "border-nRed-200 bg-nRed-200 text-title",
		active: "bg-nRed-600 text-white",
	},
	Applicant: {
		normal: "border-nGold-500 text-pApplicant",
		fill: "bg-white",
		hover: "border-nGold-300 bg-nGold-300 text-title",
		active: "bg-nGold-500 text-white",
	},
	Secondary: {
		normal: "border-nGrey-600 text-secondary",
		fill: "bg-white",
		hover: "border-nGrey-200 bg-nGrey-200 text-title",
		active: "bg-nGrey-600 text-white",
	},
	Success: {
		normal: "border-success-700 text-success",
		fill: "bg-white",
		hover: "border-success-100 bg-success-100 text-title",
		active: "bg-success-700 text-white",
	},
	Danger: {
		normal: "border-danger-700 text-danger",
		fill: "bg-white",
		hover: "border-danger-100 bg-danger-100 text-title",
		active: "bg-danger-700 text-white",
	},
};

// Handle Button Style
const btnState = computed(() => {
	// Additional code to fit previous version.
	let type = props.type,
		fill = props.filled;
	if (type === "White") {
		type = "Secondary";
		fill = true;
	} else if (type === "Grey") type = "Secondary";

	type = propId(type);
	const nState = designClass[type].normal;
	const hover = props.disabled ? null : designClass[type].hover;
	const active = props.disabled ? null : designClass[type].active;
	const filled = fill ? designClass[type].fill : "border-2";
	const disabled = props.disabled ? "opacity-30 cursor-default" : null;
	const normal = nState + " " + filled + " " + disabled;
	console.log(props.Admin, props.Reviewer, props.Applicant);
	return { normal, hover, active };
});

const btnText = props.size;

const btnIcon = computed(() => {
	const show = props.size ? true : false;
	const size = iconSize(props.size);
	const type = props.icon;
	return { show, size, type };
});
</script>
