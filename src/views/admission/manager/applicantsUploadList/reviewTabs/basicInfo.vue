<template>
	<div class="mt-24px">
		<div class="text-24px font-bold">{{ $t("姓名資訊") }}</div>
		<div class="admApplicantBasicInfoCard">
			<div style="color: #333333">
				<div>{{ $t("中文姓氏") + $t(":") }}</div>
				<div>{{ $t("中文名字") + $t(":") }}</div>
				<div>{{ $t("英文姓氏") + $t(":") }}</div>
				<div>{{ $t("英文中間名字") + $t(":") }}</div>
				<div>{{ $t("英文名字") + $t(":") }}</div>
			</div>
			<div class="font-bold ml-12px">
				<div v-if="userInfo?.cn_surname">{{ userInfo.cn_surname }}</div>
				<div v-else>-</div>
				<div v-if="userInfo?.name">{{ userInfo?.name }}</div>
				<div v-else>-</div>
				<div v-if="userInfo?.en_surname">
					{{ userInfo?.en_surname }}
				</div>
				<div v-else>-</div>
				<div v-if="userInfo?.en_midname">
					{{ userInfo?.en_midname }}
				</div>
				<div v-else>-</div>
				<div v-if="userInfo?.en_givenname">
					{{ userInfo?.en_givenname }}
				</div>
				<div v-else>-</div>
			</div>
		</div>
		<ParagraphDivider />

		<div class="mt-24px text-24px font-bold">
			{{ $t("入學身分") }}
		</div>
		<div class="admApplicantBasicInfoCard">
			<div style="color: #333333">
				<div>{{ $t("入學身份") + $t(":") }}</div>
				<div>{{ $t("國籍") + $t(":") }}</div>
				<div>{{ $t("身份證字號") + $t(":") }}</div>
				<div>{{ $t("居留證統一證號") + $t(":") }}</div>
			</div>
			<div class="font-bold ml-12px">
				<div v-if="userInfo?.isForeigner">{{ $t("外籍生") }}</div>
				<div v-else-if="userInfo?.isForeigner === false">
					{{ $t("本地生") }}
				</div>
				<div v-else>-</div>
				<div v-if="userInfo?.nationality">
					{{ userInfo?.nationality }}
				</div>
				<div v-else>-</div>
				<div
					v-if="
						userInfo?.national_id && userInfo?.isForeigner === false
					"
				>
					{{ userInfo.national_id }}
				</div>
				<div v-else>-</div>
				<div v-if="userInfo?.national_id && userInfo?.isForeigner">
					{{ userInfo.national_id }}
				</div>
				<div v-else>-</div>
			</div>
		</div>
		<ParagraphDivider />

		<div
			v-show="userInfo?.isForeigner === false"
			class="mt-24px text-24px font-bold"
		>
			{{ $t("戶籍地址") }}
		</div>
		<div
			v-show="userInfo?.isForeigner === false"
			class="admApplicantBasicInfoCard"
		>
			<div style="color: #333333">
				<div>{{ $t("地址") + $t(":") }}</div>
				<div>{{ $t("區號") + $t(":") }}</div>
			</div>
			<div class="font-bold ml-12px">
				<div v-if="userInfo?.household_address">
					{{ userInfo?.household_address }}
				</div>
				<div v-else>-</div>
				<div v-if="userInfo?.household_zipcode">
					{{ userInfo?.household_zipcode }}
				</div>
				<div v-else>-</div>
			</div>
		</div>
		<ParagraphDivider v-show="userInfo?.isForeigner === false" />

		<div class="mt-24px text-24px font-bold">{{ $t("現居地址") }}</div>
		<div class="admApplicantBasicInfoCard">
			<div style="color: #333333">
				<div>{{ $t("地址") + $t(":") }}</div>
				<div>{{ $t("區號") + $t(":") }}</div>
			</div>
			<div class="font-bold ml-12px">
				<div v-if="userInfo?.communicate_address">
					{{ userInfo?.communicate_address }}
				</div>
				<div v-else>-</div>
				<div v-if="userInfo?.communicate_zipcode">
					{{ userInfo?.communicate_zipcode }}
				</div>
				<div v-else>-</div>
			</div>
		</div>
		<ParagraphDivider />

		<div class="mt-24px text-24px font-bold">{{ $t("身份資料") }}</div>
		<div class="admApplicantBasicInfoCard">
			<div style="color: #333333">
				<div>{{ $t("性別") + $t(":") }}</div>
				<div>{{ $t("出生國家") + $t(":") }}</div>
				<div>{{ $t("出生日期") + $t(":") }}</div>
			</div>
			<div class="font-bold ml-12px">
				<div v-if="userInfo?.sex">{{ userInfo?.sex }}</div>
				<div v-else>-</div>
				<div v-if="userInfo?.birthcountry">
					{{ userInfo?.birthcountry }}
				</div>
				<div v-else>-</div>
				<div v-if="userInfo?.birth">{{ userInfo.birth }}</div>
				<div v-else>-</div>
			</div>
		</div>
		<ParagraphDivider />
		<div class="mt-24px text-24px font-bold">{{ $t("聯絡方式") }}</div>
		<div class="admApplicantBasicInfoCard">
			<div style="color: #333333">
				<div>{{ $t("聯絡號碼") + $t(":") }}</div>
			</div>
			<div class="font-bold ml-12px">
				<div v-if="userInfo?.mobile_phone">
					{{ userInfo?.mobile_phone }}
				</div>
				<div v-else>-</div>
			</div>
		</div>
		<div class="bigRedDivider !mt-32px" />
	</div>
</template>

<script setup lang="ts">
import "@/styles/customize.css";
import { useAdmissionAdminAuthStore } from "@/stores/universalAuth";
import { AdmissionAdminAPI } from "@/api/admission/admin/api";
import { useQuery } from "@tanstack/vue-query";
import { AdmAdminGetApplicantInfo } from "@/api/admission/admin/types";
import ParagraphDivider from "../../../../../styles/paragraphDivider.vue";
import { ref } from "vue";

const adminAuth = useAdmissionAdminAuthStore();
const api = new AdmissionAdminAPI(adminAuth);

const props = defineProps(["userId"]);
console.log(props.userId, "check id");
const userInfo = ref<AdmAdminGetApplicantInfo>();

useQuery(
	["adminApplicantBasicInfo"],
	async () => {
		console.log(props.userId);
		return await api.getApplicantBasicInfo(props.userId);
	},
	{
		onSuccess: (data) => {
			userInfo.value = data;
		},
	}
);
</script>

<style setup lang="css">
.admApplicantBasicInfoCard {
	display: flex;
	margin-top: 16px;
	padding: 16px 24px;
	border: 3px dashed rgb(174, 174, 174);
	border-radius: 16px;
	background-color: rgb(244, 244, 244);
}
</style>
