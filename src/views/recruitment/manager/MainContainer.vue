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
				<router-view />
			</div>
		</div>
	</div>
	<ScrollTop target="parent" :threshold="100" icon="pi pi-arrow-up" />
	<ScrollTop />
</template>

<script setup lang="ts">
import NavBar from "@/components/NavBar.vue";
import SideBar from "@/components/sidebars/recruitmentManagerSidebar.vue";
import ScrollTop from "primevue/scrolltop";

import { useQuery } from "@tanstack/vue-query";
import { useRouter } from "vue-router";

import { useRecruitmentAdminAuthStore } from "@/stores/universalAuth";
import {
	doUniversalAuthSessionValidation,
	doUniversalAuthGetUserInfo,
} from "@/api/universalAuth";
import { RecruitmentAdminAuthResponse } from "@/api/recruitment/admin/types";
import { useAdminInfoStore } from "@/stores/RecruitmentAdminStore";

const router = useRouter();

const auth = useRecruitmentAdminAuthStore();
const adminStore = useAdminInfoStore();

useQuery(["recruitmentManagerAuthorizationStatus"], async () => {
	const status = await doUniversalAuthSessionValidation(auth);

	if (status) return true;

	return router.replace({ name: "RecruitmentManagerSignin" });
});

useQuery(
	["recruitmentAdminAuthorizationGetUserInfo"],
	async () => {
		const data: RecruitmentAdminAuthResponse =
			await doUniversalAuthGetUserInfo(auth);

		return data;
	},
	{
		onSuccess: (data) => {
			adminStore.$patch({ userInfo: data });
		},
	}
);
</script>

<style scoped></style>
