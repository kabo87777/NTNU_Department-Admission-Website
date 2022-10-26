<template class="overflow-hidden">
	<div class="flex">
		<div class="flex-shrink-1">
			<img src="/assets/login-page/Login-img.png" class="fill" />
		</div>
		<div class="flex-none w-150 px-6 pt-18 space-y-8">
			<router-link to="/recruitment/reviewer/signin">
				<button
					class="flex items-center gap-2 px-2 py-2"
					bg="transparent hover:gray-100"
					text="sm gray-400 hover:gray-600"
					border="rounded"
				>
					<i class="pi pi-angle-left" />
					<div>返回登入頁面</div>
					<div>Back to Login</div>
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
			<div class="px-8 py-4 space-y-4">
				<div class="flex items-center gap-2 reviewerTextColor">
					<i class="pi pi-circle" style="font-size: 0.5rem" />
					<div class="flex-none font-medium">忘記密碼</div>
					<div class="flex-none font-medium">Forget Password</div>
					<Divider />
				</div>
				<div class="flex-col px-4 py-8">
					<div
						class="flex items-center gap-2 pb-2"
						text="sm gray-500"
					>
						<div>電郵地址</div>
						<div>E-mail</div>
					</div>
					<InputText
						name="email"
						type="email"
						v-model="forgetPwdVerify.email"
						class="p-inputtext-sm w-full"
						required
					/>
				</div>
				<div
					class="flex p-4 gap-1 justify-center"
					text="xs gray-500"
					border="rounded-xl"
					bg="gray-100"
				>
					<div class="px-2">
						<div>
							系統將會送出一封郵件至您的電子信箱，您可以透過郵件連結更改密碼
						</div>
						<div>
							We would send a mail to your e-mail address, you
							could change your password by the link.
						</div>
					</div>
				</div>
			</div>
			<div class="flex justify-center px-4">
				<router-link
					to="/recruitment/reviewer/password/forget/emailSent"
				>
					<button
						class="py-2 w-80 reviewerButtonStyle"
						border="2  rounded-lg"
					>
						<div class="flex justify-center gap-2 mx-auto">
							<div>提交</div>
							<div>Submit</div>
						</div>
					</button>
				</router-link>
			</div>
			<div></div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import InputText from "primevue/inputtext";

const forgetPwdVerify = reactive({
	email: "",
});
</script>

<style setup lang="css">
.reviewerTextColor {
	color: #0b4873;
}

.reviewerButtonStyle {
	background-color: #dfe7fd;
	border-color: #a5b9ec;
	color: #003a5c;
}
.reviewerButtonStyle:hover {
	background-color: #2459a4;
	border-color: #2459a4;
	color: white;
}
.reviewerButtonStyle:active {
	background-color: #0b4873;
	border-color: #0b4873;
	color: white;
}
</style>
