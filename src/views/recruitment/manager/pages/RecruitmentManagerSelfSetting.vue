<template>
	<div class="mt-80px ml-50px">
		<div class="font-[500] text-[32px] font-bold">
			{{ $t("使用者管理") }}
		</div>
		<div class="bigRedDivider"></div>
		<div class="mt-8px px-12px py-24px">
			<div class="text-[20px] font-[350]">
				{{ $t("帳號名稱") }}：{{ adminInfo.name }}
			</div>
			<div class="mt-36px text-[20px] font-[350]">
				{{ $t("聯絡信箱") }}：{{ adminInfo.email }}
			</div>
		</div>
		<ParagraphDivider class="mt-12px" />
		<!-- <div class="mt-36px text-[20px] font-[350]">{{ $t("手機號碼") }}：{{ phone }}</div> -->
		<!-- <Divider /> -->
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
				:loading="isChangePassLoading"
				@click="handleSubmit()"
				:label="$t('修改送出')"
			/>
		</div>
	</div>
</template>
<script setup lang="ts">
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import { reactive, ref, toRaw } from "vue";
import { InvalidSessionError } from "@/api/error";
import { useRecruitmentAdminAuthStore } from "@/stores/universalAuth";
import { useToast } from "primevue/usetoast";
import { RecruitmentAdminAPI } from "@/api/recruitment/admin/api";
import ParagraphDivider from "@/styles/paragraphDividerApplicant.vue";
import { useAdminInfoStore } from "@/stores/RecruitmentAdminStore";
import type { RecruitmentAdminAuthResponse } from "@/api/recruitment/admin/types";

const toast = useToast();
const adminAuth = useRecruitmentAdminAuthStore();
const api = new RecruitmentAdminAPI(adminAuth);
const adminStore = useAdminInfoStore();

const adminInfo: RecruitmentAdminAuthResponse = toRaw(adminStore.userInfo);

const initialPassValue = {
	isCurrentPassBlank: false,
	isNewPassBlank: false,
	notMatch: false,
	currentPass: "",
	newPass: "",
	confirmPass: "",
};

const isChangePassLoading = ref(false);

const changePassRes = reactive({
	success: false,
	message: "" as string | [],
});

const password = reactive({
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

const patchChangePassword = async (body: object) => {
	try {
		return await api.changePassword(body);
	} catch (e: any) {
		if (e instanceof InvalidSessionError) {
			console.error(
				"Session has already expired while changing password"
			);

			return;
		}
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
		isChangePassLoading.value = true;

		const body = {
			current_password: password.currentPass,
			password: password.newPass,
			password_confirmation: password.confirmPass,
		};

		const response = patchChangePassword(body);

		await response.then((res) => {
			if (res?.success !== undefined && res?.message !== undefined) {
				changePassRes.success = toRaw(res.success);
				changePassRes.message = toRaw(res.message);
			}

			isChangePassLoading.value = false;

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
					detail: changePassRes.message[
						changePassRes.message.length - 1
					],
					life: 5000,
				});
			}
		});
	}
};
</script>
