<template>
	<div class="mt-16px pt-16px text-20px text-[#53565A]">
		{{ $t(props.category) }}
	</div>
	<div
		style="
			margin-top: 8px;
			border: 1px dashed #874b52;
			border-radius: 8px;
			display: flex;
		"
	>
		<div style="padding: 16px; margin: auto">
			<Button
				class="p-button-outlined"
				style="color: #53565a"
				@click="handleEdit"
			>
				<div>
					<i class="pi pi-plus"></i>
				</div>
				<div class="ml-8px">{{ $t("添加資料") }}</div>
			</Button>
		</div>
	</div>
</template>

<script setup lang="ts">
import Button from "primevue/button";
import "primeicons/primeicons.css";

const props = defineProps(["category", "order"]);

const emit = defineEmits(["edit"]);

const handleEdit = () => {
	emit("edit", props.order - 1, props.category);
};
</script>
