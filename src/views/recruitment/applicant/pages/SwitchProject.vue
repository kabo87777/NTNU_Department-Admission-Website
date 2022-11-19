<template>
	<div class="font-bold text-32px">
		{{ $t("切換專案") }}
	</div>
	<div class="bigYellowDivider"></div>
	<div class="flex relative mt-8px">
		<div style="width: 20%; text-align: center; font-weight: bold">
			{{ $t("專案名稱") }}
		</div>
		<div style="width: 60%; text-align: center; font-weight: bold">
			{{ $t("開放時間") }}
		</div>
	</div>
	<div class="normalYellowDivider"></div>
	<div class="tableSP">
		<div
			class="tableItem"
			v-for="(item, index) in programList"
			:key="index"
		>
			<div class="projectCol">{{ item.category + item.name }}</div>
			<div class="periodCol">
				{{ period(item.recruit_start_date, item.recruit_end_date) }}
			</div>
			<div
				class="switchCol"
				style="
					font-weight: bold;
					color: #736028;
					padding-top: 16px;
					padding-right: 5%;
					text-align: right;
				"
				v-if="item.id === project.project.pid"
			>
				{{ $t("當前專案") }}
			</div>
			<div class="switchCol" v-else>
				<Button
					class="p-button-outlined p-button-secondary"
					style="
						color: #736028;
						height: 36px;
						border: 2px solid #736028;
						font-weight: bold;
						position: absolute;
						right: 12%;
					"
					@click="
						project.switchProject({
							pid: item.id,
							category: item.category,
							name: item.name,
						})
					"
				>
					<i class="pi pi-directions"></i>
					<div class="ml-8px">{{ $t("進入專案") }}</div>
				</Button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { toRaw } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { useRecruitmentApplicantAuthStore } from "@/stores/universalAuth";
import { RecruitmentApplicantAPI } from "@/api/recruitment/applicant/api";
import { useProjectIdStore } from "@/stores/RecruitmentApplicantStore";
import type { RecruitmentApplicantProgramResponse } from "@/api/recruitment/applicant/types";
import Button from "primevue/button";

const applicantAuth = useRecruitmentApplicantAuthStore();
const api = new RecruitmentApplicantAPI(applicantAuth);
const project = useProjectIdStore();

const { data } = useQuery(
	["programList"],
	async () => await api.getProgramList()
);

const programList: RecruitmentApplicantProgramResponse[] | undefined = toRaw(
	data.value
);

const period = (start_date: string, end_date: string) => {
	return (
		start_date.slice(0, 10) +
		" " +
		start_date.slice(24, 29) +
		" " +
		"~" +
		" " +
		end_date.slice(0, 10) +
		" " +
		end_date.slice(24, 29)
	);
};
</script>

<style setup lang="css">
.tableItem {
	display: flex;
	margin-top: 20px;
	border: 2px solid #aaaaaa;
	border-radius: 8px;
	height: 60px;
}
.projectCol {
	width: 20%;
	text-align: center;
	padding-top: 16px;
}
.periodCol {
	width: 60%;
	text-align: center;
	padding-top: 16px;
}
.switchCol {
	position: relative;
	padding-top: 10px;
	width: 20%;
}
</style>
