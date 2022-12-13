<template>
	<Toast position="top-right" />
	<!-- Return Button -->
	<router-link to="/admission">
		<NButton type="White" size="sm" icon="pi pi-angle-left" p="2" my="6">
			切換登入身份 Change your identity
		</NButton>
	</router-link>
	<!-- Title -->
	<Title>
		<template #Subtitle>
			<div class="<md:hidden">國立臺灣師範大學資訊工程學系</div>
		</template>
		<template #Chinese>招生系統</template>
		<template #English>NTNU CSIE Admissions System</template>
		<template #Divider>
			<div text="pApplicant">申請者登入 Applicant Login</div>
		</template>
	</Title>
	<!-- Login Form -->
	<form @submit="onSubmit" ref="form">
		<Body>
			<template #Content>
				<!-- Account -->
				<Field
					name="username"
					v-slot="{ field, errorMessage, meta }"
					v-model="username"
				>
					<div flex="~ col gap-1">
						<div text="sm body">准考證號碼 Registration Number</div>
						<InputText
							v-bind="field"
							name="username"
							type="text"
							class="h-12"
							:disabled="isSubmitting"
							required
						/>
					</div>
				</Field>
				<!-- Password -->
				<Field
					name="password"
					v-slot="{ field, errorMessage, meta }"
					v-model="password"
				>
					<div flex="~ col gap-1">
						<div text="sm body">密碼 Password</div>
						<InputText
							v-bind="field"
							name="password"
							type="password"
							class="h-12"
							:disabled="isSubmitting"
							required
						/>
					</div>
				</Field>
				<!-- Remember Account -->
				<div flex="~" gap="2" w="full" class="items-center">
					<Checkbox v-model="isRememberAccount" :binary="true" />
					<div text="sm secondary">
						<div>下次登入時記住帳號</div>
						<div>Remember Account at next Login</div>
					</div>
				</div>
			</template>
			<template #Footer>
				<!-- Login Button -->
				<Turnstile ref="turnstileRef" />
				<NButton
					class="w-3/5 p-2 m-auto"
					type="Applicant"
					size="lg"
					:loading="isTurnstileRunning || isSubmitting"
				>
					登入 Login
				</NButton>
				<!-- Forget Password Button -->
				<router-link to="/admission/applicant/forgetpassword">
					<NButton w="3/5" p="2" m="auto" size="sm" type="White">
						忘記密碼 Forget Password
					</NButton>
				</router-link>
			</template>
		</Body>
	</form>
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
import InputText from "primevue/inputtext";
import NButton from "@/styles/CustomButton.vue";
import Title from "@/styles/login/LoginTitle.vue";
import Body from "@/styles/login/LoginBody.vue";

const toast = useToast();
const router = useRouter();

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

		userInfo.saveUserInfo(
			(
				await api.requestNewSession({
					username: values.username,
					password: values.password,
					"cf-turnstile-response": turnstileResponse,
				})
			).data
		);

		window.localStorage.removeItem("AdmissionApplicantUsername");
		window.localStorage.setItem(
			"AdmissionApplicantUsername",
			userInfo.userInfo.name
		);

		router.replace({ name: "AdmissionApplicantMainContainer" });
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
