<template>
	<Layout Admin noMargin>
		<template #Header>{{ $t("上傳資料列表") }}</template>
		<template #Body>
			<DataTable :value="applicantList">
				<Column field="id">
					<template #header>
						<div class="m-auto">{{ $t("帳號") }}</div>
					</template>
					<template #body="slotProps">
						<div
							class="m-auto w-50px text-center text-blue-500 hover:text-blue-300"
						>
							<router-link
								:to="{
									path: `/recruitment/manager/applicant/${slotProps.data.id}`,
								}"
							>
								{{ slotProps.data.id }}
							</router-link>
						</div>
					</template>
				</Column>
				<Column field="name">
					<template #header>
						<div class="m-auto">{{ $t("姓名") }}</div>
					</template>
					<template #body="slotProps">
						<div
							class="m-auto w-50px text-center text-blue-500 hover:text-blue-300"
						>
							<router-link
								:to="{
									path: `/recruitment/manager/applicant/${slotProps.data.id}`,
								}"
							>
								{{ slotProps.data.name }}
							</router-link>
						</div>
					</template>
				</Column>
				<Column field="application_stage">
					<template #header>
						<div class="m-auto">{{ $t("上傳狀態") }}</div>
					</template>
					<template #body="slotProps">
						<div class="m-auto text-center">
							<Tag
								v-if="
									slotProps.data.application_stage === 'sent'
								"
								severity="success"
							>
								{{ slotProps.data.application_stage }}
							</Tag>
							<Tag
								v-else-if="
									slotProps.data.application_stage ===
									'unstart'
								"
								severity="danger"
							>
								{{ slotProps.data.application_stage }}
							</Tag>
							<Tag
								v-else-if="
									slotProps.data.application_stage === 'draft'
								"
								severity="warning"
							>
								{{ slotProps.data.application_stage }}
							</Tag>
						</div>
					</template>
				</Column>
				<Column field="oral_stage">
					<template #header>
						<div class="m-auto">{{ $t("補件狀態") }}</div>
					</template>
					<template #body="slotProps">
						<div class="m-auto text-center">
							{{ slotProps.data.oral_stage }}
						</div>
					</template>
				</Column>
				<Column field="email">
					<template #header>
						<div class="m-auto">{{ $t("補件系統") }}</div>
					</template>
					<template #body="slotProps">
						<div class="m-auto text-center">
							<Tag
								v-if="slotProps.data.email === 'sent'"
								severity="success"
							>
								{{ slotProps.data.email }}
							</Tag>
						</div>
					</template>
				</Column>
			</DataTable>
		</template>
	</Layout>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useRecruitmentAdminAuthStore } from "@/stores/universalAuth";
import { RecruitmentAdminAPI } from "@/api/recruitment/admin/api";
import { useGlobalStore } from "@/stores/RecruitmentAdminStore";
import { useQuery } from "@tanstack/vue-query";
import { RecruitmentAdminApplicantsListResponse } from "@/api/recruitment/admin/types";
import Layout from "@/components/Layout.vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Tag from "primevue/tag";
import "@/styles/customize.css";

const adminAuth = useRecruitmentAdminAuthStore();
const api = new RecruitmentAdminAPI(adminAuth);
const store = useGlobalStore();
const programId = store.program?.id;

const applicantList: RecruitmentAdminApplicantsListResponse[] = reactive<
	RecruitmentAdminApplicantsListResponse[]
>([] as RecruitmentAdminApplicantsListResponse[]);

useQuery(
	["applicantList"],
	async () => {
		if (!programId) throw new Error("invalid programId");
		return await api.getApplicantList(programId);
	},
	{
		onSuccess: (data) => {
			data!.map((item, index) => {
				applicantList[index] = item;
			});
		},
	}
);
</script>

<style setup lang="css">
.green {
	color: green;
}
</style>
