<template>
	<div p="t-8" w="full" h="full" pos="relative">
		<!-- 專案選單 -->
		<div flex="~">
			<div w="2" h="15" mr="1" bg="nRed-500" />
			<div w="1" h="15" bg="nRed-500" />
			<div flex="grow" mx="4">
				<Dropdown
					v-model="selectedProgram"
					:options="programs"
					:optionLabel="generateOptions"
					:loading="isLoading"
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
			v-if="!noProgram || newProgram"
			h="[calc(100%-14rem)]"
			overflow="y-auto"
			scrollbar="thin thumb-nRed-100 thumb-rounded-full"
		>
			<div flex="~ col gap-6" mt="6">
				<!-- 1.專案設定 -->
				<router-link
					to="/admission/manager/projectSetting"
					custom
					v-slot="{ navigate }"
				>
					<NButton
						Admin
						white
						icon="pi pi-cog"
						size="lg"
						class="py-3 px-6 mx-6 gap-4 !justify-start"
						:class="letterSpace"
						@click="navigate"
						:isSelected="gateway === 'AdmissionAdminProjectSetting'"
						>{{ $t("專案設定") }}
					</NButton>
				</router-link>
				<!-- 2.專案狀態 -->
				<!-- <Button
				class="p-button-secondary p-button-text !ml-24px !mt-8px !w-[85%] !h-48px"
			>
				<img
					alt="logo"
					src="/assets/sidebar/Chart_light.png"
					style="width: 18px"
				/>
				<span
					class="text-left tracking-3px ml-3 font-bold text-18px text-[#2D2926]"
				>
					{{ $t("專案狀態") }}
				</span>
			</Button> -->
				<!-- Divider -->
				<div flex="~ gap-4" class="items-center" :class="letterSpace">
					<div w="1/10" h="!1px" bg="nRed" />
					<div my="auto" text="lg pAdmin">{{ $t("申請端設定") }}</div>
				</div>
				<!-- 3.申請帳號設置 -->
				<RouterLink
					to="/admission/manager/manageApplicants"
					custom
					v-slot="{ navigate }"
				>
					<NButton
						Admin
						white
						icon="pi pi-user-plus"
						size="lg"
						class="py-3 px-6 mx-6 gap-4 !justify-start"
						:class="letterSpace"
						@click="navigate"
						:isSelected="
							gateway === 'AdmissionAdminManageApplicants'
						"
						>{{ $t("申請帳號設置") }}
					</NButton>
				</RouterLink>
				<!-- 4.上傳欄位設置 -->
				<router-link
					to="/admission/manager/uploadFileSetting"
					custom
					v-slot="{ navigate }"
				>
					<NButton
						Admin
						white
						icon="pi pi-inbox"
						size="lg"
						class="py-3 px-6 mx-6 gap-4 !justify-start"
						:class="letterSpace"
						@click="navigate"
						:isSelected="
							gateway === 'AdmissionAdminUploadFileSetting'
						"
						>{{ $t("上傳欄位設置") }}
					</NButton>
				</router-link>
				<!-- 5.上傳資料列表 -->
				<router-link
					to="/admission/manager/applicantsUploadList"
					custom
					v-slot="{ navigate }"
				>
					<NButton
						Admin
						white
						icon="pi pi-file"
						size="lg"
						class="py-3 px-6 mx-6 gap-4 !justify-start"
						:class="letterSpace"
						@click="navigate"
						:isSelected="
							gateway ===
							('AdmissionAdminApplicantsUploadList' ||
								'AdmissionAdminApplicantUploadedDocs')
						"
						>{{ $t("上傳資料列表") }}
					</NButton>
				</router-link>
				<!-- Divider -->
				<div flex="~ gap-4" class="items-center" :class="letterSpace">
					<div w="1/10" h="!1px" bg="nRed" />
					<div my="auto" text="lg pAdmin">{{ $t("審查端設定") }}</div>
				</div>
				<!-- 6.審查評分設置 -->
				<router-link
					to="/admission/manager/reviewScoreField"
					custom
					v-slot="{ navigate }"
				>
					<NButton
						Admin
						white
						icon="pi pi-pencil"
						size="lg"
						class="py-3 px-6 mx-6 gap-4 !justify-start"
						:class="letterSpace"
						@click="navigate"
						:isSelected="
							gateway === 'AdmissionAdminReviewScoreField'
						"
						>{{ $t("審查評分設置") }}
					</NButton>
				</router-link>
				<!-- 7.評分資料列表 -->
				<router-link
					to="/admission/manager/gradeDataList"
					custom
					v-slot="{ navigate }"
				>
					<NButton
						Admin
						white
						icon="pi pi-chart-bar"
						size="lg"
						class="py-3 px-6 mx-6 gap-4 !justify-start"
						:class="letterSpace"
						@click="navigate"
						:isSelected="gateway === 'AdmissionAdminGradeDataList'"
						>{{ $t("評分資料列表") }}
					</NButton>
				</router-link>
			</div>
		</div>
		<!-- 頁面底部操作項目 -->
		<div pos="absolute bottom-0" bg="nGrey-50" w="full">
			<div flex="~ col gap-6" m="t-4 b-6">
				<!-- 管理按鈕 -->
				<div flex="~ gap-4" justify="center">
					<router-link
						to="/admission/manager/reviewerSettings"
						custom
						v-slot="{ navigate }"
					>
						<NButton
							Admin
							@click="navigate"
							icon="pi pi-user-edit"
							class="p-2 w-2/5 h-11 bg-white whitespace-nowrap"
							:class="letterSpace"
						>
							{{ $t("管理審查者") }}
						</NButton>
					</router-link>
					<NButton
						Success
						@click="isDisplayNewProjectPrompt = true"
						icon="pi pi-plus"
						class="p-2 w-2/5 h-11 bg-white whitespace-nowrap"
						:class="letterSpace"
					>
						{{ $t("新增專案") }}
					</NButton>
				</div>
				<!-- 使用者操作 -->
				<div flex="~ gap-4" mx="6" class="items-center">
					<!-- Icon -->
					<div w="10" h="10" bg="nRed-600" border="rounded-full">
						<i class="pi pi-user" text="!2xl white" mx="2" my="1" />
					</div>
					<!-- Heading -->
					<div>
						<div text="sm pAdmin">{{ $t("管理端帳戶") }}</div>
						<div
							text="title"
							class="whitespace-nowrap"
							:class="letterSpace"
						>
							<!-- 記得把這邊從寫死的內容，改成 store 裡的資料 -->
							{{ adminStore.userInfo.name }}
						</div>
					</div>
					<!-- Button -->
					<div flex="~ gap-1" ml="auto">
						<!-- 使用者設定 -->
						<router-link
							to="/admission/manager/userSetting"
							custom
							v-slot="{ navigate }"
						>
							<NButton
								Admin
								white
								icon="pi pi-cog"
								@click="navigate"
								size="lg"
								class="w-12 h-12 m-auto"
								:isSelected="
									gateway === 'AdmissionAdminUserSetting'
								"
							/>
						</router-link>
						<!-- 登出 -->
						<NButton
							Admin
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
	</div>
	<!-- 新增專案彈窗 -->
	<Dialog
		header="新增專案"
		v-model:visible="isDisplayNewProjectPrompt"
		:closable="false"
		:draggable="false"
		:modal="true"
	>
		<div space="y-1">
			<div text="body">{{ $t("專案名稱") }}</div>
			<InputText type="text" v-model="newProjectName" w="!100" />
		</div>
		<div flex="~ gap-8" justify="center" mt="12">
			<NButton
				Admin
				@click="addNewProject"
				icon="pi pi-check"
				w="32"
				h="11"
			>
				{{ $t("建立專案") }}
			</NButton>
			<NButton
				@click="closeDisplayNewProjectPrompt"
				icon="pi pi-times"
				w="32"
				h="11"
			>
				{{ $t("取消") }}
			</NButton>
		</div>
	</Dialog>
</template>

<script setup lang="ts">
import "primevue/resources/primevue.min.css";
import Dropdown from "primevue/dropdown";
import NButton from "@/styles/CustomButton.vue";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import { useToast } from "primevue/usetoast";
import { useRoute, useRouter } from "vue-router";

import { ref, watchEffect, watch, computed } from "vue";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";

import { useAdmissionAdminAuthStore } from "@/stores/universalAuth";
import { useGlobalStore } from "@/stores/globalStore";

import { AdmissionAdminAPI } from "@/api/admission/admin/api";
import {
	AdmissionAdminProgramListResponse,
	AdmissionManagerAuthResponse,
} from "@/api/admission/admin/types";
import { useAdminInfoStore } from "@/stores/AdmissionAdminStore";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();
const router = useRouter();
const toast = useToast();
const queryClient = useQueryClient();
const adminAuth = useAdmissionAdminAuthStore();
const globalStore = useGlobalStore();
const adminStore = useAdminInfoStore();

const api = new AdmissionAdminAPI(adminAuth);

const programData = useMutation(async (newProgramData: any) => {
	return await api.addNewProgram(newProgramData);
});

const programs = ref<AdmissionAdminProgramListResponse[]>();

const { isLoading } = useQuery(
	["programList"],
	async () => {
		return await api.getProgramList();
	},
	{
		onSuccess: (data) => {
			programs.value = data;
		},
	}
);

const noProgram = computed(() => {
	return programs.value! === undefined || programs.value!.length === 0;
});

const selectedProgram = ref<AdmissionAdminProgramListResponse>();

const letterSpace = computed(() => {
	if (locale.value == "zh") return "tracking-[.125em]";
	if (locale.value == "en") return "tracking-tighter";
	else return "";
});

watch(programs, (newValue, oldValue) => {
	if (typeof newValue === "undefined")
		throw new Error("Program list is undefined");

	if (typeof globalStore.program === "undefined") {
		globalStore.$patch({ program: newValue[0] });
		selectedProgram.value = newValue[0];
		return;
	}

	const oldProgram = newValue.find((program) => {
		return globalStore.program?.id === program.id;
	});

	// If current program is deleted, then select the first entry in response
	const newProgram: AdmissionAdminProgramListResponse =
		typeof oldProgram === "undefined" ? newValue[0] : oldProgram;

	globalStore.$patch({
		program: newProgram,
	});
	selectedProgram.value = newProgram;
});

watch(selectedProgram, (selection) => {
	globalStore.$patch({ program: selectedProgram.value });

	console.debug("Selected program:\n" + JSON.stringify(selection, null, 2));
});

const isDisplayNewProjectPrompt = ref(false);
const newProjectName = ref("");

const generateOptions = (data: AdmissionAdminProgramListResponse) => {
	return data.category + data.name;
};

const newProgram = ref(false);

const route = useRoute();
const gateway = computed(() => route.name);

function addNewProject() {
	const todayDateString = dateTransform(new Date()) + "+08:00";

	programData.mutate(
		{
			category: "",
			name: newProjectName.value,
			application_start_date: todayDateString,
			application_end_date: todayDateString,
			review_start_date: todayDateString,
			review_end_date: todayDateString,
			docs_end_date: todayDateString,
			oral_start_date: todayDateString,
			applicant_required_info: '["file1", "file2"]',
			applicant_required_file: '["file3", "file4"]',
			reviewer_required_info: '["file1", "file2"]',
			reviewer_required_file: '["file3", "file4"]',
		},
		{
			onError: (e: any) => {
				toast.add({
					severity: "error",
					summary: e.toString(),
					life: 3000,
				});
			},
			onSuccess: () => {
				newProgram.value = true;

				toast.add({
					severity: "success",
					summary: "新增成功",
					life: 3000,
				});
			},
			onSettled: async () => {
				await queryClient.invalidateQueries({
					queryKey: ["programList"],
				});
			},
		}
	);

	isDisplayNewProjectPrompt.value = false;
}

function closeDisplayNewProjectPrompt() {
	isDisplayNewProjectPrompt.value = false;
}

function dateTransform(date?: Date) {
	const result = new Date(date!.setHours(date!.getHours() + 8))
		.toJSON()
		.replace("Z", "");
	return result;
}

async function signOut() {
	await api.invalidateSession();
	router.push("/admission/manager/signin");
}
</script>
