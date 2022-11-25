import { defineStore } from "pinia";
import { RecruitmentManagerAuthResponse } from "@/api/recruitment/reviewer/types";

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
