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
	<!-- Content -->
	<div
		class="absolute h-screen z-50 right-0 bg-white"
		w="<md:screen md:min-112 screen-4/9"
	>
		<div flex="~ col" mx="auto" w="100" h="full">
			<div my="auto">
				<!-- Button: Back to MainPage -->
				<router-link to="/recruitment">
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
				<div mx="4" space="y-2">
					<div text="secondary" font="light">
						國立臺灣師範大學資訊工程學系
					</div>
					<div text="3xl title" font="medium">教師聘請系統</div>
					<div text="lg title" font="medium">
						Teacher Recruitment System
					</div>
				</div>
				<!-- Divider -->
				<Divider align="center">
					<div p="4" text="sm pApplicant">
						申請者登入 Applicant Login
					</div>
				</Divider>
				<!-- Login Form -->
				<div flex="~ col gap-8" w="3/4" mx="auto">
					<form @submit="onSubmit" ref="form" space="y-6">
						<!-- Account -->
						<Field
							name="email"
							v-slot="{ field, errorMessage, meta }"
							v-model="email"
						>
							<div flex="~ col gap-1">
								<div text="sm body" font="light">
									電郵地址 E-mail
								</div>
								<InputText
									v-bind="field"
									name="email"
									type="email"
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
								<div text="sm body" font="light">
									密碼 Password
								</div>
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
							<Checkbox
								v-model="isRememberAccount"
								:binary="true"
							/>
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
							<button
								class="p-2 w-full border-2 text-pApplicant"
								border="2 opacity-30 nGold-500 rounded-lg"
								hover="text-title bg-nGold-300 border-nGold-300"
								active="text-white bg-nGold-500"
								:loading="isTurnstileRunning || isSubmitting"
							>
								<div>登入 Login</div>
							</button>
						</div>
						<!-- Forget Password Button -->
						<div flex="~" justify="center">
							<router-link to="/recruitment/applicant/regist">
								<button
									class="p-2 w-full"
									text="sm secondary"
									border="rounded-lg"
									hover="bg-nGrey-200 text-title"
									active="bg-nGrey-600 text-white"
								>
									<div>註冊</div>
									<div>Register</div>
								</button>
							</router-link>
							<Divider layout="vertical" flex="grow-0" />
							<router-link
								to="/recruitment/applicant/forgetpassword"
							>
								<button
									class="p-2 w-full"
									text="sm secondary"
									border="rounded-lg"
									hover="bg-nGrey-200 text-title"
									active="bg-nGrey-600 text-white"
								>
									<div>忘記密碼</div>
									<div>Forget Password</div>
								</button>
							</router-link>
						</div>
					</form>
				</div>
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
