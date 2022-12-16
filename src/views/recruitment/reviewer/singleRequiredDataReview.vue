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
		<div class="p-fluid !mt-5px">
			<SelectButton
				v-model="data"
				:options="datas"
				aria-labelledby="single"
			/>
		</div>
		<div class="mt-10px !h-1830px !ml-40px">
			<vue-pdf-embed
				:source="'data:application/pdf;base64,' + pdfData"
				class="!h-1600px"
				:page="page"
			/>
			<div class="flex !mt-120px justify-around">
				<NButton
					type="Reviewer"
					icon="pi pi-chevron-left"
					iconPos="left"
					@click="page--"
					:disabled="page === 1"
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
					@click="page++"
					:disabled="page === 4"
					class="!w-200px !h-40px"
				>
					<span class="text-base">
						{{ $t("下一頁") }}
					</span>
				</NButton>
			</div>
		</div>
		<div class="bigBlueDivider"></div>
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
import { computed, ref } from "vue";
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

const ID = computed(() => route.params.id);
const name = ref("");
const checked = ref();
const comment = ref("");
const page = ref(1);
const data = ref("基本資料");
const datas = ref(["基本資料", "檢附資料", "整合pdf"]);
// Fix while backend ready
const pdfData = ref(
	"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MDBhXDAwMGNcMDAwT1wwMDBTXDAwMCBySGcsXDAwMDFcMDAwM1wwMDAuXDAwMDD/XDAxMHJIhl9cMDAwMlwwMDAyXDAwMEFcMDAwM1wwMDA4XDAwMDD/XDAxMVwwMDAgXDAwMFFcMDAwdVwwMDBhXDAwMHJcMDAwdFwwMDB6XDAwMCBcMDAwUFwwMDBEXDAwMEZcMDAwQ1wwMDBvXDAwMG5cMDAwdFwwMDBlXDAwMHhcMDAwdCkKL0NyZWF0b3IgKFdvcmQpIC9DcmVhdGlvbkRhdGUgKEQ6MjAyMjEyMDUxMzIyMTJaMDAnMDAnKSAvTW9kRGF0ZSAoRDoyMDIyMTIwNTEzMjIxMlowMCcwMCcpCj4+CmVuZG9iagp4cmVmCjAgMTkKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMTk4IDAwMDAwIG4gCjAwMDAwMDMxNTkgMDAwMDAgbiAKMDAwMDAwMDAyMiAwMDAwMCBuIAowMDAwMDAwMzAyIDAwMDAwIG4gCjAwMDAwMDMxMjMgMDAwMDAgbiAKMDAwMDAwMDAwMCAwMDAwMCBuIAowMDAwMDAzMjkyIDAwMDAwIG4gCjAwMDAwMDAwMDAgMDAwMDAgbiAKMDAwMDAwNTgzNyAwMDAwMCBuIAowMDAwMDAwNDEwIDAwMDAwIG4gCjAwMDAwMDMyNDIgMDAwMDAgbiAKMDAwMDAwMzc5NiAwMDAwMCBuIAowMDAwMDAzNDcxIDAwMDAwIG4gCjAwMDAwMDQwNDEgMDAwMDAgbiAKMDAwMDAwNjI5NSAwMDAwMCBuIAowMDAwMDA1OTk5IDAwMDAwIG4gCjAwMDAwMDY1MzEgMDAwMDAgbiAKMDAwMDAxMzM2MiAwMDAwMCBuIAp0cmFpbGVyCjw8IC9TaXplIDE5IC9Sb290IDExIDAgUiAvSW5mbyAxOCAwIFIgL0lEIFsgPDYzOWEwZjUzNmVkODZkOWI2NTE5YmUwNGQ1OWRjZjg0Pgo8NjM5YTBmNTM2ZWQ4NmQ5YjY1MTliZTA0ZDU5ZGNmODQ+IF0gPj4Kc3RhcnR4cmVmCjEzNzg0CiUlRU9GCg=="
);

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
