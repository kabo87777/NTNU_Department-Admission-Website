<template class="overflow-hidden">
	<div class="flex">
		<div class="flex-shrink-1">
			<img src="/assets/login-page/Login-img.png" class="fill" />
		</div>
		<div class="flex-none w-150 px-6 pt-18 space-y-8">
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
				<Divider align="center" class="text-gray-700">
					<div class="flex px-2 gap-2">
						<div>選擇身份</div>
						<div>Select your identity</div>
					</div>
				</Divider>
				<div class="px-18">
					<router-link to="/recruitment/applicant/signin">
						<button
							class="md:mx-auto w-full py-4 applicantButtonStyle"
							border="2  rounded-lg"
						>
							<div>申請者登入 Applicant Login</div>
						</button>
					</router-link>
				</div>
				<div class="px-18">
					<router-link to="/recruitment/reviewer/signin">
						<button
							class="md:mx-auto w-full py-4 reviewerButtonStyle"
							border="2  rounded-lg"
						>
							<div>審查委員登入 Reviewer Login</div>
						</button>
					</router-link>
				</div>
				<div class="px-18">
					<router-link to="/recruitment/manager/signin">
						<button
							class="md:mx-auto w-full py-4 managerButtonStyle"
							border="2  rounded-lg"
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
.reviewerButtonStyle {
	background-color: #dfe7fd;
	border-color: #6c91da;
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
.managerButtonStyle {
	background-color: #ffe4df;
	border-color: #d18a7c;
	color: #4d3639;
}
.managerButtonStyle:hover {
	background-color: #94282c;
	border-color: #94282c;
	color: white;
}
.managerButtonStyle:active {
	background-color: #62373e;
	border-color: #62373e;
	color: white;
}
</style>
