<template>
	<div my="auto">
		<!-- Button: Back to Recruitment Login -->
		<router-link to="/recruitment/manager/signin">
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
			<div text="3xl title" font="medium">教師徵聘系統</div>
			<div text="xl title" font="medium">Teacher Recruitment System</div>
		</div>
		<!-- Divider -->
		<Divider align="center">
			<div p="4" text="sm pAdmin">行政人員忘記密碼 Forget Password</div>
		</Divider>
		<!-- Content -->
		<div flex="~ col gap-8" w="3/4" mx="auto">
			<!-- E-mail -->
			<div flex="~ col gap-1">
				<div text="sm body" font="light">電郵地址 E-mail</div>
				<InputText
					name="email"
					type="email"
					v-model="forgetPwdEmail"
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
				<router-link to="/recruitment/manager/forgetpassword/emailSent">
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
			<div>
				<Turnstile ref="turnstileRef" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import Button from "primevue/button";
import { reactive, ref } from "vue";
import InputText from "primevue/inputtext";
import { useRecruitmentAdminAuthStore } from "@/stores/universalAuth";
import { TurnstileComponentExposes } from "@/components/Turnstile.vue";
import { RecruitmentAdminAPI } from "@/api/recruitment/admin/api";
import Turnstile from "@/components/Turnstile.vue";

const forgetPwdEmail = ref("");
const authStore = useRecruitmentAdminAuthStore();
const turnstileRef = ref<TurnstileComponentExposes>();

const consumeTurnstileToken = () => {
	const token: string | undefined = turnstileRef.value?.turnstileToken;
	window.turnstile?.reset();
	return token;
};
const enterEmail = async () => {
	try {
		const redirectUrl =
			"https://admissions-frontend-staging.birkhoff.me/recruitment/manager/password/reset";
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

<style setup lang="css">
.managerTextColor {
	color: #79363c;
}
.managerButtonStyle {
	background-color: #ffe4df;
	border-color: #f3baae;
	color: #4d3639;
}
.managerButtonStyle:hover {
	background-color: #94282c;
	border-color: #94282c;
	color: white;
}
.managerButtonStyle:active {
	background-color: #62373e;
	border-color: #62373e;
	color: white;
}
</style>
