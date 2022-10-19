<template>
	<div>
		<div style="position: fixed; top: 0; width: 100%; z-index: 1000">
			<NavBar />
		</div>
		<div style="display: flex; margin-top: 60px; position: relative">
			<div
				style="
					position: fixed;
					float: left;
					width: 20%;
					min-width: 384px;
					border-right: 1px solid gray;
					height: 100%;
				"
			>
				<SideBar />
			</div>
			<div style="margin-left: 400px; position: absolute; width: 80%">
				<router-view />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import NavBar from "@/components/NavBar.vue";
import SideBar from "@/components/SideBar.vue";

import { watch } from "vue";
import { useRouter } from "vue-router";

import { useAdmissionAdminAuthStore } from "@/stores/universalAuth";

const router = useRouter();

const adminAuth = useAdmissionAdminAuthStore();

watch(router.currentRoute, () => {
	if (!adminAuth.isValidSession) {
		router.replace({ name: "AdmissionManagerSignin" });
		return;
		// TODO: show session expired notification
	}
});
</script>

<style scoped></style>
