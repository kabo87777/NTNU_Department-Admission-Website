<template>
	<div my="auto">
		<!-- Button: Back to Recruitment Login -->
		<router-link to="/admission/applicant/signin">
			<button
				class="flex items-center gap-2 p-2 my-4"
				text="sm secondary"
				border="rounded-lg"
				hover="bg-nGrey-200 text-title"
				active="bg-nGrey-600 text-white"
			>
				<i class="pi pi-angle-left" />
				<div>返回登入頁面</div>
				<div>Back to Login</div>
			</button>
		</router-link>
		<!-- Title -->
		<div mx="8" space="y-2">
			<div text="secondary" font="light">
				國立臺灣師範大學資訊工程學系
			</div>
			<div class="flex items-end gap-2 font-medium text-gray-900">
				<div text="3xl title" font="medium">招生系統</div>
				<div text="xl title" font="medium">Admission System</div>
			</div>
		</div>
		<!-- Divider -->
		<Divider align="center">
			<div p="4" text="sm pApplicant">申請者忘記密碼 Forget Password</div>
		</Divider>
		<!-- Content -->
		<div flex="~ col gap-8" w="3/4" mx="auto">
			<!-- User Name -->
			<div class="flex-col px-4 py-8">
				<div flex="~ col gap-1">
					<div div text="sm body" font="light">
						使用者名稱 Username
					</div>
				</div>
				<InputText
					name="username"
					type="text"
					v-model="forgetPwdUsername"
					class="p-inputtext-sm w-full"
					required
				/>
			</div>
			<!-- Remind Message -->
			<div
				class="flex flex-col p-4 gap-1 justify-center space-y-2"
				text="xs Secondary"
				font="light"
				border="rounded-xl"
				bg="nGrey-50"
			>
				<div text="xs Secondary" font="light">
					系統將會送出一封郵件至您的電子信箱，您可以透過郵件連結更改密碼
				</div>
				<div text="xs Secondary" font="light">
					We would send a mail to your e-mail address, you could
					change your password by the link.
				</div>
			</div>
			<!-- Submit Button -->
			<div w="60" mx="auto">
				<router-link to="/admission/applicant/forgetpassword/emailSent">
					<button
						class="p-2 w-full border-2 text-pApplicant"
						border="2 opacity-30 nGold-500 rounded-lg"
						hover="text-title bg-nGold-300 border-nGold-300"
						active="text-white bg-nGold-500"
						@click="enterEmail"
					>
						<div>提交 Submit</div>
					</button>
				</router-link>
			</div>
		</div>
		<!-- Captcha -->
		<div>
			<Turnstile ref="turnstileRef" />
		</div>
	</div>
</template>

<script setup lang="ts">
import Button from "primevue/button";
import { reactive, ref } from "vue";
import InputText from "primevue/inputtext";
import { useAdmissionApplicantAuthStore } from "@/stores/universalAuth";
import { TurnstileComponentExposes } from "@/components/Turnstile.vue";
import { AdmissionApplicantAPI } from "@/api/admission/applicant/api";
import Turnstile from "@/components/Turnstile.vue";

const forgetPwdUsername = ref("");
const authStore = useAdmissionApplicantAuthStore();
const turnstileRef = ref<TurnstileComponentExposes>();

const consumeTurnstileToken = () => {
	const token: string | undefined = turnstileRef.value?.turnstileToken;
	window.turnstile?.reset();
	return token;
};
const enterEmail = async () => {
	try {
		const redirectUrl =
			"https://admissions-frontend-staging.birkhoff.me/admission/applicant/password/reset";
		const turnstileResponse = consumeTurnstileToken();
		if (!turnstileResponse) throw new Error("Turnstile challenge failed");
		const api = new AdmissionApplicantAPI(authStore);
		console.log(forgetPwdUsername.value);
		return await api.sendAdmissionApplicantForgotPasswordEmail({
			username: forgetPwdUsername.value,
			redirect_url: redirectUrl,
			"cf-turnstile-response": turnstileResponse,
		});
	} catch (error) {
		// TODO: show error message
		console.log(error);
	}
};
</script>
