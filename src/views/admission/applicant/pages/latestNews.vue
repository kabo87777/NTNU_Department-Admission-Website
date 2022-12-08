<template>
	<div>
		<div class="font-[500] text-[32px] font-bold">
			{{ $t("最新資訊") }}
		</div>
		<div class="bigYellowDivider"></div>
		<!-- 畫面顯示(有資料時) -->
		<div v-if="hasNews">
			<div class="newsCard">
				<div>
					{{
						$t("申請開放時間") +
						$t(":") +
						$t("startApply", {
							year: program.start_year,
							month: program.start_month,
							day: program.start_day,
							hour: program.start_hour,
						})
					}}
				</div>
				<div class="mt-8px">
					{{
						$t("申請截止時間") +
						$t(":") +
						$t("endApply", {
							year: program.end_year,
							month: program.end_month,
							day: program.end_day,
							hour: program.end_hour,
						})
					}}
				</div>
			</div>
		</div>
		<!-- 畫面顯示(無資料時) -->
		<div v-else class="relative h-150">
			<div class="newsNoData">
				<img
					src="/assets/admissionApplicant/Newsletter.png"
					alt="NO DATA"
					style="border-radius: 50%"
				/>
				<div class="text-center font-bold text-[24px] text-[#736028]">
					{{ $t("暫無資訊") }}
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";

import { useAdmissionApplicantAuthStore } from "@/stores/universalAuth";

import { AdmissionApplicantAPI } from "@/api/admission/applicant/api";

const applicantAuth = useAdmissionApplicantAuthStore();
const api = new AdmissionApplicantAPI(applicantAuth);

const hasNews = ref(false);

let program = reactive({
	id: 1,
	category: "111年碩士班",
	name: "A組",
	start_year: "",
	start_month: "",
	start_day: "",
	start_hour: "",
	end_year: "",
	end_month: "",
	end_day: "",
	end_hour: "",
});

onMounted(async () => {
	const res = await api.getProgram();

	if (!res) return;

	hasNews.value = true;
	program.id = res.id;
	program.category = res.category;
	program.name = res.name;

	// TODO: this is not good practice
	program.start_year = res.application_start_date.slice(0, 4);
	program.start_month = res.application_start_date.slice(5, 7);
	program.start_day = res.application_start_date.slice(8, 10);
	program.start_hour = res.application_start_date.slice(11, 13);
	program.end_year = res.application_end_date.slice(0, 4);
	program.end_month = res.application_end_date.slice(5, 7);
	program.end_day = res.application_end_date.slice(8, 10);
	program.end_hour = res.application_end_date.slice(11, 13);
});
</script>

<style setup lang="css">
.newsNoData {
	position: absolute;
	left: 50%;
	top: 63%;
	transform: translate(-50%, -50%);
	height: 400px;
	width: 500px;
}

.newsCard {
	border-radius: 16px;
	border: 2px solid #d4b862;
	padding: 24px;
	background-color: #fcefcb;
	margin-top: 24px;
	font-weight: bold;
	font-size: 18px;
}
</style>
