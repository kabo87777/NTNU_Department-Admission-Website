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
			<div text="pAdmin">行政人員登入 Manager Login</div>
		</template>
	</Title>
	<!-- Login Form -->
	<form @submit="onSubmit" ref="form">
		<Body>
			<template #Content>
				<!-- Account -->
				<Field
					name="email"
					v-slot="{ field, errorMessage }"
					v-model="email"
				>
					<div flex="~ col gap-1">
						<div text="sm body">電郵地址 E-mail</div>
						<InputText
							v-bind="field"
							name="email"
							type="email"
							class="h-12"
							:class="{ 'p-invalid': errorMessage }"
							:disabled="isSubmitting"
							required
						/>
					</div>
					<div v-if="errorMessage" text="sm danger">
						※ 電郵地址不可為空白 E-mail Required
					</div>
				</Field>
				<!-- Password -->
				<Field
					name="password"
					v-slot="{ field, errorMessage }"
					v-model="password"
				>
					<div flex="~ col gap-1">
						<div text="sm body">密碼 Password</div>
						<InputText
							v-bind="field"
							name="password"
							type="password"
							class="h-12"
							:class="{ 'p-invalid': errorMessage }"
							:disabled="isSubmitting"
							required
						/>
						<div v-if="errorMessage" text="sm danger">
							※ 密碼不可為空白 Password Required
						</div>
					</div>
				</Field>
				<!-- Remember Account -->
				<div flex="~" gap="2" w="full" class="items-center">
					<Checkbox v-model="isRememberAccount" :binary="true" />
					<div text="sm body">
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
					type="Admin"
					size="lg"
					:loading="isTurnstileRunning || isSubmitting"
				>
					登入 Login
				</NButton>
				<!-- Forget Password -->
				<router-link to="/admission/manager/forgetpassword">
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
import { ref, watch, computed } from "vue";
import { useRouter } from "vue-router";
import { Field, useForm } from "vee-validate";
import * as yup from "yup";

import { AdmissionAdminAPI } from "@/api/admission/admin/api";
import { useAdmissionAdminAuthStore } from "@/stores/universalAuth";
import { useUserInfoStore } from "@/stores/AdmissionAdminStore";

import type { TurnstileComponentExposes } from "@/components/Turnstile.vue";
import Turnstile from "@/components/Turnstile.vue";

import Checkbox from "primevue/checkbox";
import InputText from "primevue/inputtext";
import NButton from "@/styles/CustomButton.vue";
import Title from "@/styles/login/LoginTitle.vue";
import Body from "@/styles/login/LoginBody.vue";

const toast = useToast();
const router = useRouter();

const authStore = useAdmissionAdminAuthStore();
const userInfo = useUserInfoStore();

// Login Form
const turnstileRef = ref<TurnstileComponentExposes>();
const isRememberAccount = ref(false);
const email = ref("ntnuaadmin1@yopmail.com");
const password = ref("Example123");
const isTurnstileRunning = computed(() => !turnstileRef.value?.turnstileToken);

// TODO: i18n error message
// https://vee-validate.logaretm.com/v4/guide/composition-api/handling-forms/#javascript-submissions-ajax
const { handleSubmit, isSubmitting } = useForm({
	validationSchema: yup.object({
		email: yup.string().required("Required"),
		password: yup.string().required("Required"),
	}),
});

// Get remember account status
const lastSigninEmail = window.localStorage.getItem(
	"AdmissionManagerSigninLastEmail"
);

if (lastSigninEmail) {
	isRememberAccount.value = true;
	email.value = lastSigninEmail;
}

// Store email in localStorage if remember account
watch(isRememberAccount, (isChecked) => {
	if (!isChecked)
		window.localStorage.removeItem("AdmissionManagerSigninLastEmail");
});

const consumeTurnstileToken = () => {
	const token: string | undefined = turnstileRef.value?.turnstileToken;
	window.turnstile?.reset();
	return token;
};

const onSubmit = handleSubmit(async function (values) {
	window.localStorage.setItem("AdmissionManagerSigninLastEmail", email.value);

	try {
		const turnstileResponse = consumeTurnstileToken();

		if (!turnstileResponse) throw new Error("Turnstile challenge failed");

		const api = new AdmissionAdminAPI(authStore);

		userInfo.saveUserInfo(
			(
				await api.requestNewSession({
					email: values.email,
					password: values.password,
					"cf-turnstile-response": turnstileResponse,
				})
			).data
		);

		router.replace({ name: "AdmissionManagerMainContainer" });
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
