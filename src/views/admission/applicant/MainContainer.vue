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
import { useAuthStore } from "@/stores/auth";

const router = useRouter();

// TODO: Separate stores for manager/applicant
const auth = useAuthStore();

if (!auth.isLoggedIn) {
	router.push("/admission/applicant/signin");
}
</script>

<style scoped></style>
