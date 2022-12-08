<!-- <template>
	<LandingViewBase>
		<template #form>
			<LoginForm role="applicant">
				<template #h1>{{ $t("資訊工程學系報名系統") }}</template>
			</LoginForm>
		</template>
	</LandingViewBase>
</template>

<script setup lang="ts">
import LandingViewBase from "@/components/LandingViewLayout.vue";
import LoginForm from "@/components/LoginForm.vue";
</script> -->

<template>
	<Toast position="top-right" />
	<div class="m-auto">
		<div class="flex m-auto h-15">
			<div>
				<img src="/assets/login-page/NTNU-logo-B1.png" class="h-15" />
			</div>
			<Divider layout="vertical" />
			<div class="mt-1.5">
				<div class="text-4xl font-bold text-gray-500">資訊工程學系</div>
				<div class="text-xs text-gray-400">
					Department of Computer Science and Information Enginering
				</div>
			</div>
		</div>
		<div>
			<router-link to="/admission">
				<button
					class="flex items-center gap-2 px-2 py-2 mt-5 mb-3"
					bg="transparent hover:gray-100"
					text="sm gray-400 hover:gray-600"
					border="rounded"
				>
					<i class="pi pi-angle-left" />
					<div>切換登入身份</div>
					<div>Change your identity</div>
				</button>
			</router-link>
		</div>
		<div>
			<div class="mt-100px ml-164px text-4xl font-bold text-gray-500">
				{{ $t("資訊工程學系報名系統") }}
			</div>
		</div>
		<form @submit="onSubmit" ref="form">
			<Field
				name="username"
				v-slot="{ field, errorMessage, meta }"
				v-model="username"
			>
				<div class="block mt-50px ml-168px">
					<div class="text-base text-gray-600">
						<label for="username">{{ $t("准考證號碼") }}</label>
					</div>
					<div class="mt-4px">
						<InputText
							v-bind="field"
							name="username"
							type="username"
							class="input"
							:disabled="isSubmitting"
							required
						/>
					</div>
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
				<div class="block mt-24px ml-168px">
					<div class="text-base text-gray-600">
						<label for="password">{{ $t("密碼") }}</label>
					</div>
					<div class="mt-4px">
						<InputText
							v-bind="field"
							name="password"
							type="password"
							class="input"
							:disabled="isSubmitting"
							required
						/>
					</div>
					<!-- TODO: styling -->
					<span v-if="errorMessage && meta.touched">
						{{ errorMessage }}
					</span>
				</div>
			</Field>
			<div class="flex relative ml-168px mt-8px">
				<div class="flex">
					<div class="pt-3px">
						<Checkbox v-model="isRememberAccount" :binary="true" />
					</div>
					<label class="text-xs text-gray-500 ml-4px">
						<div>{{ $t("下次登入記住帳號") }}</div>
					</label>
				</div>
				<div class="absolute ml-320px text-xs">
					<router-link to="/admission/applicant/forgetpassword">
						<div class="text-right font-bold goldText">
							{{ $t("忘記密碼") }}
						</div>
					</router-link>
				</div>
			</div>
			<div class="ml-168px mt-40px">
				<Turnstile ref="turnstileRef" />
			</div>
			<div class="mt-50px ml-168px">
				<!-- TODO: add spinning wheel while Turnstile runs -->
				<Button
					class="bg-darkBlue h-60px w-420px"
					type="submit"
					:loading="isTurnstileRunning || isSubmitting"
					:label="$t('登入')"
				/>
			</div>
		</form>
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

<style setup lang="css">
.input {
	width: 420px;
}
.goldText {
	color: #897a27;
}
.bg-darkBlue {
	background-color: #07385a;
}
</style>
