<template class="overflow-hidden">
	<div class="flex">
		<div class="flex-none w-150 px-6 pt-18 space-y-8">
			<router-link to="/recruitment/reviewer/signin">
				<button
					class="flex items-center gap-2 px-2 py-2"
					bg="transparent hover:gray-100"
					text="sm gray-400 hover:gray-600"
					border="rounded"
				>
					<i class="pi pi-angle-left" />
					<div>返回登入頁面</div>
					<div>Back to Login</div>
				</button>
			</router-link>
			<div class="px-8 space-y-2">
				<div class="text-s text-gray-500">
					國立台灣師範大學資訊工程學系 NTNU CSIE
				</div>
				<div class="flex items-end gap-2 font-medium text-gray-900">
					<div class="text-4xl">教師徵聘系統</div>
					<div class="text-xl">Teacher Recruitment System</div>
				</div>
			</div>
			<div class="px-8 py-4 space-y-4">
				<div class="flex items-center gap-2 reviewerTextColor">
					<i class="pi pi-circle" style="font-size: 0.5rem" />
					<div class="flex-none font-medium">忘記密碼</div>
					<div class="flex-none font-medium">Forget Password</div>
					<Divider />
				</div>
			</div>
			<div class="p-12 space-y-4">
				<div class="flex w-full justify-center">
					<i
						class="pi pi-envelope successColor"
						style="font-size: 4rem"
					/>
				</div>
				<div class="space-y-1 successColor">
					<div text="xl" class="flex w-full justify-center gap-2">
						<div>電郵已寄出</div>
						<div>E-mail Sent</div>
					</div>
				</div>
			</div>
			<div class="px-16 py-12">
				<div
					class="flex justify-center items-center p-4 gap-4"
					bg="rounded-xl gray-100"
					border="rounded-xl"
					text="gray-500"
				>
					<i class="pi pi-link" style="font-size: 1.5rem" />
					<div class="space-y-1">
						<div text="xs">
							請至郵箱點擊連結，跟隨操作重新設定密碼
						</div>
						<div text="xs">
							Please Check your mail and get the link, and reset
							your password by the link's follows.
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts"></script>

<style setup lang="css">
.successColor {
	color: #62ae01;
}
.reviewerTextColor {
	color: #0b4873;
}
</style>
