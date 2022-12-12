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
				:value="alist"
				responsiveLayout="scroll"
				dataKey="id"
				removableSort
				:scrollable="true"
				v-model:selection="selectedData"
				selectionMode="single"
				@rowSelect="onRowSelect"
				class="p-datatable-lg"
			>
				<ColumnGroup type="header">
					<Row>
						<Column
							:header="oralOrder"
							:rowspan="2"
							:sortable="true"
							sortField="oral_order"
						></Column>
						<Column
							:header="ID"
							:rowspan="2"
							:sortable="true"
							sortField="id"
						></Column>
						<Column :header="applicantName" :rowspan="2"></Column>
						<Column :header="docGrade" :rowspan="2"></Column>
						<Column :header="reviewerGrade" :colspan="scoreCount" />
						<Column :header="totalscore" :rowspan="2"></Column>
					</Row>
					<Row>
						<Column :header="score1FieldName" :colspan="1" />
						<Column :header="score2FieldName" :colspan="1" />
						<Column :header="score3FieldName" :colspan="1" />
						<Column
							v-if="scoreCount > 3"
							:header="score4FieldName"
							:colspan="1"
						/>
						<Column
							v-if="scoreCount > 4"
							:header="score5FieldName"
							:colspan="1"
						/>
					</Row>
				</ColumnGroup>
					<Column field="oral_order"></Column>
					<Column field="id"></Column>
					<Column field="name"></Column>
					<Column>
						<template #body="slotProps">
							{{
								(slotProps.data.docs_grade_1 *
									score1Proportion) /
									100 +
								(slotProps.data.docs_grade_2 *
									score2Proportion) /
									100 +
								(slotProps.data.docs_grade_3 *
									score3Proportion) /
									100 +
								(slotProps.data.docs_grade_4 *
									score4Proportion) /
									100 +
								(slotProps.data.docs_grade_5 *
									score5Proportion) /
									100
							}}
						</template>
					</Column>
					<Column field="oral_grade_1" />
					<Column field="oral_grade_2" />
					<Column field="oral_grade_3" />
					<Column v-if="scoreCount > 3" field="oral_grade_4" />
					<Column v-if="scoreCount > 4" field="oral_grade_5" />
					<Column
					field="isImmediateEnroll"
					dataType="boolean"
					bodyClass="text-center"
					style="min-width: 8rem"
				>
					<template #body="slotProps">
						{{
							(slotProps.data.oral_grade_1 * score1Proportion) /
								100 +
							(slotProps.data.oral_grade_2 * score2Proportion) /
								100 +
							(slotProps.data.oral_grade_3 * score3Proportion) /
								100 +
							(slotProps.data.oral_grade_4 * score4Proportion) /
								100 +
							(slotProps.data.oral_grade_5 * score5Proportion) /
								100
						}}
					</template>
				</Column>
			</DataTable>
			<div class="bigBlueDivider !mt-50px"></div>
			<div class="flex text-xl mt-20px">
				<div>
					{{ $t("評分進度") }}
				</div>

				<ProgressBar
					:value="progressValue"
					:showValue="false"
					class="!w-439px ml-24px mt-5px"
				/>
				<!-- FIXME: program amount of people must be got by using API -->
				<div class="ml-24px">
					{{ applicantGraded }} / {{ oralApplicant }} {{ $t("位") }}
				</div>

				<Button
					class="w-140px h-44px !ml-480px p-button-success"
					@click="showTemplate"
				>
					<img
						alt="logo"
						src="/assets/reviewer-page/Add_round.png"
						style="width: 1.5rem"
						class="fill-green-500"
					/>
					<span class="tracking-1px">{{ $t("送出成績") }}</span>
				</Button>
				<Toast position="bottom-center" group="bc" class="!w-400px">
					<template #message="slotProps">
						<div class="">
							<div class="text-center">
								<i
									class="pi pi-exclamation-triangle"
									style="font-size: 3rem"
								></i>
								<h4 class="text-2xl">
									{{ slotProps.message.summary }}
								</h4>
								<p class="text-xl">
									{{ slotProps.message.detail }}
								</p>
							</div>
							<div class="flex">
								<div class="ml-80px">
									<Button
										class="p-button-success"
										:label="confirm"
										@click="onConfirm"
									></Button>
								</div>
								<div class="ml-20px">
									<Button
										class="p-button-secondary"
										:label="cancel"
										@click="onReject"
									></Button>
								</div>
							</div>
						</div>
					</template>
				</Toast>
			</div>
			<div class="ml-860px mt-12px text-red-500">
				{{ $t("※成績送出即無法再次修改，煩請送出前再三確認成績無誤") }}
			</div>
		</div>
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
import { useMutation, useQuery } from "@tanstack/vue-query";
import { InvalidSessionError } from "@/api/error";
import { useGlobalStore } from "@/stores/AdmissionReviewerStore";
import { useToast } from "primevue/usetoast";

const reviewerAuth = useAdmissionReviewerAuthStore();
const api = new AdmissionReviewerAPI(reviewerAuth);
const store = useGlobalStore();

const { t } = useI18n();

const totalApplicant = ref(0);
const oralApplicant = ref(0);
const applicantGraded = ref(0);
const progressValue = ref(0);
const flist: AdmissionReviewerApplicantListResponse[] = [];
const alist = ref(flist);

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
			oralApplicant.value = 0;
			applicantGraded.value = 0;
			while (alist.value.length !== 0) {
				//clean up all value in alist, otherwise will grow with duplicate data
				alist.value.pop();
			}
			data!.forEach((applicant) => {
				if (applicant.isOralGraded) {
					applicantGraded.value += 1;
				}
				if (applicant.oral_order !== null) {
					alist.value.push(applicant);
					oralApplicant.value += 1;
				}
			});
			progressValue.value =
				(applicantGraded.value / oralApplicant.value) * 100;
		},
	}
);

const score1Proportion = ref(30);
const score2Proportion = ref(30);
const score3Proportion = ref(40);
const score4Proportion = ref(0);
const score5Proportion = ref(0);
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
			score1Proportion.value = data!.oral_grade_weight_1;
			score2Proportion.value = data!.oral_grade_weight_2;
			score3Proportion.value = data!.oral_grade_weight_3;
			if (data!.oral_grade_weight_4) {
				score4Proportion.value = data!.oral_grade_weight_4;
			}
			if (data!.oral_grade_weight_5) {
				score5Proportion.value = data!.oral_grade_weight_5;
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
			if (data!.oral_grade_name_4 && data!.oral_grade_name_5) {
				scoreCount.value = 5;
			} else if (data!.oral_grade_name_4) {
				scoreCount.value = 4;
			} else {
				scoreCount.value = 3;
			}
		},
	}
);

const oralGrade = useMutation(["oralGrade"], async () => {
	return await api.submitOralGrade(store.admissionReviewerProgram!.id);
});

const toast = useToast();
const showTemplate = () => {
	toast.add({
		severity: "warn",
		summary: "確認送出成績?",
		detail: "成績送出即無法再次修改，煩請送出前再三確認成績無誤",
		group: "bc",
	});
};
const onConfirm = async () => {
	await oralGrade.mutateAsync();
	toast.removeGroup("bc");
};
const onReject = () => {
	toast.removeGroup("bc");
};

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
const docGrade = computed(() => t("一階分數"));
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
		selectedData.value = "";
		router.push("/admission/reviewer/singleOralReview/" + event.data.id);
};
</script>
