import { RecruitmentAdminAuthResponse } from "@/api/recruitment/admin/types";
import { defineStore } from "pinia";

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
