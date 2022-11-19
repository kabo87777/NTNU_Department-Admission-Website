<template>
	<div class="mt-16px pl-8px pr-8px">
		<!-- TITLE -->
		<div class="mt-16px text-24px font-medium">{{ $t("就學經歷") }}</div>
		<div class="mt-32px"></div>

		<!-- SCHOOL EXPERIENCE -->
		<div v-for="(item, index) in schoolExpList" :key="index">
			<ReviewState
				v-if="item.state === 1"
				category="就學經歷"
				identity="admissionManager"
				:itemName="item.name"
				:order="index + 1"
				@edit="reviewToEdit"
			/>
			<EditState
				v-else-if="item.state === 2"
				category="就學經歷"
				identity="admissionManager"
				:itemName="item.name"
				:order="index + 1"
				@cancel="editToReview"
			/>
			<CreateState
				v-else-if="item.state === 3"
				category="就學經歷"
				identity="admissionManager"
				:order="index + 1"
				@edit="createToEdit"
			/>
			<EditState
				v-else-if="item.state === 4"
				category="就學經歷"
				identity="admissionManager"
				:order="index + 1"
				@cancel="editToCreate"
			/>
		</div>

		<!-- DIVIDER -->
		<ParagraphDivider />

		<!-- TITLE -->
		<div class="mt-24px text-24px font-medium">
			{{ $t("考試與檢定分數") }}
		</div>
		<div class="mt-32px"></div>

		<!-- EXAM AND QUALIFICATION TEST SCORE -->
		<div v-for="(item, index) in examCertificateList" :key="index">
			<ReviewState
				v-if="item.state === 1"
				category="考試與檢定分數"
				identity="admissionManager"
				:itemName="item.name"
				:order="index + 1"
				@edit="reviewToEdit"
			/>
			<EditState
				v-else-if="item.state === 2"
				category="考試與檢定分數"
				identity="admissionManager"
				:itemName="item.name"
				:order="index + 1"
				@cancel="editToReview"
			/>
			<CreateState
				v-else-if="item.state === 3"
				category="考試與檢定分數"
				identity="admissionManager"
				:order="index + 1"
				@edit="createToEdit"
			/>
			<EditState
				v-else-if="item.state === 4"
				category="考試與檢定分數"
				identity="admissionManager"
				:order="index + 1"
				@cancel="editToCreate"
			/>
		</div>

		<!-- DIVIDER -->
		<ParagraphDivider />

		<!-- TITLE -->
		<div class="mt-24px text-24px font-medium">
			{{ $t("其他有利於審查資料") }}
		</div>
		<div class="mt-32px"></div>

		<!-- OTHER -->
		<div v-for="(item, index) in otherList" :key="index">
			<ReviewState
				v-if="item.state === 1"
				category="其他有利於審查資料"
				identity="admissionManager"
				:itemName="item.name"
				:order="index + 1"
				@edit="reviewToEdit"
			/>
			<EditState
				v-else-if="item.state === 2"
				category="其他有利於審查資料"
				identity="admissionManager"
				:itemName="item.name"
				:order="index + 1"
				@cancel="editToReview"
			/>
			<CreateState
				v-else-if="item.state === 3"
				category="其他有利於審查資料"
				identity="admissionManager"
				:order="index + 1"
				@edit="createToEdit"
			/>
			<EditState
				v-else-if="item.state === 4"
				category="其他有利於審查資料"
				identity="admissionManager"
				:order="index + 1"
				@cancel="editToCreate"
			/>
		</div>

		<!-- DIVIDER -->
		<ParagraphDivider />

		<div class="mt-32px"></div>
	</div>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import ReviewState from "@/components/attachmentStates/ReviewState.vue";
import EditState from "@/components/attachmentStates/EditState.vue";
import CreateState from "@/components/attachmentStates/CreateState.vue";
import ParagraphDivider from "@/styles/paragraphDivider.vue";
import "primeicons/primeicons.css";
import AttachmentList from "./attachmentList.json";

interface BasicData {
	name?: string;
	file_name?: string;
	file_url?: string;
	order?: number;
	state?: number;
}

const props = defineProps(["userId"]);
console.log(props.userId, "attachment info tab");

const schoolExpList = reactive(
	AttachmentList.school_exp?.map((item, index) => {
		const element: BasicData = {
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
	AttachmentList.exam_score?.map((item, index) => {
		const element: BasicData = {
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
		const element: BasicData = {
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
/* 判斷總共有幾個attachment 並對個別attachment宣告一個state去切換該用review state 或是 edit state 或是 create state */
/* 方法：api讀進來，如果後端沒有宣告state的話跑回圈並對每個attachment新增 { state: 1 or 2 or 3 or 4 } */
/* 目前沒有api，先寫死 school 和 exam 和 other */
const editToReview = (index: number, category: string) => {
	switch (category) {
		case "就學經歷":
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
		case "就學經歷":
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
		case "就學經歷":
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
		case "就學經歷":
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
