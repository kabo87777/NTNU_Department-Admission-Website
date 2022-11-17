<template>
	<h1 class="text-4xl font-bold">{{ $t("申請者帳號設定") }}</h1>
	<Button @click="printProgramID">Program ID</Button>
	<Divider />
	<DataTable :value="tableData" :loading="isLoading">
		<template #empty>
			<h2>{{ $t("尚無申請者帳號") }}</h2>
		</template>

		<Column field="id">
			<template #header>{{ $t("申請者帳號") }}</template>
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
				<Button
					icon="pi pi-pencil"
					class="p-button-outlined p-button-success"
					@click="openModal(slotProps.data)"
				></Button>
			</template>
		</Column>
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
					></InputText>
				</div>

				<div class="mt-3">
					<label for="password" class="block font-black">{{
						$t("密碼")
					}}</label>
					<!--  -->
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
import { useQuery } from "@tanstack/vue-query";
import { InvalidSessionError } from "@/api/error";
import { router } from "@/router";
import { AdmissionAdminApplicantsListResponse } from "@/api/admission/admin/types";
import { useGlobalStore } from "@/stores/globalStore";

const store = useGlobalStore();
const adminAuth = useAdmissionAdminAuthStore();
const api = new AdmissionAdminAPI(adminAuth);
const tableData = ref<AdmissionAdminApplicantsListResponse[]>();

// NOTE: Copy and modified from SideBar.vue
const {
	isLoading,
	data: applicants,
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
	}
);

interface modalForm {
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
});

const modalVisible = ref(false);
const modalData = ref<modalForm>({} as modalForm);

const openModal = (applicantData: AdmissionAdminApplicantsListResponse) => {
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
		password: "JUST A PLACEHOLDER",
		allow_password_change,
	}))(applicantData);

	modalData.value=formData
	modalVisible.value = true;
};

const saveChange = () => {
	if (!tableData.value) return;
	// TODO: send patch request to backend
	modalVisible.value = false;
};

const printProgramID = () => console.debug("Program ID: " + store.program?.id);
</script>
