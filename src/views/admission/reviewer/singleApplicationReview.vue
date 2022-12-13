<template>
	<div v-if="load"></div>
	<div v-else>
		<div class="flex">
			<router-link
				to="/admission/reviewer/applicationReview"
				custom
				v-slot="{ navigate }"
			>
				<Button
					class="p-button-secondary p-button-text !w-164px !h-29px"
					@click="navigate"
					role="link"
				>
					<img
						alt="logo"
						src="/assets/reviewer-page/Expand_left.png"
						style="width: 1.5rem"
					/>
					<span class="text-base">
						{{ $t("書面資料評閱") }}
					</span>
				</Button>
			</router-link>
			<div class="text-[32px] ml-24px">
				{{ ID }}
			</div>
			<div class="text-[32px] ml-20px">
				{{ name }}
			</div>
		</div>
		<div class="bigBlueDivider"></div>
		<div class="p-fluid !mt-5px">
			<SelectButton
				v-model="data"
				:options="datas"
				aria-labelledby="single"
			/>
		</div>
		<div class="mt-10px !h-1830px !ml-40px">
			<vue-pdf-embed
				v-if="data === '基本資料'"
				:source="'data:application/pdf;base64,' + infoPDF"
				class="!h-1600px"
				:page="page"
			/>
			<vue-pdf-embed
				v-if="data === '檢附資料'"
				:source="'data:application/pdf;base64,' + uploadFilePDF"
				class="!h-1600px"
				:page="page"
			/>
			<vue-pdf-embed
				v-if="data === '推薦信'"
				:source="'data:application/pdf;base64,' + recommendLetterPDF"
				class="!h-1600px"
				:page="page"
			/>
			<vue-pdf-embed
				v-if="data === '整合pdf'"
				:source="'data:application/pdf;base64,' + combinePDF"
				class="!h-1600px"
				:page="page"
			/>
			<div class="flex !mt-120px justify-around">
				<Button
					label="上一頁"
					icon="pi pi-chevron-left"
					iconPos="left"
					@click="page--"
					:disabled="page === 1"
					class="!w-200px !h-40px"
				/>
				<Button
					label="下一頁"
					icon="pi pi-chevron-right"
					iconPos="right"
					@click="page++"
					:disabled="page === 4"
					class="!w-200px !h-40px"
				/>
			</div>
		</div>
		<div class="bigBlueDivider"></div>
		<div class="flex mt-10px">
			<div class="text-xl mt-5px" v-if="score1Proportion !== 0">
				{{ score1Title }} ({{ score1Proportion }}%)
			</div>
			<InputNumber
				inputId="integeronly"
				v-model="inputScore_1"
				class="ml-34px !w-132px !h-44px"
				v-if="score1Proportion !== 0"
			/>
			<div class="text-xl ml-125px mt-5px" v-if="score2Proportion !== 0">
				{{ score2Title }} ({{ score2Proportion }}%)
			</div>
			<InputNumber
				inputId="integeronly"
				v-model="inputScore_2"
				class="ml-34px !w-132px !h-44px"
				v-if="score2Proportion !== 0"
			/>
			<div class="text-xl ml-125px mt-5px" v-if="score3Proportion !== 0">
				{{ score3Title }} ({{ score3Proportion }}%)
			</div>
			<InputNumber
				inputId="integeronly"
				v-model="inputScore_3"
				class="ml-34px !w-132px !h-44px"
				v-if="score3Proportion !== 0"
			/>
		</div>
		<div
			class="flex mt-10px"
			v-if="score4Proportion !== 0 || score5Proportion !== 0"
		>
			<div class="text-xl mt-5px" v-if="score4Proportion !== 0">
				{{ score4Title }} ({{ score4Proportion }}%)
			</div>
			<InputNumber
				inputId="integeronly"
				v-model="inputScore_4"
				class="ml-34px !w-132px !h-44px"
				v-if="score4Proportion !== 0"
			/>
			<div class="text-xl ml-125px mt-5px" v-if="score5Proportion !== 0">
				{{ score5Title }} ({{ score5Proportion }}%)
			</div>
			<InputNumber
				inputId="integeronly"
				v-model="inputScore_5"
				class="ml-34px !w-132px !h-44px"
				v-if="score5Proportion !== 0"
			/>
		</div>
		<div class="flex mt-10px">
			<div class="text-xl mt-5px">
				{{ $t("備註：") }}
			</div>
			<InputText
				type="text"
				v-model="remark"
				class="!w-683px !h-44px ml-5px"
			/>
		</div>
		<div class="flex mt-10px">
			<Checkbox
				inputId="binary"
				v-model="accessChecked"
				:binary="true"
				class="!w-31px !h-31px mt-9px"
			/>
			<div class="text-xl ml-5px mt-5px">
				{{ $t("逕取，逕取原因：") }}
			</div>
			<InputText
				type="text"
				v-model="accessReason"
				class="!w-549px !h-44px ml-5px"
				:disabled="disable"
			/>
			<div class="text-xl ml-180px mt-5px">
				{{ $t("書面分數合計： ") }} {{ total_score }} {{ $t("分") }}
			</div>
			<Button
				class="w-100px h-40px !ml-20px p-button-success"
				@click="saveScore"
			>
				<img
					alt="logo"
					src="/assets/project-setting/Check_fill.png"
					style="width: 1.5rem"
					class="fill-green-500"
				/>
				<span class="tracking-1px">{{ $t("保存") }}</span>
			</Button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import Button from "primevue/button";
import InputNumber from "primevue/inputnumber";
import Checkbox from "primevue/checkbox";
import InputText from "primevue/inputtext";
import { useI18n } from "vue-i18n";
import { useAdmissionReviewerAuthStore } from "@/stores/universalAuth";
import { AdmissionReviewerAPI } from "@/api/admission/reviewer/api";
import { useMutation, useQuery } from "@tanstack/vue-query";
import { InvalidSessionError } from "@/api/error";
import { useGlobalStore } from "@/stores/AdmissionReviewerStore";
import { useToast } from "primevue/usetoast";
import SelectButton from "primevue/selectbutton";
import VuePdfEmbed from "vue-pdf-embed";

const route = useRoute();
const { t } = useI18n();
const router = useRouter();

const adminAuth = useAdmissionReviewerAuthStore();
const store = useGlobalStore();
const api = new AdmissionReviewerAPI(adminAuth);

// FIXME: logic may refactor

const page = ref(1);
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
const inputScore_1 = ref(0);
const inputScore_2 = ref(0);
const inputScore_3 = ref(0);
const inputScore_4 = ref(0);
const inputScore_5 = ref(0);
const name = ref("");
const remark = ref("");
const total_score = computed(() => {
	return (
		(inputScore_1!.value! * score1Proportion.value) / 100 +
		(inputScore_2!.value! * score2Proportion.value) / 100 +
		(inputScore_3!.value! * score3Proportion.value) / 100 +
		(inputScore_4!.value! * score4Proportion.value) / 100 +
		(inputScore_5!.value! * score5Proportion.value) / 100
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
		inputScore_1.value > 100 ||
		inputScore_2.value > 100 ||
		inputScore_3.value > 100
	) {
		toast.add({
			severity: "error",
			summary: "成績請輸入0~100",
			life: 3000,
		});
		return;
	}
	if (
		inputScore_1.value < 0 ||
		inputScore_2.value < 0 ||
		inputScore_3.value < 0
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
