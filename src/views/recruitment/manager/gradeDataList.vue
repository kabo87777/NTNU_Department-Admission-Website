<template>
	<Layout Admin noMargin>
		<template #Header>{{ $t("評分資料列表") }}</template>
		<template #Body>
			<DataTable
				:value="applicantGradeList.data.value"
				responsiveLayout="scroll"
				dataKey="id"
				:scrollable="true"
				scrollHeight="700px"
				class="!h-700px"
			>
				<Column field="name" :header="applicantName"></Column>
				<Column field="revieweResult" :header="recommand">
					<template #body="slotProps">
						{{ slotProps.data.isRecommend }}/{{
							slotProps.data.allReviewerNum -
							slotProps.data.isRecommend
						}}
					</template>
				</Column>
				<Column field="revieweResult" :header="result">
					<template #body="slotProps">
						<i v-if="slotProps.data.revieweResult === null">{{
							$t("待審核")
						}}</i>
						<p v-else>{{ slotProps.data.revieweResult }}</p>
					</template>
				</Column>
				<Column field="interviewDate" :header="interviewTime">
					<template #body="slotProps">
						<i v-if="slotProps.data.interviewDate !== null">{{
							dateTransform(slotProps.data.interviewDate)
						}}</i>
						<i v-else></i>
					</template>
				</Column>
				<Column
					:header="edit"
					:exportable="false"
					style="min-width: 8rem"
				>
					<template #body="slotProps">
						<NButton
							Admin
							icon="pi pi-pencil"
							class="p-2"
							@click="editProduct(slotProps)"
						/>
					</template>
				</Column>
			</DataTable>
		</template>
		<template #Footer>
			<div flex="~ gap-4" justify="items-center" text="body" mx="4">
				<div my="auto" text="space-nowrap">
					{{ $t("待審核") }} {{ pendingCount }} {{ $t("位") }}
				</div>
				<Divider layout="vertical" />
				<div my="auto" text="space-nowrap">
					{{ $t("通過") }} {{ passCount }} {{ $t("位") }}
				</div>
				<Divider layout="vertical" />
				<div my="auto" text="space-nowrap">
					{{ $t("不通過") }} {{ notPassCount }} {{ $t("位") }}
				</div>
				<NButton
					Admin
					icon="pi pi-print"
					class="h-11 min-w-36"
					pos="absolute right-0"
				>
					{{ $t("報表列印") }}
				</NButton>
			</div>
		</template>
	</Layout>
	<Dialog
		v-model:visible="productDialog"
		:draggable="false"
		:closable="false"
		:modal="true"
		class="min-w-160 h-160"
	>
		<template #header>
			<div text="2xl title">{{ gradeDataEdit }}</div>
		</template>
		<template #default>
			<div flex="~ col gap-6">
				<div flex="~ col gap-4" bg="gray-100" p="4" border="rounded-lg">
					<div text="body" flex="~ gap-6">
						<div>{{ $t("帳號ID") }} :</div>
						<div>{{ id }}</div>
					</div>
					<div text="body" flex="~ gap-6">
						<div>{{ $t("帳號名稱") }} :</div>
						<div>{{ name }}</div>
					</div>
				</div>
				<DataTable
					:value="reviewers"
					responsiveLayout="scroll"
					dataKey="id"
				>
					<Column field="name" :header="reviewer"></Column>
					<Column
						field="isRecommend"
						:header="recommandOrNot"
						dataType="boolean"
						bodyClass="text-center"
						style="min-width: 8rem"
					>
						<template #body="slotProps">
							<i
								v-if="slotProps.data.recommandOrNot"
								class="pi pi-check"
							></i>
							<p v-else>-</p>
						</template>
					</Column>
					<Column field="comment" :header="note"></Column>
				</DataTable>
				<div flex="~ gap-4" text="sm secondary" mx="4" justify="end">
					<div>{{ recommand }} :</div>
					<div>{{ recommandCount }}/{{ notRecommandCount }}</div>
				</div>
				<div flex="~ col gap-1" w="2/3">
					<div text="body">{{ $t("書面審查結果") }}</div>
					<Dropdown v-model="selectedResult" :options="results">
					</Dropdown>
				</div>
				<div flex="~ col gap-1" w="2/3">
					<div text="body">{{ $t("面試時間") }}</div>
					<Calendar
						inputId="icon"
						v-model="selectedInterviewTime"
						:showIcon="true"
						:showTime="true"
						:baseZIndex="zIndex"
						:disabled="disable"
						dateFormat="yy/mm/dd"
						:showOnFocus="false"
						placeholder="YYYY/MM/DD hh:mm"
					/>
				</div>
			</div>
		</template>
		<template #footer>
			<div flex="~ gap-6" justify="center">
				<NButton
					Admin
					class="h-11 min-w-36"
					@click="doneEdit"
					icon="pi pi-save"
					>{{ $t("儲存變更") }}
				</NButton>
				<NButton
					class="h-11 min-w-36"
					@click="cancelEdit"
					icon="pi pi-times"
					>{{ $t("取消") }}
				</NButton>
			</div>
		</template>
	</Dialog>
</template>

<script setup lang="ts">
import "@/styles/customize.css";
import "primeicons/primeicons.css";
import { computed, ref } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import NButton from "@/styles/CustomButton.vue";
import Dialog from "primevue/dialog";
import Divider from "primevue/divider";
import Dropdown from "primevue/dropdown";
import Layout from "@/components/Layout.vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { useRecruitmentAdminAuthStore } from "@/stores/universalAuth";
import { RecruitmentAdminAPI } from "@/api/recruitment/admin/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { InvalidSessionError } from "@/api/error";
import { useGlobalStore } from "@/stores/RecruitmentAdminStore";
import { useToast } from "primevue/usetoast";
import Calendar from "primevue/calendar";
import { RecruitmentAdminSingleReviewerRecommendResponse } from "@/api/recruitment/admin/types";

const adminAuth = useRecruitmentAdminAuthStore();
const api = new RecruitmentAdminAPI(adminAuth);
const store = useGlobalStore();
const router = useRouter();

const { t } = useI18n();
const translation = {
	pending: t("待審核"),
	notPass: t("不通過"),
	pass: t("通過"),
};

const zIndex = ref(3000);
const productDialog = ref(false);
const name = ref("");
const id = ref();
const selectedResult = ref(translation.pending);
const results = ref([
	translation.pending,
	translation.notPass,
	translation.pass,
]);
const selectedInterviewTime = ref<Date>(new Date());
const disable = computed(() => {
	return selectedResult.value === translation.pass;
});
const pendingCount = ref(0);
const passCount = ref(0);
const notPassCount = ref(0);
const applicantID = ref(1);
const applicantGradeList = useQuery(
	["recruitmentAdminGradeList"],
	async () => {
		return await api.getApplicantListWithDetail(store.program!.id!);
	},
	{
		onSuccess: (data) => {
			pendingCount.value =
				data!.filter((item) => item.revieweResult === null).length +
				data!.filter((item) => item.revieweResult === "待審核").length;
			passCount.value = data!.filter(
				(item) => item.revieweResult === "通過"
			).length;
			notPassCount.value = data!.filter(
				(item) => item.revieweResult === "不通過"
			).length;
			applicantID.value = data![0].id;
		},
	}
);
const recommandCount = ref(0);
const notRecommandCount = ref(0);
const reviewers = ref<RecruitmentAdminSingleReviewerRecommendResponse[]>();
const singleApplicantRecommand = useQuery(
	["recruitmentAdminDocsGrade", applicantID],
	async () => {
		if (!applicantID.value)
			throw new Error(
				"recruitmentAdminDocsGrade: applicantID is undefined"
			);

		return await api.getSingleApplicantWithDetail(
			store.program!.id!,
			applicantID.value
		);
	},
	{
		onSuccess: (data) => {
			name.value = data!.name;
			id.value = data!.r_applicant_id;
			if (data!.revieweResult === null) {
				selectedResult.value = translation.pending;
			} else {
				selectedResult.value = data!.revieweResult;
			}
			if (data!.interviewDate) {
				selectedInterviewTime.value = new Date(data!.interviewDate);
			}
			recommandCount.value = data!.isRecommendNum;
			notRecommandCount.value =
				data!.allReviewerNum - data!.isRecommendNum;
			reviewers.value = data!.reviewers;
		},
	}
);

const ID = computed(() => t("帳號ID"));
const applicantName = computed(() => t("申請人姓名"));
const gradeDataEdit = computed(() => t("評分資料編輯"));
const recommand = computed(() => t("推薦/不推薦"));
const result = computed(() => t("審查結果"));
const interviewTime = computed(() => t("面試時間"));
const recommandOrNot = computed(() => t("是否推薦"));
const note = computed(() => t("評比註記"));
const reviewer = computed(() => t("審查委員"));
const edit = computed(() => t("操作"));

const editProduct = (prod: any) => {
	name.value = prod.data.name;
	id.value = prod.data.id;
	productDialog.value = true;
	applicantID.value = prod.data.id;
	if (!singleApplicantRecommand.isFetched.value) {
		singleApplicantRecommand.refetch({ throwOnError: true });
	}
};

const applicantStage = useMutation(async (newStage: any) => {
	try {
		return await api.updateSingleApplicantWithDetail(
			store.program!.id!,
			applicantID.value,
			newStage
		);
	} catch (error) {
		console.log(error);
	}
});
async function doneEdit() {
	if (selectedResult.value === translation.pass) {
		applicantStage.mutate({
			review_result: selectedResult.value,
			interview_date: selectedInterviewTime.value,
		});
	} else {
		applicantStage.mutate({
			review_result: selectedResult.value,
			interview_date: "",
		});
	}

	productDialog.value = false;
	await queryClient.invalidateQueries({
		queryKey: ["recruitmentAdminGradeList"],
	});
	await queryClient.invalidateQueries({
		queryKey: ["recruitmentAdminRecommand"],
	});
}
function cancelEdit() {
	productDialog.value = false;
}
const queryClient = useQueryClient();
store.$subscribe(() => {
	queryClient.invalidateQueries({ queryKey: ["recruitmentAdminGradeList"] });
	queryClient.invalidateQueries({ queryKey: ["recruitmentAdminRecommand"] });
});
function dateTransform(date: string) {
	return (
		date.slice(0, 4) +
		"-" +
		date.slice(5, 7) +
		"-" +
		date.slice(8, 10) +
		" " +
		date.slice(11, 16)
	);
}
</script>
