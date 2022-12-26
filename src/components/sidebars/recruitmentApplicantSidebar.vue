<template>
	<div p="t-8" w="full" h="full" pos="relative">
		<!-- 當前專案 -->
		<div flex="~" h="15">
			<div w="2" mr="1" bg="nGold" />
			<div w="1" bg="nGold" />
			<div flex="~ grow" m="x-4" border="1 rounded-lg nGold">
				<div text="body lg" m="x-2 y-auto">
					<div v-if="project.project.pid">
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
					<div v-else>{{ $t("暫無專案") }}</div>
				</div>
			</div>
		</div>

		<!-- 頁面按鈕 -->
		<div
			h="[calc(100%-14rem)]"
			overflow="y-auto"
			scrollbar="thin thumb-nGold-100 thumb-rounded-full"
		>
			<div flex="~ col gap-6" mt="6">
				<!-- Divider -->
				<div flex="~ gap-4" class="items-center" :class="letterSpace">
					<div w="1/10" h="!1px" bg="nGold" />
					<div my="auto" text="lg pApplicant">
						{{ $t("資料填寫、上傳") }}
					</div>
				</div>
				<!-- 1.基本資料 -->
				<router-link
					:to="{
						name: 'recruitmentApplicantUserInfo',
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
						:isSelected="gateway === 'recruitmentApplicantUserInfo'"
						>{{ $t("基本資料") }}
					</NButton>
				</router-link>
				<!-- 2.附件資料 -->
				<router-link
					:to="{
						name: 'recruitmentApplicantAttachmentFile',
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
						:isSelected="
							gateway === 'recruitmentApplicantAttachmentFile'
						"
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
				<!-- 3.補交文件系統 -->
				<router-link
					:to="{
						name: 'recruitmentApplicantRefillFile',
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
							gateway === 'recruitmentApplicantRefillFile'
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
					<!-- A.切換專案 -->
					<router-link
						:to="{
							name: 'recruitmentApplicantSwitchProject',
						}"
						custom
						v-slot="{ navigate }"
					>
						<NButton
							@click="navigate"
							:icon="isOverflow('pi pi-arrow-right-arrow-left')"
							class="p-2 h-11 bg-white whitespace-nowrap"
							:class="letterSpace"
							>{{ $t("切換專案") }}
						</NButton>
					</router-link>
					<!-- B.資料確認送出 -->
					<NButton
						Applicant
						@click="isModalVisible = true"
						:icon="isOverflow('pi pi-cloud-upload')"
						class="p-2 h-11 bg-white whitespace-nowrap"
						:class="letterSpace"
						>{{ $t("資料確認送出") }}
					</NButton>
				</div>
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
							{{ applicantStore.userInfo.name }}
						</div>
					</div>
					<!-- Button -->
					<div flex="~ gap-1" ml="auto">
						<!-- 使用者設定 -->
						<router-link
							:to="{
								name: 'recruitmentApplicantUserManagement',
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
									gateway ===
									'recruitmentApplicantUserManagement'
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
		style="width: 500px"
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
import { computed, reactive, ref, toRaw } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useRecruitmentApplicantAuthStore } from "@/stores/universalAuth";
import { RecruitmentApplicantAPI } from "@/api/recruitment/applicant/api";
import { useProjectIdStore } from "@/stores/RecruitmentApplicantStore";
import { useUserInfoStore } from "@/stores/RecruitmentApplicantStore";
import { useI18n } from "vue-i18n";
import { useToast } from "primevue/usetoast";
import "primeicons/primeicons.css";
import "primevue/resources/primevue.min.css";
import NButton from "@/styles/CustomButton.vue";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import "primeicons/primeicons.css";
import "@/styles/customize.css";

const { t, locale } = useI18n();
const toast = useToast();
const route = useRoute();
const router = useRouter();
const gateway = computed(() => route.name);
const applicantStore = useUserInfoStore();

const project = useProjectIdStore();
const currentYear = new Date().getFullYear();
const rocYear = currentYear - 1911;

const applicantAuth = useRecruitmentApplicantAuthStore();
const api = new RecruitmentApplicantAPI(applicantAuth);

const isModalVisible = ref(false);
const isLoading = ref(false);

const letterSpace = computed(() => {
	if (locale.value == "zh") return "tracking-[.125em]";
	if (locale.value == "en") return "tracking-tighter";
	else return "";
});

let fetchResponse = reactive({
	success: false,
	message: "" as string | [],
});

const isOverflow = (classStyle: string) => {
	if (locale.value == "zh") return classStyle;
	else return "";
};

const sendConfirmation = async () => {
	isLoading.value = true;

	const res = await api.sendConfirmation(project.project.pid);

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
		router.push("/recruitment/applicant/switchProject");
	} else {
		toast.add({
			severity: "error",
			summary: "Error",
			detail: fetchResponse.message,
			life: 5000,
		});
	}
};

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
	font-size: 20px;
	letter-spacing: 0.1em;
	height: 60px;
	width: 93%;
	padding-left: 10px;
	padding-top: 14px;
}
</style>
