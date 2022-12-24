<template>
	<div p="t-8" w="full" h="full" pos="relative">
		<!-- 當前專案 -->
		<div flex="~" h="15">
			<div w="2" mr="1" bg="nGold" />
			<div w="1" bg="nGold" />
			<div flex="~ grow" m="x-4" border="1 rounded-lg nGold">
				<div text="body lg" m="x-2 y-auto">
					{{
						$t("admissionApplicantSidebarTitle", {
							year: currentYear,
							roc: rocYear,
							category: applicantProgram?.category,
							name: applicantProgram?.name,
						})
					}}
				</div>
			</div>
		</div>
		<!-- 頁面按鈕 -->
		<div
			h="[calc(100%-14rem)]"
			overflow="y-auto"
			scrollbar="thin thumb-nRed-100 thumb-rounded-full"
		>
			<div flex="~ col gap-6" mt="6">
				<!-- 1.最新資訊 -->
				<router-link
					:to="{
						name: 'AdmissionApplicantLatestNews',
					}"
					custom
					v-slot="{ navigate }"
				>
					<NButton
						Applicant
						white
						icon="pi pi-bell"
						size="lg"
						class="py-3 px-6 mx-6 gap-4 !justify-start"
						:class="letterSpace"
						@click="navigate"
						:isSelected="gateway === 'AdmissionApplicantLatestNews'"
						>{{ $t("最新資訊") }}
					</NButton>
				</router-link>
				<!-- <div v-if="isProgramAvailable"> -->
				<!-- Divider -->
				<div flex="~ gap-4" class="items-center" :class="letterSpace">
					<div w="1/10" h="!1px" bg="nGold" />
					<div my="auto" text="lg pApplicant">
						{{ $t("資料填寫、上傳") }}
					</div>
				</div>
				<!-- 2.基本資料 -->
				<router-link
					:to="{
						name: 'AdmissionApplicantBasicInfo',
					}"
					custom
					v-slot="{ navigate }"
				>
					<NButton
						Applicant
						white
						icon="pi pi-file-word"
						size="lg"
						class="py-3 px-6 mx-6 gap-4 !justify-start"
						:class="letterSpace"
						@click="navigate"
						:isSelected="gateway === 'AdmissionApplicantBasicInfo'"
						>{{ $t("基本資料") }}
					</NButton>
				</router-link>
				<!-- 3.附件資料 -->
				<router-link
					:to="{
						name: 'AdmissionApplicantAttachment',
					}"
					custom
					v-slot="{ navigate }"
				>
					<NButton
						Applicant
						white
						icon="pi pi-file-pdf"
						size="lg"
						class="py-3 px-6 mx-6 gap-4 !justify-start"
						:class="letterSpace"
						@click="navigate"
						:isSelected="gateway === 'AdmissionApplicantAttachment'"
						>{{ $t("附件資料") }}
					</NButton>
				</router-link>
				<!-- Divider -->
				<div flex="~ gap-4" class="items-center" :class="letterSpace">
					<div w="1/10" h="!1px" bg="nGold" />
					<div my="auto" text="lg pApplicant">
						{{ $t("相關作業、系統") }}
					</div>
				</div>
				<!-- 4.推薦信作業 -->
				<router-link
					:to="{
						name: 'AdmissionApplicantRecommendationLetter',
					}"
					custom
					v-slot="{ navigate }"
				>
					<NButton
						Applicant
						white
						icon="pi pi-envelope"
						size="lg"
						class="py-3 px-6 mx-6 gap-4 !justify-start"
						:class="letterSpace"
						@click="navigate"
						:isSelected="
							gateway === 'AdmissionApplicantRecommendationLetter'
						"
						>{{ $t("推薦信作業") }}
					</NButton>
				</router-link>
				<!-- 5.補交文件系統 -->
				<router-link
					:to="{
						name: 'AdmissionApplicantAdditionalDocs',
					}"
					custom
					v-slot="{ navigate }"
				>
					<NButton
						Applicant
						white
						icon="pi pi-file-export"
						size="lg"
						class="py-3 px-6 mx-6 gap-4 !justify-start"
						:class="letterSpace"
						@click="navigate"
						:isSelected="
							gateway === 'AdmissionApplicantAdditionalDocs'
						"
						>{{ $t("補交文件系統") }}
					</NButton>
				</router-link>
			</div>
		</div>
		<!-- 頁面底部操作項目 -->
		<div pos="absolute bottom-0" bg="nGrey-50" w="full">
			<div flex="~ col gap-6" m="t-4 b-6">
				<!-- 管理按鈕 -->
				<div flex="~ gap-4" justify="center">
					<NButton
						Applicant
						@click="isModalVisible = true"
						icon="pi pi-user-edit"
						class="p-2 h-11 bg-white whitespace-nowrap"
						:class="letterSpace"
						>{{ $t("資料確認送出") }}
					</NButton>
				</div>
				<!-- 使用者操作 -->
				<div flex="~ gap-4" mx="6" class="items-center">
					<!-- Icon -->
					<div w="10" h="10" bg="nGold-600" border="rounded-full">
						<i class="pi pi-user" text="!2xl white" mx="2" my="1" />
					</div>
					<!-- Heading -->
					<div>
						<div text="sm pApplicant">{{ $t("申請端帳戶") }}</div>
						<div
							text="title"
							class="whitespace-nowrap"
							:class="letterSpace"
						>
							{{ applicantName }}
						</div>
					</div>
					<!-- Button -->
					<div flex="~ gap-1" ml="auto">
						<!-- 使用者設定 -->
						<router-link
							:to="{
								name: 'AdmissionApplicantUserSetting',
							}"
							custom
							v-slot="{ navigate }"
						>
							<NButton
								Applicant
								white
								icon="pi pi-cog"
								@click="navigate"
								size="lg"
								class="w-12 h-12 m-auto"
								:isSelected="
									gateway === 'AdmissionApplicantUserSetting'
								"
							/>
						</router-link>
						<!-- 登出 -->
						<NButton
							Applicant
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
	<Dialog
		v-model:visible="isModalVisible"
		class="!max-w-120"
		:closable="false"
		:draggable="false"
		:modal="true"
	>
		<template #header>
			<div text="xl title" font="medium">
				{{ $t("資料確認送出") }}
			</div>
		</template>
		<template #default>
			<div class="flex items-center mx-4 gap-6">
				<i
					class="pi pi-exclamation-triangle"
					text="warning"
					style="font-size: 4rem"
				/>
				<div>
					{{
						$t(
							"請注意，資料一經送出後即「無法」再次更改資料。送出前請務必確認資料無誤！"
						)
					}}
				</div>
			</div>
		</template>
		<template #footer>
			<div flex="~ gap-6" justify="center">
				<NButton
					Success
					icon="pi pi-check"
					class="h-11 min-w-32"
					:loading="isLoading"
					@click="sendConfirmation"
				>
					{{ $t("送出") }}
				</NButton>
				<NButton
					icon="pi pi-times"
					class="h-11 min-w-32"
					@click="isModalVisible = false"
				>
					{{ $t("取消") }}
				</NButton>
			</div>
		</template>
	</Dialog>
</template>

<script setup lang="ts">
import { computed, toRaw, ref, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useQuery } from "@tanstack/vue-query";
import { useI18n } from "vue-i18n";
import dayjs from "dayjs";

import { useAdmissionApplicantAuthStore } from "@/stores/universalAuth";
import { AdmissionApplicantAPI } from "@/api/admission/applicant/api";

import "primeicons/primeicons.css";
import "primevue/resources/primevue.min.css";
import NButton from "@/styles/CustomButton.vue";
import Dialog from "primevue/dialog";
import { useToast } from "primevue/usetoast";

import "@/styles/customize.css";

const router = useRouter();
const route = useRoute();
const gateway = computed(() => route.name);
const applicantAuth = useAdmissionApplicantAuthStore();
const applicantName = window.localStorage.getItem("AdmissionApplicantUsername");

const { t } = useI18n();
const { locale } = useI18n();
const toast = useToast();
const isModalVisible = ref(false);
const isLoading = ref(false);

const api = new AdmissionApplicantAPI(applicantAuth);

const now = dayjs();
const currentYear = now.get("year");
const rocYear = currentYear - 1911;

let fetchResponse = reactive({
	success: false,
	message: "" as string | [],
});

const letterSpace = computed(() => {
	if (locale.value == "zh") return "tracking-[.125em]";
	if (locale.value == "en") return "tracking-tighter";
	else return "";
});

const sendConfirmation = async () => {
	isLoading.value = true;

	const res = await api.sendConfirmation();

	if (res?.success !== undefined && res?.message !== undefined) {
		fetchResponse.success = toRaw(res.success);
		fetchResponse.message = toRaw(res.message);
	}

	isLoading.value = false;
	isModalVisible.value = false;

	if (fetchResponse.success) {
		toast.add({
			severity: "success",
			summary: "Success",
			detail: fetchResponse.message,
			life: 3000,
		});
		router.push({ name: "AdmissionApplicantLatestNews" });
	} else {
		toast.add({
			severity: "error",
			summary: "Error",
			detail: fetchResponse.message,
			life: 5000,
		});
	}
};

const isProgramAvailable = computed(() => {
	if (!applicantProgram.value) return false;

	const start = dayjs(applicantProgram.value.application_start_date);
	const end = dayjs(applicantProgram.value.application_end_date);

	return now.isAfter(start) && now.isBefore(end);
});

const { data: applicantProgram } = useQuery(
	["admissionApplicantProgram"],
	async () => {
		const program = await api.getProgram();

		Object.assign(applicantProgram, program);

		return program;
	}
);

async function signOut() {
	await api.invalidateSession();
	window.localStorage.removeItem("AdmissionApplicantUsername");
	router.push("/admission/applicant/signin");
}
</script>

<style setup lang="css">
.sidebarTitleBar {
	border: 1px solid #736028;
	border-radius: 8px;
	font-weight: bold;
	font-size: 20px;
	letter-spacing: 0.1em;
	height: 60px;
	width: 93%;
	padding-left: 10px;
	padding-top: 14px;
}
</style>
