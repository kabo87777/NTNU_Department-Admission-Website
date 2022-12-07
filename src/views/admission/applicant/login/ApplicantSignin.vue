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
				<router-link to="/admission">
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
					<div text="3xl title" font="medium">
						資訊工程學系報名系統
					</div>
					<div text="lg title" font="medium">
						NTNU CSIE Admissions
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
						name="username"
						v-slot="{ field, errorMessage, meta }"
						v-model="username"
					>
						<div class="flex-col" text="sm body" font="light">
							<div p="b-2">准考證號碼 Registration Number</div>
							<InputText
								v-bind="field"
								name="username"
								type="text"
								class="p-inputtext-sm w-full"
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
							<div p="b-2">密碼 Password</div>
							<InputText
								v-bind="field"
								name="password"
								type="password"
								class="p-inputtext-sm w-full"
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
					<div class="flex items-center gap-2 w-full">
						<Checkbox v-model="isRememberAccount" :binary="true" />
						<div text="xs body" font="light">
							<div>下次登入時記住帳號</div>
							<div>Remember Account at next Login</div>
						</div>
					</div>
					<!-- Captcha 按鈕 -->
					<div>
						<Turnstile ref="turnstileRef" />
					</div>
					<!-- 登入按鈕 -->
					<div class="mx-auto w-4/5">
						<!-- TODO: add spinning wheel while Turnstile runs -->
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
					<div class="mx-auto w-3/5">
						<router-link to="/admission/applicant/forgetpassword">
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
import { ref, watch, computed, toRaw } from "vue";
import { useRouter } from "vue-router";
import { Field, useForm } from "vee-validate";
import * as yup from "yup";

import { AdmissionApplicantAPI } from "@/api/admission/applicant/api";
import { useAdmissionApplicantAuthStore } from "@/stores/universalAuth";
import { useUserInfoStore } from "@/stores/AdmissionApplicantStore";

import type { TurnstileComponentExposes } from "@/components/Turnstile.vue";
import Turnstile from "@/components/Turnstile.vue";

import type { AdmissionApplicantAuthResponse } from "@/api/admission/applicant/types";

import Checkbox from "primevue/checkbox";
import Button from "primevue/button";
import InputText from "primevue/inputtext";

const toast = useToast();
const router = useRouter();

const redirectToMainContainer = () =>
	router.replace({ name: "AdmissionApplicantMainContainer" });

const authStore = useAdmissionApplicantAuthStore();
const userInfo = useUserInfoStore();

// Login Form
const turnstileRef = ref<TurnstileComponentExposes>();
const isRememberAccount = ref(false);
const username = ref("1110101");
const password = ref("Example123");
const isTurnstileRunning = computed(() => !turnstileRef.value?.turnstileToken);

// TODO: i18n error message
// https://vee-validate.logaretm.com/v4/guide/composition-api/handling-forms/#javascript-submissions-ajax
const { handleSubmit, isSubmitting } = useForm({
	validationSchema: yup.object({
		username: yup.string().required("Required"),
		password: yup.string().required("Required"),
		// .min(8, "Must be 8 characters or more")
		// .matches(/[a-z]+/, "One lowercase character")
		// .matches(/[A-Z]+/, "One uppercase character"),
	}),
});

// Get remember account status
const lastSigninUsername = window.localStorage.getItem(
	"AdmissionApplicantSigninLastUsername"
);

if (lastSigninUsername) {
	isRememberAccount.value = true;
	username.value = lastSigninUsername;
}

// Store username in localStorage if remember account
watch(isRememberAccount, (isChecked) => {
	if (!isChecked)
		window.localStorage.removeItem("AdmissionApplicantSigninLastUsername");
});

const consumeTurnstileToken = () => {
	const token: string | undefined = turnstileRef.value?.turnstileToken;
	window.turnstile?.reset();
	return token;
};

const onSubmit = handleSubmit(async function (values, actions) {
	window.localStorage.setItem(
		"AdmissionApplicantSigninLastUsername",
		username.value
	);

	try {
		const turnstileResponse = consumeTurnstileToken();

		if (!turnstileResponse) throw new Error("Turnstile challenge failed");

		const api = new AdmissionApplicantAPI(authStore);

		const doLogin = async () => {
			return await api.requestNewSession({
				username: values.username,
				password: values.password,
				"cf-turnstile-response": turnstileResponse,
			});
		};

		const handleDataType = async () => {
			const applicantInfo: AdmissionApplicantAuthResponse =
				await doLogin().then((res) => {
					return res.data;
				});

			return applicantInfo;
		};

		userInfo.saveUserInfo(await handleDataType());

		window.localStorage.removeItem("AdmissionApplicantUsername");
		window.localStorage.setItem(
			"AdmissionApplicantUsername",
			userInfo.userInfo.name
		);

		redirectToMainContainer();
	} catch (e: any) {
		// TODO: show error message
		// console.log(e);
		toast.add({
			severity: "error",
			summary: "Error",
			detail: "Invalid admission ticket number or password",
			life: 5000,
		});

		if (e?.response?.status === 401) console.log("invalid credentials");
	}
});
</script>
