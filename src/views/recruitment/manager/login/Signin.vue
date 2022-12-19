<template>
	<!-- Return Button -->
	<router-link :to="{ name: 'RecruitmentSignin' }">
		<NButton white size="sm" icon="pi pi-angle-left" p="2" my="6">
			切換登入身份 Change your identity
		</NButton>
	</router-link>
	<!-- Title -->
	<Title>
		<template #Subtitle>
			<div class="<md:hidden">國立臺灣師範大學資訊工程學系</div>
		</template>
		<template #Chinese>教師聘請系統</template>
		<template #English>Teacher Recruitment System</template>
		<template #Divider>
			<div text="pAdmin">行政人員登入 Manager Login</div>
		</template>
	</Title>
	<!-- Body -->
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
						<div v-if="errorMessage" text="sm danger">
							※ 電郵地址不可為空白 E-mail Required
						</div>
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
				<router-link to="/recruitment/manager/forgetpassword">
					<NButton w="3/5" p="2" m="auto" size="sm" white>
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

import { RecruitmentAdminAPI } from "@/api/recruitment/admin/api";
import { useRecruitmentAdminAuthStore } from "@/stores/universalAuth";
import { useUserInfoStore } from "@/stores/RecruitmentReviewerStore";

import type { TurnstileComponentExposes } from "@/components/Turnstile.vue";
import Turnstile from "@/components/Turnstile.vue";

import Checkbox from "primevue/checkbox";
import InputText from "primevue/inputtext";
import NButton from "@/styles/CustomButton.vue";
import Title from "@/styles/login/LoginTitle.vue";
import Body from "@/styles/login/LoginBody.vue";

const toast = useToast();
const router = useRouter();
const userInfo = useUserInfoStore();

const authStore = useRecruitmentAdminAuthStore();

// Login Form
const turnstileRef = ref<TurnstileComponentExposes>();
const isRememberAccount = ref(false);
const email = ref("ntnuradmin1@yopmail.com");
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
	"RecruitmentAdminSigninLastEmail"
);

if (lastSigninEmail) {
	isRememberAccount.value = true;
	email.value = lastSigninEmail;
}

// Store email in localStorage if remember account
watch(isRememberAccount, (isChecked) => {
	if (!isChecked)
		window.localStorage.removeItem("RecruitmentAdminSigninLastEmail");
});

const consumeTurnstileToken = () => {
	const token: string | undefined = turnstileRef.value?.turnstileToken;
	window.turnstile?.reset();
	return token;
};

const onSubmit = handleSubmit(async function (values) {
	window.localStorage.setItem("RecruitmentAdminSigninLastEmail", email.value);

	try {
		const turnstileResponse = consumeTurnstileToken();

		if (!turnstileResponse) throw new Error("Turnstile challenge failed");

		const api = new RecruitmentAdminAPI(authStore);

		userInfo.saveUserInfo(
			await api.requestNewSession({
				email: values.email,
				password: values.password,
				"cf-turnstile-response": turnstileResponse,
			})
		);

		router.replace({ name: "RecruitmentAdminMainContainer" });
	} catch (e: any) {
		console.error(e.toString());
		if (e?.response?.status === 401) {
			return toast.add({
				severity: "error",
				group: "loginFailure",
				summary: "「電郵地址」或「密碼」",
				detail: "E-mail and Password",
				closable: false,
				life: 3000,
			});
		}
	}
});
</script>
