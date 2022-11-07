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
import { onMounted, toRaw, watch } from "vue";
import { useRouter } from "vue-router";
import { useQuery } from "@tanstack/vue-query";
import { RecruitmentApplicantAPI } from "@/api/recruitment/applicant/api";
import { useRecruitmentApplicantAuthStore } from "@/stores/universalAuth";
import { useProjectIdStore } from "@/stores/RecruitmentApplicantStore";
import type { RecruitmentApplicantProgramResponse } from "@/api/recruitment/applicant/types";
import NavBar from "@/components/NavBar.vue";
import SideBar from "@/components/sidebars/recruitmentApplicantSidebar.vue";

const router = useRouter();
const applicantAuth = useRecruitmentApplicantAuthStore();
const project = useProjectIdStore();
const api = new RecruitmentApplicantAPI(applicantAuth);

const { isLoading, isError, data, error } = useQuery(
	["programList"],
	async () => await api.getProgramList()
);

onMounted(() => {
	if (data.value) {
		const programList: RecruitmentApplicantProgramResponse[] | undefined =
			toRaw(data.value);
		project.switchPid(programList[0].id);
		router.push("/recruitment/applicant/switchProject");
	}
});

if (!applicantAuth.credentials) {
	router.push("/recruitment");
}
</script>

<style scoped></style>
