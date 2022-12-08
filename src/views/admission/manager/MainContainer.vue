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
import NavBar from "@/components/NavBar.vue";
import SideBar from "@/components/sidebars/SideBar.vue";
import { useQuery } from "@tanstack/vue-query";
import { useToast } from "primevue/usetoast";

import { useAdmissionAdminAuthStore } from "@/stores/universalAuth";
import { doUniversalAuthSessionValidation } from "@/api/universalAuth";

const toast = useToast();

const adminAuth = useAdmissionAdminAuthStore();

const authorizationStatusQuery = useQuery(
	["admissionAdminAuthorizationStatus"],
	async () => {
		const status = await doUniversalAuthSessionValidation(adminAuth);

		if (status) return true;

		console.log("MainContainer: We are unauthorized!");

		// TODO: i18n
		toast.add({
			severity: "error",
			summary: "錯誤",
			detail: "您的登入階段已經失效，請重新登入",
			life: 100000,
		});

		return false;

		// TODO: return to sign in page

		// router.replace({ name: "AdmissionManagerSignin" });
	}
);
</script>

<style scoped></style>
