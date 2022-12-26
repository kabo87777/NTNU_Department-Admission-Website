<template>
	<Layout Applicant noMargin>
		<template #Header>{{ $t("切換專案") }}</template>
		<template #Body>
			<div flex="~ col gap-2" pos="sticky top-0" bg="white">
				<div flex="~" text="body" m="x-4 t-2">
					<div class="w-1/5" text="center">{{ $t("專案名稱") }}</div>
					<div class="w-3/5" text="center">{{ $t("開放時間") }}</div>
				</div>
				<div w="full" h="!1px" bg="nGold" />
			</div>
			<div v-for="(item, index) in programList" :key="index">
				<div
					class="flex items-center px-4 h-20"
					:class="{
						'bg-nGold-50 border-nGold':
							item.id === project.project.pid,
						'border-nGrey-200': item.id !== project.project.pid,
					}"
					border="2 rounded-lg"
				>
					<div w="1/5" text="body center">
						{{ item.category + item.name }}
					</div>
					<div w="3/5" text="sm body center">
						{{
							period(
								item.recruit_start_date,
								item.recruit_end_date
							)
						}}
					</div>
					<div w="1/5" v-if="item.id === project.project.pid">
						<div text="pApplicant center">
							{{ $t("當前專案") }}
						</div>
					</div>
					<NButton
						v-else
						Applicant
						icon="pi pi-directions"
						class="m-auto max-w-36 h-11"
						@click="
							project.switchProject({
								pid: item.id,
								category: item.category,
								name: item.name,
							})
						"
						>{{ $t("進入專案") }}
					</NButton>
				</div>
			</div>
		</template>
	</Layout>
</template>

<script setup lang="ts">
import NButton from "@/styles/CustomButton.vue";
import Layout from "@/components/Layout.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useQuery } from "@tanstack/vue-query";
import { useRecruitmentApplicantAuthStore } from "@/stores/universalAuth";
import { RecruitmentApplicantAPI } from "@/api/recruitment/applicant/api";
import { useProjectIdStore } from "@/stores/RecruitmentApplicantStore";
import { RecruitmentApplicantProgramResponse } from "@/api/recruitment/applicant/types";
import { InvalidSessionError } from "@/api/error";

const router = useRouter();

const applicantAuth = useRecruitmentApplicantAuthStore();
const api = new RecruitmentApplicantAPI(applicantAuth);
const project = useProjectIdStore();

const programList = ref<RecruitmentApplicantProgramResponse[]>(
	[] as RecruitmentApplicantProgramResponse[]
);

const { data } = useQuery(
	["programList"],
	async () => {
		return await api.getProgramList();
	},
	{
		onSuccess: (data) => {
			if (!data) {
				throw new Error("Failed to fetch program list.");
			}
			programList.value = data;
		},
	}
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
