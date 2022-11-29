<template>
	<BaseLayout>
		<template #form>
			<ForgetPwdForm>
				<template #h1>{{ $t("資訊工程學系報名系統") }}</template>
				<template #h2>{{ $t("忘記密碼") }}</template>
			</ForgetPwdForm>
		</template>
	</BaseLayout>
</template>

<script setup lang="ts">
import BaseLayout from "@/components/LandingViewLayout.vue";
import ForgetPwdForm from "@/components/ForgetPasswordForm.vue";
</script>
