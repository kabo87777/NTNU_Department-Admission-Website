<template>
	<Toast position="top-right" />
	<!-- Title -->
	<Title>
		<template #Subtitle>
			<div class="<md:hidden">國立臺灣師範大學資訊工程學系</div>
		</template>
		<template #Chinese>教師聘請系統</template>
		<template #English>Teacher Recruitment System</template>
		<template #Divider>
			<div text="pReviewer">審查委員重設密碼 Reset Password</div>
		</template>
	</Title>
	<!-- Body -->
	<Body>
		<template #Content>
			<!-- Set Password -->
			<div flex="~ col gap-1">
				<div text="sm body">設置密碼 Setting Password</div>
				<InputText
					name="password"
					id="newPass"
					type="password"
					v-model="password.newPass"
					class="h-12 w-full"
					required
				/>
				<div text="xs danger" v-if="password.isNewPassBlank">
					※ 請輸入新密碼 Please Set your new Password.
				</div>
			</div>
			<!-- Confirm Password -->
			<div flex="~ col gap-1">
				<div text="sm body">確認密碼 Confirm Password</div>
				<InputText
					name="password"
					id="confirmPass"
					type="password"
					v-model="password.confirmPass"
					class="h-12 w-full"
					required
				/>
				<div text="xs danger" v-if="password.notMatch">
					※ 密碼不符 Confirm password is not matched.
				</div>
			</div>
		</template>
		<template #Footer>
			<!-- Submit Button -->
			<NButton
				class="w-3/5 p-2 m-auto"
				type="Admin"
				size="lg"
				:loading="isChangePassLoading"
				@click="onSubmit()"
			>
				提交 Submit
			</NButton>
		</template>
	</Body>
</template>

<script setup lang="ts">
import InputText from "primevue/inputtext";
import NButton from "@/styles/CustomButton.vue";
import Title from "@/styles/login/LoginTitle.vue";
import Body from "@/styles/login/LoginBody.vue";
import { ref, toRaw, reactive } from "vue";
import { useToast } from "primevue/usetoast";
import { useRecruitmentReviewerAuthStore } from "@/stores/universalAuth";
import { RecruitmentReviewerAPI } from "@/api/recruitment/reviewer/api";
import { universalAuthResetPwdData } from "@/api/universalAuth";
import Button from "primevue/button";
import { useRouter } from "vue-router";
const router = useRouter();

const toast = useToast();
const reviewerAuth = useRecruitmentReviewerAuthStore();
const api = new RecruitmentReviewerAPI(reviewerAuth);
const isChangePassLoading = ref(false);
let changePassRes = reactive({
	success: false,
	message: "" as string | [],
});
const url = window.location;

const access_token = new URLSearchParams(url.search).get("access-token");
const client = new URLSearchParams(url.search).get("client");
const uid = new URLSearchParams(url.search).get("uid");

// console.log("access_token = ", access_token);
// console.log("client = ", client);
// console.log("uid = ", uid);

let password = reactive({
	isNewPassBlank: false,
	notMatch: false,
	newPass: "",
	confirmPass: "",
});

const putResetPassword = async (data: universalAuthResetPwdData) => {
	if (!access_token || !client || !uid)
		throw new Error("Missing credentials");

	return await api.requestResetPasswordSession(
		data,
		access_token,
		client,
		uid
	);
};

const onSubmit = async () => {
	password.isNewPassBlank = password.newPass === "";
	password.notMatch = password.newPass !== password.confirmPass;

	if (password.notMatch) return;

	isChangePassLoading.value = true;

	const body: universalAuthResetPwdData = {
		password: password.newPass,
		password_confirmation: password.confirmPass,
	};

	const res = await putResetPassword(body);

	if (res?.error === false && res?.message !== undefined) {
		changePassRes.success = toRaw(!res.error);
		changePassRes.message = toRaw(res.message);
	}

	isChangePassLoading.value = false;

	if (changePassRes.success) {
		toast.add({
			severity: "success",
			summary: "Success",
			detail: "變更密碼成功 ! (3 秒後為您導向登入畫面)。",
			life: 3000,
		});
		setTimeout(() => {
			router.replace({ name: "recruitmentReviewerSignin" });
		}, 3000);
	} else if (
		!changePassRes.success &&
		password.newPass !== "" &&
		password.confirmPass !== ""
	) {
		toast.add({
			severity: "error",
			summary: "Error",
			detail: changePassRes.message[changePassRes.message.length - 1],
			life: 5000,
		});
	}
};
</script>

<style setup lang="css">
.reviewerTextColor {
	color: #0b4873;
}

.reviewerButtonStyle {
	background-color: #dfe7fd;
	border-color: #a5b9ec;
	color: #003a5c;
}
.reviewerButtonStyle:hover {
	background-color: #2459a4;
	border-color: #2459a4;
	color: white;
}
.reviewerButtonStyle:active {
	background-color: #0b4873;
	border-color: #0b4873;
	color: white;
}
</style>
