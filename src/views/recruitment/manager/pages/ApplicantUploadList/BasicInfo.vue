<template>
	<div class="mt-24px">
		<div class="text-24px font-bold">{{ $t("基本資訊") }}</div>
		<div class="recruitmentApplicantBasicInfoCard">
			<div style="color: #333333">
				<div>{{ $t("姓名") + $t(":") }}</div>
				<div>{{ $t("出生日期") + $t(":") }}</div>
				<div>{{ $t("博士班畢業學校與系所") + $t(":") }}</div>
				<div>{{ $t("博士班畢業年份") + $t(":") }}</div>
				<div>{{ $t("碩士班畢業學校與系所") + $t(":") }}</div>
				<div>{{ $t("碩士士班畢業年份") + $t(":") }}</div>
				<div>{{ $t("學士班畢業學校與系所") + $t(":") }}</div>
				<div>{{ $t("學士班畢業年份") + $t(":") }}</div>
				<div>{{ $t("現職") + $t(":") }}</div>
				<div>{{ $t("博士論文主題") + $t(":") }}</div>
				<div>{{ $t("代表作") + $t(":") }}</div>
			</div>
			<div class="font-bold ml-12px">
				<div v-if="userInfo?.name">{{ userInfo.name }}</div>
				<div v-else>-</div>
				<div v-if="userInfo?.birth">{{ userInfo?.birth }}</div>
				<div v-else>-</div>
				<div v-if="userInfo?.doctoral">
					{{ userInfo?.doctoral }}
				</div>
				<div v-else>-</div>
				<div v-if="userInfo?.doctoral_year">
					{{ userInfo?.doctoral_year }}
				</div>
				<div v-else>-</div>
				<div v-if="userInfo?.master">
					{{ userInfo?.master }}
				</div>
				<div v-else>-</div>
				<div v-if="userInfo?.master_year">
					{{ userInfo?.master_year }}
				</div>
				<div v-else>-</div>
				<div v-if="userInfo?.college">
					{{ userInfo?.college }}
				</div>
				<div v-else>-</div>
				<div v-if="userInfo?.college_year">
					{{ userInfo?.college_year }}
				</div>
				<div v-else>-</div>
				<div v-if="userInfo?.current_job">
					{{ userInfo?.current_job }}
				</div>
				<div v-else>-</div>
				<div v-if="userInfo?.doctoral_paper">
					{{ userInfo?.doctoral_paper }}
				</div>
				<div v-else>-</div>
				<div v-if="userInfo?.publication">
					{{ userInfo?.publication }}
				</div>
				<div v-else>-</div>
			</div>
		</div>
		<div class="bigRedDivider !mt-32px" />
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRecruitmentAdminAuthStore } from "@/stores/universalAuth";
import { RecruitmentAdminAPI } from "@/api/recruitment/admin/api";
import { useQuery } from "@tanstack/vue-query";
import { useGlobalStore } from "@/stores/RecruitmentAdminStore";
import { RecruitmentAdminApplicantResponse } from "@/api/recruitment/admin/types";

const adminAuth = useRecruitmentAdminAuthStore();
const api = new RecruitmentAdminAPI(adminAuth);
const store = useGlobalStore();
const programId = store.program?.id;

const props = defineProps(["userId"]);

const userInfo = ref<RecruitmentAdminApplicantResponse>();

useQuery(
	["RadminApplicantBasicInfo"],
	async () => {
		return await api.getApplicantBasicInfo(
			programId as number,
			props.userId
		);
	},
	{
		onSuccess: (data) => {
			userInfo.value = data;
		},
	}
);
</script>

<style setup lang="css">
.recruitmentApplicantBasicInfoCard {
	display: flex;
	margin-top: 16px;
	padding: 16px 24px;
	border: 3px dashed rgb(174, 174, 174);
	border-radius: 16px;
	background-color: rgb(244, 244, 244);
}
</style>
