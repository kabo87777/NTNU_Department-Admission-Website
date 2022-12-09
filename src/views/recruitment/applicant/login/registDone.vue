<template>
	<div class="fixed top-0 left-0">
		<img
			src="/assets/login-page/Login-img.png"
			class="min-h-screen h-200"
		/>
	</div>
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
				<router-link to="/recruitment/applicant/signin">
					<button
						class="flex items-center gap-2 px-2 py-2 mt-5 mb-3"
						bg="hover:nGrey-200 active:nGrey-600"
						text="sm secondary hover:title active:white"
						border="rounded-lg"
					>
						<i class="pi pi-angle-left" />
						<div>返回登入頁面</div>
						<div>Back to Login</div>
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
				<div class="px-4 font-light" text="sm pApplicant">
					申請者註冊 Applicant Register
				</div>
			</Divider>

			<!-- 註冊成功 -->
			<div class="m-auto" space="y-4" text="success lg">
				<div class="flex w-full justify-center">
					<i class="pi pi-check-circle" style="font-size: 4rem" />
				</div>
				<div>註冊成功 Successfull</div>
			</div>
			<!-- 確認信箱訊息 -->
			<div
				class="flex justify-center items-center p-6 gap-6 my-6"
				text="secondary"
				bg="nGrey-50"
				border="rounded-xl"
			>
				<i class="pi pi-envelope" style="font-size: 2rem" />
				<div class="space-y-1" text="xs">
					<div>請至郵箱啟動帳號，並返回登入畫面</div>
					<div>
						Please Check your mail in order to active your account,
						then turn back to Login page.
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts"></script>
