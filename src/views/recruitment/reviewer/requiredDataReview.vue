<template>
	<div class="ml-128px mr-128px mt-62px">
		<div class="flex">
			<h1 class="text-4xl text-bold tracking-widest">
				{{ $t("必看資料評閱") }}
			</h1>
			<div class="w-134px h-25px bg-[#FCC89B] rounded-lg ml-24px mt-8px">
				<div class="mt-4px text-xs text-center">
					{{ $t("開放時段") }} | {{ $t("評分中") }}
				</div>
			</div>
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
				class="p-datatable-lg"
			>
				<Column field="id" :header="ID"></Column>
				<Column field="name" :header="applicantName"></Column>
				<Column field="rating" :header="reviewerRating" />
				<Column field="reason" :header="reason" />
			</DataTable>
			<div class="bigBlueDivider !mt-50px"></div>
			<div class="flex text-xl mt-20px">
				<div>
					{{ $t("評比進度") }}
				</div>

				<ProgressBar
					:value="progressValue"
					:showValue="false"
					class="!w-439px ml-24px mt-5px"
				/>
				<div class="ml-24px">17 / 32 {{ $t("位") }}</div>

				<Button class="w-140px h-44px !ml-480px p-button-success">
					<img
						alt="logo"
						src="/assets/reviewer-page/Add_round.png"
						style="width: 1.5rem"
						class="fill-green-500"
					/>
					<span class="tracking-1px">{{ $t("送出評比") }}</span>
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

const translation = {
	noRating: computed(() => t("未評比")),
	notRecommanded: computed(() => t("不推薦")),
	recommanded: computed(() => t("推薦")),
};

// TODO: 連接API
const data_list = ref([
	{
		id: "1000",
		name: "Aaa",
		rating: translation.recommanded,
		reason: "good",
	},
	{
		id: "1001",
		name: "Aaa",
		rating: translation.recommanded,
		reason: "good",
	},
	{
		id: "1002",
		name: "Aaa",
		rating: translation.notRecommanded,
		reason: "not good",
	},
	{
		id: "1003",
		name: "Aaa",
		rating: translation.noRating,
		reason: "",
	},
	{
		id: "1004",
		name: "Aaa",
		rating: translation.notRecommanded,
		reason: "not good",
	},
	{
		id: "1005",
		name: "Aaa",
		rating: translation.noRating,
		reason: "",
	},
	{
		id: "1006",
		name: "Aaa",
		rating: translation.recommanded,
		reason: "good",
	},
	{
		id: "1007",
		name: "Aaa",
		rating: translation.noRating,
		reason: "",
	},
	{
		id: "1008",
		name: "Aaa",
		rating: translation.notRecommanded,
		reason: "not good",
	},
	{
		id: "1009",
		name: "Aaa",
		rating: translation.notRecommanded,
		reason: "not good",
	},
	{
		id: "1010",
		name: "Aaa",
		rating: translation.noRating,
		reason: "",
	},
]);

const ID = computed(() => t("帳號ID"));
const applicantName = computed(() => t("申請人姓名"));
const reviewerRating = computed(() => t("評比"));
const reason = computed(() => t("理由/註記"));

const selectedData = ref();
const router = useRouter();
const onRowSelect = (event: any) => {
	selectedData.value = "";
	router.push(
		"/recruitment/reviewer/singleRequiredDataReview/" + event.data.id
	);
};
</script>
