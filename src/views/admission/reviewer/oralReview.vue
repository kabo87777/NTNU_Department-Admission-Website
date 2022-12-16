<template>
	<div>
		<div class="flex">
			<h1 class="text-4xl text-bold tracking-widest">
				{{ $t("口試資料評閱") }}
			</h1>
			<div class="w-134px h-25px bg-[#FCC89B] rounded-lg ml-24px mt-8px">
				<div class="mt-4px text-xs text-center">
					{{ isBetweenDate }} | {{ $t("評分中") }}
				</div>
			</div>
			<div class="mt-20px ml-600px">
				{{ $t("開放時間") }} : {{ reviewStartTime }} -
				{{ reviewEndTime }}
			</div>
		</div>

		<div class="bigBlueDivider"></div>
		<div>
			<DataTable
				:value="ApplicantList"
				responsiveLayout="scroll"
				dataKey="id"
				:scrollable="true"
				v-model:selection="selectedData"
				selectionMode="single"
				@rowSelect="onRowSelect"
				class="p-datatable-lg !h-700px"
			>
				<ColumnGroup type="header">
					<Row>
						<Column :header="oralOrder" :rowspan="2"></Column>
						<Column :header="applicantName" :rowspan="2"></Column>
						<Column :header="reviewerGrade" :colspan="scoreCount" />
						<Column :header="OralGrade" :rowspan="2"></Column>
						<Column :header="docGrade" :rowspan="2"></Column>
						<Column :header="totalscore" :rowspan="2"></Column>
					</Row>
					<Row>
						<Column
							v-if="score1Proportion > 0"
							:header="score1FieldName"
							:colspan="1"
						/>
						<Column
							v-if="score2Proportion > 0"
							:header="score2FieldName"
							:colspan="1"
						/>
						<Column
							v-if="score3Proportion > 0"
							:header="score3FieldName"
							:colspan="1"
						/>
						<Column
							v-if="score4Proportion > 0"
							:header="score4FieldName"
							:colspan="1"
						/>
						<Column
							v-if="score5Proportion > 0"
							:header="score5FieldName"
							:colspan="1"
						/>
					</Row>
				</ColumnGroup>
				<div v-if="true">
					<Column field="oral_order"></Column>
					<Column field="name"></Column>
					<Column v-if="score1Proportion > 0" field="oral_grade_1" />
					<Column v-if="score2Proportion > 0" field="oral_grade_2" />
					<Column v-if="score3Proportion > 0" field="oral_grade_3" />
					<Column v-if="score4Proportion > 0" field="oral_grade_4" />
					<Column v-if="score5Proportion > 0" field="oral_grade_5" />
					<!-- oral grade -->
					<Column>
						<template #body="slotProps">
							{{
								(slotProps.data.oral_grade_1 *
									score1Proportion +
									slotProps.data.oral_grade_2 *
										score2Proportion +
									slotProps.data.oral_grade_3 *
										score3Proportion +
									slotProps.data.oral_grade_4 *
										score4Proportion +
									slotProps.data.oral_grade_5 *
										score5Proportion) /
								100
							}}
						</template>
					</Column>
					<!-- docs grade -->
					<Column>
						<template #body="slotProps">
							{{
								(slotProps.data.docs_grade_1 *
									docsScore1Proportion +
									slotProps.data.docs_grade_2 *
										docsScore2Proportion +
									slotProps.data.docs_grade_3 *
										docsScore3Proportion +
									slotProps.data.docs_grade_4 *
										docsScore4Proportion +
									slotProps.data.docs_grade_5 *
										docsScore5Proportion) /
								100
							}}
						</template>
					</Column>
					<!-- total grade -->
					<Column>
						<template #body="slotProps">
							{{
								((slotProps.data.oral_grade_1 *
									score1Proportion +
									slotProps.data.oral_grade_2 *
										score2Proportion +
									slotProps.data.oral_grade_3 *
										score3Proportion +
									slotProps.data.oral_grade_4 *
										score4Proportion +
									slotProps.data.oral_grade_5 *
										score5Proportion) *
									oralWeight +
									(slotProps.data.docs_grade_1 *
										docsScore1Proportion +
										slotProps.data.docs_grade_2 *
											docsScore2Proportion +
										slotProps.data.docs_grade_3 *
											docsScore3Proportion +
										slotProps.data.docs_grade_4 *
											docsScore4Proportion +
										slotProps.data.docs_grade_5 *
											docsScore5Proportion) *
										docsWeight) /
								10000
							}}
						</template>
					</Column>
					<!-- <Column
					field="isImmediateEnroll"
					dataType="boolean"
					bodyClass="text-center"
					style="min-width: 8rem"
				>
					<template #body="slotProps">
						<i
							v-if="slotProps.data.isImmediateEnroll"
							class="pi pi-check"
						></i>
						<p v-else>-</p>
					</template>
				</Column> -->
				</div>
			</DataTable>
			<div class="bigBlueDivider !mt-50px"></div>
			<div class="flex text-xl mt-20px">
				<NButton
					type="Reviewer"
					class="w-140px h-44px !ml-1200px"
					@click="confirmGrading"
				>
					<img
						alt="logo"
						src="/assets/reviewer-page/Add_round.png"
						style="width: 1.5rem"
						class="fill-green-500"
					/>
					<span class="tracking-1px">{{ $t("送出成績") }}</span>
				</NButton>
			</div>
			<div class="ml-930px mt-12px text-red-500">
				{{ $t("※成績送出即無法再次修改，煩請送出前再三確認成績無誤") }}
			</div>
		</div>
		<ConfirmDialog />
	</div>
</template>

<script setup lang="ts">
import "@/styles/customize.css";
import "primeicons/primeicons.css";
import { computed, ref } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ColumnGroup from "primevue/columngroup";
import Row from "primevue/row";
import Button from "primevue/button";
import ProgressBar from "primevue/progressbar";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { useAdmissionReviewerAuthStore } from "@/stores/universalAuth";
import { AdmissionReviewerAPI } from "@/api/admission/reviewer/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { InvalidSessionError } from "@/api/error";
import { useGlobalStore } from "@/stores/AdmissionReviewerStore";
import { useToast } from "primevue/usetoast";
import NButton from "@/styles/CustomButton.vue";
import ConfirmDialog from "primevue/confirmdialog";
import { useConfirm } from "primevue/useconfirm";

const reviewerAuth = useAdmissionReviewerAuthStore();
const api = new AdmissionReviewerAPI(reviewerAuth);
const store = useGlobalStore();

const { t: $t } = useI18n();
const { t } = useI18n();

const totalApplicant = ref(0);
const applicantGraded = ref(0);
const progressValue = ref(0);
// const alist = ref([]);

const {
	isLoading,
	isError,
	data: ApplicantList,
	error,
} = useQuery(
	["admissionReviewerApplicantList"],
	async () => {
		return await api.getApplicantList(store.admissionReviewerProgram!.id!);
	},
	{
		onSuccess: (data) => {
			totalApplicant.value = data!.length;
			applicantGraded.value = 0;
			data!.forEach((applicant) => {
				if (applicant.isDocsGraded) {
					applicantGraded.value += 1;
				}
			});
			progressValue.value =
				(applicantGraded.value / totalApplicant.value) * 100;
		},
	}
);

const docsWeight = ref(0);
const oralWeight = ref(0);
const score1Proportion = ref(0);
const score2Proportion = ref(0);
const score3Proportion = ref(0);
const score4Proportion = ref(0);
const score5Proportion = ref(0);
const docsScore1Proportion = ref(0);
const docsScore2Proportion = ref(0);
const docsScore3Proportion = ref(0);
const docsScore4Proportion = ref(0);
const docsScore5Proportion = ref(0);
const score1Title = ref("");
const score2Title = ref("");
const score3Title = ref("");
const score4Title = ref("");
const score5Title = ref("");
const score1FieldName = ref("");
const score2FieldName = ref("");
const score3FieldName = ref("");
const score4FieldName = ref("");
const score5FieldName = ref("");
const scoreCount = ref(0);

const { data: programGrading } = useQuery(
	["programGrading"],
	async () => {
		return await api.getProgramGrading(store.admissionReviewerProgram!.id);
	},
	{
		onSuccess: (data) => {
			score1Title.value = data!.oral_grade_name_1;
			score2Title.value = data!.oral_grade_name_2;
			score3Title.value = data!.oral_grade_name_3;
			if (data!.oral_grade_name_4) {
				score4Title.value = data!.oral_grade_name_4;
			}
			if (data!.oral_grade_name_5) {
				score5Title.value = data!.oral_grade_name_5;
			}
			scoreCount.value = 0;
			if (data!.oral_grade_weight_1 !== 0) {
				score1Proportion.value = data!.oral_grade_weight_1!;
				scoreCount.value++;
			}
			if (data!.oral_grade_weight_2 !== 0) {
				score2Proportion.value = data!.oral_grade_weight_2!;
				scoreCount.value++;
			}
			if (data!.oral_grade_weight_3 !== 0) {
				score3Proportion.value = data!.oral_grade_weight_3!;
				scoreCount.value++;
			}
			if (data!.oral_grade_weight_4 !== 0) {
				score4Proportion.value = data!.oral_grade_weight_4!;
				scoreCount.value++;
			}
			if (data!.oral_grade_weight_5 !== 0) {
				score5Proportion.value = data!.oral_grade_weight_5!;
				scoreCount.value++;
			}
			score1FieldName.value =
				score1Title.value + score1Proportion.value + "%";
			score2FieldName.value =
				score2Title.value + score2Proportion.value + "%";
			score3FieldName.value =
				score3Title.value + score3Proportion.value + "%";
			if (data!.oral_grade_name_4) {
				score4FieldName.value =
					score4Title.value + score4Proportion.value + "%";
			}
			if (data!.oral_grade_name_5) {
				score5FieldName.value =
					score5Title.value + score5Proportion.value + "%";
			}

			//doc propotion
			if (data!.docs_grade_weight_1 !== 0) {
				docsScore1Proportion.value = data!.docs_grade_weight_1!;
			}
			if (data!.docs_grade_weight_2 !== 0) {
				docsScore2Proportion.value = data!.docs_grade_weight_2!;
			}
			if (data!.docs_grade_weight_3 !== 0) {
				docsScore3Proportion.value = data!.docs_grade_weight_3!;
			}
			if (data!.docs_grade_weight_4 !== 0) {
				docsScore4Proportion.value = data!.docs_grade_weight_4!;
			}
			if (data!.docs_grade_weight_5 !== 0) {
				docsScore5Proportion.value = data!.docs_grade_weight_5!;
			}

			docsWeight.value = data!.docs_weight;
			oralWeight.value = data!.oral_weight;
		},
	}
);

const toast = useToast();
const oralGrade = useMutation(
	["oralGrade"],
	async () => {
		return await api.submitOralGrade(store.admissionReviewerProgram!.id);
	},
	{
		onSuccess: () => {
			toast.add({
				severity: "success",
				summary: $t("送出成功"),
				detail: $t("送出成功"),
				life: 3000,
			});
		},
		onError: () => {
			toast.add({
				severity: "error",
				summary: $t("送出失敗"),
				detail: $t("送出失敗"),
				life: 3000,
			});
		},
	}
);

const reviewStartTime = ref("");
const reviewEndTime = ref("");
const isBetweenDate = ref("非開放時段");
const { data: programs } = useQuery(
	["admissionReviewerProgramList"],
	async () => {
		return await api.getProgramList();
	},
	{
		onSuccess: (data) => {
			const today = new Date();
			reviewStartTime.value = data!.filter(
				(program) => program.id === store.admissionReviewerProgram?.id
			)[0].review_start_date!;
			reviewStartTime.value =
				reviewStartTime.value.slice(5, 7) +
				"/" +
				reviewStartTime.value.slice(8, 10) +
				" " +
				reviewStartTime.value.slice(11, 16);
			reviewEndTime.value = data!.filter(
				(program) => program.id === store.admissionReviewerProgram?.id
			)[0].review_end_date!;
			reviewEndTime.value =
				reviewEndTime.value.slice(5, 7) +
				"/" +
				reviewEndTime.value.slice(8, 10) +
				" " +
				reviewEndTime.value.slice(11, 16);
			if (
				today >=
					new Date(
						data!.filter(
							(program) =>
								program.id ===
								store.admissionReviewerProgram?.id
						)[0].review_start_date!
					) &&
				today <=
					new Date(
						data!.filter(
							(program) =>
								program.id ===
								store.admissionReviewerProgram?.id
						)[0].review_end_date!
					)
			) {
				isBetweenDate.value = "開放時段";
			}
		},
	}
);

// FIXME: logic may refactor

const oralOrder = computed(() => t("口試順序"));
const docGrade = computed(() => t("書面分數") + docsWeight.value + "%");
const OralGrade = computed(() => t("口試分數") + oralWeight.value + "%");
const ID = computed(() => t("帳號ID"));
const applicantName = computed(() => t("申請人姓名"));
const reviewerGrade = computed(() => t("評分分數"));
const learningExT = computed(() => t("學習歷程"));
const devPotentialT = computed(() => t("發展潛能"));
const learnPotentialT = computed(() => t("學習潛力"));
const totalscore = computed(() => t("分數合計"));
// const reason = computed(() => t("逕取理由"));
const confirm = computed(() => t("確認"));
const cancel = computed(() => t("取消"));
// const directAccess = computed(() => t("逕取"));

const selectedData = ref();
const router = useRouter();
const onRowSelect = (event: any) => {
	if (event.data.oral_order) {
		selectedData.value = "";
		router.push("/admission/reviewer/singleOralReview/" + event.data.id);
	}
	// else{
	// 	toast.add("");
	// }
};
const queryClient = useQueryClient();
store.$subscribe(() => {
	queryClient.invalidateQueries({
		queryKey: ["admissionReviewerApplicantList"],
	});
	queryClient.invalidateQueries({ queryKey: ["programGrading"] });
	queryClient.invalidateQueries({
		queryKey: ["admissionReviewerProgramList"],
	});
});
const confirm1 = useConfirm();
const confirmGrading = () => {
	confirm1.require({
		header: $t("是否要刪除此專案？"),
		message: $t("此動作不可回復，請謹慎操作"),
		icon: "pi pi-exclamation-triangle",
		accept: () => {
			oralGrade.mutate();
		},
		acceptLabel: $t("確認"),
		rejectLabel: $t("取消"),
	});
};
</script>
