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
							{{ slotProps.value.category }}
							{{ slotProps.value.name }}
						</div>
					</template>
				</Dropdown>
			</div>
		</div>

		<div class="flex mt-32px">
			<div class="sidebarBlueDivider"></div>
			<div class="mt-[-8px] ml-8px text-[#236192] text-20px font-bold">
				{{ $t("第一階段審查") }}
			</div>
		</div>

		<router-link
			to="/admission/reviewer/applicationReview"
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
					{{ $t("口試資料評閱") }}
				</span>
			</Button>
		</router-link>

		<div
			class="bg-gray-200 bg-opacity-50 h-104px w-[100%] !mt-600px"
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
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import {
	useAdmissionAdminAuthStore,
	useAdmissionReviewerAuthStore,
} from "@/stores/universalAuth";
import { AdmissionAdminAPI } from "@/api/admission/admin/api";
// import * as reviewerApi from "@/api/admission/reviewer/api";
import applicantUploadedDocsVue from "@/views/admission/manager/applicantsUploadList/applicantUploadedDocs.vue";
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
