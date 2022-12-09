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
				<ReviewerSideBar />
			</div>
			<div style="margin-left: 360px; width: 100%; padding: 60px 6%">
				<router-view />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import NavBar from "@/components/NavBar.vue";
import ReviewerSideBar from "@/components/sidebars/admissionReviewerSidebar.vue";

import { useQuery } from "@tanstack/vue-query";
import { useRouter } from "vue-router";

import { useAdmissionReviewerAuthStore } from "@/stores/universalAuth";
import { doUniversalAuthSessionValidation } from "@/api/universalAuth";

const router = useRouter();

const auth = useAdmissionReviewerAuthStore();

useQuery(["admissionReviewerAuthorizationStatus", auth], async () => {
	const status = await doUniversalAuthSessionValidation(auth);

	if (status) return true;

	return router.replace({ name: "AdmissionReviewerSignin" });
});
</script>

<style scoped></style>
