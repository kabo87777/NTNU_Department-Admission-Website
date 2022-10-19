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

import { useRouter } from "vue-router";
import { useAdmissionApplicantAuthStore } from "@/stores/universalAuth";

const router = useRouter();

const auth = useAdmissionApplicantAuthStore();

if (!auth.credentials) {
	router.push("/admission/applicant/signin");
}
</script>

<style scoped></style>
