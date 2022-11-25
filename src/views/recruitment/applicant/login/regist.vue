<template class="overflow-hidden">
	<div class="flex">
		<div class="flex-shrink-1">
			<img src="/assets/login-page/Login-img.png" class="fill" />
		</div>
		<div class="flex-none w-150 px-6 pt-18 space-y-8">
			<router-link to="/recruitment/applicant/signin">
				<button
					class="flex items-center gap-2 px-2 py-2"
					bg="transparent hover:gray-100"
					text="sm gray-400 hover:gray-600"
					border="rounded"
				>
					<div class="pi pi-angle-left" />
					<div>返回登入頁面</div>
					<div>Back to Login</div>
				</button>
			</router-link>
			<div class="px-8 space-y-2">
				<div class="text-s text-gray-500">
					國立台灣師範大學資訊工程學系 NTNU CSIE
				</div>
				<div class="flex items-end gap-2 font-medium text-gray-900">
					<div class="text-4xl">教師聘請系統</div>
					<div class="text-xl">Teacher Recruitment System</div>
				</div>
			</div>
			<div class="px-8 py-4 space-y-4">
				<div class="flex items-center gap-2 applicantTextColor">
					<i class="pi pi-circle" style="font-size: 0.5rem" />
					<div class="flex-none font-medium">申請端註冊</div>
					<div class="flex-none font-medium">Applicant Register</div>
					<Divider />
				</div>
				<div class="flex-col px-4 py-8">
					<div
						class="flex items-center gap-2 pb-2"
						text="sm gray-500"
					>
						<div>設置電郵</div>
						<div>Seting E-mail</div>
					</div>
					<InputText
						name="email"
						type="email"
						v-model="userRegistData.email"
						class="p-inputtext-sm w-full"
						required
					/>
				</div>
				<div class="flex-col px-4">
					<div
						class="flex items-center gap-2 pb-2"
						text="sm gray-500"
					>
						<div>設置密碼</div>
						<div>Setting Password</div>
					</div>
					<InputText
						name="password"
						type="password"
						v-model="userRegistData.password"
						class="p-inputtext-sm w-full"
						required
					/>
				</div>
				<div class="flex-col px-4">
					<div
						class="flex items-center gap-2 pb-2"
						text="sm gray-500"
					>
						<div>確認密碼</div>
						<div>Confirm Password</div>
					</div>
					<InputText
						name="password"
						type="password"
						v-model="userRegistData.password_confirmation"
						class="p-inputtext-sm w-full"
						required
					/>
				</div>
			</div>
			<div class="flex-col-inline px-4 gap-y-8">
				<div class="flex justify-center">
					<router-link to="/recruitment/applicant/regist/done">
						<button
							class="py-2 w-80 applicantButtonStyle"
							border="2  rounded-lg"
							@click="postEmailRegister"
						>
							<div class="flex justify-center gap-2 mx-auto">
								<div>註冊</div>
								<div>Register</div>
							</div>
						</button>
					</router-link>
				</div>
				<div></div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useQuery, useMutation } from "@tanstack/vue-query";
import { RecruitmentApplicantAPI } from "@/api/recruitment/applicant/api";
import { useRecruitmentApplicantAuthStore } from "@/stores/universalAuth";
import InputText from "primevue/inputtext";
import axios from "axios";
import ApplicantUploadedDocs from "@/views/admission/manager/applicantsUploadList/applicantUploadedDocs.vue";
import { useRouter } from "vue-router";
import { InvalidSessionError } from "@/api/error";
import type { newPostEmailRegister } from "@/api/recruitment/applicant/types";
import Button from "primevue/button";
import { ref } from "vue";
import type { TurnstileComponentExposes } from "@/components/Turnstile.vue";
import Turnstile from "@/components/Turnstile.vue";

const applicantAuth = useRecruitmentApplicantAuthStore();
const router = useRouter();
const authStore = useRecruitmentApplicantAuthStore();
const api = new RecruitmentApplicantAPI(applicantAuth);
const turnstileRef = ref<TurnstileComponentExposes>();

const consumeTurnstileToken = () => {
	const token: string | undefined = turnstileRef.value?.turnstileToken;
	window.turnstile?.reset();
	return token;
};
const postEmailRegister = async () => {
	try {
		const redirectUrl =
			"http://127.0.0.1:5173/recruitment/applicant/regist";
		const turnstileResponse = consumeTurnstileToken();
		if (!turnstileResponse) throw new Error("Turnstile challenge failed");
		const api = new RecruitmentApplicantAPI(authStore);
		return await api.sendPostEmailRegister({
			email: userRegistData.email,
			redirect_url: redirectUrl,
			password: userRegistData.password,
			"cf-turnstile-response": turnstileResponse,
		});
	} catch (error) {
		// TODO: show error message
		console.log(error);
	}
};

const userRegistData: newPostEmailRegister = reactive({
	email: "",
	name: "",
	confirm_success_url: "",
	password: "",
	password_confirmation: "",
});
// function buttonOnclick() {
// 	const errorMessage = mutation;
// 	errorMessage.error;
// }

// const mutation = useMutation(["postEmailRegister"], async () => {
// 	try {
// 		return await api.postEmailRegister(userRegistData); //important!!!
// 		//return axios.post("/todos", newEmailRegister);
// 	} catch (e: any) {
// 		if (e instanceof InvalidSessionError) {
// 			// FIXME: show session expiry notification??
// 			// Why are we even here in the first place?
// 			// MainContainer should have checked already.
// 			console.error(
// 				"Session has already expired while querying programList"
// 			);
// 			console.log(e);
// 			return;
// 		}
// 	}
// });

// const password = reactive({
// 	notMatch: false,
// 	isCurrentPassBlank: false,
// });

// const resetPassValue = () => {
// 	password.notMatch = false;
// };

// const handleSubmit = async () => {
// 	if (userRegistData.password === "") {
// 		password.isCurrentPassBlank = true;
// 	} else {
// 		password.isCurrentPassBlank = false;
// 	}

// 	if (userRegistData.password !== userRegistData.password_confirmation) {
// 		password.notMatch = true;
// 	} else {
// 		password.notMatch = false;
// 	}

// 		const response = mutation.mutate();
// 		const errorMsg = mutation.error;

// 		await response.then((res) => {
// 			if (res?.success !== undefined && res?.message !== undefined) {
// 				changePassRes.success = toRaw(res.success);
// 				changePassRes.message = toRaw(res.message);
// 			}

// 			isChangePassLoading.value = false;

// 			if (changePassRes.success) {
// 				resetPassValue();
// 				toast.add({
// 					severity: "success",
// 					summary: "Success",
// 					detail: changePassRes.message,
// 					life: 3000,
// 				});
// 			} else {
// 				toast.add({
// 					severity: "error",
// 					summary: "Error",
// 					detail: changePassRes.message[
// 						changePassRes.message.length - 1
// 					],
// 					life: 5000,
// 				});
// 			}
// 		});
// 	}
//};

//<router-link to="/recruitment/applicant/regist/done">
</script>

<style setup lang="css">
.applicantTextColor {
	color: #736028;
}
.applicantButtonStyle {
	background-color: #fafac7;
	border-color: #dbd379;
	color: #544830;
}
.applicantButtonStyle:hover {
	background-color: #8a7b27;
	border-color: #8a7b27;
	color: white;
}
.applicantButtonStyle:active {
	background-color: #624f2a;
	border-color: #624f2a;
	color: white;
}
</style>
