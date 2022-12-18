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
			<div v-for="(item, index) in teachingExpList" :key="index">
				<ReviewState
					v-if="item.state === 1"
					category="教學經歷"
					identity="admissionApplicant"
					:itemId="item.id"
					:itemName="item.name"
					:schoolName="item.school"
					:fileUrl="item.filepath?.url"
					:order="index + 1"
					:isDeleteLoading="isLoading.delete"
					@edit="reviewToEdit"
					@delete="handleDelete"
				/>
				<CorrectionState
					v-else-if="item.state === 2"
					category="教學經歷"
					identity="admissionApplicant"
					:itemId="item.id"
					:itemName="item.name"
					:schoolName="item.school"
					:fileUrl="item.filepath?.url"
					:order="index + 1"
					:isEditLoading="isLoading.edit"
					@cancel="editToReview"
					@correction="handleEdit"
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
					:isCreateLoading="isLoading.create"
					:order="index + 1"
					@cancel="editToCreate"
					@create="handleCreate"
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
					:itemId="item.id"
					:itemName="item.name"
					:score="item.score"
					:fileUrl="item.filepath?.url"
					:order="index + 1"
					:isDeleteLoading="isLoading.delete"
					@edit="reviewToEdit"
					@delete="handleDelete"
				/>
				<CorrectionState
					v-else-if="item.state === 2"
					category="考試與檢定分數"
					identity="admissionApplicant"
					:itemId="item.id"
					:itemName="item.name"
					:score="item.score"
					:fileUrl="item.filepath?.url"
					:order="index + 1"
					:isEditLoading="isLoading.edit"
					@cancel="editToReview"
					@correction="handleEdit"
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
					:isCreateLoading="isLoading.create"
					:order="index + 1"
					@cancel="editToCreate"
					@create="handleCreate"
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
					:itemId="item.id"
					:itemName="item.name"
					:fileUrl="item.filepath?.url"
					:order="index + 1"
					:isDeleteLoading="isLoading.delete"
					@edit="reviewToEdit"
					@delete="handleDelete"
				/>
				<CorrectionState
					v-else-if="item.state === 2"
					category="其他有利於審查資料"
					identity="admissionApplicant"
					:isEditLoading="isLoading.edit"
					:itemId="item.id"
					:itemName="item.name"
					:fileUrl="item.filepath?.url"
					:order="index + 1"
					@cancel="editToReview"
					@correction="handleEdit"
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
					:isCreateLoading="isLoading.create"
					:order="index + 1"
					@cancel="editToCreate"
					@create="handleCreate"
				/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive, toRaw, watch } from "vue";
import { useQuery } from "@tanstack/vue-query";
import ReviewState from "@/components/attachmentStates/reviewState.vue";
import EditState from "@/components/attachmentStates/editState.vue";
import CreateState from "@/components/attachmentStates/createState.vue";
import CorrectionState from "@/components/attachmentStates/CorrectionState.vue";
import ParagraphDivider from "@/styles/paragraphDividerApplicant.vue";
import {
	AttachmentData,
	AttachmentDetailData,
} from "@/api/recruitment/applicant/types";
import { useRecruitmentApplicantAuthStore } from "@/stores/universalAuth";
import { RecruitmentApplicantAPI } from "@/api/recruitment/applicant/api";
import { useProjectIdStore } from "@/stores/RecruitmentApplicantStore";
import { useToast } from "primevue/usetoast";

const applicantAuth = useRecruitmentApplicantAuthStore();
const api = new RecruitmentApplicantAPI(applicantAuth);
const project = useProjectIdStore();

let attachmentList: AttachmentData[] = reactive([]);
let teachingExpList: AttachmentDetailData[] = reactive([]);
let examCertificateList: AttachmentDetailData[] = reactive([]);
let otherList: AttachmentDetailData[] = reactive([]);

const toast = useToast();

const requiredInputFields = ref("");

let isLoading = reactive({
	delete: false,
	create: false,
	edit: false,
	fetch: false,
});

let fetchResponse = reactive({
	success: false,
	message: "" as string | [],
});

const editToReview = (index: number, category: string) => {
	switch (category) {
		case "教學經歷":
			teachingExpList[index].state = 1;
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
			teachingExpList[index].state = 2;
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
			teachingExpList[index].state = 3;
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
			teachingExpList[index].state = 4;
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

const deleteFile = async (fileId: number) => {
	return await api.deleteFile(project.project.pid, fileId);
};

const createFile = async (body: object) => {
	return await api.createFile(project.project.pid, body);
};

const editFile = async (body: object, fileId: number) => {
	return await api.editFile(body, project.project.pid, fileId);
};

const handleDelete = async (fileId: number) => {
	isLoading.delete = true;

	const res = await deleteFile(fileId);

	if (res?.success !== undefined && res?.message !== undefined) {
		fetchResponse.success = toRaw(res.success);
		fetchResponse.message = toRaw(res.message);
	}

	isLoading.delete = false;
	isLoading.fetch = true;

	if (fetchResponse.success) {
		toast.add({
			severity: "success",
			summary: "Success",
			detail: fetchResponse.message,
			life: 3000,
		});
	} else {
		toast.add({
			severity: "error",
			summary: "Error",
			detail: fetchResponse.message,
			life: 5000,
		});
	}

	isLoading.fetch = true;
};

const handleCreate = async (body: object) => {
	isLoading.create = true;

	const res = await createFile(body);

	if (res?.success !== undefined && res?.message !== undefined) {
		fetchResponse.success = toRaw(res.success);
		fetchResponse.message = toRaw(res.message);
	}

	isLoading.create = false;
	isLoading.fetch = true;

	if (fetchResponse.success) {
		toast.add({
			severity: "success",
			summary: "Success",
			detail: fetchResponse.message,
			life: 3000,
		});
	} else {
		toast.add({
			severity: "error",
			summary: "Error",
			detail: fetchResponse.message,
			life: 5000,
		});
	}

	isLoading.fetch = true;
};

const handleEdit = async (body: object, fileId: number) => {
	isLoading.edit = true;

	const res = await editFile(body, fileId);

	if (res?.success !== undefined && res?.message !== undefined) {
		fetchResponse.success = toRaw(res.success);
		fetchResponse.message = toRaw(res.message);
	}

	isLoading.edit = false;
	isLoading.fetch = true;

	if (fetchResponse.success) {
		toast.add({
			severity: "success",
			summary: "Success",
			detail: fetchResponse.message,
			life: 3000,
		});
	} else {
		toast.add({
			severity: "error",
			summary: "Error",
			detail: fetchResponse.message,
			life: 5000,
		});
	}

	isLoading.fetch = true;
};

const splitThreeList = async (fullList: AttachmentData[]) => {
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

	teachingExpList.push({
		order: teachingExpList.length,
		state: 3,
	});

	examCertificateList.push({
		order: examCertificateList.length,
		state: 3,
	});

	otherList.push({
		order: otherList.length,
		state: 3,
	});
};

const clearAllList = () => {
	attachmentList.splice(0, attachmentList.length);
	teachingExpList.splice(0, teachingExpList.length);
	examCertificateList.splice(0, examCertificateList.length);
	otherList.splice(0, otherList.length);
};

useQuery(
	["getRecruitmentApplicantAttachmentFileList"],
	async () => {
		return await api.getFileList(project.project.pid);
	},
	{
		onSuccess: (data) => {
			attachmentList = [...attachmentList, ...data];
			splitThreeList(toRaw(attachmentList));
		},
		onError: (data) => {
			toast.add({
				severity: "error",
				summary: "Error",
				detail: "Unable to fetch user require input",
				life: 5000,
			});
			console.log(data);
		},
	}
);

watch(
	() => isLoading.fetch,
	async () => {
		clearAllList();

		const res = await api.getFileList(project.project.pid);

		if (res) attachmentList = [...attachmentList, ...res];

		isLoading.fetch = false;

		splitThreeList(toRaw(attachmentList));
	}
);
</script>
