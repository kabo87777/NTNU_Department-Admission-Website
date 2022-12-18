<template>
	<div>
		<!-- TITLE -->
		<div class="mt-24px text-24px font-bold">{{ $t("就學經歷") }}</div>

		<!-- SCHOOL EXPERIENCE -->
		<div
			v-for="(item, index) in schoolExpList"
			:key="index"
			class="listContainer"
		>
			<ReviewState
				v-if="item.state === 1"
				category="就學經歷"
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
import { useAdmissionAdminAuthStore } from "@/stores/universalAuth";
import { AdmissionAdminAPI } from "@/api/admission/admin/api";
import ReviewState from "@/components/attachmentStates/reviewState.vue";
import ParagraphDivider from "@/styles/paragraphDivider.vue";
import "primeicons/primeicons.css";
import {
	AdmAdminGetApplicantAttachmentData,
	AdmAdminGetApplicantAttachmentDataDetail,
} from "@/api/admission/admin/types";

const adminAuth = useAdmissionAdminAuthStore();
const api = new AdmissionAdminAPI(adminAuth);

const props = defineProps(["userId"]);

let attachmentList: AdmAdminGetApplicantAttachmentData[] = reactive([]);
let schoolExpList: AdmAdminGetApplicantAttachmentDataDetail[] = reactive([]);
let examCertificateList: AdmAdminGetApplicantAttachmentDataDetail[] = reactive(
	[]
);
let otherList: AdmAdminGetApplicantAttachmentDataDetail[] = reactive([]);

const splitThreeList = async (
	fullList: AdmAdminGetApplicantAttachmentData[]
) => {
	fullList.map((item) => {
		switch (item.category) {
			case "就學經歷": {
				schoolExpList.push({
					...item,
					order: schoolExpList.length,
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

onMounted(async () => {
	const res = await api.getApplicantFile(props.userId);

	attachmentList = [...attachmentList, ...res];

	splitThreeList(toRaw(attachmentList));
});
</script>

<style setup lang="css">
.listContainer {
	margin-top: 16px;
	padding: 0 32px 24px 32px;
	border: 3px dashed rgb(174, 174, 174);
	border-radius: 16px;
	background-color: rgb(244, 244, 244);
}

.emptyContainer {
	text-align: center;
	color: #333333;
	font-size: 20px;
	font-weight: bold;
	margin-top: 16px;
	padding: 24px 32px;
	border: 3px dashed rgb(174, 174, 174);
	border-radius: 16px;
	background-color: rgb(244, 244, 244);
}
</style>
