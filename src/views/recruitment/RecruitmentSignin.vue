<template class="overflow-hidden">
	<div class="flex">
		<div class="flex-shrink-1">
			<img src="/assets/login-page/Login-img.png" class="fill" />
		</div>
		<div class="flex-none w-150 px-6 pt-18 space-y-8">
			<div>
				<router-link to="mainpage">
					<button
						class="flex items-center gap-2 px-2 py-2"
						bg="transparent hover:gray-100"
						text="sm gray-400 hover:gray-600"
						border="rounded"
					>
						<i class="pi pi-angle-left" />
						<div>選擇其他系統</div>
						<div>Select other system</div>
					</button>
				</router-link>
			</div>
			<div class="px-8 space-y-2">
				<div class="text-s text-gray-500">
					國立台灣師範大學資訊工程學系 NTNU CSIE
				</div>
				<div class="flex items-end gap-2 font-medium text-gray-900">
					<div class="text-4xl">教師聘請系統</div>
					<div class="text-xl">Teacher Recruitment System</div>
				</div>
			</div>
			<div class="px-8 py-4 space-y-12">
				<Divider align="center" class="text-gray-700">
					<div>選擇身份 Select your identity</div>
				</Divider>
				<div class="px-18">
					<router-link to="/recruitment/applicant/signin">
						<button
							class="md:mx-auto w-full py-3 ntnuGold500"
							text="white"
							border="rounded"
						>
							<div>申請者登入 Applicant Login</div>
						</button>
					</router-link>
				</div>
				<div class="px-18">
					<router-link to="/recruitment/reviewer/signin">
						<button
							class="md:mx-auto w-full py-3 ntnuBlue500"
							text="white"
							border="rounded"
						>
							<div>審查委員登入 Reviewer Login</div>
						</button>
					</router-link>
				</div>
				<div class="px-18">
					<router-link to="/recruitment/manager/signin">
						<button
							class="md:mx-auto w-full py-3 ntnuRed500"
							text="white"
							border="rounded"
						>
							<div>行政人員登入 Manager Login</div>
						</button>
					</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import Divider from "primevue/divider";
</script>

<style setup lang="css">
.ntnuGold500 {
	background-color: #8a7b27;
}
.ntnuBlue500 {
	background-color: #2459a4;
}
.ntnuRed500 {
	background-color: #94282c;
}
</style>
