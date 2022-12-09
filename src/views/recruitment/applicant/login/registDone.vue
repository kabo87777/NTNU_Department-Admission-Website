<template>
	<div my="auto">
		<!-- Button: Back to Applicant Signin -->
		<router-link to="/recruitment/applicant/signin">
			<button
				class="flex items-center gap-2 p-2 my-4"
				text="sm secondary"
				border="rounded-lg"
				hover="bg-nGrey-200 text-title"
				active="bg-nGrey-600 text-white"
			>
				<i class="pi pi-angle-left" />
				<div>回到登入畫面</div>
				<div>Back to login page</div>
			</button>
		</router-link>
		<div mx="4" space="y-2">
			<div text="secondary" font="light">
				國立臺灣師範大學資訊工程學系
			</div>
			<div text="3xl title" font="medium">教師聘請系統</div>
			<div text="xl title" font="medium">Teacher Recruitment System</div>
		</div>
		<!-- Divider -->
		<Divider align="center">
			<div p="4" text="sm pApplicant">申請者註冊 Applicant Regist</div>
		</Divider>
		<!-- Regist Successful -->
		<div flex="~ col" text="success lg" class="items-center" py="8">
			<i class="pi pi-check-circle" m="b-4 r-2" style="font-size: 4rem" />
			<div>註冊成功</div>
			<div>Successfull</div>
		</div>
		<!-- Info: Check E-mail -->
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
					Please Check your mail in order to active your account, then
					turn back to Login page.
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts"></script>
