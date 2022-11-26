<template>
	<div class="ml-50px mt-50px">
		<div>{{ $t("使用者管理") }}</div>
		<div class="bigRedDivider"></div>
		<div class="mt-20px">
			{{ $t("帳號名稱") }}：{{ userId }}
			<Button @click="editUserId" class="p-button-outlined">
				<img src="/assets/UserSetting/Edit.png" />
				{{ $t("修改") }}
			</Button>
			<Dialog header="修改名稱" v-model:visible="displayUserId">
				<div>{{ $t("輸入新名稱") }}</div>
				<InputText type="text" v-model="userId"></InputText>
				<div class="mt-10px">
					<Button @click="ensureUserId">{{ $t("確認修改") }}</Button>
					<Button @click="cancelUserId">{{ $t("取消") }}</Button>
				</div>
			</Dialog>
		</div>
		<div class="mt-20px">
			{{ $t("聯絡信箱") }}：{{ email }}
			<Button @click="editEmail" class="p-button-outlined">
				<img src="/assets/UserSetting/Edit.png" />
				{{ $t("修改") }}
			</Button>
			<Dialog header="修改信箱" v-model:visible="displayEmail">
				<div>{{ $t("輸入新信箱") }}</div>
				<InputText type="text" v-model="email"></InputText>
				<div class="mt-10px">
					<Button @click="ensureEmail">{{ $t("確認修改") }}</Button>
					<Button @click="cancelEmail">{{ $t("取消") }}</Button>
				</div>
			</Dialog>
		</div>
		<div class="mt-20px">
			{{ $t("手機號碼") }}：{{ phone }}
			<Button @click="editPhone" class="p-button-outlined">
				<img src="/assets/UserSetting/Edit.png" />
				{{ $t("修改") }}
			</Button>
			<Dialog header="修改信箱" v-model:visible="displayPhone">
				<div>{{ $t("輸入新號碼") }}</div>
				<InputText type="text" v-model="phone"></InputText>
				<div class="mt-10px">
					<Button @click="ensurePhone">{{ $t("確認修改") }}</Button>
					<Button @click="cancelPhone">{{ $t("取消") }}</Button>
				</div>
			</Dialog>
		</div>
		<Divider />
		<div>
			{{ $t("修改密碼") }}<img src="/assets/UserSetting/Lock.png" />
		</div>
		<div>
			<div>
				<div>{{ $t("請輸入舊密碼") }}：</div>
				<InputText
					type="password"
					v-model="password.currentPass"
				></InputText>
			</div>
			<div>
				<div>
					<label>{{ $t("設定新密碼") }}：</label>
					<label class="ml-110px"
						>{{ $t("確認密碼(再輸入一次驗證密碼)") }}：</label
					>
				</div>
				<InputText
					type="password"
					v-model="password.newPass"
				></InputText>
				<InputText
					type="password"
					v-model="password.confirmPass"
				></InputText>
			</div>
		</div>
		<div>
			<Button
				@click="handleSubmit"
				class="p-button-outlined"
				type="submit"
				:loading="isChangePassLoading"
			>
				<img src="/assets/UserSetting/Edit.png" />
				{{ $t("修改送出") }}
			</Button>
		</div>
	</div>
</template>
<script setup lang="ts">
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import { ref, reactive, toRaw, onMounted } from "vue";
import Dialog from "primevue/dialog";
import { useAdmissionAdminAuthStore } from "@/stores/universalAuth";
import { AdmissionAdminAPI } from "@/api/admission/admin/api";
import { InvalidSessionError } from "@/api/error";
import { useToast } from "primevue/usetoast";
import { AdmissionManagerAuthResponse } from "@/api/admission/admin/types";
import { useUserInfoStore } from "@/stores/AdmissionAdminStore";

const toast = useToast();
const userId = ref("系辦主管");
const displayUserId = ref();
const editUserId = () => {
	displayUserId.value = true;
};
const ensureUserId = () => {
	displayUserId.value = false;
};
const cancelUserId = () => {
	displayUserId.value = false;
};

const email = ref("csie_office@ntnu.edu.tw");
const displayEmail = ref();
const editEmail = () => {
	displayEmail.value = true;
};
const ensureEmail = () => {
	displayEmail.value = false;
};
const cancelEmail = () => {
	displayEmail.value = false;
};

const phone = ref("0912345678");
const displayPhone = ref();
const editPhone = () => {
	displayPhone.value = true;
};
const ensurePhone = () => {
	displayPhone.value = false;
};
const cancelPhone = () => {
	displayPhone.value = false;
};

const adminAuth = useAdmissionAdminAuthStore();
const adminStore = useUserInfoStore();
const api = new AdmissionAdminAPI(adminAuth);

const adminInfo: AdmissionManagerAuthResponse = toRaw(
	adminStore.userInfo
);

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

onMounted(() => {
	
});
</script>
