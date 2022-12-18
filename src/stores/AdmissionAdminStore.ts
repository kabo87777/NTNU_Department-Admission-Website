import { defineStore } from "pinia";
import { AdmissionManagerAuthResponse } from "@/api/admission/admin/types";

const info = {
	email: "",
	username: "",
	id: 0,
	provider: "",
	uid: "",
	allow_password_change: false,
	isInit: false,
	lang: "",
	name: "",
	nickname: "",
	image: null,
	created_at: "",
	updated_at: "",
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
