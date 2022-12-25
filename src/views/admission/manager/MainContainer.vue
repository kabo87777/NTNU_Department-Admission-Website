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
import { useQuery } from "@tanstack/vue-query";
import { useRouter } from "vue-router";

import { useAdmissionAdminAuthStore } from "@/stores/universalAuth";
import {
	doUniversalAuthSessionValidation,
	doUniversalAuthGetUserInfo,
} from "@/api/universalAuth";
import { AdmissionManagerAuthResponse } from "@/api/admission/admin/types";

import NavBar from "@/components/NavBar.vue";
import SideBar from "@/components/sidebars/admissionManagerSideBar.vue";
import ScrollTop from "primevue/scrolltop";
// 記得引入該帳戶類型的 store
import { useAdminInfoStore } from "@/stores/AdmissionAdminStore";

const router = useRouter();
const auth = useAdmissionAdminAuthStore();
// 記得 use store
const adminStore = useAdminInfoStore();

useQuery(["admissionAdminAuthorizationStatus"], async () => {
	const status = await doUniversalAuthSessionValidation(auth);

	if (status) return true;

	return router.replace({ name: "AdmissionManagerSignin" });
});

// 記得加上這個 useQuery
useQuery(
	// 此陣列是 Query key，記得改 admission/recruitment、admin/applicant/reviewer
	["admission", "admin", "authorization", "getUserInfo"],
	async () => {
		// 記得把型別改成其他種 AuthResponse
		const data: AdmissionManagerAuthResponse =
			await doUniversalAuthGetUserInfo(auth);

		return data;
	},
	{
		onSuccess: (data) => {
			// 記得把這邊換成其他帳戶類型的 store
			adminStore.$patch({ userInfo: data });
		},
	}
);
</script>

<style scoped="scss">
.pi-chevron-right {
	font-size: 12px;
}
</style>
<style scoped="scss">
.pi-chevron-right {
	font-size: 12px;
}
</style>
