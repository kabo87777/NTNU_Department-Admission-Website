<template>
	<div class="mt-16px flex">
		<div class="text-20px text-[#53565A] pt-16px">
			{{ $t(props.category) }}{{ " - " }}{{ props.order }}
		</div>
		<Button
			class="p-button-outlined"
			style="border: 2px solid #a4bcc2; margin-left: 32px"
			@click="handleEdit"
		>
			<div>
				<i class="pi pi-pencil" style="color: rgba(83, 86, 90, 1)"></i>
			</div>
			<div class="mt-[-4px] ml-8px text-20px text-[#53565A] font-bold">
				{{ $t("編輯") }}
			</div>
		</Button>
		<Button
			class="p-button-outlined"
			style="border: 2px solid #93282c; margin-left: 16px"
		>
			<div>
				<i class="pi pi-times" style="color: rgba(135, 75, 82, 1)"></i>
			</div>
			<div class="mt-[-4px] ml-8px text-20px text-[#874B52] font-bold">
				{{ $t("刪除") }}
			</div>
		</Button>
	</div>
	<div class="normalDivider mt-16px"></div>
	<div class="mt-16px font-medium text-16px">
		{{ $t("項目名稱") }}{{ $t(":") }}{{ props.itemName }}
	</div>
	<div class="mt-8px font-medium text-16px">【檔案名稱】</div>
	<div>【檔案】</div>
	<div class="font-[350]">{{ $t("onlyPdf") }}</div>
</template>

<script setup lang="ts">
import Button from "primevue/button";
import "primeicons/primeicons.css";

const props = defineProps(["category", "identity", "itemName", "order"]);

const emit = defineEmits(["edit"]);

const handleEdit = () => {
	emit("edit", props.order - 1, props.category);
};
</script>
