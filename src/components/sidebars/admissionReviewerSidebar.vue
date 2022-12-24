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
					border="rounded-lg 1 nGrey-800"
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
				<!-- Divider -->
				<div flex="~ gap-4" class="items-center" :class="letterSpace">
					<div w="1/10" h="!1px" bg="nBlue" />
					<div my="auto" text="lg pReviewer">
						{{ $t("第一階段審查") }}
					</div>
				</div>
				<!-- 1.書面資料評閱 -->
				<router-link
					:to="
						isDocsAvailable
							? '/admission/reviewer/applicationReview'
							: ''
					"
					custom
					v-slot="{ navigate }"
				>
					<NButton
						Reviewer
						white
						icon="pi pi-cog"
						size="lg"
						class="py-3 px-6 mx-6 gap-4 !justify-start"
						:class="letterSpace"
						@click="navigate"
						:isSelected="
							gateway ===
							('AdmissionReviewerApplicationReview' ||
								'AdmissionReviewerSingleApplicationReview')
						"
						:disabled="!isDocsAvailable"
						><div>{{ $t("書面資料評閱") }}</div>
						<div v-if="!isDocsAvailable" text="sm">
							{{ $t("(未開放)") }}
						</div>
					</NButton>
				</router-link>
				<!-- Divider -->
				<div flex="~ gap-4" class="items-center" :class="letterSpace">
					<div w="1/10" h="!1px" bg="nBlue" />
					<div my="auto" text="lg pReviewer">
						{{ $t("第二階段審查") }}
					</div>
				</div>
				<!-- 2.口試資料評閱 -->
				<router-link
					:to="
						isOralAvailable ? '/admission/reviewer/oralReview' : ''
					"
					custom
					v-slot="{ navigate }"
				>
					<NButton
						Reviewer
						white
						icon="pi pi-cog"
						size="lg"
						class="py-3 px-6 mx-6 gap-4 !justify-start"
						:class="letterSpace"
						@click="navigate"
						:isSelected="
							gateway ===
							('AdmissionReviewerOralReview' ||
								'AdmissionReviewerSingleOralReview')
						"
						:disabled="!isOralAvailable"
						><div>{{ $t("口試資料評閱") }}</div>
						<div v-if="!isOralAvailable" text="sm">
							{{ $t("(未開放)") }}
						</div>
					</NButton>
				</router-link>
			</div>
		</div>
		<!-- 頁面底部操作項目 -->
		<div pos="absolute bottom-0" bg="nGrey-50" w="full">
			<!-- 使用者操作 -->
			<div flex="~ gap-4" m="x-6 t-4 b-6" class="items-center">
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
						{{ $t("系辦主管") }}
					</div>
				</div>
				<!-- Button -->
				<div flex="~ gap-1" ml="auto">
					<!-- 使用者設定 -->
					<router-link
						to="/admission/reviewer/reviewerUserSetting"
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
								gateway === 'AdmissionReviewerUserSetting'
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
import Dropdown from "primevue/dropdown";
import NButton from "@/styles/CustomButton.vue";

import { ref, watch, watchEffect, computed } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import { useQuery } from "@tanstack/vue-query";
import { useToast } from "primevue/usetoast";
import dayjs from "dayjs";

import { AdmissionReviewerAPI } from "@/api/admission/reviewer/api";
import { AdmissionReviewerProgramListResponse } from "@/api/admission/reviewer/types";
import { useAdmissionReviewerAuthStore } from "@/stores/universalAuth";
import { useGlobalStore } from "@/stores/AdmissionReviewerStore";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();
const router = useRouter();
const toast = useToast();

const reviewerAuth = useAdmissionReviewerAuthStore();
const api = new AdmissionReviewerAPI(reviewerAuth);
const globalStore = useGlobalStore();

const { data: programs } = useQuery(
	["admissionReviewerProgramList"],
	async () => {
		return await api.getProgramList();
	}
);

const selectedProgram = ref<AdmissionReviewerProgramListResponse>();
const now = dayjs();
const start = ref();
const end = ref();
const route = useRoute();
const gateway = computed(() => route.name);

const letterSpace = computed(() => {
	if (locale.value == "zh") return "tracking-[.125em]";
	if (locale.value == "en") return "tracking-tighter";
	else return "";
});

const isDocsAvailable = computed(() => {
	if (!selectedProgram.value) return false;

	const startTime = dayjs(selectedProgram!.value!.review_start_date);
	const endTime = dayjs(selectedProgram!.value!.oral_start_date);

	return now.isAfter(startTime) && now.isBefore(endTime);
});

const isOralAvailable = computed(() => {
	if (!selectedProgram.value) return false;

	const startTime = dayjs(selectedProgram!.value!.oral_start_date);
	const endTime = dayjs(selectedProgram!.value!.review_end_date);

	return now.isAfter(startTime) && now.isBefore(endTime);
});

watchEffect(() => {
	if (!programs.value) return;

	globalStore.updateadmissionReviewerProgramData(programs.value[0]);

	selectedProgram.value = programs.value[0];
});

watch(selectedProgram, (selection) => {
	globalStore.updateadmissionReviewerProgramData(selectedProgram!.value!);

	// 檢查是否為書面審查時間
	start.value = dayjs(selectedProgram!.value!.review_start_date);
	end.value = dayjs(selectedProgram!.value!.oral_start_date);

	// if (now.isAfter(start.value) && now.isBefore(end.value)) {
	// 	isDocsAvailable.value = true;
	// } else {
	// 	isDocsAvailable.value = false;
	// }
	console.log("Docs is availible: " + isDocsAvailable.value);
	console.log("Time is:" + start.value + "~" + end.value);
	console.log("Now is:" + now);

	// 檢查是否為口試審查時間
	start.value = dayjs(selectedProgram!.value!.oral_start_date);
	end.value = dayjs(selectedProgram!.value!.review_end_date);

	// if (now.isAfter(start.value) && now.isBefore(end.value)) {
	// 	isOralAvailable.value = true;
	// } else {
	// 	isOralAvailable.value = false;
	// }
	console.log("Oral is availible: " + isOralAvailable.value);
	console.log("Time is:" + start.value + "~" + end.value);
	console.log("Now is:" + now);
	console.debug("Selected program:\n" + JSON.stringify(selection, null, 2));
});

const generateOptions = (data: any) => data.category + data.name;

const oralNotOpen = () => {
	toast.add({
		severity: "error",
		summary: "It's not during the period of oral reviewing.",
		life: 3000,
	});
};

async function signOut() {
	await api.invalidateSession();
	router.push("/admission/reviewer/signin");
}
</script>

<style></style>
