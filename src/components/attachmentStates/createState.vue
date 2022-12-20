<template>
	<div :class="dynamicClass()">
		<div style="padding: 16px; margin: auto">
			<Button
				class="p-button-outlined"
				style="border: 2px solid #bcd19b"
				@click="handleEdit"
			>
				<div>
					<i class="pi pi-plus text-[#53565a]"></i>
				</div>
				<div class="ml-8px font-bold text-20px text-[#53565a]">
					{{ $t("添加資料") }}
				</div>
			</Button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Button from "primevue/button";
import "primeicons/primeicons.css";

const props = defineProps(["category", "identity", "order"]);

const emit = defineEmits(["edit"]);

const dynamicClass = () => {
	const className = ref("");

	switch (props.identity) {
		case "admissionManager":
			className.value = "admissionManagerCreateState";
			break;
		case "admissionApplicant":
			className.value = "admissionApplicantCreateState";
			break;
	}

	return className.value;
};

const handleEdit = () => {
	emit("edit", props.order - 1, props.category);
};
</script>

<style setup lang="css">
.admissionManagerCreateState {
	margin-top: 24px;
	border: 2px dashed #874b52;
	border-radius: 8px;
	display: flex;
}

.admissionApplicantCreateState {
	margin-top: 24px;
	border: 2px dashed #736028;
	border-radius: 8px;
	display: flex;
}
</style>
