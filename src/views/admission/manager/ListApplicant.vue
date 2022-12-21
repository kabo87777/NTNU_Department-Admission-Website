<template>
	<h1 class="text-4xl font-bold">{{ $t("申請者帳號設定") }}</h1>
	<Divider />

	<h3 class="block font-black text-lg">匯入申請者帳號</h3>

	<TransitionGroup name="p-message" tag="div">
		<Message :closable="false" severity="warn" v-if="isImporting">{{
			$t("正在處理中，請勿離開此頁面")
		}}</Message>
	</TransitionGroup>
	<FileUpload
		mode="advanced"
		:choose-label="$t('選擇檔案')"
		accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
		:custom-upload="true"
		@uploader="importApplicantCallback"
	>
		<template #header="{ files, chooseCallback, uploadCallback }">
			<div class="flex gap-x-2">
				<Button
					icon="pi pi-file"
					:label="files.length == 0 ? $t('選擇檔案') : $t('重新選擇')"
					@click="chooseCallback"
				/>
				<Button
					icon="pi pi-cloud-upload"
					:label="$t('上傳')"
					@click="uploadCallback"
					:disabled="files.length == 0"
				/>
			</div>
		</template>
		<template #content="{ files }">
			<div
				v-for="file of files"
				:key="file.name + file.type + file.size + file.lastModified"
				class="flex items-center"
			>
				<img
					src="/assets/xlsx.png"
					alt=""
					class="max-h-16 select-none pointer-events-none filter drop-shadow-xl"
				/>
				<div class="ml-4">
					{{ file.name }}
				</div>
			</div>
		</template>
		<template #empty>
			<div>{{ $t("請上傳檔案") }}</div>
		</template>
	</FileUpload>

	<DataTable :value="tableData" :loading="isTableLoading">
		<template #empty>
			<h2>{{ $t("尚無申請者帳號") }}</h2>
		</template>

		<Column field="id">
			<template #header>{{ $t("ID") }}</template>
		</Column>

		<Column field="name">
			<template #header>{{ $t("姓名") }}</template>
		</Column>

		<Column field="email">
			<template #header>{{ $t("電子信箱") }}</template>
		</Column>

		<Column>
			<template #header>{{ $t("操作") }}</template>
			<template #body="slotProps">
				<span class="flex gap-x-3">
					<!-- Edit button -->
					<Button
						icon="pi pi-pencil"
						class="p-button-outlined p-button-success"
						@click="openModal(slotProps.data)"
					></Button>
					<!-- Delete button -->
					<Button
						icon="pi pi-times"
						class="p-button-outlined p-button-danger"
						@click="confirmDeleteAccount(slotProps.data.id)"
					/>
				</span>
			</template>
		</Column>

		<template #footer>
			<p>{{ $t("applicant_table_items_count", getTableItemQty) }}</p>
		</template>
	</DataTable>

	<Dialog v-model:visible="modalVisible" :modal="true">
		<template #header>
			<h3 class="font-extrabold text-lg">
				{{ $t("編輯申請者帳號") }}
			</h3>
		</template>

		<template #default>
			<div class="w-md">
				<label for="" class="block font-black">{{
					$t("帳號 ID")
				}}</label>
				<div>{{ modalData.id }}</div>

				<div class="mt-3">
					<label for="" class="block font-black">{{
						$t("姓名")
					}}</label>
					<InputText
						type="text"
						class="w-full mt-1"
						v-model:model-value="modalData.name"
						disabled="true"
					></InputText>
				</div>

				<div class="mt-3">
					<label for="" class="block font-black">{{
						$t("電子信箱")
					}}</label>
					<InputText
						type="email"
						class="w-full mt-1"
						v-model:model-value="modalData.email"
						:disabled="true"
					></InputText>
				</div>

				<div class="mt-3">
					<label for="password" class="block font-black">{{
						$t("密碼")
					}}</label>

					<Password
						class="mt-1 w-full"
						v-model="modalData.password"
						:feedback="false"
						:disabled="modalData.allow_password_change === false"
						:toggle-mask="modalData.allow_password_change === true"
						@focus.once="modalData.password = ''"
						input-class="w-full"
					/>
				</div>
			</div>
		</template>

		<template #footer>
			<div class="flex justify-center">
				<div class="space-x-2">
					<Button
						icon="pi pi-check"
						:label="$t('儲存')"
						class="p-button-outlined p-button-success"
						@click="saveChange"
					></Button>
					<Button
						icon="pi pi-times"
						:label="$t('取消')"
						class="p-button-outlined p-button-danger"
						@click="modalVisible = false"
					></Button>
				</div>
			</div>
		</template>
	</Dialog>
	<ConfirmDialog />
</template>

<script setup lang="ts">
import Button from "primevue/button";
import Checkbox from "primevue/checkbox";
import Column from "primevue/column";
import DataTable from "primevue/datatable";
import Dialog from "primevue/dialog";
import Divider from "primevue/divider";
import InputText from "primevue/inputtext";
import Password from "primevue/password";

import { computed, Ref, ref, toRaw, watch, watchEffect } from "vue";
import {
	useAdmissionAdminAuthStore,
	useAdmissionReviewerAuthStore,
} from "@/stores/universalAuth";
import { AdmissionAdminAPI } from "@/api/admission/admin/api";
import { useMutation, useQuery } from "@tanstack/vue-query";
import { InvalidSessionError } from "@/api/error";
import { router } from "@/router";
import { AdmissionAdminApplicantsListResponse } from "@/api/admission/admin/types";
import { useGlobalStore } from "@/stores/globalStore";
import FileUpload, { FileUploadBeforeUploadEvent } from "primevue/fileupload";
import { FileUploadUploaderEvent } from "primevue/fileupload";
import ProgressBar from "primevue/progressbar";
import { useToast } from "primevue/usetoast";
import { useI18n } from "vue-i18n";
import ConfirmDialog from "primevue/confirmdialog";
import { useConfirm } from "primevue/useconfirm";
import Message from "primevue/message";
const confirm = useConfirm();
const globalStore = useGlobalStore();
const adminAuth = useAdmissionAdminAuthStore();
const api = new AdmissionAdminAPI(adminAuth);
const tableData = ref<AdmissionAdminApplicantsListResponse[]>(
	[] as AdmissionAdminApplicantsListResponse[]
);
const { t: $t } = useI18n();
const toast = useToast();
// NOTE: Copy and modified from SideBar.vue
const {
	isLoading,
	isRefetching,
	data: applicants,
	refetch,
} = useQuery(
	["applicantList"],
	async () => {
		if (globalStore.program === undefined)
			throw new Error("undefined program");

		return await api.getApplicantList(globalStore.program.id);
	},
	{
		onSuccess: (data) => {
			if (!data) {
				throw new Error("Error. Gotten undefined applicant list.");
			}
			console.log("Loaded applicant list");
			tableData.value = data;
			isImporting.value = false;
		},
		onSettled: () => {
			isImporting.value = false;
		},
	}
);

const isImporting = ref(false);
const isTableLoading = computed(() => isLoading.value || isImporting.value);

interface modalForm {
	id: number;
	name: string;
	email: string;
	password: string;
	allow_password_change: boolean;
}

globalStore.$subscribe((mutation, state) => {
	if (state.program) {
		console.log(state.program.category + state.program.name);
	}
	refetch();
});

const modalVisible = ref(false);
const modalData = ref<modalForm>({} as modalForm);

const openModal = (applicantData: AdmissionAdminApplicantsListResponse) => {
	console.log(applicantData);
	// Pick properties we need for form
	const formData: modalForm = (({
		id,
		name,
		email,
		allow_password_change,
	}: AdmissionAdminApplicantsListResponse) => ({
		id,
		name,
		email,
		// This is used to show dots as visual hint for user
		// After user click the password input box, the value will be cleared
		password: "JUST A PLACEHOLDER",
		allow_password_change,
	}))(applicantData);

	modalData.value = formData;
	modalVisible.value = true;
};

const saveChange = () => {
	if (!tableData.value) return;
	// TODO: send patch request to backend
	api.updateApplicantData(modalData.value.id, modalData.value);
	modalVisible.value = false;
};

const getTableItemQty = computed(() => {
	return tableData.value ? tableData.value.length : 0;
});

const { mutate: uploadApplicantImport } = useMutation({
	mutationFn: (data: FormData) => {
		if (!globalStore.program) throw new Error("Invalid state: program");
		isImporting.value = true;
		return api.postApplicantsXlsx(globalStore.program.id, data);
	},
	onSuccess: () => {
		// Refetch applicnt list on successful import
		refetch();
		toast.add({
			severity: "success",
			life: 3000,
			summary: $t("操作成功"),
			detail: $t("成功匯入申請者"),
		});
	},
	onError: () => {
		toast.add({
			severity: "error",
			life: 3000,
			summary: $t("操作失敗"),
			detail: $t("上傳 XLSX 檔時發生錯誤"),
		});
	},
	onSettled: () => {
		isImporting.value = false;
	},
});

const { mutate: deleteApplicant } = useMutation({
	mutationFn: (id: number) => {
		return api.deleteApplicant(id);
	},
	onMutate: () => {
		isImporting.value = true;
	},
	onSuccess: () => {
		refetch().then(() => {
			isImporting.value = false;
			toast.add({
				severity: "success",
				life: 3000,
				summary: $t("操作成功"),
				detail: $t("成功刪除帳號"),
			});
		});
	},
	onError: () => {
		toast.add({
			severity: "error",
			summary: $t("操作失敗"),
			detail: $t("刪除使用者時發生錯誤"),
		});
	},
});

const importApplicantCallback = (event: FileUploadUploaderEvent) => {
	const file = Array.isArray(event.files) ? event.files[0] : event.files;
	const formdata = new FormData();
	formdata.append("file", file);
	formdata.append(
		"redirect_url",
		"http://127.0.0.1:5173/admission/applicant/setupaccount"
	);
	uploadApplicantImport(formdata);
};

const confirmDeleteAccount = (id: number) => {
	confirm.require({
		header: $t("是否要刪除此帳號？"),
		message: $t("此動作不可回復，請謹慎操作"),
		icon: "pi pi-exclamation-triangle",
		accept: () => {
			deleteApplicant(id);
		},
		acceptLabel: $t("確認"),
		rejectLabel: $t("取消"),
	});
};
</script>
