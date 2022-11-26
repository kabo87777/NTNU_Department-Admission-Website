<template>
	<div>
		<div class="font-[500] text-[32px] font-bold">
			{{ $t("補交文件系統") }}
		</div>
		<div class="bigYellowDivider"></div>

		<!-- 畫面顯示(開放補件時) -->
		<div v-if="isEnabled" class="px-12px py-24px">
			<div class="text-[24px] font-[50] font-bold">
				{{ $t("補交文件") }}
			</div>
			<div v-for="(item, index) in proceedList" :key="index">
				<ReviewState
					v-if="item.state === 1"
					category="補交文件"
					identity="admissionApplicant"
					:itemId="item.id"
					:itemName="item.name"
					:fileUrl="item.filepath?.url"
					:order="index + 1"
					:isDeleteLoading="isLoading.delete"
					@edit="reviewToEdit"
				/>
				<CorrectionState
					v-else-if="item.state === 2"
					category="補交文件"
					identity="admissionApplicant"
					:isEditLoading="isLoading.edit"
					:itemId="item.id"
					:itemName="item.name"
					:order="index + 1"
					@cancel="editToReview"
				/>
				<CreateState
					v-else-if="item.state === 3"
					category="補交文件"
					identity="admissionApplicant"
					:order="index + 1"
					@edit="createToEdit"
				/>
				<EditState
					v-else-if="item.state === 4"
					category="補交文件"
					identity="admissionApplicant"
					:isCreateLoading="isLoading.create"
					:order="index + 1"
					@cancel="editToCreate"
				/>
			</div>
		</div>

		<!-- 畫面顯示(未開放補件時) -->
		<div v-else class="relative h-150">
			<div class="recruitmentAdditionNoData">
				<img
					src="/assets/admissionApplicant/Newsletter.png"
					alt="NO DATA"
					style="border-radius: 50%"
				/>
				<div class="text-center font-bold text-[24px] text-[#736028]">
					{{ $t("暫未開放補件") }}
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { InvalidSessionError } from "@/api/error";
import ReviewState from "@/components/attachmentStates/reviewState.vue";
import EditState from "@/components/attachmentStates/editState.vue";
import CreateState from "@/components/attachmentStates/createState.vue";
import CorrectionState from "@/components/attachmentStates/CorrectionState.vue";
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

const toast = useToast();

const isEnabled = ref(false);

const isLoading = reactive({
	delete: false,
	create: false,
	edit: false,
	fetch: false,
});

const additionalList: AttachmentData[] = reactive([]);
const proceedList: AttachmentDetailData[] = reactive([]);

const editToReview = (index: number) => {
	proceedList[index].state = 1;
};

const reviewToEdit = (index: number) => {
	proceedList[index].state = 2;
};

const editToCreate = (index: number, category: string) => {
	proceedList[index].state = 3;
};

const createToEdit = (index: number, category: string) => {
	proceedList[index].state = 4;
};
</script>

<style setup lang="css">
.recruitmentAdditionNoData {
	position: absolute;
	left: 50%;
	top: 63%;
	transform: translate(-50%, -50%);
	height: 400px;
	width: 500px;
}
</style>
