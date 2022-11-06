<template>
	<div class="ml-128px mr-128px mt-62px">
		<div class="flex">
			<div class="text-4xl text-bold tracking-widest">
				{{ translate.reviewProgress }}
			</div>
		</div>
		<div class="bigRedDivider" />

		<!-- DataTable : Review Data List -->
		<div class="h-700px">
			<DataTable
				class="p-datatable-lg"
				:value="reviewDataList"
				dataKey="id"
				:scrollable="true"
				scrollHeight="700px"
			>
				<template #empty>
					<div>{{ translate.thereisnoReviewer }}</div>
				</template>
				<!-- Column : User ID -->
				<Column
					field="accountID"
					:header="translate.account"
					width="100"
				/>
				<!-- Column : User Name -->
				<Column field="name" :header="translate.name" width="100" />
				<!-- Column : Optional Data Progress -->
				<Column :header="translate.optionalData" width="100">
					<template #body="slotProps">
						<div class="flex justify-center items center gap-4">
							<div class="flex items center gap-1">
								<div>
									{{ slotProps.data.optionalDataViewed }}
								</div>
								<div>/</div>
								<div>
									{{ slotProps.data.optionalDataAll }}
								</div>
							</div>
							<div class="text-s p-2 bg-yellow-100 rounded-lg">
								{{
									translate.status(
										slotProps.data.optionalDataStatus
									)
								}}
							</div>
						</div>
					</template>
				</Column>
				<!-- Column : Required Data Progress -->
				<Column :header="translate.requiredData" width="100">
					<template #body="slotProps">
						<div class="flex justify-center items center gap-4">
							<div class="flex items center gap-1">
								<div>
									{{ slotProps.data.requiredDataViewed }}
								</div>
								<div>/</div>
								<div>
									{{ slotProps.data.requiredDataAll }}
								</div>
							</div>
							<div class="text-s p-2 bg-yellow-100 rounded-lg">
								{{
									translate.status(
										slotProps.data.requiredDataStatus
									)
								}}
							</div>
						</div>
					</template>
				</Column>
				<!-- Column : Buttons -->
				<Column :exportable="false" width="100">
					<template #body="slotProps">
						<div class="flex gap-4">
							<button
								class="flex items-center p-4"
								bg="transparent hover:gray-200"
								@click="openRequiredList(slotProps.data)"
								border="rounded"
							>
								<i class="pi pi-pencil" />
							</button>
							<button
								class="flex items-center p-4"
								bg="transparent hover:gray-200"
								border="rounded"
								@click="openProgressInfo(slotProps.data)"
							>
								<i class="pi pi-clock" />
							</button>
						</div>
					</template>
				</Column>
			</DataTable>
		</div>

		<div class="bigRedDivider"></div>

		<div class="flex p-4 gap-4 text-l items-center">
			<div>{{ translate.status("notStarted") }}</div>
			<div>
				{{ countStatus("notStarted") }} {{ translate.unitofPerson }}
			</div>
			<Divider layout="vertical" />
			<div>{{ translate.status("inProgress") }}</div>
			<div>
				{{ countStatus("inProgess") }} {{ translate.unitofPerson }}
			</div>
			<Divider layout="vertical" />
			<div>{{ translate.status("complete") }}</div>
			<div>
				{{ countStatus("complete") }} {{ translate.unitofPerson }}
			</div>
		</div>
	</div>

	<!-- Dialog : RequiredList -->
	<Dialog
		v-model:visible="displayRequiredList"
		:breakpoints="{ '960px': '75vw' }"
		:style="{ width: '50vw' }"
		:closable="false"
	>
		<template #header>
			<div class="w-full">
				<div class="text-xl">{{ translate.editRequiredList }}</div>
				<div class="smallRedDivider w-100%" />
			</div>
		</template>

		<div class="flex w-full">
			<div class="w-80">{{ translate.account }}{{ translate.colon }}</div>
			<div class="w-80">{{ translate.name }}{{ translate.colon }}</div>
		</div>
		<div class="flex w-full">
			<div class="w-80">{{ accountID }}</div>
			<div class="w-80">{{ accountName }}</div>
		</div>
		<div class="py-8">
			<DataTable
				class="p-datatable-sm"
				:value="applicantData"
				dataKey="id"
				:scrollable="true"
				scrollHeight="400px"
				v-model:selection="selectReviewer"
			>
				<!-- Column : Selection -->
				<Column selectionMode="multiple" width="10" />
				<!-- Column : ID -->
				<Column field="accId" :header="translate.account" width="10" />
				<!-- Column : Name -->
				<Column field="name" :header="translate.name" width="10" />
				<!-- Column : Required Reviewer list -->
				<Column :header="translate.requiredReviewer" width="10">
					<template #body="slotProps">
						<div class="flex gap-2">
							<div
								v-for="item in slotProps.data.requiredReviewer"
								:key="item"
							>
								{{ item }}
							</div>
						</div>
					</template>
				</Column>
			</DataTable>
		</div>
		<div class="flex">
			<div>{{ translate.requiredAmount }} {{ translate.colon }}</div>
			<div>{{ selectReviewer.length }}</div>
		</div>

		<template #footer>
			<div class="flex justify-center gap-8">
				<button
					class="flex items-center px-4 py-2 gap-2"
					bg="transparent hover:gray-200"
					border="rounded"
					@click="closeRequiredList(true)"
				>
					<i class="pi pi-check" />
					<div class="text-l">{{ translate.save }}</div>
				</button>
				<button
					class="flex items-center px-4 py-2 gap-2"
					bg="transparent hover:gray-200"
					border="rounded"
					@click="closeRequiredList(false)"
				>
					<i class="pi pi-times" />
					<div class="text-l">{{ translate.cancel }}</div>
				</button>
			</div>
		</template>
	</Dialog>

	<!-- Dialog : ProgressInfo -->
	<Dialog
		v-model:visible="displayProgressInfo"
		:breakpoints="{ '960px': '75vw' }"
		:style="{ width: '50vw' }"
		:closable="false"
	>
		<template #header>
			<div class="w-full">
				<div class="text-xl">{{ translate.checkReviewProgress }}</div>
				<div class="smallRedDivider" />
			</div>
		</template>
		<div class="flex w-full">
			<div class="w-80">{{ translate.account }}{{ translate.colon }}</div>
			<div class="w-80">{{ translate.name }}{{ translate.colon }}</div>
		</div>
		<div class="flex w-full">
			<div class="w-80">{{ accountID }}</div>
			<div class="w-80">{{ accountName }}</div>
		</div>
		<!-- SelectButton : (option =) RequiredList -->
		<div
			class="flex w-full mt-4 gap-2"
			border="2 red-900 rounded-lg"
			v-if="currentTab"
		>
			<button
				class="flex justify-center w-1/2 py-2 gap-2"
				bg="red-200"
				border="rounded-lg"
			>
				<div>{{ translate.requiredData }}</div>
				<div class="text-xs p-1 bg-yellow-100 rounded-lg">
					{{ translate.status(requiredDataStatus) }}
				</div>
			</button>
			<button
				class="flex justify-center w-1/2 py-2 gap-2"
				bg="white"
				border="rounded-lg"
				@click="switchTab(false)"
			>
				<div>{{ translate.optionalData }}</div>
				<div class="text-xs p-1 bg-yellow-100 rounded-lg">
					{{ translate.status(optionalDataStatus) }}
				</div>
			</button>
		</div>
		<!-- SelectButton : (option =) OptionalList -->
		<div
			class="flex w-full mt-4 gap-2"
			border="2 red-900 rounded-lg"
			v-else
		>
			<button
				class="flex justify-center w-1/2 py-2 gap-2"
				bg="white"
				border="rounded-lg"
				@click="switchTab(true)"
			>
				<div>{{ translate.requiredData }}</div>
				<div class="text-xs p-1 bg-yellow-100 rounded-lg">
					{{ translate.status(requiredDataStatus) }}
				</div>
			</button>
			<button
				class="flex justify-center w-1/2 py-2 gap-2"
				bg="red-200"
				border="rounded-lg"
			>
				<div>{{ translate.optionalData }}</div>
				<div class="text-xs p-1 bg-yellow-100 rounded-lg">
					{{ translate.status(optionalDataStatus) }}
				</div>
			</button>
		</div>
		<div class="py-8">
			<!-- DataTable : Required Review List Progress -->
			<DataTable
				class="p-datatable-sm"
				:value="filterList(accountID, currentTab)"
				dataKey="id"
				:scrollable="true"
				scrollHeight="400px"
			>
				<!-- Column : ID -->
				<Column field="accId" :header="translate.account" width="10" />
				<!-- Column : Name -->
				<Column field="name" :header="translate.name" width="10" />
				<!-- Column : Review Viewed -->
				<Column
					field="access"
					:header="translate.viewed"
					dataType="boolean"
					bodyClass="text-center"
					style="min-width: 8rem"
				>
					<template #body="slotProps">
						<div v-if="currentTab">
							<i
								v-if="
									slotProps.data.requiredViewed[
										indexofReviewer(
											accountID,
											slotProps.data
										)
									]
								"
								class="pi pi-check"
							></i>
							<p v-else>-</p>
						</div>
						<div v-else>
							<i
								v-if="
									slotProps.data.optionalViewed[
										indexofReviewer(
											accountID,
											slotProps.data
										)
									]
								"
								class="pi pi-check"
							></i>
							<p v-else>-</p>
						</div>
					</template>
				</Column>
				<!-- Column : Review Graded -->
				<Column :header="translate.reviewStatus" width="10">
					<template #body="slotProps">
						<div
							class="text-s p-2 bg-yellow-100 rounded-lg"
							v-if="currentTab"
						>
							{{
								translate.status(
									slotProps.data.requiredRecommand[
										indexofReviewer(
											accountID,
											slotProps.data
										)
									]
								)
							}}
						</div>
						<div class="text-s p-2 bg-yellow-100 rounded-lg" v-else>
							{{
								translate.status(
									slotProps.data.optionalRecommand[
										indexofReviewer(
											accountID,
											slotProps.data
										)
									]
								)
							}}
						</div>
					</template>
				</Column>
			</DataTable>
		</div>
		<template #footer>
			<div class="flex justify-center gap-8">
				<button
					class="flex items-center px-4 py-2 gap-2"
					bg="transparent hover:gray-200"
					border="rounded"
					@click="closeProgressInfo"
				>
					<i class="pi pi-check" />
					<div class="text-l">{{ translate.okay }}</div>
				</button>
			</div>
		</template>
	</Dialog>
</template>

<script setup lang="ts">
// Primevue Component
import Column from "primevue/column";
import DataTable from "primevue/datatable";
import Divider from "primevue/divider";
import Dialog from "primevue/dialog";

import { useI18n } from "vue-i18n";
import { ref, computed } from "vue";
// FIXME: DataList should connect to API not hard code.
import DataList from "./ReviewList.json";
// TODO: Connect API
import { useRouter } from "vue-router";
import { useRecruitmentAdminAuthStore } from "@/stores/universalAuth";
import { RecruitmentAdminAPI } from "@/api/recruitment/admin/api";

// i18n Translation
const { t } = useI18n();
const translate = {
	reviewProgress: t("審查人員與進度"),
	thereisnoReviewer: t("本專案目前未有審查人員"),
	checkReviewProgress: t("審查進度確認"),
	account: t("帳號"),
	name: t("姓名"),
	optionalData: t("選看資料"),
	requiredData: t("必看資料"),
	editRequiredList: t("編輯必看名單"),
	requiredReviewer: t("必看審查者"),
	requiredAmount: t("必看人數"),
	viewed: t("已閱讀"),
	reviewStatus: t("評比狀態"),
	okay: t("確定"),
	save: t("保存"),
	cancel: t("取消"),
	unitofPerson: t("位"),
	colon: t(":"),
	status: (state: string) => {
		switch (state) {
			case "notStarted":
				return t("未開放");
			case "inProgress":
				return t("未完成");
			case "complete":
				return t("已完成");
			case "unJudge":
				return t("未評比");
			case "notRecommand":
				return t("不推薦");
			case "recommand":
				return t("推薦");
		}
	},
};

// Tab Selection
const currentTab = ref(true);
const switchTab = (isPrimary: boolean) => {
	currentTab.value = isPrimary;
};

// DataList & Data
const reviewDataList = DataList.reviewers;
const applicantData = DataList.applicants;
const filterList = (reviewer: string, required: boolean) => {
	if (required) {
		return applicantData.filter((element) =>
			element.requiredReviewer.some((element) => element === reviewer)
		);
	} else {
		return applicantData.filter((element) =>
			element.optionalReviewer.some((element) => element === reviewer)
		);
	}
};
const indexofReviewer = (
	reviewer: string,
	rowData: { requiredReviewer: string; optionalReviewer: string }
) => {
	let index = rowData.requiredReviewer.indexOf(reviewer);
	if (index < 0) index = rowData.optionalReviewer.indexOf(reviewer);
	return index;
};
const accountID = ref("");
const accountName = ref("");
const optionalDataStatus = ref("");
const requiredDataStatus = ref("");
const selectReviewer = ref("");
const countStatus = (status: string) => {
	let value = 0;
	for (let index = 0; index < reviewDataList.length; index++)
		if (reviewDataList[index].requiredDataStatus == status) value++;
	return value;
};

// Dialog
const displayRequiredList = ref(false);
const displayProgressInfo = ref(false);
const openRequiredList = (rowData: { accountID: string; name: string }) => {
	displayRequiredList.value = true;
	accountID.value = rowData.accountID;
	accountName.value = rowData.name;
	return rowData;
};
const openProgressInfo = (rowData: {
	accountID: string;
	name: string;
	optionalDataStatus: string;
	requiredDataStatus: string;
}) => {
	displayProgressInfo.value = true;
	accountID.value = rowData.accountID;
	accountName.value = rowData.name;
	optionalDataStatus.value = rowData.optionalDataStatus;
	requiredDataStatus.value = rowData.requiredDataStatus;
	displayProgressInfo.value = true;
};
const closeRequiredList = (saveChange: boolean) => {
	displayRequiredList.value = false;
	if (saveChange) {
		// FIXME: Use API to write data for user change.
		console.log("save");
	}
};
const closeProgressInfo = () => {
	displayProgressInfo.value = false;
};
</script>

<style></style>
