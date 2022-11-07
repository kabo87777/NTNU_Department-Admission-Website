<template class="overflow-hidden">
	<div class="flex">
		<div class="flex-shrink-1">
			<img src="/assets/login-page/Login-img.png" class="fill" />
		</div>
		<div class="flex-none w-150 px-6 pt-18 space-y-8">
			<router-link to="/recruitment">
				<button
					class="flex items-center gap-2 px-2 py-2"
					bg="transparent hover:gray-100"
					text="sm gray-400 hover:gray-600"
					border="rounded"
				>
					<i class="pi pi-angle-left" />
					<div>切換登入身份</div>
					<div>Change your identity</div>
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
			<div class="px-8 py-4 space-y-8">
				<div class="flex items-center gap-2 applicantTextColor">
					<i class="pi pi-circle-fill" style="font-size: 0.5rem" />
					<div class="flex-none font-medium">申請端登入</div>
					<div class="flex-none font-medium">Applicant Login</div>
					<Divider />
				</div>
				<form @submit="onSubmit" ref="form">
					<Field
						name="email"
						v-slot="{ field, errorMessage, meta }"
						v-model="email"
					>
						<div class="flex-col px-4">
							<div
								class="flex items-center gap-2 pb-2"
								text="sm gray-500"
							>
								<div>電郵地址</div>
								<div>E-mail</div>
							</div>
							<InputText
								v-bind="field"
								name="email"
								type="email"
								class="input p-inputtext-sm w-full"
								:disabled="isSubmitting"
								required
							/>
							<!-- TODO: styling -->
							<span v-if="errorMessage && meta.touched">
								{{ errorMessage }}
							</span>
						</div>
					</Field>
					<Field
						name="password"
						v-slot="{ field, errorMessage, meta }"
						v-model="password"
					>
						<div class="flex-col px-4">
							<div
								class="flex items-center gap-2 pb-2"
								text="sm gray-500"
							>
								<div>密碼</div>
								<div>Password</div>
							</div>
							<InputText
								v-bind="field"
								name="password"
								type="password"
								class="input p-inputtext-sm w-full"
								:disabled="isSubmitting"
								required
							/>
							<!-- TODO: styling -->
							<span v-if="errorMessage && meta.touched">
								{{ errorMessage }}
							</span>
						</div>
					</Field>
					<div class="flex items-center px-4 gap-2">
						<Checkbox v-model="isRememberAccount" :binary="true" />
						<div class="space-y-0.5" text="xs gray-500">
							<div>下次登入時記住帳號</div>
							<div>Remember Account at next Login</div>
						</div>
					</div>
					<div class="flex-col-inline px-4 gap-y-8">
						<div class="ml-168px mt-40px">
							<Turnstile ref="turnstileRef" />
						</div>
						<div class="flex justify-center">
							<Button
								class="py-2 w-80 applicantbuttonStyle"
								border="2  rounded-lg"
								type="submit"
								:loading="isTurnstileRunning || isSubmitting"
							>
								<div class="flex justify-center gap-2 mx-auto">
									<div>登入</div>
									<div>Login</div>
								</div>
							</Button>
						</div>
						<div class="flex justify-center items-center">
							<router-link to="/recruitment/applicant/regist">
								<button
									class="flex justify-center gap-2 px-1 py-1"
									bg="transparent hover:gray-100"
									text="sm gray-400 hover:gray-600"
									border="rounded"
								>
									<div>註冊</div>
									<div>Register</div>
								</button>
							</router-link>
							<Divider layout="vertical" />
							<router-link
								to="/recruitment/applicant/password/forget"
							>
								<button
									class="flex justify-center gap-2 px-1 py-1"
									bg="transparent hover:gray-100"
									text="sm gray-400 hover:gray-600"
									border="rounded"
								>
									<div>忘記密碼</div>
									<div>Forget Password</div>
								</button>
							</router-link>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { useRouter } from "vue-router";
import { Field, useForm } from "vee-validate";
import * as yup from "yup";

import { RecruitmentApplicantAPI } from "@/api/recruitment/applicant/api";
import { useRecruitmentApplicantAuthStore } from "@/stores/universalAuth";

import type { TurnstileComponentExposes } from "@/components/Turnstile.vue";
import Turnstile from "@/components/Turnstile.vue";

import Button from "primevue/button";
import Checkbox from "primevue/checkbox";
import InputText from "primevue/inputtext";

const router = useRouter();

const redirectToMainContainer = () => {
	router.replace({ name: "recruitmentApplicantMainContainer" });
};
const authStore = useRecruitmentApplicantAuthStore();

// Login Form
const turnstileRef = ref<TurnstileComponentExposes>();
const isRememberAccount = ref(false);
const email = ref("example1@email.com");
const password = ref("Example123");
const isTurnstileRunning = computed(() => !turnstileRef.value?.turnstileToken);

// TODO: i18n error message
// https://vee-validate.logaretm.com/v4/guide/composition-api/handling-forms/#javascript-submissions-ajax
const { handleSubmit, isSubmitting } = useForm({
	validationSchema: yup.object({
		email: yup.string().required("Required"),
		password: yup.string().required("Required"),
		// .min(8, "Must be 8 characters or more")
		// .matches(/[a-z]+/, "One lowercase character")
		// .matches(/[A-Z]+/, "One uppercase character"),
	}),
});

// Get remember account status
const lastSigninEmail = window.localStorage.getItem(
	"RecruitmentApplicantSigninLastEmail"
);

if (lastSigninEmail) {
	isRememberAccount.value = true;
	email.value = lastSigninEmail;
}

// remove legacy item (renamed)
window.localStorage.removeItem("RecruitmentApplicantSigninLastSigninEmail");

// Store email in localStorage if remember account
watch(isRememberAccount, (isChecked) => {
	if (!isChecked)
		window.localStorage.removeItem("RecruitmentApplicantSigninLastEmail");
});

const consumeTurnstileToken = () => {
	const token: string | undefined = turnstileRef.value?.turnstileToken;
	window.turnstile?.reset();
	return token;
};

const onSubmit = handleSubmit(async function (values, actions) {
	window.localStorage.setItem(
		"RecruitmentApplicantSigninLastEmail",
		email.value
	);

	try {
		const turnstileResponse = consumeTurnstileToken();

		if (!turnstileResponse) throw new Error("Turnstile challenge failed");

		const api = new RecruitmentApplicantAPI(authStore);

		await api.requestNewSession({
			email: values.email,
			password: values.password,
			"cf-turnstile-response": turnstileResponse,
		});

		redirectToMainContainer();
	} catch (e: any) {
		// TODO: show error message
		console.log(e);
		if (e?.response?.status === 401) console.log("invalid credentials");
	}
});
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
