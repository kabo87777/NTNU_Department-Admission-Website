<template>
	<div class="mt-80px ml-50px">
		<div class="font-[500] text-[32px] font-bold">
			{{ $t("使用者管理") }}
		</div>
		<div class="bigYellowDivider"></div>
		<div class="mt-8px px-12px py-24px">
			<div class="text-[20px] font-[350]">
				{{ $t("帳號名稱") }}{{ $t(":") }}{{ " " }}{{ reviewerInfo.name }}
			</div>
			<div class="mt-36px text-[20px] font-[350]">
				{{ $t("聯絡信箱") }}{{ $t(":") }}{{ " " }}{{ reviewerInfo.email }}
			</div>
			<div class="mt-36px text-[20px] font-[350]">
				{{ $t("手機號碼") }}{{ $t(":") }}{{ " " }} 手機號碼缺失
			</div>
		</div>
		<ParagraphDivider class="mt-12px" />
		<div class="mt-20px font-[500] font-bold text-[24px] flex">
			<div>{{ $t("修改密碼") }}</div>
			<i class="pi pi-lock ml-16px mt-4px text-[#C6BCD0]" />
		</div>
		<div class="mt-8px px-12px py-24px">
			<div class="w-[50%]">
				<div>{{ $t("舊密碼") }}{{ $t(":") }}</div>
				<div>
					<InputText
						class="w-[70%] h-40px !mt-4px"
						id="currentPass"
						type="password"
						v-model="password.currentPass"
						aria-describedby="currentPass-help"
					/>
				</div>
				<div class="absolute" v-if="password.isCurrentPassBlank">
					<small id="currentPass-help" class="p-error">
						{{ $t("請輸入舊密碼") }}
					</small>
				</div>
			</div>
			<div class="flex mt-40px">
				<div class="w-[50%]">
					<div>{{ $t("設定新密碼") }}{{ $t(":") }}</div>
					<div>
						<InputText
							class="w-[70%] h-40px !mt-4px"
							id="newPass"
							type="password"
							v-model="password.newPass"
							aria-describedby="newPass-help"
						/>
					</div>
					<div class="absolute" v-if="password.isNewPassBlank">
						<small id="newPass-help" class="p-error">
							{{ $t("請輸入新密碼") }}
						</small>
					</div>
				</div>
				<div class="w-[50%]">
					<div>{{ $t("驗證新密碼") }}{{ $t(":") }}</div>
					<div>
						<InputText
							class="w-[70%] h-40px !mt-4px"
							id="confirmPass"
							type="password"
							v-model="password.confirmPass"
							aria-describedby="confirmPass-help"
						/>
					</div>
					<div class="absolute" v-if="password.notMatch">
						<small id="confirmPass-help" class="p-error">
							{{ $t("密碼不符") }}
						</small>
					</div>
				</div>
			</div>
			<Button
				class="p-button-sm p-button-secondary p-button-outlined !mt-60px"
				@click="handleSubmit"
			>
				<i class="pi pi-pencil" />
				<p class="ml-8px text-16px font-[500] font-bold">
					{{ $t("修改送出") }}
				</p>
			</Button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, toRaw } from "vue";
import { useRoute } from "vue-router";
import { UserInfo } from "@/api/admission/applicant/types";
import ParagraphDivider from "@/styles/paragraphDividerApplicant.vue";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import "primeicons/primeicons.css";
import { AdmissionReviewerAPI } from "@/api/admission/reviewer/api";
import { useAdmissionReviewerAuthStore } from "@/stores/universalAuth";
import { AdmissionManagerAuthResponse } from "@/api/admission/reviewer/types";
import { useUserInfoStore } from "@/stores/AdmissionApplicantStore";

const reviewerAuth = useAdmissionReviewerAuthStore();
const reviewerStore = useUserInfoStore();
const api = new AdmissionReviewerAPI(reviewerAuth);

const reviewerInfo: AdmissionManagerAuthResponse = toRaw(
	reviewerStore.userInfo
);

const route = useRoute();

const initialPassValue = {
	isCurrentPassBlank: false,
	isNewPassBlank: false,
	notMatch: false,
	currentPass: "",
	newPass: "",
	confirmPass: "",
};

const password = reactive(initialPassValue);

// const resetPassValue = () => {
// 	password.isCurrentPassBlank = initialPassword.isCurrentPassBlank;
// 	password.isNewPassBlank = initialPassword.isNewPassBlank;
// 	password.notMatch = initialPassword.notMatch;
// 	password.currentPass = initialPassword.currentPass;
// 	password.newPass = initialPassword.newPass;
// 	password.confirmPass = initialPassword.confirmPass;
// };

const isChangePassLoading = ref(false);

// const patchChangePassword = async (body: object) => {
// 	try {
// 		return await api.changePassword(body);
// 	} catch (e: any) {
// 		if (e instanceof InvalidSessionError) {
// 			console.error(
// 				"Session has already expired while changing password"
// 			);
// 			return;
// 		}
// 	}
// };

const handleSubmit = () => {
	if (password.currentPass === "") {
		password.isCurrentPassBlank = true;
	} else {
		password.isCurrentPassBlank = false;
	}

	if (password.newPass === "") {
		password.isNewPassBlank = true;
	} else {
		password.isNewPassBlank = false;
	}

	if (password.newPass !== password.confirmPass) {
		password.notMatch = true;
	} else {
		password.notMatch = false;
	}

	if (
		!password.isCurrentPassBlank &&
		!password.isNewPassBlank &&
		!password.notMatch
	) {
		isChangePassLoading.value = true;

		const body = {
			current_password: password.currentPass,
			password: password.newPass,
			password_confirmation: password.confirmPass,
		};

		// const response = patchChangePassword(body);

		
		// // resetPassValue();
		// console.log(
		// 	password.currentPass,
		// 	password.newPass,
		// 	password.confirmPass
		// );
	}
};

onMounted(() => {
	//console.log(route.params);
});
</script>
