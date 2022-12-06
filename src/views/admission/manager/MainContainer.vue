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
</template>

<script setup lang="ts">
import NavBar from "@/components/NavBar.vue";
import SideBar from "@/components/sidebars/SideBar.vue";

import { watch } from "vue";
import { useRouter } from "vue-router";

import { useAdmissionAdminAuthStore } from "@/stores/universalAuth";
import { doUniversalAuthSessionValidation } from "@/api/universalAuth";

const router = useRouter();

const adminAuth = useAdmissionAdminAuthStore();

watch(router.currentRoute, async () => {
	if (!(await doUniversalAuthSessionValidation(adminAuth))) {
		router.replace({ name: "AdmissionManagerSignin" });
		// TODO: show session expired notification
	}
});
</script>

<style scoped></style>
