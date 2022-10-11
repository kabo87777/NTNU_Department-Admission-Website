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
			<div class="block mt-50px ml-168px">
				<div class="text-base text-gray-600">
					<label for="email">{{ $t("電郵") }}</label>
				</div>
				<div class="mt-4px">
					<InputText
						v-model="email"
						id="email"
						type="email"
						class="input"
					/>
				</div>
			</div>
			<div class="block mt-24px ml-168px">
				<div class="text-base text-gray-600">
					<label for="password">{{ $t("密碼") }}</label>
				</div>
				<div class="mt-4px">
					<InputText
						v-model="password"
						id="password"
						type="password"
						class="input"
					/>
				</div>
			</div>
			<div class="flex relative ml-168px mt-8px">
				<div class="flex">
					<div class="pt-3px">
						<Checkbox
							v-model="isRememberAccount"
							:binary="true"
							@click="handleCheck()"
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
				<Turnstile ref="turnstileToken" />
			</div>
			<div class="mt-50px ml-168px">
				<Button
					class="bg-darkBlue h-60px w-420px"
					@click="handleSignin"
				>
					<div class="m-auto text-2xl">
						<div>{{ $t("登入") }}</div>
					</div>
				</Button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import InputText from "primevue/inputtext";
import Checkbox from "primevue/checkbox";
import Button from "primevue/button";
import { ref } from "vue";
import { useRouter } from "vue-router";

import type { AuthCredentials } from "@/stores/universalAuth";
import { useAdmissionManagerAuthStore } from "@/stores/universalAuth";
import { sign_in } from "@/api/admission/applicant/api";
import Turnstile from "@/components/Turnstile.vue";

const router = useRouter();
const auth = useAdmissionManagerAuthStore();
// const redirectToMainContainer = () =>
// 	router.push({ name: "AdmissionManagerMainContainer" });

// Go to AdmissionManagerMainContainer if signed in
// TODO: check session validity
if (auth.credentials) redirectToMainContainer();

// Login Form
const turnstileToken = ref(null);
const isRememberAccount = ref(false);
const email = ref("asdasssddddsd@birkhoff.me");
const password = ref("123");

// Get remember account status
const lastSigninEmail = window.localStorage.getItem(
	"AdmissionManagerSigninLastSigninEmail"
);

if (lastSigninEmail) {
	isRememberAccount.value = true;
	email.value = lastSigninEmail;
}

// Remember account checkbox state
const handleCheck = () => {
	isRememberAccount.value = !isRememberAccount.value;
};

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

const handleSignin = async () => {
	// Store email in localStorage if remember account
	if (isRememberAccount.value) {
		window.localStorage.setItem(
			"AdmissionManagerSigninLastSigninEmail",
			email.value
		);
	}

	try {
		const response = await sign_in({
			email: email.value,
			password: password.value,
		});

		const credentials: AuthCredentials = {
			"access-token": response.headers["access-token"] || "",
			"token-type": response.headers["token-type"] || "",
			client: response.headers["client"] || "",
			expiry: Number(response.headers["expiry"] || NaN),
			uid: response.headers["uid"] || "",
		};

		if (Object.values(credentials).some((p) => !p))
			throw new Error("Server returned invalid authorization response");

		const data: AdmissionManagerAuthResponse = response.data.data;

		if (!data.email)
			throw new Error("Sign-in failure: " + JSON.stringify(data));

		auth.credentials = credentials;

		redirectToMainContainer();
	} catch (e) {
		// TODO: login failed notification with toast
		console.log(e);
	}
};
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
