<template>
	<div class="ml-128px mr-128px mt-62px">
		<div class="flex">
			<h1 class="text-4xl text-bold tracking-widest">
				{{ $t("審查人員與進度") }}
			</h1>
		</div>

		<div class="bigRedDivider" />

		<div>
			<DataTable
				class="p-datatable-lg"
				:value="data_list"
				dataKey="id"
				:scrollable="true"
				scrollHeight="800px"
			>
				<template #empty>
					<div>本專案目前未有審查人員</div>
				</template>
				<Column field="id" :header="account" width="100" />
				<Column field="name" :header="reviewerName" width="100" />
				<Column
					field="optionalDataProgress"
					:header="optionalData"
					width="100"
				></Column>
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
								border="rounded"
							>
								<i class="pi pi-pencil" />
							</button>
							<button
								class="flex items-center p-4"
								bg="transparent hover:gray-200"
								border="rounded"
							>
								<i class="pi pi-clock" />
							</button>
						</div>
					</template>
				</Column>
			</DataTable>
		</div>
	</div>
</template>

<script setup lang="ts">
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import { useI18n } from "vue-i18n";
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

const account = computed(() => t("審查者帳號"));
const reviewerName = computed(() => t("審查者帳號"));
const optionalData = computed(() => t("選看資料"));
const requiredData = computed(() => t("必看資料"));

const data_list = ref([
	{
		id: "neokent",
		name: "記怕蚋",
		optionalDataProgress: "3/5",
		optionalDataStatus: status.onProgess,
		requiredDataProgress: "5/5",
		requiredDataStatus: status.complete,
	},
]);
</script>

<style></style>
