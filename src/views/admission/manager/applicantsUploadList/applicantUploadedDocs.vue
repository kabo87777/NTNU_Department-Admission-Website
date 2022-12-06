<template>
	<div>
		<div class="flex">
			<div class="prevPage">
				<router-link to="/admission/manager/applicantsUploadList"
					><i class="pi pi-chevron-left"></i
					>{{ $t("上傳資料列表") }}</router-link
				>
			</div>
			<div class="ml-32px font-bold text-32px">
				{{ userInfo.admission_id + " " + userInfo.name }}
			</div>
		</div>
		<div class="bigRedDivider" style="margin-top: 12px"></div>
		<div class="p-fluid">
			<SelectButton
				class="mt-16px"
				v-model="activeTab"
				:options="tabs"
				optionLabel="name"
				aria-labelledby="single"
			>
				<template #option="slotProps">
					<div class="m-auto text-20px font-bold">
						{{ $t(slotProps.option.name) }}
					</div>
				</template>
			</SelectButton>
		</div>
		<div class="mt-8px" v-if="activeTab.value === 1">
			<BasicInfo :userId="userInfo.id" />
		</div>
		<div class="mt-8px" v-if="activeTab.value === 2">
			<AttachmentInfo :userId="userInfo.id" />
		</div>
		<div class="mt-8px" v-if="activeTab.value === 3">
			<AdditionalInfo :userId="userInfo.id" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive } from "vue";
import { useRoute } from "vue-router";
import { useAdmissionAdminAuthStore } from "@/stores/universalAuth";
import { AdmissionAdminAPI } from "@/api/admission/admin/api";
import { useQuery } from "@tanstack/vue-query";
import { InvalidSessionError } from "@/api/error";
import { AdmAdminGetApplicantInfoHeader } from "@/api/admission/admin/types";
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

const activeTab = ref({ name: "基本資料欄位", value: 1 });
const tabs = ref([
	{ name: "基本資料欄位", value: 1 },
	{ name: "檢附資料欄位", value: 2 },
	{ name: "補件系統欄位", value: 3 },
]);

const { data } = useQuery(
	["adminApplicantBasicInfo"],
	async () => {
		try {
			return await api.getApplicantBasicInfo(Number(route.params.userId));
		} catch (e: any) {
			if (e instanceof InvalidSessionError) {
				console.error(
					"Session has already expired while quering appliacntList"
				);
				return;
			}
		}
	},
	{
		onSuccess: (data) => {
			userInfo.id = data?.id as number;
			userInfo.name = data?.name as string;
			userInfo.admission_id = data?.admission_id as string;
		},
	}
);

onMounted(() => {
	console.log(route.params);
});
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
