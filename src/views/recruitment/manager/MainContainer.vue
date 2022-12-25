<template>
	<div>
		<div style="position: fixed; top: 0; width: 100%; z-index: 10">
			<NavBar />
		</div>
		<div style="display: flex; margin-top: 60px; position: relative">
			<div
				style="
					position: fixed;
					float: left;
					width: 360px;
					border-right: 1px solid gray;
					height: 100%;
				"
			>
				<SideBar />
			</div>
			<div style="margin-left: 360px; width: 100%; padding: 60px 6%">
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
