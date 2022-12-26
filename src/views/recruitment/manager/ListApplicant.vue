<template>
	<Layout Admin noMargin>
		<template #Header>
			{{ $t("申請帳號設置") }}
		</template>
		<template #Body>
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
						<span class="flex gap-4">
							<!-- Delete button -->
							<NButton
								Danger
								icon="pi pi-trash"
								class="p-2"
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
		</template>
	</Layout>
	<ConfirmDialog :draggable="false" />
</template>

<script setup lang="ts">
import Button from "primevue/button";
import NButton from "@/styles/CustomButton.vue";
import Layout from "@/components/Layout.vue";
import Column from "primevue/column";
import DataTable from "primevue/datatable";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import { computed, Ref, ref, toRaw, watch, watchEffect } from "vue";
import { useRecruitmentAdminAuthStore } from "@/stores/universalAuth";
import { RecruitmentAdminAPI } from "@/api/recruitment/admin/api";
import { useMutation, useQuery } from "@tanstack/vue-query";
import { InvalidSessionError } from "@/api/error";
import { router } from "@/router";
import { RecruitmentAdminApplicantsListResponse } from "@/api/recruitment/admin/types";
import { useGlobalStore } from "@/stores/RecruitmentAdminStore";
import ConfirmDialog from "primevue/confirmdialog";
import { useConfirm } from "primevue/useconfirm";
import { useI18n } from "vue-i18n";
import { useToast } from "primevue/usetoast";

const { t: $t } = useI18n();
const store = useGlobalStore();
const adminAuth = useRecruitmentAdminAuthStore();
const api = new RecruitmentAdminAPI(adminAuth);
const tableData = ref<RecruitmentAdminApplicantsListResponse[]>(
	[] as RecruitmentAdminApplicantsListResponse[]
);

const toast = useToast();
const confirm = useConfirm();

// NOTE: Copy and modified from SideBar.vue
const {
	isLoading,
	isRefetching,
	data: applicants,
	refetch,
} = useQuery(
	["recruitmentApplicantList"],
	async () => {
		if (!store.program)
			throw new Error("recruitmentApplicantList: no program selected");

		return await api.getApplicantList(store.program.id);
	},
	{
		onSuccess: (data) => {
			if (!data) {
				throw new Error("Error. Gotten undefined applicant list.");
			}
			console.log("Loaded applicant list");
			tableData.value = data;
		},
		onSettled: () => {
			isProcessing.value = false;
		},
	}
);

const isProcessing = ref(false);
const isTableLoading = computed(() => isLoading.value || isProcessing.value);

store.$subscribe((mutation, state) => {
	if (state.program) {
		console.log(state.program.category + state.program.name);
	}
	refetch();
});

const confirmDeleteAccount = (id: number) => {
	console.log("Confirm");
	confirm.require({
		message: $t("此動作無法回復"),
		header: $t("是否要刪除此帳號？"),
		icon: "pi pi-exclamation-triangle",
		acceptLabel: $t("確認"),
		rejectLabel: $t("取消"),
		accept: () => {
			deleteApplicantAPI(id);
		},
	});
};

const getTableItemQty = computed(() => {
	return tableData.value ? tableData.value.length : 0;
});

const { mutate: deleteApplicantAPI } = useMutation({
	mutationFn: (id: number) => {
		isProcessing.value = true;
		return api.deleteApplicant(id);
	},
	onSuccess: () => {
		refetch();
	},
	onError: () => {
		console.log("Error");
		// TODO: Show error dialog
		toast.add({
			severity: "error",
			summary: $t("刪除帳號時發生了未知錯誤"),
			detail: $t(""),
			life: 2000,
		});
	},
	onSettled: () => {
		// isProcessing.value=false
	},
});
</script>
