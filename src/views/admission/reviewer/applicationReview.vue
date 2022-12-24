<template>
	<Layout Reviewer noMargin>
		<template #Header>{{ $t("書面資料評閱") }}</template>
		<template #Body>
			<DataTable
				:value="applicantList"
				responsiveLayout="scroll"
				dataKey="id"
				:scrollable="true"
				scrollHeight="700px"
				v-model:selection="selectedData"
				selectionMode="single"
				@rowSelect="onRowSelect"
				class="!h-full"
			>
				<ColumnGroup type="header">
					<Row>
						<Column :header="applicantName" :rowspan="2"></Column>
						<Column :header="reviewerGrade" :colspan="scoreCount" />
						<Column :header="totalscore" :rowspan="2"></Column>
						<Column
							:header="directAccess"
							dataType="boolean"
							bodyClass="text-center"
							style="min-width: 8rem"
							:rowspan="2"
						>
							<template #body="slotProps">
								<i
									v-if="slotProps.data.access"
									class="pi pi-check"
								></i>
								<p v-else>-</p>
							</template>
						</Column>
						<Column :header="reason" :rowspan="2"></Column>
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
				<Column field="name"></Column>
				<Column v-if="score1Proportion > 0" field="docs_grade_1" />
				<Column v-if="score2Proportion > 0" field="docs_grade_2" />
				<Column v-if="score3Proportion > 0" field="docs_grade_3" />
				<Column v-if="score4Proportion > 0" field="docs_grade_4" />
				<Column v-if="score5Proportion > 0" field="docs_grade_5" />
				<Column>
					<template #body="slotProps">
						{{
							(slotProps.data.docs_grade_1 * score1Proportion) /
								100 +
							(slotProps.data.docs_grade_2 * score2Proportion) /
								100 +
							(slotProps.data.docs_grade_3 * score3Proportion) /
								100 +
							(slotProps.data.docs_grade_4 * score4Proportion) /
								100 +
							(slotProps.data.docs_grade_5 * score5Proportion) /
								100
						}}
					</template>
				</Column>
				<Column
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
				</Column>
				<Column field="immediate_enroll_comment" dataType="string">
					<template #body="slotProps">
						{{ short(slotProps.data.immediate_enroll_comment) }}
					</template>
				</Column>
			</DataTable>
		</template>
		<template #Footer>
			<NButton
				type="Reviewer"
				class="h-11 min-w-36 px-2 mx-auto bg-white"
				icon="pi pi-upload"
				@click="confirmGrading"
			>
				<span class="tracking-1px">{{ $t("送出成績") }}</span>
			</NButton>
			<div pos="absolute bottom-0 right-0" w="4/9" text="sm danger right">
				{{ $t("※成績送出即無法再次修改，煩請送出前再三確認成績無誤") }}
			</div>
		</template>
	</Layout>
	<!-- Dialog -->
	<ConfirmDialog :draggable="false" />
</template>

<script setup lang="ts">
import "@/styles/customize.css";
import "primeicons/primeicons.css";
import { computed, ref } from "vue";
import DataTable from "primevue/datatable";
import Layout from "@/components/Layout.vue";
import Column from "primevue/column";
import ColumnGroup from "primevue/columngroup";
import Row from "primevue/row";
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

const totalApplicant = ref(0);
const applicantGraded = ref(0);
const progressValue = ref(0);
const {
	isLoading,
	isError,
	data: applicantList,
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

const { t: $t } = useI18n();
const { t } = useI18n();

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
			score1Title.value = data!.docs_grade_name_1;
			score2Title.value = data!.docs_grade_name_2;
			score3Title.value = data!.docs_grade_name_3;
			if (data!.docs_grade_name_4) {
				score4Title.value = data!.docs_grade_name_4;
			}
			if (data!.docs_grade_name_5) {
				score5Title.value = data!.docs_grade_name_5;
			}
			scoreCount.value = 0;
			if (data!.docs_grade_weight_1 !== 0) {
				score1Proportion.value = data!.docs_grade_weight_1!;
				scoreCount.value++;
			}
			if (data!.docs_grade_weight_2 !== 0) {
				score2Proportion.value = data!.docs_grade_weight_2!;
				scoreCount.value++;
			}
			if (data!.docs_grade_weight_3 !== 0) {
				score3Proportion.value = data!.docs_grade_weight_3!;
				scoreCount.value++;
			}
			if (data!.docs_grade_weight_4 !== 0) {
				score4Proportion.value = data!.docs_grade_weight_4!;
				scoreCount.value++;
			}
			if (data!.docs_grade_weight_5 !== 0) {
				score5Proportion.value = data!.docs_grade_weight_5!;
				scoreCount.value++;
			}
			score1FieldName.value =
				score1Title.value + score1Proportion.value + "%";
			score2FieldName.value =
				score2Title.value + score2Proportion.value + "%";
			score3FieldName.value =
				score3Title.value + score3Proportion.value + "%";
			if (data!.docs_grade_name_4) {
				score4FieldName.value =
					score4Title.value + score4Proportion.value + "%";
			}
			if (data!.docs_grade_name_5) {
				score5FieldName.value =
					score5Title.value + score5Proportion.value + "%";
			}
		},
	}
);

const docsGrade = useMutation(
	async () => {
		return await api.submitDocsGrade(store.admissionReviewerProgram!.id);
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
const toast = useToast();

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

const ID = computed(() => t("帳號ID"));
const applicantName = computed(() => t("申請人姓名"));
const reviewerGrade = computed(() => t("評分分數"));
const totalscore = computed(() => t("分數合計"));
const directAccess = computed(() => t("逕取"));
const reason = computed(() => t("逕取理由"));
const confirm = computed(() => t("確認"));
const cancel = computed(() => t("取消"));

const selectedData = ref();
const router = useRouter();
const onRowSelect = (event: any) => {
	router.push("/admission/reviewer/singleApplicationReview/" + event.data.id);
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
function short(str: string | null) {
	if (str === null) return "";
	if (str.length > 10) {
		return str.slice(0, 10) + "...";
	} else {
		return str;
	}
}
const confirm1 = useConfirm();
const confirmGrading = () => {
	confirm1.require({
		header: $t("是否要刪除此專案？"),
		message: $t("此動作不可回復，請謹慎操作"),
		icon: "pi pi-exclamation-triangle",
		accept: () => {
			docsGrade.mutate();
		},
		acceptLabel: $t("確認"),
		rejectLabel: $t("取消"),
	});
};
</script>
