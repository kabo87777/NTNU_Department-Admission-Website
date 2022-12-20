<template>
	<Layout Admin>
		<template #Header> {{ trans.uploadField.value }} </template>
		<template #Body>
			<div w="full">
				<SelectButton
					v-model="activeTab"
					:options="tabOptions"
					optionLabel="name"
					aria-labelledby="single"
					:unselectable="false"
				/>
			</div>
			<!-- 基本資料欄位 -->
			<!-- 姓名資訊 -->
			<div v-if="activeTab.value === 1">
				<div flex="~ gap-2" justify="items-center">
					<Checkbox
						inputId="nameInfo"
						class="pt-1"
						v-model="showedInfo[0].checked"
						:binary="true"
					/>
					<label for="nameInfo" text="lg body" pb="!1">
						{{ trans.nameInfo.value }}
					</label>
				</div>
				<div class="flex mx-10 gap-8" text="secondary">
					<div>
						{{ trans.details.prefixSuffix.value }}
					</div>
					<div>
						{{ trans.details.chineseName.value }}
					</div>
					<div>
						{{ trans.details.englishName.value }}
					</div>
				</div>
			</div>
			<PDivider Admin v-if="activeTab.value === 1" />
			<!-- 入學身份 -->
			<div v-if="activeTab.value === 1">
				<div flex="~ gap-2" justify="items-center">
					<Checkbox
						inputId="enrollment"
						class="pt-1"
						v-model="showedInfo[1].checked"
						:binary="true"
					/>
					<label for="enrollment" text="lg body" pb="!1">
						{{ trans.admissionIdentity.value }}
					</label>
				</div>
				<div class="flex mx-10 gap-8" text="secondary">
					<div>
						{{ trans.details.locals.value }}
					</div>
					<div>
						{{ trans.details.foreigner.value }}
					</div>
				</div>
			</div>
			<PDivider Admin v-if="activeTab.value === 1" />
			<!-- 現居地址 -->
			<div v-if="activeTab.value === 1">
				<div flex="~ gap-2" justify="items-center">
					<Checkbox
						inputId="mailingAd"
						class="pt-1"
						v-model="showedInfo[2].checked"
						:binary="true"
					/>
					<label for="mailingAd" text="lg body" pb="!1">
						{{ trans.residentAddress.value }}
					</label>
				</div>
				<div class="flex mx-10 gap-8" text="secondary">
					<div>
						{{ trans.details.countryState.value }}
					</div>
					<div>
						{{ trans.details.cityPostNumber.value }}
					</div>
				</div>
			</div>
			<PDivider Admin v-if="activeTab.value === 1" />
			<!-- 身份資料 -->
			<div v-if="activeTab.value === 1">
				<div flex="~ gap-2" justify="items-center">
					<Checkbox
						inputId="basicIdentityInfo"
						class="pt-1"
						v-model="showedInfo[3].checked"
						:binary="true"
					/>
					<label for="basicIdentityInfo" text="lg body" pb="!1">{{
						trans.identityInfo.value
					}}</label>
				</div>
				<div class="flex mx-10 gap-8" text="secondary">
					<div>
						{{ trans.details.legalGender.value }}
					</div>
					<div>
						{{ trans.details.bornCountry.value }}
					</div>
					<div>
						{{ trans.details.citizenship.value }}
					</div>
					<div>
						{{ trans.details.bornDate.value }}
					</div>
				</div>
			</div>
			<PDivider Admin v-if="activeTab.value === 1" />
			<!-- 聯絡資料 -->
			<div v-if="activeTab.value === 1">
				<div flex="~ gap-2" justify="items-center">
					<Checkbox
						inputId="contactInfo"
						class="pt-1"
						v-model="showedInfo[4].checked"
						:binary="true"
					/>
					<label for="contactInfo" text="lg body" pb="!1">{{
						trans.contactInfo.value
					}}</label>
				</div>
				<div class="flex mx-10 gap-8" text="secondary">
					<div>
						{{ trans.details.mobileNumber.value }}
					</div>
				</div>
			</div>

			<!-- 檢附資料欄位 -->
			<!-- 就學經歷 -->
			<div v-if="activeTab.value === 2">
				<div flex="~ gap-2" justify="items-center">
					<Checkbox
						inputId="schoolExp"
						class="pt-1"
						v-model="showedFile[0].checked"
						:binary="true"
					/>
					<label for="schoolExp" text="lg body" pb="!1">{{
						trans.schoolExp.value
					}}</label>
				</div>
				<div class="flex mx-10 gap-8" text="secondary">
					<div>
						{{ trans.details.fileName.value }}
					</div>
					<div>
						{{ trans.details.fileUpload.value }}
					</div>
				</div>
			</div>
			<PDivider Admin v-if="activeTab.value === 2" />
			<!-- 考試與檢定分數 -->
			<div v-if="activeTab.value === 2">
				<div flex="~ gap-2" justify="items-center">
					<Checkbox
						inputId="score"
						class="pt-1"
						v-model="showedFile[1].checked"
						:binary="true"
					/>
					<label for="score" text="lg body" pb="!1">{{
						trans.examScore.value
					}}</label>
				</div>
				<div class="flex mx-10 gap-8" text="secondary">
					<div>
						{{ trans.details.fileName.value }}
					</div>
					<div>
						{{ trans.details.fileUpload.value }}
					</div>
				</div>
			</div>
			<PDivider Admin v-if="activeTab.value === 2" />
			<!-- 其他有利於審查資料 -->
			<div v-if="activeTab.value === 2">
				<div flex="~ gap-2" justify="items-center">
					<Checkbox
						inputId="other"
						class="pt-1"
						v-model="showedFile[2].checked"
						:binary="true"
					/>
					<label for="other" text="lg body" pb="!1">{{
						trans.advantageFile.value
					}}</label>
				</div>
				<div class="flex mx-10 gap-8" text="secondary">
					<div>
						{{ trans.details.fileName.value }}
					</div>
					<div>
						{{ trans.details.fileUpload.value }}
					</div>
				</div>
			</div>
		</template>
		<template #Footer>
			<div flex="~" justify="center" gap="4">
				<NButton
					Admin
					class="p-2 w-32"
					icon="pi pi-check"
					@click="saveChange"
				>
					{{ $t("儲存設定") }}
				</NButton>
				<NButton
					class="p-2 w-32"
					icon="pi pi-times"
					@click="refreshData"
				>
					{{ $t("取消變更") }}
				</NButton>
			</div>
		</template>
	</Layout>
</template>

<script setup lang="ts">
import Layout from "@/components/Layout.vue";
import NButton from "@/styles/CustomButton.vue";
import SelectButton from "primevue/selectbutton";
import Checkbox from "primevue/checkbox";
import PDivider from "@/styles/PrDivider.vue";
import "primeicons/primeicons.css";
import { useToast } from "primevue/usetoast";
import { reactive, ref, computed, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useAdmissionAdminAuthStore } from "@/stores/universalAuth";
import { AdmissionAdminAPI } from "@/api/admission/admin/api";
import { useGlobalStore } from "@/stores/globalStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { AdmissionAdminProgramListResponse } from "@/api/admission/admin/types";

const toast = useToast();

// i18n
const { t } = useI18n();
const trans = {
	uploadField: computed(() => t("申請上傳欄位")),
	basicCol: computed(() => t("基本資料欄位")),
	attachmentCol: computed(() => t("檢附資料欄位")),
	nameInfo: computed(() => t("姓名資訊")),
	admissionIdentity: computed(() => t("入學身分")),
	registAddressInfo: computed(() => t("戶籍資訊")),
	residentAddress: computed(() => t("現居地址")),
	identityInfo: computed(() => t("身份資料")),
	contactInfo: computed(() => t("聯絡資料")),
	schoolExp: computed(() => t("就學經歷")),
	examScore: computed(() => t("考試與檢定分數")),
	advantageFile: computed(() => t("其他有利於審查資料")),
	changeSuccess: computed(() => t("儲存成功")),
	details: {
		prefixSuffix: computed(() => t("※ 稱謂/後綴")),
		chineseName: computed(() => t("※ 中文姓氏/名字")),
		englishName: computed(() => t("※ 英文姓氏/中間名/名字")),
		locals: computed(() => t("※ 本國人士")),
		foreigner: computed(() => t("※ 外籍人士")),
		countryState: computed(() => t("※ 國家/州")),
		cityPostNumber: computed(() => t("※ 郵遞區號")),
		streetAddress: computed(() => t("※ 街道地址")),
		legalGender: computed(() => t("※ 生理性別")),
		bornCountry: computed(() => t("※ 出生國家")),
		bornDate: computed(() => t("※ 出生日期")),
		citizenship: computed(() => t("※ 主要國籍")),
		email: computed(() => t("※ 電子郵件")),
		mainNumber: computed(() => t("※ 電話(主要)")),
		secondaryNumber: computed(() => t("※ 電話(次要)")),
		mobileNumber: computed(() => t("※ 電話(行動電話)")),
		fileName: computed(() => t("※ 資料名稱")),
		fileUpload: computed(() => t("※ 資料上傳")),
	},
};

// SelectButton: Change Tab
const activeTab = ref({ name: trans.basicCol, value: 1 });
const tabOptions = ref([
	{ name: trans.basicCol, value: 1 },
	{ name: trans.attachmentCol, value: 2 },
]);

// API Authorization
const adminAuth = useAdmissionAdminAuthStore();
const api = new AdmissionAdminAPI(adminAuth);
const store = useGlobalStore();
// Tanstack Query
const queryClient = useQueryClient();

// Field Data
let showedInfo = reactive([
	{ id: "姓名資訊", checked: false },
	{ id: "入學身分", checked: false },
	{ id: "現居地址", checked: false },
	{ id: "身份資料", checked: false },
	{ id: "聯絡資料", checked: false },
]);
let showedFile = reactive([
	{ id: "就學經歷", checked: false },
	{ id: "考試與檢定分數", checked: false },
	{ id: "其他有利於審查資料", checked: false },
]);
let programData: AdmissionAdminProgramListResponse = reactive({
	id: 0,
	category: "",
	name: "",
	application_start_date: "",
	application_end_date: "",
	review_start_date: "",
	review_end_date: "",
	created_at: "",
	updated_at: "",
	applicant_required_info: "",
	applicant_required_file: "",
	reviewer_required_info: "",
	reviewer_required_file: "",
	detail: "",
	oral_start_date: "",
	docs_end_date: "",
});
const fieldList = {
	infoChecked: [""],
	fileChecked: [""],
};

// API: Get Info/File Data
const getInfoFileField = useQuery(
	["infoFileField"],
	async () => {
		if (!store.program)
			throw new Error("infoFileField: no program selected");

		const allData = await api.getProgramList();
		return allData[store.program.id - 1];
	},
	{
		refetchOnWindowFocus: false,
		onSuccess: (data) => {
			if (data) {
				programData.id = data.id;
				programData.category = data.category;
				programData.name = data.name;
				programData.application_start_date =
					data.application_start_date;
				programData.application_end_date = data.application_end_date;
				programData.review_start_date = data.review_start_date;
				programData.review_end_date = data.review_end_date;
				programData.created_at = data.created_at;
				programData.updated_at = data.updated_at;
				programData.detail = data.detail;
				programData.applicant_required_info =
					data.applicant_required_info;
				programData.applicant_required_file =
					data.applicant_required_file;
				programData.reviewer_required_info =
					data.reviewer_required_info;
				programData.reviewer_required_file =
					data.reviewer_required_file;
				programData.oral_start_date = data.oral_start_date;
				programData.docs_end_date = data.docs_end_date;
			}
			fieldList.infoChecked = JSON.parse(
				programData.applicant_required_info
			);
			fieldList.fileChecked = JSON.parse(
				programData.applicant_required_file
			);
			showedInfo.forEach((element) => {
				if (fieldList.infoChecked.includes(element.id))
					element.checked = true;
				else element.checked = false;
			});
			showedFile.forEach((element) => {
				if (fieldList.fileChecked.includes(element.id))
					element.checked = true;
				else element.checked = false;
			});
			console.log("Get Info/File Successfully");
		},
	}
);

// API: Patch Info/File Data
const patchInfoFileField = useMutation(
	async (newData: AdmissionAdminProgramListResponse) => {
		if (store.program) {
			return await api.updateProgramData(store.program.id, newData);
		}
	},
	{
		onSuccess: () => {
			queryClient.invalidateQueries(["infoFileField"]);
		},
	}
);

function saveChange() {
	try {
		// Adjust Info/File Data
		fieldList.infoChecked.splice(0, fieldList.infoChecked.length);
		fieldList.fileChecked.splice(0, fieldList.fileChecked.length);
		showedInfo.forEach((element) => {
			if (!fieldList.infoChecked.includes(element.id))
				if (element.checked) fieldList.infoChecked.push(element.id);
		});
		showedFile.forEach((element) => {
			if (!fieldList.fileChecked.includes(element.id))
				if (element.checked) fieldList.fileChecked.push(element.id);
		});
		programData.applicant_required_info = JSON.stringify(
			fieldList.infoChecked
		);
		programData.applicant_required_file = JSON.stringify(
			fieldList.fileChecked
		);
		// Patch Info/File Data
		patchInfoFileField.mutate(programData);
		toast.add({
			severity: "success",
			summary: trans.changeSuccess.value,
			life: 3000,
		});
	} catch (e: any) {
		console.log(e);
		toast.add({
			severity: "error",
			summary: "Fail to Save Change",
			life: 3000,
		});
	}
}

function refreshData() {
	queryClient.invalidateQueries(["infoFileField"]);
}

watch(activeTab, () => {
	refreshData();
});
</script>

<style setup lang="css">
.bg-Green {
	background-color: #bcd19b;
}
.bg-darkBlue {
	background-color: #07385a;
}
.bg-white {
	background-color: #ffffff;
}
</style>
