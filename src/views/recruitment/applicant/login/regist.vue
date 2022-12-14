<template>
	<div my="auto">
		<!-- Button: Back to Applicant Signin -->
		<router-link to="/recruitment/applicant/signin">
			<button
				class="flex items-center gap-2 p-2 my-4"
				text="sm secondary"
				border="rounded-lg"
				hover="bg-nGrey-200 text-title"
				active="bg-nGrey-600 text-white"
			>
				<i class="pi pi-angle-left" />
				<div>回到登入畫面</div>
				<div>Back to login page</div>
			</button>
		</router-link>
		<div mx="4" space="y-2">
			<div text="secondary" font="light">
				國立臺灣師範大學資訊工程學系
			</div>
			<div text="3xl title" font="medium">教師徵聘系統</div>
			<div text="lg title" font="medium">Teacher Recruitment System</div>
		</div>
		<!-- Divider -->
		<Divider align="center">
			<div p="4" text="sm pApplicant">申請者註冊 Applicant Register</div>
		</Divider>
		<!-- Regist Form -->
		<div flex="~ col gap-6" w="3/4" mx="auto">
			<!-- Username -->
			<div flex="~ col gap-1" text="sm body" font="light">
				<div>輸入使用者名稱 Enter Username</div>
				<InputText
					name="username"
					type="text"
					v-model="userRegistData.name"
					class="h-11"
					:class="{ 'p-invalid': password.isNameBlank }"
					required
				/>
				<div text="xs danger" v-if="password.isNameBlank">
					※ 必須輸入使用者名稱 Username is required.
				</div>
			</div>
			<!-- E-mail -->
			<div flex="~ col gap-1" text="sm body" font="light">
				<div>設置電郵 Setting E-mail</div>
				<InputText
					name="email"
					type="email"
					v-model="userRegistData.email"
					class="h-11"
					:class="{ 'p-invalid': password.isNameBlank }"
					required
				/>
				<div text="xs danger" v-if="password.isEmailBlank">
					※ 必須輸入輸入電郵 E-mail is required.
				</div>
			</div>

			<div flex="~ col gap-1" text="sm body" font="light">
				<div>設置密碼 Setting Password</div>
				<InputText
					name="password"
					type="password"
					v-model="userRegistData.password"
					class="h-11"
					:class="{
						'p-invalid': password.isCurrentPassBlank,
					}"
					required
				/>
				<div text="xs danger" v-if="password.isCurrentPassBlank">
					※ 請輸入新密碼 Please set your new password.
				</div>
			</div>
			<div flex="~ col gap-1" text="sm body" font="light">
				<div>確認密碼 Confirm Password</div>
				<InputText
					name="password"
					type="password"
					v-model="userRegistData.password_confirmation"
					class="h-11"
					:class="{ 'p-invalid': password.notMatch }"
					required
				/>
				<div text="xs danger" v-if="password.notMatch">
					※ 密碼不符 Confirm password is not matched.
				</div>
			</div>
		</div>
		<!-- Regist Button -->
		<div flex="~ col" w="60" m="x-auto t-8 b-auto">
			<button
				class="p-2 w-full border-2 text-pApplicant"
				border="2 opacity-30 nGold-500 rounded-lg"
				hover="text-title bg-nGold-300 border-nGold-300"
				active="text-white bg-nGold-500"
				:loading="isRegistLoading"
				@click="handleSubmit"
			>
				<div class="flex justify-center gap-2 mx-auto">
					<div>註冊</div>
					<div>Register</div>
				</div>
			</button>
			<div>
				<Turnstile ref="turnstileRef" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import Button from "primevue/button";
import { reactive, toRaw } from "vue";
import { RecruitmentApplicantAPI } from "@/api/recruitment/applicant/api";
import { useRecruitmentApplicantAuthStore } from "@/stores/universalAuth";
import InputText from "primevue/inputtext";
import { useRouter } from "vue-router";
import { ref } from "vue";
import type { TurnstileComponentExposes } from "@/components/Turnstile.vue";
import Turnstile from "@/components/Turnstile.vue";

const applicantAuth = useRecruitmentApplicantAuthStore();
const router = useRouter();
const turnstileRef = ref<TurnstileComponentExposes>();
const isRegistLoading = ref(false);
let userRegistData = reactive({
	name: "",
	email: "",
	password: "",
	password_confirmation: "",
	confirm_success_url:
		"https://admissions-frontend-staging.birkhoff.me/recruitment/applicant/signin",
});

let password = reactive({
	isCurrentPassBlank: false,
	isNameBlank: false,
	isEmailBlank: false,
	isNewPassBlank: false,
	notMatch: false,
	currentPass: "",
	newPass: "",
	confirmPass: "",
});

let RegisterResponse = reactive({
	success: false,
	message: "" as string | [],
});

const consumeTurnstileToken = () => {
	const token: string | undefined = turnstileRef.value?.turnstileToken;
	window.turnstile?.reset();
	return token;
};

const redirectToRegistDonePage = () => {
	router.replace({ name: "recruitmentApplicantRegistDone" });
};
const postEmailRegister = async () => {
	try {
		const turnstileResponse = consumeTurnstileToken();
		if (!turnstileResponse) throw new Error("Turnstile challenge failed");
		const api = new RecruitmentApplicantAPI(applicantAuth);
		return await api.sendPostEmailRegister({
			name: userRegistData.name,
			email: userRegistData.email,
			password: userRegistData.password,
			password_confirmation: userRegistData.password_confirmation,
			confirm_success_url: userRegistData.confirm_success_url,
			"cf-turnstile-response": turnstileResponse,
		});
	} catch (error) {
		// TODO: show error message
		console.log(error);
	}
};

const handleSubmit = async () => {
	password.isNameBlank = userRegistData.name === "" ? true : false;

	if (userRegistData.email === "") {
		password.isEmailBlank = true;
	} else {
		password.isEmailBlank = false;
	}

	if (userRegistData.password === "") {
		password.isCurrentPassBlank = true;
	} else {
		password.isCurrentPassBlank = false;
	}

	if (userRegistData.password !== userRegistData.password_confirmation) {
		password.notMatch = true;
	} else {
		password.notMatch = false;
	}

	if (
		!password.isCurrentPassBlank &&
		!password.isNewPassBlank &&
		!password.isNameBlank &&
		!password.isEmailBlank &&
		!password.notMatch
	) {
		isRegistLoading.value = true;
		const res = await postEmailRegister();

		if (res?.status !== undefined && res?.message !== undefined) {
			RegisterResponse.success = toRaw(res.status);
			RegisterResponse.message = toRaw(res.message);
		}
		isRegistLoading.value = false;
		if (RegisterResponse.success) {
			redirectToRegistDonePage();
		}
	}
};
</script>
