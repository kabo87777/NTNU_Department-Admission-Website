<template>
	<div class="mx-32 mt-16">
		<h1 class="text-4xl text-bold tracking-widest">
			{{ $t("審查評分欄位") }}
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
					{{ $t("第一階段（書面審查）") }}
				</div>
				<div v-else>{{ $t("第一階段（書面審查）") }}</div>
			</button>
			<button class="w-1/2 gap-2" @click="changeStage(2)">
				<div
					class="p-2"
					bg="red-200"
					border="rounded-lg"
					v-if="selectStage === 2"
				>
					{{ $t("第二階段（口試審查）") }}
				</div>
				<div v-else>{{ $t("第二階段（口試審查）") }}</div>
			</button>
		</div>

		<!-- StageScore -->
		<div>
			<h1 class="text-xl my-6">{{ $t("評分項目設定") }}</h1>
			<div class="space-y-2" v-if="selectStage === 1">
				<div>{{ $t("書面階段審查佔比") }}</div>
				<InputNumber class="!w-300px" v-model="fieldData.docs_weight" />
			</div>
			<div class="space-y-2" v-if="selectStage === 2">
				<div>{{ $t("口試審查總佔比") }}</div>
				<InputNumber class="!w-300px" v-model="fieldData.docs_weight" />
			</div>
		</div>
		<!-- ScoreField -->
		<div class="my-6">
			<div class="my-4 space-y-4">
				<div>{{ translate.scoreOption }}</div>
				<!-- ScoreField 1 -->
				<div class="flex content-center gap-4">
					<InputText
						class="!w-300px"
						v-model="fieldData.docs_grade_name_1"
						v-if="selectStage === 1"
						:placeholder="translate.labelName[1]"
					/>
					<InputNumber
						class="!w-200px"
						v-model="fieldData.docs_grade_weight_1"
						v-if="selectStage === 1"
						:placeholder="translate.labelProp"
					/>
					<InputText
						class="!w-300px"
						v-model="fieldData.oral_grade_name_1"
						v-if="selectStage === 2"
						:placeholder="translate.labelName[1]"
					/>
					<InputNumber
						class="!w-200px"
						v-model="fieldData.oral_grade_weight_1"
						v-if="selectStage === 2"
						:placeholder="translate.labelProp"
					/>
				</div>
				<!-- ScoreField 2 -->
				<div class="flex content-center gap-4">
					<InputText
						class="!w-300px"
						v-model="fieldData.docs_grade_name_2"
						v-if="selectStage === 1"
						:placeholder="translate.labelName[2]"
					/>
					<InputNumber
						class="!w-200px"
						v-model="fieldData.docs_grade_weight_2"
						v-if="selectStage === 1"
						:placeholder="translate.labelProp"
					/>
					<InputText
						class="!w-300px"
						v-model="fieldData.oral_grade_name_2"
						v-if="selectStage === 2"
						:placeholder="translate.labelName[2]"
					/>
					<InputNumber
						class="!w-200px"
						v-model="fieldData.oral_grade_weight_2"
						v-if="selectStage === 2"
						:placeholder="translate.labelProp"
					/>
				</div>
				<!-- ScoreField 3 -->
				<div class="flex content-center gap-4">
					<InputText
						class="!w-300px"
						v-model="fieldData.docs_grade_name_3"
						v-if="selectStage === 1"
						:placeholder="translate.labelName[3]"
					/>
					<InputNumber
						class="!w-200px"
						v-model="fieldData.docs_grade_weight_3"
						v-if="selectStage === 1"
						:placeholder="translate.labelProp"
					/>
					<InputText
						class="!w-300px"
						v-model="fieldData.oral_grade_name_3"
						v-if="selectStage === 2"
						:placeholder="translate.labelName[3]"
					/>
					<InputNumber
						class="!w-200px"
						v-model="fieldData.oral_grade_weight_3"
						v-if="selectStage === 2"
						:placeholder="translate.labelProp"
					/>
				</div>
				<!-- ScoreField 4 -->
				<div class="flex content-center gap-4">
					<InputText
						class="!w-300px"
						v-model="fieldData.docs_grade_name_4"
						v-if="selectStage === 1"
						:placeholder="translate.labelName[4]"
					/>
					<InputNumber
						class="!w-200px"
						v-model="fieldData.docs_grade_weight_4"
						v-if="selectStage === 1"
						:placeholder="translate.labelProp"
					/>
					<InputText
						class="!w-300px"
						v-model="fieldData.oral_grade_name_4"
						v-if="selectStage === 2"
						:placeholder="translate.labelName[4]"
					/>
					<InputNumber
						class="!w-200px"
						v-model="fieldData.oral_grade_weight_4"
						v-if="selectStage === 2"
						:placeholder="translate.labelProp"
					/>
				</div>
				<!-- ScoreField 5 -->
				<div class="flex content-center gap-4">
					<InputText
						class="!w-300px"
						v-model="fieldData.docs_grade_name_5"
						v-if="selectStage === 1"
						:placeholder="translate.labelName[5]"
					/>
					<InputNumber
						class="!w-200px"
						v-model="fieldData.docs_grade_weight_5"
						v-if="selectStage === 1"
						:placeholder="translate.labelProp"
					/>
					<InputText
						class="!w-300px"
						v-model="fieldData.oral_grade_name_5"
						v-if="selectStage === 2"
						:placeholder="translate.labelName[5]"
					/>
					<InputNumber
						class="!w-200px"
						v-model="fieldData.oral_grade_weight_5"
						v-if="selectStage === 2"
						:placeholder="translate.labelProp"
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
						@click="resetChange(selectStage)"
					>
						<i
							class="ml-1 mr-2 box-border text-sm text-ntnuRed pi pi-times"
						></i>
						<div class="m-auto text-sm text-ntnuRed tracking-2">
							<div>{{ translate.cancel }}</div>
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
							<div>{{ translate.save }}</div>
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
import Checkbox from "primevue/checkbox";
import ParagraphDivider from "../styles/paragraphDivider.vue";
import { reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useAdmissionAdminAuthStore } from "@/stores/universalAuth";
import { AdmissionAdminAPI } from "@/api/admission/admin/api";
import { useGlobalStore } from "@/stores/globalStore";
import type { AdmissionAdminScoreFieldResponse } from "@/api/admission/admin/types";
import { InvalidSessionError } from "@/api/error";
import { AdmissionApplicantAPI } from "@/api/admission/applicant/api";
import { useMutation } from "@tanstack/vue-query";
import { boolean, number, string } from "yup";

const selectStage = ref(1);
const adminAuth = useAdmissionAdminAuthStore();
const store = useGlobalStore();
const api = new AdmissionAdminAPI(adminAuth);
const fieldData: AdmissionAdminScoreFieldResponse = reactive({
	docs_weight: 50,
	oral_weight: 50,
});
const { t } = useI18n();
const translate = reactive({
	save: t("儲存"),
	cancel: t("取消"),
	scoreOption: t("評分項目"),
	labelProp: t("佔比"),
	labelName: {
		"1": t("項目一名稱") + t("（未輸入）"),
		"2": t("項目二名稱") + t("（未輸入）"),
		"3": t("項目三名稱") + t("（未輸入）"),
		"4": t("項目四名稱") + t("（未輸入）"),
		"5": t("項目五名稱") + t("（未輸入）"),
	},
});

// API : patchScoreFeild
const scoreField = useMutation(
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
		}
	}
);

function cleanData() {
	fieldData.docs_grade_name_1 = undefined;
	fieldData.docs_grade_name_2 = undefined;
	fieldData.docs_grade_name_3 = undefined;
	fieldData.docs_grade_name_4 = undefined;
	fieldData.docs_grade_name_5 = undefined;
	fieldData.oral_grade_name_1 = undefined;
	fieldData.oral_grade_name_2 = undefined;
	fieldData.oral_grade_name_3 = undefined;
	fieldData.oral_grade_name_4 = undefined;
	fieldData.oral_grade_name_5 = undefined;
	fieldData.docs_grade_weight_1 = 0;
	fieldData.docs_grade_weight_2 = 0;
	fieldData.docs_grade_weight_3 = 0;
	fieldData.docs_grade_weight_4 = 0;
	fieldData.docs_grade_weight_5 = 0;
	fieldData.oral_grade_weight_1 = 0;
	fieldData.oral_grade_weight_2 = 0;
	fieldData.oral_grade_weight_3 = 0;
	fieldData.oral_grade_weight_4 = 0;
	fieldData.oral_grade_weight_5 = 0;
}

function changeStage(stage: number) {
	selectStage.value = stage;
	cleanData();
}

function saveChange(stage: number) {
	if (stage === 1) fieldData.oral_weight = 100 - fieldData.docs_weight;
	else fieldData.docs_weight = 100 - fieldData.oral_weight;

	scoreField.mutate(fieldData);
}

function resetChange(stage: number) {
	cleanData();
}
</script>
