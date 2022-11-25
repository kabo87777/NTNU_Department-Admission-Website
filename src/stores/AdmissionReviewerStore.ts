import { defineStore } from "pinia";
import { AdmissionManagerAuthResponse } from "@/api/admission/reviewer/types";

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
		saveUserInfo(userInfo: AdmissionManagerAuthResponse = info) {
			this.userInfo = userInfo;
		},
	},
});
