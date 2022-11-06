<template>
	<div class="mt-32px relative">
		<div class="flex">
			<div class="sidebarVerticalBigRedDivider"></div>
			<div class="sidebarVerticalSmallRedDivider"></div>
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
							{{ slotProps.value.category }}
						</div>
					</template>
				</Dropdown>
			</div>
		</div>

		<router-link to="" custom v-slot="{ navigate }">
			<Button
				class="p-button-secondary p-button-text !ml-24px !mt-32px !w-336px !h-48px"
				@click="navigate"
				role="link"
			>
				<img
					alt="logo"
					src="/assets/recruit-manger-page/Setting_line.svg"
					style="width: 1.5rem"
				/>
				<span
					class="text-left tracking-3px ml-3 font-bold text-[20px] text-[#2D2926]"
				>
					{{ $t("專案設定") }}
				</span>
			</Button>
		</router-link>

		<router-link to="" custom v-slot="{ navigate }">
			<Button
				class="p-button-secondary p-button-text !ml-24px !mt-32px !w-336px !h-48px"
				@click="navigate"
				role="link"
			>
				<img
					alt="logo"
					src="/assets/recruit-manger-page/Chart_light.svg"
					style="width: 1.5rem"
				/>
				<span
					class="text-left tracking-3px ml-3 font-bold text-[20px] text-[#2D2926]"
				>
					{{ $t("專案狀態") }}
				</span>
			</Button>
		</router-link>
		<div class="flex mt-32px">
			<div class="sidebarRedDivider"></div>
			<div class="mt-[-8px] ml-8px text-[#93282C] text-20px font-bold">
				{{ $t("申請端設定") }}
			</div>
		</div>
		<router-link to="" custom v-slot="{ navigate }">
			<Button
				class="p-button-secondary p-button-text !ml-24px !mt-32px !w-336px !h-48px"
				@click="navigate"
				role="link"
			>
				<img
					alt="logo"
					src="/assets/recruit-manger-page/User_add_alt.svg"
					style="width: 1.5rem"
				/>
				<span
					class="text-left tracking-3px ml-3 font-bold text-[20px] text-[#2D2926]"
				>
					{{ $t("申請帳戶設置") }}
				</span>
			</Button>
		</router-link>
		<router-link to="" custom v-slot="{ navigate }">
			<Button
				class="p-button-secondary p-button-text !ml-24px !mt-32px !w-336px !h-48px"
				@click="navigate"
				role="link"
			>
				<img
					alt="logo"
					src="/assets/recruit-manger-page/Sort_alfa.svg"
					style="width: 1.5rem"
				/>
				<span
					class="text-left tracking-3px ml-3 font-bold text-[20px] text-[#2D2926]"
				>
					{{ $t("上傳欄位設置") }}
				</span>
			</Button>
		</router-link>
		<router-link to="" custom v-slot="{ navigate }">
			<Button
				class="p-button-secondary p-button-text !ml-24px !mt-32px !w-336px !h-48px"
				@click="navigate"
				role="link"
			>
				<img
					alt="logo"
					src="/assets/recruit-manger-page/File_dock_search.svg"
					style="width: 1.5rem"
				/>
				<span
					class="text-left tracking-3px ml-3 font-bold text-[20px] text-[#2D2926]"
				>
					{{ $t("上傳資料列表") }}
				</span>
			</Button>
		</router-link>
		<div class="flex mt-32px">
			<div class="sidebarRedDivider"></div>
			<div class="mt-[-8px] ml-8px text-[#93282C] text-20px font-bold">
				{{ $t("審查端設定") }}
			</div>
		</div>
		<router-link to="" custom v-slot="{ navigate }">
			<Button
				class="p-button-secondary p-button-text !ml-24px !mt-32px !w-336px !h-48px"
				@click="navigate"
				role="link"
			>
				<img
					alt="logo"
					src="/assets/recruit-manger-page/Eye_light.svg"
					style="width: 1.5rem"
				/>
				<span
					class="text-left tracking-3px ml-3 font-bold text-[20px] text-[#2D2926]"
				>
					{{ $t("審查評分設置") }}
				</span>
			</Button>
		</router-link>
		<router-link to="manager/gradeDataList" custom v-slot="{ navigate }">
			<Button
				class="p-button-secondary p-button-text !ml-24px !mt-32px !w-336px !h-48px"
				@click="navigate"
				role="link"
			>
				<img
					alt="logo"
					src="/assets/recruit-manger-page/Flag_finish.svg"
					style="width: 1.5rem"
				/>
				<span
					class="text-left tracking-3px ml-3 font-bold text-[20px] text-[#2D2926]"
				>
					{{ $t("評分資料列表") }}
				</span>
			</Button>
		</router-link>
		<router-link
			to="/recruitment/manager/reviewProgress"
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
					src="/assets/recruit-manger-page/User_light.svg"
					style="width: 1.5rem"
				/>
				<span
					class="text-left tracking-3px ml-3 font-bold text-[20px] text-[#2D2926]"
				>
					{{ $t("審查人員與進度") }}
				</span>
			</Button>
		</router-link>

		<div
			class="bg-gray-200 bg-opacity-50 h-104px w-[100%]"
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
				<Button class="p-button-text !mt-25px !ml-50px">
					<img
						alt="logo"
						src="/assets/sidebar/Setting_alt_line.png"
						class="w-28px h-28px"
					/>
				</Button>
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
import { ref } from "vue";
import Dropdown from "primevue/dropdown";
import Button from "primevue/button";
import { useRouter } from "vue-router";
import { useRecruitmentReviewerAuthStore } from "@/stores/universalAuth";
import { RecruitmentReviewerAPI } from "@/api/recruitment/reviewer/api";
import { useQuery } from "@tanstack/vue-query";
import { InvalidSessionError } from "@/api/error";

const reviewerAuth = useRecruitmentReviewerAuthStore();
const api = new RecruitmentReviewerAPI(reviewerAuth);

const programs = ref([]);
// TODO: add API for ProgramList

// const {
// 	isLoading,
// 	isError,
// 	data: programs,
// 	error,
// } = useQuery(["programList"], async () => {
// 	try {
// 		return await api.getProgramList();
// 	} catch (e: any) {
// 		if (e instanceof InvalidSessionError) {
// 			// FIXME: show session expiry notification??
// 			// Why are we even here in the first place?
// 			// MainContainer should have checked already.
// 			console.error(
// 				"Session has already expired while querying programList"
// 			);
// 			router.push("/");
// 			return;
// 		}
// 	}
// });

const router = useRouter();

// FIXME: this should NOT be hardcoded.
const selectedProgram = ref({
	id: 1,
	category: "111年教師應徵",
	name: "A組",
	application_start_date: "2022-10-01T00:00:00.000+08:00",
	application_end_date: "2022-10-31T00:00:00.000+08:00",
	review_start_date: "2022-11-01T00:00:00.000+08:00",
	review_end_date: "2022-11-30T00:00:00.000+08:00",
	require_file: "['file1', 'file2']",
	stage: "application",
	created_at: "2022-10-18T07:00:10.671+08:00",
	updated_at: "2022-10-18T07:00:10.671+08:00",
	applicant_required_info: null,
	applicant_required_file: null,
	reviewer_required_info: null,
	reviewer_required_file: null,
});

const generateOptions = (data: any) => data.category;

async function signOut() {
	await api.invalidateSession();
	router.push("/recruitment/manager/signin");
}
</script>

<style></style>
