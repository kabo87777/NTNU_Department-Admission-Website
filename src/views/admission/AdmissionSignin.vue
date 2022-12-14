<template>
	<!-- Return Button -->
	<router-link :to="{ name: 'LandingView' }">
		<NButton type="White" size="sm" icon="pi pi-angle-left" p="2" my="4">
			選擇其他系統 Choose other system
		</NButton>
	</router-link>
	<!-- Title -->
	<Title>
		<template #Subtitle>
			<div class="<md:hidden">國立臺灣師範大學資訊工程學系</div>
		</template>
		<template #Chinese>招生系統</template>
		<template #English>NTNU CSIE Admissions System</template>
		<template #Divider>選擇身份 Select your identity</template>
	</Title>
	<!-- Body -->
	<Body>
		<template #Content>
			<router-link to="/admission/applicant/signin">
				<NButton type="Applicant" size="lg" w="full" p="4">
					申請者登入 Applicant Login
				</NButton>
			</router-link>
			<router-link to="/admission/reviewer/signin">
				<NButton type="Reviewer" size="lg" w="full" p="4">
					審查委員登入 Reviewer Login
				</NButton>
			</router-link>
			<router-link to="/admission/manager/signin">
				<NButton type="Admin" size="lg" w="full" p="4">
					行政人員登入 Manager Login
				</NButton>
			</router-link>
			<!-- 通往推薦信作業身份驗證的神秘按鈕 -->
			<!-- <div>
			<router-link to="/admission/recommenderAuthVerify">
				<Button>借放一下</Button>
			</router-link>
		</div> -->
		</template>
	</Body>
</template>

<script setup lang="ts">
import NButton from "@/styles/CustomButton.vue";
import Title from "@/styles/login/LoginTitle.vue";
import Body from "@/styles/login/LoginBody.vue";
</script>
