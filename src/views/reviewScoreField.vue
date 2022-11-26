<template>
	<Toast />
	<div class="mx-32 mt-16">
		<h1 class="text-4xl text-bold tracking-widest">
			{{ trans.reviewScoreField.value }}
		</h1>
		<div class="bigRedDivider"></div>

		<!-- SelectButton -->
		<div class="flex w-fluid my-6 gap-2" border="2 red-900 rounded-lg">
			<button class="w-1/2 gap-2" @click="changePhase('docs')">
				<div
					class="p-2"
					bg="red-200"
					border="rounded-lg"
					v-if="selectPhase === 'docs'"
				>
					{{ trans.stage[1].value }}
				</div>
				<div v-else>{{ trans.stage[1].value }}</div>
			</button>
			<button class="w-1/2 gap-2" @click="changePhase('oral')">
				<div
					class="p-2"
					bg="red-200"
					border="rounded-lg"
					v-if="selectPhase === 'oral'"
				>
					{{ trans.stage[2].value }}
				</div>
				<div v-else>{{ trans.stage[2].value }}</div>
			</button>
		</div>

		<!-- StageScore -->
		<div>
			<div class="text-xl my-6">
				{{ trans.scoreOptionSetting.value }}
			</div>
			<div class="space-y-2" v-if="selectPhase === 'docs'">
				<div>{{ trans.stageWeight[1].value }}</div>
				<InputNumber class="!w-300px" v-model="docsScore[0].weight" />
			</div>
			<div class="space-y-2" v-if="selectPhase === 'oral'">
				<div>{{ trans.stageWeight[2].value }}</div>
				<InputNumber class="!w-300px" v-model="oralScore[0].weight" />
			</div>
		</div>
		<!-- ScoreField -->
		<div class="my-6">
			<div class="my-4 space-y-4">
				<div>{{ trans.scoreOption.value }}</div>
				<!-- ScoreField 1 -->
				<div class="flex content-center gap-4">
					<InputText
						class="!w-300px"
						v-model="docsScore[1].name"
						v-if="selectPhase === 'docs'"
						:placeholder="trans.labelName[1].value"
					/>
					<InputNumber
						class="!w-200px"
						v-model="docsScore[1].weight"
						v-if="selectPhase === 'docs'"
						:placeholder="trans.labelWeight.value"
					/>
					<InputText
						class="!w-300px"
						v-model="oralScore[1].name"
						v-if="selectPhase === 'oral'"
						:placeholder="trans.labelName[1].value"
					/>
					<InputNumber
						class="!w-200px"
						v-model="oralScore[1].weight"
						v-if="selectPhase === 'oral'"
						:placeholder="trans.labelWeight.value"
					/>
				</div>
				<!-- ScoreField 2 -->
				<div class="flex content-center gap-4">
					<InputText
						class="!w-300px"
						v-model="docsScore[2].name"
						v-if="selectPhase === 'docs'"
						:placeholder="trans.labelName[2].value"
					/>
					<InputNumber
						class="!w-200px"
						v-model="docsScore[2].weight"
						v-if="selectPhase === 'docs'"
						:placeholder="trans.labelWeight.value"
					/>
					<InputText
						class="!w-300px"
						v-model="oralScore[2].name"
						v-if="selectPhase === 'oral'"
						:placeholder="trans.labelName[2].value"
					/>
					<InputNumber
						class="!w-200px"
						v-model="oralScore[2].weight"
						v-if="selectPhase === 'oral'"
						:placeholder="trans.labelWeight.value"
					/>
				</div>
				<!-- ScoreField 3 -->
				<div class="flex content-center gap-4">
					<InputText
						class="!w-300px"
						v-model="docsScore[3].name"
						v-if="selectPhase === 'docs'"
						:placeholder="trans.labelName[3].value"
					/>
					<InputNumber
						class="!w-200px"
						v-model="docsScore[3].weight"
						v-if="selectPhase === 'docs'"
						:placeholder="trans.labelWeight.value"
					/>
					<InputText
						class="!w-300px"
						v-model="oralScore[3].name"
						v-if="selectPhase === 'oral'"
						:placeholder="trans.labelName[3].value"
					/>
					<InputNumber
						class="!w-200px"
						v-model="oralScore[3].weight"
						v-if="selectPhase === 'oral'"
						:placeholder="trans.labelWeight.value"
					/>
				</div>
				<!-- ScoreField 4 -->
				<div class="flex content-center gap-4">
					<InputText
						class="!w-300px"
						v-model="docsScore[4].name"
						v-if="selectPhase === 'docs'"
						:placeholder="trans.labelName[4].value"
					/>
					<InputNumber
						class="!w-200px"
						v-model="docsScore[4].weight"
						v-if="selectPhase === 'docs'"
						:placeholder="trans.labelWeight.value"
					/>
					<InputText
						class="!w-300px"
						v-model="oralScore[4].name"
						v-if="selectPhase === 'oral'"
						:placeholder="trans.labelName[4].value"
					/>
					<InputNumber
						class="!w-200px"
						v-model="oralScore[4].weight"
						v-if="selectPhase === 'oral'"
						:placeholder="trans.labelWeight.value"
					/>
				</div>
				<!-- ScoreField 5 -->
				<div class="flex content-center gap-4">
					<InputText
						class="!w-300px"
						v-model="docsScore[5].name"
						v-if="selectPhase === 'docs'"
						:placeholder="trans.labelName[5].value"
					/>
					<InputNumber
						class="!w-200px"
						v-model="docsScore[5].weight"
						v-if="selectPhase === 'docs'"
						:placeholder="trans.labelWeight.value"
					/>
					<InputText
						class="!w-300px"
						v-model="oralScore[5].name"
						v-if="selectPhase === 'oral'"
						:placeholder="trans.labelName[5].value"
					/>
					<InputNumber
						class="!w-200px"
						v-model="oralScore[5].weight"
						v-if="selectPhase === 'oral'"
						:placeholder="trans.labelWeight.value"
					/>
				</div>
			</div>
		</div>
		<ParagraphDivider />

		<!-- ShowInfo -->
		<div>
			<div class="text-xl my-6">{{ trans.showInfo.value }}</div>
			<div class="flex gap-4 items-center">
				<Checkbox
					v-model="checkInfo[0]"
					v-if="showInfo[0]"
					:binary="true"
				/>
				<div class="text-lg my-4">{{ trans.nameInfo.value }}</div>
			</div>
			<div class="flex px-8 gap-8 mb-4">
				<div class="text-s">{{ trans.details.suffix.value }}</div>
				<div class="text-s">{{ trans.details.chineseName.value }}</div>
				<div class="text-s">{{ trans.details.englishName.value }}</div>
			</div>
			<div class="flex gap-4 items-center">
				<Checkbox
					v-model="checkInfo[1]"
					v-if="showInfo[1]"
					:binary="true"
				/>
				<div class="text-lg my-4">{{ trans.admissionId.value }}</div>
			</div>
			<div class="flex px-8 gap-8 mb-4">
				<div class="text-s">{{ trans.details.master.value }}</div>
				<div class="text-s">{{ trans.details.phD.value }}</div>
			</div>
			<div class="flex gap-4 items-center">
				<Checkbox
					v-model="checkInfo[2]"
					v-if="showInfo[2]"
					:binary="true"
				/>
				<div class="text-lg my-4">{{ trans.residentAddr.value }}</div>
			</div>
			<div class="flex px-8 gap-8 mb-4">
				<div class="text-s">{{ trans.details.country.value }}</div>
				<div class="text-s">{{ trans.details.city.value }}</div>
				<div class="text-s">{{ trans.details.streetAddr.value }}</div>
			</div>
			<div class="flex gap-4 items-center">
				<Checkbox
					v-model="checkInfo[3]"
					v-if="showInfo[3]"
					:binary="true"
				/>
				<div class="text-lg my-4">{{ trans.currentAddr.value }}</div>
			</div>
			<div class="flex px-8 gap-8 mb-4">
				<div class="text-s">{{ trans.details.country.value }}</div>
				<div class="text-s">{{ trans.details.city.value }}</div>
				<div class="text-s">{{ trans.details.streetAddr.value }}</div>
			</div>
			<div class="flex gap-4 items-center">
				<Checkbox
					v-model="checkInfo[4]"
					v-if="showInfo[4]"
					:binary="true"
				/>
				<div class="text-lg my-4">{{ trans.nationalId.value }}</div>
			</div>
			<div class="flex px-8 gap-8 mb-4">
				<div class="text-s">{{ trans.details.gender.value }}</div>
				<div class="text-s">{{ trans.details.bornCountry.value }}</div>
				<div class="text-s">{{ trans.details.mainNation.value }}</div>
				<div class="text-s">{{ trans.details.bornDate.value }}</div>
				<div class="text-s">{{ trans.details.mainNation.value }}</div>
			</div>
			<div class="flex gap-4 items-center">
				<Checkbox
					v-model="checkInfo[5]"
					v-if="showInfo[5]"
					:binary="true"
				/>
				<div class="text-lg my-4">{{ trans.contactInfo.value }}</div>
			</div>
			<div class="flex px-8 gap-8 mb-4">
				<div class="text-s">{{ trans.details.email.value }}</div>
				<div class="text-s">{{ trans.details.primePhone.value }}</div>
				<div class="text-s">{{ trans.details.secondPhone.value }}</div>
				<div class="text-s">{{ trans.details.mobilePhone.value }}</div>
			</div>
		</div>

		<ParagraphDivider />

		<!-- ShowFile -->
		<div>
			<div class="text-xl my-6">{{ trans.showFile.value }}</div>
			<div class="flex gap-4 items-center">
				<Checkbox
					v-model="checkFile[0]"
					v-if="showFile[0]"
					:binary="true"
				/>
				<div class="text-lg my-4">{{ trans.schoolExp.value }}</div>
			</div>
			<div class="flex px-8 gap-8 mb-4">
				<div class="text-s">{{ trans.details.fileName.value }}</div>
				<div class="text-s">{{ trans.details.fileUpload.value }}</div>
			</div>
			<div class="flex gap-4 items-center">
				<Checkbox
					v-model="checkFile[1]"
					v-if="showFile[1]"
					:binary="true"
				/>
				<div class="text-lg my-4">{{ trans.testScore.value }}</div>
			</div>
			<div class="flex px-8 gap-8 mb-4">
				<div class="text-s">{{ trans.details.fileName.value }}</div>
				<div class="text-s">{{ trans.details.fileUpload.value }}</div>
			</div>
			<div class="flex gap-4 items-center">
				<Checkbox
					v-model="checkFile[2]"
					v-if="showFile[2]"
					:binary="true"
				/>
				<div class="text-lg my-4">{{ trans.otherFile }}</div>
			</div>
			<div class="flex px-8 gap-8 mb-4">
				<div class="text-s">{{ trans.details.fileName.value }}</div>
				<div class="text-s">{{ trans.details.fileUpload.value }}</div>
			</div>
			<div class="flex gap-4 items-center">
				<Checkbox
					v-model="checkFile[3]"
					v-if="showFile[3]"
					:binary="true"
				/>
				<div class="text-lg my-4">{{ trans.nationalId.value }}</div>
			</div>
			<div class="flex px-8 gap-8 mb-4">
				<div class="text-s">{{ trans.details.fileName.value }}</div>
				<div class="text-s">{{ trans.details.fileUpload.value }}</div>
			</div>
		</div>

		<div class="bigRedDivider mt-14"></div>

		<!-- ControlButton -->
		<div class="flex mt-24px">
			<div class="m-auto">
				<div class="flex">
					<Button
						class="bg-white h-60px w-140px border-ntnuRed p-button-outlined"
						@click="refreshData(selectPhase)"
					>
						<i
							class="ml-1 mr-2 box-border text-sm text-ntnuRed pi pi-times"
						></i>
						<div class="m-auto text-sm text-ntnuRed tracking-2">
							<div>{{ trans.cancel.value }}</div>
						</div>
					</Button>
					<div class="w-24px"></div>
					<Button
						class="bg-Green h-60px w-140px border-ntnuRed"
						@click="saveChange(selectPhase)"
					>
						<i
							class="ml-1 mr-2 box-border text-sm text-black pi pi-check"
						></i>
						<div class="m-auto text-sm text-black tracking-2">
							<div>{{ trans.save.value }}</div>
						</div>
					</Button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import Button from "primevue/button";
import Toast from "primevue/toast";
import Checkbox from "primevue/checkbox";
import ParagraphDivider from "../styles/paragraphDivider.vue";
import { useToast } from "primevue/usetoast";
import { reactive, ref, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useAdmissionAdminAuthStore } from "@/stores/universalAuth";
import { AdmissionAdminAPI } from "@/api/admission/admin/api";
import { useGlobalStore } from "@/stores/globalStore";
import { InvalidSessionError } from "@/api/error";
import { useMutation, useQuery } from "@tanstack/vue-query";
import { AdmissionAdminScoreFieldResponse } from "@/api/admission/admin/types";
import { watch } from "fs";
import { object, TypeOf } from "yup";

const { t } = useI18n();
const toast = useToast();
const selectPhase = ref("docs");

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

	stage: {
		1: computed(() => t("第一階段 (書面審查)")),
		2: computed(() => t("第二階段 (口試審查)")),
	},
	stageWeight: {
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
	{ name: "", weight: 0, index: 1 },
	{ name: "", weight: 0, index: 2 },
	{ name: "", weight: 0, index: 3 },
	{ name: "", weight: 0, index: 4 },
	{ name: "", weight: 0, index: 5 },
]);
const oralScore = reactive([
	{ name: "Total", weight: 0, index: 0 },
	{ name: "", weight: 0, index: 1 },
	{ name: "", weight: 0, index: 2 },
	{ name: "", weight: 0, index: 3 },
	{ name: "", weight: 0, index: 4 },
	{ name: "", weight: 0, index: 5 },
]);
const showInfo = reactive([true, true, true, true, true, true]);
const showFile = reactive([true, true, true, true]);
const checkInfo = reactive([true, true, true, true, true, true]);
const checkFile = reactive([true, true, true, true]);

// Toast message: Success
const toastSuccess = () => {
	toast.add({
		severity: "success",
		summary: trans.changeSuccess.value,
		life: 3000,
	});
};

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
	}
);

// ButtonFn: Save Changes and Patch Data
function saveChange(phase: string) {
	// Adjust Data to correct form
	if (phase === "docs") oralScore[0].weight = 100 - docsScore[0].weight;
	if (phase === "oral") docsScore[0].weight = 100 - oralScore[0].weight;
	docsScore.forEach((element) => {
		if (element.name === "" && element.weight != 0) {
			element.name =
				trans.labelName[
					element.index as keyof typeof trans.labelName
				].value;
		}
	});
	oralScore.forEach((element) => {
		if (element.name === "" && element.weight != 0) {
			element.name =
				trans.labelName[
					element.index as keyof typeof trans.labelName
				].value;
		}
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
}

// ButtonFn: Discard Changes and Update Data
function refreshData(phase: string) {
	const getData = getScoreField.data.value;
	if (!getData) return;
	docsScore[0].weight = getData.docs_weight;
	oralScore[0].weight = getData.oral_weight;
	if (phase === "docs") {
		docsScore[1].name = getData.docs_grade_name_1;
		docsScore[2].name = getData.docs_grade_name_2;
		docsScore[3].name = getData.docs_grade_name_3;
		docsScore[4].name = getData.docs_grade_name_4;
		docsScore[5].name = getData.docs_grade_name_5;
		docsScore[1].weight = getData.docs_grade_weight_1;
		docsScore[2].weight = getData.docs_grade_weight_2;
		docsScore[3].weight = getData.docs_grade_weight_3;
		docsScore[4].weight = getData.docs_grade_weight_4;
		docsScore[5].weight = getData.docs_grade_weight_5;
	}
	if (phase === "oral") {
		oralScore[1].name = getData.oral_grade_name_1;
		oralScore[2].name = getData.oral_grade_name_2;
		oralScore[3].name = getData.oral_grade_name_3;
		oralScore[4].name = getData.oral_grade_name_4;
		oralScore[5].name = getData.oral_grade_name_5;
		oralScore[1].weight = getData.oral_grade_weight_1;
		oralScore[2].weight = getData.oral_grade_weight_2;
		oralScore[3].weight = getData.oral_grade_weight_3;
		oralScore[4].weight = getData.oral_grade_weight_4;
		oralScore[5].weight = getData.oral_grade_weight_5;
	}
}

// ButtonFn: Switch to Different Phases
function changePhase(phase: string) {
	selectPhase.value = phase;
}

// Lifecycle: Mounted
onMounted(() => {});

// TODO Lifecycle: Watch
</script>
