<template class="overflow-hidden">
	<div class="flex">
		<div class="flex-shrink-1">
			<img src="/assets/login-page/Login-img.png" class="fill" />
		</div>
		<div class="flex-none w-150 px-6 pt-18 space-y-8">
			<div>
				<router-link to="/recruitment">
					<button
						class="flex items-center gap-2 px-2 py-2"
						bg="transparent hover:gray-100"
						text="sm gray-400 hover:gray-600"
						border="rounded"
					>
						<i class="pi pi-angle-left" />
						<div>切換登入身份</div>
						<div>Change your identity</div>
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
				<div class="flex items-end gap-2 pt-2 ntnuGold500">
					<div class="">申請端登入</div>
					<div class="">Applicant Login</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts"></script>

<style setup lang="css">
.ntnuGold100700 {
	background-color: #fafac7;
	color: #624f2a;
}
.ntnuGold500 {
	color: #8a7b27;
}
.ntnuBlue500 {
	background-color: #2459a4;
}
.ntnuRed500 {
	background-color: #94282c;
}
</style>
