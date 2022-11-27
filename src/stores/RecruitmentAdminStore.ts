
import { RecruitmentAdminAuthResponse, RecruitmentAdminProgramListResponse } from "@/api/recruitment/admin/types";
import { defineStore } from "pinia";
import { ref } from "vue";
const info = {
	email: "",
	provider: "",
	uid: "",
	id: 1,
	allow_password_change: false,
	isInit: false,
	lang: "",
	name: "",
	nickname: "",
	image: null,
	created_at: "",
	updated_at: "",
};
export const useAdminInfoStore = defineStore({
	id: "userInfo",
	state: () => ({
		userInfo: info,
	}),
	getters: {},
	actions: {
		saveUserInfo(userInfo: RecruitmentAdminAuthResponse = info) {
			this.userInfo = userInfo;
		},
	},
});
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
