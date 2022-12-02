<template>
	<div class="grid grid-cols-2 gap-15px">
		<div>
			<img src="/assets/login-page/Login-img.png" class="h-screen" />
		</div>
		<div class="m-auto">
			<div class="flex m-auto h-15">
				<div>
					<img
						src="/assets/login-page/NTNU-logo-B1.png"
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
			<router-link to="mainpage">
				<button
					class="flex items-center gap-2 px-2 py-2 mt-5 mb-3"
					bg="transparent hover:gray-100"
					text="sm gray-400 hover:gray-600"
					border="rounded"
				>
					<i class="pi pi-angle-left" />
					<div>選擇其他系統</div>
					<div>Select other system</div>
				</button>
			</router-link>
			<div>
				<div class="mt-25px ml-204px text-4xl font-bold text-gray-500">
					{{ $t("資訊工程學系報名系統") }}
				</div>
				<div class="ml-204px text-xs text-gray-500">
					NTNU CSIE Admissions
				</div>
			</div>
			<div class="mt-50px ml-184px userLogin">
				<router-link to="/admission/applicant/signin">
					<button
						class="text-xl h-90px w-420px md:mx-auto w-full py-4 applicantButtonStyle"
						border="2  rounded-lg"
					>
						<div>申請者登入 Applicant Login</div>
					</button>
				</router-link>
			</div>
			<div class="mt-50px ml-184px userLogin">
				<router-link to="/admission/reviewer/signin">
					<button
						class="text-xl h-90px w-420px md:mx-auto w-full py-4 reviewerButtonStyle"
						border="2  rounded-lg"
					>
						<div>審查委員登入 Reviewer Login</div>
					</button>
				</router-link>
			</div>
			<div class="mt-50px ml-184px">
				<router-link to="/admission/manager/signin">
					<button
						class="text-xl h-90px w-420px md:mx-auto w-full py-4 managerButtonStyle"
						border="2  rounded-lg"
					>
						<div>行政人員登入 Manager Login</div>
					</button>
				</router-link>
			</div>
			<!-- 通往推薦信作業身份驗證的神秘按鈕 -->
			<div>
				<router-link to="/admission/recommenderAuthVerify">
					<Button>借放一下</Button>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import Button from "primevue/button";
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
.managerButtonStyle {
	background-color: #ffe4df;
	border-color: #f3baae;
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
