<template>
	<Toast position="top-right" />
	<div my="auto">
		<!-- Button: Back to Recruitment Login -->
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
			<div text="xl title" font="medium">Teacher Recruitment System</div>
		</div>
		<!-- Divider -->
		<Divider align="center">
			<div p="8" text="sm pReviewer">審查委員登入 Reviewer Login</div>
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
						<div text="sm body" font="light">電郵地址 E-mail</div>
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
					<button
						class="p-2 w-full border-2 text-pReviewer"
						border="2 opacity-30 nBlue-500 rounded-lg"
						hover="text-title bg-nBlue-200 border-nBlue-200"
						active="text-white bg-nBlue-500"
						:loading="isTurnstileRunning || isSubmitting"
					>
						<div>登入 Login</div>
					</button>
					<!-- Forget Password -->
					<router-link to="/recruitment/reviewer/forgetpassword">
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
</template>

<script setup lang="ts">
import { useToast } from "primevue/usetoast";
import { ref, watch, computed } from "vue";
import { useRouter } from "vue-router";
import { Field, useForm } from "vee-validate";
import * as yup from "yup";

import { RecruitmentReviewerAPI } from "@/api/recruitment/reviewer/api";
import { useRecruitmentReviewerAuthStore } from "@/stores/universalAuth";
import { useUserInfoStore } from "@/stores/RecruitmentReviewerStore";

import type { TurnstileComponentExposes } from "@/components/Turnstile.vue";
import Turnstile from "@/components/Turnstile.vue";

import Button from "primevue/button";
import Checkbox from "primevue/checkbox";
import InputText from "primevue/inputtext";

const toast = useToast();
const router = useRouter();

const authStore = useRecruitmentReviewerAuthStore();
const userInfo = useUserInfoStore();

// Login Form
const turnstileRef = ref<TurnstileComponentExposes>();
const isRememberAccount = ref(false);
const email = ref("ntnurreviewer1@yopmail.com");
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
	"RecruitmentReviewerSigninLastEmail"
);

if (lastSigninEmail) {
	isRememberAccount.value = true;
	email.value = lastSigninEmail;
}

// Store email in localStorage if remember account
watch(isRememberAccount, (isChecked) => {
	if (!isChecked)
		window.localStorage.removeItem("RecruitmentReviewerSigninLastEmail");
});

const consumeTurnstileToken = () => {
	const token: string | undefined = turnstileRef.value?.turnstileToken;
	window.turnstile?.reset();
	return token;
};

const onSubmit = handleSubmit(async function (values, actions) {
	window.localStorage.setItem(
		"RecruitmentReviewerSigninLastEmail",
		email.value
	);

	try {
		const turnstileResponse = consumeTurnstileToken();

		if (!turnstileResponse) throw new Error("Turnstile challenge failed");

		const api = new RecruitmentReviewerAPI(authStore);

		userInfo.saveUserInfo(
			(
				await api.requestNewSession({
					email: values.email,
					password: values.password,
					"cf-turnstile-response": turnstileResponse,
				})
			).data
		);

		router.replace({ name: "RecruitmentReviewerMainContainer" });
	} catch (e: any) {
		if (e?.response?.status === 401) {
			return toast.add({
				severity: "error",
				summary: "Error",
				detail: "Invalid email or password",
				life: 5000,
			});
		}

		toast.add({
			severity: "error",
			summary: "Error",
			detail: e.toString(),
			life: 5000,
		});
	}
});
</script>
