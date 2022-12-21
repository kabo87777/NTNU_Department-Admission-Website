<template>
	<!-- Return Button -->
	<router-link :to="{ name: 'LandingView' }">
		<NButton white size="sm" icon="pi pi-angle-left" p="2" my="6">
			選擇其他系統 Choose other system
		</NButton>
	</router-link>
	<!-- Title -->
	<Title>
		<template #Subtitle>
			<div class="<md:hidden">國立臺灣師範大學資訊工程學系</div>
		</template>
		<template #Chinese>教師聘請系統</template>
		<template #English>Teacher Recruitment System</template>
		<template #Divider>選擇身份 Select your identity</template>
	</Title>
	<!-- Body -->
	<Body>
		<template #Content>
			<router-link to="/recruitment/applicant/signin">
				<NButton
					type="Applicant"
					size="lg"
					w="full max-85"
					mx="auto"
					p="4"
				>
					申請者登入 Applicant Login
				</NButton>
			</router-link>
			<router-link to="/recruitment/reviewer/signin">
				<NButton
					type="Reviewer"
					size="lg"
					w="full max-85"
					mx="auto"
					p="4"
				>
					審查委員登入 Reviewer Login
				</NButton>
			</router-link>
			<router-link to="/recruitment/manager/signin">
				<NButton type="Admin" size="lg" w="full max-85" mx="auto" p="4">
					行政人員登入 Manager Login
				</NButton>
			</router-link>
		</template>
	</Body>
</template>

<script setup lang="ts">
import NButton from "@/styles/CustomButton.vue";
import Title from "@/styles/login/LoginTitle.vue";
import Body from "@/styles/login/LoginBody.vue";
</script>
