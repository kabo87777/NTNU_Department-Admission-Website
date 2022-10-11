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
import { useAdmissionManagerAuthStore } from "@/stores/universalAuth";

const router = useRouter();

const auth = useAdmissionManagerAuthStore();

if (!auth.credentials) {
	router.push({ name: "AdmissionManagerSignin" });
}
</script>

<style scoped></style>
