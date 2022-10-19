<template>
	<NavBar />
	<SideBar />
	<div class="ml-400px mr-80px mt-62px">
		<router-view />
	</div>
</template>

<script setup lang="ts">
import NavBar from "@/components/NavBar.vue";
import SideBar from "@/components/SideBar.vue";

import { watch } from "vue";
import { useRouter } from "vue-router";
import { useAdmissionReviewerAuthStore } from "@/stores/universalAuth";

const router = useRouter();

const reviewerAuth = useAdmissionReviewerAuthStore();

watch(router.currentRoute, () => {
	if (!reviewerAuth.isValidSession) {
		router.replace({ name: "AdmissionReviewerSignin" });
		// TODO: show session expired notification
	}
});
</script>

<style scoped></style>
