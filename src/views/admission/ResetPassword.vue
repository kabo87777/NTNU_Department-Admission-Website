<template>
	<div class="m-auto">
		<div class="flex m-auto h-15">
			<div>
				<img src="/assets/login-page/NTNU-logo-B1.png" class="h-15" />
			</div>
			<Divider layout="vertical" />
			<div class="mt-1.5">
				<div class="text-4xl font-bold text-gray-500">資訊工程學系</div>
				<div class="text-xs text-gray-400">
					Department of Computer Science and Information Enginering
				</div>
			</div>
		</div>
		<div>
			<div class="mt-100px ml-64px text-4xl font-bold text-gray-500">
				{{ $t("歡迎") }}
			</div>
			<div class="mt-36px ml-64px text-4xl font-bold text-gray-500">
				{{ $t("重設密碼") }}
			</div>
		</div>
		<div class="block mt-50px ml-64px">
			<div class="text-base text-gray-600">
				<label for="newPass">{{ $t("新密碼") }}</label>
			</div>
			<div class="mt-4px">
				<InputText
					id="newPass"
					type="password"
					class="w-420px"
					v-model="password.newPass"
				/>
			</div>
			<div v-show="password.isNewPassEmpty">
				<small class="p-error">{{ $t("請輸入密碼") }}</small>
			</div>
		</div>
		<div class="block mt-16px ml-64px">
			<div class="text-base text-gray-600">
				<label for="verifyPass">{{ $t("驗證新密碼") }}</label>
			</div>
			<div class="mt-4px">
				<InputText
					id="verifyPass"
					type="password"
					class="w-420px"
					v-model="password.verifyPass"
				/>
			</div>
			<div v-show="password.isVerifyPassEmpty">
				<small class="p-error">{{ $t("請再次輸入密碼") }}</small>
			</div>
			<div v-show="!password.isMatch">
				<small class="p-error">{{ $t("密碼不符") }}</small>
			</div>
		</div>
		<div class="mt-50px ml-64px">
			<Button
				class="bg-darkBlue hover:bg-darkBlue h-60px w-420px"
				@click="handleSubmit"
			>
				<div class="m-auto text-2xl">
					<div>{{ $t("提交") }}</div>
				</div>
			</Button>
		</div>
	</div>
</template>

<script setup lang="ts">
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import { reactive } from "vue";

const password = reactive({
	newPass: "",
	verifyPass: "",
	isMatch: true,
	isNewPassEmpty: false,
	isVerifyPassEmpty: false,
});

const handleSubmit = () => {
	if (password.newPass) {
		password.isNewPassEmpty = false;
	} else {
		password.isNewPassEmpty = true;
	}

	if (password.verifyPass) {
		password.isVerifyPassEmpty = false;
	} else {
		password.isVerifyPassEmpty = true;
	}

	if (
		password.verifyPass === password.newPass &&
		password.newPass &&
		password.verifyPass
	) {
		password.isMatch = true;
	} else if (
		password.verifyPass !== password.newPass &&
		password.newPass &&
		password.verifyPass
	) {
		password.isMatch = false;
	}
	console.log(
		"new password:",
		password.newPass,
		"verify password:",
		password.verifyPass
	);
};
</script>

<style setup lang="css">
.bg-darkBlue {
	background-color: #07385a;
}
.bg-darkBlue:hover {
	background-color: #07385a !important;
	opacity: 0.9;
}
</style>
