<template>
	<div class="mx-32 mt-16">
		<!-- Header - Title -->
		<div class="tracking-widest" text="4xl bold">
			{{ trans.reviewScoreField.value }}
		</div>
		<div class="bigRedDivider"></div>

		<!-- Body - Score Field: Phase 1 -->
		<div class="my-6" text="2xl gray-900">
			{{ trans.scoreOptionSetting.value }}
			{{ trans.colon.value }}
			{{ trans.phase[1].value }}
		</div>
		<div class="my-4 space-y-3" text="lg gray-700">
			<div>{{ trans.phaseWeight[1].value }}</div>
			<InputNumber class="!w-300px" v-model="docsScore[0].weight" />
		</div>
		<div class="my-4 space-y-3" text="lg gray-700">
			<div>{{ trans.scoreOption.value }}</div>
			<!-- Phase 1 - item 1 -->
			<div class="flex content-center gap-6">
				<InputText class="!w-300px" v-model="docsScore[1].name" />
				<InputNumber class="!w-200px" v-model="docsScore[1].weight" />
			</div>
			<!-- Phase 1 - item 2 -->
			<div class="flex content-center gap-6">
				<InputText class="!w-300px" v-model="docsScore[2].name" />
				<InputNumber class="!w-200px" v-model="docsScore[2].weight" />
			</div>
			<!-- Phase 1 - item 3 -->
			<div class="flex content-center gap-6">
				<InputText class="!w-300px" v-model="docsScore[3].name" />
				<InputNumber class="!w-200px" v-model="docsScore[3].weight" />
			</div>
			<!-- Phase 1 - item 4 -->
			<div class="flex content-center gap-6">
				<InputText class="!w-300px" v-model="docsScore[4].name" />
				<InputNumber class="!w-200px" v-model="docsScore[4].weight" />
			</div>
			<!-- Phase 1 - item 5 -->
			<div class="flex content-center gap-6">
				<InputText class="!w-300px" v-model="docsScore[5].name" />
				<InputNumber class="!w-200px" v-model="docsScore[5].weight" />
			</div>
		</div>
		<ParagraphDivider />

		<!-- Body - Score Field: Phase 2 -->
		<div class="my-6" text="2xl gray-900">
			{{ trans.scoreOptionSetting.value }}
			{{ trans.colon.value }}
			{{ trans.phase[2].value }}
		</div>
		<div class="space-y-4" text="lg gray-700">
			<div>{{ trans.phaseWeight[2].value }}</div>
			<InputNumber class="!w-300px" v-model="oralScore[0].weight" />
		</div>
		<div class="my-4 space-y-3" text="lg gray-700">
			<div>{{ trans.scoreOption.value }}</div>
			<!-- Phase 2 - item 1 -->
			<div class="flex content-center gap-6">
				<InputText class="!w-300px" v-model="oralScore[1].name" />
				<InputNumber class="!w-200px" v-model="oralScore[1].weight" />
			</div>
			<!-- Phase 2 - item 2 -->
			<div class="flex content-center gap-6">
				<InputText class="!w-300px" v-model="oralScore[2].name" />
				<InputNumber class="!w-200px" v-model="oralScore[2].weight" />
			</div>
			<!-- Phase 2 - item 3 -->
			<div class="flex content-center gap-6">
				<InputText class="!w-300px" v-model="oralScore[3].name" />
				<InputNumber class="!w-200px" v-model="oralScore[3].weight" />
			</div>
			<!-- Phase 2 - item 4 -->
			<div class="flex content-center gap-6">
				<InputText class="!w-300px" v-model="oralScore[4].name" />
				<InputNumber class="!w-200px" v-model="oralScore[4].weight" />
			</div>
			<!-- Phase 2 - item 5 -->
			<div class="flex content-center gap-6">
				<InputText class="!w-300px" v-model="oralScore[5].name" />
				<InputNumber class="!w-200px" v-model="oralScore[5].weight" />
			</div>
		</div>
		<ParagraphDivider />

		<!-- Body - Show Information Data -->
		<div class="my-6" text="2xl gray-900">{{ trans.showInfo.value }}</div>
		<!-- showInfo - checkbox 1 -->
		<div v-if="showedInfo[0].visible">
			<div class="flex mt-6 mb-2 gap-4 items-center">
				<Checkbox
					v-model="showedInfo[0].checked"
					:input-id="showedInfo[0].id"
					:binary="true"
				/>
				<label for="showedInfo[0].id" text="xl gray-700">
					{{ trans.nameInfo.value }}
				</label>
			</div>
			<div class="flex mx-10 gap-8 mb-4" text="gray-500">
				<div>{{ trans.details.suffix.value }}</div>
				<div>{{ trans.details.chineseName.value }}</div>
				<div>{{ trans.details.englishName.value }}</div>
			</div>
		</div>
		<!-- showInfo - checkbox 2 -->
		<div v-if="showedInfo[1].visible">
			<div class="flex mt-6 mb-2 gap-4 items-center">
				<Checkbox
					v-model="showedInfo[1].checked"
					:input-id="showedInfo[1].id"
					:binary="true"
				/>
				<label :for="showedInfo[1].id" text="xl gray-700">
					{{ trans.admissionId.value }}
				</label>
			</div>
			<div class="flex mx-10 gap-8 mb-4" text="gray-500">
				<div>{{ trans.details.master.value }}</div>
				<div>{{ trans.details.phD.value }}</div>
			</div>
		</div>
		<!-- showInfo - checkbox 3 -->
		<div v-if="showedInfo[2].visible">
			<div class="flex mt-6 mb-2 gap-4 items-center">
				<Checkbox
					v-model="showedInfo[2].checked"
					:input-id="showedInfo[2].id"
					:binary="true"
				/>
				<label :for="showedInfo[2].id" text="xl gray-700">
					{{ trans.residentAddr.value }}
				</label>
			</div>
			<div class="flex mx-10 gap-8 mb-4" text="gray-500">
				<div>{{ trans.details.country.value }}</div>
				<div>{{ trans.details.city.value }}</div>
				<div>{{ trans.details.streetAddr.value }}</div>
			</div>
		</div>
		<!-- showInfo - checkbox 4 -->
		<div v-if="showedInfo[3].visible">
			<div class="flex mt-6 mb-2 gap-4 items-center">
				<Checkbox
					v-model="showedInfo[3].checked"
					:input-id="showedInfo[3].id"
					:binary="true"
				/>
				<label :for="showedInfo[3].id" text="xl gray-700">
					{{ trans.currentAddr.value }}
				</label>
			</div>
			<div class="flex mx-10 gap-8 mb-4" text="gray-500">
				<div>{{ trans.details.country.value }}</div>
				<div>{{ trans.details.city.value }}</div>
				<div>{{ trans.details.streetAddr.value }}</div>
			</div>
		</div>
		<!-- showInfo - checkbox 5 -->
		<div v-if="showedInfo[4].visible">
			<div class="flex mt-6 mb-2 gap-4 items-center">
				<Checkbox
					v-model="showedInfo[4].checked"
					:input-id="showedInfo[4].id"
					:binary="true"
				/>
				<label :for="showedInfo[4].id" text="xl gray-700">
					{{ trans.nationalId.value }}
				</label>
			</div>
			<div class="flex mx-10 gap-8 mb-4" text="gray-500">
				<div>{{ trans.details.gender.value }}</div>
				<div>{{ trans.details.bornCountry.value }}</div>
				<div>{{ trans.details.mainNation.value }}</div>
				<div>{{ trans.details.bornDate.value }}</div>
				<div>{{ trans.details.mainNation.value }}</div>
			</div>
		</div>
		<!-- showInfo - checkbox 6 -->
		<div v-if="showedInfo[5].visible">
			<div class="flex mt-6 mb-2 gap-4 items-center">
				<Checkbox
					v-model="showedInfo[5].checked"
					:input-id="showedInfo[5].id"
					:binary="true"
				/>
				<label :for="showedInfo[5].id" text="xl gray-700">
					{{ trans.contactInfo.value }}
				</label>
			</div>
			<div class="flex mx-10 gap-8 mb-4" text="gray-500">
				<div>{{ trans.details.email.value }}</div>
				<div>{{ trans.details.primePhone.value }}</div>
				<div>{{ trans.details.secondPhone.value }}</div>
				<div>{{ trans.details.mobilePhone.value }}</div>
			</div>
		</div>
		<ParagraphDivider />

		<!-- Body - Show Uploaded File Data -->
		<div class="my-6" text="2xl gray-900">{{ trans.showFile.value }}</div>
		<!-- showFile - checkbox 1 -->
		<div v-if="showedFile[0].visible">
			<div class="flex mt-6 mb-2 gap-4 items-center">
				<Checkbox
					v-model="showedFile[0].checked"
					:input-id="showedFile[0].id"
					:binary="true"
				/>
				<label :for="showedFile[0].id" text="xl gray-700">
					{{ trans.schoolExp.value }}
				</label>
			</div>
			<div class="flex mx-10 gap-8 mb-4" text="gray-500">
				<div>{{ trans.details.fileName.value }}</div>
				<div>{{ trans.details.fileUpload.value }}</div>
			</div>
		</div>
		<!-- showFile - checkbox 2 -->
		<div v-if="showedFile[1].visible">
			<div class="flex mt-6 mb-2 gap-4 items-center">
				<Checkbox
					v-model="showedFile[1].checked"
					:input-id="showedFile[1].id"
					:binary="true"
				/>
				<label :for="showedFile[1].id" text="xl gray-700">
					{{ trans.testScore.value }}
				</label>
			</div>
			<div class="flex mx-10 gap-8 mb-4" text="gray-500">
				<div>{{ trans.details.fileName.value }}</div>
				<div>{{ trans.details.fileUpload.value }}</div>
			</div>
		</div>
		<!-- showFile - checkbox 3 -->
		<div v-if="showedFile[2].visible">
			<div class="flex mt-6 mb-2 gap-4 items-center">
				<Checkbox
					v-model="showedFile[2].checked"
					:input-id="showedFile[2].id"
					:binary="true"
				/>
				<label :for="showedFile[2].id" text="xl gray-700">
					{{ trans.otherFile.value }}
				</label>
			</div>
			<div class="flex mx-10 gap-8 mb-4" text="gray-500">
				<div>{{ trans.details.fileName.value }}</div>
				<div>{{ trans.details.fileUpload.value }}</div>
			</div>
		</div>
		<!-- showFile - checkbox 4 -->
		<div v-if="showedFile[3].visible">
			<div class="flex mt-6 mb-2 gap-4 items-center">
				<Checkbox
					v-model="showedFile[3].checked"
					:input-id="showedFile[3].id"
					:binary="true"
				/>
				<label :for="showedFile[3].id" text="xl gray-700">
					{{ trans.nationalId.value }}
				</label>
			</div>
			<div class="flex mx-10 gap-8 mb-4" text="gray-500">
				<div>{{ trans.details.fileName.value }}</div>
				<div>{{ trans.details.fileUpload.value }}</div>
			</div>
		</div>

		<!-- Footer - Control Buttons -->
		<div class="bigRedDivider my-6 mt-10"></div>
		<div class="flex justify-center w-full mb-8 gap-8">
			<Button
				class="bg-white h-14 w-36 border-ntnuRed p-button-outlined"
				@click="refreshData()"
			>
				<i class="pi pi-times ml-1 mr-2 box-border text-ntnuRed" />
				<div class="m-auto text-ntnuRed">
					<div>{{ trans.cancel.value }}</div>
				</div>
			</Button>
			<Button
				class="bg-Green h-14 w-36 border-ntnuRed"
				@click="saveChange()"
			>
				<i class="pi pi-check ml-1 mr-2 box-border text-black" />
				<div class="m-auto text-black">
					<div>{{ trans.save.value }}</div>
				</div>
			</Button>
		</div>
	</div>
</template>

<script setup lang="ts">
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import Button from "primevue/button";
import Checkbox from "primevue/checkbox";
import ParagraphDivider from "@/styles/paragraphDivider.vue";
import { useToast } from "primevue/usetoast";
import { reactive, ref, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useAdmissionAdminAuthStore } from "@/stores/universalAuth";
import { AdmissionAdminAPI } from "@/api/admission/admin/api";
import { useGlobalStore } from "@/stores/globalStore";
import { InvalidSessionError } from "@/api/error";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import {
	AdmissionAdminScoreFieldResponse,
	AdmissionAdminProgramListResponse,
} from "@/api/admission/admin/types";
import { watch } from "fs";
import { object, TypeOf } from "yup";
import { addAbortSignal } from "stream";
import { getIn } from "yup/lib/util/reach";

const { t } = useI18n();
const toast = useToast();

// I18n translation
const trans = {
	reviewScoreField: computed(() => t("審查評分欄位")),
	save: computed(() => t("儲存")),
	changeSuccess: computed(() => t("儲存成功")),
	cancel: computed(() => t("取消")),
	scoreOption: computed(() => t("評分項目")),
	scoreOptionSetting: computed(() => t("評分設定")),
	labelWeight: computed(() => t("佔比")),
	showInfo: computed(() => t("顯示欄位：基本資料")),
	showFile: computed(() => t("顯示欄位：檢附資料")),
	nameInfo: computed(() => t("姓名資訊")),
	admissionId: computed(() => t("入學身份")),
	residentAddr: computed(() => t("戶籍資訊")),
	currentAddr: computed(() => t("現居地址")),
	nationalId: computed(() => t("身份資料")),
	contactInfo: computed(() => t("聯絡資訊")),
	schoolExp: computed(() => t("就學經歷")),
	testScore: computed(() => t("考試與檢定分數")),
	otherFile: computed(() => t("其他有利於審查資料")),
	colon: computed(() => t("：")),
	phase: {
		1: computed(() => t("第一階段 (書面審查)")),
		2: computed(() => t("第二階段 (口試審查)")),
	},
	phaseWeight: {
		1: computed(() => t("書面審查佔比")),
		2: computed(() => t("口試審查佔比")),
	},
	labelName: {
		1: computed(() => t("項目一")),
		2: computed(() => t("項目二")),
		3: computed(() => t("項目三")),
		4: computed(() => t("項目四")),
		5: computed(() => t("項目五")),
	},
	details: {
		suffix: computed(() => t("※ 稱謂/後綴")),
		chineseName: computed(() => t("※ 中文姓氏/名字")),
		englishName: computed(() => t("※ 英文姓氏/中間名/名字")),
		master: computed(() => t("※ 碩士生")),
		phD: computed(() => t("※ 博士生")),
		country: computed(() => t("※ 國家/州")),
		city: computed(() => t("※ 城市/郵遞區號")),
		streetAddr: computed(() => t("※ 街道地址")),
		gender: computed(() => t("※ 法定性別/ 性別認同")),
		bornCountry: computed(() => t("※ 出生國")),
		mainNation: computed(() => t("※ 主要國籍")),
		bornDate: computed(() => t("※ 出生日期")),
		email: computed(() => t("※ 電子郵件")),
		primePhone: computed(() => t("※ 電話(主要)")),
		secondPhone: computed(() => t("※ 電話(次要)")),
		mobilePhone: computed(() => t("※ 電話(行動電話)")),
		fileName: computed(() => t("※ 資料名稱")),
		fileUpload: computed(() => t("※ 資料上傳")),
	},
};

// API Authorization
const adminAuth = useAdmissionAdminAuthStore();
const api = new AdmissionAdminAPI(adminAuth);
const store = useGlobalStore();

const queryClient = useQueryClient();

// API Index form: Score Field Response (Improvement)
const resIndex = [
	"docs_weight",
	"docs_grade_name_1",
	"docs_grade_weight_1",
	"docs_grade_name_2",
	"docs_grade_weight_2",
	"docs_grade_name_3",
	"docs_grade_weight_3",
	"docs_grade_name_4",
	"docs_grade_weight_4",
	"docs_grade_name_5",
	"docs_grade_weight_5",
	"oral_weight",
	"oral_grade_name_1",
	"oral_grade_weight_1",
	"oral_grade_name_2",
	"oral_grade_weight_2",
	"oral_grade_name_3",
	"oral_grade_weight_3",
	"oral_grade_name_4",
	"oral_grade_weight_4",
	"oral_grade_name_5",
	"oral_grade_weight_5",
];

// Field content & data
const docsScore = reactive([
	{ name: "Total", weight: 0, index: 0 },
	{ name: trans.labelName[1].value, weight: 0, index: 1 },
	{ name: trans.labelName[2].value, weight: 0, index: 2 },
	{ name: trans.labelName[3].value, weight: 0, index: 3 },
	{ name: trans.labelName[4].value, weight: 0, index: 4 },
	{ name: trans.labelName[5].value, weight: 0, index: 5 },
]);
const oralScore = reactive([
	{ name: "Total", weight: 0, index: 0 },
	{ name: trans.labelName[1].value, weight: 0, index: 1 },
	{ name: trans.labelName[2].value, weight: 0, index: 2 },
	{ name: trans.labelName[3].value, weight: 0, index: 3 },
	{ name: trans.labelName[4].value, weight: 0, index: 4 },
	{ name: trans.labelName[5].value, weight: 0, index: 5 },
]);
const showedInfo = reactive([
	{ id: "file1", visible: true, checked: true },
	{ id: "file2", visible: true, checked: true },
	{ id: "file3", visible: true, checked: true },
	{ id: "file4", visible: true, checked: true },
	{ id: "file5", visible: true, checked: true },
	{ id: "file6", visible: true, checked: true },
]);
const showedFile = reactive([
	{ id: "file1", visible: true, checked: true },
	{ id: "file2", visible: true, checked: true },
	{ id: "file3", visible: true, checked: true },
	{ id: "file4", visible: true, checked: true },
]);

// API: Get Score Data
const getScoreField = useQuery(["scoreField"], async () => {
	try {
		if (store.program) {
			return await api.getScoreField(store.program.id);
		}
	} catch (e: any) {
		if (e instanceof InvalidSessionError) {
			console.error("Invalid Session Error");
		}
	}
});

// API: Patch Score Data
const patchScoreField = useMutation(
	async (newData: AdmissionAdminScoreFieldResponse) => {
		try {
			if (store.program) {
				return await api.patchScoreField(store.program.id, newData);
			}
		} catch (e: any) {
			if (e instanceof InvalidSessionError) {
				console.error("Invalid Session Error");
			}
		}
	},
	{
		onSuccess: () => {
			queryClient.invalidateQueries(["scoreField"]);
		},
	}
);

// API: Get Info/File Data
const getInfoFileField = useQuery(["infoFileField"], async () => {
	try {
		if (store.program) {
			const allData = await api.getProgramList();
			return allData[store.program.id];
		}
	} catch (e: any) {
		if (e instanceof InvalidSessionError) {
			console.error("Invalid Session Error");
		}
	}
});

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

// ButtonFn: Save Changes and Patch Data
function saveChange() {
	try {
		docsScore.forEach((element) => {
			if (element.name === "" && element.weight) {
				element.name =
					trans.labelName[
						element.index as keyof typeof trans.labelName
					].value;
				// FIXME: Debug - Check Replace empty name work or not.
				console.log("empty name has be auto filled ->" + element.name);
			}
		});
		oralScore.forEach((element) => {
			if (element.name === "" && element.weight) {
				element.name =
					trans.labelName[
						element.index as keyof typeof trans.labelName
					].value;
			}
		});
		// FIXME: DEBUG - Print sented Data before mutate
		docsScore.forEach((element) => {
			console.log(element.name + ": " + element.weight);
		});
		oralScore.forEach((element) => {
			console.log(element.name + ": " + element.weight);
		});
		// Patch Data
		patchScoreField.mutate({
			// IMPROVE: Use Array to pass value instead of Hard-code.
			docs_weight: docsScore[0].weight,
			oral_weight: oralScore[0].weight,
			docs_grade_name_1: docsScore[1].name,
			docs_grade_name_2: docsScore[2].name,
			docs_grade_name_3: docsScore[3].name,
			docs_grade_name_4: docsScore[4].name,
			docs_grade_name_5: docsScore[5].name,
			docs_grade_weight_1: docsScore[1].weight,
			docs_grade_weight_2: docsScore[2].weight,
			docs_grade_weight_3: docsScore[3].weight,
			docs_grade_weight_4: docsScore[4].weight,
			docs_grade_weight_5: docsScore[5].weight,
			oral_grade_name_1: oralScore[1].name,
			oral_grade_name_2: oralScore[2].name,
			oral_grade_name_3: oralScore[3].name,
			oral_grade_name_4: oralScore[4].name,
			oral_grade_name_5: oralScore[5].name,
			oral_grade_weight_1: oralScore[1].weight,
			oral_grade_weight_2: oralScore[2].weight,
			oral_grade_weight_3: oralScore[3].weight,
			oral_grade_weight_4: oralScore[4].weight,
			oral_grade_weight_5: oralScore[5].weight,
		});
		toast.add({
			severity: "success",
			summary: trans.changeSuccess.value,
			life: 3000,
		});
	} catch {
		toast.add({
			severity: "error",
			summary: trans.changeSuccess.value,
			life: 3000,
		});
	}
}

// ButtonFn: Discard Changes and Update Data
function refreshData() {
	// TODO: Do "try" "catch" function
	const getScore = getScoreField.data.value;
	if (!getScore) return "Failed to fetch Score Data";
	docsScore[0].weight = getScore.docs_weight;
	oralScore[0].weight = getScore.oral_weight;
	docsScore[1].name = getScore.docs_grade_name_1;
	docsScore[2].name = getScore.docs_grade_name_2;
	docsScore[3].name = getScore.docs_grade_name_3;
	docsScore[4].name = getScore.docs_grade_name_4;
	docsScore[5].name = getScore.docs_grade_name_5;
	docsScore[1].weight = getScore.docs_grade_weight_1;
	docsScore[2].weight = getScore.docs_grade_weight_2;
	docsScore[3].weight = getScore.docs_grade_weight_3;
	docsScore[4].weight = getScore.docs_grade_weight_4;
	docsScore[5].weight = getScore.docs_grade_weight_5;
	oralScore[1].name = getScore.oral_grade_name_1;
	oralScore[2].name = getScore.oral_grade_name_2;
	oralScore[3].name = getScore.oral_grade_name_3;
	oralScore[4].name = getScore.oral_grade_name_4;
	oralScore[5].name = getScore.oral_grade_name_5;
	oralScore[1].weight = getScore.oral_grade_weight_1;
	oralScore[2].weight = getScore.oral_grade_weight_2;
	oralScore[3].weight = getScore.oral_grade_weight_3;
	oralScore[4].weight = getScore.oral_grade_weight_4;
	oralScore[5].weight = getScore.oral_grade_weight_5;

	const getInfoFile = getInfoFileField.data.value;
	if (!getInfoFile) return "";
	const infoList = {
		visible: JSON.parse(getInfoFile.applicant_required_info!),
		checked: JSON.parse(getInfoFile.reviewer_required_info!),
	};
	const fileList = {
		visible: JSON.parse(getInfoFile.applicant_required_file!),
		checked: JSON.parse(getInfoFile.reviewer_required_file!),
	};
	showedInfo.forEach((element) => {
		if (infoList.visible.includes(element.id)) element.visible = true;
		else element.visible = false;
		if (infoList.checked.includes(element.id)) element.checked = true;
		else element.checked = false;
	});
	showedFile.forEach((element) => {
		if (fileList.visible.includes(element.id)) element.visible = true;
		else element.visible = false;
		if (fileList.checked.includes(element.id)) element.checked = true;
		else element.checked = false;
	});
}

// Lifecycle: Mounted
onMounted(() => {
	refreshData();
});

// TODO Lifecycle: Watch
</script>
