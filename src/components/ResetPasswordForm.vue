<template>
	<div class="mx-30">
		<h2 class="text-3xl font-bold text-gray-500">
			{{ $t("歡迎，") }} {{ username }}
		</h2>

		<h1 class="text-3xl font-bold text-gray-500 mt-1">
			{{ $t("重設密碼") }}
		</h1>

		<form action="">
			<div class="mt-5">
				<label for="newPassword">{{ $t("新密碼") }}</label>

				<div class="mt-2">
					<InputText
						id="newPassword"
						type="password"
						class="w-full"
						v-model="newPasswordText"
					></InputText>
				</div>
			</div>

			<div class="mt-2">
				<label for="newPasswordConfirm">{{ $t("重複新密碼") }}</label>

				<div class="mt-2">
					<InputText
						id="newPasswordConfirm"
						type="password"
						class="w-full"
						v-model="newPasswordConfirmText"
					></InputText>
				</div>
			</div>

			<div class="mt-5">
				<RouterLink :to="loginPageLink">
					<Button
						type="submit"
						:disabled="confirmChecker"
						:label="$t('提交')"
						class="w-full"
					/>
				</RouterLink>
			</div>
		</form>
	</div>
</template>

<script setup lang="ts">
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import { computed, ref } from "vue";

const props = defineProps<{
	role: "applicant" | "manager";
}>();

const username = "Nekokent";
const newPasswordText = ref("");
const newPasswordConfirmText = ref("");

const confirmChecker = computed(() => {
	let result =
		newPasswordText.value === newPasswordConfirmText.value &&
		newPasswordText.value.length > 0;

	return !result;
});

const loginPageLink = computed(() => {
	if (props.role === "applicant") return "/admission/applicant/signin";
	else if (props.role === "manager") return "/admission/manager/signin";
	else return "";
});
</script>
