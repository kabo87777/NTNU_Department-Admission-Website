<template>
	<div>
		<div class="flex">
			<div class="prevPage">
				<router-link to="/admission/manager/applicantsUploadList"
					><i class="pi pi-chevron-left"></i
					>{{ $t("上傳資料列表") }}</router-link
				>
			</div>
			<div v-if="headerInfo.name" class="ml-32px font-bold text-32px">
				{{ headerInfo.id + " " + headerInfo.name }}
			</div>
			<div v-else class="ml-32px font-bold text-32px">
				{{ headerInfo.id }}
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
		<div class="mt-32px" v-if="activeTab.value === 1">
			<BasicInfo :userId="headerInfo.id" />
		</div>
		<div class="mt-32px" v-if="activeTab.value === 2">
			<AttachmentList :userId="headerInfo.id" />
		</div>
		<div class="mt-32px" v-if="activeTab.value === 3">
			<Moredoc :userId="headerInfo.id" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRoute } from "vue-router";
import { useRecruitmentAdminAuthStore } from "@/stores/universalAuth";
import { RecruitmentAdminAPI } from "@/api/recruitment/admin/api";
import { RecruitmentAdminGetApplicantInfoHeader } from "@/api/recruitment/admin/types";
import { useGlobalStore } from "@/stores/RecruitmentAdminStore";
import { useQuery } from "@tanstack/vue-query";
import { InvalidSessionError } from "@/api/error";
import BasicInfo from "./BasicInfo.vue";
import AttachmentList from "./AttachmentList.vue";
import Moredoc from "./Moredoc.vue";
import SelectButton from "primevue/selectbutton";

const adminAuth = useRecruitmentAdminAuthStore();
const api = new RecruitmentAdminAPI(adminAuth);
const store = useGlobalStore();
const programId = store.program?.id;
const route = useRoute();

const headerInfo: RecruitmentAdminGetApplicantInfoHeader =
	reactive<RecruitmentAdminGetApplicantInfoHeader>(
		{} as RecruitmentAdminGetApplicantInfoHeader
	);

const activeTab = ref({ name: "基本資料欄位", value: 1 });
const tabs = ref([
	{ name: "基本資料欄位", value: 1 },
	{ name: "檢附資料欄位", value: 2 },
	{ name: "補件系統欄位", value: 3 },
]);

const { data } = useQuery(
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
