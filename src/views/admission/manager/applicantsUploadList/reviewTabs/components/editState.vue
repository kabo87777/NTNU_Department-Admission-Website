<template>
	<div class="mt-16px pt-16px text-20px text-[#53565A]">
		{{ $t(props.category) }}{{ " - " }}{{ props.order }}
	</div>
	<div
		style="
			margin-top: 8px;
			border: 1px solid #874b52;
			border-radius: 8px;
			display: flex;
		"
	>
		<div class="p-[12px] w-9/10">
			<div class="font-[350]">{{ $t("項目名稱") }}{{ " : " }}</div>
			<InputText
				style="margin-top: 8px; border: 1px solid; width: 30%"
				v-model="name"
			/>
			<div
				class="normalDivider"
				style="width: 85%; margin-top: 16px"
			></div>
			<div class="mt-16px" style="width: 85%">
				<FileUpload
					name="attachment"
					:maxFileSize="5000000"
					:fileLimit="1"
				/>
			</div>
		</div>
		<div
			class="bg-[#ECECEB] w-1/10"
			style="
				border-top-right-radius: 8px;
				border-bottom-right-radius: 8px;
				position: relative;
			"
		>
			<div
				style="
					position: absolute;
					top: 50%;
					transform: translate(-50%, -50%);
					left: 50%;
				"
			>
				<div>
					<Button
						class="p-button-outlined"
						icon="pi pi-check"
						style="color: #53565a"
					/>
				</div>
				<div class="mt-16px">
					<Button
						class="p-button-outlined"
						icon="pi pi-times"
						style="color: #93282c"
						@click="handleCancel"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import FileUpload from "primevue/fileupload";
import "primeicons/primeicons.css";

const props = defineProps(["category", "order", "itemName"]);

const name = ref(props.itemName);

const emit = defineEmits(["cancel"]);
const handleCancel = () => {
	emit("cancel", props.order - 1, props.category);
};
</script>
