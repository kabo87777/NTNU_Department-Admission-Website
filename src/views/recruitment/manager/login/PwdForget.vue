<template>
	<!-- Return Button -->
	<router-link to="/recruitment/manager/signin">
		<NButton type="White" size="sm" icon="pi pi-angle-left" p="2" my="6">
			回到登入畫面 Back to login page
		</NButton>
	</router-link>
	<!-- Title -->
	<Title>
		<template #Subtitle>
			<div class="<md:hidden">國立臺灣師範大學資訊工程學系</div>
		</template>
		<template #Chinese>教師聘請系統</template>
		<template #English>Teacher Recruitment System</template>
		<template #Divider>
			<div text="pAdmin">行政人員忘記密碼 Forget Password</div>
		</template>
	</Title>
	<!-- Body: Edit E-mail Form -->
	<Body v-if="emailState === 'Edit'">
		<template #Content>
			<!-- E-mail -->
			<div flex="~ col gap-1">
				<div text="sm body">電郵地址 E-mail</div>
				<InputText
					name="email"
					type="email"
					v-model="forgetPwdEmail"
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
					我們將寄出一封重設密碼郵件至您的電子信箱。請確認郵箱地址是否正確，
					郵件寄出過程將不判別電子信箱之正確性。
				</div>
				<div>
					We would send a reset password link to your e-mail. Please
					make sure check your mail correctly by yourself, we won't
					check for you.
				</div>
			</div>
		</template>
		<template #Footer>
			<!-- Submit Button -->
			<Turnstile ref="turnstileRef" />
			<NButton
				class="w-3/5 p-2 m-auto"
				type="Applicant"
				size="lg"
				@click="changeState"
			>
				提交 Submit
			</NButton>
		</template>
	</Body>
	<!-- Body: E-mail Sent -->
	<EmailSentMsg v-if="emailState === 'Submit'" />
</template>

<script setup lang="ts">
import InputText from "primevue/inputtext";
import NButton from "@/styles/CustomButton.vue";
import Title from "@/styles/login/LoginTitle.vue";
import Body from "@/styles/login/LoginBody.vue";
import EmailSentMsg from "@/styles/login/EmailSentMsg.vue";
import { ref } from "vue";
import { useRecruitmentAdminAuthStore } from "@/stores/universalAuth";
import { TurnstileComponentExposes } from "@/components/Turnstile.vue";
import { RecruitmentAdminAPI } from "@/api/recruitment/admin/api";
import Turnstile from "@/components/Turnstile.vue";

const forgetPwdEmail = ref("");
const emailState = ref("Edit");

const authStore = useRecruitmentAdminAuthStore();
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
		const redirectUrl =
			"http://127.0.0.1:5173/recruitment/manager/password/reset";
		const turnstileResponse = consumeTurnstileToken();
		if (!turnstileResponse) throw new Error("Turnstile challenge failed");
		const api = new RecruitmentAdminAPI(authStore);
		return await api.sendForgotPasswordEmail({
			email: forgetPwdEmail.value,
			redirect_url: redirectUrl,
			"cf-turnstile-response": turnstileResponse,
		});
	} catch (error) {
		// TODO: show error message
		console.log(error);
	}
};
</script>
