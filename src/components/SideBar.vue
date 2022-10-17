<template>
	<div class="mt-32px">
		<div class="flex">
			<div class="sidebarVerticalBigRedDivider"></div>
			<div class="sidebarVerticalSmallRedDivider"></div>
			<div class="ml-16px">
				<Dropdown
					v-model="selectedProgram"
					:options="programs"
					optionLabel="program_name"
					class="w-320px h-72px"
					style="border-radius: 8px; border: 1px solid black"
				>
					<template #value="slotProps">
						<div class="mt-10px tracking-2px text-24px font-medium">
							{{ $t(slotProps.value.program_name) }}
						</div>
					</template>
				</Dropdown>
			</div>
		</div>

		<router-link
			to="/admission/manager/projectSetting"
			custom
			v-slot="{ navigate }"
		>
			<Button
				class="p-button-secondary p-button-text !ml-24px !mt-36px !w-336px !h-48px"
				@click="navigate"
				role="link"
			>
				<img
					alt="logo"
					src="/assets/sidebar/Setting_line.png"
					style="width: 1.5rem"
				/>
				<span
					class="text-left tracking-3px ml-3 font-bold text-xl text-[#2D2926]"
				>
					{{ $t("專案設定") }}
				</span>
			</Button>
		</router-link>

		<Button
			class="p-button-secondary p-button-text !ml-24px !mt-16px !w-336px !h-48px"
		>
			<img
				alt="logo"
				src="/assets/sidebar/Chart_light.png"
				style="width: 1.5rem"
			/>
			<span
				class="text-left tracking-3px ml-3 font-bold text-xl text-[#2D2926]"
			>
				{{ $t("專案狀態") }}
			</span>
		</Button>

		<div class="flex mt-32px">
			<div class="sidebarRedDivider"></div>
			<div class="mt-[-8px] ml-8px text-[#874B52] text-20px font-bold">
				{{ $t("申請端設定") }}
			</div>
		</div>

		<Button
			class="p-button-secondary p-button-text !ml-24px !mt-24px !w-336px !h-48px"
		>
			<img
				alt="logo"
				src="/assets/sidebar/Bell.png"
				style="width: 1.5rem"
			/>
			<span
				class="text-left tracking-3px ml-3 font-bold text-xl text-[#2D2926]"
			>
				{{ $t("資訊公告") }}
			</span>
		</Button>
		<Button
			class="p-button-secondary p-button-text !ml-24px !mt-16px !w-336px !h-48px"
		>
			<img
				alt="logo"
				src="/assets/sidebar/User_add_alt.png"
				style="width: 1.5rem"
			/>
			<span
				class="text-left tracking-3px ml-3 font-bold text-xl text-[#2D2926]"
			>
				{{ $t("申請帳號設置") }}
			</span>
		</Button>
		<router-link
			to="/admission/manager/projectSettings"
			custom
			v-slot="{ navigate }"
		>
			<Button
				class="p-button-secondary p-button-text !ml-24px !mt-16px !w-336px !h-48px"
				@click="navigate"
				role="link"
			>
				<img
					alt="logo"
					src="/assets/sidebar/Sort_alfa.png"
					style="width: 1.5rem"
				/>
				<span
					class="text-left tracking-3px ml-3 font-bold text-xl text-[#2D2926]"
				>
					{{ $t("上傳欄位設置") }}
				</span>
			</Button>
		</router-link>
		<router-link to="/admission/manager/applicantsUploadList">
			<Button
				class="p-button-secondary p-button-text !ml-24px !mt-16px !w-336px !h-48px"
			>
				<img
					alt="logo"
					src="/assets/sidebar/File_dock_search.png"
					style="width: 1.5rem"
				/>
				<span
					class="text-left tracking-3px ml-3 font-bold text-xl text-[#2D2926]"
				>
					{{ $t("上傳資料列表") }}
				</span>
			</Button>
		</router-link>

		<div class="flex mt-32px">
			<div class="sidebarRedDivider"></div>
			<div class="mt-[-8px] ml-8px text-[#874B52] text-20px font-bold">
				{{ $t("審查端設定") }}
			</div>
		</div>

		<router-link
			to="/admission/manager/reviewScoreField"
			custom
			v-slot="{ navigate }"
		>
			<Button
				class="p-button-secondary p-button-text !ml-24px !mt-24px !w-336px !h-48px"
				@click="navigate"
				role="link"
			>
				<img
					alt="logo"
					src="/assets/sidebar/Eye_light.png"
					style="width: 1.5rem"
				/>
				<span
					class="text-left tracking-3px ml-3 font-bold text-xl text-[#2D2926]"
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
				class="p-button-secondary p-button-text !ml-24px !mt-12px !w-336px !h-48px"
				@click="navigate"
				role="link"
			>
				<img
					alt="logo"
					src="/assets/sidebar/Flag_finish.png"
					style="width: 1.5rem"
				/>
				<span
					class="text-left tracking-3px ml-3 font-bold text-xl text-[#2D2926]"
				>
					{{ $t("評分資料列表") }}
				</span>
			</Button>
		</router-link>
		<div
			class="bg-gray-200 bg-opacity-50 h-203px w-399px"
			style="transform: translateY(35%)"
		>
			<div class="flex">
				<div class="m-auto">
					<Button
						class="w-168px h-44px p-button-outlined !mt-24px !bg-white"
					>
						<img
							alt="logo"
							src="/assets/sidebar/User_box.png"
							style="width: 1.25rem"
						/>
						<h1 class="ml-8px tracking-1px text-18px text-gray-900">
							{{ $t("管理審查者") }}
						</h1>
					</Button>
					<Button
						@click="newProject"
						class="w-168px h-44px p-button-outlined p-button-success !ml-16px !bg-white"
					>
						<img
							alt="logo"
							src="/assets/sidebar/Add_round.png"
							style="width: 1.25rem"
							class="!ml-0px"
						/>
						<h1 class="ml-8px tracking-1px text-18px text-gray-900">
							{{ $t("新增專案") }}
						</h1>
					</Button>
				</div>
			</div>
			<Dialog
				header="新增專案"
				v-model:visible="displayNewProject"
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
						@click="closeDisplayNewProject"
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
						@click="closeDisplayNewProject"
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
			<div class="flex relative">
				<img
					alt="logo"
					src="/assets/sidebar/User_circle.png"
					class="h-40px w-40px ml-24px mt-50px"
				/>
				<div class="w-100px h-50px">
					<div class="text-xs ml-16px mt-50px">
						{{ $t("管理端帳戶") }}
					</div>
					<div class="text-xl ml-16px tracking-wider">
						{{ $t("系辦主管") }}
					</div>
				</div>
				<div class="absolute right-0 mr-8px">
					<router-link
						to="/admission/manager/managerUserSetting"
						custom
						v-slot="{ navigate }"
					>
						<Button class="p-button-text !mt-46px !ml-50px">
							<img
								alt="logo"
								src="/assets/sidebar/Setting_alt_line.png"
								class="w-28px h-28px"
								@click="navigate"
								role="link"
							/>
						</Button>
					</router-link>
					<Button class="p-button-text !mt-46px" @click="signOut">
						<img
							alt="logo"
							src="/assets/sidebar/Sign_out_circle.png"
							class="w-28px h-28px"
						/>
					</Button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import "primevue/resources/primevue.min.css";
import Sidebar from "primevue/sidebar";
import { ref, watch } from "vue";
import Dropdown from "primevue/dropdown";
import Button from "primevue/button";
import Divider from "primevue/divider";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import {
	useAdmissionAdminAuthStore,
	useAdmissionReviewerAuthStore,
} from "@/stores/universalAuth";
import * as adminApi from "@/api/admission/admin/api";
// import * as reviewerApi from "@/api/admission/reviewer/api";
import applicantUploadedDocsVue from "@/views/admission/manager/applicantsUploadList/applicantUploadedDocs.vue";

const router = useRouter();

const reviewerAuth = useAdmissionReviewerAuthStore();
const adminAuth = useAdmissionAdminAuthStore();

const { t } = useI18n();

const visibleLeft = ref(true);
const selectedProgram = ref({
	program_name: "2022 研究生審查 Master Review",
	value: 1,
});
const programs = ref([
	{ program_name: "2022 研究生審查 Master Review", value: 1 },
	{ program_name: "2022 博士生審查 Phd Review", value: 2 },
]);
const displayNewProject = ref(false);
const newProjectName = ref("");

function newProject() {
	displayNewProject.value = true;
}

function closeDisplayNewProject() {
	displayNewProject.value = false;
}

async function signOut() {
	if (adminAuth.isValidSession) {
		if (await adminApi.sign_out(adminAuth)) {
			router.push("/");
		}
	}
}
</script>

<style></style>
