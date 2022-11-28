<template>
	<div class="pt-62px pl-128px pr-128px">
		<div class="font-medium text-32px">{{ $t("申請上傳欄位") }}</div>
		<div class="bigRedDivider"></div>
		<div class="p-fluid">
			<SelectButton
				class="mt-8px"
				v-model="activeTab"
				:options="tabOptions"
				optionLabel="name"
				aria-labelledby="single"
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
						>{{ $t("姓名資訊") }}</label
					>
				</div>
				<div class="flex mt-40px">
					<div class="w-1/3 pl-16px">{{ $t("※ 稱謂/後綴") }}</div>
					<div class="w-1/3 pl-16px">{{ $t("※ 中文姓氏/名字") }}</div>
					<div class="w-1/3 pl-16px">
						{{ $t("※ 英文姓氏/中間名/名字") }}
					</div>
				</div>
				<ParagraphDivider />
			</div>
			<div class="mt-16px">
				<div>
					<Checkbox
						inputId="enrollment"
						v-model="showedInfo[1].checked"
						:binary="true"
					/>
					<label
						for="enrollment"
						class="ml-8px text-24px font-medium"
						>{{ $t("入學身分") }}</label
					>
				</div>
				<div class="flex mt-40px">
					<div class="w-1/2 pl-16px">{{ $t("※ 碩士生") }}</div>
					<div class="w-1/2 pl-16px">{{ $t("※ 博士生") }}</div>
				</div>
				<ParagraphDivider />
			</div>
			<div class="mt-16px">
				<div>
					<Checkbox
						inputId="permanentAd"
						v-model="showedInfo[2].checked"
						:binary="true"
					/>
					<label
						for="permanentAd"
						class="ml-8px text-24px font-medium"
						>{{ $t("戶籍資訊") }}</label
					>
				</div>
				<div class="flex mt-40px">
					<div class="w-1/3 pl-16px">{{ $t("※ 國家/州") }}</div>
					<div class="w-1/3 pl-16px">{{ $t("※ 城市/郵遞區號") }}</div>
					<div class="w-1/3 pl-16px">{{ $t("※ 街道地址") }}</div>
				</div>
				<ParagraphDivider />
			</div>
			<div class="mt-16px">
				<div>
					<Checkbox
						inputId="mailingAd"
						v-model="showedInfo[3].checked"
						:binary="true"
					/>
					<label
						for="mailingAd"
						class="ml-8px text-24px font-medium"
						>{{ $t("現居地址") }}</label
					>
				</div>
				<div class="flex mt-40px">
					<div class="w-1/3 pl-16px">{{ $t("※ 國家/州") }}</div>
					<div class="w-1/3 pl-16px">{{ $t("※ 城市/郵遞區號") }}</div>
					<div class="w-1/3 pl-16px">{{ $t("※ 街道地址") }}</div>
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
						>{{ $t("身份資料") }}</label
					>
				</div>
				<div class="flex mt-40px">
					<div class="w-1/4 pl-16px">
						{{ $t("※ 法定性別/ 性別認同") }}
					</div>
					<div class="w-1/4 pl-16px">{{ $t("※ 出生國") }}</div>
					<div class="w-1/4 pl-16px">{{ $t("※ 主要國籍") }}</div>
					<div class="w-1/4 pl-16px">{{ $t("※ 出生日期") }}</div>
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
						>{{ $t("聯絡資料") }}</label
					>
				</div>
				<div class="flex mt-40px">
					<div class="w-1/4 pl-16px">{{ $t("※ 電子郵件") }}</div>
					<div class="w-1/4 pl-16px">{{ $t("※ 電話(主要)") }}</div>
					<div class="w-1/4 pl-16px">{{ $t("※ 電話(次要)") }}</div>
					<div class="w-1/4 pl-16px">
						{{ $t("※ 電話(行動電話)") }}
					</div>
				</div>
				<ParagraphDivider />
			</div>
		</div>
		<div v-else-if="activeTab.value === 2">
			<div class="mt-16px">
				<div>
					<Checkbox
						inputId="schoolExp"
						v-model="showedFile[0].checked"
						:binary="true"
					/>
					<label
						for="schoolExp"
						class="ml-8px text-24px font-medium"
						>{{ $t("就學經歷") }}</label
					>
				</div>
				<div class="flex mt-40px">
					<div class="w-1/3 pl-16px">{{ $t("※ 稱謂/後綴") }}</div>
					<div class="w-1/3 pl-16px">{{ $t("※ 中文姓氏/名字") }}</div>
					<div class="w-1/3 pl-16px">
						{{ $t("※ 英文姓氏/中間名/名字") }}
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
						$t("考試與檢定分數")
					}}</label>
				</div>
				<div class="flex mt-40px">
					<div class="w-1/3 pl-16px">{{ $t("※ 國家/州") }}</div>
					<div class="w-1/3 pl-16px">{{ $t("※ 城市/郵遞區號") }}</div>
					<div class="w-1/3 pl-16px">{{ $t("※ 街道地址") }}</div>
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
						$t("其他有利於審查資料")
					}}</label>
				</div>
				<div class="flex mt-40px">
					<div class="w-1/3 pl-16px">{{ $t("※ 國家/州") }}</div>
					<div class="w-1/3 pl-16px">{{ $t("※ 城市/郵遞區號") }}</div>
					<div class="w-1/3 pl-16px">{{ $t("※ 街道地址") }}</div>
				</div>
				<ParagraphDivider />
			</div>
			<div class="mt-16px">
				<div>
					<Checkbox
						inputId="identity"
						v-model="showedFile[3].checked"
						:binary="true"
					/>
					<label
						for="identity"
						class="ml-8px text-24px font-medium"
						>{{ $t("身份資料") }}</label
					>
				</div>
				<div class="flex mt-40px">
					<div class="w-1/3 pl-16px">
						{{ $t("※ 法定性別/ 性別認同") }}
					</div>
					<div class="w-1/3 pl-16px">{{ $t("※ 城市/郵遞區號") }}</div>
					<div class="w-1/3 pl-16px">{{ $t("※ 街道地址") }}</div>
				</div>
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
							class="pi pi-times ml-1 mr-2 box-border"
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
							class="pi pi-check ml-1 mr-2 box-border"
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
import { useAdmissionAdminAuthStore } from "@/stores/universalAuth";
import { AdmissionAdminAPI } from "@/api/admission/admin/api";
import { useGlobalStore } from "@/stores/globalStore";
import { InvalidSessionError } from "@/api/error";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { AdmissionAdminProgramListResponse } from "@/api/admission/admin/types";

const toast = useToast();

// i18n Translation
const { t } = useI18n();
const translation = {
	basicCol: computed(() => t("基本資料欄位")),
	attachmentCol: computed(() => t("檢附資料欄位")),
	changeSuccess: computed(() => t("儲存成功")),
};

// SelectButton: Change Tab
const activeTab = ref({ name: translation.basicCol, value: 1 });
const tabOptions = ref([
	{ name: translation.basicCol, value: 1 },
	{ name: translation.attachmentCol, value: 2 },
]);

// API Authorization
const adminAuth = useAdmissionAdminAuthStore();
const api = new AdmissionAdminAPI(adminAuth);
const store = useGlobalStore();
// Tanstack Query
const queryClient = useQueryClient();

// Field Data
const showedInfo = reactive([
	{ id: "file1", checked: true },
	{ id: "file2", checked: true },
	{ id: "file3", checked: true },
	{ id: "file4", checked: true },
	{ id: "file5", checked: true },
	{ id: "file6", checked: true },
]);
const showedFile = reactive([
	{ id: "file1", checked: true },
	{ id: "file2", checked: true },
	{ id: "file3", checked: true },
	{ id: "file4", checked: true },
]);
const programData: AdmissionAdminProgramListResponse = reactive({
	id: 0,
	category: "",
	name: "",
	application_start_date: "",
	application_end_date: "",
	review_start_date: "",
	review_end_date: "",
	stage: "",
	created_at: "",
	updated_at: "",
	applicant_required_info: "",
	applicant_required_file: "",
	reviewer_required_info: "",
	reviewer_required_file: "",
	detail: "",
});
const fieldList = {
	infoChecked: [""],
	fileChecked: [""],
};

// API: Get Info/File Data
const getInfoFileField = useQuery(
	["infoFileField"],
	async () => {
		try {
			if (store.program) {
				const allData = await api.getProgramList();
				return allData[store.program.id - 1];
			}
		} catch (e: any) {
			if (e instanceof InvalidSessionError) {
				console.error("Invalid Session Error");
			}
		}
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
				programData.reviewer_required_info
			);
			fieldList.fileChecked = JSON.parse(
				programData.reviewer_required_file
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
		try {
			if (store.program) {
				return await api.updateProgramData(store.program.id, newData);
			}
		} catch (e: any) {
			if (e instanceof InvalidSessionError) {
				console.error("Invalid Session Error");
			}
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
		programData.reviewer_required_info = JSON.stringify(
			fieldList.infoChecked
		);
		programData.reviewer_required_file = JSON.stringify(
			fieldList.fileChecked
		);
		// Patch Info/File Data
		patchInfoFileField.mutate(programData);
		toast.add({
			severity: "success",
			summary: translation.changeSuccess.value,
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
