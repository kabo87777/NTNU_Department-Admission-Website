<template>
	<router-view />
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();

// TODO: Redirect to admission/recruitment if they are already signed in.
const auth = useAuthStore();

// If not, let them choose admission/recruitment view.
router.push("/admission");

// if (!auth.isLoggedIn) {
//   router.push("login");
// }
</script>

<style scoped></style>
