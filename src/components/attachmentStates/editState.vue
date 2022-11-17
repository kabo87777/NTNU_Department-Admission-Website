<template>
	<div class="mt-16px pt-16px text-20px text-[#53565A]">
		{{ $t(props.category) }}{{ " - " }}{{ props.order }}
	</div>
	<div :class="dynamicClass()">
		<div class="p-[12px] w-9/10">
			<div class="font-[350]">{{ $t("項目名稱") }}{{ $t(":") }}</div>
			<InputText
				style="margin-top: 8px; border: 1px solid; width: 30%"
				v-model="name"
			/>
			<div
				v-if="
					props.category === '就學經歷' ||
					props.category === '教學經歷'
				"
				class="font-[350] mt-16px"
			>
				{{ $t("所屬學校") }}{{ $t(":") }}
			</div>
			<InputText
				v-if="
					props.category === '就學經歷' ||
					props.category === '教學經歷'
				"
				style="margin-top: 8px; border: 1px solid; width: 30%"
				v-model="schoolName"
			/>
			<div
				v-if="props.category === '考試與檢定分數'"
				class="font-[350] mt-16px"
			>
				{{ $t("分數") }}{{ $t(":") }}
			</div>
			<InputText
				v-if="props.category === '考試與檢定分數'"
				style="margin-top: 8px; border: 1px solid; width: 30%"
				v-model="score"
			/>
			<div
				class="normalDivider"
				style="width: 85%; margin-top: 16px"
			></div>
			<div class="mt-16px" style="width: 85%">
				<FileUpload
					style="
						background-color: #bdbdbd;
						color: black;
						border: #bdbdbd;
					"
					mode="basic"
					name="attachment"
					:customUpload="true"
					@uploader="handleUpload"
					:maxFileSize="5000000"
					:fileLimit="1"
					accept=".pdf"
				>
				</FileUpload>
			</div>
			<p class="mt-16px">{{ $t("onlyPdf") }}</p>
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
						style="border: 2px solid #bcd19b"
						icon="pi pi-check"
						iconClass="text-[#53565A]"
					/>
				</div>
				<div class="mt-16px">
					<Button
						class="p-button-outlined"
						style="border: 2px solid #93282c"
						icon="pi pi-times"
						iconClass="text-[#93282C]"
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

const props = defineProps([
	"category",
	"identity",
	"order",
	"itemName",
	"schoolName",
	"score",
]);

const name = ref(props.itemName);
const schoolName = ref(props.schoolName);
const score = ref(props.score);

const emit = defineEmits(["cancel"]);

const dynamicClass = (): string => {
	switch (props.identity) {
		case "admissionManager":
			return "admissionManagerCreateState";
		case "admissionApplicant":
			return "admissionApplicantCreateState";
	}
	return "";
};

const handleUpload = (event: any) => {
	//event.files == files to upload
	console.log(event);
};

const handleCancel = () => {
	emit("cancel", props.order - 1, props.category);
};
</script>

<style setup lang="css">
.admissionManagerEditState {
	margin-top: 8px;
	border: 1px solid #874b52;
	border-radius: 8px;
	display: flex;
}

.admissionApplicantEditState {
	margin-top: 8px;
	border: 1px solid #736028;
	border-radius: 8px;
	display: flex;
}
</style>
