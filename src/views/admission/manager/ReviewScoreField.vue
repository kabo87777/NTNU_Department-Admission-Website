<template>
	<Layout Admin gap="2">
		<template #Header>
			{{ trans.reviewScoreField.value }}
		</template>
		<template #Body>
			<Message severity="warn" pos="sticky top-0" m="!0">
				各個評分項目與佔比同時填 0 表示關閉該評分項目
			</Message>
			<!-- Body - Score Field: Phase 1 -->
			<div text="2xl title" pb="2">
				{{ trans.scoreOptionSetting.value }}
				{{ trans.colon.value }}
				{{ trans.phase[1].value }}
			</div>
			<div flex="~ col gap-2" text="body">
				<div>{{ trans.phaseWeight[1].value }}</div>
				<InputNumber class="!w-300px" v-model="docsScore[0].weight" />
			</div>
			<div flex="~ col gap-2" text="body">
				<div>{{ trans.scoreOption.value }}</div>
				<!-- Phase 1 - item 1 -->
				<div class="flex gap-6">
					<InputText class="!w-300px" v-model="docsScore[1].name" />
					<InputNumber
						class="!w-200px"
						v-model="docsScore[1].weight"
					/>
				</div>
				<!-- Phase 1 - item 2 -->
				<div class="flex gap-6">
					<InputText class="!w-300px" v-model="docsScore[2].name" />
					<InputNumber
						class="!w-200px"
						v-model="docsScore[2].weight"
					/>
				</div>
				<!-- Phase 1 - item 3 -->
				<div class="flex gap-6">
					<InputText class="!w-300px" v-model="docsScore[3].name" />
					<InputNumber
						class="!w-200px"
						v-model="docsScore[3].weight"
					/>
				</div>
				<!-- Phase 1 - item 4 -->
				<div class="flex gap-6">
					<InputText class="!w-300px" v-model="docsScore[4].name" />
					<InputNumber
						class="!w-200px"
						v-model="docsScore[4].weight"
					/>
				</div>
				<!-- Phase 1 - item 5 -->
				<div class="flex gap-6">
					<InputText class="!w-300px" v-model="docsScore[5].name" />
					<InputNumber
						class="!w-200px"
						v-model="docsScore[5].weight"
					/>
				</div>
			</div>
			<PDivider Admin />
			<!-- Body - Score Field: Phase 2 -->
			<div text="2xl title" pb="2">
				{{ trans.scoreOptionSetting.value }}
				{{ trans.colon.value }}
				{{ trans.phase[2].value }}
			</div>
			<div flex="~ col gap-2" text="body">
				<div>{{ trans.phaseWeight[2].value }}</div>
				<InputNumber class="!w-300px" v-model="oralScore[0].weight" />
			</div>
			<div flex="~ col gap-2" text="body">
				<div>{{ trans.scoreOption.value }}</div>
				<!-- Phase 2 - item 1 -->
				<div class="flex gap-6">
					<InputText class="!w-300px" v-model="oralScore[1].name" />
					<InputNumber
						class="!w-200px"
						v-model="oralScore[1].weight"
					/>
				</div>
				<!-- Phase 2 - item 2 -->
				<div class="flex gap-6">
					<InputText class="!w-300px" v-model="oralScore[2].name" />
					<InputNumber
						class="!w-200px"
						v-model="oralScore[2].weight"
					/>
				</div>
				<!-- Phase 2 - item 3 -->
				<div class="flex gap-6">
					<InputText class="!w-300px" v-model="oralScore[3].name" />
					<InputNumber
						class="!w-200px"
						v-model="oralScore[3].weight"
					/>
				</div>
				<!-- Phase 2 - item 4 -->
				<div class="flex gap-6">
					<InputText class="!w-300px" v-model="oralScore[4].name" />
					<InputNumber
						class="!w-200px"
						v-model="oralScore[4].weight"
					/>
				</div>
				<!-- Phase 2 - item 5 -->
				<div class="flex gap-6">
					<InputText class="!w-300px" v-model="oralScore[5].name" />
					<InputNumber
						class="!w-200px"
						v-model="oralScore[5].weight"
					/>
				</div>
			</div>
		</template>
		<template #Footer>
			<div flex="~" justify="center" gap="4">
				<NButton
					Admin
					class="p-2 w-32"
					icon="pi pi-check"
					@click="saveChange()"
				>
					{{ trans.save.value }}
				</NButton>
				<NButton
					class="p-2 w-32"
					icon="pi pi-times"
					@click="refreshData()"
				>
					{{ trans.cancel.value }}
				</NButton>
			</div>
		</template>
	</Layout>
</template>

<script setup lang="ts">
import Layout from "@/components/Layout.vue";
import NButton from "@/styles/CustomButton.vue";
import Message from "primevue/message";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import Checkbox from "primevue/checkbox";
import PDivider from "@/styles/PrDivider.vue";

import { useToast } from "primevue/usetoast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { reactive, watch, computed } from "vue";
import { useI18n } from "vue-i18n";

import { useAdmissionAdminAuthStore } from "@/stores/universalAuth";
import { useGlobalStore } from "@/stores/globalStore";

import { AdmissionAdminAPI } from "@/api/admission/admin/api";
import {
	AdmissionAdminScoreFieldResponse,
	AdmissionAdminProgramListResponse,
} from "@/api/admission/admin/types";

const { t } = useI18n();
const toast = useToast();
const adminAuth = useAdmissionAdminAuthStore();
const api = new AdmissionAdminAPI(adminAuth);
const globalStore = useGlobalStore();
const queryClient = useQueryClient();

// I18n translation
const trans = {
	reviewScoreField: computed(() => t("審查評分設置")),
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
	currentAddr: computed(() => t("通訊地址")),
	nationalId: computed(() => t("身份資料")),
	contactInfo: computed(() => t("聯絡資訊")),
	schoolExp: computed(() => t("就學經歷")),
	testScore: computed(() => t("考試與檢定分數")),
	otherFile: computed(() => t("其他有利於審查資料")),
	colon: computed(() => t(":")),
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
		chineseName: computed(() => t("※ 中文姓氏/名字")),
		englishName: computed(() => t("※ 英文姓氏/中間名/名字")),
		locals: computed(() => t("※ 本國人士")),
		foreigner: computed(() => t("※外籍人士")),
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
	failed: {
		getScore: computed(() => t("無法取得分數資料")),
		getInfoFile: computed(() => t("無法取得顯示欄位資料")),
	},
};

// Field content & data
let docsScore = reactive([
	{ name: "Total", weight: 0, index: 0 },
	{ name: trans.labelName[1].value, weight: 0, index: 1 },
	{ name: trans.labelName[2].value, weight: 0, index: 2 },
	{ name: trans.labelName[3].value, weight: 0, index: 3 },
	{ name: trans.labelName[4].value, weight: 0, index: 4 },
	{ name: trans.labelName[5].value, weight: 0, index: 5 },
]);
let oralScore = reactive([
	{ name: "Total", weight: 0, index: 0 },
	{ name: trans.labelName[1].value, weight: 0, index: 1 },
	{ name: trans.labelName[2].value, weight: 0, index: 2 },
	{ name: trans.labelName[3].value, weight: 0, index: 3 },
	{ name: trans.labelName[4].value, weight: 0, index: 4 },
	{ name: trans.labelName[5].value, weight: 0, index: 5 },
]);
let showedInfo = reactive([
	{ id: "姓名資訊", visible: true, checked: true },
	{ id: "入學身分", visible: true, checked: true },
	{ id: "戶籍資訊", visible: true, checked: true },
	{ id: "通訊地址", visible: true, checked: true },
	{ id: "身份資料", visible: true, checked: true },
	{ id: "聯絡資料", visible: true, checked: true },
]);
let showedFile = reactive([
	{ id: "就學經歷", visible: true, checked: true },
	{ id: "考試與檢定分數", visible: true, checked: true },
	{ id: "其他有利於審查資料", visible: true, checked: true },
	{ id: "身份資料", visible: true, checked: true },
]);
const fieldList = {
	info: {
		visible: [""],
		checked: [""],
	},
	file: {
		visible: [""],
		checked: [""],
	},
};
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

// API: Get Score Data
const getScoreField = useQuery({
	queryKey: ["scoreField"],
	queryFn: async () => {
		if (!globalStore.program)
			throw new Error("getScoreField: no program selected");

		return await api.getScoreField(globalStore.program.id);
	},
	onSuccess: (data) => {
		// Pass Data one by one (There)
		docsScore[0].weight = data.docs_weight;
		oralScore[0].weight = data.oral_weight;
		docsScore[1].name = data.docs_grade_name_1;
		docsScore[2].name = data.docs_grade_name_2;
		docsScore[3].name = data.docs_grade_name_3;
		docsScore[4].name = data.docs_grade_name_4;
		docsScore[5].name = data.docs_grade_name_5;
		docsScore[1].weight = data.docs_grade_weight_1;
		docsScore[2].weight = data.docs_grade_weight_2;
		docsScore[3].weight = data.docs_grade_weight_3;
		docsScore[4].weight = data.docs_grade_weight_4;
		docsScore[5].weight = data.docs_grade_weight_5;
		oralScore[1].name = data.oral_grade_name_1;
		oralScore[2].name = data.oral_grade_name_2;
		oralScore[3].name = data.oral_grade_name_3;
		oralScore[4].name = data.oral_grade_name_4;
		oralScore[5].name = data.oral_grade_name_5;
		oralScore[1].weight = data.oral_grade_weight_1;
		oralScore[2].weight = data.oral_grade_weight_2;
		oralScore[3].weight = data.oral_grade_weight_3;
		oralScore[4].weight = data.oral_grade_weight_4;
		oralScore[5].weight = data.oral_grade_weight_5;
		console.log("Get Score Data Successfully");
	},
	onError: (e: any) => {
		toast.add({
			severity: "error",
			summary: e.toString(),
			life: 3000,
		});
	},
});

// API: Patch Score Data
const patchScoreField = useMutation(
	async (newData: AdmissionAdminScoreFieldResponse) => {
		if (!globalStore.program)
			throw new Error("patchScoreField: no program selected");

		return await api.patchScoreField(globalStore.program.id, newData);
	},
	{
		onSuccess: () => {
			queryClient.invalidateQueries(["scoreField"]);
		},
	}
);

// API: Get Info/File Data
const getInfoFileField = useQuery(
	["infoFileField"],
	async () => {
		if (!globalStore.program)
			throw new Error("infoFileField: no program selected");

		const progarmList = await api.getProgramList();

		// if (!Object.prototype.hasOwnProperty.call(progarmList, store.program.id - 1))

		if (!progarmList[globalStore.program.id - 1])
			throw new Error("infoFileField query error");

		return progarmList[globalStore.program.id - 1];
	},
	{
		onSuccess: (data) => {
			programData.id = data.id;
			programData.category = data.category;
			programData.name = data.name;
			programData.application_start_date = data.application_start_date;
			programData.application_end_date = data.application_end_date;
			programData.review_start_date = data.review_start_date;
			programData.review_end_date = data.review_end_date;
			programData.created_at = data.created_at;
			programData.updated_at = data.updated_at;
			programData.detail = data.detail;
			programData.applicant_required_info = data.applicant_required_info;
			programData.applicant_required_file = data.applicant_required_file;
			programData.reviewer_required_info = data.reviewer_required_info;
			programData.reviewer_required_file = data.reviewer_required_file;
			programData.oral_start_date = data.oral_start_date;
			programData.docs_end_date = data.docs_end_date;
			fieldList.info = {
				visible: JSON.parse(programData.applicant_required_info),
				checked: JSON.parse(programData.reviewer_required_info),
			};
			fieldList.file = {
				visible: JSON.parse(programData.applicant_required_file),
				checked: JSON.parse(programData.reviewer_required_file),
			};
			showedInfo.forEach((element) => {
				element.visible = fieldList.info.visible.includes(element.id);
				element.checked = fieldList.info.checked.includes(element.id);
			});
			showedFile.forEach((element) => {
				element.visible = fieldList.file.visible.includes(element.id);
				element.checked = fieldList.file.checked.includes(element.id);
			});
		},
	}
);

// API: Patch Info/File Data
const patchInfoFileField = useMutation(
	async (newData: AdmissionAdminProgramListResponse) => {
		if (!globalStore.program)
			throw new Error("patchInfoFileField: no program selected");

		return await api.updateProgramData(globalStore.program.id, newData);
	},
	{
		onSuccess: () => {
			queryClient.invalidateQueries(["infoFileField"]);
		},
	}
);

// ButtonFn: Save Changes and Patch Data
async function saveChange() {
	// Adjust and Check correctness of Data
	try {
		let docsSum = 0;
		docsScore.forEach((element) => {
			if (element.name === null && element.weight > 0)
				element.name =
					trans.labelName[
						element.index as keyof typeof trans.labelName
					].value;
			if (element.weight < 0 || element.weight > 100)
				throw { object: element, message: "Invalid Weight" };
			if (element.index) docsSum += element.weight;
		});
		if (docsSum !== 100) {
			toast.add({
				severity: "error",
				summary:
					"第一階段 (書面審查)評分項目比例需要加總等於100 The ratio of scoring items in the first stage (Docs review) needs to add up to 100",
				life: 3000,
			});
			return;
		}

		let oralSum = 0;
		oralScore.forEach((element) => {
			if (element.name === null && element.weight > 0)
				element.name =
					trans.labelName[
						element.index as keyof typeof trans.labelName
					].value;
			if (element.weight < 0 || element.weight > 100)
				throw { object: element, message: "Invalid Weight" };
			if (element.index) oralSum += element.weight;
		});
		if (oralSum !== 100) {
			toast.add({
				severity: "error",
				summary:
					"第二階段 (口試審查)評分項目比例需要加總等於100 The ratio of the scoring items in the second stage (oral test review) needs to add up to 100",
				life: 3000,
			});
			return;
		}
	} catch (e: any) {
		console.error(e);
	}

	// Patch Score Data
	try {
		await patchScoreField.mutateAsync({
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
	} catch (error: any) {
		toast.add({
			severity: "error",
			summary: "Unable to Patch Score Data: " + error.toString(),
			life: 3000,
		});

		throw error;
	}

	// Adjust Info/File Data
	fieldList.info.checked.splice(0, fieldList.info.checked.length);
	fieldList.file.checked.splice(0, fieldList.file.checked.length);
	showedInfo.forEach((element) => {
		if (!fieldList.info.checked.includes(element.id))
			if (element.checked) fieldList.info.checked.push(element.id);
	});
	showedFile.forEach((element) => {
		if (!fieldList.file.checked.includes(element.id))
			if (element.checked) fieldList.file.checked.push(element.id);
	});
	programData.reviewer_required_info = JSON.stringify(fieldList.info.checked);
	programData.reviewer_required_file = JSON.stringify(fieldList.file.checked);

	// Patch Info/File Data
	try {
		await patchInfoFileField.mutateAsync(programData);
	} catch (error: any) {
		toast.add({
			severity: "error",
			summary: "Unable to Info/File Data: " + error.toString(),
			life: 3000,
		});

		throw error;
	}

	toast.add({
		severity: "success",
		summary: trans.changeSuccess.value,
		life: 3000,
	});
}

// ButtonFn: Discard Changes and Update Data
function refreshData() {
	if (!getScoreField) console.error("ScoreData Failed");
	if (!getInfoFileField) console.error("Info/File Data Failed");
}

watch(
	() => docsScore[0].weight,
	(value) => {
		oralScore[0].weight = 100 - value;
	}
);

watch(
	() => oralScore[0].weight,
	(value) => {
		docsScore[0].weight = 100 - value;
	}
);
</script>
