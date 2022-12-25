<template>
	<Layout Admin noMargin>
		<template #Header>{{ reviewProgress }}</template>
		<template #Body>
			<DataTable
				:value="reviewerList"
				responsiveLayout="scroll"
				dataKey="id"
				:scrollable="true"
				scrollHeight="700px"
				class="!h-700px"
			>
				<Column field="name" :header="name"></Column>
				<Column :header="requiredData">
					<template #body="slotProps">
						{{ slotProps.data.requiredSeen }}/{{
							slotProps.data.requiredTotal
						}}
					</template>
				</Column>
				<Column :header="optionalData">
					<template #body="slotProps">
						{{ slotProps.data.optionalSeen }}/{{
							slotProps.data.optionalTotal
						}}
					</template>
				</Column>
			</DataTable>
		</template>
	</Layout>
</template>

<script setup lang="ts">
// Primevue Component
import Column from "primevue/column";
import Layout from "@/components/Layout.vue";
import DataTable from "primevue/datatable";

import { useI18n } from "vue-i18n";
import { ref, computed } from "vue";
// TODO: Connect API
import { useRouter } from "vue-router";
import { useRecruitmentAdminAuthStore } from "@/stores/universalAuth";
import { RecruitmentAdminAPI } from "@/api/recruitment/admin/api";
import { useQuery, useQueryClient } from "@tanstack/vue-query";
import { useGlobalStore } from "@/stores/RecruitmentAdminStore";
import { RecruitmentAdminReviewersListResponse } from "@/api/recruitment/admin/types";

// i18n Translation
const queryClient = useQueryClient();
const store = useGlobalStore();

const adminAuth = useRecruitmentAdminAuthStore();

const api = new RecruitmentAdminAPI(adminAuth);
const { t: $t } = useI18n();
const { t } = useI18n();

const reviewerList = ref<RecruitmentAdminReviewersListResponse[]>([]);
useQuery(
	["RAdminReviewerList"],
	async () => {
		return await api.getReviewerListWithDetail(store.program!.id!);
	},
	{
		onSuccess: (data) => {
			reviewerList.value = data;
		},
	}
);

const name = computed(() => t("姓名"));
const reviewProgress = computed(() => t("審查人員與進度"));
const optionalData = computed(() => t("選看資料"));
const requiredData = computed(() => t("必看資料"));
</script>

<style></style>
