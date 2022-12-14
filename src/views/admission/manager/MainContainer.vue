<template>
	<div>
		<div class="fixed w-full top-0 z-100">
			<NavBar />
		</div>
		<div class="flex mt-15 relative">
			<div
				class="fixed w-1/4 h-full float-left <lg:w-60"
				border="r-1 solid gray-200"
				bg="white"
			>
				<SideBar />
			</div>
			<div class="ml-1/4 w-full <lg:ml-60">
				<div class="relative w-9/10 m-auto max-w-800">
					<router-view />
				</div>
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
import { doUniversalAuthSessionValidation } from "@/api/universalAuth";

import NavBar from "@/components/NavBar.vue";
import SideBar from "@/components/sidebars/admissionManagerSideBar.vue";
import ScrollTop from "primevue/scrolltop";

const router = useRouter();

const auth = useAdmissionAdminAuthStore();

useQuery(["admissionAdminAuthorizationStatus"], async () => {
	const status = await doUniversalAuthSessionValidation(auth);

	if (status) return true;

	return router.replace({ name: "AdmissionManagerSignin" });
});
</script>

<style scoped></style>
