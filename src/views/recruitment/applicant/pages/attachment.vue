<template>
	<div>
		<!-- TITLE -->
		<div class="font-[500] text-[32px] font-bold">
			{{ $t("附件資料") }}
		</div>
		<div class="bigYellowDivider"></div>

		<!-- SCHOOL EXPERIENCE -->
		<div class="px-12px py-24px">
			<div class="text-[24px] font-[50] font-bold">
				{{ $t("教學經歷") }}
			</div>
			<div v-for="(item, index) in schoolExpList" :key="index">
				<ReviewState
					v-if="item.state === 1"
					category="教學經歷"
					identity="admissionApplicant"
					:itemName="item.itemName"
					:order="index + 1"
					@edit="reviewToEdit"
				/>
				<EditState
					v-else-if="item.state === 2"
					category="教學經歷"
					identity="admissionApplicant"
					:itemName="item.itemName"
					:order="index + 1"
					@cancel="editToReview"
				/>
				<CreateState
					v-else-if="item.state === 3"
					category="教學經歷"
					identity="admissionApplicant"
					:order="index + 1"
					@edit="createToEdit"
				/>
				<EditState
					v-else-if="item.state === 4"
					category="教學經歷"
					identity="admissionApplicant"
					:order="index + 1"
					@cancel="editToCreate"
				/>
			</div>
		</div>
		<ParagraphDivider />

		<!-- EXAM AND QUALIFICATION TEST SCORE -->
		<div class="px-12px py-24px">
			<div class="text-[24px] font-[50] font-bold">
				{{ $t("考試與檢定分數") }}
			</div>
			<div v-for="(item, index) in examCertificateList" :key="index">
				<ReviewState
					v-if="item.state === 1"
					category="考試與檢定分數"
					identity="admissionApplicant"
					:itemName="item.itemName"
					:order="index + 1"
					@edit="reviewToEdit"
				/>
				<EditState
					v-else-if="item.state === 2"
					category="考試與檢定分數"
					identity="admissionApplicant"
					:itemName="item.itemName"
					:order="index + 1"
					@cancel="editToReview"
				/>
				<CreateState
					v-else-if="item.state === 3"
					category="考試與檢定分數"
					identity="admissionApplicant"
					:order="index + 1"
					@edit="createToEdit"
				/>
				<EditState
					v-else-if="item.state === 4"
					category="考試與檢定分數"
					identity="admissionApplicant"
					:order="index + 1"
					@cancel="editToCreate"
				/>
			</div>
		</div>
		<ParagraphDivider />

		<!-- OTHER -->
		<div class="px-12px py-24px">
			<div class="text-[24px] font-[50] font-bold">
				{{ $t("其他有利於審查資料") }}
			</div>
			<div v-for="(item, index) in otherList" :key="index">
				<ReviewState
					v-if="item.state === 1"
					category="其他有利於審查資料"
					identity="admissionApplicant"
					:itemName="item.itemName"
					:order="index + 1"
					@edit="reviewToEdit"
				/>
				<EditState
					v-else-if="item.state === 2"
					category="其他有利於審查資料"
					identity="admissionApplicant"
					:itemName="item.itemName"
					:order="index + 1"
					@cancel="editToReview"
				/>
				<CreateState
					v-else-if="item.state === 3"
					category="其他有利於審查資料"
					identity="admissionApplicant"
					:order="index + 1"
					@edit="createToEdit"
				/>
				<EditState
					v-else-if="item.state === 4"
					category="其他有利於審查資料"
					identity="admissionApplicant"
					:order="index + 1"
					@cancel="editToCreate"
				/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { reactive, toRaw } from "vue";
import { useRouter } from "vue-router";
import ReviewState from "@/components/attachmentStates/ReviewState.vue";
import EditState from "@/components/attachmentStates/EditState.vue";
import CreateState from "@/components/attachmentStates/CreateState.vue";
import ParagraphDivider from "@/styles/paragraphDividerApplicant.vue";
import { AttachmentData } from "@/api/recruitment/applicant/types";
import { useRecruitmentApplicantAuthStore } from "@/stores/universalAuth";
import { RecruitmentApplicantAPI } from "@/api/recruitment/applicant/api";
import { useProjectIdStore } from "@/stores/RecruitmentApplicantStore";
import { useQuery } from "@tanstack/vue-query";
import { InvalidSessionError } from "@/api/error";
import AttachmentList from "@/mocks/attachmentList.json";

const router = useRouter();
const applicantAuth = useRecruitmentApplicantAuthStore();
const api = new RecruitmentApplicantAPI(applicantAuth);
const project = useProjectIdStore();

const { isLoading, isError, data, error } = useQuery(
	["attachmentList"],
	async () => {
		try {
			return await api.getFileList(project.pid);
		} catch (e: any) {
			if (e instanceof InvalidSessionError) {
				console.error(
					"Session has already expired while querying attachment list"
				);
				router.push("/");
				return;
			}
		}
	}
);

const attachmentList = toRaw(data.value);
console.log(attachmentList);

const schoolExpList = reactive(
	AttachmentList.schoolExp?.map((item, index) => {
		const element: AttachmentData = {
			...(item as object),
			order: index,
			state: 1,
		};
		return element;
	})
);
schoolExpList.push({
	order: schoolExpList.length,
	state: 3,
});

const examCertificateList = reactive(
	AttachmentList.examScore?.map((item, index) => {
		const element: AttachmentData = {
			...(item as object),
			order: index,
			state: 1,
		};
		return element;
	})
);
examCertificateList.push({
	order: examCertificateList.length,
	state: 3,
});

const otherList = reactive(
	AttachmentList.other?.map((item, index) => {
		const element: AttachmentData = {
			...(item as object),
			order: index,
			state: 1,
		};
		return element;
	})
);
otherList.push({
	order: otherList.length,
	state: 3,
});
// FIXME:
// 判斷總共有幾個attachment 並對個別attachment宣告一個state去切換該用review state 或是 edit state 或是 create state
// 方法：api讀進來，如果後端沒有宣告state的話跑回圈並對每個attachment新增 { state: 1 or 2 or 3 or 4 }
// 目前沒有api，先寫死 school 和 exam 和 other
const editToReview = (index: number, category: string) => {
	switch (category) {
		case "教學經歷":
			schoolExpList[index].state = 1;
			break;
		case "考試與檢定分數":
			examCertificateList[index].state = 1;
			break;
		case "其他有利於審查資料":
			otherList[index].state = 1;
			break;
		default:
			break;
	}
};

const reviewToEdit = (index: number, category: string) => {
	switch (category) {
		case "教學經歷":
			schoolExpList[index].state = 2;
			break;
		case "考試與檢定分數":
			examCertificateList[index].state = 2;
			break;
		case "其他有利於審查資料":
			otherList[index].state = 2;
			break;
		default:
			break;
	}
};

const editToCreate = (index: number, category: string) => {
	switch (category) {
		case "教學經歷":
			schoolExpList[index].state = 3;
			break;
		case "考試與檢定分數":
			examCertificateList[index].state = 3;
			break;
		case "其他有利於審查資料":
			otherList[index].state = 3;
			break;
		default:
			break;
	}
};

const createToEdit = (index: number, category: string) => {
	switch (category) {
		case "教學經歷":
			schoolExpList[index].state = 4;
			break;
		case "考試與檢定分數":
			examCertificateList[index].state = 4;
			break;
		case "其他有利於審查資料":
			otherList[index].state = 4;
			break;
		default:
			break;
	}
};
</script>
