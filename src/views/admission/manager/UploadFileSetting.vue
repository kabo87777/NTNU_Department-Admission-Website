<template>
	<!-- Header -->
	<div class="fixed bg-white top-15 left-1/4 right-0 z-50 <lg:left-60">
		<div class="w-9/10 pt-6 m-auto">
			<div class="font-medium text-4xl text-title">
				{{ trans.uploadField.value }}
			</div>
			<div class="bigRedDivider"></div>
			<div class="p-fluid">
				<SelectButton
					class="mt-8px"
					v-model="activeTab"
					:options="tabOptions"
					optionLabel="name"
					aria-labelledby="single"
					:unselectable="false"
				>
				</SelectButton>
			</div>
		</div>
	</div>
	<!-- Body -->
	<div class="py-36" text="body xl">
		<!-- 基本資料欄位 -->
		<div v-if="activeTab.value === 1" class="space-y-8">
			<!-- 姓名資訊 -->
			<div class="space-y-4">
				<div class="flex content-center">
					<Checkbox
						inputId="nameInfo"
						class="pt-1"
						v-model="showedInfo[0].checked"
						:binary="true"
					/>
					<label for="nameInfo" class="ml-2">
						{{ trans.nameInfo.value }}
					</label>
				</div>
				<div class="flex font-light gap-4 ml-6" text="secondary sm">
					<div class="pr-10">
						{{ trans.details.prefixSuffix.value }}
					</div>
					<div class="pr-10">
						{{ trans.details.chineseName.value }}
					</div>
					<div class="pr-10">
						{{ trans.details.englishName.value }}
					</div>
				</div>
			</div>
			<ParagraphDivider />
			<!-- 入學身份 -->
			<div class="space-y-4">
				<div class="flex content-center">
					<Checkbox
						inputId="enrollment"
						class="pt-1"
						v-model="showedInfo[1].checked"
						:binary="true"
					/>
					<label for="enrollment" class="ml-2">
						{{ trans.admissionIdentity.value }}
					</label>
				</div>
				<div class="flex font-light gap-4 ml-6" text="secondary sm">
					<div class="pr-10">
						{{ trans.details.locals.value }}
					</div>
					<div class="pr-10">
						{{ trans.details.foreigner.value }}
					</div>
				</div>
			</div>
			<ParagraphDivider />
			<!-- 戶籍資訊 -->
			<div class="space-y-4">
				<div class="flex content-center">
					<Checkbox
						inputId="permanentAd"
						class="pt-1"
						v-model="showedInfo[2].checked"
						:binary="true"
					/>
					<label for="permanentAd" class="ml-2">
						{{ trans.registAddressInfo.value }}
					</label>
				</div>
				<div class="flex font-light gap-4 ml-6" text="secondary sm">
					<div class="pr-10">
						{{ trans.details.countryState.value }}
					</div>
					<div class="pr-10">
						{{ trans.details.cityPostNumber.value }}
					</div>
				</div>
				<ParagraphDivider />
			</div>
			<!-- 通訊地址 -->
			<div class="space-y-4">
				<div class="flex content-center">
					<Checkbox
						inputId="mailingAd"
						class="pt-1"
						v-model="showedInfo[3].checked"
						:binary="true"
					/>
					<label for="mailingAd" class="ml-2">
						{{ trans.residentAddress.value }}
					</label>
				</div>
				<div class="flex font-light gap-4 ml-6" text="secondary sm">
					<div class="pr-10">
						{{ trans.details.countryState.value }}
					</div>
					<div class="pr-10">
						{{ trans.details.cityPostNumber.value }}
					</div>
				</div>
				<ParagraphDivider />
			</div>
			<!-- 身份資料 -->
			<div class="space-y-4">
				<div class="flex content-center">
					<Checkbox
						inputId="basicIdentityInfo"
						class="pt-1"
						v-model="showedInfo[4].checked"
						:binary="true"
					/>
					<label for="basicIdentityInfo" class="ml-2">{{
						trans.identityInfo.value
					}}</label>
				</div>
				<div class="flex font-light gap-4 ml-6" text="secondary sm">
					<div class="pr-10">
						{{ trans.details.legalGender.value }}
					</div>
					<div class="pr-10">
						{{ trans.details.bornCountry.value }}
					</div>
					<div class="pr-10">
						{{ trans.details.citizenship.value }}
					</div>
					<div class="pr-10">
						{{ trans.details.bornDate.value }}
					</div>
				</div>
				<ParagraphDivider />
			</div>
			<!-- 聯絡資料 -->
			<div class="space-y-4">
				<div class="flex content-center">
					<Checkbox
						inputId="contactInfo"
						class="pt-1"
						v-model="showedInfo[5].checked"
						:binary="true"
					/>
					<label for="contactInfo" class="ml-2">{{
						trans.contactInfo.value
					}}</label>
				</div>
				<div class="flex font-light gap-4 ml-6" text="secondary sm">
					<div class="pr-10">
						{{ trans.details.mobileNumber.value }}
					</div>
				</div>
			</div>
		</div>
		<!-- 檢附資料欄位 -->
		<div v-else class="space-y-8">
			<!-- 就學經歷 -->
			<div class="space-y-4">
				<div class="flex content-center">
					<Checkbox
						inputId="schoolExp"
						class="pt-1"
						v-model="showedFile[0].checked"
						:binary="true"
					/>
					<label for="schoolExp" class="ml-2">{{
						trans.schoolExp.value
					}}</label>
				</div>
				<div class="flex font-light gap-4 ml-6" text="secondary sm">
					<div class="pr-10">
						{{ trans.details.fileName.value }}
					</div>
					<div class="pr-10">
						{{ trans.details.fileUpload.value }}
					</div>
				</div>
			</div>
			<ParagraphDivider />
			<!-- 考試與檢定分數 -->
			<div class="space-y-4">
				<div class="flex content-center">
					<Checkbox
						inputId="score"
						class="pt-1"
						v-model="showedFile[1].checked"
						:binary="true"
					/>
					<label for="score" class="ml-2">{{
						trans.examScore.value
					}}</label>
				</div>
				<div class="flex font-light gap-4 ml-6" text="secondary sm">
					<div class="pr-10">
						{{ trans.details.fileName.value }}
					</div>
					<div class="pr-10">
						{{ trans.details.fileUpload.value }}
					</div>
				</div>
			</div>
			<ParagraphDivider />
			<!-- 其他有利於審查資料 -->
			<div class="space-y-4">
				<div class="flex content-center">
					<Checkbox
						inputId="other"
						class="pt-1"
						v-model="showedFile[2].checked"
						:binary="true"
					/>
					<label for="other" class="ml-2">{{
						trans.advantageFile.value
					}}</label>
				</div>
				<div class="flex font-light gap-4 ml-6" text="secondary sm">
					<div class="pr-10">
						{{ trans.details.fileName.value }}
					</div>
					<div class="pr-10">
						{{ trans.details.fileUpload.value }}
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- Footer -->
	<div class="fixed bg-white bottom-0 left-1/4 right-0 z-50 <lg:left-60">
		<div class="w-9/10 pt-2 m-auto space-y-2 pb-6">
			<div class="bigRedDivider"></div>
			<div class="flex justify-center gap-6 pt-2">
				<!-- 取消變更 -->
				<Button class="bg-White border-Red" @click="refreshData">
					<i
						class="pi pi-times ml-1 mr-2 box-border"
						text="sm ntnuRed"
					></i>
					<div class="m-auto tracking-2" text="sm nRed-500">
						<div>{{ $t("取消變更") }}</div>
					</div>
				</Button>
				<!-- 儲存設定 -->
				<Button class="bg-Green border-ntnuRed" @click="saveChange">
					<i class="pi pi-check ml-1 mr-2 box-border" text="sm"></i>
					<div class="m-auto tracking-2" text="sm">
						<div>{{ $t("儲存設定") }}</div>
					</div>
				</Button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import ParagraphDivider from "@/styles/paragraphDivider.vue";
import "primeicons/primeicons.css";
import SelectButton from "primevue/selectbutton";
import Checkbox from "primevue/checkbox";
import Button from "primevue/button";
import { useToast } from "primevue/usetoast";
import { reactive, ref, computed, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useAdmissionAdminAuthStore } from "@/stores/universalAuth";
import { AdmissionAdminAPI } from "@/api/admission/admin/api";
import { useGlobalStore } from "@/stores/globalStore";
import { InvalidSessionError } from "@/api/error";
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
	residentAddress: computed(() => t("通訊地址")),
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
		legalGender: computed(() => t("※ 性別")),
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
	{ id: "戶籍資訊", checked: false },
	{ id: "通訊地址", checked: false },
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
