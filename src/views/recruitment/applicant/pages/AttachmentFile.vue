<template>
	<div>
		<!-- TITLE -->
		<div class="font-[500] text-[32px] font-bold">
			{{ $t("附件佐證") }}
		</div>
		<div class="bigYellowDivider"></div>

		<div class="px-12px pb-24px">
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
					:enableEdit="false"
					@delete="handleDelete"
				/>
				<div v-else-if="item.state === 3">
					<div class="text-20px text-[#53565A] pt-24px">
						{{ item.name }}
					</div>
					<div class="mt-[-16px]">
						<CreateState
							category="其他有利於審查資料"
							identity="admissionApplicant"
							:order="index + 1"
							@edit="createToEdit"
						/>
					</div>
				</div>
				<EditState
					v-else-if="item.state === 4"
					category="其他有利於審查資料"
					identity="admissionApplicant"
					:itemName="item.name"
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
import { ref, reactive, toRaw, watch, onMounted } from "vue";
import { useQuery } from "@tanstack/vue-query";
import ReviewState from "@/components/attachmentStates/reviewState.vue";
import EditState from "@/components/attachmentStates/editState.vue";
import CreateState from "@/components/attachmentStates/createState.vue";
import {
	AttachmentData,
	AttachmentDetailData,
} from "@/api/recruitment/applicant/types";
import { useRecruitmentApplicantAuthStore } from "@/stores/universalAuth";
import { RecruitmentApplicantAPI } from "@/api/recruitment/applicant/api";
import { useProjectIdStore } from "@/stores/RecruitmentApplicantStore";
import { useToast } from "primevue/usetoast";
import ParagraphDivider from "@/styles/paragraphDividerApplicant.vue";

const applicantAuth = useRecruitmentApplicantAuthStore();
const api = new RecruitmentApplicantAPI(applicantAuth);
const project = useProjectIdStore();

let attachmentList: AttachmentData[] = reactive([]);
let otherList: AttachmentDetailData[] = reactive([]);

const requiredAttachmentName = [
	"履歷表",
	"學位證明（博士班為國外學位者需有駐外單位驗證章）",
	"成績單（博士班為國外學位者，歷年成績單需有駐外單位驗證章）",
	"著作列表",
	"代表作及其他重要著作全文",
	"推薦函-1",
	"推薦函-2",
	"其他有利於審查資料",
	"行事曆",
];

const toast = useToast();

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

const editToCreate = (index: number, category: string) => {
	otherList[index].state = 3;
};

const createToEdit = (index: number, category: string) => {
	otherList[index].state = 4;
};

const handleDelete = async (fileId: number) => {
	isLoading.delete = true;

	const res = await api.deleteFile(project.project.pid, fileId);

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

	const res = await api.createFile(project.project.pid, body);

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

	const res = await api.editFile(body, project.project.pid, fileId);

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
			default: {
				otherList.push({
					...item,
					order: otherList.length,
					state: 1,
				});
			}
		}
	});

	otherList.push({
		order: otherList.length,
		state: 3,
	});
};

const addDetail = async (fullList: AttachmentData[]) => {
	let itemNames: string[] = [];

	requiredAttachmentName.map((item) => {
		itemNames.push(item);
	});

	fullList.map((item) => {
		otherList.push({
			...item,
			order: otherList.length,
			state: 1,
		});

		if (itemNames.includes(item.name)) {
			const index = itemNames.indexOf(item.name);
			itemNames.splice(index, 1);
		}
	});

	itemNames.map((item) => {
		otherList.push({
			name: item,
			order: otherList.length,
			state: 3,
		});
	});
};

const clearAllList = () => {
	attachmentList.splice(0, attachmentList.length);
	otherList.splice(0, otherList.length);
};

onMounted(async () => {
	const res = await api.getFileList(project.project.pid);

	clearAllList();
	attachmentList = [...attachmentList, ...res];
	addDetail(toRaw(attachmentList));
});

watch(
	() => isLoading.fetch,
	async () => {
		clearAllList();
		console.log("check watch");
		const res = await api.getFileList(project.project.pid);

		if (res) attachmentList = [...attachmentList, ...res];

		isLoading.fetch = false;

		addDetail(toRaw(attachmentList));
	}
);
</script>
