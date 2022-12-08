<template class="overflow-hidden">
	<div class="flex">
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
				<div class="flex-col px-4 pt-4">
					<div
						class="flex items-center gap-2 pb-2"
						text="sm gray-500"
					>
						<div>輸入使用者名稱</div>
						<div>Enter Username</div>
					</div>
					<InputText
						name="username"
						type="username"
						v-model="userRegistData.name"
						class="p-inputtext-sm w-full"
						required
					/>
					<div class="absolute" v-if="password.isNameBlank">
						<small id="newPass-help" class="p-error">
							{{ $t("必須輸入使用者名稱") }}
						</small>
					</div>
				</div>
				<div class="flex-col px-4 pt-4">
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
					<div class="absolute" v-if="password.isEmailBlank">
						<small id="newPass-help" class="p-error">
							{{ $t("必須輸入輸入電郵") }}
						</small>
					</div>
				</div>

				<div class="flex-col px-4 pt-4">
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
					<div class="absolute" v-if="password.isCurrentPassBlank">
						<small id="newPass-help" class="p-error">
							{{ $t("請輸入新密碼") }}
						</small>
					</div>
				</div>
				<div class="flex-col px-4 pt-4">
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
					<div class="absolute" v-if="password.notMatch">
						<small id="confirmPass-help" class="p-error">
							{{ $t("密碼不符") }}
						</small>
					</div>
				</div>
			</div>
			<div class="flex-col-inline px-4 gap-y-8">
				<div class="flex justify-center">
					<Button
						class="py-2 w-80 applicantButtonStyle"
						border="2  rounded-lg"
						:loading="isRegistLoading"
						@click="handleSubmit"
					>
						<div class="flex justify-center gap-2 mx-auto">
							<div>註冊</div>
							<div>Register</div>
						</div>
					</Button>
				</div>
				<div class="ml-168px mt-40px">
					<Turnstile ref="turnstileRef" />
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import Button from "primevue/button";
import { reactive, toRaw } from "vue";
import { RecruitmentApplicantAPI } from "@/api/recruitment/applicant/api";
import { useRecruitmentApplicantAuthStore } from "@/stores/universalAuth";
import InputText from "primevue/inputtext";
import { useRouter } from "vue-router";
import { ref } from "vue";
import type { TurnstileComponentExposes } from "@/components/Turnstile.vue";
import Turnstile from "@/components/Turnstile.vue";

const applicantAuth = useRecruitmentApplicantAuthStore();
const router = useRouter();
const turnstileRef = ref<TurnstileComponentExposes>();
const isRegistLoading = ref(false);
const userRegistData = reactive({
	name: "",
	email: "",
	password: "",
	password_confirmation: "",
	confirm_success_url:
		"https://admissions-frontend-staging.birkhoff.me/recruitment/applicant/signin",
});

const password = reactive({
	isCurrentPassBlank: false,
	isNameBlank: false,
	isEmailBlank: false,
	isNewPassBlank: false,
	notMatch: false,
	currentPass: "",
	newPass: "",
	confirmPass: "",
});

const RegisterResponse = reactive({
	success: false,
	message: "" as string | [],
});

const consumeTurnstileToken = () => {
	const token: string | undefined = turnstileRef.value?.turnstileToken;
	window.turnstile?.reset();
	return token;
};

const redirectToRegistDonePage = () => {
	router.replace({ name: "recruitmentApplicantRegistDone" });
};
const postEmailRegister = async () => {
	try {
		const turnstileResponse = consumeTurnstileToken();
		if (!turnstileResponse) throw new Error("Turnstile challenge failed");
		const api = new RecruitmentApplicantAPI(applicantAuth);
		return await api.sendPostEmailRegister({
			name: userRegistData.name,
			email: userRegistData.email,
			password: userRegistData.password,
			password_confirmation: userRegistData.password_confirmation,
			confirm_success_url: userRegistData.confirm_success_url,
			"cf-turnstile-response": turnstileResponse,
		});
	} catch (error) {
		// TODO: show error message
		console.log(error);
	}
};

const handleSubmit = async () => {
	if (userRegistData.name === "") {
		password.isNameBlank = true;
	} else {
		password.isNameBlank = false;
	}

	if (userRegistData.email === "") {
		password.isEmailBlank = true;
	} else {
		password.isEmailBlank = false;
	}

	if (userRegistData.password === "") {
		password.isCurrentPassBlank = true;
	} else {
		password.isCurrentPassBlank = false;
	}

	if (userRegistData.password !== userRegistData.password_confirmation) {
		password.notMatch = true;
	} else {
		password.notMatch = false;
	}

	if (
		!password.isCurrentPassBlank &&
		!password.isNewPassBlank &&
		!password.isNameBlank &&
		!password.isEmailBlank &&
		!password.notMatch
	) {
		isRegistLoading.value = true;
		const response = postEmailRegister();
		await response.then((res) => {
			console.log(res);
			if (res?.status !== undefined && res?.message !== undefined) {
				RegisterResponse.success = toRaw(res.status);
				RegisterResponse.message = toRaw(res.message);
			}
			isRegistLoading.value = false;
			if (RegisterResponse.success) {
				redirectToRegistDonePage();
			}
		});
	}
};
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
