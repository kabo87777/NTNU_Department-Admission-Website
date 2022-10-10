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
				<div class="mt-100px ml-164px text-4xl font-bold text-gray-500">
					{{ $t("審查委員及行政人員管理系統") }}
				</div>
			</div>
			<div class="block mt-50px ml-168px">
				<div class="text-base text-gray-600">
					<label for="email">{{ $t("電郵") }}</label>
				</div>
				<div class="mt-4px">
					<InputText id="email" type="email" class="input" />
				</div>
			</div>
			<div class="block mt-24px ml-168px">
				<div class="text-base text-gray-600">
					<label for="password">{{ $t("密碼") }}</label>
				</div>
				<div class="mt-4px">
					<InputText id="password" type="password" class="input" />
				</div>
			</div>
			<div class="flex relative ml-168px mt-8px">
				<div class="flex">
					<div class="pt-3px">
						<Checkbox
							v-model="rmbAccCheck"
							:binary="true"
							@click="handleCheck()"
						/>
					</div>
					<label class="text-xs text-gray-500 ml-4px">
						<div>{{ $t("下次登入記住帳號") }}</div>
					</label>
				</div>
				<div class="absolute ml-320px text-xs">
					<router-link to="/admission/manager/forgetpassword">
						<div class="text-right font-bold goldText">
							{{ $t("忘記密碼") }}
						</div>
					</router-link>
				</div>
			</div>
			<div class="ml-168px mt-40px">
				<Turnstile ref="turnstileToken" />
			</div>
			<div class="mt-50px ml-168px">
				<Button class="bg-darkBlue h-60px w-420px" @click="handleLogin">
					<div class="m-auto text-2xl">
						<div>{{ $t("登入") }}</div>
					</div>
				</Button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { AuthStoreState } from "@/stores/auth";

import InputText from "primevue/inputtext";
import Checkbox from "primevue/checkbox";
import Button from "primevue/button";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";

import { useAuthStore } from "@/stores/auth";
import Turnstile from "@/components/Turnstile.vue";

const turnstileToken = ref(null);
watch(turnstileToken, (newToken, prevToken) => {
	console.log("watch new token", prevToken, newToken);
});

const router = useRouter();

// TODO: Separate stores for manager/applicant
const auth: AuthStoreState = useAuthStore();

const rmbAccCheck = ref(false);

const handleCheck = () => {
	rmbAccCheck.value = !rmbAccCheck.value;
	console.log(rmbAccCheck.value);
};

const handleLogin = () => {
	console.log("login button clicked");

	auth.credentials.expiry = Infinity;

	router.push("/admission/manager");
};
</script>

<style setup lang="css">
.input {
	width: 420px;
}
.goldText {
	color: #897a27;
}
.bg-darkBlue {
	background-color: #07385a;
}
</style>
