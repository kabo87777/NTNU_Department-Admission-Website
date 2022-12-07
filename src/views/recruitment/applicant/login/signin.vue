<template>
	<Toast position="top-right" />
	<div class="fixed inset-y-0 left-0">
		<img src="/assets/login-page/Login-img.png" class="h-200" />
	</div>
	<!-- FIXME:附著在底下的空白，以免圖片露餡，但或許有更好的做法 -->
	<div
		class="fixed inset-y-0 right-0 z-30 bg-white"
		w="125 <sm:full lg:150"
	/>
	<div
		class="absolute inset-y-0 right-0 z-50 bg-white"
		w="125 <sm:full lg:150"
		px="lg:15"
	>
		<div class="flex flex-col py-4 gap-6 mx-8 h-full">
			<!-- 標題內容 -->
			<div space="y-2">
				<img
					src="/assets/login-page/NTNU-logo-B1.png"
					w="48"
					class="sm:invisible"
				/>
				<!-- 返回按鈕 -->
				<router-link to="/recruitment">
					<button
						class="flex items-center gap-2 px-2 py-2 mt-5 mb-3"
						bg="hover:nGrey-200 active:nGrey-600"
						text="sm secondary hover:title active:white"
						border="rounded-lg"
					>
						<i class="pi pi-angle-left" />
						<div>切換登入身份</div>
						<div>Change your identity</div>
					</button>
				</router-link>
				<div class="mx-8" space="y-2">
					<div text="3xl title" font="medium">教師聘請系統</div>
					<div text="lg title" font="medium">
						Teacher Recruitment System
					</div>
				</div>
			</div>

			<Divider align="center">
				<div class="px-4 font-light" text="sm pApplicant">
					申請者登入 Applicant Login
				</div>
			</Divider>

			<!-- 登入輸入內容 -->
			<div class="mx-8">
				<form @submit="onSubmit" ref="form" space="y-6">
					<!-- 輸入帳號 -->
					<Field
						name="email"
						v-slot="{ field, errorMessage, meta }"
						v-model="email"
					>
						<div class="flex-col" text="sm body" font="light">
							<div p="b-2" text="sm gray-500">
								電郵地址 E-mail
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
						<div class="flex-col" text="sm body" font="light">
							<div p="b-2" text="sm gray-500">密碼 Password</div>
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
					<!-- 勾選記住帳號 -->
					<div class="flex items-center gap-2 m-2">
						<Checkbox v-model="isRememberAccount" :binary="true" />
						<div text="sm body" font="light">
							下次登入時記住帳號 Remember Account at next Login
						</div>
					</div>
					<!-- Captcha 按鈕 -->
					<div>
						<Turnstile ref="turnstileRef" />
					</div>
					<!-- 登入按鈕 -->
					<div class="mx-auto w-4/5">
						<button
							class="py-3 w-full"
							bg="hover:nGold-300 active:nGold-500"
							border="2 opacity-30 nGold-600 rounded-lg hover:nGold-300"
							text="pApplicant hover:title active:white"
							:loading="isTurnstileRunning || isSubmitting"
						>
							<div>登入 Login</div>
						</button>
					</div>
					<!-- 註冊/忘記密碼按鈕 -->
					<div class="flex place-content-center">
						<router-link to="/recruitment/applicant/regist">
							<button
								class="p-3 w-full"
								bg="hover:nGrey-200 active:nGrey-600"
								text="sm body hover:title active:white"
								border="rounded-lg"
							>
								<div>註冊 Register</div>
							</button>
						</router-link>
						<Divider layout="vertical" />
						<router-link to="/recruitment/applicant/forgetpassword">
							<button
								class="p-3 w-full"
								bg="hover:nGrey-200 active:nGrey-600"
								text="sm body hover:title active:white"
								border="rounded-lg"
							>
								<div>忘記密碼 Forget Password</div>
							</button>
						</router-link>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useToast } from "primevue/usetoast";
import { ref, watch, computed } from "vue";
import { useRouter } from "vue-router";
import { Field, useForm } from "vee-validate";
import * as yup from "yup";

import { RecruitmentApplicantAPI } from "@/api/recruitment/applicant/api";
import { useRecruitmentApplicantAuthStore } from "@/stores/universalAuth";
import { useUserInfoStore } from "@/stores/RecruitmentApplicantStore";

import type { TurnstileComponentExposes } from "@/components/Turnstile.vue";
import Turnstile from "@/components/Turnstile.vue";

import type { RecruitmentApplicantAuthResponse } from "@/api/recruitment/applicant/types";

import Button from "primevue/button";
import Checkbox from "primevue/checkbox";
import InputText from "primevue/inputtext";

const toast = useToast();
const router = useRouter();

const redirectToMainContainer = () => {
	router.replace({ name: "recruitmentApplicantMainContainer" });
};
const authStore = useRecruitmentApplicantAuthStore();
const userInfo = useUserInfoStore();

// Login Form
const turnstileRef = ref<TurnstileComponentExposes>();
const isRememberAccount = ref(false);
const email = ref("ntnurapplicant1@yopmail.com"); //ntnurapplicant2@yopmail.com ntnurapplicant3@yopmail.com
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

		const doLogin = async () => {
			return await api.requestNewSession({
				email: values.email,
				password: values.password,
				"cf-turnstile-response": turnstileResponse,
			});
		};

		const handleDataType = async () => {
			const applicantInfo: RecruitmentApplicantAuthResponse =
				await doLogin().then((res) => {
					return res.data;
				});

			return applicantInfo;
		};

		userInfo.saveUserInfo(await handleDataType());

		window.localStorage.removeItem("RecruitmentApplicantUsername");
		window.localStorage.setItem(
			"RecruitmentApplicantUsername",
			userInfo.userInfo.name
		);

		redirectToMainContainer();
	} catch (e: any) {
		// TODO: show error message
		// console.log(e);
		toast.add({
			severity: "error",
			summary: "Error",
			detail: "Invalid email or password",
			life: 5000,
		});

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
