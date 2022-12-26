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
						<div mx="auto">{{ $t("帳號") }}</div>
					</template>
					<template #body="slotProps">
						<div mx="auto" text="center">
							{{ slotProps.data.uid }}
						</div>
					</template>
				</Column>
				<Column field="name">
					<template #header>
						<div mx="auto">{{ $t("姓名") }}</div>
					</template>
					<template #body="slotProps">
						<div mx="auto" text="center">
							{{ slotProps.data.name }}
						</div>
					</template>
				</Column>
				<Column field="application_stage">
					<template #header>
						<div mx="auto">{{ $t("上傳狀態") }}</div>
					</template>
					<template #body="slotProps">
						<div flex="~" justify="center">
							<NTag
								v-if="
									slotProps.data.application_stage ===
									'已送審'
								"
								class="flex-grow-0"
								flag="success"
							>
								{{ slotProps.data.application_stage }}
							</NTag>
							<NTag
								v-else-if="
									slotProps.data.application_stage ===
									'未送審'
								"
								flag="warning"
							>
								{{ slotProps.data.application_stage }}
							</NTag>
							<NTag v-else>
								{{ $t("無") }}
							</NTag>
						</div>
					</template>
				</Column>
				<Column field="oral_stage">
					<template #header>
						<div mx="auto">{{ $t("補件系統") }}</div>
					</template>
					<template #body="slotProps">
						<div
							v-if="slotProps.data.isMoredoc"
							text="sm center pApplicant"
						>
							{{ $t("已開放") }}
						</div>
						<div v-else text="sm center secondary">
							{{ $t("未開放") }}
						</div>
					</template>
				</Column>
				<Column field="email">
					<template #header>
						<div mx="auto">{{ $t("補件狀態") }}</div>
					</template>
					<template #body="slotProps">
						<div flex="~" justify="center">
							<NTag
								v-if="slotProps.data.email === 'sent'"
								flag="success"
							>
								{{ slotProps.data.email }}
							</NTag>
							<NTag v-else>
								{{ $t("無") }}
							</NTag>
						</div>
					</template>
				</Column>
			</DataTable>
		</template>
	</Layout>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useAdmissionAdminAuthStore } from "@/stores/universalAuth";
import { AdmissionAdminAPI } from "@/api/admission/admin/api";
import { useGlobalStore } from "@/stores/globalStore";
import { useQuery } from "@tanstack/vue-query";
import { useRouter } from "vue-router";
import { AdmissionAdminApplicantsListResponse } from "@/api/admission/admin/types";
import DataTable from "primevue/datatable";
import Layout from "@/components/Layout.vue";
import Column from "primevue/column";
import NTag from "@/components/CustomTag.vue";
import Tag from "primevue/tag";
import "../../../../styles/customize.css";

const adminAuth = useAdmissionAdminAuthStore();
const store = useGlobalStore();
const api = new AdmissionAdminAPI(adminAuth);
const router = useRouter();

const applicantList: AdmissionAdminApplicantsListResponse[] = reactive<
	AdmissionAdminApplicantsListResponse[]
>([] as AdmissionAdminApplicantsListResponse[]);

const navigate = (event: any) => {
	console.log("Click it");
	console.log(event);
	router.replace({
		path: `/admission/manager/applicantsUploadList/${event.data.id}/${event.data.name}`,
	});
};

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
