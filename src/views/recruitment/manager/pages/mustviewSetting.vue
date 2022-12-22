<template>
	<h1 class="text-4xl text-bold tracking-widest">{{ $t("必看名單設置") }}</h1>
	<div class="bigRedDivider"></div>
	<div class="text-2xl text-bold tracking-widest mt-5px">{{ hint }}</div>
	<div class="newsCard h-80px">
		{{ message }}
	</div>
	<div class="flex justify-around !h-620px mt-10px">
		<DataTable
			:value="applicantList1"
			responsiveLayout="scroll"
			v-model:selection="selectedApplicant1"
			dataKey="id"
			class="!w-200px"
		>
			<Column selectionMode="multiple" headerStyle="width: 3em"></Column>
			<Column field="name" :header="name"></Column>
		</DataTable>
		<DataTable
			:value="applicantList2"
			responsiveLayout="scroll"
			v-model:selection="selectedApplicant2"
			dataKey="id"
			class="!w-200px"
		>
			<Column selectionMode="multiple" headerStyle="width: 3em"></Column>
			<Column field="name" :header="name"></Column>
		</DataTable>
		<DataTable
			:value="applicantList3"
			responsiveLayout="scroll"
			v-model:selection="selectedApplicant3"
			dataKey="id"
			class="!w-200px"
		>
			<Column selectionMode="multiple" headerStyle="width: 3em"></Column>
			<Column field="name" :header="name"></Column>
		</DataTable>
	</div>
	<div class="bigRedDivider"></div>
	<div class="flex justify-between mt-10px">
		<div class="flex justify-start">
			<div class="text-xl content-center mt-10px">
				{{ $t("審查委員") }}:
			</div>
			<Dropdown
				v-model="selectedReviewer"
				:options="reviewerList"
				optionLabel="name"
				class="!w-150px ml-5px"
			/>
		</div>
		<div class="flex justify-around">
			<NButton
				type="Admin"
				class="w-140px h-44px"
				@click="save"
				icon="pi pi-check"
			>
				<span class="tracking-1px">{{ $t("儲存名單") }}</span>
			</NButton>
			<NButton
				type="Admin"
				class="w-180px h-44px !ml-30px"
				@click="confirmGrading"
				icon="pi pi-times"
			>
				<span class="tracking-1px">{{ $t("刪除所有名單") }}</span>
			</NButton>
		</div>
	</div>
	<ConfirmDialog />
</template>

<script setup lang="ts">
import { ref, onUpdated, computed } from "vue";
import { useToast } from "primevue/usetoast";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Dropdown from "primevue/dropdown";
import NButton from "@/styles/CustomButton.vue";
import { useI18n } from "vue-i18n";
import ConfirmDialog from "primevue/confirmdialog";
import { useConfirm } from "primevue/useconfirm";

import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";

import { RecruitmentAdminAPI } from "@/api/recruitment/admin/api";
import { useRecruitmentAdminAuthStore } from "@/stores/universalAuth";
import { useGlobalStore } from "@/stores/RecruitmentAdminStore";
import { RecruitmentAdminApplicantsListResponse } from "@/api/recruitment/admin/types";
import { RecruitmentAdminReviewersListResponse } from "@/api/recruitment/admin/types";

const queryClient = useQueryClient();
const store = useGlobalStore();
const toast = useToast();
const adminAuth = useRecruitmentAdminAuthStore();

const api = new RecruitmentAdminAPI(adminAuth);
const { t: $t } = useI18n();
const { t } = useI18n();

const selectedApplicant1 = ref();
const selectedApplicant2 = ref();
const selectedApplicant3 = ref();
const selectedReviewer = ref();

const applicantList = ref<RecruitmentAdminApplicantsListResponse[]>([]);
const applicantList1 = ref<RecruitmentAdminApplicantsListResponse[]>([]);
const applicantList2 = ref<RecruitmentAdminApplicantsListResponse[]>([]);
const applicantList3 = ref<RecruitmentAdminApplicantsListResponse[]>([]);
const allSelectedApplicants = ref<number[]>();

interface Relation {
	applicant_id: number;
	reviewer_id: number;
}
const allRelations = ref<Relation[]>([]);
const deleteRelations = ref<Relation[]>([]);
const message = ref<string>("");

const name = computed(() => t("申請人姓名"));
const hint = computed(() => t("若沒勾選，則會設置為選看名單"));

useQuery(
	["RAdminApplicantList"],
	async () => {
		return await api.getApplicantList(store.program!.id!);
	},
	{
		onSuccess: (data) => {
			applicantList1.value = [];
			applicantList2.value = [];
			applicantList3.value = [];
			if (data) {
				applicantList.value = data;
				for (let i = 0; i < data.length; i = i + 3) {
					if (data[i]) {
						applicantList1.value.push(data[i]);
					}
					if (data[i + 1]) {
						applicantList2.value.push(data[i + 1]);
					}
					if (data[i + 2]) {
						applicantList3.value.push(data[i + 2]);
					}
				}
			}
		},
	}
);
const reviewerList = ref<RecruitmentAdminReviewersListResponse[]>([]);
useQuery(
	["RAdminReviewerList"],
	async () => {
		return await api.getReviewerList();
	},
	{
		onSuccess: (data) => {
			reviewerList.value = data;
		},
	}
);

const batchUpdateRelation = useMutation(
	async (relations: any) => {
		for (const relation of relations) {
			try {
				const result = await api.addApplicantToReviewer(
					store.program!.id!,
					relation
				);
			} catch (error) {
				console.log(error);
				break;
			}
		}
	},
	{
		onSuccess: () => {
			toast.add({
				severity: "success",
				summary: "Success",
				detail: "保存成功",
				life: 3000,
			});
			message.value =
				"已將" +
				allSelectedApplicants.value +
				"指派給" +
				selectedReviewer.value.name;
		},
		onError: () => {
			toast.add({
				severity: "error",
				summary: "Error",
				detail: "保存失敗",
				life: 3000,
			});
		},
	}
);

const batchDeleteRelation = useMutation(
	async (relations: any) => {
		for (const relation of relations) {
			try {
				const result = await api.deleteApplicantFromReviewer(
					store.program!.id!,
					relation
				);
			} catch (error) {
				console.log(error);
				break;
			}
		}
	},
	{
		onSuccess: () => {
			toast.add({
				severity: "success",
				summary: "Success",
				detail: "刪除成功",
				life: 3000,
			});
			message.value =
				"已將" + selectedReviewer.value.name + "的所有必看名單刪除";
		},
		onError: () => {
			toast.add({
				severity: "error",
				summary: "Error",
				detail: "刪除失敗",
				life: 3000,
			});
		},
	}
);

store.$subscribe(() => {
	queryClient.invalidateQueries({ queryKey: ["RAdminApplicantList"] });
	queryClient.invalidateQueries({ queryKey: ["RAdminReviewerList"] });
});

function save() {
	allSelectedApplicants.value = [];
	allRelations.value = [];
	if (selectedApplicant1.value) {
		for (let i = 0; i < selectedApplicant1.value.length; i++) {
			allSelectedApplicants.value.push(selectedApplicant1.value[i].name);
			allRelations.value.push({
				applicant_id: selectedApplicant1.value[i].id,
				reviewer_id: selectedReviewer.value.id,
			});
		}
	}
	if (selectedApplicant2.value) {
		for (let i = 0; i < selectedApplicant2.value.length; i++) {
			allSelectedApplicants.value.push(selectedApplicant2.value[i].name);
			allRelations.value.push({
				applicant_id: selectedApplicant2.value[i].id,
				reviewer_id: selectedReviewer.value.id,
			});
		}
	}
	if (selectedApplicant3.value) {
		for (let i = 0; i < selectedApplicant3.value.length; i++) {
			allSelectedApplicants.value.push(selectedApplicant3.value[i].name);
			allRelations.value.push({
				applicant_id: selectedApplicant3.value[i].id,
				reviewer_id: selectedReviewer.value.id,
			});
		}
	}
	if (allRelations.value.length == 0) {
		toast.add({
			severity: "error",
			summary: "Error",
			detail: "請選擇至少一位申請人",
			life: 3000,
		});
		return;
	}
	batchUpdateRelation.mutate(allRelations.value);
}

function deleteRelation() {
	deleteRelations.value = [];
	if (applicantList.value) {
		for (let i = 0; i < applicantList.value.length; i++) {
			deleteRelations.value.push({
				applicant_id: applicantList.value[i].id,
				reviewer_id: selectedReviewer.value.id,
			});
		}
	}
	batchDeleteRelation.mutate(deleteRelations.value);
}

const confirm1 = useConfirm();
const confirmGrading = () => {
	confirm1.require({
		header: $t("是否要刪除此審查委員的所有必看名單？"),
		message: $t("此動作不可回復，請謹慎操作"),
		icon: "pi pi-exclamation-triangle",
		accept: () => {
			deleteRelation();
		},
		acceptLabel: $t("確認"),
		rejectLabel: $t("取消"),
	});
};
</script>

<style setup lang="css">
.newsCard {
	border-radius: 16px;
	border: 2px solid #d4b862;
	padding: 24px;
	background-color: #fcefcb;
	margin-top: 5px;
	font-weight: bold;
	font-size: 18px;
}
</style>
