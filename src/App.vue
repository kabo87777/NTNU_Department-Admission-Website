<template>
	<NavBar />
	<SideBar />
	<div class="ml-400px mr-80px mt-62px">
		<Message severity="success"> Welcome to Vue3 + PrimeVue </Message>
		<router-view />
	</div>
</template>

<script setup lang="ts">
import NavBar from "./components/NavBar.vue";
import SideBar from "./components/SideBar.vue";
import Message from "primevue/message";
</script>

<style scoped></style>
