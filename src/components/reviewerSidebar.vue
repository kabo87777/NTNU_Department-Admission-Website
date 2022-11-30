<template>
	<div class="relative" style="height: 100%">
		<div class="flex">
			<div class="sidebarVerticalBigRedDivider mt-32px"></div>
			<div class="sidebarVerticalSmallRedDivider mt-32px"></div>
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

		<div class="flex mt-32px">
			<div class="sidebarBlueDivider"></div>
			<div class="mt-[-8px] ml-8px text-[#236192] text-18px font-bold">
				{{ $t("第一階段審查") }}
			</div>
		</div>

		<router-link
			to="/admission/reviewer/applicationReview"
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
					{{ $t("書面資料評閱") }}
				</span>
			</Button>
		</router-link>

		<router-link
			to="/admission/reviewer/oralReview"
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
					{{ $t("口試資料評閱") }}
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
							{{ $t("系辦主管") }}
						</div>
					</div>
				</div>
				<div class="flex absolute mt-18px mr-4px" style="right: 0px">
					<router-link
						to="/admission/reviewer/reviewerUserSetting"
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
import { RouterLink, useRouter } from "vue-router";
import { useAdmissionReviewerAuthStore } from "@/stores/universalAuth";
import { AdmissionReviewerAPI } from "@/api/admission/reviewer/api";
import { useQuery } from "@tanstack/vue-query";
import { InvalidSessionError } from "@/api/error";
import { AdmissionReviewerProgramListResponse } from "@/api/admission/reviewer/types";
import { useGlobalStore } from "@/stores/AdmissionReviewerStore";

const router = useRouter();

const reviewerAuth = useAdmissionReviewerAuthStore();
const api = new AdmissionReviewerAPI(reviewerAuth);
const store = useGlobalStore();

const {
	isLoading,
	isError,
	data: programs,
	error,
} = useQuery(["admissionReviewerProgramList"], async () => {
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

const dataPrograms = () => {
	if (programs.value) {
		const temp = toRaw(programs.value);
		return temp[0];
	}
}; //convert proxy to array or object

// const selectedProgram = ref(dataPrograms());

// FIXME: this should NOT be hardcoded.
const selectedProgram = ref<AdmissionReviewerProgramListResponse>();
watchEffect(() => {
	if (programs.value && programs.value.length > 1) {
		const temp = programs.value[0];
		store.updateadmissionReviewerProgramData(temp);
		// selectedProgram.value=toRaw(programs.value[0])
		selectedProgram.value = programs.value[0];
	}
});

watch(selectedProgram, (selection) => {
	store.updateadmissionReviewerProgramData(selectedProgram!.value!);

	console.debug("Selected program:\n" + JSON.stringify(selection, null, 2));
});

const generateOptions = (data: any) => data.category + data.name;

async function signOut() {
	await api.invalidateSession();
	router.push("/recruitment/reviewer/signin");
}
</script>

<style></style>
