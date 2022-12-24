<template>
	<div class="pt-62px pl-128px pr-128px">
		<div class="font-medium text-32px">{{ trans.uploadFileCol.value }}</div>
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
		<div v-if="activeTab.value === 1">
			<div class="mt-16px">
				<div>
					<Checkbox
						inputId="nameInfo"
						v-model="showedInfo[0].checked"
						:binary="true"
					/>
					<label
						for="nameInfo"
						class="ml-8px text-24px font-medium"
						>{{ trans.nameInfo.value }}</label
					>
				</div>
				<div class="flex mt-40px">
					<div class="w-1/3 pl-16px">
						{{ trans.details.chineseName.value }}
					</div>
					<div class="w-1/3 pl-16px">
						{{ trans.details.englishName.value }}
					</div>
				</div>
				<ParagraphDivider />
			</div>
			<div class="mt-16px">
				<div>
					<Checkbox
						inputId="permanentAd"
						v-model="showedInfo[1].checked"
						:binary="true"
					/>
					<label
						for="permanentAd"
						class="ml-8px text-24px font-medium"
						>{{ trans.recruitmentIdentity.value }}</label
					>
				</div>
				<div class="flex mt-40px">
					<div class="w-1/2 pl-16px">
						{{ trans.details.locals.value }}
					</div>
					<div class="w-1/2 pl-16px">
						{{ trans.details.foreigner.value }}
					</div>
				</div>
				<ParagraphDivider />
			</div>
			<div class="mt-16px">
				<div>
					<Checkbox
						inputId="mailingAd"
						v-model="showedInfo[2].checked"
						:binary="true"
					/>
					<label
						for="mailingAd"
						class="ml-8px text-24px font-medium"
						>{{ trans.registAddressInfo.value }}</label
					>
				</div>
				<div class="flex mt-40px">
					<div class="w-1/3 pl-16px">
						{{ trans.details.countryState.value }}
					</div>
					<div class="w-1/3 pl-16px">
						{{ trans.details.cityPostNumber.value }}
					</div>
					<div class="w-1/3 pl-16px">
						{{ trans.details.streetAddress.value }}
					</div>
				</div>
				<ParagraphDivider />
			</div>
			<div class="mt-16px">
				<div>
					<Checkbox
						inputId="basicIdentityInfo"
						v-model="showedInfo[3].checked"
						:binary="true"
					/>
					<label
						for="basicIdentityInfo"
						class="ml-8px text-24px font-medium"
						>{{ trans.residentAddress.value }}</label
					>
				</div>
				<div class="flex mt-40px">
					<div class="w-1/3 pl-16px">
						{{ trans.details.countryState.value }}
					</div>
					<div class="w-1/3 pl-16px">
						{{ trans.details.cityPostNumber.value }}
					</div>
					<div class="w-1/3 pl-16px">
						{{ trans.details.streetAddress.value }}
					</div>
				</div>
				<ParagraphDivider />
			</div>
			<div class="mt-16px">
				<div>
					<Checkbox
						inputId="basicIdentityInfo"
						v-model="showedInfo[4].checked"
						:binary="true"
					/>
					<label
						for="basicIdentityInfo"
						class="ml-8px text-24px font-medium"
						>{{ trans.identityInfo.value }}</label
					>
				</div>
				<div class="flex mt-40px">
					<div class="w-1/4 pl-16px">
						{{ trans.details.legalGender }}
					</div>
					<div class="w-1/4 pl-16px">
						{{ trans.details.bornCountry }}
					</div>
					<div class="w-1/4 pl-16px">
						{{ trans.details.citizenship }}
					</div>
					<div class="w-1/4 pl-16px">
						{{ trans.details.bornDate }}
					</div>
				</div>
				<ParagraphDivider />
			</div>
			<div class="mt-16px">
				<div>
					<Checkbox
						inputId="contactInfo"
						v-model="showedInfo[5].checked"
						:binary="true"
					/>
					<label
						for="contactInfo"
						class="ml-8px text-24px font-medium"
						>{{ trans.contactInfo.value }}</label
					>
				</div>
				<div class="flex mt-40px">
					<div class="w-1/4 pl-16px">
						{{ trans.details.mobileNumber.value }}
					</div>
				</div>
			</div>
		</div>
		<div v-else-if="activeTab.value === 2">
			<div class="mt-16px">
				<div>
					<Checkbox
						inputId="teachingExp"
						v-model="showedFile[0].checked"
						:binary="true"
					/>
					<label
						for="schoolExp"
						class="ml-8px text-24px font-medium"
						>{{ trans.teachExp.value }}</label
					>
				</div>
				<div class="flex mt-40px">
					<div class="pl-16px">
						{{ trans.details.fileName.value }}
					</div>
					<div class="pl-16px">
						{{ trans.details.fileUpload.value }}
					</div>
				</div>
				<ParagraphDivider />
			</div>
			<div class="mt-16px">
				<div>
					<Checkbox
						inputId="score"
						v-model="showedFile[1].checked"
						:binary="true"
					/>
					<label for="score" class="ml-8px text-24px font-medium">{{
						trans.examScore.value
					}}</label>
				</div>
				<div class="flex mt-40px">
					<div class="pl-16px">
						{{ trans.details.fileName.value }}
					</div>
					<div class="pl-16px">
						{{ trans.details.fileUpload.value }}
					</div>
				</div>
				<ParagraphDivider />
			</div>
			<div class="mt-16px">
				<div>
					<Checkbox
						inputId="other"
						v-model="showedFile[2].checked"
						:binary="true"
					/>
					<label for="other" class="ml-8px text-24px font-medium">{{
						trans.advantageFile.value
					}}</label>
				</div>
				<div class="flex mt-40px">
					<div class="pl-16px">
						{{ trans.details.fileName.value }}
					</div>
					<div class="pl-16px">
						{{ trans.details.fileUpload.value }}
					</div>
				</div>
				<ParagraphDivider />
			</div>
		</div>
		<div class="mt-100px">
			<div class="bigRedDivider"></div>
		</div>
		<div class="flex mt-24px">
			<div class="m-auto">
				<div class="flex">
					<Button
						class="bg-white h-60px w-140px border-ntnuRed"
						@click="refreshData"
					>
						<i
							class="ml-1 mr-2 box-border pi pi-times"
							text="sm ntnuRed"
						></i>
						<div class="m-auto tracking-2" text="sm ntnuRed">
							<div>{{ $t("取消變更") }}</div>
						</div>
					</Button>
					<div class="w-24px"></div>
					<Button
						class="bg-Green h-60px w-140px border-ntnuRed"
						@click="saveChange"
					>
						<i
							class="ml-1 mr-2 box-border pi pi-check"
							text="sm black"
						></i>
						<div class="m-auto tracking-2" text="sm black">
							<div>{{ $t("儲存設定") }}</div>
						</div>
					</Button>
				</div>
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
import { useRecruitmentAdminAuthStore } from "@/stores/universalAuth";
import { RecruitmentAdminAPI } from "@/api/recruitment/admin/api";
import { useGlobalStore } from "@/stores/globalStore";
import { InvalidSessionError } from "@/api/error";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { RecruitmentAdminProgramListResponse } from "@/api/recruitment/admin/types";

const toast = useToast();

// i18n
const { t } = useI18n();
const trans = {
	uploadFileCol: computed(() => t("上傳欄位設置")),
	basicCol: computed(() => t("基本資料欄位")),
	attachmentCol: computed(() => t("檢附資料欄位")),
	nameInfo: computed(() => t("姓名資訊")),
	recruitmentIdentity: computed(() => t("入學身分")),
	registAddressInfo: computed(() => t("戶籍資訊")),
	residentAddress: computed(() => t("現居地址")),
	identityInfo: computed(() => t("身份資料")),
	contactInfo: computed(() => t("聯絡資料")),
	teachExp: computed(() => t("教學經歷")),
	examScore: computed(() => t("考試與檢定分數")),
	advantageFile: computed(() => t("其他有利於審查資料")),
	changeSuccess: computed(() => t("儲存成功")),
	details: {
		chineseName: computed(() => t("※ 中文姓氏/名字")),
		englishName: computed(() => t("※ 英文姓氏/中間名/名字")),
		locals: computed(() => t("※ 本國人士")),
		foreigner: computed(() => t("※ 外籍人士")),
		countryState: computed(() => t("※ 國家/州")),
		cityPostNumber: computed(() => t("※ 城市/郵遞區號")),
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
const adminAuth = useRecruitmentAdminAuthStore();
const api = new RecruitmentAdminAPI(adminAuth);
const store = useGlobalStore();
// Tanstack Query
const queryClient = useQueryClient();

// Field Data
let showedInfo = reactive([
	{ id: "姓名資訊", checked: false },
	{ id: "入職身分", checked: false },
	{ id: "戶籍資訊", checked: false },
	{ id: "現居地址", checked: false },
	{ id: "身份資料", checked: false },
	{ id: "聯絡資料", checked: false },
]);
let showedFile = reactive([
	{ id: "教學經歷", checked: false },
	{ id: "考試與檢定分數", checked: false },
	{ id: "其他有利於審查資料", checked: false },
]);
const fieldList = {
	infoChecked: [""],
	fileChecked: [""],
};
let programData: RecruitmentAdminProgramListResponse = reactive({
	id: 0,
	category: "",
	name: "",
	recruit_start_date: "",
	recruit_end_date: "",
	review_start_date: "",
	review_end_date: "",
	require_file: "",
	stage: "",
	created_at: "",
	updated_at: "",
	applicant_required_info: "",
	applicant_required_file: "",
	reviewer_required_info: "",
	reviewer_required_file: "",
	detail: "",
});

// API: Get Info/File Data
const getInfoFileField = useQuery(
	["recruitmentInfoFileField"],
	async () => {
		if (!store.program)
			throw new Error("recruitmentInfoFileField: no program selected");

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
				programData.recruit_start_date = data.recruit_start_date;
				programData.recruit_end_date = data.recruit_end_date;
				programData.review_start_date = data.review_start_date;
				programData.review_end_date = data.review_end_date;
				programData.require_file = data.require_file;
				programData.stage = data.stage;
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
	async (newData: RecruitmentAdminProgramListResponse) => {
		if (!store.program)
			throw new Error("patchInfoFileField: no program selected");

		return await api.updateProgramData(store.program.id, newData);
	},
	{
		onSuccess: () => {
			queryClient.invalidateQueries(["recruitmentInfoFileField"]);
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
	queryClient.invalidateQueries(["recruitmentInfoFileField"]);
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
