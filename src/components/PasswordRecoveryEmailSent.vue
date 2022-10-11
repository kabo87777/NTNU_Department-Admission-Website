<template>
	<div class="mx-15">
		<h1 class="text-3xl font-bold text-gray-500 block">
			{{ $t("更改密碼的連結已寄送到您的電子信箱") }}
		</h1>

		<div class="mt-30">
			<RouterLink :to="loginLink">
				<Button :label="$t('回到登入頁面')" class="w-full"></Button>
			</RouterLink>
		</div>
	</div>
</template>

<script setup lang="ts">
import Button from "primevue/button";
import { computed } from "vue";

const props = defineProps<{
	role: "applicant" | "manager";
}>();

const loginLink = computed(() => {
	if (props.role === "applicant") return "/admission/applicant/signin";
	else if (props.role === "manager") return "/admission/manager/signin";
	else return "#";
});
</script>
