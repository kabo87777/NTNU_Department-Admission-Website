<template>
	<div>
		<div class="font-[500] text-[32px] font-bold">
			{{ $t("補件文件系統") }}
		</div>
		<div class="bigYellowDivider"></div>
		<!-- SCHOOL EXPERIENCE -->
		<div class="px-12px py-24px">
			<div class="text-[24px] font-[50] font-bold">
				{{ $t("補件需求") }}
			</div>
			<div class="mt-16px mb-32px pt-16px text-20px text-[#53565A]">
				{{ $t("需求需求需求需求") }}
			</div>
			<ParagraphDivider />
			<div class="mt-16px text-[24px] font-[50] font-bold">
				{{ $t("提交內容") }}
			</div>
			<div class="mt-24px">
				<div class="w-1/3">
					<div class="text-20px">{{ $t("提交文字") }}：</div>
					<InputText
						type="text"
						v-model="submitText"
						placeholder="Text"
						class="!border-gray-900 !w-300px !h-40px !mt-5px"
					/>
				</div>
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
		<div>
			<div></div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { toRaw, ref, reactive, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useToast } from "primevue/usetoast";
import { useAdmissionApplicantAuthStore } from "@/stores/universalAuth";
import { AdmissionApplicantAPI } from "@/api/admission/applicant/api";
import { useQuery } from "@tanstack/vue-query";
import { useRouter } from "vue-router";
import ReviewState from "@/components/attachmentStates/reviewState.vue";
import EditState from "@/components/attachmentStates/editState.vue";
import CreateState from "@/components/attachmentStates/createState.vue";
import ParagraphDivider from "@/styles/paragraphDividerApplicant.vue";
import { AttachmentData } from "@/api/recruitment/applicant/types";
import { useRecruitmentApplicantAuthStore } from "@/stores/universalAuth";
import { RecruitmentApplicantAPI } from "@/api/recruitment/applicant/api";
import { useProjectIdStore } from "@/stores/RecruitmentApplicantStore";
import { InvalidSessionError } from "@/api/error";
import AttachmentList from "@/mocks/attachmentList.json";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import FileUpload from "primevue/fileupload";
import "primeicons/primeicons.css";

const router = useRouter();
const applicantAuth = useRecruitmentApplicantAuthStore();
const api = new RecruitmentApplicantAPI(applicantAuth);
const project = useProjectIdStore();

const submitText = ref();

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

<style setup lang="css">
.recTableTitleCol {
	width: 23%;
	text-align: center;
}

.recTableRowIncollapse {
	position: relative;
	display: flex;
	height: 80px;
	margin-top: 16px;
	background-color: rgba(236, 236, 235, 1);
	border-radius: 8px;
	border: 2px solid rgb(204, 204, 204);
	font-weight: bold;
}

.recTableRowCollapse {
	margin-top: 16px;
	padding-bottom: 28px;
	background-color: rgba(236, 236, 235, 1);
	border-radius: 8px;
	border: 2px solid rgb(204, 204, 204);
}

.recTableRowCollapseItem {
	position: relative;
	display: flex;
}

.recTableSemiCol {
	width: 50%;
	padding-left: 5%;
	margin-top: 36px;
}

.recTableCol {
	width: 23%;
	text-align: center;
	padding-top: 24px;
}

.recTableButtonCol {
	width: 23%;
	text-align: center;
	margin-top: 16px;
}

.collapseIcon {
	position: absolute;
	right: 24px;
	margin-top: 26px;
}

.collapseIcon:hover {
	cursor: pointer;
	color: rgba(0, 0, 0, 0.5);
}

.recNoData {
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	height: 400px;
	width: 500px;
}
</style>
