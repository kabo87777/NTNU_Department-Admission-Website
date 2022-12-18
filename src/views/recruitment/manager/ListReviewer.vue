<template>
	<h1 class="text-4xl font-bold">{{ $t("管理審查者") }}</h1>
	<!-- <Button @click="getRelatedPrograms">Button</Button> -->
	<Divider></Divider>
	<Button @click="addReviewerModal.open">{{ $t("建立帳號") }}</Button>
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

		<Column field="roles">
			<template #header>{{ $t("身份組") }}</template>
			<!-- <template #body="slotProps">
        <Tag
          v-for="role in truncateRoles(slotProps.data)"
          :key="role"
          >{{ role }}
          </Tag>
      </template> -->
		</Column>

		<Column>
			<template #header>{{ $t("動作") }}</template>
			<template #body="slotProp">
				<div class="flex gap-x-1">
					<Button
						icon="pi pi-pencil"
						class="p-button-outlined p-button-success"
					/>

					<!-- Disable user button -->
					<Button
						v-if="toRaw(slotProp.data).isDisabled === false"
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
				</div>
			</template>
		</Column>
	</DataTable>

	<!-- Modal for editting reviewer profile -->
	<Dialog v-model:visible="modalVisible" :modal="true">
		<template #header>
			<h3 class="font-extrabold text-lg">
				{{ $t("編輯審查者帳號") }}
			</h3>
		</template>
		<template #default>
			<div class="w-xl">
				<div class="grid grid-cols-2">
					<div class="col-start-1">
						<h3 font="font-black">{{ $t("審查者帳號") }}</h3>
						<h4 class="">{{ modalData.id }}</h4>
					</div>

					<div class="col-start-2 font-black">
						<label class="block">{{ $t("姓名") }}</label>
						<InputText
							type="text"
							class=""
							v-model="modalData.name"
						>
						</InputText>
					</div>
				</div>
				<div>
					<label for="" class="block font-black">{{
						$t("電子信箱")
					}}</label>
					<InputText
						type="email"
						class="w-full"
						v-model="modalData.email"
					></InputText>
				</div>

				<div class="mt-5">
					<h3 class="font-black">{{ $t("管理身份組") }}</h3>
					<Divider class="!mt-0"></Divider>
					<div
						class="inline-flex items-center"
						v-for="role in modalData.roles"
						:key="role.id"
					>
						<Checkbox :binary="true" :value="true"></Checkbox>
						<span class="mx-1">{{ role.name }}</span>
					</div>
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

	<!-- Modal for adding reviewer -->
	<Dialog :modal="true" v-model:visible="addReviewerModal.visible">
		<template #header>
			<h3 class="font-black text-lg">{{ $t("建立審查者帳號") }}</h3>
		</template>

		<template #default>
			<div class="w-lg grid gap-y-2">
				<div>
					<h3 font="font-black">{{ $t("審查者帳號") }}</h3>
					<InputText
						type="text"
						class="w-full"
						v-model:model-value="addReviewerModal.data.username"
					/>
				</div>

				<div class="font-black">
					<label class="block">{{ $t("姓名") }}</label>
					<InputText
						type="text"
						class="w-full"
						v-model:model-value="addReviewerModal.data.name"
					/>
				</div>
				<div>
					<label for="" class="block font-black">{{
						$t("電子信箱")
					}}</label>
					<InputText
						type="email"
						:class="`w-full ${addReviewerModal.getInputEmailClass()}`"
						v-model:model-value="addReviewerModal.data.email"
					/>
					<small
						v-if="addReviewerModal.invalidEmailFlag()"
						class="p-error"
						>{{ $t("無效的電子信箱") }}</small
					>
				</div>

				<div>
					<label for="" class="block font-black">
						{{ $t("密碼") }}
					</label>
					<Password
						class="w-full"
						input-class="w-full"
						:feedback="false"
						:toggle-mask="true"
						v-model:model-value="addReviewerModal.data.password"
					/>
				</div>
			</div>
		</template>

		<template #footer>
			<div class="flex justify-center">
				<div class="space-x-2">
					<Button
						icon="pi pi-check"
						:disabled="!addReviewerModal.allowSave"
						:label="$t('送出')"
						class="p-button-outlined p-button-success"
						@click="addReviewerModal.submit"
					></Button>
					<Button
						icon="pi pi-times"
						:label="$t('取消')"
						class="p-button-outlined p-button-danger"
						@click="addReviewerModal.visible = false"
					></Button>
				</div>
			</div>
		</template>
	</Dialog>

	<ConfirmDialog> </ConfirmDialog>
</template>

<script setup lang="ts">
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
import { InvalidSessionError } from "@/api/error";
import { useRouter } from "vue-router";
import { useRecruitmentAdminAuthStore } from "@/stores/universalAuth";
import { RecruitmentAdminAPI } from "@/api/recruitment/admin/api";
import { useGlobalStore } from "@/stores/globalStore";
import { RecruitmentAdminReviewersListResponse } from "@/api/recruitment/admin/types";
import Password from "primevue/password";
import ConfirmDialog from "primevue/confirmdialog";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import Tooltip from "primevue/tooltip";

const { t: $t } = useI18n();

const router = useRouter();
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

const reviewerID = ref(1);
// const programQuery = useQuery(
// 	["reviewerProgram", reviewerID],
// 	async () => {
// 		try {
// 			return await api.getReviewerPrograms(reviewerID);
// 		} catch (e: any) {
// 			if (e instanceof InvalidSessionError) {
// 				// FIXME: show session expiry notification??
// 				// Why are we even here in the first place?
// 				// MainContainer should have checked already.
// 				console.error(
// 					"Session has already expired while querying reviewerProgram"
// 				);
// 				router.push("/");
// 				return;
// 			}
// 		}
// 	},
// 	{
// 		enabled: false,
// 		select: (programData) => {
// 			// Select the data fields we are interested in
// 			if (!programData) return programData;
// 			return programData.map((program) => {
// 				return {
// 					id: program.id,
// 					category: program.category,
// 					name: program.name,
// 				};
// 			});
// 		},
// 		onSuccess: (data) => {
// 			// data is filtered by option select
// 			console.log("Success");
// 			console.log(data);
// 			// TODO: save result after getting response
// 		},
// 	}
// );
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

const addReviewerModal = ref({
	data: {
		username: "",
		name: "",
		email: "",
		password: "",
		redirect_url:
			"https://admissions-frontend-staging.birkhoff.me/recruitment/reviewer/signin",
	},
	visible: false,
	open: () => (addReviewerModal.value.visible = true),
	close: () => (addReviewerModal.value.visible = false),
	allowSave: computed(() => {
		const ref: Ref = addReviewerModal;
		const { username, name, email, password } = ref.value.data;
		const result =
			username.length && name.length && email.length && password.length;
		return result;
	}),
	submit: () => {
		addReviewerModal.value.close();
		createReviewerAPI();
	},
	validateEmail: () => {
		// TODO: email validation
		// RFC 2822 email regex
		// https://regexr.com/2rhq7
		const re =
			/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
		return re.test(addReviewerModal.value.data.email);
	},
	getInputEmailClass: () => {
		return addReviewerModal.value.validateEmail() ? "" : "p-invalid";
	},
	invalidEmailFlag: () => {
		return addReviewerModal.value.validateEmail() === false;
	},
});

const modalVisible = ref(false);
const modalData = ref();
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

const { mutate: createReviewerAPI } = useMutation({
	mutationFn: () => {
		return api.createReviewerAccount(addReviewerModal.value.data);
	},
	onMutate: () => {
		isProcessing.value = true;
	},
	onSettled: () => {
		isProcessing.value = false;
	},
	onSuccess: () => {
		refetch();
	},
});

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
