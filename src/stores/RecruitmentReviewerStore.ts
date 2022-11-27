import { RecruitmentReviewerProgramListResponse } from "@/api/recruitment/reviewer/types";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useGlobalStore = defineStore("global", () => {
	const recruitmentReviewerProgram =
		ref<RecruitmentReviewerProgramListResponse>();

	const updaterecruitmentReviewerProgramData = (
		newProgram: RecruitmentReviewerProgramListResponse
	) => {
		recruitmentReviewerProgram.value = newProgram;
	};

	return {
		recruitmentReviewerProgram,
		updaterecruitmentReviewerProgramData,
	};
});
