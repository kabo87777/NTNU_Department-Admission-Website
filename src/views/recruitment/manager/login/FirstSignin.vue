<template>
	<!-- Title -->
	<Title>
		<template #Subtitle>
			<div class="<md:hidden">國立臺灣師範大學資訊工程學系</div>
		</template>
		<template #Chinese>教師招聘系統</template>
		<template #English>Teacher Recruitment System</template>
		<template #Divider>
			<div text="pAdmin">行政人員第一次登入 Manager First Login</div>
		</template>
	</Title>
	<!-- Body -->
	<Body>
		<template #Content>
			<div flex="~ col gap-1">
				<div text="sm body">請設置新密碼 Set Password</div>
				<InputText
					id="setted"
					type="password"
					class="w-full h-12"
					v-model="password.setted"
				/>
				<div v-if="isError.pwdEmpty" text="sm danger">
					※ 密碼不可為空白 Password Required
				</div>
			</div>
			<div flex="~ col gap-1">
				<div text="sm body">驗證新密碼 Confirm Password</div>
				<InputText
					id="verify"
					type="password"
					class="w-full h-12"
					v-model="password.verify"
				/>
				<div v-if="isError.pwdVerifyEmpty" text="sm danger">
					※ 請再次輸入密碼 Confirm Required
				</div>
				<div v-if="isError.pwdDismatch" text="sm danger">
					※ 密碼不符 Password not matched
				</div>
			</div>
			<div
				class="flex gap-4 p-6 text-secondary bg-nGrey-50"
				border="rounded-lg"
			>
				<i class="pi pi-shield my-auto" style="font-size: 2rem" />
				<div text="sm" space="y-1">
					<div>帳號為第一次登入，請設置新密碼</div>
					<div>
						It's first login on this account. For your safety,
						please change your password.
					</div>
				</div>
			</div>
		</template>
		<template #Footer>
			<NButton
				class="w-3/5 h-13 m-auto"
				type="Admin"
				size="lg"
				@click="handleSubmit"
			>
				{{ $t("提交") }}
			</NButton>
		</template>
	</Body>
</template>

<script setup lang="ts">
import InputText from "primevue/inputtext";
import NButton from "@/styles/CustomButton.vue";
import Title from "@/styles/login/LoginTitle.vue";
import Body from "@/styles/login/LoginBody.vue";
import { reactive } from "vue";

const password = reactive({
	setted: "",
	verify: "",
});

const isError = reactive({
	pwdDismatch: false,
	pwdEmpty: false,
	pwdVerifyEmpty: false,
});

const handleSubmit = () => {
	isError.pwdEmpty = false;
	isError.pwdVerifyEmpty = false;
	isError.pwdDismatch = false;
	try {
		if (!password.setted || !password.verify)
			throw "Missing some input value";
		if (password.setted !== password.verify)
			throw "Setted & Verify password dismatched";

		// TODO: Do something here ...
	} catch (e: any) {
		if (e === "Missing some input value") {
			isError.pwdEmpty = !password.setted;
			isError.pwdVerifyEmpty = !password.verify;
		}
		isError.pwdDismatch =
			e === "Setted & Verify password dismatched" ? true : false;
	}
};
</script>
