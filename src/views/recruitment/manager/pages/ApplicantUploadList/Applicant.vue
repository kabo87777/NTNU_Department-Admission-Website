<template>
	<Layout Admin noMargin noFooter>
		<template #Header>
			<div flex="~ gap-6">
				<router-link
					to="/recruitment/manager/attachmentList"
					custom
					v-slot="{ navigate }"
					><NButton
						Admin
						white
						class="h-8 min-w-32 bg-nRed-50"
						@click="navigate"
						size="sm"
						role="link"
						icon="pi pi-angle-left"
						>{{ $t("上傳資料列表") }}
					</NButton></router-link
				>
				<div v-if="headerInfo.name" class="ml-32px font-bold text-32px">
					{{ Number(route.params.userId) + " " + headerInfo.name }}
				</div>
				<div v-else class="ml-32px font-bold text-32px">
					{{ Number(route.params.userId) }}
				</div>
			</div>
		</template>
		<template #Body>
			<NSelect Admin :optionNum="3" h="12" @currentTab="switchTab">
				<template #Select1>{{ $t("基本資料欄位") }}</template>
				<template #Select2>{{ $t("檢附資料欄位") }}</template>
				<template #Select3>{{ $t("補件系統欄位") }}</template>
			</NSelect>
			<div v-if="activeTab === 1">
				<BasicInfo :userId="Number(route.params.userId)" />
			</div>
			<div v-if="activeTab === 2">
				<AttachmentList :userId="Number(route.params.userId)" />
			</div>
			<div v-if="activeTab === 3">
				<Moredoc :userId="Number(route.params.userId)" />
			</div>
		</template>
	</Layout>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRoute } from "vue-router";
import { useRecruitmentAdminAuthStore } from "@/stores/universalAuth";
import { RecruitmentAdminAPI } from "@/api/recruitment/admin/api";
import { RecruitmentAdminGetApplicantInfoHeader } from "@/api/recruitment/admin/types";
import { useGlobalStore } from "@/stores/RecruitmentAdminStore";
import { useQuery } from "@tanstack/vue-query";
import BasicInfo from "./BasicInfo.vue";
import AttachmentList from "./AttachmentList.vue";
import Layout from "@/components/Layout.vue";
import NButton from "@/styles/CustomButton.vue";
import NSelect from "@/components/SelectButton.vue";
import Moredoc from "./Moredoc.vue";

const adminAuth = useRecruitmentAdminAuthStore();
const api = new RecruitmentAdminAPI(adminAuth);
const store = useGlobalStore();
const programId = store.program?.id;
const route = useRoute();

const headerInfo: RecruitmentAdminGetApplicantInfoHeader =
	reactive<RecruitmentAdminGetApplicantInfoHeader>(
		{} as RecruitmentAdminGetApplicantInfoHeader
	);

const activeTab = ref(1);
const switchTab = (tabValue: number) => {
	activeTab.value = tabValue;
};

useQuery(
	["adminApplicantBasisInfo"],
	async () => {
		if (!programId) throw new Error("invalid programId");

		return await api.getApplicantBasicInfo(
			programId,
			Number(route.params.userId)
		);
	},
	{
		onSuccess: (data) => {
			headerInfo.id = data?.id as number;
			headerInfo.name = data?.name as string;
		},
	}
);
</script>
