<template>
	<Toast position="top-right" />
	<!-- Background Image -->
	<img
		src="/assets/login-page/Login-img.png"
		class="fixed min-h-screen h-200"
	/>
	<!-- White Background -->
	<div
		class="fixed h-screen z-1 right-0 bg-white"
		w="<md:screen md:min-112 screen-4/9"
	/>
	<div
		class="absolute h-screen z-2 right-0"
		w="<md:screen md:min-112 screen-4/9"
	>
		<div flex="~ col" mx="auto" w="100" h="full" justify="center">
			<!-- Button: Back to MainPage -->
			<router-link to="/admission">
				<button
					class="flex items-center gap-2 p-2 my-4"
					text="sm secondary"
					border="rounded-lg"
					hover="bg-nGrey-200 text-title"
					active="bg-nGrey-600 text-white"
				>
					<i class="pi pi-angle-left" />
					<div>切換登入身份</div>
					<div>Change your identity</div>
				</button>
			</router-link>
			<!-- Title -->
			<div mx="4" space="y-2">
				<div text="secondary" font="light">
					國立臺灣師範大學資訊工程學系
				</div>
				<div text="3xl title" font="medium">招生系統</div>
				<div text="lg title" font="medium">
					NTNU CSIE Admissions System
				</div>
			</div>
			<!-- Divider -->
			<Divider align="center">
				<div p="4" text="sm pApplicant">申請者登入 Applicant Login</div>
			</Divider>
			<!-- Login Form -->
			<div flex="~ col gap-8" w="3/4" mx="auto">
				<form @submit="onSubmit" ref="form" space="y-6">
					<!-- Account -->
					<Field
						name="username"
						v-slot="{ field, errorMessage, meta }"
						v-model="username"
					>
						<div flex="~ col gap-1">
							<div text="sm body" font="light">
								准考證號碼 Registration Number
							</div>
							<InputText
								v-bind="field"
								name="username"
								type="text"
								class="h-11"
								:disabled="isSubmitting"
								required
							/>
							<div
								v-if="errorMessage && meta.touched"
								text="xs danger"
								font="light"
							>
								※ 此欄位不可為空白 Required
							</div>
						</div>
					</Field>
					<!-- Password -->
					<Field
						name="password"
						v-slot="{ field, errorMessage, meta }"
						v-model="password"
					>
						<div flex="~ col gap-1">
							<div text="sm body" font="light">密碼 Password</div>
							<InputText
								v-bind="field"
								name="password"
								type="password"
								class="h-11"
								:disabled="isSubmitting"
								required
							/>
							<div
								v-if="errorMessage && meta.touched"
								text="xs danger"
								font="light"
							>
								※ 此欄位不可為空白 Required
							</div>
						</div>
					</Field>
					<!-- Remember Account -->
					<div flex="~" gap="2" w="full" class="items-center">
						<Checkbox v-model="isRememberAccount" :binary="true" />
						<div text="xs body" font="light">
							<div>下次登入時記住帳號</div>
							<div>Remember Account at next Login</div>
						</div>
					</div>
					<!-- Captcha -->
					<div>
						<Turnstile ref="turnstileRef" />
					</div>
					<!-- Login Button -->
					<div flex="~ col" gap="6" w="60" m="auto">
						<!-- TODO: add spinning wheel while Turnstile runs -->
						<button
							class="p-2 w-full border-2 text-pApplicant"
							border="2 opacity-30 nGold-500 rounded-lg"
							hover="text-title bg-nGold-300 border-nGold-300"
							active="text-white bg-nGold-500"
							:loading="isTurnstileRunning || isSubmitting"
						>
							<div>登入 Login</div>
						</button>
						<!-- Forget Password Button -->
						<router-link to="/admission/applicant/forgetpassword">
							<button
								class="p-2 w-full"
								text="sm secondary"
								border="rounded-lg"
								hover="bg-nGrey-200 text-title"
								active="bg-nGrey-600 text-white"
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
			summary: "登入失敗 Login Failed",
			detail: `准考證號碼或密碼輸入錯誤
			Invalid Registration Number or Password`,
			closable: false,
			life: 3000,
		});

		if (e?.response?.status === 401) console.log("invalid credentials");
	}
});
</script>
