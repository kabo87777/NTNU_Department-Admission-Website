<template>
	<Toast position="center" />

	<div class="ml-128px mr-128px mt-62px">
		<div class="flex">
			<h1 class="text-4xl text-bold tracking-widest">
				{{ $t("審查人員與進度") }}
			</h1>
		</div>

		<div class="bigRedDivider" />

		<!-- DataTable Section -->
		<div class="h-700px">
			<DataTable
				class="p-datatable-lg"
				:value="data_list"
				dataKey="id"
				:scrollable="true"
				scrollHeight="700px"
			>
				<template #empty>
					<div>{{ $t("本專案目前未有審查人員") }}</div>
				</template>

				<Column field="id" :header="account" width="100" />

				<Column field="name" :header="reviewerName" width="100" />

				<Column
					field="optionalDataProgress"
					:header="optionalData"
					width="100"
				/>

				<Column field="optionalDataStatus" width="50" />

				<Column
					field="requiredDataProgress"
					:header="requiredData"
					width="100"
				/>

				<Column field="requiredDataStatus" width="50" />

				<Column :exportable="false" width="100">
					<template #body>
						<div class="flex gap-4">
							<button
								class="flex items-center p-4"
								bg="transparent hover:gray-200"
								@click="openRequiredList"
								border="rounded"
							>
								<i class="pi pi-pencil" />
							</button>
							<button
								class="flex items-center p-4"
								bg="transparent hover:gray-200"
								border="rounded"
								@click="openProgressInfo"
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
			<div>{{ t("未開放") }}</div>
			<div>{{ stateValue.notStarted }} {{ t(" 位") }}</div>
			<Divider layout="vertical" />
			<div>{{ t("評比中") }}</div>
			<div>{{ stateValue.onProgess }} {{ t(" 位") }}</div>
			<Divider layout="vertical" />
			<div>{{ t("已送出") }}</div>
			<div>{{ stateValue.complete }} {{ t(" 位") }}</div>
		</div>
	</div>

	<!-- Dialog Section -->
	<Dialog
		v-model:visible="displayRequiredList"
		:breakpoints="{ '960px': '75vw', '640px': '90vw' }"
		:style="{ width: '50vw' }"
		:closable="false"
	>
		<template #header>
			<div class="w-full">
				<div class="text-xl">{{ $t("必看名單編輯") }}</div>
				<Divider />
			</div>
		</template>

		<div>Hello</div>

		<template #footer>
			<div class="flex justify-center gap-8">
				<button
					class="flex items-center px-4 py-2 gap-2"
					bg="transparent hover:gray-200"
					border="rounded"
					@click="closeRequiredList(true)"
				>
					<i class="pi pi-check" />
					<div class="text-l">儲存變更</div>
				</button>
				<button
					class="flex items-center px-4 py-2 gap-2"
					bg="transparent hover:gray-200"
					border="rounded"
					@click="closeRequiredList(false)"
				>
					<i class="pi pi-times" />
					<div class="text-l">取消關閉</div>
				</button>
			</div>
		</template>
	</Dialog>

	<Dialog
		v-model:visible="displayProgressInfo"
		:breakpoints="{ '960px': '75vw', '640px': '90vw' }"
		:style="{ width: '50vw' }"
		:closable="false"
	>
		<template #header>
			<div class="w-full">
				<div class="text-xl">{{ $t("審查進度確認") }}</div>
				<Divider />
			</div>
		</template>
		<div>Hello</div>
		<template #footer>
			<div class="flex justify-center gap-8">
				<button
					class="flex items-center px-4 py-2 gap-2"
					bg="transparent hover:gray-200"
					border="rounded"
					@click="closeProgressInfo"
				>
					<i class="pi pi-check" />
					<div class="text-l">完成</div>
				</button>
			</div>
		</template>
	</Dialog>
</template>

<script setup lang="ts">
import DataTable from "primevue/datatable";
import Divider from "primevue/divider";
import Column from "primevue/column";
import Dialog from "primevue/dialog";
import Toast from "primevue/toast";

import { useI18n } from "vue-i18n";
import { useToast } from "primevue/usetoast";
import { useRouter } from "vue-router";
import { useRecruitmentAdminAuthStore } from "@/stores/universalAuth";
import { RecruitmentAdminAPI } from "@/api/recruitment/admin/api";
// import { useQuery } from "@tanstack/vue-query";

import { ref, computed } from "vue";

const { t } = useI18n();

const status = {
	notStarted: computed(() => t("未開放")),
	onProgess: computed(() => t("評比中")),
	complete: computed(() => t("已送出")),
};

const stateValue = {
	notStarted: ref(2),
	onProgess: ref(3),
	complete: ref(5),
};

const account = computed(() => t("帳號"));
const reviewerName = computed(() => t("姓名"));
const optionalData = computed(() => t("選看資料"));
const requiredData = computed(() => t("必看資料"));

const displayRequiredList = ref(false);
const displayProgressInfo = ref(false);
const toast = useToast();

const data_list = ref([
	{
		id: "neokent",
		name: "記怕蚋",
		optionalDataProgress: "3/5",
		optionalDataStatus: status.onProgess,
		requiredDataProgress: "5/5",
		requiredDataStatus: status.complete,
	},
	{
		id: "wangchao",
		name: "王朝",
		optionalDataProgress: "0/5",
		optionalDataStatus: status.notStarted,
		requiredDataProgress: "4/5",
		requiredDataStatus: status.onProgess,
	},
]);

const openRequiredList = () => {
	displayRequiredList.value = true;
};

const openProgressInfo = () => {
	displayProgressInfo.value = true;
};

const closeRequiredList = (saveChange: boolean) => {
	displayRequiredList.value = false;
	if (saveChange) {
		console.log(1);
		showSuccess;
	}
};

const closeProgressInfo = () => {
	displayProgressInfo.value = false;
};

const showSuccess = () => {
	toast.add({
		severity: "success",
		summary: "Success Message",
		detail: "Message Content",
		life: 3000,
	});
};
</script>

<style></style>
