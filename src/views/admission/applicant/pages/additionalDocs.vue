<template>
	<div>
		<!-- 畫面顯示(開放補件時) -->
		<div v-if="isEnabled" class="px-12px py-24px">
			<div class="font-[500] text-[32px] font-bold">
				{{ $t("補交文件系統") }}
			</div>
			<div class="bigYellowDivider"></div>
			<div v-if="isEnabled" class="px-12px">
				<div>
					<CreateState
						v-if="refillFile.state === 3"
						category="補交文件"
						identity="admissionApplicant"
						@edit="createToEdit"
					/>
					<RefillState
						v-else-if="refillFile.state === 4"
						identity="admissionApplicant"
						:isUploadLoading="refillFile.loading"
						@cancel="editToCreate"
						@upload="handleUpload"
					/>
				</div>
			</div>
		</div>

		<!-- 畫面顯示(未開放補件時) -->
		<div v-else class="relative h-150">
			<div class="admissionAdditionNoData">
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
import { AdmissionApplicantAuthResponse } from "@/api/admission/applicant/types";
import { useUserInfoStore } from "@/stores/AdmissionApplicantStore";
import CreateState from "@/components/attachmentStates/createState.vue";
import ParagraphDivider from "@/styles/paragraphDividerApplicant.vue";
import RefillState from "@/components/attachmentStates/RefillState.vue";
import {
	AttachmentData,
	AttachmentDetailData,
} from "@/api/admission/applicant/types";
import { useAdmissionApplicantAuthStore } from "@/stores/universalAuth";
import { AdmissionApplicantAPI } from "@/api/admission/applicant/api";
import { useToast } from "primevue/usetoast";

const applicantAuth = useAdmissionApplicantAuthStore();
const applicantStore = useUserInfoStore();
const api = new AdmissionApplicantAPI(applicantAuth);
// const project = useProjectIdStore();

const applicantInfo: AdmissionApplicantAuthResponse = toRaw(
	applicantStore.userInfo
);

const toast = useToast();

const isEnabled = applicantInfo.isMoredoc;

let refillFile = reactive({
	state: 3,
	loading: false,
	order: 1,
});

let fetchResponse = reactive({
	success: false,
	message: "" as string | [],
});

const editToCreate = () => {
	refillFile.state = 3;
};

const createToEdit = () => {
	refillFile.state = 4;
};

const handleUpload = async (body: object) => {
	refillFile.loading = true;

	const res = await api.uploadRefillFile(body);

	if (res?.success !== undefined && res?.message !== undefined) {
		fetchResponse.success = toRaw(res.success);
		fetchResponse.message = toRaw(res.message);
	}

	refillFile.loading = false;

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
};
</script>

<style setup lang="css">
.admissionAdditionNoData {
	position: absolute;
	left: 50%;
	top: 63%;
	transform: translate(-50%, -50%);
	height: 400px;
	width: 500px;
}
</style>
