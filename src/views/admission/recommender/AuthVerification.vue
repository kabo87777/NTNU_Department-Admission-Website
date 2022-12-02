<template>
	<div class="authVerifyWrapper">
		<div class="authVerifyImg"></div>
		<div class="authVerifyForm">
			<div>
				<div class="flex m-auto">
					<div>
						<img
							src="/assets/login-page/NTNU-logo-B1.png"
							class="h-15"
						/>
					</div>
					<Divider layout="vertical" />
					<div>
						<div class="text-4xl font-bold text-gray-500">
							資訊工程學系
						</div>
						<div class="text-xs text-gray-400">
							Department of Computer Science and Information
							Enginering
						</div>
					</div>
				</div>
				<div
					style="
						margin-left: 50%;
						transform: translateX(-50%);
						min-width: 500px;
					"
				>
					<div class="mt-100px">
						<div class="text-4xl font-bold text-gray-500">
							推薦信作業系統
						</div>
						<div class="text-xs text-gray-500">
							NTNU CSIE Admissions
						</div>
					</div>
					<div class="mt-50px">
						<div class="text-xl font-bold text-gray-500">
							推薦人您好，請輸入驗證碼
						</div>
						<div class="text-xl font-bold text-gray-500">
							Hello recommender, please enter verification token
						</div>
					</div>
					<div class="mt-50px text-gray-500">
						<div>驗證碼 Verification Token</div>
						<div class="mt-4px" style="width: 100%">
							<InputText style="width: 100%" v-model="token" />
						</div>
					</div>
					<div class="mt-60px" style="width: 100%">
						<button class="verifyButton" @click="handleVerify">
							驗證 Verify
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import Divider from "primevue/divider";
import InputText from "primevue/inputtext";

const router = useRouter();

const token = ref("");

const handleVerify = () => {
	console.log("button on clicked", token.value);
	router.push("/admission/recommendLetterFillIn");
};
</script>

<style setup lang="css">
.authVerifyWrapper {
	display: flex;
	height: 100vh;
	overflow: hidden;
}

.authVerifyImg {
	flex-basis: 50%;
	background-image: url("/assets/login-page/Login-img.png");
	background-size: cover;
	background-position: left;
	background-repeat: no-repeat;
}

.authVerifyForm {
	display: flex;
	min-width: 900px;
	flex-basis: 50%;
	align-items: center;
	justify-content: center;
}

.verifyButton {
	color: rgb(255, 255, 255);
	background-color: #94282c;
	width: 100%;
	height: 50px;
	margin-left: 50%;
	transform: translateX(-50%);
	border-radius: 8px;
}

.verifyButton:hover {
	background-color: #af4d50;
}
</style>
