<template>
	<div>
		<h1 class="text-4xl text-bold tracking-widest">
			{{ $t("評分資料列表") }}
		</h1>
		<div class="bigRedDivider"></div>
		<div>
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
						<Button
							icon="pi pi-pencil"
							class="p-button-outlined p-button-success"
							@click="editProduct(slotProps)"
						/>
					</template>
				</Column>
			</DataTable>
			<Dialog
				v-model:visible="productDialog"
				:header="gradeDataEdit"
				:draggable="false"
				:modal="true"
				class="w-720px h-873px"
			>
				<div class="flex mt-24px">
					<div class="text-lg">{{ $t("帳號ID") }} :</div>
					<div class="text-lg ml-266px">{{ $t("帳號名稱") }} :</div>
				</div>
				<div class="flex mt-18.5px">
					<div>
						{{ id }}
					</div>
					<div class="text-base ml-300px">
						{{ name }}
					</div>
				</div>
				<DataTable
					:value="reviewers"
					responsiveLayout="scroll"
					dataKey="id"
					class="text-base mt-56px !h-228px"
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
				<div class="bigRedDivider"></div>
				<div class="flex mt-15px ml-36px">
					<div>
						{{ recommand }}
					</div>
					<div class="ml-48px">
						{{ recommandCount }}/{{ notRecommandCount }}
					</div>
				</div>
				<div class="mt-55px ml-52px">
					{{ $t("書面審查結果") }}
				</div>
				<Dropdown
					v-model="selectedResult"
					:options="results"
					class="mt-8px !w-576px !h-44px ml-52px"
				>
				</Dropdown>
				<div class="mt-32px ml-52px">
					{{ $t("面試時間") }}
				</div>
				<Calendar
					v-if="disable"
					inputId="icon"
					v-model="selectedInterviewTime"
					:showIcon="true"
					:showTime="true"
					class="mt-8px !w-576px !h-44px ml-52px"
					:baseZIndex="zIndex"
					dateFormat="yy/mm/dd"
				/>
				<Calendar
					v-else
					inputId="icon"
					v-model="selectedInterviewTime"
					:showIcon="true"
					:showTime="true"
					class="mt-8px !w-576px !h-44px ml-52px"
					:baseZIndex="zIndex"
					disabled
					dateFormat="yy/mm/dd"
				/>
				<div class="flex mt-48px">
					<NButton
						type="Admin"
						class="w-140px h-44px !ml-170px"
						@click="doneEdit"
						icon="pi pi-check"
					>
						<span class="tracking-1px">{{ $t("儲存變更") }}</span>
					</NButton>
					<NButton
						type="Admin"
						class="w-100px h-44px !ml-49px"
						@click="cancelEdit"
						icon="pi pi-times"
					>
						<span class="tracking-1px">{{ $t("取消") }}</span>
					</NButton>
				</div>
			</Dialog>
			<div class="bigRedDivider !mt-50px"></div>
			<div class="flex text-xl mt-20px justify-between">
				<div class="flex justify-around">
					<div>
						{{ $t("待審核") }} {{ pendingCount }} {{ $t("位") }}
					</div>
					<Divider layout="vertical" class="!ml-30px" />
					<div class="!ml-30px">
						{{ $t("通過") }} {{ passCount }} {{ $t("位") }}
					</div>
					<Divider layout="vertical" class="!ml-30px" />
					<div class="!ml-30px">
						{{ $t("不通過") }} {{ notPassCount }} {{ $t("位") }}
					</div>
				</div>
				<div>
					<NButton
						type="Admin"
						class="w-150px h-44px !ml-680px p-button-outlined p-button-help"
					>
						<img
							alt="logo"
							src="/assets/gradeDataList/Paper.png"
							style="width: 1.5rem"
							class="fill-green-500"
						/>
						<span class="tracking-1px">{{ $t("報表列印") }}</span>
					</NButton>
				</div>
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
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import Divider from "primevue/divider";
import Dropdown from "primevue/dropdown";
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
import NButton from "@/styles/CustomButton.vue";

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
