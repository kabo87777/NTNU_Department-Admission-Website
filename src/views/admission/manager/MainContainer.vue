<template>
	<!-- Navbar -->
	<NavBar pos="fixed inset-0 h-15" h="full" w="screen" />
	<!-- Sidebar -->
	<div pos="fixed top-15 bottom-0 inset-x-0" flex="~">
		<SideBar flex="none" w="80" bg="white" border="r-2 nGrey-100" />
		<!-- Page Content -->
		<div flex="grow">
			<div w="9/10 max-300" h="[calc(100%-5rem)]" m="x-auto y-10">
				<router-view />
			</div>
		</div>
	</div>
	<ScrollTop target="parent" :threshold="100" icon="pi pi-arrow-up" />
	<ScrollTop />
</template>

<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import { useRouter } from "vue-router";

import { useAdmissionAdminAuthStore } from "@/stores/universalAuth";
import { doUniversalAuthSessionValidation } from "@/api/universalAuth";

import NavBar from "@/components/NavBar.vue";
import SideBar from "@/components/sidebars/admissionManagerSideBar.vue";
import ScrollTop from "primevue/scrolltop";
import NButton from "@/styles/CustomButton.vue";
import { ref } from "vue";

const router = useRouter();
const auth = useAdmissionAdminAuthStore();

const showContent = ref(false);

useQuery(["admissionAdminAuthorizationStatus"], async () => {
	const status = await doUniversalAuthSessionValidation(auth);

	if (status) return true;

	return router.replace({ name: "AdmissionManagerSignin" });
});
</script>

<style scoped="scss">
.pi-chevron-right {
	font-size: 12px;
}
</style>
