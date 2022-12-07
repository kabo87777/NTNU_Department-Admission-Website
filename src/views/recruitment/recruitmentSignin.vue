<template class="overflow-hidden">
	<div class="fixed inset-y-0 left-0">
		<img
			src="/assets/login-page/Login-img.png"
			class="h-full object-cover"
		/>
	</div>
	<div class="fixed inset-y-0 right-0 z-50 bg-white w-125 <sm:w-full">
		<div class="flex flex-col justify-center gap-8 mx-8 h-full">
			<!-- 標題內容 -->
			<div space="y-8">
				<div class="sm:invisible">
					<img
						src="/assets/login-page/NTNU-logo-B1.png"
						class="h-15"
					/>
				</div>
				<!-- 返回按鈕 -->
				<router-link to="mainpage">
					<button
						class="flex items-center gap-2 px-2 py-2 mt-5 mb-3"
						bg="transparent hover:nGrey-100"
						text="sm secondary hover:title"
						border="rounded-lg"
					>
						<i class="pi pi-angle-left" />
						<div>選擇其他系統</div>
						<div>Select other system</div>
					</button>
				</router-link>
				<div class="mx-8" space="y-2">
					<div text="4xl title" font="medium">教師聘請系統</div>
					<div text="2xl title" font="medium">
						Teacher Recruitment System
					</div>
				</div>
			</div>

			<Divider align="center">
				<div class="px-4 text-body font-light">
					選擇身份 Select your identity
				</div>
			</Divider>

			<!-- 按鈕選項 -->
			<div class="w-4/5 mx-auto" space="y-8" text="xl">
				<div class="flex-auto place-items-center">
					<router-link to="/recruitment/applicant/signin">
						<button
							class="p-4 w-full"
							bg="hover:nGold-300 active:nGold-500"
							border="2 nGold-600 rounded-lg hover:nGold-300"
							text="pApplicant hover:title active:white"
						>
							<div>申請者登入 Applicant Login</div>
						</button>
					</router-link>
				</div>
				<div class="flex-auto place-items-center">
					<router-link to="/recruitment/reviewer/signin">
						<button
							class="p-4 w-full"
							bg="hover:nBlue-200 active:nBlue-500"
							border="2 nBlue-600 rounded-lg hover:nBlue-200"
							text="pReviewer hover:title active:white"
						>
							<div>審查委員登入 Reviewer Login</div>
						</button>
					</router-link>
				</div>
				<div class="flex-auto place-items-center">
					<router-link to="/recruitment/manager/signin">
						<button
							class="p-4 w-full"
							bg="hover:nRed-200 active:nRed-500"
							border="2 nRed-600 rounded-lg hover:nRed-200"
							text="pAdmin hover:title active:white"
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
