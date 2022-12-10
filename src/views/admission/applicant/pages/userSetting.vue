<template>
	<div>
		<div class="font-[500] text-[32px] font-bold">
			{{ $t("使用者管理") }}
		</div>
		<div class="bigYellowDivider"></div>
		<div class="mt-8px px-12px py-24px">
			<div class="text-[20px] font-[350]">
				{{ $t("帳號名稱") }}{{ $t(":") }}{{ applicantInfo.username }}
			</div>
			<div class="flex mt-36px text-[20px] font-[350]">
				<div class="flex">
					<div>{{ $t("聯絡信箱") }}{{ $t(":") }}</div>
					<div v-if="email.isEdit">
						<InputText
							class="w-400px h-40px !mt-[-12px]"
							v-model="email.email"
						/>
					</div>
					<div v-else>{{ email.email }}</div>
				</div>
				<div class="ml-16px">
					<Button
						icon="pi pi-pencil"
						class="p-button-rounded p-button-outlined p-button-secondary"
						style="
							color: #736028;
							font-size: small;
							width: 32px;
							height: 32px;
							margin-top: -8px;
						"
						v-tooltip.right="t('編輯電子郵件')"
						@click="email.isEdit = !email.isEdit"
					/>
					<Button
						v-if="email.isEdit"
						icon="pi pi-check"
						class="p-button-rounded p-button-outlined p-button-secondary"
						style="
							color: #736028;
							font-size: small;
							width: 32px;
							height: 32px;
							margin-top: -8px;
							margin-left: 16px;
						"
						v-tooltip.right="t('確認')"
						:loading="isLoading.editEmail"
						@click="handleEditEmail"
					/>
				</div>
			</div>
			<!-- <div class="mt-36px text-[20px] font-[350]">
				{{ $t("手機號碼") }}{{ $t(":") }}{{ " "
				}}{{ applicantInfo.name }}
			</div> -->
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
				class="p-button-sm p-button-secondary p-button-outlined !mt-60px !text-[16px]"
				type="submit"
				icon="pi pi-pencil"
				:loading="isLoading.changePass"
				@click="handleSubmit()"
				:label="$t('修改送出')"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, reactive, toRaw } from "vue";
import { AdmissionApplicantAuthResponse } from "@/api/admission/applicant/types";
import { useAdmissionApplicantAuthStore } from "@/stores/universalAuth";
import { useUserInfoStore } from "@/stores/AdmissionApplicantStore";
import { AdmissionApplicantAPI } from "@/api/admission/applicant/api";
import { useI18n } from "vue-i18n";
import ParagraphDivider from "@/styles/paragraphDividerApplicant.vue";
import { useToast } from "primevue/usetoast";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import "primeicons/primeicons.css";

const toast = useToast();
const applicantAuth = useAdmissionApplicantAuthStore();
const applicantStore = useUserInfoStore();
const api = new AdmissionApplicantAPI(applicantAuth);

const { t } = useI18n();

const applicantInfo: AdmissionApplicantAuthResponse = toRaw(
	applicantStore.userInfo
);

// const {
// 	isLoading,
// 	isError,
// 	data: programs,
// 	error,
// } = useQuery(["userInfo"], async () => await api.getUserInfo());

const email = reactive({
	isEdit: false,
	email: applicantStore.userInfo.email,
});

const initialPassValue = {
	isCurrentPassBlank: false,
	isNewPassBlank: false,
	notMatch: false,
	currentPass: "",
	newPass: "",
	confirmPass: "",
};

const isLoading = reactive({
	changePass: false,
	editEmail: false,
});

let changePassRes = reactive({
	success: false,
	message: "" as string | [],
});

const editEmailRes = reactive({
	success: false,
	message: "" as string | [],
});

let password = reactive({
	isCurrentPassBlank: false,
	isNewPassBlank: false,
	notMatch: false,
	currentPass: "",
	newPass: "",
	confirmPass: "",
});

const resetPassValue = () => {
	password.isCurrentPassBlank = initialPassValue.isCurrentPassBlank;
	password.isNewPassBlank = initialPassValue.isNewPassBlank;
	password.notMatch = initialPassValue.notMatch;
	password.currentPass = initialPassValue.currentPass;
	password.newPass = initialPassValue.newPass;
	password.confirmPass = initialPassValue.confirmPass;
};

const handleEditEmail = async () => {
	const showToast = (messages: string) => {
		toast.add({
			severity: "error",
			summary: "Error",
			detail: messages,
			life: 5000,
		});
	};

	const formatEmail = ["@", "."];
	if (email.email.length === 0) {
		showToast("This field is required");
		return;
	} else if (email.email.length <= 5) {
		showToast("Too short");
		return;
	} else if (
		!email.email.includes(formatEmail[0], 1) ||
		!email.email.includes(formatEmail[1], 3)
	) {
		showToast("Invalid format");
		return;
	}

	isLoading.editEmail = true;
	const body = { email: email.email };
	const response = await api.editEmail(body);

	if (response?.success !== undefined && response?.message !== undefined) {
		editEmailRes.success = toRaw(response.success);
		editEmailRes.message = toRaw(response.message);
	}

	isLoading.editEmail = false;

	if (editEmailRes.success) {
		resetPassValue();
		toast.add({
			severity: "success",
			summary: "Success",
			detail: editEmailRes.message,
			life: 3000,
		});
		email.isEdit = false;
	} else {
		toast.add({
			severity: "error",
			summary: "Error",
			detail: editEmailRes.message[editEmailRes.message.length - 1],
			life: 5000,
		});
	}
};

const handleSubmit = async () => {
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
		isLoading.changePass = true;

		const body = {
			current_password: password.currentPass,
			password: password.newPass,
			password_confirmation: password.confirmPass,
		};

		const res = await api.changePassword(body);

		if (res?.success !== undefined && res?.message !== undefined) {
			changePassRes.success = toRaw(res.success);
			changePassRes.message = toRaw(res.message);
		}

		isLoading.changePass = false;

		if (changePassRes.success) {
			resetPassValue();
			toast.add({
				severity: "success",
				summary: "Success",
				detail: changePassRes.message,
				life: 3000,
			});
		} else {
			toast.add({
				severity: "error",
				summary: "Error",
				detail: changePassRes.message[changePassRes.message.length - 1],
				life: 5000,
			});
		}
	}
};

onMounted(() => {
	//console.log(route.params);
});
</script>
