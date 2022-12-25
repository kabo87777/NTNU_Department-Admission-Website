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
				<recruitmentReviewerSideBar />
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
import recruitmentReviewerSideBar from "@/components/sidebars/recruitmentReviewerSidebar.vue";
import ScrollTop from "primevue/scrolltop";

import { useQuery } from "@tanstack/vue-query";
import { useRouter } from "vue-router";

import { useRecruitmentReviewerAuthStore } from "@/stores/universalAuth";
import {
	doUniversalAuthSessionValidation,
	doUniversalAuthGetUserInfo,
} from "@/api/universalAuth";
import { RecruitmentManagerAuthResponse } from "@/api/recruitment/reviewer/types";
import { useUserInfoStore } from "@/stores/RecruitmentReviewerStore";

const router = useRouter();

const auth = useRecruitmentReviewerAuthStore();
const reviewerStore = useUserInfoStore();

useQuery(["recruitmentReviewerAuthorizationStatus"], async () => {
	const status = await doUniversalAuthSessionValidation(auth);

	if (status) return true;

	return router.replace({ name: "RecruitmentReviewerSignin" });
});

useQuery(
	["recruitmentReviewerAuthorizationGetUserInfo"],
	async () => {
		const data: RecruitmentManagerAuthResponse =
			await doUniversalAuthGetUserInfo(auth);

		return data;
	},
	{
		onSuccess: (data) => {
			reviewerStore.$patch({ userInfo: data });
		},
	}
);
</script>

<style scoped></style>
