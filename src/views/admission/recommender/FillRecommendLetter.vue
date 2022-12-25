<template>
	<div>
		<div style="position: fixed; top: 0; width: 100%; z-index: 10">
			<NavBar :showSwitchLang="false" />
		</div>
		<div style="margin-top: 60px; padding: 60px 20%">
			<div class="text-28px font-bold">推薦人您好 Hello Recommender</div>
			<div class="bigRedDivider"></div>
			<div class="contentContainer">
				<div>
					<div>請上傳簽名檔</div>
					<div>Please upload your signature</div>
				</div>
				<div
					v-if="fileName === ''"
					class="mt-16px removeBadge"
					style="width: 85%"
				>
					<FileUpload
						:customUpload="true"
						@uploader="handleUpload"
						:maxFileSize="5000000"
						:fileLimit="1"
						accept=".jpg"
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
						<template #content>
							<!-- <div v-if="files.length">
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
											<div>
												{{ formatSize(file.size) }}
											</div>
										</div>
									</div>
								</div>
							</div> -->
						</template>
						<template #empty>
							<div class="flex">
								<div>※</div>
								<div>
									<div>僅接受 .jpg 檔</div>
									<div>Only .jpg file is accepted</div>
								</div>
							</div>
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
			</div>
			<div class="contentContainer">
				<div>
					<div>請輸入推薦信内容</div>
					<div>Please fill in recommend letter below</div>
				</div>
				<Textarea
					style="
						width: 100%;
						max-width: 100%;
						height: 300px;
						margin-top: 4px;
						border-radius: 12px;
					"
					v-model="content"
				/>
			</div>
			<div class="bigRedDivider" style="margin-top: 24px"></div>
			<div style="margin-top: 16px; margin-left: 100%">
				<Dialog
					v-model:visible="isModalVisible"
					style="width: 600px"
					:closable="false"
					:draggable="false"
					:modal="true"
				>
					<template #header>
						<div class="font-bold text-[24px]">
							送出推薦信 Send Recommend Letter
						</div>
					</template>
					<template #default>
						<div class="flex">
							<div class="mt-2px">
								<i
									class="pi pi-question-circle"
									style="font-size: 24px; margin-top: 8px"
								/>
							</div>
							<div class="ml-8px">
								<div>確認送出?</div>
								<div>Are you sure to send?</div>
							</div>
						</div>
					</template>
					<template #footer>
						<Button
							class="p-button-outlined p-button-secondary"
							style="
								border: 2px solid #a18b4a;
								color: #736028;
								height: 40px;
								width: 40px;
							"
							icon="pi pi-times"
							iconClass="text-[#736028]"
							@click="isModalVisible = false"
						/>
						<Button
							class="p-button-outlined p-button-secondary"
							style="
								color: #53565a;
								border: 2px solid #bcd19b;
								margin-left: 16px;
								height: 40px;
								width: 40px;
							"
							icon="pi pi-check"
							iconClass="text-[#53565A]"
							:loading="isLoading.confirm"
							@click="handleConfirm"
						/>
					</template>
				</Dialog>
				<div
					style="
						display: flex;
						transform: translateX(-100%);
						width: fit-content;
					"
				>
					<Button
						class="p-button-outlined p-button-secondary"
						style="
							border: 2px solid #bcd19b;
							height: 44px;
							width: max-content;
							background-color: #f0dfad;
							border: 2px solid #a18b4a;
							color: #736028;
						"
						icon="pi pi-save"
						iconClass="text-[#53565A]"
						label="儲存 Save"
						:loading="isLoading.save"
						@click="handleSave"
					/>
					<Button
						class="p-button-outlined p-button-secondary"
						style="
							border: 2px solid #bcd19b;
							height: 44px;
							width: max-content;
							background-color: #d3e8b3;
							margin-left: 16px;
						"
						icon="pi pi-check-circle"
						iconClass="text-[#53565A]"
						label="確認 Confirm"
						@click="isModalVisible = true"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive, toRaw, watch } from "vue";
import type { APIGenericResponse } from "@/api/types";
import { RecommenderRecommendLetterResponse } from "@/api/admission/recommender/types";
import { AdmissionRecommenderAPI } from "@/api/admission/recommender/api";
import { useAdmissionRecommenderAuthStore } from "@/stores/universalAuth";
import { useQuery } from "@tanstack/vue-query";
import { useToast } from "primevue/usetoast";
import { useI18n } from "vue-i18n";
import NavBar from "@/components/NavBar.vue";
import Textarea from "primevue/textarea";
import Button from "primevue/button";
import FileUpload, { FileUploadUploaderEvent } from "primevue/fileupload";
import Dialog from "primevue/dialog";
import "@/styles/customize.css";

const recommenderAuth = useAdmissionRecommenderAuthStore();
const api = new AdmissionRecommenderAPI(recommenderAuth);

const url = window.location;
const token = new URLSearchParams(url.search).get("token");

const formData = new FormData();
const fileName = ref("");
const content = ref("");
const isLoading = reactive({
	confirm: false,
	save: false,
	fetch: false,
});
const isModalVisible = ref(false);

const { t } = useI18n();
const toast = useToast();

let fetchResponse = reactive({
	success: false,
	message: "" as string | [],
});

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

const sliceFile = (fileUrl: string) => {
	if (fileUrl !== null) {
		const str = decodeURI(fileUrl);
		const index = str.lastIndexOf("/");
		const file = str.slice(index + 1);
		return file;
	}
};

const handleUpload = (event: FileUploadUploaderEvent) => {
	const uploadedFile = Array.isArray(event.files)
		? event.files[0]
		: event.files;
	formData.append("filepath", uploadedFile);
	fileName.value = uploadedFile.name;
};

const removeUploadedFile = () => {
	fileName.value = "";
	formData.delete("filepath");
};

const handleSave = async () => {
	isLoading.save = true;

	formData.append("content", content.value);
	formData.append("token", token as string);

	const response: APIGenericResponse =
		await api.recommenderSaveRecommendLetter(formData);

	if (response.status !== undefined && response.message !== undefined) {
		fetchResponse.success =
			toRaw(response.status) === "success" ? true : false;
		fetchResponse.message = toRaw(response.message);
	}

	isLoading.save = false;

	if (fetchResponse.success) {
		toast.add({
			severity: "success",
			summary: "Success",
			detail: fetchResponse.message,
			life: 3000,
		});
	} else {
		toast.add({
			severity: "error",
			summary: "Error",
			detail: fetchResponse.message,
			life: 5000,
		});
	}

	isLoading.fetch = true;
};

const handleConfirm = async () => {
	isLoading.confirm = true;

	const response: APIGenericResponse =
		await api.recommenderConfirmRecommendLetter({
			token: token,
		});

	if (response.status !== undefined && response.message !== undefined) {
		fetchResponse.success =
			toRaw(response.status) === "success" ? true : false;
		fetchResponse.message = toRaw(response.message);
	}

	isLoading.confirm = false;
	isModalVisible.value = false;

	if (fetchResponse.success) {
		toast.add({
			severity: "success",
			summary: "Success",
			detail: fetchResponse.message,
			life: 3000,
		});
	} else {
		toast.add({
			severity: "error",
			summary: "Error",
			detail: fetchResponse.message,
			life: 5000,
		});
	}

	isLoading.fetch = true;
};

useQuery(
	["recommenderGetLetter"],
	async () => {
		return await api.recommenderGetRecommendLetter({
			params: {
				token: token,
			},
		});
	},
	{
		onSuccess: (response: APIGenericResponse) => {
			const data: RecommenderRecommendLetterResponse = response.data;
			if (data.filepath.url !== null)
				fileName.value = sliceFile(data.filepath.url) as string;
			content.value = data.content;
		},
	}
);

watch(
	() => isLoading.fetch,
	async () => {
		const { data }: APIGenericResponse =
			await api.recommenderGetRecommendLetter({
				params: {
					token: token,
				},
			});

		isLoading.fetch = false;

		if (data.filepath.url !== null)
			fileName.value = sliceFile(data.filepath.url) as string;
		content.value = data.content;
	}
);
</script>

<style setup lang="scss">
.contentContainer {
	margin: auto;
	margin-top: 20px;
	padding: 24px 32px;
	font-size: 18px;
	font-weight: 600;
	border: 3px dashed rgb(174, 174, 174);
	border-radius: 16px;
	background-color: rgb(244, 244, 244);
}
.removeBadge {
	.p-fileupload-file-badge {
		display: none;
	}
}
</style>
