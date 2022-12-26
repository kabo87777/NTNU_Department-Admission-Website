<template>
	<!-- Navbar -->
	<div pos="fixed inset-0 h-15" h="full" w="screen">
		<NavBar />
	</div>
	<!-- Sidebar -->
	<div pos="fixed top-15 bottom-0 inset-x-0" flex="~">
		<div flex="none" w="90" bg="white" border="r-2 nGrey-100">
			<SideBar />
		</div>
		<!-- Page Content -->
		<div flex="grow">
			<div w="9/10 max-300" h="[calc(100%-3rem)]" m="x-auto t-8">
				<!-- 畫面顯示(已開放專案申請時) -->
				<!-- <div v-if="project.project.pid"> -->
				<router-view />
				<!-- </div> -->
				<!-- 畫面顯示(未開放專案申請時) -->
				<!-- <div v-else class="relative h-150">
					<div
						v-if="gateway !== 'recruitmentApplicantUserManagement'"
						class="recruitmentMainNoData"
					>
						<img
							src="/assets/admissionApplicant/Newsletter.png"
							alt="NO DATA"
							style="border-radius: 50%"
						/>
						<div
							class="text-center font-bold text-[24px] text-[#736028]"
						>
							{{ $t("暫未開放申請") }}
						</div>
					</div>
					<div v-else><router-view /></div>
				</div> -->
			</div>
		</div>
	</div>
	<ScrollTop target="parent" :threshold="100" icon="pi pi-arrow-up" />
	<ScrollTop />
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useQuery } from "@tanstack/vue-query";

import { useRecruitmentApplicantAuthStore } from "@/stores/universalAuth";
import { useProjectIdStore } from "@/stores/RecruitmentApplicantStore";
import {
	doUniversalAuthSessionValidation,
	doUniversalAuthGetUserInfo,
} from "@/api/universalAuth";
import { RecruitmentApplicantAuthResponse } from "@/api/recruitment/applicant/types";

import { RecruitmentApplicantAPI } from "@/api/recruitment/applicant/api";
import { useUserInfoStore } from "@/stores/RecruitmentApplicantStore";

import NavBar from "@/components/NavBar.vue";
import SideBar from "@/components/sidebars/recruitmentApplicantSidebar.vue";
import ScrollTop from "primevue/scrolltop";

const router = useRouter();
const auth = useRecruitmentApplicantAuthStore();
const project = useProjectIdStore();
const api = new RecruitmentApplicantAPI(auth);
const applicantStore = useUserInfoStore();
const route = useRoute();
const gateway = computed(() => route.name);

useQuery(
	["programList"],
	async () => {
		return await api.getProgramList();
	},
	{
		onSuccess: (data) => {
			if (data && project.project.pid === 0)
				project.switchProject({
					pid: data[0].id,
					category: data[0].category,
					name: data[0].name,
				});
		},
	}
);

useQuery(["recruitmentApplicantAuthorizationStatus"], async () => {
	const status = await doUniversalAuthSessionValidation(auth);

	if (status) return true;

	return router.replace({ name: "RecruitmentApplicantSignin" });
});

router.push("/recruitment/applicant/switchProject");

useQuery(
	["recruitmentApplicantAuthorizationGetUserInfo"],
	async () => {
		const data: RecruitmentApplicantAuthResponse =
			await doUniversalAuthGetUserInfo(auth);

		return data;
	},
	{
		onSuccess: (data) => {
			applicantStore.$patch({ userInfo: data });
		},
	}
);
</script>

<style setup lang="css">
.recruitmentMainNoData {
	position: absolute;
	left: 50%;
	top: 63%;
	transform: translate(-50%, -50%);
	height: 400px;
	width: 500px;
}
</style>
