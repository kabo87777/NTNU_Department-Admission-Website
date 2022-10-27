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
					width: 20%;
					min-width: 384px;
					border-right: 1px solid gray;
					height: 100%;
				"
			>
				<SideBar />
			</div>
			<div style="margin-left: 384px; width: 80%; padding: 60px 6%">
				<router-view />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import NavBar from "@/components/NavBar.vue";
import SideBar from "@/components/sidebars/recruitmentApplicantSidebar.vue";

import { useRouter } from "vue-router";
import { useRecruitmentApplicantAuthStore } from "@/stores/universalAuth";

const router = useRouter();

const auth = useRecruitmentApplicantAuthStore();

// if (!auth.credentials) {
// 	router.push("/recruitment/applicant/signin");
// } else {
// 	router.push("/recruitment/applicant/basicInfo");
// }
</script>

<style scoped></style>
