<template>
	<div class="mt-16px pl-8px pr-8px">
		<div class="text-24px font-medium">就學經歷</div>
		<div class="mt-36px flex">
			<div class="text-20px text-[#53565A] pt-16px">就學經歷-1</div>
			<Button
				class="p-button-outlined"
				style="color: rgba(164, 188, 194, 1); margin-left: 32px"
			>
				<div>
					<i
						class="pi pi-pencil"
						style="color: rgba(83, 86, 90, 1)"
					></i>
				</div>
				<div class="ml-8px text-20px text-[#53565A]">編輯</div>
			</Button>
			<Button
				class="p-button-outlined"
				style="color: rgba(135, 75, 82, 1); margin-left: 32px"
			>
				<div>
					<i
						class="pi pi-times"
						style="color: rgba(135, 75, 82, 1)"
					></i>
				</div>
				<div class="ml-8px text-20px text-[#874B52]">刪除</div>
			</Button>
		</div>
		<Divider style="color: #53565a" />
		<div class="font-medium text-16px">項目名稱： 在學證明</div>
		<div class="mt-8px font-medium text-16px">【檔案名稱】</div>
		<div>【檔案】</div>
		<div class="font-[350]">※ 僅接受 .pdf 檔案上傳</div>
	</div>
</template>

<script setup lang="ts">
import Button from "primevue/button";
import Divider from "primevue/divider";
import "primeicons/primeicons.css";

const props = defineProps(["userId"]);
console.log(props.userId, "attachment info tab");
</script>
