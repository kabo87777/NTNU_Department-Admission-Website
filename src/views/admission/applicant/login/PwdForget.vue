<template>
	<!-- Return Button -->
	<router-link to="/admission/applicant/signin">
		<NButton white size="sm" icon="pi pi-angle-left" p="2" my="6">
			回到登入畫面 Back to login page
		</NButton>
	</router-link>
	<!-- Title -->
	<Title>
		<template #Subtitle>
			<div class="<md:hidden">國立臺灣師範大學資訊工程學系</div>
		</template>
		<template #Chinese>招生系統</template>
		<template #English>NTNU CSIE Admissions System</template>
		<template #Divider>
			<div text="pApplicant">申請者忘記密碼 Forget Password</div>
		</template>
	</Title>
	<!-- Body: Edit Email Form -->
	<Body v-if="emailState === 'Edit'">
		<template #Content>
			<!-- User Name -->
			<div flex="~ col gap-1">
				<div text="sm body">使用者名稱 Username</div>
				<InputText
					name="username"
					type="text"
					v-model="forgetPwdUsername"
					class="h-12 w-full"
					required
				/>
			</div>
			<!-- Remind Message -->
			<div
				class="flex flex-col p-6 gap-1 justify-center space-y-1"
				text="sm warning"
				bg="warning-50"
				border="rounded-xl"
			>
				<div>
					我們將寄出一封重設密碼郵件至您的電子郵件。請確認郵箱地址是否正確，
					郵件寄出過程將不判別電子郵件之正確性。
				</div>
				<div>
					We would send a reset password link to your email. Please
					make sure check your mail correctly by yourself, we won't
					check for you.
				</div>
			</div>
		</template>
		<template #Footer>
			<!-- Submit Button -->
			<Turnstile ref="turnstileRef" />
			<NButton
				class="w-3/5 h-13 m-auto"
				type="Applicant"
				size="lg"
				@click="changeState"
			>
				提交 Submit
			</NButton>
		</template>
	</Body>
	<!-- Body: Email Sent -->
	<EmailSentMsg v-if="emailState === 'Submit'" />
</template>

<script setup lang="ts">
import InputText from "primevue/inputtext";
import NButton from "@/styles/CustomButton.vue";
import Title from "@/styles/login/LoginTitle.vue";
import Body from "@/styles/login/LoginBody.vue";
import EmailSentMsg from "@/styles/login/EmailSentMsg.vue";

import { ref } from "vue";
import { useAdmissionApplicantAuthStore } from "@/stores/universalAuth";
import { TurnstileComponentExposes } from "@/components/Turnstile.vue";
import { AdmissionApplicantAPI } from "@/api/admission/applicant/api";
import Turnstile from "@/components/Turnstile.vue";

const forgetPwdUsername = ref("");
const emailState = ref("Edit");

const authStore = useAdmissionApplicantAuthStore();
const turnstileRef = ref<TurnstileComponentExposes>();

const consumeTurnstileToken = () => {
	const token: string | undefined = turnstileRef.value?.turnstileToken;
	window.turnstile?.reset();
	return token;
};

const changeState = () => {
	console.log("Submit");
	emailState.value = "Submit";
	enterEmail();
};

const enterEmail = async () => {
	try {
		const redirectUrl = `${
			import.meta.env.VITE_BASEURL
		}/admission/applicant/password/reset`;
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
