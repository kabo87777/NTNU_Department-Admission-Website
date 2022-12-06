import { AdmissionAdminProgramListResponse } from "@/api/admission/admin/types";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useGlobalStore = defineStore("global", () => {
	const program = ref<AdmissionAdminProgramListResponse>();

	const updateProgramData = (
		newProgram: AdmissionAdminProgramListResponse
	) => {
		program.value = newProgram;
	};

	return {
		program,
		updateProgramData,
	};
});
