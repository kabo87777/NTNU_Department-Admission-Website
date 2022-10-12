<template>
	<BaseLayout>
		<template #form>
			<ResetPasswordForm role="applicant"></ResetPasswordForm>
		</template>
	</BaseLayout>
</template>

<script setup lang="ts">
import BaseLayout from "@/components/LandingViewLayout.vue";
import ResetPasswordForm from "@/components/ResetPasswordForm.vue";
</script>
