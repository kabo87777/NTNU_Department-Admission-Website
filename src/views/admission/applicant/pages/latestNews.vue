<template>
	<Layout Applicant>
		<template #Header> {{ $t("最新資訊") }} </template>
		<template #Body>
			<!-- 畫面顯示(有資料時) -->
			<div v-if="hasNews">
				<div class="newsCard">
					<div>
						{{
							$t("申請時間") +
							$t(":") +
							program.start_date +
							" " +
							"~" +
							" " +
							program.end_date
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
					<div
						class="text-center font-bold text-[24px] text-[#736028]"
					>
						{{ $t("暫無資訊") }}
					</div>
				</div>
			</div>
		</template>
	</Layout>
</template>

<script setup lang="ts">
import Layout from "@/components/Layout.vue";
import { ref, reactive } from "vue";

import { useQuery } from "@tanstack/vue-query";
import { useAdmissionApplicantAuthStore } from "@/stores/universalAuth";

import { AdmissionApplicantAPI } from "@/api/admission/applicant/api";

const applicantAuth = useAdmissionApplicantAuthStore();
const api = new AdmissionApplicantAPI(applicantAuth);

const hasNews = ref(false);

let program = reactive({
	id: 1,
	category: "111年碩士班",
	name: "A組",
	start_date: "",
	end_date: "",
});

useQuery(
	["getAdmApplicantCurrentProgramNews"],
	async () => {
		return await api.getProgram();
	},
	{
		onSuccess: (data) => {
			hasNews.value = true;
			program.id = data.id;
			program.category = data.category;
			program.name = data.name;

			const convertISOtoString = (date: Date) => {
				const year = date.getFullYear();
				const month =
					date.getMonth() + 1 < 10
						? "0" + date.getMonth() + 1
						: date.getMonth() + 1;
				const day =
					date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
				const hr =
					date.getHours() < 10
						? "0" + date.getHours()
						: date.getHours();
				const min =
					date.getMinutes() < 10
						? "0" + date.getMinutes()
						: date.getMinutes();
				const dateString =
					year.toString() +
					"-" +
					month.toString() +
					"-" +
					day.toString() +
					" " +
					hr.toString() +
					":" +
					min.toString();

				return dateString;
			};

			const start_date = new Date(data.application_start_date);
			const end_date = new Date(data.application_end_date);
			program.start_date = convertISOtoString(start_date);
			program.end_date = convertISOtoString(end_date);
		},
	}
);
</script>

<style setup lang="css">
.newsNoData {
	position: absolute;
	left: 50%;
	top: 60%;
	transform: translate(-50%, -50%);
	height: 400px;
	width: 500px;
}

.newsCard {
	border-radius: 16px;
	border: 2px solid #d4b862;
	padding: 24px;
	background-color: #fcefcb;
	font-weight: bold;
	font-size: 18px;
}
</style>
