<template>
	<div>
		<div style="position: fixed; top: 0; width: 100%; z-index: 10">
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
				<!-- 畫面顯示(已開放專案申請時) -->
				<div v-if="project.project.pid"><router-view /></div>
				<!-- 畫面顯示(未開放專案申請時) -->
				<div v-else class="relative h-150">
					<div class="recruitmentMainNoData">
						<img
							src="/assets/admissionApplicant/Newsletter.png"
							alt="NO DATA"
							style="border-radius: 50%"
						/>
						<div
							class="text-center font-bold text-[24px] text-[#736028]"
						>
							{{ $t("暫未開放申請") }}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<ScrollTop target="parent" :threshold="100" icon="pi pi-arrow-up" />
	<ScrollTop />
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useQuery } from "@tanstack/vue-query";

import { useRecruitmentApplicantAuthStore } from "@/stores/universalAuth";
import { useProjectIdStore } from "@/stores/RecruitmentApplicantStore";

import { RecruitmentApplicantAPI } from "@/api/recruitment/applicant/api";
import { doUniversalAuthSessionValidation } from "@/api/universalAuth";

import NavBar from "@/components/NavBar.vue";
import SideBar from "@/components/sidebars/recruitmentApplicantSidebar.vue";
import ScrollTop from "primevue/scrolltop";

const router = useRouter();
const auth = useRecruitmentApplicantAuthStore();
const project = useProjectIdStore();
const api = new RecruitmentApplicantAPI(auth);

useQuery(
	["programList"],
	async () => {
		return await api.getProgramList();
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

useQuery(["recruitmentApplicantAuthorizationStatus"], async () => {
	const status = await doUniversalAuthSessionValidation(auth);

	if (status) return true;

	return router.replace({ name: "RecruitmentApplicantSignin" });
});

router.push("/recruitment/applicant/switchProject");
</script>

<style setup lang="css">
.recruitmentMainNoData {
	position: absolute;
	left: 50%;
	top: 63%;
	transform: translate(-50%, -50%);
	height: 400px;
	width: 500px;
}
</style>
