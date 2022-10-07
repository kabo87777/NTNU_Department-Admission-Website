<template>
	<div class="grid grid-cols-2 gap-15px">
		<div>
			<img
				src="./../../assets/login-page/Login-img.png"
				class="h-screen"
			/>
		</div>
		<div class="m-auto">
			<div class="flex m-auto h-15">
				<div>
					<img
						src="./../../assets/login-page/NTNU-logo-B1.png"
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
				<div class="mt-100px ml-204px text-4xl font-bold text-gray-500">
					資訊工程學系報名系統
				</div>
				<div class="ml-204px text-xs text-gray-500">
					NTNU CSIE Admissions
				</div>
			</div>
			<div class="mt-50px ml-184px userLogin">
				<Button class="bg-darkGreen h-95px w-360px">
					<div class="m-auto text-2xl">
						<div>申請者登入</div>
						<div>Application Login</div>
					</div>
				</Button>
			</div>
			<div class="mt-50px ml-184px">
				<Button
					class="bg-darkBlue h-95px w-360px"
					@click="goManagerLogin()"
				>
					<div class="m-auto text-2xl">
						<div>審查委員/行政人員登入</div>
						<div>Reviewer/Administrator Login</div>
					</div>
				</Button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import Button from "primevue/button";
import Divider from "primevue/divider";
import { useRouter } from "vue-router";
const router = useRouter();

const goManagerLogin = () => {
	router.push("/managerlogin");
};
</script>

<style setup lang="css">
.bg-darkGreen {
	background-color: #897a27;
}
.bg-darkBlue {
	background-color: #07385a;
}
</style>
