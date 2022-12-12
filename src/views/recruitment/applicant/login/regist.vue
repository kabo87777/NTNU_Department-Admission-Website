<template>
	<!-- Return Button -->
	<router-link to="/recruitment/applicant/signin">
		<NButton type="White" icon="pi pi-angle-left" p="2" my="4">
			回到登入畫面 Back to login page
		</NButton>
	</router-link>
	<!-- Title -->
	<Title logo="true">
		<template #Subtitle>
			<div class="<md:hidden">國立臺灣師範大學資訊工程學系</div>
		</template>
		<template #Chinese>教師聘請系統</template>
		<template #English>Teacher Recruitment System</template>
		<template #Divider>
			<div text="pApplicant">申請者註冊 Applicant Regist</div>
		</template>
	</Title>
	<!-- Body: Edit Regist Form -->
	<Body v-if="registState === 'Edit'">
		<template #Content>
			<!-- Username -->
			<div space="y-1">
				<div text="sm body">輸入使用者名稱 Enter Username</div>
				<InputText
					name="username"
					type="text"
					v-model="userRegistData.name"
					class="h-12 w-full"
					:class="{ 'p-invalid': password.isNameBlank }"
					required
				/>
				<div text="xs danger" v-if="password.isNameBlank">
					※ 必須輸入使用者名稱 Username is required.
				</div>
			</div>
			<!-- E-mail -->
			<div space="y-1">
				<div text="sm body">設置電郵 Setting E-mail</div>
				<InputText
					name="email"
					type="email"
					v-model="userRegistData.email"
					class="h-12 w-full"
					:class="{ 'p-invalid': password.isNameBlank }"
					required
				/>
				<div text="xs danger" v-if="password.isEmailBlank">
					※ 必須輸入輸入電郵 E-mail is required.
				</div>
				<div text="xs danger" v-else-if="password.isEmailBlank">
					※ 必須是電子郵件 Format has to be E-mail.
				</div>
			</div>
			<!-- Set new PWD -->
			<div space="y-1" w="full">
				<div text="sm body">設置密碼 Setting Password</div>
				<InputText
					name="password"
					type="password"
					v-model="userRegistData.password"
					class="h-12 w-full"
					:class="{
						'p-invalid': password.isCurrentPassBlank,
					}"
					required
				/>
				<div text="xs danger" v-if="password.isCurrentPassBlank">
					※ 請輸入新密碼 Please set your new password.
				</div>
			</div>
			<!-- Comfirm PWD -->
			<div space="y-1">
				<div text="sm body">確認密碼 Confirm Password</div>
				<InputText
					name="password"
					type="password"
					v-model="userRegistData.password_confirmation"
					class="h-12 w-full"
					:class="{ 'p-invalid': password.notMatch }"
					required
				/>
				<div text="xs danger" v-if="password.notMatch">
					※ 密碼不符 Confirm password is not matched.
				</div>
			</div>
		</template>
		<template #Footer>
			<!-- Regist Button -->
			<NButton
				class="w-3/5 p-2 m-auto"
				type="Applicant"
				size="lg"
				:loading="isRegistLoading"
				@click="handleSubmit"
			>
				註冊 Register
			</NButton>
			<!-- Captcha -->
			<div>
				<Turnstile ref="turnstileRef" />
			</div>
		</template>
	</Body>
	<!-- Body: Submit and Regist Success -->
	<Body v-if="registState === 'Submit'">
		<template #Content>
			<!-- Regist Successful -->
			<div flex="~ col" text="success xl" class="items-center py-10">
				<i
					class="pi pi-check-circle"
					m="b-4 r-2"
					style="font-size: 4rem"
				/>
				<div>註冊成功</div>
				<div>Successfull</div>
			</div>
		</template>
		<template #Footer>
			<!-- Info: Check E-mail -->
			<div
				class="flex justify-center items-center p-6 gap-6 my-6 w-full"
				text="sm secondary"
				bg="nGrey-50"
				border="rounded-xl"
			>
				<i class="pi pi-envelope" style="font-size: 2rem" />
				<div class="space-y-1">
					<div>請至郵箱啟動帳號，並返回登入畫面</div>
					<div>
						Please check your mail and active your account, then go
						back to login page.
					</div>
				</div>
			</div>
		</template>
	</Body>
</template>

<script setup lang="ts">
import NButton from "@/styles/CustomButton.vue";
import Title from "@/styles/login/LoginTitle.vue";
import Body from "@/styles/login/LoginBody.vue";
import { reactive, toRaw } from "vue";
import { RecruitmentApplicantAPI } from "@/api/recruitment/applicant/api";
import { useRecruitmentApplicantAuthStore } from "@/stores/universalAuth";
import InputText from "primevue/inputtext";
import { useRouter } from "vue-router";
import { ref } from "vue";
import type { TurnstileComponentExposes } from "@/components/Turnstile.vue";
import Turnstile from "@/components/Turnstile.vue";

const registState = ref("Edit");

const applicantAuth = useRecruitmentApplicantAuthStore();
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

// const redirectToRegistDonePage = () => {
// 	router.replace({ name: "recruitmentApplicantRegistDone" });
// };
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
			registState.value = "Submit";
		}
	}
};
</script>
