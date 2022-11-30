<template>
	<div :class="dynamicClass()" style="margin-top: 36px">
		<div class="p-[36px] w-9/10">
			<Dialog
				v-model:visible="isModalVisible"
				style="width: 500px"
				:closable="false"
				:draggable="false"
				:modal="true"
			>
				<template #header>
					<div class="font-bold text-[24px]">
						{{ $t("確認") }}
					</div>
				</template>
				<template #default>
					<div class="flex">
						<div class="mt-2px">
							<i
								class="pi pi-question-circle"
								style="font-size: 20px"
							/>
						</div>
						<div class="ml-4px">
							{{ $t("確認送出") + $t("?") }}
						</div>
					</div>
				</template>
				<template #footer>
					<Button
						class="p-button-outlined p-button-secondary"
						style="
							border: 2px solid #a18b4a;
							color: #736028;
							height: 36px;
						"
						icon="pi pi-times"
						iconClass="text-[#736028]"
						:label="$t('取消')"
						@click="isModalVisible = false"
					/>
					<Button
						class="p-button-outlined p-button-secondary"
						style="
							color: #53565a;
							border: 2px solid #bcd19b;
							margin-left: 16px;
							height: 36px;
						"
						icon="pi pi-check"
						iconClass="text-[#53565A]"
						:label="$t('確認')"
						:loading="isUploadLoading"
						@click="handleUpload"
					/>
				</template>
			</Dialog>
			<div class="text-20px font-bold">{{ $t("請上傳補交文件") }}</div>
			<div v-if="fileName === ''" class="mt-16px" style="width: 85%">
				<FileUpload
					style="
						background-color: #bdbdbd;
						color: black;
						border: #bdbdbd;
					"
					:chooseLabel="$t('選擇檔案')"
					mode="basic"
					:customUpload="true"
					@uploader="onUpload"
					:maxFileSize="5000000"
					:fileLimit="1"
					accept=".pdf"
				>
				</FileUpload>
			</div>
			<Button
				v-else
				style="
					background-color: #bdbdbd;
					color: black;
					border: #bdbdbd;
					margin-top: 16px;
				"
				disabled
			>
				{{ fileName }}
			</Button>
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
						@click="isModalVisible = true"
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
import FileUpload, { FileUploadUploaderEvent } from "primevue/fileupload";
import Dialog from "primevue/dialog";
import "primeicons/primeicons.css";

const props = defineProps(["identity", "order", "isUploadLoading"]);
const emit = defineEmits(["cancel", "upload"]);

const isModalVisible = ref(false);
const formData = new FormData();
const fileName = ref("");

const dynamicClass = (): string => {
	switch (props.identity) {
		case "admissionManager":
			return "admissionManagerCreateState";
		case "admissionApplicant":
			return "admissionApplicantCreateState";
	}
	return "";
};

const onUpload = (event: FileUploadUploaderEvent) => {
	const uploadedFile = Array.isArray(event.files)
		? event.files[0]
		: event.files;
	formData.append("filepath", uploadedFile);
	fileName.value = uploadedFile.name;
};

const handleCancel = () => {
	emit("cancel", props.order - 1);
};

const handleUpload = () => {
	emit("upload", formData);
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
