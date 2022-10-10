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
			<div>
				<div class="mt-100px ml-64px text-4xl font-bold text-gray-500">
					更改密碼的連結已經發送到您的電郵信箱
				</div>
				<div class="ml-64px text-2xl font-bold text-gray-500">
					A link to change your password has been sent to your email
				</div>
			</div>
			<div class="mt-100px ml-64px">
				<router-link to="/admission">
					<Button
						class="bg-darkBlue hover:bg-darkBlue h-60px w-420px"
					>
						<div class="m-auto text-2xl text-white">
							返回登陸頁面 Back to Login Page
						</div>
					</Button>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import Button from "primevue/button";
</script>
