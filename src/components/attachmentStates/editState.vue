<template>
	<div :class="dynamicClass()">
		<div class="px-24px py-16px w-9/10">
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
						:loading="isCreateLoading"
						@click="handleCreate"
					/>
				</template>
			</Dialog>
			<div v-if="!itemName" class="font-[350]">
				{{ $t("項目名稱") }}{{ $t(":") }}
			</div>
			<div
				v-if="itemName"
				class="font-[350] text-18px text-[#53565A] mt-8px"
			>
				{{ itemName }}
			</div>
			<div v-else>
				<InputText
					style="margin-top: 8px; border: 1px solid; width: 30%"
					v-model="name"
				/>
			</div>
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
			<InputNumber
				v-if="props.category === '考試與檢定分數'"
				style="
					margin-top: 8px;
					border: 1px solid;
					width: 30%;
					border-radius: 8px;
				"
				v-model="score"
			/>
			<div
				class="normalDivider"
				style="width: 85%; margin-top: 16px"
			></div>
			<div v-if="fileName === ''" class="mt-16px" style="width: 85%">
				<FileUpload
					:customUpload="true"
					@uploader="handleUpload"
					:maxFileSize="5000000"
					:fileLimit="1"
					accept=".pdf"
				>
					<template
						#header="{
							chooseCallback,
							uploadCallback,
							clearCallback,
						}"
					>
						<div class="flex gap-2">
							<Button
								class="p-button-secondary"
								style="
									background-color: #bdbdbd;
									color: black;
									border: #bdbdbd;
								"
								icon="pi pi-file"
								:label="$t('選擇檔案')"
								@click="chooseCallback()"
							/>
							<Button
								class="p-button-secondary"
								style="
									background-color: #bdbdbd;
									color: black;
									border: #bdbdbd;
								"
								icon="pi pi-cloud-upload"
								:label="$t('上傳')"
								@click="uploadCallback"
							/>
							<Button
								class="p-button-secondary"
								style="
									background-color: #bdbdbd;
									color: black;
									border: #bdbdbd;
								"
								icon="pi pi-times-circle"
								:label="$t('取消')"
								@click="clearCallback"
							/>
						</div>
					</template>
					<template #content="{ files }">
						<div v-if="files.length">
							<div class="flex flex-wrap sm:p-5 gap-5">
								<div
									class="flex"
									v-for="file of files"
									:key="file.name + file.type + file.size"
								>
									<img
										src="/assets/pdf_icon.png"
										alt="pdf"
										style="width: 50px"
									/>
									<div class="ml-8px">
										<span class="font-semibold">{{
											file.name
										}}</span>
										<div>{{ formatSize(file.size) }}</div>
									</div>
								</div>
							</div>
						</div>
					</template>
					<template #empty>
						<div>{{ $t("請上傳檔案") }}</div>
					</template>
				</FileUpload>
			</div>
			<div v-else>
				<Button
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
				<Button
					icon="pi pi-times"
					style="border: none; margin-left: 8px"
					class="p-button-rounded p-button-danger p-button-outlined"
					v-tooltip.right="t('重新上傳')"
					@click="removeUploadedFile"
				/>
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
import { useI18n } from "vue-i18n";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import FileUpload, { FileUploadUploaderEvent } from "primevue/fileupload";
import Dialog from "primevue/dialog";
import "primeicons/primeicons.css";

const props = defineProps([
	"category",
	"identity",
	"order",
	"itemName",
	"schoolName",
	"score",
	"isCreateLoading",
]);

const { t } = useI18n();

const name = ref(props.itemName);
const schoolName = ref(props.schoolName);
const score = ref(props.score);
const fileName = ref("");

const isModalVisible = ref(false);

const formData = new FormData();

const emit = defineEmits(["cancel", "create"]);

const dynamicClass = (): string => {
	switch (props.identity) {
		case "admissionManager":
			return "admissionManagerCreateState";
		case "admissionApplicant":
			return "admissionApplicantCreateState";
	}
	return "";
};

const formatSize = (bytes: number) => {
	if (bytes === 0) {
		return "0 B";
	}

	let k = 1000,
		dm = 3,
		sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
		i = Math.floor(Math.log(bytes) / Math.log(k));

	return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

const handleUpload = (event: FileUploadUploaderEvent) => {
	const uploadedFile = Array.isArray(event.files)
		? event.files[0]
		: event.files;
	formData.append("filepath", uploadedFile);
	fileName.value = uploadedFile.name;
	console.log(fileName.value);
};

const removeUploadedFile = () => {
	fileName.value = "";
	formData.delete("filepath");
};

const handleCancel = () => {
	emit("cancel", props.order - 1, props.category);
};

const handleCreate = () => {
	formData.append("name", name.value);
	formData.append("category", props.category);
	if (props.category === "就學經歷" || props.category === "教學經歷")
		formData.append("school", schoolName.value);

	if (props.category === "考試與檢定分數")
		formData.append("score", score.value);
	emit("create", formData);
};
</script>

<style setup lang="css">
.admissionManagerEditState {
	margin-top: 24px;
	border: 1px solid #874b52;
	border-radius: 8px;
	display: flex;
}

.admissionApplicantEditState {
	margin-top: 24px;
	border: 1px solid #736028;
	border-radius: 8px;
	display: flex;
}
</style>
