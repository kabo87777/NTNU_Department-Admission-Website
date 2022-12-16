import { defineStore } from "pinia";
import { AdmissionManagerAuthResponse } from "@/api/admission/admin/types";
import { ref } from "vue";

export const useAdminInfoStore = defineStore("adminInfo", ()=>{
	const userInfo = ref<AdmissionManagerAuthResponse>({
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
	})

	const saveUserInfo=(data: AdmissionManagerAuthResponse)=>{
		userInfo.value=data
	}

	return{ userInfo, saveUserInfo}
})