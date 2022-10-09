<template>
	<div class="grid grid-cols-2 gap-15px">
		<div>
			<img
				src="./../../assets/login-page/Login-img.png"
				class="h-screen"
			/>
		</div>
		<div class="m-auto">
			<div class="flex m-auto h-15">
				<div>
					<img
						src="./../../assets/login-page/NTNU-logo-B1.png"
						class="h-15"
					/>
				</div>
				<Divider layout="vertical" />
				<div class="mt-1.5">
					<div class="text-4xl font-bold text-gray-500">
						資訊工程學系
					</div>
					<div class="text-xs text-gray-400">
						Department of Computer Science and Information
						Enginering
					</div>
				</div>
			</div>
			<div>
				<div class="mt-100px ml-64px text-4xl font-bold text-gray-500">
					{{ $t("審查委員及行政人員管理系統") }}
				</div>
				<div class="mt-36px ml-64px text-4xl font-bold text-gray-500">
					{{ $t("忘記密碼") }}
				</div>
			</div>
			<div class="block mt-50px ml-64px">
				<div class="text-base text-gray-600">
					<label for="email">{{ $t("驗證電郵") }}</label>
				</div>
				<div class="mt-4px">
					<InputText
						id="email"
						type="email"
						class="w-420px"
						v-model="verifyEmail.email"
					/>
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
	</div>
</template>

<script setup lang="ts">
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import { reactive } from "vue";

const verifyEmail = reactive({
	email: "",
});

const handleSubmit = () => {
	console.log(verifyEmail.email);
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
