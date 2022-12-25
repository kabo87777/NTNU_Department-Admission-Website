<template>
	<div class="relative" style="height: 100%">
		<div class="flex">
			<div class="sidebarVerticalBigYellowDivider mt-32px"></div>
			<div class="sidebarVerticalSmallYellowDivider mt-32px"></div>
			<div class="mt-32px ml-12px w-[100%]">
				<div class="sidebarTitleBar">
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

		<div class="flex mt-60px">
			<div class="sidebarYellowDivider"></div>
			<div class="mt-[-8px] ml-8px text-[#736028] text-18px font-bold">
				{{ $t("資料填寫、上傳") }}
			</div>
		</div>

		<router-link
			:to="{
				name: 'recruitmentApplicantUserInfo',
			}"
			custom
			v-slot="{ navigate }"
		>
			<Button
				class="p-button-secondary p-button-text !ml-24px !mt-16px !w-[85%] !h-48px !hover:bg-[#ECEDED] !rounded-[8px]"
				@click="navigate"
				role="link"
			>
				<i class="pi pi-user" style="font-size: 1rem; color: #101820" />
				<span
					class="text-left tracking-3px ml-4 font-bold text-18px text-[#2D2926]"
				>
					{{ $t("基本資料") }}
				</span>
			</Button>
		</router-link>

		<router-link
			:to="{
				name: 'recruitmentApplicantAttachmentFile',
			}"
			custom
			v-slot="{ navigate }"
		>
			<Button
				class="p-button-secondary p-button-text !ml-24px !mt-8px !w-[85%] !h-48px !hover:bg-[#ECEDED] !rounded-[8px]"
				@click="navigate"
				role="link"
			>
				<i class="pi pi-book" style="font-size: 1rem; color: #101820" />
				<span
					class="text-left tracking-3px ml-4 font-bold text-18px text-[#2D2926]"
				>
					{{ $t("附件資料") }}
				</span>
			</Button>
		</router-link>

		<div class="flex mt-32px">
			<div class="sidebarYellowDivider"></div>
			<div class="mt-[-8px] ml-8px text-[#736028] text-18px font-bold">
				{{ $t("相關作業、系統") }}
			</div>
		</div>

		<router-link
			:to="{
				name: 'recruitmentApplicantRefillFile',
			}"
			custom
			v-slot="{ navigate }"
		>
			<Button
				class="p-button-secondary p-button-text !ml-24px !mt-8px !w-[85%] !h-48px !hover:bg-[#ECEDED] !rounded-[8px]"
				@click="navigate"
				role="link"
			>
				<i class="pi pi-file" style="font-size: 1rem; color: #101820" />
				<span
					class="text-left tracking-3px ml-4 font-bold text-18px text-[#2D2926]"
				>
					{{ $t("補交文件系統") }}
				</span>
			</Button>
		</router-link>

		<div
			class="bg-gray-200 bg-opacity-50 h-200px w-[100%]"
			style="
				position: absolute;
				bottom: 0px;
				padding-left: 8px;
				padding-right: 8px;
			"
		>
			<div class="flex mt-16px">
				<Dialog
					v-model:visible="isModalVisible"
					style="width: 500px"
					:closable="false"
					:draggable="false"
					:modal="true"
				>
					<template #header>
						<div class="font-bold text-[24px]">
							{{ $t("注意") }}
						</div>
					</template>
					<template #default>
						<div class="flex">
							<div class="mt-2px">
								<i
									class="pi pi-exclamation-triangle"
									style="font-size: 20px"
								/>
							</div>
							<div class="ml-4px">
								{{ $t("確認送出後無法再更改資料") }}
							</div>
						</div>
					</template>
					<template #footer>
						<Button
							class="p-button-outlined p-button-secondary"
							style="
								border: 2px solid #a18b4a;
								color: #736028;
								height: 36px;
							"
							icon="pi pi-times"
							iconClass="text-[#736028]"
							:label="$t('取消')"
							@click="isModalVisible = false"
						/>
						<Button
							class="p-button-outlined p-button-secondary"
							style="
								color: #53565a;
								border: 2px solid #bcd19b;
								margin-left: 16px;
								height: 36px;
							"
							icon="pi pi-check"
							iconClass="text-[#53565A]"
							:label="$t('確認')"
							:loading="isLoading"
							@click="sendConfirmation"
						/>
					</template>
				</Dialog>
				<div class="flex m-auto">
					<div>
						<router-link
							:to="{
								name: 'recruitmentApplicantSwitchProject',
							}"
							custom
							v-slot="{ navigate }"
						>
							<Button
								class="p-button-secondary p-button-outlined"
								style="height: 40px; border: 2px solid #736028"
								@click="navigate"
								role="link"
							>
								<div>
									<i
										class="pi pi-sort-alt text-[#736028]"
										style="font-size: small"
									/>
								</div>
								<div
									class="ml-8px font-bold text-15px text-[#736028]"
								>
									{{ $t("切換專案") }}
								</div>
							</Button>
						</router-link>
					</div>
					<div class="ml-12px">
						<Button
							v-if="project.project.pid"
							class="p-button-secondary p-button-outlined"
							style="height: 40px; border: 2px solid #736028"
							@click="isModalVisible = true"
						>
							<div>
								<i
									class="pi pi-check-square text-[#736028]"
									style="font-size: small"
								/>
							</div>
							<div
								class="ml-8px font-bold text-15px text-[#736028]"
							>
								{{ $t("資料確認送出") }}
							</div>
						</Button>
					</div>
				</div>
			</div>
			<div class="mt-24px flex relative">
				<div
					style="
						background-color: #8a7b27;
						border-radius: 50%;
						width: 40px;
						height: 40px;
						margin-top: -4px;
						margin-left: 16px;
					"
				>
					<i
						class="pi pi-user ml-6.5px mt-8px"
						style="font-size: 1.7rem"
					/>
				</div>
				<div class="mt-[-4px] ml-12px">
					<div
						class="text-[14px] font-[500] font-bold text-[#736028]"
					>
						{{ $t("用戶名稱") }}
					</div>
					<div
						class="text-[16px] font-[500] font-bold mt-[8px] tracking-wider"
					>
						{{ applicantStore.userInfo.name }}
					</div>
				</div>
				<div class="absolute right-[0] mt-[-8px]">
					<router-link
						:to="{
							name: 'recruitmentApplicantUserManagement',
						}"
						custom
						v-slot="{ navigate }"
					>
						<Button
							class="p-button-secondary p-button-text p-button-sm"
							v-tooltip.top="t('使用者管理')"
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
						class="p-button-secondary p-button-text p-button-sm"
						v-tooltip.top="t('登出')"
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
import { reactive, ref, toRaw } from "vue";
import { useRouter } from "vue-router";
import { useRecruitmentApplicantAuthStore } from "@/stores/universalAuth";
import { RecruitmentApplicantAPI } from "@/api/recruitment/applicant/api";
import { useProjectIdStore } from "@/stores/RecruitmentApplicantStore";
import { useUserInfoStore } from "@/stores/RecruitmentApplicantStore";
import { useI18n } from "vue-i18n";
import { useToast } from "primevue/usetoast";
import "primeicons/primeicons.css";
import "primevue/resources/primevue.min.css";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import "primeicons/primeicons.css";
import "@/styles/customize.css";

const { t } = useI18n();
const toast = useToast();
const router = useRouter();
const applicantStore = useUserInfoStore();

const project = useProjectIdStore();
const currentYear = new Date().getFullYear();
const rocYear = currentYear - 1911;

const applicantAuth = useRecruitmentApplicantAuthStore();
const api = new RecruitmentApplicantAPI(applicantAuth);

const isModalVisible = ref(false);
const isLoading = ref(false);

let fetchResponse = reactive({
	success: false,
	message: "" as string | [],
});

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
