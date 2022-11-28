import {
	RecruitmentReviewerProgramListResponse,
	RecruitmentManagerAuthResponse,
} from "@/api/recruitment/reviewer/types";
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

const info = {
	email: "",
	provider: "",
	uid: "",
	id: 0,
	allow_password_change: false,
	isInit: false,
	lang: "",
	name: "",
	nickname: "",
	image: null,
};

export const useUserInfoStore = defineStore({
	id: "userInfo",
	state: () => ({
		userInfo: info,
	}),
	getters: {},
	actions: {
		saveUserInfo(userInfo: RecruitmentManagerAuthResponse = info) {
			this.userInfo = userInfo;
		},
	},
});
