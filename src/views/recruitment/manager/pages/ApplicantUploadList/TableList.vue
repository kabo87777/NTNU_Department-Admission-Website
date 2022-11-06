<template>
	<div class="">
		<div class="text-32px font-bold">上傳資料列表</div>
		<div class="bigRedDivider"></div>
		<div class="mt-16px">
			<DataTable :value="applicantList">
				<Column field="uid">
					<template #header>
						<div class="m-auto">{{ $t("帳號") }}</div>
					</template>
					<template #body="slotProps">
						<div
							class="m-auto w-50px text-center text-blue-500 hover:text-blue-300"
						>
							<router-link
								:to="{
									path: `/recruitment/manager/applicantsUploadList/${slotProps.data.uid}`,
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
									path: `/recruitment/manager/applicantsUploadList/${slotProps.data.uid}`,
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
		</div>
		<!-- <TableList
			role="admin"
			header="上傳資料列表"
			:data="applicantList"
			:items="items"
		/> -->
	</div>
</template>

<script setup lang="ts">
import { toRaw } from "vue";
import { router } from "@/router";
import { useRecruitmentAdminAuthStore } from "@/stores/universalAuth";
import { RecruitmentAdminAPI } from "@/api/recruitment/admin/api";
import { useQuery } from "@tanstack/vue-query";
import { InvalidSessionError } from "@/api/error";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Tag from "primevue/tag";
import "@/styles/customize.css";

const adminAuth = useRecruitmentAdminAuthStore();
const api = new RecruitmentAdminAPI(adminAuth);

const {
	isLoading,
	isError,
	data: applicants,
	error,
} = useQuery(["applicantList"], async () => {
	try {
		return await api.getApplicantList();
	} catch (e: any) {
		if (e instanceof InvalidSessionError) {
			console.error(
				"Session has already expired while quering appliacntList"
			);
			router.push("/");
			return;
		}
	}
});

const applicantList = toRaw(applicants.value);

console.log(applicantList);
</script>

<style setup lang="css">
.green {
	color: green;
}
</style>
