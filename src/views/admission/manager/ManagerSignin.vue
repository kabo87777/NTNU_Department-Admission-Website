<template>
	<div class="grid grid-cols-2 gap-15px">
		<div>
			<img src="/assets/login-page/Login-img.png" class="h-screen" />
		</div>
		<div class="m-auto">
			<div class="flex m-auto h-15">
				<div>
					<img
						src="/assets/login-page/NTNU-logo-B1.png"
						class="h-15"
					/>
				</div>
				<Divider layout="vertical" />
				<div class="mt-1.5">
					<div class="text-4xl font-bold text-gray-500">
						資訊工程學系
					</div>
					<div class="text-xs text-gray-400">
						Department of Computer Science and Information
						Enginering
					</div>
				</div>
			</div>
			<div>
				<div class="mt-100px ml-164px text-4xl font-bold text-gray-500">
					{{ $t("審查委員及行政人員管理系統") }}
				</div>
			</div>
			<form @submit="onSubmit" ref="form">
				<Field
					name="email"
					v-slot="{ field, errorMessage, meta }"
					v-model="email"
				>
					<div class="block mt-50px ml-168px">
						<div class="text-base text-gray-600">
							<label for="email">{{ $t("電郵") }}</label>
						</div>
						<div class="mt-4px">
							<InputText
								v-bind="field"
								name="email"
								type="email"
								:disabled="isSubmitting"
							/>
						</div>
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
								:disabled="isSubmitting"
							/>
						</div>
						<span v-if="errorMessage && meta.touched">
							{{ errorMessage }}
						</span>
					</div>
				</Field>
				<div class="flex relative ml-168px mt-8px">
					<div class="flex">
						<div class="pt-3px">
							<Checkbox
								v-model="isRememberAccount"
								:binary="true"
							/>
						</div>
						<label class="text-xs text-gray-500 ml-4px">
							<div>{{ $t("下次登入記住帳號") }}</div>
						</label>
					</div>
					<div class="absolute ml-320px text-xs">
						<router-link to="/admission/manager/forgetpassword">
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
						:disabled="isSubmitting"
					>
						<div class="m-auto text-2xl">
							<div>{{ $t("登入") }}</div>
						</div>
					</Button>
				</div>
			</form>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { Field, Form, useForm } from "vee-validate";
import * as yup from "yup";

import { useAdmissionManagerAuthStore } from "@/stores/universalAuth";
import { doUniversalAuth } from "@/api/universalAuth";

import type { TurnstileComponentExposes } from "@/components/Turnstile.vue";
import Turnstile from "@/components/Turnstile.vue";

import Checkbox from "primevue/checkbox";
import Button from "primevue/button";
import InputText from "primevue/inputtext";

interface AdmissionManagerAuthResponse {
	email: string;
	provider: string;
	uid: string;
	id: number;
	allow_password_change: boolean;
	isInit: any | null;
	lang: any | null;
	name: any | null;
	nickname: any | null;
	image: any | null;
}

const router = useRouter();

const redirectToMainContainer = () =>
	router.push({ name: "AdmissionManagerMainContainer" });

const validationSchema = yup.object({
	email: yup.string().required().email("Invalid email"),
	password: yup
		.string()
		.required("Required")
		.min(8, "Must be 8 characters or more")
		.matches(/[a-z]+/, "One lowercase character")
		.matches(/[A-Z]+/, "One uppercase character"),
});

// Go to AdmissionManagerMainContainer if signed in
// TODO: check session validity
const auth = useAdmissionManagerAuthStore();
if (auth.credentials) redirectToMainContainer();

// Login Form
const turnstileRef = ref<TurnstileComponentExposes>();
const isRememberAccount = ref(false);
const email = ref("asdasssddddsd@birkhoff.me");
const password = ref("123");

// https://vee-validate.logaretm.com/v4/guide/composition-api/handling-forms/#javascript-submissions-ajax
const { handleSubmit, isSubmitting } = useForm({
	validationSchema,
});

// Get remember account status
const lastSigninEmail = window.localStorage.getItem(
	"AdmissionManagerSigninLastEmail"
);

if (lastSigninEmail) {
	isRememberAccount.value = true;
	email.value = lastSigninEmail;
}

// remove legacy item (renamed)
window.localStorage.removeItem("AdmissionManagerSigninLastSigninEmail");

// Store email in localStorage if remember account
watch(isRememberAccount, (isChecked) => {
	if (!isChecked)
		window.localStorage.removeItem("AdmissionManagerSigninLastEmail");
});

const onSubmit = handleSubmit(async function (values, actions) {
	window.localStorage.setItem("AdmissionManagerSigninLastEmail", email.value);

	try {
		// TODO: show error message
		if (!turnstileRef.value?.turnstileToken)
			throw new Error("Turnstile challenge failed");

		const response = await doUniversalAuth(auth, {
			email: values.email,
			password: values.password,
			"cf-turnstile-response": turnstileRef.value.turnstileToken,
		});

		// TODO: validation??
		const data: AdmissionManagerAuthResponse = response.data;

		// FIXME: verify backend error message
		if (!data.email)
			throw new Error("Sign-in failure: " + JSON.stringify(data));

		// TODO: persistent auth store in localStorage

		redirectToMainContainer();
	} catch (e) {
		// TODO: login failed notification with toast
		console.log(e);
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
