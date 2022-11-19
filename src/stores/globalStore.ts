import { AdmissionAdminProgramListResponse } from "@/api/admission/admin/types";
import { AdmissionReviewerProgramListResponse } from "@/api/admission/reviewer/types";
import { defineStore } from "pinia";
import { Ref, ref } from "vue";

export const useGlobalStore = defineStore("global", () => {
	const program = ref<AdmissionAdminProgramListResponse>();
	const admissionReviewerProgram =
		ref<AdmissionReviewerProgramListResponse>();

	const updateProgramData = (
		newProgram: AdmissionAdminProgramListResponse
	) => {
		program.value = newProgram;
	};

	const updateadmissionReviewerProgramData = (
		newProgram: AdmissionReviewerProgramListResponse
	) => {
		admissionReviewerProgram.value = newProgram;
	};

	return {
		program,
		updateProgramData,
		admissionReviewerProgram,
		updateadmissionReviewerProgramData,
	};
});
