<template>
	<!-- Toast Message -->
	<Toast position="top-right" group="loginFailure">
		<template #message="slotprop">
			<div flex="~ gap-4" text="danger">
				<i class="pi pi-ban" style="font-size: 2rem" />
				<div space="y-2">
					<div text="xl" font="medium">登入失敗 Login Failure</div>
					<div>
						<div>請確認{{ slotprop.message.summary }}是否正確</div>
						<div>
							Please check your {{ slotprop.message.detail }}.
						</div>
					</div>
				</div>
			</div>
		</template>
	</Toast>

	<div v-if="!isLoggedIn">
		<!-- Background Image -->
		<img
			src="/assets/login-page/Login-img.jpg"
			class="fixed min-h-screen h-200"
		/>
		<!-- White Background -->
		<div
			class="fixed h-screen z-1 right-0 bg-white"
			w="<md:screen md:min-132 screen-4/9"
		/>
		<div
			class="absolute h-screen z-50 right-0"
			w="<md:screen md:min-132 screen-4/9"
		>
			<div flex="~ col" mx="auto" w="5/6 max-160" h="full">
				<!-- Main Page -->
				<div my="auto" v-if="showGateway">
					<!-- Title -->
					<Title logo="true">
						<template #Subtitle>
							<div class="<md:hidden">國立臺灣師範大學</div>
						</template>
						<template #Chinese>資訊工程學系報名系統</template>
						<template #English>NTNU CSIE Admisssions</template>
						<template #Divider>請選擇系統</template>
					</Title>
					<!-- Body -->
					<Body>
						<template #Content>
							<router-link :to="{ name: 'AdmissionSignin' }">
								<NButton
									type="Applicant"
									size="lg"
									w="full"
									p="4"
								>
									招生系統 Admission System
								</NButton>
							</router-link>
							<router-link :to="{ name: 'RecruitmentSignin' }">
								<NButton
									type="Reviewer"
									size="lg"
									w="full"
									p="4"
								>
									教師聘請系統 Recruitment System
								</NButton>
							</router-link>
						</template>
					</Body>
				</div>
				<!-- For other Login Pages -->
				<div my="auto" v-else>
					<router-view />
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import Toast from "primevue/toast";
import NButton from "@/styles/CustomButton.vue";
import Title from "@/styles/login/LoginTitle.vue";
import Body from "@/styles/login/LoginBody.vue";
import { onMounted, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

import {
	useAdmissionApplicantAuthStore,
	useAdmissionReviewerAuthStore,
	useAdmissionAdminAuthStore,
	useRecruitmentApplicantAuthStore,
	useRecruitmentReviewerAuthStore,
	useRecruitmentAdminAuthStore,
} from "@/stores/universalAuth";

import { doUniversalAuthSessionValidation } from "@/api/universalAuth";

const route = useRoute();
const router = useRouter();

const isLoggedIn = ref(false);

const showGateway = computed(() => route.name === "LandingView");

onMounted(async () => {
	const identities: any = {
		admissionApplicant: {
			route: "AdmissionApplicantMainContainer",
			auth: useAdmissionApplicantAuthStore(),
		},
		admissionReviewer: {
			route: "AdmissionReviewerMainContainer",
			auth: useAdmissionReviewerAuthStore(),
		},
		admissionAdmin: {
			route: "AdmissionManagerMainContainer",
			auth: useAdmissionAdminAuthStore(),
		},
		recruitmentApplicant: {
			route: "RecruitmentApplicantMainContainer",
			auth: useRecruitmentApplicantAuthStore(),
		},
		recruitmentReviewer: {
			route: "RecruitmentReviewerMainContainer",
			auth: useRecruitmentReviewerAuthStore(),
		},
		recruitmentAdmin: {
			route: "RecruitmentAdminMainContainer",
			auth: useRecruitmentAdminAuthStore(),
		},
	};

	for (const role in identities) {
		const isAuthorized = await doUniversalAuthSessionValidation(
			identities[role].auth
		);

		if (!isAuthorized) continue;

		isLoggedIn.value = true;
		console.log(
			`[App] Validated credentials for ${identities[role].route}. Redirecting.`
		);
		router.replace({ name: identities[role].route });

		break;
	}

	console.log(`[App] We are ${isLoggedIn.value ? "" : "un"}authorized`);
});
</script>
