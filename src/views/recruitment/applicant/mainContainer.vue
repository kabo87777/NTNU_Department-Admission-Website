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
					border-right: 1px solid gray;
					height: 100%;
				"
			>
				<SideBar />
			</div>
			<div style="margin-left: 20%; width: 80%; padding: 60px 6%">
				<router-view />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { watch } from "vue";
import { useRouter } from "vue-router";
import { useQuery } from "@tanstack/vue-query";
import { InvalidSessionError } from "@/api/error";
import { RecruitmentApplicantAPI } from "@/api/recruitment/applicant/api";
import { useRecruitmentApplicantAuthStore } from "@/stores/universalAuth";
import { useProjectIdStore } from "@/stores/RecruitmentApplicantStore";
import NavBar from "@/components/NavBar.vue";
import SideBar from "@/components/sidebars/recruitmentApplicantSidebar.vue";
import { doUniversalAuthSessionValidation } from "@/api/universalAuth";

const router = useRouter();
const applicantAuth = useRecruitmentApplicantAuthStore();
const project = useProjectIdStore();
const api = new RecruitmentApplicantAPI(applicantAuth);

const { data } = useQuery(
	["programList"],
	async () => {
		try {
			return await api.getProgramList();
		} catch (e: any) {
			if (e instanceof InvalidSessionError) {
				console.error(
					"Session has already expired while querying programList"
				);
				router.push("/");
				return;
			}
		}
	},
	{
		onSuccess: (data) => {
			if (data && project.project.pid === 0)
				project.switchProject({
					pid: data[0].id,
					category: data[0].category,
					name: data[0].name,
				});
		},
	}
);
router.push("/recruitment/applicant/switchProject");
watch(router.currentRoute, async () => {
	if (!(await doUniversalAuthSessionValidation(applicantAuth))) {
		router.replace({ name: "RecruitmentApplicantSignin" });
		// TODO: show session expired notification
	}
});
</script>

<style scoped></style>
