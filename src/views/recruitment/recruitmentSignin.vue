<template>
	<div my="auto">
		<!-- Button: Back to LandingView -->
		<router-link :to="{ name: 'LandingView' }">
			<button
				class="flex items-center gap-2 p-2 my-4"
				text="secondary"
				border="rounded-lg"
				hover="bg-nGrey-200 text-title"
				active="bg-nGrey-600 text-white"
			>
				<i class="pi pi-angle-left" />
				<div>選擇其他系統</div>
				<div>Select other system</div>
			</button>
		</router-link>
		<div mx="8" space="y-2">
			<div text="lg secondary">國立臺灣師範大學資訊工程學系</div>
			<div text="4xl title" font="medium">教師聘請系統</div>
			<div text="2xl title" font="medium">Teacher Recruitment System</div>
		</div>
		<!-- Divider -->
		<div mx="12">
			<Divider align="center">
				<div p="x-4 y-6" text="secondary">
					選擇身份 Select your identity
				</div>
			</Divider>
		</div>
		<!-- Buttons -->
		<div flex="~ col gap-8" w="80" mx="auto">
			<router-link to="/recruitment/applicant/signin">
				<button
					class="p-4 w-full border-2 text-pApplicant text-lg"
					border="2 opacity-30 nGold-500 rounded-lg"
					hover="text-title bg-nGold-300 border-nGold-300"
					active="text-white bg-nGold-500"
				>
					<div>申請者登入 Applicant Login</div>
				</button>
			</router-link>
			<router-link to="/recruitment/reviewer/signin">
				<button
					class="p-4 w-full border-2 text-pReviewer text-lg"
					border="2 opacity-30 nBlue-500 rounded-lg"
					hover="text-title bg-nBlue-200 border-nBlue-200"
					active="text-white bg-nBlue-500"
				>
					<div>審查委員登入 Reviewer Login</div>
				</button>
			</router-link>
			<router-link to="/recruitment/manager/signin">
				<button
					class="p-4 w-full border-2 text-pAdmin text-lg"
					border="2 opacity-30 nRed-600 rounded-lg"
					hover="text-title bg-nRed-200 border-nRed-200"
					active="text-white bg-nRed-600"
				>
					<div>行政人員登入 Manager Login</div>
				</button>
			</router-link>
		</div>
	</div>
</template>

<script setup lang="ts">
import Button from "primevue/button";
import Divider from "primevue/divider";
</script>
