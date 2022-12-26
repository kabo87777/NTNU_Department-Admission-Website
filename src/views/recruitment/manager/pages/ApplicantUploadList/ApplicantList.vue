<template>
	<Layout Admin noMargin>
		<template #Header>{{ $t("上傳資料列表") }}</template>
		<template #Body>
			<DataTable
				:value="applicantList"
				:metaKeySelection="false"
				@rowSelect="navigate"
				selectionMode="single"
			>
				<Column field="id">
					<template #header>
						<div mx="auto" text="center">{{ $t("帳號") }}</div>
					</template>
					<template #body="slotProps">
						<div mx="auto" text="center">
							{{ slotProps.data.id }}
						</div>
					</template>
				</Column>
				<Column field="name">
					<template #header>
						<div mx="auto" text="center">{{ $t("姓名") }}</div>
					</template>
					<template #body="slotProps">
						<div mx="auto" text="center">
							{{ slotProps.data.name }}
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
import { useRouter } from "vue-router";
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
const router = useRouter();

const applicantList: RecruitmentAdminApplicantsListResponse[] = reactive<
	RecruitmentAdminApplicantsListResponse[]
>([] as RecruitmentAdminApplicantsListResponse[]);

const navigate = (event: any) => {
	console.log("Click it");
	console.log(event);
	router.replace({
		path: `/recruitment/manager/applicant/${event.data.id}`,
	});
};

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
