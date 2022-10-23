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
					{{ $t("行政人員登入") }}
				</div>
			</div>
			<!-- TODO: Field -->
			<div class="block mt-24px ml-164px">
				<div class="text-gray-600">
					<label for="email">{{ $t("電郵") }}</label>
				</div>
				<div class="mt-4px">
					<InputText
						name="email"
						type="email"
						v-model="userLoginData.email"
						required
					/>
				</div>
			</div>
			<div class="block mt-24px ml-168px">
				<div class="text-base text-gray-600">
					<label for="password">{{ $t("密碼") }}</label>
				</div>
				<div class="mt-4px">
					<InputText
						name="password"
						type="password"
						v-model="userLoginData.password"
						required
					/>
				</div>
				<!-- TODO: styling -->
			</div>
			<div class="flex relative ml-168px mt-8px">
				<div class="flex">
					<div>
						<Checkbox v-model="isRememberAccount" :binary="true" />
					</div>
					<label class="text-xs text-gray-500 ml-8px pt-5px">
						<div>{{ $t("下次登入記住帳號") }}</div>
					</label>
				</div>
				<div class="absolute ml-320px text-xs">
					<router-link to="">
						<div class="text-right font-bold goldText">
							{{ $t("忘記密碼") }}
						</div>
					</router-link>
				</div>
			</div>
			<div class="ml-168px mt-40px">
				<Turnstile ref="turnstileRef" />
			</div>
			<div class="mt-50px ml-168px">
				<Button
					class="bg-darkBlue h-60px w-420px"
					type="submit"
					:label="$t('登入')"
				/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { reactive } from "vue";
import Checkbox from "primevue/checkbox";
import Button from "primevue/button";
import InputText from "primevue/inputtext";

const isRememberAccount = ref(false);
const userLoginData = reactive({
	email: "",
	password: "",
});
</script>

<style setup lang="css">
.goldText {
	color: #897a27;
}
.bg-darkBlue {
	background-color: #07385a;
}
</style>
