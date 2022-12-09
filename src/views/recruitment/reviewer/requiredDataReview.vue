<template>
	<div>
		<div class="flex">
			<h1 class="text-4xl text-bold tracking-widest">
				{{ $t("必看資料評閱") }}
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
				:value="applicantList"
				responsiveLayout="scroll"
				dataKey="id"
				:scrollable="true"
				scrollHeight="700px"
				v-model:selection="selectedData"
				selectionMode="single"
				@rowSelect="onRowSelect"
				class="p-datatable-lg !h-700px"
			>
				<Column field="id" :header="ID"></Column>
				<Column field="name" :header="applicantName"></Column>
				<Column field="isRecommend" :header="reviewerRating">
					<template #body="slotProps">
						<p v-if="slotProps.data.isRecommend === null">
							{{ noRating }}
						</p>
						<p v-else-if="slotProps.data.isRecommend">
							{{ recommanded }}
						</p>
						<p v-else>{{ notRecommanded }}</p>
					</template>
				</Column>
				<Column field="comment" :header="reason" />
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
				<div class="ml-24px">
					{{ applicantGraded }} / {{ totalApplicant }} {{ $t("位") }}
				</div>

				<Button
					class="w-140px h-44px !ml-480px p-button-success"
					disabled
				>
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
import { useRecruitmentReviewerAuthStore } from "@/stores/universalAuth";
import { RecruitmentReviewerAPI } from "@/api/recruitment/reviewer/api";
import { useQuery, useQueryClient } from "@tanstack/vue-query";
import { InvalidSessionError } from "@/api/error";
import { useGlobalStore } from "@/stores/RecruitmentReviewerStore";
import { useToast } from "primevue/usetoast";

const reviewerAuth = useRecruitmentReviewerAuthStore();
const api = new RecruitmentReviewerAPI(reviewerAuth);
const store = useGlobalStore();

const { t } = useI18n();

const totalApplicant = ref(0);
const applicantGraded = ref(0);
const progressValue = ref(0);

const noRating = computed(() => t("未評比"));
const notRecommanded = computed(() => t("不推薦"));
const recommanded = computed(() => t("推薦"));

const {
	isLoading,
	isError,
	data: applicantList,
	error,
} = useQuery(
	["recruitmenReviewerApplicantList"],
	async () => {
		try {
			return await api.getRequiredApplicantList(
				store.recruitmentReviewerProgram!.id!
			);
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
			totalApplicant.value = data!.length;
			applicantGraded.value = 0;
			data!.forEach((applicant) => {
				if (applicant.isRecommend != null) {
					applicantGraded.value += 1;
				}
			});
			progressValue.value =
				(applicantGraded.value / totalApplicant.value) * 100;
		},
	}
);

const reviewStartTime = ref("");
const reviewEndTime = ref("");
const isBetweenDate = ref("非開放時段");
const { data: programs } = useQuery(
	["recruitmentReviewerProgramList"],
	async () => {
		try {
			return await api.getProgramList();
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
			const today = new Date();
			reviewStartTime.value = data!.filter(
				(program) => program.id === store.recruitmentReviewerProgram?.id
			)[0].review_start_date!;
			reviewStartTime.value =
				reviewStartTime.value.slice(5, 7) +
				"/" +
				reviewStartTime.value.slice(8, 10) +
				" " +
				reviewStartTime.value.slice(11, 16);
			reviewEndTime.value = data!.filter(
				(program) => program.id === store.recruitmentReviewerProgram?.id
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
								store.recruitmentReviewerProgram?.id
						)[0].review_start_date!
					) &&
				today <=
					new Date(
						data!.filter(
							(program) =>
								program.id ===
								store.recruitmentReviewerProgram?.id
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
const queryClient = useQueryClient();
store.$subscribe(() => {
	queryClient.invalidateQueries({
		queryKey: ["recruitmenReviewerApplicantList"],
	});
	queryClient.invalidateQueries({
		queryKey: ["recruitmentReviewerProgramList"],
	});
});
</script>
