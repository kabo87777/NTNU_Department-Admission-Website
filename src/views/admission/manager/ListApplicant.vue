<template>
	<Layout Admin>
		<template #Header>
			{{ $t("申請者帳號設定") }}
		</template>
		<template #Body>
			<TransitionGroup name="p-message" tag="div">
				<Message :closable="false" severity="warn" v-if="isImporting">{{
					$t("正在處理中，請勿離開此頁面")
				}}</Message>
			</TransitionGroup>
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
							<!-- Delete button -->
							<NButton
								Danger
								icon="pi pi-trash"
								@click="confirmDeleteAccount(slotProps.data.id)"
							/>
						</span>
					</template>
				</Column>

				<template #footer>
					<p>
						{{ $t("applicant_table_items_count", getTableItemQty) }}
					</p>
				</template>
			</DataTable>
			<h3 class="block font-black text-xl">匯入申請者帳號</h3>
			<FileUpload
				mode="advanced"
				:choose-label="$t('選擇檔案')"
				accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
				:custom-upload="true"
				@uploader="importApplicantCallback"
			>
				<template #header="{ files, chooseCallback, uploadCallback }">
					<div class="flex gap-x-2">
						<NButton
							Admin
							icon="pi pi-file"
							:label="
								files.length == 0
									? $t('選擇檔案')
									: $t('重新選擇')
							"
							@click="chooseCallback"
							>{{
								files.length == 0
									? $t("選擇檔案")
									: $t("重新選擇")
							}}</NButton
						>
						<NButton
							Success
							icon="pi pi-cloud-upload"
							:label="$t('上傳')"
							@click="uploadCallback"
							:disabled="files.length == 0"
							>{{ $t("上傳") }}</NButton
						>
					</div>
				</template>
				<template #content="{ files }">
					<div
						v-for="file of files"
						:key="
							file.name +
							file.type +
							file.size +
							file.lastModified
						"
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
		</template>
	</Layout>
	<ConfirmDialog />
</template>

<script setup lang="ts">
import NButton from "@/styles/CustomButton.vue";
import Layout from "@/components/Layout.vue";
import Column from "primevue/column";
import DataTable from "primevue/datatable";

import { computed, Ref, ref, toRaw, watch, watchEffect } from "vue";
import { useAdmissionAdminAuthStore } from "@/stores/universalAuth";
import { AdmissionAdminAPI } from "@/api/admission/admin/api";
import { useMutation, useQuery } from "@tanstack/vue-query";
import { router } from "@/router";
import { AdmissionAdminApplicantsListResponse } from "@/api/admission/admin/types";
import { useGlobalStore } from "@/stores/globalStore";
import FileUpload, { FileUploadBeforeUploadEvent } from "primevue/fileupload";
import { FileUploadUploaderEvent } from "primevue/fileupload";
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

globalStore.$subscribe((mutation, state) => {
	if (state.program) {
		console.log(state.program.category + state.program.name);
	}
	refetch();
});

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
