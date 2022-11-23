<template>
	<Toast />
	<div class="mx-32 mt-16">
		<h1 class="text-4xl text-bold tracking-widest">
			{{ translate.reviewScoreField.value }}
		</h1>
		<div class="bigRedDivider"></div>

		<!-- SelectButton -->
		<div class="flex w-fluid my-6 gap-2" border="2 red-900 rounded-lg">
			<button class="w-1/2 gap-2" @click="changeStage(1)">
				<div
					class="p-2"
					bg="red-200"
					border="rounded-lg"
					v-if="selectStage === 1"
				>
					{{ translate.stage[1].value }}
				</div>
				<div v-else>{{ translate.stage[1].value }}</div>
			</button>
			<button class="w-1/2 gap-2" @click="changeStage(2)">
				<div
					class="p-2"
					bg="red-200"
					border="rounded-lg"
					v-if="selectStage === 2"
				>
					{{ translate.stage[2].value }}
				</div>
				<div v-else>{{ translate.stage[2].value }}</div>
			</button>
		</div>

		<!-- StageScore -->
		<div>
			<h1 class="text-xl my-6">
				{{ translate.scoreOptionSetting.value }}
			</h1>
			<div class="space-y-2" v-if="selectStage === 1">
				<div>{{ translate.stageWeight[1].value }}</div>
				<InputNumber class="!w-300px" v-model="fieldData.docs_weight" />
			</div>
			<div class="space-y-2" v-if="selectStage === 2">
				<div>{{ translate.stageWeight[2].value }}</div>
				<InputNumber class="!w-300px" v-model="fieldData.oral_weight" />
			</div>
		</div>
		<!-- ScoreField -->
		<div class="my-6">
			<div class="my-4 space-y-4">
				<div>{{ translate.scoreOption.value }}</div>
				<!-- ScoreField 1 -->
				<div class="flex content-center gap-4">
					<InputText
						class="!w-300px"
						v-model="fieldData.docs_grade_name_1"
						v-if="selectStage === 1"
						:placeholder="translate.labelName[1].value"
					/>
					<InputNumber
						class="!w-200px"
						v-model="fieldData.docs_grade_weight_1"
						v-if="selectStage === 1"
						:placeholder="translate.labelWeight.value"
					/>
					<InputText
						class="!w-300px"
						v-model="fieldData.oral_grade_name_1"
						v-if="selectStage === 2"
						:placeholder="translate.labelName[1].value"
					/>
					<InputNumber
						class="!w-200px"
						v-model="fieldData.oral_grade_weight_1"
						v-if="selectStage === 2"
						:placeholder="translate.labelWeight.value"
					/>
				</div>
				<!-- ScoreField 2 -->
				<div class="flex content-center gap-4">
					<InputText
						class="!w-300px"
						v-model="fieldData.docs_grade_name_2"
						v-if="selectStage === 1"
						:placeholder="translate.labelName[2].value"
					/>
					<InputNumber
						class="!w-200px"
						v-model="fieldData.docs_grade_weight_2"
						v-if="selectStage === 1"
						:placeholder="translate.labelWeight.value"
					/>
					<InputText
						class="!w-300px"
						v-model="fieldData.oral_grade_name_2"
						v-if="selectStage === 2"
						:placeholder="translate.labelName[2].value"
					/>
					<InputNumber
						class="!w-200px"
						v-model="fieldData.oral_grade_weight_2"
						v-if="selectStage === 2"
						:placeholder="translate.labelWeight.value"
					/>
				</div>
				<!-- ScoreField 3 -->
				<div class="flex content-center gap-4">
					<InputText
						class="!w-300px"
						v-model="fieldData.docs_grade_name_3"
						v-if="selectStage === 1"
						:placeholder="translate.labelName[3].value"
					/>
					<InputNumber
						class="!w-200px"
						v-model="fieldData.docs_grade_weight_3"
						v-if="selectStage === 1"
						:placeholder="translate.labelWeight.value"
					/>
					<InputText
						class="!w-300px"
						v-model="fieldData.oral_grade_name_3"
						v-if="selectStage === 2"
						:placeholder="translate.labelName[3].value"
					/>
					<InputNumber
						class="!w-200px"
						v-model="fieldData.oral_grade_weight_3"
						v-if="selectStage === 2"
						:placeholder="translate.labelWeight.value"
					/>
				</div>
				<!-- ScoreField 4 -->
				<div class="flex content-center gap-4">
					<InputText
						class="!w-300px"
						v-model="fieldData.docs_grade_name_4"
						v-if="selectStage === 1"
						:placeholder="translate.labelName[4].value"
					/>
					<InputNumber
						class="!w-200px"
						v-model="fieldData.docs_grade_weight_4"
						v-if="selectStage === 1"
						:placeholder="translate.labelWeight.value"
					/>
					<InputText
						class="!w-300px"
						v-model="fieldData.oral_grade_name_4"
						v-if="selectStage === 2"
						:placeholder="translate.labelName[4].value"
					/>
					<InputNumber
						class="!w-200px"
						v-model="fieldData.oral_grade_weight_4"
						v-if="selectStage === 2"
						:placeholder="translate.labelWeight.value"
					/>
				</div>
				<!-- ScoreField 5 -->
				<div class="flex content-center gap-4">
					<InputText
						class="!w-300px"
						v-model="fieldData.docs_grade_name_5"
						v-if="selectStage === 1"
						:placeholder="translate.labelName[5].value"
					/>
					<InputNumber
						class="!w-200px"
						v-model="fieldData.docs_grade_weight_5"
						v-if="selectStage === 1"
						:placeholder="translate.labelWeight.value"
					/>
					<InputText
						class="!w-300px"
						v-model="fieldData.oral_grade_name_5"
						v-if="selectStage === 2"
						:placeholder="translate.labelName[5].value"
					/>
					<InputNumber
						class="!w-200px"
						v-model="fieldData.oral_grade_weight_5"
						v-if="selectStage === 2"
						:placeholder="translate.labelWeight.value"
					/>
				</div>
			</div>
		</div>

		<!-- <ParagraphDivider />
		<div class="mt-20px">
			<h1 class="text-3xl">
				{{ $t("顯示欄位：基本資料") }}
			</h1>
		</div>
		<div class="mt-24px">
			<div class="flex mt-40px text-blackLight">
				<div class="w-1/3 pl-16px">{{ $t("※ 國家/州") }}</div>
				<div class="w-1/3 pl-16px">{{ $t("※ 城市/郵遞區號") }}</div>
				<div class="w-1/3 pl-16px">{{ $t("※ 街道地址") }}</div>
			</div>
		</div>
		<ParagraphDivider />
		<div class="mt-20px">
			<h1 class="text-3xl">
				{{ $t("顯示欄位：檢附資料") }}
			</h1>
		</div>
		<div class="mt-24px">
			<Checkbox :binary="true" v-model="enrollProver"> </Checkbox>
			<label for="enrollProver" class="ml-8px text-s text-blackLight">{{
				$t("教學證明")
			}}</label>
		</div> -->

		<div class="bigRedDivider mt-14"></div>
		<div class="flex mt-24px">
			<div class="m-auto">
				<div class="flex">
					<Button
						class="bg-white h-60px w-140px border-ntnuRed p-button-outlined"
						@click="resetChange()"
					>
						<i
							class="ml-1 mr-2 box-border text-sm text-ntnuRed pi pi-times"
						></i>
						<div class="m-auto text-sm text-ntnuRed tracking-2">
							<div>{{ translate.cancel.value }}</div>
						</div>
					</Button>
					<div class="w-24px"></div>
					<Button
						class="bg-Green h-60px w-140px border-ntnuRed"
						@click="saveChange(selectStage)"
					>
						<i
							class="ml-1 mr-2 box-border text-sm text-black pi pi-check"
						></i>
						<div class="m-auto text-sm text-black tracking-2">
							<div>{{ translate.save.value }}</div>
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
import { defineComponent, onMounted } from "vue";
import { useToast } from "primevue/usetoast";
import { reactive, ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useAdmissionAdminAuthStore } from "@/stores/universalAuth";
import { AdmissionAdminAPI } from "@/api/admission/admin/api";
import { useGlobalStore } from "@/stores/globalStore";
import { InvalidSessionError } from "@/api/error";
import { useMutation, useQuery } from "@tanstack/vue-query";
import type { AdmissionAdminScoreFieldResponse } from "@/api/admission/admin/types";

const selectStage = ref(1);
const toast = useToast();
const adminAuth = useAdmissionAdminAuthStore();
const api = new AdmissionAdminAPI(adminAuth);
const store = useGlobalStore();
const fieldData: AdmissionAdminScoreFieldResponse = reactive({});
const { t } = useI18n();
const translate = {
	reviewScoreField: computed(() => t("審查評分欄位")),
	save: computed(() => t("儲存")),
	changeSuccess: computed(() => t("儲存成功")),
	cancel: computed(() => t("取消")),
	scoreOption: computed(() => t("評分項目")),
	scoreOptionSetting: computed(() => t("評分項目設定")),
	stage: {
		"1": computed(() => t("第一階段") + t("（") + t("書面審查") + t("）")),
		"2": computed(() => t("第二階段") + t("（") + t("口試審查") + t("）")),
	},
	stageWeight: {
		"1": computed(() => t("書面審查佔比")),
		"2": computed(() => t("口試審查佔比")),
	},
	labelName: {
		"1": computed(() => t("項目一")),
		"2": computed(() => t("項目二")),
		"3": computed(() => t("項目三")),
		"4": computed(() => t("項目四")),
		"5": computed(() => t("項目五")),
	},
	labelWeight: computed(() => t("佔比")),
};
const changeSuccess = () => {
	toast.add({
		severity: "success",
		summary: translate.changeSuccess.value,
		life: 3000,
	});
};

// API : getScoreField
const getScoreField = useQuery(["scoreField"], async () => {
	try {
		if (store.program) {
			return await api.getScoreField(store.program.id);
		}
	} catch (e: any) {
		if (e instanceof InvalidSessionError) {
			// TODO: getScoreFeild InvalidSessionError message
			console.error("Invalid Session Error");
		}
		alert(e.message);
	}
});

// API : patchScoreField
const patchScoreField = useMutation(
	async (newData: AdmissionAdminScoreFieldResponse) => {
		try {
			if (store.program) {
				return await api.patchScoreField(store.program.id, newData);
			}
		} catch (e: any) {
			if (e instanceof InvalidSessionError) {
				// TODO: patchScoreFeild InvalidSessionError message
				console.error("Invalid Session Error");
			}
			alert(e.message);
		}
	}
);

function saveChange(stage: number) {
	if (stage === 1) {
		if (fieldData.docs_weight)
			fieldData.oral_weight = 100 - fieldData.docs_weight;
		if (fieldData.docs_grade_weight_1 && !fieldData.docs_grade_name_1)
			fieldData.docs_grade_name_1 = translate.labelName[1].value;
		if (fieldData.docs_grade_weight_2 && !fieldData.docs_grade_name_2)
			fieldData.docs_grade_name_2 = translate.labelName[2].value;
		if (fieldData.docs_grade_weight_3 && !fieldData.docs_grade_name_3)
			fieldData.docs_grade_name_3 = translate.labelName[3].value;
		if (fieldData.docs_grade_weight_4 && !fieldData.docs_grade_name_4)
			fieldData.docs_grade_name_4 = translate.labelName[4].value;
		if (fieldData.docs_grade_weight_5 && !fieldData.docs_grade_name_5)
			fieldData.docs_grade_name_5 = translate.labelName[5].value;
	} else if (stage === 2) {
		if (fieldData.oral_weight)
			fieldData.docs_weight = 100 - fieldData.oral_weight;
		if (fieldData.oral_grade_weight_1 && !fieldData.oral_grade_name_1)
			fieldData.oral_grade_name_1 = translate.labelName[1].value;
		if (fieldData.oral_grade_weight_2 && !fieldData.oral_grade_name_2)
			fieldData.oral_grade_name_2 = translate.labelName[2].value;
		if (fieldData.oral_grade_weight_3 && !fieldData.oral_grade_name_3)
			fieldData.oral_grade_name_3 = translate.labelName[3].value;
		if (fieldData.oral_grade_weight_4 && !fieldData.oral_grade_name_4)
			fieldData.oral_grade_name_4 = translate.labelName[4].value;
		if (fieldData.oral_grade_weight_5 && !fieldData.oral_grade_name_5)
			fieldData.oral_grade_name_5 = translate.labelName[5].value;
	} else return;

	// FIXME: Patch doesn't work every time?
	patchScoreField.mutate(fieldData);
	if (patchScoreField.isSuccess) {
		console.log("PATCH SUCCESS!");
		changeSuccess;
	}
}

function resetChange() {
	const getData = getScoreField.data.value;
	fieldData.docs_weight = getData?.docs_weight;
	fieldData.oral_weight = getData?.oral_weight;
	fieldData.docs_grade_name_1 = getData?.docs_grade_name_1;
	fieldData.docs_grade_name_2 = getData?.docs_grade_name_2;
	fieldData.docs_grade_name_3 = getData?.docs_grade_name_3;
	fieldData.docs_grade_name_4 = getData?.docs_grade_name_4;
	fieldData.docs_grade_name_5 = getData?.docs_grade_name_5;
	fieldData.docs_grade_weight_1 = getData?.docs_grade_weight_1;
	fieldData.docs_grade_weight_2 = getData?.docs_grade_weight_2;
	fieldData.docs_grade_weight_3 = getData?.docs_grade_weight_3;
	fieldData.docs_grade_weight_4 = getData?.docs_grade_weight_4;
	fieldData.docs_grade_weight_5 = getData?.docs_grade_weight_5;
	fieldData.oral_grade_name_1 = getData?.oral_grade_name_1;
	fieldData.oral_grade_name_2 = getData?.oral_grade_name_2;
	fieldData.oral_grade_name_3 = getData?.oral_grade_name_3;
	fieldData.oral_grade_name_4 = getData?.oral_grade_name_4;
	fieldData.oral_grade_name_5 = getData?.oral_grade_name_5;
	fieldData.oral_grade_weight_1 = getData?.oral_grade_weight_1;
	fieldData.oral_grade_weight_2 = getData?.oral_grade_weight_2;
	fieldData.oral_grade_weight_3 = getData?.oral_grade_weight_3;
	fieldData.oral_grade_weight_4 = getData?.oral_grade_weight_4;
	fieldData.oral_grade_weight_5 = getData?.oral_grade_weight_5;
}
// Get Data at the begin
resetChange();

function changeStage(stage: number) {
	selectStage.value = stage;
	resetChange();
}
</script>
