<template>
	<div>
		<h1 class="text-4xl font-bold">{{ $t("申請者帳號設定") }}</h1>
		<Divider />
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
							@click="editModal.open(slotProps.data)"
						></Button>
						<!-- Delete button -->
						<Button
							icon="pi pi-times"
							class="p-button-outlined p-button-danger"
							@click="actions.delete(slotProps.data.id)"
						/>
					</span>
				</template>
			</Column>

			<template #footer>
				<p>{{ $t("applicant_table_items_count", getTableItemQty) }}</p>
			</template>
		</DataTable>

		<Dialog v-model:visible="editModal.visible" :modal="true">
			<template #header>
				<h3 class="font-black text-xl">
					{{ $t("編輯申請者帳號") }}
				</h3>
			</template>

			<template #default>
				<div class="w-md grid gap-y-2">
					<label for="" class="block font-bold">{{
						$t("帳號 ID")
					}}</label>
					<div>{{ editModal.data.id }}</div>

					<div class="mt-3">
						<label for="" class="block font-bold">{{
							$t("姓名")
						}}</label>
						<InputText
							type="text"
							class="w-full mt-1"
							v-model:model-value="editModal.data.name"
							disabled="true"
						/>
					</div>

					<div class="mt-3">
						<label for="" class="block font-bold">{{
							$t("電子信箱")
						}}</label>
						<InputText
							type="email"
							class="w-full mt-1"
							v-model:model-value="editModal.data.email"
							:disabled="true"
						/>
					</div>

					<div class="mt-3">
						<label for="password" class="block font-bold">{{
							$t("密碼")
						}}</label>

						<Password
							class="mt-1 w-full"
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
				<div class="flex justify-center">
					<div class="space-x-2">
						<Button
							icon="pi pi-check"
							:label="$t('儲存')"
							class="p-button-outlined p-button-success"
							@click="editModal.submit"
						></Button>
						<Button
							icon="pi pi-times"
							:label="$t('取消')"
							class="p-button-outlined p-button-danger"
							@click="editModal.visible = false"
						></Button>
					</div>
				</div>
			</template>
		</Dialog>
	</div>

	<ConfirmDialog></ConfirmDialog>
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
import { useRecruitmentAdminAuthStore } from "@/stores/universalAuth";
import { RecruitmentAdminAPI } from "@/api/recruitment/admin/api";
import { useMutation, useQuery } from "@tanstack/vue-query";
import { InvalidSessionError } from "@/api/error";
import { router } from "@/router";
import { RecruitmentAdminApplicantsListResponse } from "@/api/recruitment/admin/types";
import { useGlobalStore } from "@/stores/globalStore";
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
	["applicantList"],
	async () => {
		try {
			if (store.program)
				return await api.getApplicantList(store.program.id);
		} catch (e: any) {
			if (e instanceof InvalidSessionError) {
				// FIXME: show session expiry notification??
				// Why are we even here in the first place?
				// MainContainer should have checked already.
				console.error(
					"Session has already expired while querying applicant list"
				);
				router.push("/");
				return;
			}
			throw e;
		}
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
