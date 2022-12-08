<template>
	<div v-if="!isLoggedIn" class="grid grid-cols-2 gap-15px">
		<div>
			<img src="/assets/login-page/Login-img.png" class="h-screen" />
		</div>
		<router-view />
		<div v-if="showGateway" class="m-auto">
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
				<div class="mt-100px ml-204px text-4xl font-bold text-gray-500">
					{{ $t("資訊工程學系報名系統") }}
				</div>
				<div class="ml-204px text-xs text-gray-500">
					NTNU CSIE Admissions
				</div>
			</div>
			<div class="mt-50px ml-184px userLogin">
				<router-link :to="{ name: 'AdmissionSignin' }">
					<button
						class="text-xl h-90px w-420px md:mx-auto w-full py-4 admissionButtonStyle"
						border="2  rounded-lg"
					>
						<div>招生系統 Admission System</div>
					</button>
				</router-link>
			</div>
			<div class="mt-50px ml-184px">
				<router-link :to="{ name: 'RecruitmentSignin' }">
					<button
						class="text-xl h-90px w-420px md:mx-auto w-full py-4 recruitmentButtonStyle"
						border="2  rounded-lg"
					>
						<div>教師聘請系統 Recruitment System</div>
					</button>
				</router-link>
			</div>
		</div>
	</div>
	<router-view v-else />
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
			appPath: "/admission/applicant",
			auth: useAdmissionApplicantAuthStore(),
		},
		admissionReviewer: {
			appPath: "/admission/reviewer",
			auth: useAdmissionReviewerAuthStore(),
		},
		admissionAdmin: {
			appPath: "/admission/admin",
			auth: useAdmissionAdminAuthStore(),
		},
		recruitmentApplicant: {
			appPath: "/recruitment/applicant",
			auth: useRecruitmentApplicantAuthStore(),
		},
		recruitmentReviewer: {
			appPath: "/recruitment/reviewer",
			auth: useRecruitmentReviewerAuthStore(),
		},
		recruitmentAdmin: {
			appPath: "/recruitment/admin",
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
			`[App] Validated credentials for ${identities[role].appPath}. Redirecting.`
		);
		router.replace({ path: identities[role].appPath });

		break;
	}

	console.log(`[App] We are ${isLoggedIn.value ? "" : "un"}authorized`);
});
</script>

<style setup lang="css">
.admissionButtonStyle {
	background-color: #fafac7;
	border-color: #dbd379;
	color: #544830;
}
.admissionButtonStyle:hover {
	background-color: #8a7b27;
	border-color: #8a7b27;
	color: white;
}
.admissionButtonStyle:active {
	background-color: #624f2a;
	border-color: #624f2a;
	color: white;
}
.recruitmentButtonStyle {
	background-color: #dfe7fd;
	border-color: #a5b9ec;
	color: #003a5c;
}
.recruitmentButtonStyle:hover {
	background-color: #2459a4;
	border-color: #2459a4;
	color: white;
}
.recruitmentButtonStyle:active {
	background-color: #0b4873;
	border-color: #0b4873;
	color: white;
}
</style>
