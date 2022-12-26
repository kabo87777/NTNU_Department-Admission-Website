<template>
	<Layout Reviewer noMargin>
		<template #Header>
			<div flex="~ gap-6" class="items-end">
				<div>{{ $t("必看資料評閱") }}</div>
				<div text="sm body" font="normal tracking-normal">
					{{ $t("開放時間") }} : {{ reviewStartTime }} -
					{{ reviewEndTime }}
				</div>
			</div>
		</template>
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
				class="p-datatable-lg !h-700px"
			>
				<Column field="name" :header="applicantName"></Column>
				<Column :header="academic">
					<template #body="slotProps">
						<p v-if="slotProps.data.doctoral">
							{{ slotProps.data.doctoral }}
						</p>
						<p v-else-if="slotProps.data.master">
							{{ slotProps.data.master }}
						</p>
						<p v-else-if="slotProps.data.college">
							{{ slotProps.data.college }}
						</p>
					</template>
				</Column>
				<Column field="publication" :header="publication" />
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
				<Column :header="recommanded">
					<template #body="slotProps">
						<Button
							v-if="slotProps.data.isRecommend"
							icon="pi pi-check-circle"
							class="p-button-rounded p-button-danger p-button-text"
							@click="notRecommend(slotProps)"
						/>
						<Button
							v-else
							icon="pi pi-circle"
							class="p-button-rounded p-button-danger p-button-text"
							@click="recommend(slotProps)"
						/>
					</template>
				</Column>
			</DataTable>
		</template>
	</Layout>
</template>

<script setup lang="ts">
import "@/styles/customize.css";
import "primeicons/primeicons.css";
import { computed, ref } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import NButton from "@/styles/CustomButton.vue";
import Layout from "@/components/Layout.vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { useRecruitmentReviewerAuthStore } from "@/stores/universalAuth";
import { RecruitmentReviewerAPI } from "@/api/recruitment/reviewer/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
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
const academic = computed(() => t("最高學歷"));
const publication = computed(() => t("著作"));

const {
	isLoading,
	isError,
	data: applicantList,
	error,
} = useQuery(["recruitmenReviewerApplicantList"], async () => {
	return await api.getRequiredApplicantList(
		store.recruitmentReviewerProgram!.id!
	);
});

const reviewStartTime = ref("");
const reviewEndTime = ref("");
const isBetweenDate = ref("非開放時段");
const { data: programs } = useQuery(
	["recruitmentReviewerProgramList"],
	async () => {
		return await api.getProgramList();
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
const applicantID = ref();
const newApplicantComment = useMutation(
	async (newProgramData: any) => {
		try {
			return await api.updateApplicantComment(
				store.recruitmentReviewerProgram!.id!,
				applicantID.value,
				newProgramData
			);
		} catch (error) {
			toast.add({ severity: "error", summary: "無法保存", life: 3000 });
			console.log(error);
		}
	},
	{
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["recruitmenReviewerApplicantList"],
			});
		},
	}
);
const recommend = (event: any) => {
	applicantID.value = event.data.id;
	newApplicantComment.mutate({
		isRecommend: true,
	});
};
const notRecommend = (event: any) => {
	applicantID.value = event.data.id;
	newApplicantComment.mutate({
		isRecommend: false,
	});
};
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
const toast = useToast();
</script>
