import {
	AdmissionReviewerProgramListResponse,
	AdmissionReviewerAuthResponse,
} from "@/api/admission/reviewer/types";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useGlobalStore = defineStore("globalAdmissionReviewer", () => {
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
		saveUserInfo(userInfo: AdmissionReviewerAuthResponse = info) {
			this.userInfo = userInfo;
		},
	},
});
