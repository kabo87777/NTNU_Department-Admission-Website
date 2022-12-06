<template>
	<div v-if="load"></div>
	<div v-else>
		<div class="flex">
			<router-link
				to="/admission/reviewer/oralReview"
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
						{{ $t("口試資料評閱") }}
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
				:source="'data:application/pdf;base64,' + pdfData"
				class="!h-1600px"
				:page="page"
			/>
			<Button
				label="上一頁"
				icon="pi pi-chevron-left"
				iconPos="left"
				@click="page--"
				:disabled="page === 1"
				class="!mt-120px"
			/>
			<Button
				label="下一頁"
				icon="pi pi-chevron-right"
				iconPos="right"
				@click="page++"
				:disabled="page === 4"
				class="!ml-1030px"
			/>
		</div>
		<div class="bigBlueDivider"></div>
		<div class="flex mt-16px">
			<div class="text-xl mt-5px">
				{{ oscore1Title }} ({{ oscore1Proportion }}%)
			</div>
			<InputNumber
				inputId="integeronly"
				v-model="oinputScore_1"
				class="ml-34px !w-132px !h-44px"
			/>
			<div class="text-xl ml-125px mt-5px">
				{{ oscore2Title }} ({{ oscore2Proportion }}%)
			</div>
			<InputNumber
				inputId="integeronly"
				v-model="oinputScore_2"
				class="ml-34px !w-132px !h-44px"
			/>
			<div class="text-xl ml-125px mt-5px">
				{{ oscore3Title }} ({{ oscore3Proportion }}%)
			</div>
			<InputNumber
				inputId="integeronly"
				v-model="oinputScore_3"
				class="ml-34px !w-132px !h-44px"
			/>
		</div>
		<div class="flex mt-16px" v-if="programGrading?.oral_grade_name_4">
			<div class="text-xl mt-5px">
				{{ oscore4Title }} ({{ oscore4Proportion }}%)
			</div>
			<InputNumber
				inputId="integeronly"
				v-model="oinputScore_4"
				class="ml-34px !w-132px !h-44px"
			/>
			<div
				class="text-xl ml-125px mt-5px"
				v-if="programGrading?.oral_grade_name_5"
			>
				{{ oscore5Title }} ({{ oscore5Proportion }}%)
			</div>
			<InputNumber
				inputId="integeronly"
				v-model="oinputScore_5"
				class="ml-34px !w-132px !h-44px"
				v-if="programGrading?.oral_grade_name_5"
			/>
		</div>
		<div class="flex mt-24px">
			<div>{{ $t("書面分數：") }} {{ total_score }} {{ $t("分") }}</div>
			<div class="text-xl ml-180px mt-5px">
				{{ $t("口試分數合計： ") }} {{ oral_score }} {{ $t("分") }}
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
import PDFView from "@/components/pdfPreview.vue";
import jsPdf from "./test.pdf";
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

const page = ref(1);
const data = ref("基本資料");
const datas = ref(["基本資料", "檢附資料", "推薦信", "整合pdf"]);

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
const score1Proportion = ref(30);
const score2Proportion = ref(30);
const score3Proportion = ref(40);
const score4Proportion = ref(0);
const score5Proportion = ref(0);
const oscore1Proportion = ref(30);
const oscore2Proportion = ref(30);
const oscore3Proportion = ref(40);
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
const oinputScore_1 = ref(0);
const oinputScore_2 = ref(0);
const oinputScore_3 = ref(0);
const oinputScore_4 = ref(0);
const oinputScore_5 = ref(0);
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
		(oinputScore_1!.value! * oscore1Proportion.value) / 100 +
		(oinputScore_2!.value! * oscore2Proportion.value) / 100 +
		(oinputScore_3!.value! * oscore3Proportion.value) / 100 +
		(oinputScore_4!.value! * oscore4Proportion.value) / 100 +
		(oinputScore_5!.value! * oscore5Proportion.value) / 100
	);
});

const {
	isLoading,
	isError,
	data: applicantGrade,
	error,
} = useQuery(
	["applicantGrade"],
	async () => {
		try {
			return await api.getSingleApplicantGrade(ID.value);
		} catch (e: any) {
			if (e instanceof InvalidSessionError) {
				// FIXME: show session expiry notification??
				// Why are we even here in the first place?
				// MainContainer should have checked already.
				console.error(
					"Session has already expired while querying programList"
				);
				router.push("/");
				return;
			}
		}
	},
	{
		onSuccess: (data) => {
			oinputScore_1.value = data!.oral_grade_1;
			oinputScore_2.value = data!.oral_grade_2;
			oinputScore_3.value = data!.oral_grade_3;
			oinputScore_4.value = data!.oral_grade_4;
			oinputScore_5.value = data!.oral_grade_5;
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
		try {
			return await api.getSingleApplicantInfo(ID.value);
		} catch (e: any) {
			if (e instanceof InvalidSessionError) {
				// FIXME: show session expiry notification??
				// Why are we even here in the first place?
				// MainContainer should have checked already.
				console.error(
					"Session has already expired while querying applicantInfo"
				);
				router.push("/");
				return;
			}
		}
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
		try {
			return await api.getProgramGrading(
				store.admissionReviewerProgram!.id
			);
		} catch (e: any) {
			if (e instanceof InvalidSessionError) {
				// FIXME: show session expiry notification??
				// Why are we even here in the first place?
				// MainContainer should have checked already.
				console.error(
					"Session has already expired while querying applicantInfo"
				);
				router.push("/");
				return;
			}
		}
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
			score1Proportion.value = data!.docs_grade_weight_1;
			score2Proportion.value = data!.docs_grade_weight_2;
			score3Proportion.value = data!.docs_grade_weight_3;
			if (data!.docs_grade_weight_4) {
				score4Proportion.value = data!.docs_grade_weight_4;
			}
			if (data!.docs_grade_weight_5) {
				score5Proportion.value = data!.docs_grade_weight_5;
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
			oscore1Proportion.value = data!.oral_grade_weight_1;
			oscore2Proportion.value = data!.oral_grade_weight_2;
			oscore3Proportion.value = data!.oral_grade_weight_3;
			if (data!.oral_grade_weight_4) {
				oscore4Proportion.value = data!.oral_grade_weight_4;
			}
			if (data!.oral_grade_weight_5) {
				oscore5Proportion.value = data!.oral_grade_weight_5;
			}
		},
	}
);

const pdfData = ref("JVBERi0xLjMKJcTl8uXrp/");
const { data: pdfBase64 } = useQuery(
	["pdfBase64"],
	async () => {
		try {
			return await api.getApplicantSingleFile("1", 1);
		} catch (e: any) {
			if (e instanceof InvalidSessionError) {
				// FIXME: show session expiry notification??
				// Why are we even here in the first place?
				// MainContainer should have checked already.
				console.error(
					"Session has already expired while querying applicantInfo"
				);
				router.push("/");
				return;
			}
		}
	},
	{
		onSuccess: (data) => {
			pdfData.value = data!;
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
		oinputScore_1.value > 100 ||
		oinputScore_2.value > 100 ||
		oinputScore_3.value > 100
	) {
		toast.add({
			severity: "error",
			summary: "成績請輸入0~100",
			life: 3000,
		});
		return;
	}
	if (
		oinputScore_1.value < 0 ||
		oinputScore_2.value < 0 ||
		oinputScore_3.value < 0
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
	} catch (error) {
		// console.log(error);
	}
}
</script>
