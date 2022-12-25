<template>
	<Layout Reviewer noMargin>
		<template #Header>
			<div flex="~ gap-6">
				<router-link
					to="/recruitment/reviewer/optionalDataReview"
					custom
					v-slot="{ navigate }"
				>
					<NButton
						type="Reviewer"
						class="p-button-secondary p-button-text !w-164px !h-29px"
						@click="navigate"
						role="link"
						icon="pi pi-angle-left"
					>
						<span class="text-base">
							{{ $t("選看資料評閱") }}
						</span>
					</NButton>
				</router-link>
				<div>{{ ID }}</div>
				<div>{{ name }}</div>
			</div>
		</template>
		<template #Body>
			<NSelect
				Reviewer
				:optionNum="3"
				class="h-12 mt-1 sticky top-0"
				@currentTab="changeView"
			>
				<template #Select1>{{ $t("基本資料") }}</template>
				<template #Select2>{{ $t("檢附資料") }}</template>
				<template #Select3>{{ $t("整合pdf") }}</template>
			</NSelect>
			<vue-pdf-embed
				ref="pdfRef"
				v-if="infoPDF !== ''"
				:source="'data:application/pdf;base64,' + PDF"
				class=""
				:page="Page"
				@rendered="handleDocumentRender"
			/>
			<i
				v-if="infoPDF === ''"
				class="pi pi-spin pi-spinner"
				style="font-size: 2rem"
			></i>
		</template>
		<template #Footer>
			<!-- Last / Next Page & Toggle Score Field Button set -->
			<div
				class="flex my-1 absolute inset-x-0 bottom-1"
				:class="toggleScoreFieldPosition"
				bg="white opacity-90"
			>
				<NButton
					icon="pi pi-chevron-left"
					@click="Page--"
					:disabled="Page === 1"
					class="h-11 min-w-36 mr-auto"
				>
					<span class="text-base">
						{{ $t("上一頁") }}
					</span>
				</NButton>
				<NButton
					Reviewer
					white
					:icon="toggleScoreFieldIcon"
					iconPos="both"
					@click="toggleScoreField"
					class="h-11 min-w-36"
				>
					<span class="text-base">
						{{ $t("開啟/收合評分面板") }}
					</span>
				</NButton>
				<NButton
					icon="pi pi-chevron-right"
					iconPos="right"
					@click="nextPage"
					:disabled="Page === maxPage"
					class="h-11 min-w-36 ml-auto"
				>
					<span class="text-base">
						{{ $t("下一頁") }}
					</span>
				</NButton>
			</div>

			<!-- Score Fields -->
			<div flex="~ col gap-4" v-if="showScoreField">
				<div flex="~ none gap-6">
					<div flex="~ col gap-1" w="1/4 min-32">
						<div text="body">{{ $t("評比結果") }} :</div>
						<Dropdown
							v-model="selectedRating"
							:options="ratings"
							class="w-full h-12"
						/>
					</div>
					<div flex="~ grow col gap-1">
						<div text="body">{{ $t("評比理由/註記") }} :</div>
						<InputText
							type="text"
							v-model="comment"
							class="w-full h-12"
						/>
					</div>
				</div>
				<NButton
					type="Reviewer"
					class="mx-auto min-w-36 h-11"
					@click="saveScore"
					icon="pi pi-check"
					>{{ $t("保存") }}
				</NButton>
			</div>
		</template>
	</Layout>
</template>

<script setup lang="ts">
import Dropdown from "primevue/dropdown";
import InputText from "primevue/inputtext";
import VuePdfEmbed from "vue-pdf-embed";
import Layout from "@/components/Layout.vue";
import NSelect from "@/components/SelectButton.vue";
import NButton from "@/styles/CustomButton.vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { useRecruitmentReviewerAuthStore } from "@/stores/universalAuth";
import { RecruitmentReviewerAPI } from "@/api/recruitment/reviewer/api";
import { useMutation, useQuery } from "@tanstack/vue-query";
import { useGlobalStore } from "@/stores/RecruitmentReviewerStore";
import { useToast } from "primevue/usetoast";
import { computed, ref, toRaw } from "vue";

const reviewerAuth = useRecruitmentReviewerAuthStore();
const api = new RecruitmentReviewerAPI(reviewerAuth);
const store = useGlobalStore();

const route = useRoute();
const { t } = useI18n();
const pdfRef = ref(null);
const PDF = ref();
const Page = ref(1);
const maxPage = ref(1);

const ID = computed(() => route.params.id);
const name = ref("");
const checked = ref();
const comment = ref("");
const data = ref("基本資料");
// Fix while backend ready
const infoPDF = ref("");
const uploadFilePDF = ref("");
const combinePDF = ref("");

const showScoreField = ref(true);
const toggleScoreFieldIcon = ref("pi pi-chevron-down");
const toggleScoreFieldPosition = ref("mb-40");

useQuery(
	["infoPDF"],
	async () => {
		return await api.getApplicantInfoFile(
			store.recruitmentReviewerProgram!.id!,
			ID.value
		);
	},
	{
		onSuccess: (data) => {
			if (infoPDF.value === "") {
				infoPDF.value = data!;
			}
		},
	}
);
useQuery(
	["combinePDF"],
	async () => {
		return await api.getApplicantCombineFile(
			store.recruitmentReviewerProgram!.id!,
			ID.value
		);
	},
	{
		onSuccess: (data) => {
			if (combinePDF.value === "") {
				combinePDF.value = data!;
			}
		},
	}
);
useQuery(
	["uploadFilePDF"],
	async () => {
		return await api.getApplicantCategoryCombineFile(
			store.recruitmentReviewerProgram!.id!,
			ID.value
		);
	},
	{
		onSuccess: (data) => {
			if (uploadFilePDF.value === "") {
				uploadFilePDF.value = data!;
			}
		},
	}
);

function handleDocumentRender() {
	const target_copy = Object.assign({}, toRaw(pdfRef.value));
	maxPage.value = target_copy["pageCount"];
}

function changeView(currentTab: number) {
	Page.value = 1;
	switch (currentTab) {
		case 1:
			PDF.value = infoPDF.value;
			data.value = "基本資料";
			break;
		case 2:
			PDF.value = uploadFilePDF.value;
			data.value = "檢附資料";
			break;
		case 3:
			PDF.value = combinePDF.value;
			data.value = "整合pdf";
			break;
		default:
			break;
	}
}

function nextPage() {
	Page.value++;
	window.scrollTo(0, 0);
}
// FIXME: logic may refactor

const translation = {
	noRating: computed(() => t("未評比")),
	notRecommanded: computed(() => t("不推薦")),
	recommanded: computed(() => t("推薦")),
};
const selectedRating = ref(translation.noRating.value);

const ratings = [
	translation.noRating.value,
	translation.notRecommanded.value,
	translation.recommanded.value,
];

const {
	isLoading,
	isError,
	data: applicantComment,
	error,
} = useQuery(
	["recruitmenReviewerComment"],
	async () => {
		return await api.getApplicantComment(
			store.recruitmentReviewerProgram!.id!,
			ID.value
		);
	},
	{
		onSuccess: (data) => {
			comment.value = data!.comment!;
			if (data!.isRecommend === null) {
				selectedRating.value = translation.noRating.value;
			} else if (data!.isRecommend === false) {
				selectedRating.value = translation.notRecommanded.value;
				checked.value = true;
			} else {
				selectedRating.value = translation.recommanded.value;
				checked.value = true;
			}
		},
	}
);

const { data: applicantInfo } = useQuery(
	["recruitmenReviewerInfo"],
	async () => {
		return await api.getApplicantInfo(
			store.recruitmentReviewerProgram!.id!,
			ID.value
		);
	},
	{
		onSuccess: (data) => {
			name.value = data!.name!;
		},
	}
);

const toast = useToast();
const newApplicantComment = useMutation(async (newProgramData: any) => {
	try {
		return await api.updateApplicantComment(
			store.recruitmentReviewerProgram!.id!,
			ID.value,
			newProgramData
		);
	} catch (error) {
		toast.add({ severity: "error", summary: "無法保存", life: 3000 });
		console.log(error);
	}
});

function toggleScoreField() {
	if (showScoreField.value) {
		showScoreField.value = false;
		toggleScoreFieldPosition.value = "mb-5";
		toggleScoreFieldIcon.value = "pi pi-chevron-up";
	} else {
		showScoreField.value = true;
		toggleScoreFieldPosition.value = "mb-40";
		toggleScoreFieldIcon.value = "pi pi-chevron-down";
	}
}

function saveScore() {
	try {
		if (selectedRating.value === translation.noRating.value) {
			newApplicantComment.mutate({
				comment: comment.value,
				isRecommend: null,
			});
		} else if (selectedRating.value === translation.notRecommanded.value) {
			newApplicantComment.mutate({
				comment: comment.value,
				isRecommend: false,
			});
		} else {
			newApplicantComment.mutate({
				comment: comment.value,
				isRecommend: true,
			});
		}
		toast.add({ severity: "success", summary: "保存成功", life: 3000 });
	} catch (e) {
		console.log(e);
	}
}
</script>
