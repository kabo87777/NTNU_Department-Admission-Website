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
</template>

<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import { useRouter } from "vue-router";

import { useAdmissionAdminAuthStore } from "@/stores/universalAuth";
import { doUniversalAuthSessionValidation } from "@/api/universalAuth";

import NavBar from "@/components/NavBar.vue";
import SideBar from "@/components/sidebars/admissionManagerSideBar.vue";

const router = useRouter();

const auth = useAdmissionAdminAuthStore();

useQuery(["admissionAdminAuthorizationStatus"], async () => {
	const status = await doUniversalAuthSessionValidation(auth);

	if (status) return true;

	return router.replace({ name: "AdmissionManagerSignin" });
});
</script>

<style scoped></style>
