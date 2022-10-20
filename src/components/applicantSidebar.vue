<template>
	<div class="relative" style="height: 100%">
		<div class="flex">
			<div class="sidebarVerticalBigYellowDivider mt-32px"></div>
			<div class="sidebarVerticalSmallYellowDivider mt-32px"></div>
			<div class="mt-32px ml-12px w-[100%]">
				<Dropdown
					v-model="selectedProgram"
					:options="programs"
					:optionLabel="generateOptions"
					class="h-60px w-[93%]"
					style="border-radius: 8px; border: 1px solid #736028"
				>
					<template #value="slotProps">
						<div class="mt-4px tracking-2px text-24px font-medium">
							{{ slotProps.value.category }}
							{{ slotProps.value.name }}
						</div>
					</template>
				</Dropdown>
			</div>
		</div>

		<router-link
			:to="{
				name: 'AdmissionApplicantLatestNews',
				params: { userId: 7 },
			}"
			custom
			v-slot="{ navigate }"
		>
			<Button
				class="p-button-secondary p-button-text !ml-24px !mt-24px !w-336px !h-48px !hover:bg-[#ECEDED] !rounded-[8px]"
				style=":active: border: 1px solid #736028 !important"
				@click="navigate"
				role="link"
			>
				<i
					class="pi pi-bell"
					style="font-size: 1.3rem; color: #101820"
				/>
				<span
					class="text-left tracking-3px ml-4 font-bold text-xl text-[#2D2926]"
				>
					{{ $t("最新資訊") }}
				</span>
			</Button>
		</router-link>

		<div class="flex mt-32px">
			<div class="sidebarYellowDivider"></div>
			<div class="mt-[-8px] ml-8px text-[#736028] text-20px font-bold">
				{{ $t("資料填寫、上傳") }}
			</div>
		</div>

		<router-link
			:to="{
				name: 'AdmissionApplicantBasicInfo',
				params: { userId: 7 },
			}"
			custom
			v-slot="{ navigate }"
		>
			<Button
				class="p-button-secondary p-button-text !ml-24px !mt-16px !w-336px !h-48px !hover:bg-[#ECEDED] !rounded-[8px]"
				@click="navigate"
				role="link"
			>
				<i
					class="pi pi-user"
					style="font-size: 1.3rem; color: #101820"
				/>
				<span
					class="text-left tracking-3px ml-4 font-bold text-xl text-[#2D2926]"
				>
					{{ $t("基本資料") }}
				</span>
			</Button>
		</router-link>

		<router-link
			:to="{
				name: 'AdmissionApplicantAttachment',
				params: { userId: 7 },
			}"
			custom
			v-slot="{ navigate }"
		>
			<Button
				class="p-button-secondary p-button-text !ml-24px !mt-8px !w-336px !h-48px !hover:bg-[#ECEDED] !rounded-[8px]"
				@click="navigate"
				role="link"
			>
				<i
					class="pi pi-book"
					style="font-size: 1.3rem; color: #101820"
				/>
				<span
					class="text-left tracking-3px ml-4 font-bold text-xl text-[#2D2926]"
				>
					{{ $t("附件資料") }}
				</span>
			</Button>
		</router-link>

		<div class="flex mt-32px">
			<div class="sidebarYellowDivider"></div>
			<div class="mt-[-8px] ml-8px text-[#736028] text-20px font-bold">
				{{ $t("相關作業、系統") }}
			</div>
		</div>

		<router-link
			:to="{
				name: 'AdmissionApplicantRecommendationLetter',
				params: { userId: 7 },
			}"
			custom
			v-slot="{ navigate }"
		>
			<Button
				class="p-button-secondary p-button-text !ml-24px !mt-16px !w-336px !h-48px !hover:bg-[#ECEDED] !rounded-[8px]"
				@click="navigate"
				role="link"
			>
				<i
					class="pi pi-envelope"
					style="font-size: 1.3rem; color: #101820"
				/>
				<span
					class="text-left tracking-3px ml-4 font-bold text-xl text-[#2D2926]"
				>
					{{ $t("推薦信作業") }}
				</span>
			</Button>
		</router-link>

		<router-link
			:to="{
				name: 'AdmissionApplicantAdditionalDocs',
				params: { userId: 7 },
			}"
			custom
			v-slot="{ navigate }"
		>
			<Button
				class="p-button-secondary p-button-text !ml-24px !mt-8px !w-336px !h-48px !hover:bg-[#ECEDED] !rounded-[8px]"
				@click="navigate"
				role="link"
			>
				<i
					class="pi pi-file"
					style="font-size: 1.3rem; color: #101820"
				/>
				<span
					class="text-left tracking-3px ml-4 font-bold text-xl text-[#2D2926]"
				>
					{{ $t("補交文件系統") }}
				</span>
			</Button>
		</router-link>

		<div
			class="bg-gray-200 bg-opacity-50 h-160px w-[100%]"
			style="
				position: absolute;
				bottom: 0px;
				padding-left: 8px;
				padding-right: 8px;
			"
		>
			<div class="mt-28px flex relative">
				<div
					style="
						background-color: #8a7b27;
						border-radius: 50%;
						width: 40px;
						height: 40px;
						margin-left: 24px;
					"
				>
					<i
						class="pi pi-user ml-6.5px mt-8px"
						style="font-size: 1.7rem"
					/>
				</div>
				<div class="mt-[-4px] ml-16px">
					<div
						class="text-[15px] font-[500] font-bold text-[#736028]"
					>
						{{ $t("申請端帳戶") }}
					</div>
					<div
						class="text-[22px] font-[500] font-bold mt-[8px] tracking-wider"
					>
						{{ $t("我很帥") }}
					</div>
				</div>
				<div class="absolute right-[0] mt-[-8px]">
					<router-link
						:to="{
							name: 'AdmissionApplicantUserSetting',
							params: { userId: 7 },
						}"
						custom
						v-slot="{ navigate }"
					>
						<Button
							class="p-button-secondary p-button-text"
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
					<Button
						class="p-button-secondary p-button-text"
						@click="signOut"
					>
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
import "primeicons/primeicons.css";
import "primevue/resources/primevue.min.css";
import { ref } from "vue";
import Dropdown from "primevue/dropdown";
import Button from "primevue/button";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import {
	useAdmissionAdminAuthStore,
	useAdmissionReviewerAuthStore,
} from "@/stores/universalAuth";
import { AdmissionAdminAPI } from "@/api/admission/admin/api";
// import * as reviewerApi from "@/api/admission/reviewer/api";
import { useQuery } from "@tanstack/vue-query";

const router = useRouter();

const reviewerAuth = useAdmissionReviewerAuthStore();
const adminAuth = useAdmissionAdminAuthStore();

const api = new AdmissionAdminAPI(adminAuth);

const {
	isLoading,
	isError,
	data: programs,
	error,
} = useQuery(["programList"], async () => await api.getProgramList());

const { t } = useI18n();

const selectedProgram = ref({
	id: 1,
	category: "111年碩士班",
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
const displayNewProject = ref(false);
const newProjectName = ref("");

const generateOptions = (data: any) => data.category + data.name;

function newProject() {
	displayNewProject.value = true;
}

function closeDisplayNewProject() {
	displayNewProject.value = false;
}

async function signOut() {
	if (adminAuth.isValidSession) {
		if (await api.invalidateSession()) {
			router.push("/");
		}
	}
}
</script>

<style></style>
<!-- #f7f6e4 -->
