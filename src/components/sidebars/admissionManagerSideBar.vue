<template>
	<div class="relative" style="height: 100%">
		<div class="flex mt-32px">
			<div class="sidebarVerticalBigRedDivider"></div>
			<div class="sidebarVerticalSmallRedDivider"></div>
			<div class="ml-12px w-[100%]">
				<Dropdown
					v-model="selectedProgram"
					:options="programs"
					:optionLabel="generateOptions"
					:loading="isLoading"
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

		<div v-if="!noProgram || newProgram">
			<router-link
				to="/admission/manager/projectSetting"
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
						src="/assets/sidebar/Setting_line.png"
						style="width: 18px"
					/>
					<span
						class="text-left tracking-3px ml-3 font-bold text-[18px] text-[#2D2926]"
					>
						{{ $t("專案設定") }}
					</span>
				</Button>
			</router-link>

			<Button
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
			</Button>

			<div class="flex mt-32px">
				<div class="sidebarRedDivider"></div>
				<div
					class="mt-[-8px] ml-8px text-[#874B52] text-18px font-bold"
				>
					{{ $t("申請端設定") }}
				</div>
			</div>
			<RouterLink
				to="/admission/manager/manageApplicants"
				custom
				v-slot="{ navigate }"
			>
				<Button
					class="p-button-secondary p-button-text !ml-24px !mt-18px !w-[85%] !h-48px"
					@click="navigate"
				>
					<img
						alt="logo"
						src="/assets/sidebar/User_add_alt.png"
						style="width: 18px"
					/>
					<span
						class="text-left tracking-3px ml-3 font-bold text-18px text-[#2D2926]"
					>
						{{ $t("申請帳號設置") }}
					</span>
				</Button>
			</RouterLink>
			<router-link
				to="/admission/manager/projectSettings"
				custom
				v-slot="{ navigate }"
			>
				<Button
					class="p-button-secondary p-button-text !ml-24px !mt-8px !w-[85%] !h-48px"
					@click="navigate"
					role="link"
				>
					<img
						alt="logo"
						src="/assets/sidebar/Sort_alfa.png"
						style="width: 18px"
					/>
					<span
						class="text-left tracking-3px ml-3 font-bold text-18px text-[#2D2926]"
					>
						{{ $t("上傳欄位設置") }}
					</span>
				</Button>
			</router-link>
			<router-link to="/admission/manager/applicantsUploadList">
				<Button
					class="p-button-secondary p-button-text !ml-24px !mt-8px !w-[85%] !h-48px"
				>
					<img
						alt="logo"
						src="/assets/sidebar/File_dock_search.png"
						style="width: 18px"
					/>
					<span
						class="text-left tracking-3px ml-3 font-bold text-18px text-[#2D2926]"
					>
						{{ $t("上傳資料列表") }}
					</span>
				</Button>
			</router-link>
			<div class="flex mt-32px">
				<div class="sidebarRedDivider"></div>
				<div
					class="mt-[-8px] ml-8px text-[#874B52] text-18px font-bold"
				>
					{{ $t("審查端設定") }}
				</div>
			</div>
			<router-link
				to="/admission/manager/reviewScoreField"
				custom
				v-slot="{ navigate }"
			>
				<Button
					class="p-button-secondary p-button-text !ml-24px !mt-16px !w-[85%] !h-48px"
					@click="navigate"
					role="link"
				>
					<img
						alt="logo"
						src="/assets/sidebar/Eye_light.png"
						style="width: 18px"
					/>
					<span
						class="text-left tracking-3px ml-3 font-bold text-18px text-[#2D2926]"
					>
						{{ $t("審查評分設置") }}
					</span>
				</Button>
			</router-link>
			<router-link
				to="/admission/manager/gradeDataList"
				custom
				v-slot="{ navigate }"
			>
				<Button
					class="p-button-secondary p-button-text !ml-24px !mt-8px !w-[85%] !h-48px"
					@click="navigate"
					role="link"
				>
					<img
						alt="logo"
						src="/assets/sidebar/Flag_finish.png"
						style="width: 18px"
					/>
					<span
						class="text-left tracking-3px ml-3 font-bold text-18px text-[#2D2926]"
					>
						{{ $t("評分資料列表") }}
					</span>
				</Button>
			</router-link>
		</div>
		<div
			v-if="noProgram && !newProgram"
			class="absolute bg-gray-200 bg-opacity-50 h-220px w-[100%]"
			style="bottom: 0px"
		>
			<div class="relative flex mt-16px">
				<div class="flex m-auto">
					<div>
						<router-link
							to="/admission/manager/reviewerSettings"
							custom
							v-slot="{ navigate }"
						>
							<Button
								class="h-36px p-button-outlined !bg-white"
								@click="navigate"
								role="link"
							>
								<img
									alt="logo"
									src="/assets/sidebar/User_box.png"
									style="width: 18px"
								/>
								<h1 class="ml-8px text-16px text-gray-900">
									{{ $t("管理審查者") }}
								</h1>
							</Button>
						</router-link>
					</div>
					<div class="ml-8px">
						<Button
							@click="isDisplayNewProjectPrompt = true"
							class="h-36px p-button-outlined p-button-success !bg-white"
						>
							<img
								alt="logo"
								src="/assets/sidebar/Add_round.png"
								style="width: 18px"
							/>
							<h1 class="ml-8px text-16px text-gray-900">
								{{ $t("新增專案") }}
							</h1>
						</Button>
					</div>
				</div>
			</div>
			<Dialog
				header="新增專案"
				v-model:visible="isDisplayNewProjectPrompt"
				class="w-484px h-282px"
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
						<span class="text-left text-xl">{{
							$t("建立專案")
						}}</span>
					</Button>
					<Button
						@click="closeDisplayNewProjectPrompt"
						class="p-button-outlined p-button-danger !ml-32px !mt-26px !w-105px !h-44px"
					>
						<img
							alt="logo"
							src="/assets/sidebar/Close_round.png"
							style="width: 1.25rem"
							class="!ml-0px"
						/>
						<span class="text-left text-xl">{{ $t("取消") }}</span>
					</Button>
				</div>
			</Dialog>
			<div class="relative flex mt-16px">
				<div class="flex">
					<img
						alt="logo"
						src="/assets/sidebar/User_circle.png"
						class="h-32px w-32px ml-20px mt-4px"
					/>
					<div>
						<div class="text-xs ml-8px">
							{{ $t("管理端帳戶") }}
						</div>
						<div class="text-16px mt-4px ml-8px tracking-wider">
							{{ $t("系辦主管") }}
						</div>
					</div>
				</div>
				<div class="absolute mt-[-4px]" style="right: 8px">
					<router-link
						to="/admission/manager/userSetting"
						custom
						v-slot="{ navigate }"
					>
						<Button
							class="p-button-text p-button-text p-button-sm"
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
						class="p-button-text p-button-text p-button-sm"
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
		<div
			v-else
			class="absolute bg-gray-200 bg-opacity-50 h-220px w-[100%]"
			style="bottom: 0px"
		>
			<div class="relative flex mt-16px">
				<div class="flex m-auto">
					<div>
						<router-link
							to="/admission/manager/reviewerSettings"
							custom
							v-slot="{ navigate }"
						>
							<Button
								class="h-36px p-button-outlined !bg-white"
								@click="navigate"
								role="link"
							>
								<img
									alt="logo"
									src="/assets/sidebar/User_box.png"
									style="width: 18px"
								/>
								<h1 class="ml-8px text-16px text-gray-900">
									{{ $t("管理審查者") }}
								</h1>
							</Button>
						</router-link>
					</div>
					<div class="ml-8px">
						<Button
							@click="isDisplayNewProjectPrompt = true"
							class="h-36px p-button-outlined p-button-success !bg-white"
						>
							<img
								alt="logo"
								src="/assets/sidebar/Add_round.png"
								style="width: 18px"
							/>
							<h1 class="ml-8px text-16px text-gray-900">
								{{ $t("新增專案") }}
							</h1>
						</Button>
					</div>
				</div>
			</div>
			<Dialog
				header="新增專案"
				v-model:visible="isDisplayNewProjectPrompt"
				class="w-484px h-282px"
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
						<span class="text-left text-xl">{{
							$t("建立專案")
						}}</span>
					</Button>
					<Button
						@click="closeDisplayNewProjectPrompt"
						class="p-button-outlined p-button-danger !ml-32px !mt-26px !w-105px !h-44px"
					>
						<img
							alt="logo"
							src="/assets/sidebar/Close_round.png"
							style="width: 18rem"
							class="!ml-0px"
						/>
						<span class="text-left text-xl">{{ $t("取消") }}</span>
					</Button>
				</div>
			</Dialog>
			<div class="relative flex mt-16px">
				<div class="flex">
					<img
						alt="logo"
						src="/assets/sidebar/User_circle.png"
						class="h-32px w-32px ml-20px"
					/>
					<div>
						<div class="text-xs ml-8px">
							{{ $t("管理端帳戶") }}
						</div>
						<div class="text-16px mt-4px ml-8px tracking-wider">
							{{ $t("系辦主管") }}
						</div>
					</div>
				</div>
				<div class="absolute mt-[-4px]" style="right: 8px">
					<router-link
						to="/admission/manager/userSetting"
						custom
						v-slot="{ navigate }"
					>
						<Button
							class="p-button-text p-button-text p-button-sm"
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
						class="p-button-text p-button-text p-button-sm"
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
import Dropdown from "primevue/dropdown";
import Button from "primevue/button";
import Divider from "primevue/divider";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import { useToast } from "primevue/usetoast";
import { useRouter } from "vue-router";

import { ref, watchEffect, watch, computed } from "vue";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";

import { useAdmissionAdminAuthStore } from "@/stores/universalAuth";
import { useGlobalStore } from "@/stores/globalStore";

import { AdmissionAdminAPI } from "@/api/admission/admin/api";
import { AdmissionAdminProgramListResponse } from "@/api/admission/admin/types";

const router = useRouter();
const toast = useToast();
const queryClient = useQueryClient();
const adminAuth = useAdmissionAdminAuthStore();
const globalStore = useGlobalStore();

const api = new AdmissionAdminAPI(adminAuth);

const programData = useMutation(async (newProgramData: any) => {
	return await api.addNewProgram(newProgramData);
});

const { isLoading, data: programs } = useQuery(["programList"], async () => {
	return await api.getProgramList();
});

const noProgram = computed(() => {
	return programs.value! === undefined || programs.value!.length === 0;
});

const selectedProgram = ref<AdmissionAdminProgramListResponse>();

watchEffect(() => {
	if (!programs.value) return;

	if (programs.value.length == 0) throw new Error("No programs available!");

	globalStore.$patch((state) => {
		state.program = programs.value[0];
	});

	selectedProgram.value = programs.value[0];
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
			stage: "application_stage",
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
					summary: "更改成功",
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
