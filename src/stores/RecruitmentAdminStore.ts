import { RecruitmentAdminProgramListResponse } from "@/api/recruitment/admin/types";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useGlobalStore = defineStore("global", () => {
	const program = ref<RecruitmentAdminProgramListResponse>();

	const updateProgramData = (
		newProgram: RecruitmentAdminProgramListResponse
	) => {
		program.value = newProgram;
	};

	return {
		program,
		updateProgramData,
	};
});
