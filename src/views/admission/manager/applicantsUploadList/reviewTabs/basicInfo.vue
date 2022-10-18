<template>
	<div class="mt-16px pl-8px pr-8px">
		<div class="text-24px font-medium">姓名資訊</div>
		<div class="mt-24px flex">
			<div class="w-1/3">
				<div class="text-16px">稱謂：</div>
			</div>
			<div class="w-1/3">
				<div class="text-16px">後綴：</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
const props = defineProps(["userId"]);
console.log(props.userId, "basic info tab");
</script>
