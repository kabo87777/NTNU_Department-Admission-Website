<template>
	<div>
		<!-- TITLE -->
		<div class="mt-24px text-24px font-bold">{{ $t("教學經歷") }}</div>

		<!-- SCHOOL EXPERIENCE -->
		<div
			v-for="(item, index) in teachingExpList"
			:key="index"
			class="listContainer"
		>
			<ReviewState
				v-if="item.state === 1"
				category="教學經歷"
				identity="admissionManager"
				:itemName="item.name"
				:order="index + 1"
				:showActionButtons="false"
			/>
		</div>
		<div v-show="examCertificateList.length === 0" class="emptyContainer">
			{{ $t("暫無資訊") }}
		</div>

		<!-- DIVIDER -->
		<ParagraphDivider />

		<!-- TITLE -->
		<div class="mt-24px text-24px font-bold">
			{{ $t("考試與檢定分數") }}
		</div>

		<!-- EXAM AND QUALIFICATION TEST SCORE -->
		<div
			v-for="(item, index) in examCertificateList"
			:key="index"
			class="listContainer"
		>
			<ReviewState
				v-if="item.state === 1"
				category="考試與檢定分數"
				identity="admissionManager"
				:itemName="item.name"
				:order="index + 1"
				:showActionButtons="false"
			/>
		</div>
		<div v-show="examCertificateList.length === 0" class="emptyContainer">
			{{ $t("暫無資訊") }}
		</div>

		<!-- DIVIDER -->
		<ParagraphDivider />

		<!-- TITLE -->
		<div class="mt-24px text-24px font-bold">
			{{ $t("其他有利於審查資料") }}
		</div>

		<!-- OTHER -->
		<div
			v-for="(item, index) in otherList"
			:key="index"
			class="listContainer"
		>
			<ReviewState
				v-if="item.state === 1"
				category="其他有利於審查資料"
				identity="admissionManager"
				:itemName="item.name"
				:order="index + 1"
				:showActionButtons="false"
			/>
		</div>
		<div v-show="otherList.length === 0" class="emptyContainer">
			{{ $t("暫無資訊") }}
		</div>

		<!-- DIVIDER -->
		<div class="bigRedDivider !mt-32px" />

		<div class="mt-32px"></div>
	</div>
</template>

<script setup lang="ts">
import { reactive, onMounted, toRaw } from "vue";
import { useRecruitmentAdminAuthStore } from "@/stores/universalAuth";
import { RecruitmentAdminAPI } from "@/api/recruitment/admin/api";
import { useGlobalStore } from "@/stores/RecruitmentAdminStore";
import {
	RecruitmentAdminGetApplicantAttachmentListDetail,
	RecruitmentAdminGetApplicantAttachmentList,
} from "@/api/recruitment/admin/types";
import ParagraphDivider from "@/styles/paragraphDivider.vue";

const adminAuth = useRecruitmentAdminAuthStore();
const api = new RecruitmentAdminAPI(adminAuth);
const store = useGlobalStore();
const programId = store.program?.id;

const props = defineProps(["userId"]);

const attachmentList: RecruitmentAdminGetApplicantAttachmentList[] = reactive(
	[]
);
const teachingExpList: RecruitmentAdminGetApplicantAttachmentListDetail[] =
	reactive([]);
const examCertificateList: RecruitmentAdminGetApplicantAttachmentListDetail[] =
	reactive([]);
const otherList: RecruitmentAdminGetApplicantAttachmentListDetail[] = reactive(
	[]
);

const splitThreeList = async (
	fullList: RecruitmentAdminGetApplicantAttachmentList[]
) => {
	fullList.map((item) => {
		switch (item.category) {
			case "教學經歷": {
				teachingExpList.push({
					...item,
					order: teachingExpList.length,
					state: 1,
				});
				break;
			}
			case "考試與檢定分數": {
				examCertificateList.push({
					...item,
					order: examCertificateList.length,
					state: 1,
				});
				break;
			}
			default: {
				otherList.push({
					...item,
					order: otherList.length,
					state: 1,
				});
			}
		}
	});
};

const getFileList = async () => {
	return await api.getApplicantFileList(programId as number, props.userId);
};

onMounted(async () => {
	const response = getFileList();
	await response.then((res) => {
		res.map((item) => {
			if (item) attachmentList.push(item);
		});
	});

	splitThreeList(toRaw(attachmentList));
	console.log(
		attachmentList,
		teachingExpList,
		examCertificateList,
		otherList
	);
});
</script>
