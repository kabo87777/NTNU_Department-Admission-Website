<template>
	<div p="t-8" w="full" h="full" pos="relative">
		<!-- 專案選單 -->
		<div flex="~">
			<div w="2" h="15" mr="1" bg="nBlue-500" />
			<div w="1" h="15" bg="nBlue-500" />
			<div flex="grow" mx="4">
				<Dropdown
					v-model="selectedProgram"
					:options="programs"
					:optionLabel="generateOptions"
					class="h-15 w-full"
					style="border-radius: 8px; border: 1px solid black"
				>
					<template #value="slotProps">
						<div class="mt-6px tracking-2px text-18px font-medium">
							{{ slotProps?.value?.category }}
							{{ slotProps?.value?.name }}
						</div>
					</template>
					<template #option="slotProps">
						{{ slotProps?.option?.category }}
						{{ slotProps?.option?.name }}
					</template>
				</Dropdown>
			</div>
		</div>
		<!-- 頁面按鈕 -->
		<div
			h="[calc(100%-14rem)]"
			overflow="y-auto"
			scrollbar="thin thumb-nBlue-100 thumb-rounded-full"
		>
			<div flex="~ col gap-6" mt="6">
				<!-- 1.必看資料評閱 -->
				<router-link
					:to="{ name: 'RecruitmentReviewerRequiredDataReview' }"
					custom
					v-slot="{ navigate }"
				>
					<NButton
						Reviewer
						white
						icon="pi pi-exclamation-circle"
						size="lg"
						class="py-3 px-6 mx-6 gap-4 !justify-start"
						:class="letterSpace"
						@click="navigate"
						:isSelected="
							gateway === 'RecruitmentReviewerRequiredDataReview'
						"
						:disabled="!isReviewAvailable"
						>{{ $t("必看資料評閱") }}
						<div v-if="!isReviewAvailable" text="sm">
							{{ $t("(未開放)") }}
						</div>
					</NButton>
				</router-link>
				<!-- 2.選看資料評閱 -->
				<router-link
					:to="{ name: 'RecruitmentReviewerOptionalDataReview' }"
					custom
					v-slot="{ navigate }"
				>
					<NButton
						Reviewer
						white
						icon="pi pi-minus-circle"
						size="lg"
						class="py-3 px-6 mx-6 gap-4 !justify-start"
						:class="letterSpace"
						@click="navigate"
						:isSelected="
							gateway === 'RecruitmentReviewerOptionalDataReview'
						"
						:disabled="!isReviewAvailable"
						>{{ $t("選看資料評閱") }}
						<div v-if="!isReviewAvailable" text="sm">
							{{ $t("(未開放)") }}
						</div>
					</NButton>
				</router-link>
			</div>
		</div>
		<!-- 頁面底部操作項目 -->
		<div pos="absolute bottom-0" bg="nGrey-50" w="full">
			<!-- 使用者操作 -->
			<div flex="~ gap-4" m="x-6 t-6 b-6" class="items-center">
				<!-- Icon -->
				<div w="10" h="10" bg="nBlue-600" border="rounded-full">
					<i class="pi pi-user" text="!2xl white" mx="2" my="1" />
				</div>
				<!-- Heading -->
				<div>
					<div text="sm pReviewer">{{ $t("審查端帳戶") }}</div>
					<div
						text="title"
						class="whitespace-nowrap"
						:class="letterSpace"
					>
						{{ reviewerStore.userInfo.name }}
					</div>
				</div>
				<!-- Button -->
				<div flex="~ gap-1" ml="auto">
					<router-link
						:to="{ name: 'RecruitmentReviewerUserSetting' }"
						custom
						v-slot="{ navigate }"
					>
						<NButton
							Reviewer
							white
							icon="pi pi-cog"
							@click="navigate"
							size="lg"
							class="w-12 h-12 m-auto"
							:isSelected="
								gateway === 'RecruitmentReviewerUserSetting'
							"
						/>
					</router-link>
					<!-- 登出 -->
					<NButton
						Reviewer
						white
						icon="pi pi-sign-out"
						size="lg"
						class="w-12 h-12 m-auto"
						@click="signOut"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import "primevue/resources/primevue.min.css";
import { ref, watch, watchEffect, toRaw, computed } from "vue";
import Dropdown from "primevue/dropdown";
import Button from "primevue/button";
import NButton from "@/styles/CustomButton.vue";
import { useRoute, useRouter } from "vue-router";
import { useRecruitmentReviewerAuthStore } from "@/stores/universalAuth";
import { RecruitmentReviewerAPI } from "@/api/recruitment/reviewer/api";
import { useQuery } from "@tanstack/vue-query";
import { useGlobalStore } from "@/stores/RecruitmentReviewerStore";
import { RecruitmentReviewerProgramListResponse } from "@/api/recruitment/reviewer/types";
import { RecruitmentManagerAuthResponse } from "@/api/recruitment/reviewer/types";
import { useUserInfoStore } from "@/stores/RecruitmentReviewerStore";
import { useI18n } from "vue-i18n";
import dayjs from "dayjs";

const { locale } = useI18n();
const reviewerAuth = useRecruitmentReviewerAuthStore();
const store = useGlobalStore();
const reviewerStore = useUserInfoStore();
const api = new RecruitmentReviewerAPI(reviewerAuth);
const route = useRoute();
const gateway = computed(() => route.name);
const now = dayjs();
const start = ref();
const end = ref();

const reviewerInfo: RecruitmentManagerAuthResponse = toRaw(
	reviewerStore.userInfo
);

const letterSpace = computed(() => {
	if (locale.value == "zh") return "tracking-[.125em]";
	if (locale.value == "en") return "tracking-tighter";
	else return "";
});

const { data: programs } = useQuery(
	["recruitmentReviewerprogramList"],
	async () => {
		return await api.getProgramList();
	}
);

const router = useRouter();

// FIXME: this should NOT be hardcoded.
const selectedProgram = ref<RecruitmentReviewerProgramListResponse>();

const isReviewAvailable = computed(() => {
	if (!selectedProgram.value) return false;

	const startTime = dayjs(selectedProgram!.value!.review_start_date);
	const endTime = dayjs(selectedProgram!.value!.review_end_date);

	return now.isAfter(startTime) && now.isBefore(endTime);
});

watchEffect(() => {
	if (!programs.value) return;
	store.updaterecruitmentReviewerProgramData(programs.value[0]);
	selectedProgram.value = programs.value[0];
});

watch(selectedProgram, (selection) => {
	store.updaterecruitmentReviewerProgramData(selectedProgram!.value!);
	start.value = dayjs(selectedProgram!.value!.review_start_date);
	end.value = dayjs(selectedProgram!.value!.review_end_date);
	console.log("Review is availible: " + isReviewAvailable.value);
	console.log("Time is:" + start.value + "~" + end.value);
	console.log("Now is:" + now);
	console.debug("Selected program:\n" + JSON.stringify(selection, null, 2));
});

const generateOptions = (data: RecruitmentReviewerProgramListResponse) => {
	return data.category + data.name;
};

async function signOut() {
	await api.invalidateSession();
	router.push("/recruitment/reviewer/signin");
}
</script>

<style></style>
