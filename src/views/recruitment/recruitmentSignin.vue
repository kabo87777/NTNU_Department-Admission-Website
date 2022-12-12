<template>
	<div my="auto">
		<!-- Button: Back to LandingView -->
		<router-link :to="{ name: 'LandingView' }">
			<nButton type="White" icon="pi pi-angle-left" p="2" my="4">
				選擇其他系統 Choose other system
			</nButton>
		</router-link>
		<!-- Title -->
		<Title logo="true">
			<template #Subtitle>
				<div class="<md:hidden">國立臺灣師範大學資訊工程學系</div>
			</template>
			<template #Chinese>教師聘請系統</template>
			<template #English>Teacher Recruitment System</template>
			<template #Divider>選擇身份 Select your identity</template>
		</Title>
		<!-- Button -->
		<div flex="~ col gap-8" w="80" mx="auto">
			<router-link to="/recruitment/applicant/signin">
				<nButton type="Applicant" size="lg" w="full" p="4">
					申請者登入 Applicant Login
				</nButton>
			</router-link>
			<router-link to="/recruitment/reviewer/signin">
				<nButton type="Reviewer" size="lg" w="full" p="4">
					審查委員登入 Reviewer Login
				</nButton>
			</router-link>
			<router-link to="/recruitment/manager/signin">
				<nButton type="Admin" size="lg" w="full" p="4">
					行政人員登入 Manager Login
				</nButton>
			</router-link>
		</div>
	</div>
</template>

<script setup lang="ts">
import nButton from "@/styles/CustomButton.vue";
import Title from "@/styles/login/LoginTitle.vue";
</script>
