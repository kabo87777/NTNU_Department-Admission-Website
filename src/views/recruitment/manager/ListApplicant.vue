<template>
	<Layout Admin noMargin>
		<template #Header>
			{{ $t("申請者帳號設定") }}
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
							<!-- Edit button -->
							<NButton
								Admin
								icon="pi pi-pencil"
								class="p-2"
								@click="editModal.open(slotProps.data)"
							/>
							<!-- Delete button -->
							<NButton
								Danger
								icon="pi pi-times"
								class="p-2"
								@click="actions.delete(slotProps.data.id)"
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
	<Dialog
		v-model:visible="editModal.visible"
		:modal="true"
		:draggable="false"
		:closable="false"
		class="min-w-120"
	>
		<template #header>
			<div text="xl title">
				{{ $t("編輯申請者帳號") }}
			</div>
		</template>

		<template #default>
			<div flex="~ col gap-6" w="full">
				<div space="y-1">
					<div text="body">{{ $t("帳號 ID") }}</div>
					<div>{{ editModal.data.id }}</div>
				</div>
				<div space="y-1">
					<div text="body">{{ $t("姓名") }}</div>
					<InputText
						type="text"
						class="w-full mt-1"
						v-model:model-value="editModal.data.name"
						disabled="true"
					/>
				</div>
				<div space="y-1">
					<div text="body">{{ $t("電子信箱") }}</div>
					<InputText
						type="email"
						class="w-full mt-1"
						v-model:model-value="editModal.data.email"
						:disabled="true"
					/>
				</div>
				<div space="y-1">
					<div text="body">{{ $t("密碼") }}</div>
					<Password
						class="w-full"
						v-model="editModal.data.password"
						:feedback="false"
						:disabled="
							editModal.data.allow_password_change === false
						"
						:toggle-mask="
							editModal.data.allow_password_change === true
						"
						@focus.once="editModal.data.password = ''"
						input-class="w-full"
					/>
				</div>
			</div>
		</template>

		<template #footer>
			<div class="flex justify-center gap-6">
				<NButton
					Success
					icon="pi pi-check"
					class="h-11 min-w-36"
					@click="editModal.submit"
					>{{ $t("儲存") }}
				</NButton>
				<NButton
					icon="pi pi-times"
					class="h-11 min-w-36"
					@click="editModal.visible = false"
					>{{ $t("取消") }}
				</NButton>
			</div>
		</template>
	</Dialog>
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

interface modalFields {
	id: number;
	name: string;
	email: string;
	password: string;
	allow_password_change: boolean;
}

store.$subscribe((mutation, state) => {
	if (state.program) {
		console.log(state.program.category + state.program.name);
	}
	refetch();
});

class Modal {
	visible: boolean;
	data: modalFields;

	constructor() {
		this.visible = false;
		this.data = {
			id: -1,
			name: "",
			email: "",
			password: "",
			allow_password_change: false,
		};
	}

	show() {
		this.visible = true;
	}

	open(applicantData: RecruitmentAdminApplicantsListResponse) {
		this.data = (({
			id,
			name,
			email,
			allow_password_change,
		}: RecruitmentAdminApplicantsListResponse) => ({
			id,
			name,
			email,
			allow_password_change,
			// This is used to show dots as visual hint for user
			// After user click the password input box, the value will be cleared
			password: "JUST A PLACEHOLDER",
		}))(applicantData);
		this.show();
	}
	close() {
		this.visible = false;
	}

	submit() {
		this.close();
	}
}

const editModal = ref(new Modal());

const actions = {
	edit: editModal.value.open,
	delete: (id: number) => {
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
	},
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
