<template>
	<Layout Admin>
		<template #Header>
			{{ $t("管理審查者") }}
		</template>
		<!-- <h1 class="text-4xl font-bold">{{ $t("管理審查者") }}</h1>
		<Divider></Divider> -->
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

				<!-- <Column field="roles">
					<template #header>{{ $t("身份組") }}</template>
				</Column> -->

				<Column>
					<template #header>{{ $t("操作") }}</template>
					<template #body="slotProp">
						<div class="flex gap-x-1">
							<!-- Disable user button -->
							<Button
								v-if="slotProp.data.isDisabled === false"
								icon="pi pi-ban"
								class="p-button-outlined p-button-warning"
								@click="confirmDisableReviewer(slotProp.data)"
								v-tooltip="$t('停用帳號')"
							/>

							<!-- Activate user button -->
							<Button
								v-else
								icon="pi pi-chevron-circle-up"
								class="p-button-outlined"
								@click="confirmActivateReviewer(slotProp.data)"
								v-tooltip="$t('啟用帳號')"
							/>

							<!-- Assign to program -->
							<Button
								icon="pi pi-user-plus"
								class="p-button-outlined"
								@click="assignProgramModal.open(slotProp.data)"
								v-tooltip="$t('指派至專案')"
								:disabled="slotProp.data.isDisabled"
							/>
						</div>
					</template>
				</Column>
			</DataTable>

			<AddReviewerDialog
				v-model:show="isOpenAddReviewer"
				@submit="createReviewer"
			/>

			<Dialog :modal="true" v-model:visible="assignProgramModal.visible">
				<template #header>
					<h3 class="font-black text-lg">
						{{ $t("指派審查者至專案") }}
					</h3>
				</template>

				<template #default>
					<div class="font-bold">{{ $t("選擇的專案") }}</div>
					<MultiSelect
						:placeholder="$t('選擇專案')"
						:show-toggle-all="false"
						v-model:model-value="assignProgramModal.data.selected"
						:options="assignProgramModal.data.programs"
						option-label="fullname"
						:loading="
							isLoadingRelatedPrograms || isLoadingAllPrograms
						"
						class="w-md"
					/>
				</template>

				<template #footer>
					<Button
						:label="$t('完成')"
						@click="assignProgramModal.submit()"
					/>
				</template>
			</Dialog>
			<ConfirmDialog />
		</template>
		<template #Footer>
			<div flex="~" justify="center" gap="4">
				<NButton
					Admin
					class="p-2 w-32"
					@click="isOpenAddReviewer = true"
				>
					{{ $t("建立帳號") }}
				</NButton>
			</div>
		</template>
	</Layout>
</template>

<script setup lang="ts">
import NButton from "@/styles/CustomButton.vue";
import DataTable from "primevue/datatable";
import Row from "primevue/row";
import Column from "primevue/column";
import { computed, ref, toRaw, watch, watchEffect } from "vue";
import type { Ref } from "vue";
import { useI18n } from "vue-i18n";
import Divider from "primevue/divider";
import Tag from "primevue/tag";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import Checkbox from "primevue/checkbox";
import { useMutation, useQuery } from "@tanstack/vue-query";
import { useRouter } from "vue-router";
import {
	useAdmissionAdminAuthStore,
	useAdmissionReviewerAuthStore,
} from "@/stores/universalAuth";
import { AdmissionAdminAPI } from "@/api/admission/admin/api";
import { useGlobalStore } from "@/stores/globalStore";
import {
	AdmAdminReviewerListResponse,
	AdmAdminReviewerRelatedProgramResponse,
} from "@/api/admission/admin/types";
import Password from "primevue/password";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import ConfirmDialog from "primevue/confirmdialog";
import MultiSelect from "primevue/multiselect";
import AddReviewerDialog from "@/components/AdmAddReviewerDialog.vue";

const { t: $t } = useI18n();

const adminAuth = useAdmissionAdminAuthStore();

const store = useGlobalStore();
store.$subscribe((mutation, state) => {
	// Refetch table when selecting other program
	console.log("Refetch reviewer list");
	refetch();
});
const api = new AdmissionAdminAPI(adminAuth);
const tableData = ref<AdmAdminReviewerListResponse[]>(
	[] as AdmAdminReviewerListResponse[]
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
		onSettled: () => {
			isProcessing.value = false;
		},
	}
);

const { isLoading: isLoadingAllPrograms, refetch: getAllPrograms } = useQuery(
	["programList"],
	{
		queryFn: async (ctx) => {
			return await api.getProgramList();
		},
		select: (data) => {
			return data.map((x) => {
				return {
					id: x.id,
					category: x.category,
					name: x.name,
					fullname: x.category + x.name,
				};
			});
		},
		onSuccess: (data) => {
			assignProgramModal.value.data.programs = data;
		},
	}
);

const { isLoading: isLoadingRelatedPrograms, refetch: getRelatedPrograms } =
	useQuery(["reviewer-related programs"], {
		queryFn: async (ctx) => {
			console.log(assignProgramModal.value.data.id);
			return await api.getReviewerPrograms(
				assignProgramModal.value.data.id
			);
		},
		select: (data) => {
			return data.map((x) => {
				return {
					id: x.id,
					category: x.category,
					name: x.name,
					fullname: x.category + x.name,
				};
			});
		},
		onSuccess: (data) => {
			assignProgramModal.value.data.selected = data;
			assignProgramModal.value.data.oldSelected = data;
		},
		enabled: false,
	});

type AddReviewerModalData = {
	name: string;
	email: string;
	redirect_url: string;
};

const isOpenAddReviewer = ref(false);

class AssignProgramModal {
	data: {
		id: number;
		programs: Record<"id" | "category" | "name" | "fullname", any>[];
		selected: Record<"id" | "category" | "name" | "fullname", any>[];
		oldSelected: Record<"id" | "category" | "name" | "fullname", any>[];
	};
	visible: boolean;
	constructor() {
		this.data = {
			id: 0,
			programs: [],
			selected: [],
			oldSelected: [],
		};
		this.visible = false;
	}

	open(reviewer: AdmAdminReviewerRelatedProgramResponse) {
		this.data.id = reviewer.id;
		this.visible = true;
		getRelatedPrograms();
	}
	submit() {
		// TODO: close the modal after the result is certain

		// Find out which programs are to be removed
		const toRemove: number[] = this.data.oldSelected
			.filter((program) => !this.data.selected.includes(program))
			.map((program) => program.id);

		const toAssign: number[] = this.data.selected
			.filter((program) => !this.data.oldSelected.includes(program))
			.map((program) => program.id);

		toRemove.map((programID) => {
			removeReviewerFromProgram({
				reviewerID: this.data.id,
				programID: programID,
			});
		});

		toAssign.map((programID) => {
			assignReviewertoProgram({
				reviewerID: this.data.id,
				programID: programID,
			});
		});
		this.close();
	}
	close() {
		this.visible = false;
	}
}

const assignProgramModal = ref(new AssignProgramModal());

const isProcessing = ref(false);

const { mutate: createReviewer } = useMutation({
	mutationFn: (data: AddReviewerModalData) => {
		return api.createReviewer(data);
	},
	onMutate: () => {
		isProcessing.value = true;
	},
	onSettled: () => {
		isProcessing.value = false;
		refetch();
	},
	onSuccess: () => {
		toast.add({
			severity: "success",
			life: 3000,
			summary: $t("操作成功"),
			detail: $t("成功新增帳號"),
		});
	},
	onError: () => {
		toast.add({
			severity: "error",
			life: 3000,
			summary: $t("操作失敗"),
			detail: $t("新增帳號時發生錯誤"),
		});
	},
});

const confirm = useConfirm();
const toast = useToast();

const confirmDisableReviewer = (reviewerData: AdmAdminReviewerListResponse) => {
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

const confirmActivateReviewer = (reviewer: AdmAdminReviewerListResponse) => {
	const { id } = reviewer;

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

const { mutate: changeAccountStateAPI } = useMutation({
	mutationFn: (variables: { id: number; action: "activate" | "disable" }) => {
		const { id, action } = variables;

		return api.changeReviewerAccountState(id, action);
	},
	onSuccess: (_, variables) => {
		const msg =
			variables.action === "activate"
				? $t("成功啟用帳號")
				: $t("成功停用帳號");
		toast.add({
			severity: "success",
			life: 3000,
			summary: msg,
		});
	},
	onError: (_, variables) => {
		const msg =
			variables.action === "activate"
				? $t("啟用帳號時發生錯誤")
				: $t("停用帳號時發生錯誤");
		toast.add({
			severity: "error",
			summary: msg,
		});
	},
	onSettled: () => {
		refetch();
	},
	onMutate: () => {
		isProcessing.value = true;
	},
});

const { mutate: assignReviewertoProgram } = useMutation({
	mutationFn: async (variables: {
		reviewerID: number;
		programID: number;
	}) => {
		const { reviewerID, programID } = variables;
		return api.assignReviewertoProgram(reviewerID, programID);
	},
});

const { mutate: removeReviewerFromProgram } = useMutation({
	mutationFn: async (variables: {
		reviewerID: number;
		programID: number;
	}) => {
		const { reviewerID, programID } = variables;
		return api.removeReviewerFromProgram(reviewerID, programID);
	},
});
</script>
