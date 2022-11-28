<template>
	<div>
		<div class="font-[500] text-[32px] font-bold">
			{{ $t("補交文件系統") }}
		</div>
		<div class="bigYellowDivider"></div>

		<!-- 畫面顯示(開放補件時) -->
		<div v-if="isEnabled" class="px-12px py-24px">
			<div class="px-12px py-24px">
				<div class="text-[24px] font-[50] font-bold">
					{{ $t("補件需求") }}
				</div>
				<div class="mt-16px mb-32px pt-16px text-20px text-[#53565A]">
					{{ $t("需求需求需求需求") }}
				</div>
				<ParagraphDivider />
				<div class="mt-16px text-[24px] font-[50] font-bold">
					{{ $t("補交文件") }}
				</div>
			</div>
			<div v-for="(item, index) in proceedList" :key="index">
				<CreateState
					v-if="item.state === 3"
					category="補交文件"
					identity="admissionApplicant"
					:order="index + 1"
					@edit="createToEdit"
				/>
				<!-- <RefillState
					v-else-if="item.state === 4"
					identity="admissionApplicant"
					:isUploadLoading="isLoading.upload"
					:order="index + 1"
					@cancel="editToCreate"
					@upload="handleUpload"
				/> -->
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
import { ref, reactive, onMounted, toRaw, watch } from "vue";
import { InvalidSessionError } from "@/api/error";
import CreateState from "@/components/attachmentStates/createState.vue";
import ParagraphDivider from "@/styles/paragraphDividerApplicant.vue";
import RefillState from "@/components/attachmentStates/RefillState.vue";
import {
	AttachmentData,
	AttachmentDetailData,
} from "@/api/admission/applicant/types";
import { useAdmissionApplicantAuthStore } from "@/stores/universalAuth";
import { AdmissionApplicantAPI } from "@/api/admission/applicant/api";
import { useProjectIdStore } from "@/stores/RecruitmentApplicantStore";
import { useToast } from "primevue/usetoast";

const applicantAuth = useAdmissionApplicantAuthStore();
const api = new AdmissionApplicantAPI(applicantAuth);
const project = useProjectIdStore();

const toast = useToast();

const isEnabled = ref(true);

const isLoading = reactive({
	upload: false,
	fetch: false,
});

const fetchResponse = reactive({
	success: false,
	message: "" as string | [],
});

const fileList: AttachmentData[] = reactive([]);
const proceedList: AttachmentDetailData[] = reactive([]);

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
