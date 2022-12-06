import { defineStore } from "pinia";
import { AdmissionApplicantAuthResponse } from "@/api/admission/applicant/types";

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
	docs_order: 0,
	oral_order: 0,
	file: null,
	docs_stage: null,
	oral_stage: null,
	isMoredoc: false,
	moredoc_category: "",
	moredoc_name: "",
	created_at: "",
	updated_at: "",
	s_program_id: 0,
	application_stage: null,
};

export const useUserInfoStore = defineStore({
	id: "userInfo",
	state: () => ({
		userInfo: info,
	}),
	getters: {},
	actions: {
		saveUserInfo(userInfo: AdmissionApplicantAuthResponse = info) {
			this.userInfo = userInfo;
		},
	},
});
