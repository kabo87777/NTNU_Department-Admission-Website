<template>
	<div class="relative" style="height: 100%">
		<div class="flex">
			<div class="sidebarVerticalBigYellowDivider mt-32px"></div>
			<div class="sidebarVerticalSmallYellowDivider mt-32px"></div>
			<div class="mt-32px ml-12px w-[100%]">
				<div class="sidebarTitleBar">
					{{
						$t("admissionApplicantSidebarTitle", {
							year: currentYear,
							roc: rocYear,
							category: applicantProgram.category,
							name: applicantProgram.name,
						})
					}}
				</div>
			</div>
		</div>

		<router-link
			:to="{
				name: 'AdmissionApplicantLatestNews',
			}"
			custom
			v-slot="{ navigate }"
		>
			<Button
				class="p-button-secondary p-button-text !ml-24px !mt-24px !w-336px !h-48px !hover:bg-[#ECEDED] !rounded-[8px]"
				style="{ active: border: 1px solid #736028 !important }"
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

		<div v-if="isProgramAvailable">
			<div class="flex mt-32px">
				<div class="sidebarYellowDivider"></div>
				<div
					class="mt-[-8px] ml-8px text-[#736028] text-20px font-bold"
				>
					{{ $t("資料填寫、上傳") }}
				</div>
			</div>

			<router-link
				:to="{
					name: 'AdmissionApplicantBasicInfo',
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
					name: 'AdmissionApplicantAttachment',
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
					<div class="mb-28px">
						<CompletedTag v-if="tags.attachment === 'completed'" />
						<IncompleteTag
							v-else-if="tags.attachment === 'incomplete'"
						/>
						<UnableTag v-else-if="tags.attachment === 'unable'" />
					</div>
				</Button>
			</router-link>

			<div class="flex mt-32px">
				<div class="sidebarYellowDivider"></div>
				<div
					class="mt-[-8px] ml-8px text-[#736028] text-20px font-bold"
				>
					{{ $t("相關作業、系統") }}
				</div>
			</div>

			<router-link
				:to="{
					name: 'AdmissionApplicantRecommendationLetter',
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
					<div class="mb-28px">
						<CompletedTag
							v-if="tags.recommendLetter === 'completed'"
						/>
						<IncompleteTag
							v-else-if="tags.recommendLetter === 'incomplete'"
						/>
						<UnableTag
							v-else-if="tags.recommendLetter === 'unable'"
						/>
					</div>
				</Button>
			</router-link>

			<router-link
				:to="{
					name: 'AdmissionApplicantAdditionalDocs',
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
					<div class="mb-28px">
						<CompletedTag
							v-if="tags.additionalDocs === 'completed'"
						/>
						<IncompleteTag
							v-else-if="tags.additionalDocs === 'incomplete'"
						/>
						<UnableTag
							v-else-if="tags.additionalDocs === 'unable'"
						/>
					</div>
				</Button>
			</router-link>
		</div>
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
							name: 'AdmissionApplicantUserSetting',
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
import { addHours } from "date-fns";
import { reactive, toRaw, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useAdmissionApplicantAuthStore } from "@/stores/universalAuth";
import { AdmissionApplicantAPI } from "@/api/admission/applicant/api";
import { useUserInfoStore } from "@/stores/AdmissionApplicantStore";
import { Tags } from "@/api/admission/applicant/types";
import "primeicons/primeicons.css";
import "primevue/resources/primevue.min.css";
import Button from "primevue/button";
import UnableTag from "@/styles/tags/unableTag.vue";
import CompletedTag from "@/styles/tags/completedTag.vue";
import IncompleteTag from "@/styles/tags/incompleteTag.vue";

const router = useRouter();
const applicantAuth = useAdmissionApplicantAuthStore();
const applicantStore = useUserInfoStore();
const applicantName = toRaw(applicantStore.userInfo.name);

const api = new AdmissionApplicantAPI(applicantAuth);

const currentYear = new Date().getFullYear();
const rocYear = currentYear - 1911;
const isProgramAvailable = ref(false);

const applicantProgram = reactive({
	id: 1,
	category: "111年碩士班",
	name: "A組",
	start_date: "",
	end_date: "",
});

const tags: Tags = reactive({
	basicInfo: "completed",
	attachment: "incomplete",
	recommendLetter: "unable",
	additionalDocs: "unable",
});

const checkProgramAvailably = () => {
	const start = {
		year: parseInt(applicantProgram.start_date.slice(0, 4)),
		month: parseInt(applicantProgram.start_date.slice(5, 7)),
		day: parseInt(applicantProgram.start_date.slice(8, 10)),
		hour: parseInt(applicantProgram.start_date.slice(11, 13)),
	};
	const end = {
		year: parseInt(applicantProgram.end_date.slice(0, 4)),
		month: parseInt(applicantProgram.end_date.slice(5, 7)),
		day: parseInt(applicantProgram.end_date.slice(8, 10)),
		hour: parseInt(applicantProgram.end_date.slice(11, 13)),
	};

	const currentTime = new Date().toLocaleString("zh-TW"); //GET TAIWAN DATE
	const current = {
		year: parseInt(currentTime.slice(0, 4)),
		month: parseInt(currentTime.slice(5, 7)),
		day: parseInt(currentTime.slice(8, 10)),
	};

	if (
		current.year < start.year ||
		current.year > end.year ||
		(current.year === start.year && current.month < start.month) ||
		(current.year === end.year && current.month > end.month) ||
		(current.year === start.year &&
			current.month === start.month &&
			current.day < start.day) ||
		(current.year === end.year &&
			current.month === end.month &&
			current.day > end.day)
	) {
		isProgramAvailable.value = false;
	} else isProgramAvailable.value = true;
	console.log(isProgramAvailable.value);
};

onMounted(async () => {
	await api.getProgram().then((res) => {
		applicantProgram.id = res.id;
		applicantProgram.category = res.category;
		applicantProgram.name = res.name;
		applicantProgram.start_date = res.application_start_date;
		applicantProgram.end_date = res.application_end_date;
		console.log(res, applicantProgram);
		checkProgramAvailably();
	});
});

async function signOut() {
	await api.invalidateSession();
	router.push("/admission/applicant/signin");
}
</script>
