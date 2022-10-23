<template class="overflow-hidden">
	<div class="flex">
		<div class="flex-shrink-1">
			<img src="/assets/login-page/Login-img.png" class="fill" />
		</div>
		<div class="flex-none w-150 px-6 pt-18 space-y-8">
			<router-link to="/recruitment">
				<button
					class="flex items-center gap-2 px-2 py-2"
					bg="transparent hover:gray-100"
					text="sm gray-400 hover:gray-600"
					border="rounded"
				>
					<i class="pi pi-angle-left" />
					<div>切換登入身份</div>
					<div>Change your identity</div>
				</button>
			</router-link>
			<div class="px-8 space-y-2">
				<div class="text-s text-gray-500">
					國立台灣師範大學資訊工程學系 NTNU CSIE
				</div>
				<div class="flex items-end gap-2 font-medium text-gray-900">
					<div class="text-4xl">教師聘請系統</div>
					<div class="text-xl">Teacher Recruitment System</div>
				</div>
			</div>
			<div class="px-8 py-4 space-y-8">
				<div class="flex items-center gap-2 applicantTextColor">
					<i class="pi pi-circle-fill" style="font-size: 0.5rem" />
					<div class="flex-none font-medium">申請端登入</div>
					<div class="flex-none font-medium">Applicant Login</div>
					<Divider />
				</div>
				<div class="flex-col px-4">
					<div
						class="flex items-center gap-2 pb-2"
						text="sm gray-500"
					>
						<div>電子郵件</div>
						<div>E-mail</div>
					</div>
					<InputText
						name="email"
						type="email"
						v-model="userLoginData.email"
						class="p-inputtext-sm w-full"
						placeholder="example123@gmail.com"
						required
					/>
				</div>
				<div class="flex-col px-4">
					<div
						class="flex items-center gap-2 pb-2"
						text="sm gray-500"
					>
						<div>密碼</div>
						<div>Password</div>
					</div>
					<InputText
						name="password"
						type="password"
						v-model="userLoginData.password"
						class="p-inputtext-sm w-full"
						placeholder="********"
						required
					/>
				</div>
				<div class="flex items-center px-4 gap-2">
					<Checkbox v-model="isRememberAccount" :binary="true" />
					<div class="space-y-0.5" text="xs gray-500">
						<div>下次登入時記住帳號</div>
						<div>Remember Account at next Login</div>
					</div>
				</div>
				<div class="flex-col px-24">
					<button
						class="py-2 w-full applicantButtonStyle"
						border="2  rounded-lg"
					>
						<div class="flex justify-center gap-2 mx-auto">
							<div>登入</div>
							<div>Login</div>
						</div>
					</button>
					<div class="flex py-4 w-full justify-center">
						<router-link to="">
							<button
								class="flex justify-center gap-2 px-1 py-1"
								bg="transparent hover:gray-100"
								text="sm gray-400 hover:gray-600"
								border="rounded"
							>
								<div>忘記密碼</div>
								<div>Forget Password</div>
							</button>
						</router-link>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { reactive } from "vue";
import Checkbox from "primevue/checkbox";
import Button from "primevue/button";
import InputText from "primevue/inputtext";

const isRememberAccount = ref(false);
const userLoginData = reactive({
	email: "",
	password: "",
});
</script>

<style setup lang="css">
.applicantTextColor {
	color: #736028;
}
.applicantButtonStyle {
	background-color: #fafac7;
	border-color: #dbd379;
	color: #544830;
}
.applicantButtonStyle:hover {
	background-color: #8a7b27;
	border-color: #8a7b27;
	color: white;
}
.applicantButtonStyle:active {
	background-color: #624f2a;
	border-color: #624f2a;
	color: white;
}
</style>
