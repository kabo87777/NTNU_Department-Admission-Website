<template>
	<div class="ml-128px mr-128px mt-62px">
		<div class="flex">
			<h1 class="text-4xl text-bold tracking-widest">
				{{ $t("口試資料評閱") }}
			</h1>
			<div class="w-134px h-25px bg-[#FCC89B] rounded-lg ml-24px mt-8px">
				<div class="mt-4px text-xs text-center">
					{{ $t("開放時段") }} | {{ $t("評分中") }}
				</div>
			</div>
			<!-- FIXME: program opening time must be got by using API -->
			<div class="mt-20px ml-600px">
				{{ $t("開放時間") }} : 09/29 00:00 - 10/30 23:59
			</div>
		</div>

		<div class="bigBlueDivider"></div>
		<div>
			<DataTable
				:value="data_list"
				responsiveLayout="scroll"
				dataKey="id"
				:scrollable="true"
				scrollHeight="700px"
				v-model:selection="selectedData"
				selectionMode="single"
				@rowSelect="onRowSelect"
				class="p-datatable-lg !h-700px"
			>
				<ColumnGroup type="header">
					<Row>
						<Column field="id" :header="ID" :rowspan="2"></Column>
						<Column
							field="name"
							:header="applicantName"
							:rowspan="2"
						></Column>
						<Column :header="reviewerGrade" :colspan="3" />
						<Column
							field="total_score"
							:header="totalscore"
							:rowspan="2"
						></Column>
						<Column
							field="access"
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
						<Column
							field="access_reason"
							:header="reason"
							:rowspan="2"
						></Column>
					</Row>
					<Row>
						<Column
							field="score_1"
							:header="learningEx"
							:colspan="1"
						/>
						<Column
							field="score_2"
							:header="devPotential"
							:colspan="1"
						/>
						<Column
							field="score_3"
							:header="learnPotential"
							:colspan="1"
						/>
					</Row>
				</ColumnGroup>
				<Column field="id" :header="ID"></Column>
				<Column field="name" :header="applicantName"></Column>
				<Column field="score_1" :header="learningEx" />
				<Column field="score_2" :header="devPotential" />
				<Column field="score_3" :header="learnPotential" />
				<Column field="total_score" :header="totalscore"></Column>
				<Column
					field="access"
					dataType="boolean"
					bodyClass="text-center"
					style="min-width: 8rem"
				>
					<template #body="slotProps">
						<i v-if="slotProps.data.access" class="pi pi-check"></i>
						<p v-else>-</p>
					</template>
				</Column>
				<Column field="access_reason" :header="reason"></Column>
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
				<div class="ml-24px">17 / 32 {{ $t("位") }}</div>

				<Button class="w-140px h-44px !ml-480px p-button-success">
					<img
						alt="logo"
						src="/assets/reviewer-page/Add_round.png"
						style="width: 1.5rem"
						class="fill-green-500"
					/>
					<span class="tracking-1px">{{ $t("送出成績") }}</span>
				</Button>
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
// import { useQuery } from "@tanstack/vue-query";

const reviewerAuth = useAdmissionReviewerAuthStore();
const api = new AdmissionReviewerAPI(reviewerAuth);

const { t } = useI18n();

const progressValue = ref(50);

// TODO: 連接API
const data_list = ref([
	{
		id: "1000",
		name: "Aaa",
		score_1: 25,
		score_2: 25,
		score_3: 30,
		total_score: 80,
		access: false,
		access_reason: "",
	},
	{
		id: "1001",
		name: "Bbb",
		score_1: 25,
		score_2: 25,
		score_3: 30,
		total_score: 80,
		access: false,
		access_reason: "",
	},
	{
		id: "1002",
		name: "Ccc",
		score_1: 25,
		score_2: 25,
		score_3: 30,
		total_score: 80,
		access: true,
		access_reason: "great student",
	},
	{
		id: "1003",
		name: "Ddd",
		score_1: 25,
		score_2: 25,
		score_3: 30,
		total_score: 80,
		access: false,
		access_reason: "",
	},
	{
		id: "1004",
		name: "Eee",
		score_1: 25,
		score_2: 25,
		score_3: 30,
		total_score: 80,
		access: true,
		access_reason: "nice",
	},
	{
		id: "1005",
		name: "fff",
		score_1: 25,
		score_2: 25,
		score_3: 30,
		total_score: 80,
		access: false,
		access_reason: "",
	},
	{
		id: "1006",
		name: "Ggg",
		score_1: 25,
		score_2: 25,
		score_3: 30,
		total_score: 80,
		access: false,
		access_reason: "",
	},
	{
		id: "1007",
		name: "Hhh",
		score_1: 25,
		score_2: 25,
		score_3: 30,
		total_score: 80,
		access: false,
		access_reason: "",
	},
	{
		id: "1008",
		name: "Iii",
		score_1: 25,
		score_2: 25,
		score_3: 30,
		total_score: 80,
		access: false,
		access_reason: "",
	},
	{
		id: "1009",
		name: "Jjj",
		score_1: 25,
		score_2: 25,
		score_3: 30,
		total_score: 80,
		access: false,
		access_reason: "",
	},
	{
		id: "1010",
		name: "Kkk",
		score_1: 25,
		score_2: 25,
		score_3: 30,
		total_score: 80,
		access: false,
		access_reason: "",
	},
]);

// FIXME: logic may refactor

const ID = computed(() => t("帳號ID"));
const applicantName = computed(() => t("申請人姓名"));
const reviewerGrade = computed(() => t("評分分數"));
const learningExT = computed(() => t("學習歷程"));
const devPotentialT = computed(() => t("發展潛能"));
const learnPotentialT = computed(() => t("學習潛力"));
const totalscore = computed(() => t("分數合計"));
const reason = computed(() => t("逕取理由"));

const learningExProportion = ref(30);
const devPotentialProportion = ref(30);
const learnPotentialProportion = ref(40);

const learningEx = computed(() => {
	return learningExT.value + learningExProportion.value + "%";
});

const devPotential = computed(() => {
	return devPotentialT.value + devPotentialProportion.value + "%";
});

const learnPotential = computed(() => {
	return learnPotentialT.value + learnPotentialProportion.value + "%";
});

const selectedData = ref();
const router = useRouter();
const onRowSelect = (event: any) => {
	selectedData.value = "";
	router.push("/admission/reviewer/singleOralReview/" + event.data.id);
};
</script>
