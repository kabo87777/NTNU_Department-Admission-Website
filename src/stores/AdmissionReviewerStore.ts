import { AdmissionReviewerProgramListResponse } from "@/api/admission/reviewer/types";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useGlobalStore = defineStore("global", () => {
	const admissionReviewerProgram =
		ref<AdmissionReviewerProgramListResponse>();

	const updateadmissionReviewerProgramData = (
		newProgram: AdmissionReviewerProgramListResponse
	) => {
		admissionReviewerProgram.value = newProgram;
	};

	return {
		admissionReviewerProgram,
		updateadmissionReviewerProgramData,
	};
});
