import { defineStore } from "pinia";
import { RecruitmentApplicantAuthResponse } from "@/api/recruitment/applicant/types";

const info = {
	email: "",
	provider: "",
	uid: "",
	id: 0,
	allow_password_change: true,
	isInit: false,
	lang: "",
	name: "",
	nickname: "",
	image: null,
};

export const useProjectIdStore = defineStore({
	id: "pid",
	state: () => ({
		pid: 0,
	}),
	getters: {},
	actions: {
		switchPid(pid: number) {
			this.pid = pid;
		},
	},
});

export const useUserInfoStore = defineStore({
	id: "userInfo",
	state: () => ({
		userInfo: info,
	}),
	getters: {},
	actions: {
		saveUserInfo(userInfo: RecruitmentApplicantAuthResponse = info) {
			this.userInfo = userInfo;
		},
	},
});
