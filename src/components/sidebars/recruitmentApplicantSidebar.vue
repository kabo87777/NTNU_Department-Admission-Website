<template>
	<div class="relative" style="height: 100%">
		<div class="flex">
			<div class="sidebarVerticalBigYellowDivider mt-32px"></div>
			<div class="sidebarVerticalSmallYellowDivider mt-32px"></div>
			<div class="mt-32px ml-12px w-[100%]">
				<div class="sidebarTitleBar">
					{{
						$t("sidebarTitleYear", {
							year: currentYear,
							roc: rocYear,
						}) +
						$t(project.project.category) +
						$t("sidebarTitleGroup", {
							group: project.project.name["0"],
						})
					}}
				</div>
			</div>
		</div>

		<div class="flex mt-60px">
			<div class="sidebarYellowDivider"></div>
			<div class="mt-[-8px] ml-8px text-[#736028] text-20px font-bold">
				{{ $t("資料填寫、上傳") }}
			</div>
		</div>

		<router-link
			:to="{
				name: 'recruitmentApplicantBasicInfo',
			}"
			custom
			v-slot="{ navigate }"
		>
			<Button
				class="p-button-secondary p-button-text !ml-24px !mt-16px !w-9/10 !h-48px !hover:bg-[#ECEDED] !rounded-[8px]"
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
				<div class="mb-28px">
					<CompletedTag v-if="tags.basicInfo === 'completed'" />
					<IncompleteTag
						v-else-if="tags.basicInfo === 'incompleted'"
					/>
					<UnableTag v-else-if="tags.basicInfo === 'unable'" />
				</div>
			</Button>
		</router-link>

		<router-link
			:to="{
				name: 'recruitmentApplicantAttachment',
			}"
			custom
			v-slot="{ navigate }"
		>
			<Button
				class="p-button-secondary p-button-text !ml-24px !mt-8px !w-9/10 !h-48px !hover:bg-[#ECEDED] !rounded-[8px]"
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
				<div class="mb-28px">
					<CompletedTag v-if="tags.attachment === 'completed'" />
					<IncompleteTag
						v-else-if="tags.attachment === 'incomplete'"
					/>
					<UnableTag v-else-if="tags.attachment === 'unable'" />
				</div>
			</Button>
		</router-link>

		<router-link
			:to="{
				name: 'recruitmentApplicantSubmitConfirm',
			}"
			custom
			v-slot="{ navigate }"
		>
			<Button
				class="p-button-secondary p-button-text !ml-24px !mt-8px !w-9/10 !h-48px !hover:bg-[#ECEDED] !rounded-[8px]"
				@click="navigate"
				role="link"
			>
				<i
					class="pi pi-check-square"
					style="font-size: 1.3rem; color: #101820"
				/>
				<span
					class="text-left tracking-3px ml-4 font-bold text-xl text-[#2D2926]"
				>
					{{ $t("資料確認送出") }}
				</span>
				<div class="mb-28px">
					<CompletedTag v-if="tags.submitConfirm === 'completed'" />
					<IncompleteTag
						v-else-if="tags.submitConfirm === 'incomplete'"
					/>
					<UnableTag v-else-if="tags.submitConfirm === 'unable'" />
				</div>
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
				name: 'recruitmentApplicantAdditionalDocs',
			}"
			custom
			v-slot="{ navigate }"
		>
			<Button
				class="p-button-secondary p-button-text !ml-24px !mt-8px !w-9/10 !h-48px !hover:bg-[#ECEDED] !rounded-[8px]"
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
				<div class="mb-28px">
					<CompletedTag v-if="tags.additionalDocs === 'completed'" />
					<IncompleteTag
						v-else-if="tags.additionalDocs === 'incomplete'"
					/>
					<UnableTag v-else-if="tags.additionalDocs === 'unable'" />
				</div>
			</Button>
		</router-link>

		<div
			class="bg-gray-200 bg-opacity-50 h-240px w-[100%]"
			style="
				position: absolute;
				bottom: 0px;
				padding-left: 8px;
				padding-right: 8px;
			"
		>
			<div class="mt-24px">
				<router-link
					:to="{
						name: 'recruitmentApplicantSwitchProject',
					}"
					custom
					v-slot="{ navigate }"
				>
					<Button
						class="p-button-secondary p-button-outlined"
						style="
							height: 40px;
							left: 50%;
							transform: translateX(-50%);
						"
						@click="navigate"
						role="link"
					>
						<div><i class="pi pi-sort-alt"></i></div>
						<div class="ml-8px font-bold">{{ $t("切換專案") }}</div>
					</Button>
				</router-link>
			</div>
			<div class="mt-40px flex relative">
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
						{{ $t("用戶名稱") }}
					</div>
					<div
						class="text-[22px] font-[500] font-bold mt-[8px] tracking-wider"
					>
						{{ applicantName }}
					</div>
				</div>
				<div class="absolute right-[0] mt-[-8px]">
					<router-link
						:to="{
							name: 'recruitmentApplicantUserSetting',
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
import { reactive } from "vue";
import { useRecruitmentApplicantAuthStore } from "@/stores/universalAuth";
import { RecruitmentApplicantAPI } from "@/api/recruitment/applicant/api";
import {
	useProjectIdStore,
	useUserInfoStore,
} from "@/stores/RecruitmentApplicantStore";
import { Tags } from "@/api/recruitment/applicant/types";
import "primeicons/primeicons.css";
import "primevue/resources/primevue.min.css";
import Button from "primevue/button";
import UnableTag from "@/styles/tags/unableTag.vue";
import CompletedTag from "@/styles/tags/completedTag.vue";
import IncompleteTag from "@/styles/tags/incompleteTag.vue";
import { useRouter } from "vue-router";
import "primeicons/primeicons.css";

const router = useRouter();
const applicantStore = useUserInfoStore();
const project = useProjectIdStore();
const applicantName = window.localStorage.getItem(
	"RecruitmentApplicantUsername"
);
const currentYear = new Date().getFullYear();
const rocYear = currentYear - 1911;

const tags: Tags = reactive({
	basicInfo: "completed",
	attachment: "incomplete",
	additionalDocs: "unable",
	submitConfirm: "incomplete",
});

const applicantAuth = useRecruitmentApplicantAuthStore();
const api = new RecruitmentApplicantAPI(applicantAuth);

async function signOut() {
	await api.invalidateSession();
	window.localStorage.removeItem("RecruitmentApplicantUsername");
	router.push("/recruitment/applicant/signin");
}
</script>

<style setup lang="css">
.sidebarTitleBar {
	border: 1px solid #736028;
	border-radius: 8px;
	font-weight: bold;
	font-size: 24px;
	letter-spacing: 0.16em;
	height: 60px;
	width: 93%;
	padding-left: 20px;
	padding-top: 10px;
}
</style>
