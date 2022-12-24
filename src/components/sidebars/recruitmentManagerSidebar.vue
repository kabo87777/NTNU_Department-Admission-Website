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
					class="h-15 w-full"
					border="rounded-lg 1 nGrey-800"
					style="border-radius: 8px; border: 1px solid black"
				>
					<template #value="slotProps">
						<div class="mt-6px tracking-1px text-18px font-medium">
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
					to="/recruitment/manager/projectSetting"
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
				<!-- Divider -->
				<div flex="~ gap-4" class="items-center" :class="letterSpace">
					<div w="1/10" h="!1px" bg="nRed" />
					<div my="auto" text="lg pAdmin">{{ $t("申請端設定") }}</div>
				</div>
				<!-- 2.申請帳號設置 -->
				<router-link
					to="/recruitment/manager/ListApplicant"
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
				</router-link>
				<!-- 3.上傳資料列表 -->
				<router-link
					:to="{
						name: 'recruitmentManagerApplicantUploadList',
					}"
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
				<!-- 4.審查評分設置 -->
				<!-- <router-link
					to="/recruitment/manager/reviewScoreField"
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
				</router-link> -->
				<!-- 5.評分資料列表 -->
				<router-link
					to="/recruitment/manager/gradeDataList"
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
				<!-- 6.審查人員與進度 -->
				<router-link
					to="/recruitment/manager/reviewProgress"
					custom
					v-slot="{ navigate }"
				>
					<NButton
						Admin
						white
						icon="pi pi-users"
						size="lg"
						class="py-3 px-6 mx-6 gap-4 !justify-start"
						:class="letterSpace"
						@click="navigate"
						:isSelected="gateway === 'AdmissionAdminGradeDataList'"
						>{{ $t("審查人員與進度") }}
					</NButton>
				</router-link>
				<!-- 7.必看名單設置 -->
				<router-link
					to="/recruitment/manager/mustviewSetting"
					custom
					v-slot="{ navigate }"
				>
					<NButton
						Admin
						white
						icon="pi pi-list"
						size="lg"
						class="py-3 px-6 mx-6 gap-4 !justify-start"
						:class="letterSpace"
						@click="navigate"
						:isSelected="gateway === 'AdmissionAdminGradeDataList'"
						>{{ $t("必看名單設置") }}
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
						to="/recruitment/manager/reviewerSettings"
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
						@click="newProject"
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
							{{ $t("系辦主管") }}
						</div>
					</div>
					<!-- Button -->
					<div flex="~ gap-1" ml="auto">
						<!-- 使用者設定 -->
						<router-link
							to="/recruitment/manager/userSetting"
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
		v-model:visible="displayNewProject"
		class="w-484px h-282px"
		:draggable="false"
		:modal="true"
	>
		<divider class="!mt-0px" />
		<p class="mt-24px text-base tracking-2px">
			{{ $t("專案名稱") }}
		</p>
		<InputText
			type="text"
			v-model="newProjectName"
			class="!w-428px !h-44px !mt-5px"
		/>
		<div class="flex">
			<Button
				@click="addNewProject"
				class="p-button-outlined p-button-success !ml-70px !mt-26px !w-142px !h-44px"
			>
				<img
					alt="logo"
					src="/assets/sidebar/Done_round.png"
					style="width: 1.25rem"
					class="!ml-0px"
				/>
				<span class="text-left text-xl">{{ $t("建立專案") }}</span>
			</Button>
			<Button
				@click="closeDisplayNewProject"
				class="p-button-outlined p-button-danger !ml-32px !mt-26px !w-105px !h-44px"
			>
				<img
					alt="logo"
					src="/assets/sidebar/Close_round.png"
					style="width: 18px"
					class="!ml-0px"
				/>
				<span class="text-left text-xl">{{ $t("取消") }}</span>
			</Button>
		</div>
	</Dialog>
</template>

<script setup lang="ts">
import "primevue/resources/primevue.min.css";
import { ref, computed, watchEffect, watch, toRaw } from "vue";
import Dropdown from "primevue/dropdown";
import Button from "primevue/button";
import NButton from "@/styles/CustomButton.vue";
import Divider from "primevue/divider";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import { useRoute, useRouter } from "vue-router";
import { useRecruitmentAdminAuthStore } from "@/stores/universalAuth";
import { RecruitmentAdminAPI } from "@/api/recruitment/admin/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/vue-query";
import { InvalidSessionError } from "@/api/error";
import { useGlobalStore } from "@/stores/RecruitmentAdminStore";
import { RecruitmentAdminProgramListResponse } from "@/api/recruitment/admin/types";
import { useAdminInfoStore } from "@/stores/RecruitmentAdminStore";
import type { RecruitmentAdminAuthResponse } from "@/api/recruitment/admin/types";
import { useToast } from "primevue/usetoast";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();
const route = useRoute();
const gateway = computed(() => route.name);
const router = useRouter();
const adminStore = useAdminInfoStore();

const adminInfo: RecruitmentAdminAuthResponse = toRaw(adminStore.userInfo);
const adminAuth = useRecruitmentAdminAuthStore();
const globalStore = useGlobalStore();

const api = new RecruitmentAdminAPI(adminAuth);
const programData = useMutation(async (newProgramData: any) => {
	try {
		return await api.addNewProgram(newProgramData);
	} catch (error) {
		console.log(error);
	}
});

const { isLoading, data: programs } = useQuery(
	["recruitmentAdminprogramList"],
	async () => {
		return await api.getProgramList();
	}
);

const noProgram = computed(() => {
	return programs.value! === undefined || programs.value!.length === 0;
});

const selectedProgram = ref<RecruitmentAdminProgramListResponse>();

const letterSpace = computed(() => {
	if (locale.value == "zh") return "tracking-[.125em]";
	if (locale.value == "en") return "tracking-tighter";
	else return "";
});

watchEffect(() => {
	if (!programs.value) return;

	globalStore.$patch((state) => {
		state.program = programs.value[0];
	});

	selectedProgram.value = programs.value[0];
});

watch(selectedProgram, (selection) => {
	globalStore.$patch({ program: selectedProgram.value });

	console.debug("Selected program:\n" + JSON.stringify(selection, null, 2));
});

const displayNewProject = ref(false);
const newProjectName = ref("");

const generateOptions = (data: any) => data.category + data.name;

function newProject() {
	displayNewProject.value = true;
}

const newProgram = ref(false);
const queryClient = useQueryClient();
const toast = useToast();
async function addNewProject() {
	const today = new Date();
	try {
		programData.mutate(
			{
				category: "",
				name: newProjectName.value,
				recruit_start_date: dateTransform(today) + "+08:00",
				recruit_end_date: dateTransform(today) + "+08:00",
				review_start_date: dateTransform(today) + "+08:00",
				review_end_date: dateTransform(today) + "+08:00",
				created_at: dateTransform(today) + "+08:00",
				updated_at: dateTransform(today) + "+08:00",
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
						queryKey: ["recruitmentAdminprogramList"],
					});
				},
			}
		);
		newProgram.value = true;
		// toast.add({severity:'success', summary: '更改成功', life: 3000});
	} catch (error) {
		// toast.add({severity:'error', summary: '資料錯誤', life: 3000});
	}
	displayNewProject.value = false;
	await queryClient.invalidateQueries({
		queryKey: ["recruitmentAdminprogramList"],
	});
}

function closeDisplayNewProject() {
	displayNewProject.value = false;
}

function dateTransform(date?: Date) {
	const result = new Date(date!.setHours(date!.getHours() + 8))
		.toJSON()
		.replace("Z", "");
	return result;
}

async function signOut() {
	await api.invalidateSession();
	router.push("/recruitment/manager/signin");
}
</script>

<style></style>
