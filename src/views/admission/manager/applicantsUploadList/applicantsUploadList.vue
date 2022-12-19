<template>
	<div>
		<div class="text-32px font-bold">上傳資料列表</div>
		<div class="bigRedDivider"></div>
		<div class="mt-16px">
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
									path: `/admission/manager/applicantsUploadList/${slotProps.data.id}`,
								}"
							>
								{{ slotProps.data.uid }}
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
									path: `/admission/manager/applicantsUploadList/${slotProps.data.id}`,
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
									slotProps.data.application_stage ===
									'已送審'
								"
								severity="success"
							>
								{{ slotProps.data.application_stage }}
							</Tag>
							<Tag
								v-else-if="
									slotProps.data.application_stage ===
									'未送審'
								"
								severity="warning"
							>
								{{ slotProps.data.application_stage }}
							</Tag>
							<Tag v-else severity="danger">
								{{ slotProps.data.application_stage }}
							</Tag>
						</div>
					</template>
				</Column>
				<Column field="oral_stage">
					<template #header>
						<div class="m-auto">{{ $t("補件系統") }}</div>
					</template>
					<template #body="slotProps">
						<div
							v-if="slotProps.data.isMoredoc"
							class="m-auto text-center"
						>
							{{ $t("已開放") }}
						</div>
						<div v-else class="m-auto text-center">
							{{ $t("未開放") }}
						</div>
					</template>
				</Column>
				<Column field="email">
					<template #header>
						<div class="m-auto">{{ $t("補件狀態") }}</div>
					</template>
					<template #body="slotProps">
						<div class="m-auto text-center">
							<Tag
								v-if="slotProps.data.email === 'sent'"
								severity="success"
							>
								{{ slotProps.data.email }}
							</Tag>
							<Tag
								v-else
								style="background-color: #d9dada; color: black"
							>
								{{ $t("無") }}
							</Tag>
						</div>
					</template>
				</Column>
			</DataTable>
		</div>
	</div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useAdmissionAdminAuthStore } from "@/stores/universalAuth";
import { AdmissionAdminAPI } from "@/api/admission/admin/api";
import { useGlobalStore } from "@/stores/globalStore";
import { useQuery } from "@tanstack/vue-query";
import { AdmissionAdminApplicantsListResponse } from "@/api/admission/admin/types";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Tag from "primevue/tag";
import "../../../../styles/customize.css";

const adminAuth = useAdmissionAdminAuthStore();
const store = useGlobalStore();
const api = new AdmissionAdminAPI(adminAuth);

const applicantList: AdmissionAdminApplicantsListResponse[] = reactive<
	AdmissionAdminApplicantsListResponse[]
>([] as AdmissionAdminApplicantsListResponse[]);

useQuery(
	["applicantListUpload"],
	async () => {
		return await api.getApplicantList(store.program!.id as number);
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
