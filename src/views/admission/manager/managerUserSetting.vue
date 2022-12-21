<template>
	<Layout Admin>
		<template #Header>
			{{ $t("使用者管理") }}
		</template>
		<template #Body>
			<div flex="~ col gap-4" p="4" border="rounded-lg nGrey-100 2">
				<div>{{ $t("帳號名稱") }}：{{ userId }}</div>
				<div>{{ $t("電子信箱") }}：{{ email }}</div>
				<!-- <div class="mt-20px">{{ $t("手機號碼") }}：{{ phone }}</div> -->
			</div>
			<div text="2xl title" pb="2">{{ $t("修改密碼") }}</div>
			<div flex="~ col gap-1" text="body">
				<div>{{ $t("舊密碼") }}</div>
				<InputText
					class="!w-100"
					id="currentPass"
					type="password"
					v-model="password.currentPass"
				/>
				<div v-if="password.isCurrentPassBlank" text="sm danger">
					{{ $t("請輸入舊密碼") }}
				</div>
			</div>
			<div flex="~ gap-8">
				<div flex="~ col gap-1" text="body">
					<div>{{ $t("設定新密碼") }}</div>
					<InputText
						class="!w-100"
						id="newPass"
						type="password"
						v-model="password.newPass"
					/>
					<div v-if="password.isCurrentPassBlank" text="sm danger">
						{{ $t("請輸入新密碼") }}
					</div>
				</div>
				<div flex="~ col gap-1" text="body">
					<div>{{ $t("驗證新密碼") }}</div>
					<InputText
						class="!w-100"
						id="confirmPass"
						type="password"
						v-model="password.confirmPass"
					/>
					<div v-if="password.isCurrentPassBlank" text="sm danger">
						{{ $t("密碼不符") }}
					</div>
				</div>
			</div>
			<NButton
				Admin
				class="p-2 w-32 mt-8"
				icon="pi pi-pencil"
				:loading="isChangePassLoading"
				@click="handleSubmit()"
				>{{ $t("修改送出") }}</NButton
			>
		</template>
	</Layout>
</template>
<script setup lang="ts">
import Button from "primevue/button";
import NButton from "@/styles/CustomButton.vue";
import InputText from "primevue/inputtext";
import Layout from "@/components/Layout.vue";
import { ref, reactive, toRaw } from "vue";
import { useAdmissionAdminAuthStore } from "@/stores/universalAuth";
import { AdmissionAdminAPI } from "@/api/admission/admin/api";
import { InvalidSessionError } from "@/api/error";
import { useToast } from "primevue/usetoast";
import ParagraphDivider from "@/styles/paragraphDividerApplicant.vue";

const toast = useToast();
const userId = ref("系辦主管");
const email = ref("csie_office@ntnu.edu.tw");
const phone = ref("0912345678");
const adminAuth = useAdmissionAdminAuthStore();
const api = new AdmissionAdminAPI(adminAuth);

const initialPassValue = {
	isCurrentPassBlank: false,
	isNewPassBlank: false,
	notMatch: false,
	currentPass: "",
	newPass: "",
	confirmPass: "",
};

const isChangePassLoading = ref(false);

let changePassRes = reactive({
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

const patchChangePassword = async (body: object) => {
	return await api.changePassword(body);
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

		const res = await patchChangePassword(body);

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
				detail: changePassRes.message[changePassRes.message.length - 1],
				life: 5000,
			});
		}
	}
};
</script>
