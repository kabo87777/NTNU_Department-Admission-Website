<template>
	<Layout Admin>
		<template #Header>{{ $t("管理審查者") }}</template>
		<!-- <Button @click="getRelatedPrograms">Button</Button> -->
		<template #Body>
			<DataTable :value="tableData" :loading="getLoadingStatus">
				<template #empty>
					<h2>{{ $t("尚無審查者帳號") }}</h2>
				</template>

				<Column field="id">
					<template #header>{{ $t("審查者帳號") }}</template>
				</Column>

				<Column field="name">
					<template #header>{{ $t("姓名") }}</template>
				</Column>

				<Column field="email">
					<template #header>{{ $t("電子信箱") }}</template>
				</Column>

				<Column>
					<template #header>{{ $t("操作") }}</template>
					<template #body="slotProp">
						<div class="flex gap-4">
							<!-- Disable user button -->
							<NButton
								Danger
								icon="pi pi-ban"
								class="p-button-outlined p-button-warning"
								@click="confirmDisableReviewer(slotProp.data)"
								v-tooltip="$t('停用帳號')"
								v-if="toRaw(slotProp.data).isDisabled === false"
							/>
							<!-- Activate user button -->
							<NButton
								Success
								icon="pi pi-chevron-circle-up"
								class="p-button-outlined"
								@click="confirmActivateReviewer(slotProp.data)"
								v-tooltip="$t('啟用帳號')"
								v-else
							/>
						</div>
					</template>
				</Column>
			</DataTable>
		</template>
		<template #Footer>
			<div flex="~" justify="center" gap="4">
				<NButton
					Admin
					class="h-11 min-w-36"
					icon="pi pi-user-plus"
					@click="addReviewerModalVisible = true"
				>
					{{ $t("建立帳號") }}
				</NButton>
			</div>
		</template>
	</Layout>

	<AddReviewerDialog
		v-model:visible="addReviewerModalVisible"
		@success="onSuccessCreateAccount"
	/>
	<ConfirmDialog :draggable="false" />
</template>

<script setup lang="ts">
import NButton from "@/styles/CustomButton.vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { computed, ref, toRaw } from "vue";
import type { Ref } from "vue";
import { useI18n } from "vue-i18n";
import { useMutation, useQuery } from "@tanstack/vue-query";
import { useRecruitmentAdminAuthStore } from "@/stores/universalAuth";
import { RecruitmentAdminAPI } from "@/api/recruitment/admin/api";
import { useGlobalStore } from "@/stores/globalStore";
import { RecruitmentAdminReviewersListResponse } from "@/api/recruitment/admin/types";
import ConfirmDialog from "primevue/confirmdialog";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import Tooltip from "primevue/tooltip";
import AddReviewerDialog from "@/components/RecAddReviewerDialog.vue";

const { t: $t } = useI18n();

const adminAuth = useRecruitmentAdminAuthStore();

const store = useGlobalStore();
store.$subscribe((mutation, state) => {
	// Refetch table when selecting other program
	// console.log("Refetch reviewer list");
	// refetch();
});
const api = new RecruitmentAdminAPI(adminAuth);
const tableData = ref<RecruitmentAdminReviewersListResponse[]>(
	[] as RecruitmentAdminReviewersListResponse[]
);

const getLoadingStatus = computed(() => {
	return isLoading.value || isProcessing.value;
});

const {
	data: reviewers,
	refetch,
	isLoading,
} = useQuery(
	["reviewerList"],
	async () => {
		return await api.getReviewerList();
	},
	{
		onSuccess: (data) => {
			if (typeof data === "undefined") {
				throw new Error("Received undefined reviewer response");
			}
			console.log("Loaded");
			tableData.value = data;
		},
		onSettled: () => (isProcessing.value = false),
	}
);

const addReviewerModalVisible = ref(false);
const onSuccessCreateAccount = () => {
	refetch();
	toast.add({
		severity: "success",
		life: 3000,
		summary: $t("操作成功"),
	});
};

const confirm = useConfirm();
const confirmDisableReviewer = (
	reviewerData: RecruitmentAdminReviewersListResponse
) => {
	console.log(reviewerData);
	const { id } = reviewerData;

	confirm.require({
		header: $t("是否要停用此審查者？"),
		message: $t("別擔心，您可以隨時重新啟用該帳號"),
		icon: "pi pi-question-circle",
		acceptLabel: $t("確認"),
		rejectLabel: $t("取消"),
		accept: () => {
			changeAccountStateAPI({ id: id, action: "disable" });
		},
	});
};

const confirmActivateReviewer = (
	reviewerData: RecruitmentAdminReviewersListResponse
) => {
	const { id } = reviewerData;

	confirm.require({
		header: $t("是否要啟用此審查者？"),
		message: $t("您仍然可以再次停用該帳號"),
		icon: "pi pi-question-circle",
		acceptLabel: $t("確認"),
		rejectLabel: $t("取消"),
		accept: () => {
			changeAccountStateAPI({ id: id, action: "activate" });
		},
	});
};
const isProcessing = ref(false);

const toast = useToast();
const { mutate: changeAccountStateAPI } = useMutation({
	mutationFn: (variables: { id: number; action: "activate" | "disable" }) => {
		const { id, action } = variables;

		return api.changeReviewerAccountState(id, action);
	},
	onSuccess: () => {
		toast.add({
			severity: "success",
			life: 3000,
			summary: $t("操作成功"),
		});
	},
	onError: () => {
		toast.add({
			severity: "error",
			life: 3000,
			summary: $t("操作失敗"),
			detail: $t("發生了未知的錯誤"),
		});
	},
	onSettled: () => {
		refetch();
	},
	onMutate: () => {
		isProcessing.value = true;
	},
});
</script>
