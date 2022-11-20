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
	id: "project",
	state: () => ({
		project: {
			pid: 0,
			category: "",
			name: "",
		},
	}),
	getters: {},
	actions: {
		switchProject(project: any) {
			this.project.pid = project.pid;
			this.project.category = project.category;
			this.project.name = project.name;
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
