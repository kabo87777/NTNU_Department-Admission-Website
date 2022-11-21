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
					<i class="pi pi-angle-left" />
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
					<div class="flex-none font-medium">忘記密碼</div>
					<div class="flex-none font-medium">Forget Password</div>
					<Divider />
				</div>
				<div class="flex-col px-4 py-8">
					<div
						class="flex items-center gap-2 pb-2"
						text="sm gray-500"
					>
						<div>電郵地址</div>
						<div>E-mail</div>
					</div>
					<InputText
						name="email"
						type="email"
						v-model="forgetPwdEmail"
						class="p-inputtext-sm w-full"
						required
					/>
				</div>
				<div
					class="flex p-4 gap-1 justify-center"
					text="xs gray-500"
					border="rounded-xl"
					bg="gray-100"
				>
					<div class="px-2">
						<div>
							系統將會送出一封郵件至您的電子信箱，您可以透過郵件連結更改密碼
						</div>
						<div>
							We would send a mail to your e-mail address, you
							could change your password by the link.
						</div>
					</div>
				</div>
			</div>
			<div class="flex justify-center px-4">
				<router-link
					to="/recruitment/applicant/password/forget/emailSent"
				>
					<Button
						class="py-2 w-80 applicantButtonStyle"
						@click="enterEmail"
					>
						<div>提交</div>
						<div>Submit</div>
					</Button>
				</router-link>
			</div>
			<div class="ml-168px mt-40px">
				<Turnstile ref="turnstileRef" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import Button from "primevue/button";
import { reactive, ref, watch, computed, toRaw } from "vue";
import InputText from "primevue/inputtext";
import { useRouter } from "vue-router";
import { useRecruitmentApplicantAuthStore } from "@/stores/universalAuth"
import { RecruitmentApplicantAPI } from "@/api/recruitment/applicant/api"
import { useMutation } from "@tanstack/vue-query";
import type { TurnstileComponentExposes } from "@/components/Turnstile.vue";
import Turnstile from "@/components/Turnstile.vue";

const router = useRouter();
const applicantAuth = useRecruitmentApplicantAuthStore();
const api = new RecruitmentApplicantAPI(applicantAuth);
const turnstileRef = ref<TurnstileComponentExposes>();
const isTurnstileRunning = computed(() => !turnstileRef.value?.turnstileToken);
const isSendEmailPassLoading = ref(false);

const forgetPwdEmail = ref("");

const postEnteredEmailString = useMutation(async (enteredEmail: any) => {
	try{
		return await api.sendForgotPwd(enteredEmail);
	} catch (error) {
		console.log(error);
	}
});

const consumeTurnstileToken = () => {
	const token: string | undefined = turnstileRef.value?.turnstileToken;
	window.turnstile?.reset();
	return token;
};
const enterEmail = async () => {
	const redirectUrl =
		"http://127.0.0.1:5173/recruitment/applicant/password/reset";
	const turnstileResponse = consumeTurnstileToken();
	if (!turnstileResponse) throw new Error("Turnstile challenge failed");
	try{
		postEnteredEmailString.mutate({
			email: forgetPwdEmail.value,
			redirect_url: redirectUrl,
			"cf-turnstile-response": turnstileResponse,
		});
		console.log(
			{
				email: forgetPwdEmail.value,
				redirect_url: redirectUrl,
				"cf-turnstile-response": turnstileResponse,
			}
		)
	} catch(error) {
		console.log(error);
	}
}
// function enterEmail() {
// 	const redirectUrl =
// 		"http://127.0.0.1:5173/recruitment/applicant/password/reset";
// 	try {
// 		const turnstileResponse = consumeTurnstileToken();
// 		if (!turnstileResponse) throw new Error("Turnstile challenge failed");
// 		enteredEmailString.mutate({
// 			email: forgetPwdEmail.value,
// 			redirect_url: redirectUrl,
// 			"cf-turnstile-response": turnstileResponse,
// 		});
// 		// toast.add({severity:'success', summary: '更改成功', life: 3000});
// 	} catch (error) {
// 		// toast.add({severity:'error', summary: '資料錯誤', life: 3000});
// 	}
// }
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
