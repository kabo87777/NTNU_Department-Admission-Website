<template>
	<div class="mt-32px relative">
		<div class="flex">
			<div class="sidebarVerticalBigBlueDivider"></div>
			<div class="sidebarVerticalSmallBlueDivider"></div>
			<div class="ml-12px w-[100%]">
				<Dropdown
					v-model="selectedProgram"
					:options="programs"
					:optionLabel="generateOptions"
					class="h-60px w-[93%]"
					style="border-radius: 8px; border: 1px solid black"
				>
					<template #value="slotProps">
						<div class="mt-6px tracking-2px text-20px font-medium">
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
				class="p-button-secondary p-button-text !ml-24px !mt-32px !w-336px !h-48px"
				@click="navigate"
				role="link"
			>
				<img
					alt="logo"
					src="/assets/reviewer-page/Arhive.png"
					style="width: 1.5rem"
				/>
				<span
					class="text-left tracking-3px ml-3 font-bold text-[20px] text-[#2D2926]"
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
				class="p-button-secondary p-button-text !ml-24px !mt-32px !w-336px !h-48px"
				@click="navigate"
				role="link"
			>
				<img
					alt="logo"
					src="/assets/reviewer-page/Arhive-1.png"
					style="width: 1.5rem"
				/>
				<span
					class="text-left tracking-3px ml-3 font-bold text-[20px] text-[#2D2926]"
				>
					{{ $t("選看資料評閱") }}
				</span>
			</Button>
		</router-link>

		<div
			class="bg-gray-200 bg-opacity-50 h-104px w-[100%] !mt-530px"
			style="transform: translateY(20%)"
		>
			<div class="flex">
				<img
					alt="logo"
					src="/assets/sidebar/User_circle.png"
					class="h-40px w-40px ml-24px mt-35px"
				/>
				<div class="w-100px h-50px">
					<div class="text-xs ml-16px mt-27px">
						{{ $t("審查端帳戶") }}
					</div>
					<div class="text-xl ml-16px tracking-wider">
						{{ $t("系辦主管") }}
					</div>
				</div>
				<router-link
					to="/recruitment/reviewer/userSetting"
					custom
					v-slot="{ navigate }"
				>
					<Button
						class="p-button-text !mt-25px !ml-50px"
						@click="navigate"
						role="link"
					>
						<img
							alt="logo"
							src="/assets/sidebar/Setting_alt_line.png"
							class="w-28px h-28px"
						/>
					</Button>
				</router-link>
				<Button class="p-button-text !mt-25px" @click="signOut">
					<img
						alt="logo"
						src="/assets/sidebar/Sign_out_circle.png"
						class="w-28px h-28px"
					/>
				</Button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import "primevue/resources/primevue.min.css";
import { ref, watch, watchEffect } from "vue";
import Dropdown from "primevue/dropdown";
import Button from "primevue/button";
import { useRouter } from "vue-router";
import { useRecruitmentReviewerAuthStore } from "@/stores/universalAuth";
import { RecruitmentReviewerAPI } from "@/api/recruitment/reviewer/api";
import { useQuery } from "@tanstack/vue-query";
import { InvalidSessionError } from "@/api/error";
import { useGlobalStore } from "@/stores/globalStore";
import { RecruitmentReviewerProgramListResponse } from "@/api/recruitment/reviewer/types";

const reviewerAuth = useRecruitmentReviewerAuthStore();
const store = useGlobalStore();
const api = new RecruitmentReviewerAPI(reviewerAuth);

const {
	isLoading,
	isError,
	data: programs,
	error,
} = useQuery(["programList"], async () => {
	try {
		return await api.getProgramList();
	} catch (e: any) {
		if (e instanceof InvalidSessionError) {
			// FIXME: show session expiry notification??
			// Why are we even here in the first place?
			// MainContainer should have checked already.
			console.error(
				"Session has already expired while querying programList"
			);
			router.push("/");
			return;
		}
	}
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
	store.$patch({ program: selectedProgram.value });

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
