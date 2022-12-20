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
				identity="recruitmentManager"
				:downloadFile="true"
				:itemName="item.name"
				:itemId="item.id"
				:fileUrl="item.filepath?.url"
				:order="index + 1"
				:showActionButtons="false"
				@download="handleDownload"
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
				identity="recruitmentManager"
				:downloadFile="true"
				:itemName="item.name"
				:itemId="item.id"
				:fileUrl="item.filepath?.url"
				:order="index + 1"
				:showActionButtons="false"
				@download="handleDownload"
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
				identity="recruitmentManager"
				:downloadFile="true"
				:itemName="item.name"
				:itemId="item.id"
				:fileUrl="item.filepath?.url"
				:order="index + 1"
				:showActionButtons="false"
				@download="handleDownload"
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

let attachmentList: RecruitmentAdminGetApplicantAttachmentList[] = reactive([]);
let teachingExpList: RecruitmentAdminGetApplicantAttachmentListDetail[] =
	reactive([]);
let examCertificateList: RecruitmentAdminGetApplicantAttachmentListDetail[] =
	reactive([]);
let otherList: RecruitmentAdminGetApplicantAttachmentListDetail[] = reactive(
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

const handleDownload = async (fileId: number, fileName: string) => {
	const res = await api.downloadApplicantFile(
		programId as number,
		props.userId,
		fileId
	);

	const file = new Blob([res], { type: "application/pdf" });

	const fileURL = URL.createObjectURL(file);
	// window.open(fileURL);
	const link = document.createElement("a");
	link.href = fileURL;
	link.download = fileName + ".pdf";
	link.click();
};

onMounted(async () => {
	const res = await getFileList();

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
