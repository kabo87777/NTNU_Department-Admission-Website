<template>
	<div class="relative" style="height: 100%">
		<div class="flex">
			<div class="sidebarVerticalBigBlueDivider mt-32px"></div>
			<div class="sidebarVerticalSmallBlueDivider mt-32px"></div>
			<div class="mt-32px ml-12px w-[100%]">
				<Dropdown
					v-model="selectedProgram"
					:options="programs"
					:optionLabel="generateOptions"
					class="h-60px w-[93%]"
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

		<router-link
			to="/recruitment/reviewer/requiredDataReview"
			custom
			v-slot="{ navigate }"
		>
			<Button
				class="p-button-secondary p-button-text !ml-24px !mt-32px !w-[85%] !h-48px"
				@click="navigate"
				role="link"
			>
				<img
					alt="logo"
					src="/assets/reviewer-page/Arhive.png"
					style="width: 18px"
				/>
				<span
					class="text-left tracking-3px ml-3 font-bold text-[18px] text-[#2D2926]"
				>
					{{ $t("必看資料評閱") }}
				</span>
			</Button>
		</router-link>

		<router-link
			to="/recruitment/reviewer/optionalDataReview"
			custom
			v-slot="{ navigate }"
		>
			<Button
				class="p-button-secondary p-button-text !ml-24px !mt-32px !w-[85%] !h-48px"
				@click="navigate"
				role="link"
			>
				<img
					alt="logo"
					src="/assets/reviewer-page/Arhive-1.png"
					style="width: 18px"
				/>
				<span
					class="text-left tracking-3px ml-3 font-bold text-[18px] text-[#2D2926]"
				>
					{{ $t("選看資料評閱") }}
				</span>
			</Button>
		</router-link>

		<div
			class="absolute bg-gray-200 bg-opacity-50 h-140px w-[100%]"
			style="bottom: 0px"
		>
			<div class="flex relative">
				<div class="flex mt-24px">
					<img
						alt="logo"
						src="/assets/sidebar/User_circle.png"
						class="h-32px w-32px ml-24px"
					/>
					<div class="ml-12px">
						<div class="text-14px">
							{{ $t("審查端帳戶") }}
						</div>
						<div class="mt-4px ml-[-2px] text-16px">
							{{ reviewerInfo.name }}
						</div>
					</div>
				</div>
				<div class="flex absolute mt-18px mr-4px" style="right: 0px">
					<router-link
						to="/recruitment/reviewer/userSetting"
						custom
						v-slot="{ navigate }"
					>
						<Button
							class="p-button-text p-button-secondary p-button-sm"
							@click="navigate"
							role="link"
						>
							<img
								alt="logo"
								src="/assets/sidebar/Setting_alt_line.png"
								class="w-18px h-18px"
							/>
						</Button>
					</router-link>
					<Button
						class="p-button-text p-button-secondary p-button-sm"
						@click="signOut"
					>
						<img
							alt="logo"
							src="/assets/sidebar/Sign_out_circle.png"
							class="w-18px h-18px"
						/>
					</Button>
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
import { useRouter } from "vue-router";
import { useRecruitmentReviewerAuthStore } from "@/stores/universalAuth";
import { RecruitmentReviewerAPI } from "@/api/recruitment/reviewer/api";
import { useQuery } from "@tanstack/vue-query";
import { InvalidSessionError } from "@/api/error";
import { useGlobalStore } from "@/stores/RecruitmentReviewerStore";
import { RecruitmentReviewerProgramListResponse } from "@/api/recruitment/reviewer/types";
import { RecruitmentManagerAuthResponse } from "@/api/recruitment/reviewer/types";
import { useUserInfoStore } from "@/stores/RecruitmentReviewerStore";

const reviewerAuth = useRecruitmentReviewerAuthStore();
const store = useGlobalStore();
const reviewerStore = useUserInfoStore();
const api = new RecruitmentReviewerAPI(reviewerAuth);

const reviewerInfo: RecruitmentManagerAuthResponse = toRaw(
	reviewerStore.userInfo
);

const {
	isLoading,
	isError,
	data: programs,
	error,
} = useQuery(["programList"], async () => {
	return await api.getProgramList();
});

const router = useRouter();

// FIXME: this should NOT be hardcoded.
const selectedProgram = ref<RecruitmentReviewerProgramListResponse>();

watchEffect(() => {
	if (programs.value && programs.value.length > 1) {
		const temp = programs.value[0];
		store.$patch((state) => {
			// state.program = temp;
		});
		// selectedProgram.value=toRaw(programs.value[0])
		selectedProgram.value = programs.value[0];
	}
});

watch(selectedProgram, (selection) => {
	store.$patch({ recruitmentReviewerProgram: selectedProgram.value });

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
