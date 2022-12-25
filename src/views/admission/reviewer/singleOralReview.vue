<template>
	<Layout Reviewer noMargin>
		<template #Header>
			<div flex="~ gap-6">
				<router-link
					to="/admission/reviewer/oralReview"
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
						>{{ $t("口試資料評閱") }}
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
				></i>
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
					<div flex="grow" space="y-1" v-if="oscore1Proportion !== 0">
						<div text="body">
							{{ oscore1Title }} ({{ oscore1Proportion }}%)
						</div>
						<InputText
							type="number"
							v-model="oinputScore_1"
							style="width: 100% !important"
						/>
					</div>
					<div flex="grow" space="y-1" v-if="oscore2Proportion !== 0">
						<div text="body">
							{{ oscore2Title }} ({{ oscore2Proportion }}%)
						</div>
						<InputText
							type="number"
							v-model="oinputScore_2"
							style="width: 100% !important"
						/>
					</div>
					<div flex="grow" space="y-1" v-if="oscore3Proportion !== 0">
						<div text="body">
							{{ oscore3Title }} ({{ oscore3Proportion }}%)
						</div>
						<InputText
							type="number"
							v-model="oinputScore_3"
							style="width: 100% !important"
						/>
					</div>
					<div flex="grow" space="y-1" v-if="oscore4Proportion !== 0">
						<div text="body">
							{{ oscore4Title }} ({{ oscore4Proportion }}%)
						</div>
						<InputText
							type="number"
							v-model="oinputScore_4"
							style="width: 100% !important"
						/>
					</div>
					<div flex="grow" space="y-1" v-if="oscore5Proportion !== 0">
						<div text="body">
							{{ oscore5Title }} ({{ oscore5Proportion }}%)
						</div>
						<InputText
							type="number"
							v-model="oinputScore_5"
							style="width: 100% !important"
						/>
					</div>
				</div>
				<!-- Total Score & Save Button -->
				<div flex="~" justify="center" pos="relative">
					<NButton
						Reviewer
						class="min-w-36 h-11 !ml-20px p-button-success"
						@click="saveScore"
						icon="pi pi-save"
					>
						<span class="tracking-1px">{{ $t("保存") }}</span>
					</NButton>
					<div flex="~ gap-6" pos="absolute right-0 bottom-0">
						<div class="whitespace-nowrap" text="body">
							{{ $t("書面分數合計： ") }} {{ total_score }}
							{{ $t("分") }}
						</div>
						<div class="whitespace-nowrap" text="body">
							{{ $t("口試分數合計： ") }} {{ oral_score }}
							{{ $t("分") }}
						</div>
					</div>
				</div>
			</div>
		</template>
	</Layout>
</template>

<script setup lang="ts">
import InputNumber from "primevue/inputnumber";
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
import { InvalidSessionError } from "@/api/error";
import { useGlobalStore } from "@/stores/AdmissionReviewerStore";
import { useToast } from "primevue/usetoast";

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const toast = useToast();

const adminAuth = useAdmissionReviewerAuthStore();
const store = useGlobalStore();
const api = new AdmissionReviewerAPI(adminAuth);
const pdfRef = ref(null);
const PDF = ref();
const Page = ref(1);
const maxPage = ref(1);

const page = ref(1);
const data = ref("基本資料");
const datas = ref(["基本資料", "檢附資料", "推薦信", "整合pdf"]);
const showScoreField = ref(true);
const toggleScoreFieldIcon = ref("pi pi-chevron-down");
const toggleScoreFieldPosition = ref("mb-40");

// FIXME: logic may refactor

const ID = computed(() => route.params.id);
const accessChecked = ref();
const disable = computed(() => !accessChecked.value);
const accessReason = ref("");
const score1Proportion = ref(30);
const score2Proportion = ref(30);
const score3Proportion = ref(40);
const score4Proportion = ref(0);
const score5Proportion = ref(0);
const oscore1Proportion = ref(0);
const oscore2Proportion = ref(0);
const oscore3Proportion = ref(0);
const oscore4Proportion = ref(0);
const oscore5Proportion = ref(0);
const score1Title = ref("");
const score2Title = ref("");
const score3Title = ref("");
const score4Title = ref("");
const score5Title = ref("");
const oscore1Title = ref("");
const oscore2Title = ref("");
const oscore3Title = ref("");
const oscore4Title = ref("");
const oscore5Title = ref("");
const inputScore_1 = ref(0);
const inputScore_2 = ref(0);
const inputScore_3 = ref(0);
const inputScore_4 = ref(0);
const inputScore_5 = ref(0);
const oinputScore_1 = ref("0");
const oinputScore_2 = ref("0");
const oinputScore_3 = ref("0");
const oinputScore_4 = ref("0");
const oinputScore_5 = ref("0");
const name = ref("");
const total_score = computed(() => {
	return (
		(inputScore_1!.value! * score1Proportion.value) / 100 +
		(inputScore_2!.value! * score2Proportion.value) / 100 +
		(inputScore_3!.value! * score3Proportion.value) / 100 +
		(inputScore_4!.value! * score4Proportion.value) / 100 +
		(inputScore_5!.value! * score5Proportion.value) / 100
	);
});
const oral_score = computed(() => {
	return (
		(+oinputScore_1!.value! * score1Proportion.value) / 100 +
		(+oinputScore_2!.value! * score2Proportion.value) / 100 +
		(+oinputScore_3!.value! * score3Proportion.value) / 100 +
		(+oinputScore_4!.value! * score4Proportion.value) / 100 +
		(+oinputScore_5!.value! * score5Proportion.value) / 100
	);
});

const infoPDF = ref("");
const recommendLetterPDF = ref("");
const uploadFilePDF = ref("");
const combinePDF = ref("");

const newApplicantGrade = useMutation(async (newProgramData: any) => {
	try {
		return await api.updateSingleApplicantGrade(ID.value, newProgramData);
	} catch (error) {
		toast.add({ severity: "error", summary: "無法保存", life: 3000 });
		console.log(error);
	}
});

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
			oinputScore_1.value = data!.oral_grade_1.toString();
			oinputScore_2.value = data!.oral_grade_2.toString();
			oinputScore_3.value = data!.oral_grade_3.toString();
			oinputScore_4.value = data!.oral_grade_4.toString();
			oinputScore_5.value = data!.oral_grade_5.toString();
			inputScore_1.value = data!.docs_grade_1;
			inputScore_2.value = data!.docs_grade_2;
			inputScore_3.value = data!.docs_grade_3;
			inputScore_4.value = data!.docs_grade_4;
			inputScore_5.value = data!.docs_grade_5;
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
			//docs section
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

			//oral section
			oscore1Title.value = data!.oral_grade_name_1;
			oscore2Title.value = data!.oral_grade_name_2;
			oscore3Title.value = data!.oral_grade_name_3;
			if (data!.oral_grade_name_4) {
				oscore4Title.value = data!.oral_grade_name_4;
			}
			if (data!.oral_grade_name_5) {
				oscore5Title.value = data!.oral_grade_name_5;
			}
			if (data!.oral_grade_weight_1 !== 0) {
				oscore1Proportion.value = data!.oral_grade_weight_1!;
			}
			if (data!.oral_grade_weight_2 !== 0) {
				oscore2Proportion.value = data!.oral_grade_weight_2!;
			}
			if (data!.oral_grade_weight_3 !== 0) {
				oscore3Proportion.value = data!.oral_grade_weight_3!;
			}
			if (data!.oral_grade_weight_4 !== 0) {
				oscore4Proportion.value = data!.oral_grade_weight_4!;
			}
			if (data!.oral_grade_weight_5 !== 0) {
				oscore5Proportion.value = data!.oral_grade_weight_5!;
			}
		},
	}
);

const load = computed(() => {
	if (isLoading.value) {
		return true;
	}
	return false;
});

useQuery(
	["infoPDF"],
	async () => {
		return await api.getApplicantInfoFile(ID.value);
	},
	{
		onSuccess: (data) => {
			infoPDF.value = data!;
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
			recommendLetterPDF.value = data!;
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
			combinePDF.value = data!;
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
			uploadFilePDF.value = data!;
		},
	}
);
function handleDocumentRender() {
	const target_copy = Object.assign({}, toRaw(pdfRef.value));
	maxPage.value = target_copy["pageCount"];
}

function changeInfo() {
	PDF.value = infoPDF.value;
	Page.value = 1;
	data.value = "基本資料";
}
function changeRecommendLetter() {
	PDF.value = recommendLetterPDF.value;
	Page.value = 1;
	data.value = "推薦信";
}
function changeCombine() {
	PDF.value = combinePDF.value;
	Page.value = 1;
	data.value = "整合pdf";
}
function changeUploadFile() {
	PDF.value = uploadFilePDF.value;
	Page.value = 1;
	data.value = "檢附資料";
}
function nextPage() {
	Page.value++;
	window.scrollTo(0, 0);
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

function toggleScoreField() {
	if (showScoreField.value) {
		showScoreField.value = false;
		toggleScoreFieldPosition.value = "mb-5";
		toggleScoreFieldIcon.value = "pi pi-chevron-up";
	} else {
		showScoreField.value = true;
		toggleScoreFieldPosition.value = "mb-40";
		toggleScoreFieldIcon.value = "pi pi-chevron-down";
	}
}

function saveScore() {
	const today = new Date();
	if (
		+oinputScore_1.value > 100 ||
		+oinputScore_2.value > 100 ||
		+oinputScore_3.value > 100
	) {
		toast.add({
			severity: "error",
			summary: "成績請輸入0~100",
			life: 3000,
		});
		return;
	}
	if (
		+oinputScore_1.value < 0 ||
		+oinputScore_2.value < 0 ||
		+oinputScore_3.value < 0
	) {
		toast.add({
			severity: "error",
			summary: "成績請輸入0~100",
			life: 3000,
		});
		return;
	}
	// if (accessChecked.value && !accessReason.value) {
	// 	toast.add({ severity: "error", summary: "請輸入理由", life: 3000 });
	// 	return;
	// }
	try {
		newApplicantGrade.mutate({
			oral_grade_1: oinputScore_1.value,
			oral_grade_2: oinputScore_2.value,
			oral_grade_3: oinputScore_3.value,
			oral_grade_4: oinputScore_4.value,
			oral_grade_5: oinputScore_5.value,
			// isImmediateEnroll: accessChecked.value,
			// immediate_enroll_comment: accessReason.value,
		});
		toast.add({ severity: "success", summary: "保存成功", life: 3000 });
	} catch (error) {
		// console.log(error);
	}
}
</script>
