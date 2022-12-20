<template>
	<div>
		<div class="flex">
			<router-link
				to="/recruitment/reviewer/requiredDataReview"
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
						{{ $t("必看資料評閱") }}
					</span>
				</NButton>
			</router-link>
			<div class="text-[32px] ml-24px">
				{{ ID }}
			</div>
			<div class="text-[32px] ml-20px">
				{{ name }}
			</div>
		</div>
		<div class="bigBlueDivider"></div>
		<div class="flex !mt-5px justify-around">
			<NButton
				type="Reviewer"
				@click="changeInfo"
				class="!w-200px !h-40px"
			>
				<span class="text-base">
					{{ $t("基本資料") }}
				</span>
			</NButton>
			<NButton
				type="Reviewer"
				@click="changeUploadFile"
				class="!w-200px !h-40px"
			>
				<span class="text-base">
					{{ $t("檢附資料") }}
				</span>
			</NButton>
			<NButton
				type="Reviewer"
				@click="changeCombine"
				class="!w-200px !h-40px"
			>
				<span class="text-base">
					{{ $t("整合pdf") }}
				</span>
			</NButton>
		</div>
		<div class="mt-10px !h-1830px !ml-40px">
			<vue-pdf-embed
				ref="pdfRef"
				v-if="infoPDF !== ''"
				:source="'data:application/pdf;base64,' + PDF"
				class="!h-1600px"
				:page="Page"
				@rendered="handleDocumentRender"
			/>
			<i
				v-if="infoPDF === ''"
				class="pi pi-spin pi-spinner"
				style="font-size: 2rem"
			></i>
			<div class="flex !mt-250px justify-around">
				<NButton
					type="Reviewer"
					icon="pi pi-chevron-left"
					iconPos="left"
					@click="Page--"
					:disabled="Page === 1"
					class="!w-200px !h-40px"
				>
					<span class="text-base">
						{{ $t("上一頁") }}
					</span>
				</NButton>
				<NButton
					type="Reviewer"
					icon="pi pi-chevron-right"
					iconPos="right"
					@click="nextPage"
					:disabled="Page === maxPage"
					class="!w-200px !h-40px"
				>
					<span class="text-base">
						{{ $t("下一頁") }}
					</span>
				</NButton>
			</div>
		</div>
		<div class="bigBlueDivider !mt-100px"></div>
		<div class="flex mt-32px">
			<div class="text-xl mt-5px !tracking-widest">
				{{ $t("評比結果") }} :
			</div>
			<Dropdown
				v-model="selectedRating"
				:options="ratings"
				class="!w-160px !h-45px !ml-50px"
			/>
			<div class="text-xl mt-5px ml-130px !tracking-widest">
				{{ $t("評比理由/註記") }} :
			</div>
			<InputText
				type="text"
				v-model="comment"
				class="!w-650px !h-44px !ml-34px"
			/>
		</div>
		<div class="flex mt-42px">
			<NButton
				type="Reviewer"
				class="w-100px h-40px !ml-1200px p-button-success"
				@click="saveScore"
				icon="pi pi-check"
			>
				<span class="tracking-1px">{{ $t("保存") }}</span>
			</NButton>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, ref, toRaw } from "vue";
import { useRoute } from "vue-router";
import Button from "primevue/button";
import Dropdown from "primevue/dropdown";
import Checkbox from "primevue/checkbox";
import InputText from "primevue/inputtext";
import { useI18n } from "vue-i18n";
import PDFView from "@/components/pdfPreview.vue";
import jsPdf from "./test.pdf";
import { useRouter } from "vue-router";
import { useRecruitmentReviewerAuthStore } from "@/stores/universalAuth";
import { RecruitmentReviewerAPI } from "@/api/recruitment/reviewer/api";
import { useMutation, useQuery } from "@tanstack/vue-query";
import { InvalidSessionError } from "@/api/error";
import { useGlobalStore } from "@/stores/RecruitmentReviewerStore";
import { useToast } from "primevue/usetoast";
import SelectButton from "primevue/selectbutton";
import VuePdfEmbed from "vue-pdf-embed";
import NButton from "@/styles/CustomButton.vue";

const reviewerAuth = useRecruitmentReviewerAuthStore();
const api = new RecruitmentReviewerAPI(reviewerAuth);
const store = useGlobalStore();

const router = useRouter();
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
const page = ref(1);
const data = ref("基本資料");
const datas = ref(["基本資料", "檢附資料", "整合pdf"]);

const infoPDF = ref("");
const uploadFilePDF = ref("");
const combinePDF = ref("");
const infoPage = ref(1);
const uploadPage = ref(1);
const combinePage = ref(1);
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

function changeInfo() {
	PDF.value = infoPDF.value;
	Page.value = 1;
	data.value = "基本資料";
}
function changeCombine() {
	PDF.value = combinePDF.value;
	Page.value = 1;
	data.value = "整合pdf";
}
function changeUploadFile() {
	PDF.value = uploadFilePDF.value;
	Page.value = 1;
	data.value = "檢附資料";
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
