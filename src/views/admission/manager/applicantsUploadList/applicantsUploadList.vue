<template>
	<div class="pt-62px pl-128px pr-128px">
		<div class="text-32px font-medium">上傳資料列表</div>
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
									path: `/admission/manager/applicantsUploadList/${slotProps.data.uid}`,
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
									path: `/admission/manager/applicantsUploadList/${slotProps.data.uid}`,
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
import { useAdmissionAdminAuthStore } from "@/stores/universalAuth";
import { AdmissionAdminAPI } from "@/api/admission/admin/api";
import { useGlobalStore } from "@/stores/globalStore";
import { useQuery } from "@tanstack/vue-query";
import { InvalidSessionError } from "@/api/error";
import DataTable from "primevue/datatable";
// import TableList from "@/components/dataTable/AdmissionAdminApplicantListTable.vue";
import Column from "primevue/column";
import Tag from "primevue/tag";
import "../../../../styles/customize.css";

const adminAuth = useAdmissionAdminAuthStore();
const store = useGlobalStore();
const api = new AdmissionAdminAPI(adminAuth);

const {
	isLoading,
	isError,
	data: applicants,
	error,
} = useQuery(["applicantList"], async () => {
	try {
		if (store.program) return await api.getApplicantList(store.program.id);
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

const items = [
	{
		name: "帳號",
		dataIndex: "uid",
		width: "20%",
	},
	{
		name: "姓名",
		dataIndex: "name",
		width: "20%",
	},
	{
		name: "上傳狀態",
		dataIndex: "applicantion_stage",
		width: "20%",
	},
	{
		name: "補件狀態",
		// dataIndex: "",
		width: "20%",
	},
	{
		name: "補件狀態",
		// dataIndex: "",
		width: "20%",
	},
];

const applicantList = toRaw(applicants.value);
</script>

<style setup lang="css">
.green {
	color: green;
}
</style>
