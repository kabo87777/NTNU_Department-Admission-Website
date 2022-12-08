<template class="overflow-hidden">
	<Toast position="top-right" />
	<div class="flex">
		<div class="flex-none w-150 px-6 pt-40 space-y-8">
			<div class="px-8 space-y-2">
				<div class="text-s text-gray-500">
					國立台灣師範大學資訊工程學系 NTNU CSIE
				</div>
				<div class="flex items-end gap-2 font-medium text-gray-900">
					<div class="text-4xl">招生系統</div>
					<div class="text-xl">Admission System</div>
				</div>
			</div>
			<div class="px-8 pb-8 space-y-4">
				<div class="flex items-end gap-2 managerTextColor">
					<div>歡迎</div>
				</div>
				<div class="flex items-center gap-2 managerTextColor">
					<i class="pi pi-circle" style="font-size: 0.5rem" />
					<div class="flex-none font-medium">重設密碼</div>
					<div class="flex-none font-medium">Reset Password</div>
					<Divider />
				</div>
				<div class="flex-col px-4">
					<div
						class="flex items-center gap-2 pb-2"
						text="sm gray-500"
					>
						<div>設置密碼</div>
						<div>Setting Password</div>
					</div>
					<InputText
						name="password"
						id="newPass"
						type="password"
						v-model="password.newPass"
						class="p-inputtext-sm w-full"
						required
					/>
					<div class="absolute" v-if="password.isNewPassBlank">
						<small id="newPass-help" class="p-error">
							{{ $t("請輸入新密碼") }}
						</small>
					</div>
				</div>
				<div class="flex-col px-4 pt-4">
					<div
						class="flex items-center gap-2 pb-2"
						text="sm gray-500"
					>
						<div>確認密碼</div>
						<div>Confirm Password</div>
					</div>
					<InputText
						name="password"
						id="confirmPass"
						type="password"
						v-model="password.confirmPass"
						class="p-inputtext-sm w-full"
						required
					/>
					<div class="absolute" v-if="password.notMatch">
						<small id="confirmPass-help" class="p-error">
							{{ $t("密碼不符") }}
						</small>
					</div>
				</div>
			</div>
			<div class="flex-col-inline px-4 gap-y-8">
				<div class="flex justify-center">
					<Button
						class="p-button-sm p-button-secondary p-button-outlined !mt-60px !text-[16px]"
						type="submit"
						:loading="isChangePassLoading"
						@click="onSubmit()"
					>
						<div class="flex justify-center gap-2 mx-auto">
							<div>提交</div>
							<div>Submit</div>
						</div>
					</Button>
				</div>
				<div></div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, toRaw, reactive } from "vue";
import InputText from "primevue/inputtext";
import { useToast } from "primevue/usetoast";
import { useAdmissionAdminAuthStore } from "@/stores/universalAuth";
import { AdmissionAdminAPI } from "@/api/admission/admin/api";
import { universalAuthResetPwdData } from "@/api/universalAuth";
import Button from "primevue/button";
import { useRouter } from "vue-router";
const router = useRouter();

const toast = useToast();
const adminAuth = useAdmissionAdminAuthStore();
const api = new AdmissionAdminAPI(adminAuth);
const isChangePassLoading = ref(false);
const changePassRes = reactive({
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

const password = reactive({
	isNewPassBlank: false,
	notMatch: false,
	newPass: "",
	confirmPass: "",
});

const putResetPassword = async (data: universalAuthResetPwdData) => {
	try {
		if (access_token !== null && client !== null && uid !== null) {
			return await api.requestResetPasswordSession(
				data,
				access_token,
				client,
				uid
			);
		}
	} catch (error) {
		console.log(error);
	}
};

const onSubmit = async () => {
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

	if (!password.notMatch) {
		isChangePassLoading.value = true;

		const body: universalAuthResetPwdData = {
			password: password.newPass,
			password_confirmation: password.confirmPass,
		};

		const response = putResetPassword(body);

		await response.then((res) => {
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
					router.replace({ name: "AdmissionAdminSignin" });
				}, 3000);
			} else if (
				!changePassRes.success &&
				password.newPass !== "" &&
				password.confirmPass !== ""
			) {
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

<style setup lang="css">
.managerTextColor {
	color: #79363c;
}
.managerButtonStyle {
	background-color: #ffe4df;
	border-color: #f3baae;
	color: #4d3639;
}
.managerButtonStyle:hover {
	background-color: #94282c;
	border-color: #94282c;
	color: white;
}
.managerButtonStyle:active {
	background-color: #62373e;
	border-color: #62373e;
	color: white;
}
</style>
