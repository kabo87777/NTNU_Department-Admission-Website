<template>
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
			<div flex="~ col" mx="auto" w="9/10 max-160" h="full">
				<!-- For remain Login Pages -->
				<router-view />

				<!-- Main Page -->
				<div my="auto" v-if="showGateway">
					<!-- NTNU School Logo -->
					<img
						src="/assets/login-page/NTNU-logo-B1.png"
						class="w-48 py-4 md:hidden"
					/>
					<!-- Title -->
					<div mx="8" space="y-2">
						<div
							text="lg secondary"
							font="light"
							class="<md:hidden"
						>
							國立臺灣師範大學
						</div>
						<div text="4xl title" font="medium">
							資訊工程學系報名系統
						</div>
						<div text="2xl title" font="medium">
							NTNU CSIE Admissions
						</div>
					</div>
					<!-- Divider -->
					<div mx="12">
						<Divider align="center">
							<div p="4" text="body" font="light">請選擇系統</div>
						</Divider>
					</div>
					<div flex="~ col gap-12" w="80" mx="auto">
						<router-link :to="{ name: 'AdmissionSignin' }">
							<button
								class="p-4 w-full border-2 text-pApplicant text-lg"
								border="2 opacity-30 nGold-500 rounded-lg"
								hover="text-title bg-nGold-300 border-nGold-300"
								active="text-white bg-nGold-500"
							>
								<div>招生系統 Admission System</div>
							</button>
						</router-link>
						<router-link :to="{ name: 'RecruitmentSignin' }">
							<button
								class="p-4 w-full border-2 text-pReviewer text-lg"
								border="2 opacity-30 nBlue-500 rounded-lg"
								hover="text-title bg-nBlue-200 border-nBlue-200"
								active="text-white bg-nBlue-500"
							>
								<div>教師聘請系統 Recruitment System</div>
							</button>
						</router-link>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import Divider from "primevue/divider";
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
