<template>
	<div class="fixed inset-y-0 left-0">
		<img src="/assets/login-page/Login-img.png" class="h-200" />
	</div>
	<!-- FIXME:附著在底下的空白，以免圖片露餡，但或許有更好的做法 -->
	<div
		class="fixed inset-y-0 right-0 z-30 bg-white"
		w="125 <sm:full lg:150"
	/>
	<div
		class="absolute inset-y-0 right-0 z-50 bg-white"
		w="125 <sm:full lg:150"
		px="lg:15"
	>
		<div class="flex flex-col py-4 gap-6 mx-8 h-full">
			<!-- 標題內容 -->
			<div space="y-2">
				<img
					src="/assets/login-page/NTNU-logo-B1.png"
					w="48"
					class="sm:invisible"
				/>
				<!-- 返回按鈕 -->
				<router-link to="mainpage">
					<button
						class="flex items-center gap-2 px-2 py-2 mt-5 mb-3"
						bg="hover:nGrey-200 active:nGrey-600"
						text="sm secondary hover:title active:white"
						border="rounded-lg"
					>
						<i class="pi pi-angle-left" />
						<div>選擇其他系統</div>
						<div>Select other system</div>
					</button>
				</router-link>
				<div class="mx-8" space="y-2">
					<div text="3xl title" font="medium">教師聘請系統</div>
					<div text="lg title" font="medium">
						Teacher Recruitment System
					</div>
				</div>
			</div>

			<Divider align="center">
				<div class="px-4 font-light" text="body sm">
					選擇身份 Select your identity
				</div>
			</Divider>

			<!-- 按鈕選項 -->
			<div class="w-2/3 mx-auto" space="y-8">
				<div class="flex-auto place-items-center">
					<router-link to="/recruitment/applicant/signin">
						<button
							class="p-4 w-full"
							bg="hover:nGold-300 active:nGold-500"
							border="2 opacity-30 nGold-600 rounded-lg hover:nGold-300"
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
							border="2 opacity-30 nBlue-600 rounded-lg hover:nBlue-200"
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
							border="2 opacity-30 nRed-600 rounded-lg hover:nRed-200"
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
import Button from "primevue/button";
import Divider from "primevue/divider";
</script>
