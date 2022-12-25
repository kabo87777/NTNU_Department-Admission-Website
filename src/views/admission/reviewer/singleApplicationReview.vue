<template>
	<Layout Reviewer noMargin>
		<template #Header>
			<div flex="~ gap-6">
				<router-link
					to="/admission/reviewer/applicationReview"
					custom
					v-slot="{ navigate }"
				>
					<NButton
						Reviewer
						white
						class="h-8 min-w-32 bg-nBlue-50"
						@click="navigate"
						size="sm"
						role="link"
						icon="pi pi-angle-left"
						>{{ $t("書面資料評閱") }}
					</NButton>
				</router-link>
				<div>{{ ID }}</div>
				<div>{{ name }}</div>
			</div>
		</template>
		<template #Body>
			<NSelect
				Reviewer
				:optionNum="4"
				class="h-12 mt-1 sticky top-0"
				@currentTab="changeView"
			>
				<template #Select1>{{ $t("基本資料") }}</template>
				<template #Select2>{{ $t("檢附資料") }}</template>
				<template #Select3>{{ $t("推薦信") }}</template>
				<template #Select4>{{ $t("整合pdf") }}</template>
			</NSelect>
			<div v-if="!load">
				<vue-pdf-embed
					ref="pdfRef"
					v-if="infoPDF !== ''"
					:source="'data:application/pdf;base64,' + PDF"
					class=""
					:page="Page"
					@rendered="handleDocumentRender"
				/>
				<i
					v-if="infoPDF === ''"
					class="pi pi-spin pi-spinner"
					style="font-size: 2rem"
				/>
			</div>
		</template>
		<template #Footer>
			<!-- Last / Next Page & Toggle Score Field Button set -->
			<div
				class="flex my-1 absolute inset-x-0 bottom-1"
				:class="toggleScoreFieldPosition"
				bg="white opacity-90"
			>
				<NButton
					icon="pi pi-chevron-left"
					@click="Page--"
					:disabled="Page === 1"
					class="h-11 min-w-36 mr-auto"
				>
					<span class="text-base">
						{{ $t("上一頁") }}
					</span>
				</NButton>
				<NButton
					Reviewer
					white
					:icon="toggleScoreFieldIcon"
					iconPos="both"
					@click="toggleScoreField"
					class="h-11 min-w-36"
				>
					<span class="text-base">
						{{ $t("開啟/收合評分面板") }}
					</span>
				</NButton>
				<NButton
					icon="pi pi-chevron-right"
					iconPos="right"
					@click="nextPage"
					:disabled="Page === maxPage"
					class="h-11 min-w-36 ml-auto"
				>
					<span class="text-base">
						{{ $t("下一頁") }}
					</span>
				</NButton>
			</div>

			<!-- Score Fields -->
			<div flex="~ col gap-6" v-if="showScoreField">
				<!-- Score Input -->
				<div flex="~ gap-8">
					<div flex="grow" space="y-1" v-if="score1Proportion !== 0">
						<div text="body">
							{{ score1Title }} ({{ score1Proportion }}%)
						</div>
						<InputText
							type="number"
							v-model="inputScore_1"
							style="width: 100% !important"
						/>
					</div>
					<div flex="grow" space="y-1" v-if="score2Proportion !== 0">
						<div text="body">
							{{ score2Title }} ({{ score2Proportion }}%)
						</div>
						<InputText
							type="number"
							v-model="inputScore_2"
							style="width: 100% !important"
						/>
					</div>
					<div flex="grow" space="y-1" v-if="score3Proportion !== 0">
						<div text="body">
							{{ score3Title }} ({{ score3Proportion }}%)
						</div>
						<InputText
							type="number"
							v-model="inputScore_3"
							style="width: 100% !important"
						/>
					</div>
					<div flex="grow" space="y-1" v-if="score4Proportion !== 0">
						<div text="body">
							{{ score4Title }} ({{ score4Proportion }}%)
						</div>
						<InputText
							type="number"
							v-model="inputScore_4"
							style="width: 100% !important"
						/>
					</div>
					<div flex="grow" space="y-1" v-if="score5Proportion !== 0">
						<div text="body">
							{{ score5Title }} ({{ score5Proportion }}%)
						</div>
						<InputText
							type="number"
							v-model="inputScore_5"
							style="width: 100% !important"
						/>
					</div>
				</div>
				<!-- Access Check -->
				<div flex="~ gap-2" class="items-center">
					<Checkbox
						inputId="binary"
						v-model="accessChecked"
						:binary="true"
						class=""
					/>
					<div class="whitespace-nowrap">
						{{ $t("逕取，逕取原因：") }}
					</div>
					<InputText
						type="text"
						v-model="accessReason"
						class="w-full"
						:disabled="disable"
					/>
				</div>
				<!-- Total Score & Save Button -->
				<div flex="~ gap-6" class="items-center">
					<div flex="~ grow gap-2" class="items-center">
						<div class="whitespace-nowrap">{{ $t("備註") }}：</div>
						<InputText type="text" v-model="remark" w="full" />
					</div>
					<div class="whitespace-nowrap">
						{{ $t("書面分數合計： ") }} {{ total_score }}
						{{ $t("分") }}
					</div>
					<NButton
						Reviewer
						class="min-w-36 h-11 !ml-20px p-button-success"
						@click="saveScore"
						icon="pi pi-save"
					>
						<span class="tracking-1px">{{ $t("保存") }}</span>
					</NButton>
				</div>
			</div>
		</template>
	</Layout>
</template>

<script setup lang="ts">
import InputNumber from "primevue/inputnumber";
import Checkbox from "primevue/checkbox";
import InputText from "primevue/inputtext";
import NButton from "@/styles/CustomButton.vue";
import NSelect from "@/components/SelectButton.vue";
import Layout from "@/components/Layout.vue";
import VuePdfEmbed from "vue-pdf-embed";
import { computed, ref, toRaw } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { useAdmissionReviewerAuthStore } from "@/stores/universalAuth";
import { AdmissionReviewerAPI } from "@/api/admission/reviewer/api";
import { useMutation, useQuery } from "@tanstack/vue-query";
import { useGlobalStore } from "@/stores/AdmissionReviewerStore";
import { useToast } from "primevue/usetoast";

const route = useRoute();
const { t } = useI18n();
const router = useRouter();

const adminAuth = useAdmissionReviewerAuthStore();
const store = useGlobalStore();
const api = new AdmissionReviewerAPI(adminAuth);
const pdfRef = ref(null);
const PDF = ref();
const Page = ref(1);
const maxPage = ref(1);
const showScoreField = ref(true);
const toggleScoreFieldIcon = ref("pi pi-chevron-down");
const toggleScoreFieldPosition = ref("mb-60");

// FIXME: logic may refactor

const ID = computed(() => route.params.id);
const newApplicantGrade = useMutation(async (newProgramData: any) => {
	try {
		return await api.updateSingleApplicantGrade(ID.value, newProgramData);
	} catch (error) {
		toast.add({ severity: "error", summary: "無法保存", life: 3000 });
		console.log(error);
	}
});
const accessChecked = ref();
const disable = computed(() => !accessChecked.value);
const accessReason = ref("");
const score1Proportion = ref(0);
const score2Proportion = ref(0);
const score3Proportion = ref(0);
const score4Proportion = ref(0);
const score5Proportion = ref(0);
const score1Title = ref("");
const score2Title = ref("");
const score3Title = ref("");
const score4Title = ref("");
const score5Title = ref("");
const inputScore_1 = ref("0");
const inputScore_2 = ref("0");
const inputScore_3 = ref("0");
const inputScore_4 = ref("0");
const inputScore_5 = ref("0");
const name = ref("");
const remark = ref("");
const total_score = computed(() => {
	return (
		(+inputScore_1!.value! * score1Proportion.value) / 100 +
		(+inputScore_2!.value! * score2Proportion.value) / 100 +
		(+inputScore_3!.value! * score3Proportion.value) / 100 +
		(+inputScore_4!.value! * score4Proportion.value) / 100 +
		(+inputScore_5!.value! * score5Proportion.value) / 100
	).toFixed(2);
});
const data = ref("基本資料");
const datas = ref(["基本資料", "檢附資料", "推薦信", "整合pdf"]);

const {
	isLoading,
	isError,
	data: applicantGrade,
	error,
} = useQuery(
	["applicantGrade"],
	async () => {
		return await api.getSingleApplicantGrade(ID.value);
	},
	{
		onSuccess: (data) => {
			inputScore_1.value = data!.docs_grade_1.toString();
			inputScore_2.value = data!.docs_grade_2.toString();
			inputScore_3.value = data!.docs_grade_3.toString();
			inputScore_4.value = data!.docs_grade_4.toString();
			inputScore_5.value = data!.docs_grade_5.toString();
			accessChecked.value = data!.isImmediateEnroll;
			accessReason.value = data!.immediate_enroll_comment;
		},
	}
);

const { data: applicantInfo } = useQuery(
	["applicantInfo"],
	async () => {
		return await api.getSingleApplicantInfo(ID.value);
	},
	{
		onSuccess: (data) => {
			name.value = data![0].name;
		},
	}
);

const { data: programGrading } = useQuery(
	["programGrading"],
	async () => {
		return await api.getProgramGrading(store.admissionReviewerProgram!.id);
	},
	{
		onSuccess: (data) => {
			score1Title.value = data!.docs_grade_name_1;
			score2Title.value = data!.docs_grade_name_2;
			score3Title.value = data!.docs_grade_name_3;
			if (data!.docs_grade_name_4) {
				score4Title.value = data!.docs_grade_name_4;
			}
			if (data!.docs_grade_name_5) {
				score5Title.value = data!.docs_grade_name_5;
			}
			if (data!.docs_grade_weight_1 !== 0) {
				score1Proportion.value = data!.docs_grade_weight_1!;
			}
			if (data!.docs_grade_weight_2 !== 0) {
				score2Proportion.value = data!.docs_grade_weight_2!;
			}
			if (data!.docs_grade_weight_3 !== 0) {
				score3Proportion.value = data!.docs_grade_weight_3!;
			}
			if (data!.docs_grade_weight_4 !== 0) {
				score4Proportion.value = data!.docs_grade_weight_4!;
			}
			if (data!.docs_grade_weight_5 !== 0) {
				score5Proportion.value = data!.docs_grade_weight_5!;
			}
		},
	}
);
const infoPDF = ref("");
const recommendLetterPDF = ref("");
const uploadFilePDF = ref("");
const combinePDF = ref("");
useQuery(
	["infoPDF"],
	async () => {
		return await api.getApplicantInfoFile(ID.value);
	},
	{
		onSuccess: (data) => {
			if (infoPDF.value === "") {
				infoPDF.value = data!;
				PDF.value = data!;
			}
		},
	}
);
useQuery(
	["recommendLetterPDF"],
	async () => {
		return await api.getApplicantRecommendLetter(ID.value);
	},
	{
		onSuccess: (data) => {
			if (recommendLetterPDF.value === "") {
				recommendLetterPDF.value = data!;
			}
		},
	}
);
useQuery(
	["combinePDF"],
	async () => {
		return await api.getApplicantCombineFile(ID.value);
	},
	{
		onSuccess: (data) => {
			if (combinePDF.value === "") {
				combinePDF.value = data!;
			}
		},
	}
);
useQuery(
	["uploadFilePDF"],
	async () => {
		return await api.getApplicantCategoryCombineFile(ID.value);
	},
	{
		onSuccess: (data) => {
			if (uploadFilePDF.value === "") {
				uploadFilePDF.value = data!;
			}
		},
	}
);

function handleDocumentRender() {
	const target_copy = Object.assign({}, toRaw(pdfRef.value));
	maxPage.value = target_copy["pageCount"];
}

function changeView(currentTab: number) {
	Page.value = 1;
	switch (currentTab) {
		case 1:
			PDF.value = infoPDF.value;
			data.value = "基本資料";
			break;
		case 2:
			PDF.value = uploadFilePDF.value;
			data.value = "檢附資料";
			break;
		case 3:
			PDF.value = recommendLetterPDF.value;
			data.value = "推薦信";
			break;
		case 4:
			PDF.value = combinePDF.value;
			data.value = "整合pdf";
			break;
		default:
			break;
	}
}

function nextPage() {
	Page.value++;
	window.scrollTo(0, 0);
}
function toggleScoreField() {
	if (showScoreField.value) {
		showScoreField.value = false;
		toggleScoreFieldPosition.value = "mb-5";
		toggleScoreFieldIcon.value = "pi pi-chevron-up";
	} else {
		showScoreField.value = true;
		toggleScoreFieldPosition.value = "mb-60";
		toggleScoreFieldIcon.value = "pi pi-chevron-down";
	}
}

const load = computed(() => {
	if (isLoading.value) {
		return true;
	}
	return false;
});

const toast = useToast();
function saveScore() {
	const today = new Date();
	if (
		+inputScore_1.value > 100 ||
		+inputScore_2.value > 100 ||
		+inputScore_3.value > 100
	) {
		toast.add({
			severity: "error",
			summary: "成績請輸入0~100",
			life: 3000,
		});
		return;
	}
	if (
		+inputScore_1.value < 0 ||
		+inputScore_2.value < 0 ||
		+inputScore_3.value < 0
	) {
		toast.add({
			severity: "error",
			summary: "成績請輸入0~100",
			life: 3000,
		});
		return;
	}
	if (accessChecked.value && !accessReason.value) {
		toast.add({ severity: "error", summary: "請輸入理由", life: 3000 });
		return;
	}
	try {
		newApplicantGrade.mutate({
			docs_grade_1: inputScore_1.value,
			docs_grade_2: inputScore_2.value,
			docs_grade_3: inputScore_3.value,
			docs_grade_4: inputScore_4.value,
			docs_grade_5: inputScore_5.value,
			isImmediateEnroll: accessChecked.value,
			immediate_enroll_comment: accessReason.value,
		});
		toast.add({ severity: "success", summary: "保存成功", life: 3000 });
	} catch (error) {
		// console.log(error);
	}
}
</script>

<style lang="scss">
.p-inputnumber {
	width: 20% !important;
}
</style>
