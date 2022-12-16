<template>
	<!-- Login Failure -->
	<div v-if="props.type === 'loginFailure'" flex="~ gap-4" text="danger">
		<i class="pi pi-ban" style="font-size: 2rem" />
		<div space="y-2">
			<div text="xl" font="medium">登入失敗 Login Failure</div>
			<div>
				<div>請確認{{ props.zh }}是否正確</div>
				<div>Please check your {{ props.en }}.</div>
			</div>
		</div>
	</div>
	<!-- Password Reset Failure -->
	<!-- <div v-if="props.type === 'resetFailure'" flex="~ gap-4" text="danger">
		<i class="pi pi-ban" style="font-size: 2rem" />
		<div space="y-2">
			<div text="xl" font="medium">重設失敗 Reset Password Failed</div>
			<div>
				<div>請確認{{ props.zh }}是否正確</div>
				<div>Please check your {{ props.en }}.</div>
			</div>
		</div>
	</div> -->
</template>

<script setup lang="ts">
const props = defineProps(["type", "zh", "en"]);
</script>
