<template>
	<NavBar />
	<SideBar />
	<div class="ml-400px mr-80px mt-62px">
		<router-view />
	</div>
</template>

<script setup lang="ts">
import NavBar from "./components/NavBar.vue";
import SideBar from "./components/SideBar.vue";
</script>

<style scoped></style>
