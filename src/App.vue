<template>
	<NavBar v-if="loggedin" />
	<SideBar v-if="loggedin" />
	<div v-if="loggedin" class="ml-400px mr-80px mt-62px">
		<router-view />
	</div>
	<div v-else>
		<router-view />
	</div>
</template>

<script setup lang="ts">
import NavBar from "./components/NavBar.vue";
import SideBar from "./components/SideBar.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const loggedin = ref(true);

if (!loggedin.value) {
	router.push("/login");
}
</script>

<style scoped></style>
