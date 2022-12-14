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
import SideBar from "@/components/sidebars/admissionApplicantSidebar.vue";
import ScrollTop from "primevue/scrolltop";

import { useQuery } from "@tanstack/vue-query";
import { useRouter } from "vue-router";

import { useAdmissionApplicantAuthStore } from "@/stores/universalAuth";
import { doUniversalAuthSessionValidation } from "@/api/universalAuth";

const router = useRouter();

const auth = useAdmissionApplicantAuthStore();

useQuery(["admissionApplicantAuthorizationStatus"], async () => {
	const status = await doUniversalAuthSessionValidation(auth);

	if (status) return true;

	return router.replace({ name: "AdmissionApplicantSignin" });
});

router.push({ name: "AdmissionApplicantLatestNews" });
</script>

<style scoped></style>
