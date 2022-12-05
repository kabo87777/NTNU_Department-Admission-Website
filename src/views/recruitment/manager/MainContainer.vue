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
					width: 360px;
					border-right: 1px solid gray;
					height: 100%;
				"
			>
				<SideBar />
			</div>
			<div style="margin-left: 360px; width: 100%; padding: 60px 6%">
				<router-view />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import NavBar from "@/components/NavBar.vue";
import SideBar from "@/components/recruitmentManagerSidebar.vue";
import { watch } from "vue";
import { useRouter } from "vue-router";
import { useRecruitmentAdminAuthStore } from "@/stores/universalAuth";
import { doUniversalAuthSessionValidation } from "@/api/universalAuth";

const router = useRouter();

const adminAuth = useRecruitmentAdminAuthStore();

watch(router.currentRoute, async () => {
	if (!(await doUniversalAuthSessionValidation(adminAuth))) {
		router.replace({ name: "RecruitmentManagerSignin" });
		// TODO: show session expired notification
	}
});
</script>

<style scoped></style>
