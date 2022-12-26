<template>
	<Layout Admin noMargin noFooter>
		<template #Header>
			<div flex="~ gap-6">
				<router-link
					to="/admission/manager/applicantsUploadList"
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
				<div>
					{{ userInfo.admission_id + " " + route.params.userName }}
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
				<AttachmentInfo :userId="Number(route.params.userId)" />
			</div>
			<div v-if="activeTab === 3">
				<AdditionalInfo :userId="Number(route.params.userId)" />
			</div>
		</template>
	</Layout>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRoute } from "vue-router";
import { useAdmissionAdminAuthStore } from "@/stores/universalAuth";
import { AdmissionAdminAPI } from "@/api/admission/admin/api";
import { useQuery } from "@tanstack/vue-query";
import { AdmAdminGetApplicantInfoHeader } from "@/api/admission/admin/types";
import Layout from "@/components/Layout.vue";
import NButton from "@/styles/CustomButton.vue";
import NSelect from "@/components/SelectButton.vue";
import BasicInfo from "./reviewTabs/basicInfo.vue";
import AttachmentInfo from "./reviewTabs/attachmentInfo.vue";
import AdditionalInfo from "./reviewTabs/additionalInfo.vue";
import SelectButton from "primevue/selectbutton";
import "primeicons/primeicons.css";
import "../../../../styles/customize.css";

const adminAuth = useAdmissionAdminAuthStore();
const api = new AdmissionAdminAPI(adminAuth);

const route = useRoute();

const userInfo: AdmAdminGetApplicantInfoHeader =
	reactive<AdmAdminGetApplicantInfoHeader>(
		{} as AdmAdminGetApplicantInfoHeader
	);

const activeTab = ref(1);
const switchTab = (tabValue: number) => {
	activeTab.value = tabValue;
};

useQuery(
	["adminApplicantBasicInfo"],
	async () => {
		return await api.getApplicantBasicInfo(Number(route.params.userId));
	},
	{
		onSuccess: (data) => {
			userInfo.id = data?.id as number;
			userInfo.name = data?.name as string;
			userInfo.admission_id = data?.admission_id as string;
		},
	}
);
</script>

<style setup lang="css">
.prevPage {
	color: #94282c;
	margin-top: 12px;
	font-size: 18px;
	font-weight: bold;
}

.prevPage :hover {
	opacity: 0.6;
}
</style>
