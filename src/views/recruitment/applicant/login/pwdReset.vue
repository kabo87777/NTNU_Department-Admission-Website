<template class="overflow-hidden">
	<div class="flex">
		<div class="flex-shrink-1">
			<img src="/assets/login-page/Login-img.png" class="fill" />
		</div>
		<div class="flex-none w-150 px-6 pt-40 space-y-8">
			<div class="px-8 space-y-2">
				<div class="text-s text-gray-500">
					國立台灣師範大學資訊工程學系 NTNU CSIE
				</div>
				<div class="flex items-end gap-2 font-medium text-gray-900">
					<div class="text-4xl">教師聘請系統</div>
					<div class="text-xl">Teacher Recruitment System</div>
				</div>
			</div>
			<div class="px-8 pb-8 space-y-4">
				<div class="flex items-end gap-2 applicantTextColor">
					<div>歡迎</div>
					<div class="text-4xl" v-bind="" />
				</div>
				<div class="flex items-center gap-2 applicantTextColor">
					<i class="pi pi-circle" style="font-size: 0.5rem" />
					<div class="flex-none font-medium">重設密碼</div>
					<div class="flex-none font-medium">Reset Password</div>
					<Divider />
				</div>
				<div class="flex-col px-4">
					<div
						class="flex items-center gap-2 pb-2"
						text="sm gray-500"
					>
						<div>設置密碼</div>
						<div>Setting Password</div>
					</div>
					<InputText
						name="password"
						type="password"
						v-model="userNewPwd.password"
						class="p-inputtext-sm w-full"
						required
					/>
				</div>
				<div class="flex-col px-4">
					<div
						class="flex items-center gap-2 pb-2"
						text="sm gray-500"
					>
						<div>確認密碼</div>
						<div>Confirm Password</div>
					</div>
					<InputText
						name="password"
						type="password"
						v-model="userNewPwd.confirmPwd"
						class="p-inputtext-sm w-full"
						required
					/>
				</div>
			</div>
			<div class="flex-col-inline px-4 gap-y-8">
				<div class="flex justify-center">
					<router-link to="/recruitment/applicant/signin">
						<button
							class="py-2 w-80 applicantButtonStyle"
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
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { reactive } from "vue";
import InputText from "primevue/inputtext";

const userName = ref("Wang");
const userNewPwd = reactive({
	password: "",
	confirmPwd: "",
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
