<template>
	<div class="ml-128px mr-128px mt-62px">
		<div class="flex">
			<router-link
				to="/recruitment/reviewer/optionalDataReview"
				custom
				v-slot="{ navigate }"
			>
				<Button
					class="p-button-secondary p-button-text !w-164px !h-29px"
					@click="navigate"
					role="link"
				>
					<img
						alt="logo"
						src="/assets/reviewer-page/Expand_left.png"
						style="width: 1.5rem"
					/>
					<span class="text-base">
						{{ $t("選看資料評閱") }}
					</span>
				</Button>
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
		<div class="mt-10px !h-1800px">
			<vue-pdf-embed
				:source="'data:application/pdf;base64,' + pdfData"
				class="!h-1600px"
				:page="page"
			/>
			<Button
				label="上一頁"
				icon="pi pi-chevron-left"
				iconPos="left"
				@click="page--"
				:disabled="page === 1"
				class="!mt-120px"
			/>
			<Button
				label="下一頁"
				icon="pi pi-chevron-right"
				iconPos="right"
				@click="page++"
				:disabled="page === 4"
				class="!ml-1050px"
			/>
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
			<Checkbox
				inputId="binary"
				v-model="checked"
				:binary="true"
				class="!w-31px !h-31px mt-9px"
			/>
			<div class="text-xl ml-5px mt-5px">
				{{ $t("已閱讀所有必看資料 (*字號部分之資料)") }}
			</div>
			<Button
				class="w-100px h-40px !ml-795px p-button-success"
				@click="saveScore"
				:disabled="!checked"
			>
				<img
					alt="logo"
					src="/assets/project-setting/Check_fill.png"
					style="width: 1.5rem"
					class="fill-green-500"
				/>
				<span class="tracking-1px">{{ $t("保存") }}</span>
			</Button>
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
	"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RJMpcWBK8sCEyK53w+OOfxce90teWN0vVxgjJs7LGWK8OtpkCIuI6ByU2u/0iWmFc+L7WMJi+lgSUkyRiQmxQ/PndZ2XPED2MSA5mfrqmoH1l3uUCOQrAv8qF1Pky+XIC9Qtrmhc/D8HIO1iCmVuZHN0cmVhbQplbmRvYmoKMTggMCBvYmoKPDwgL1RpdGxlICj+/1wwMDBNXDAwMGlcMDAwY1wwMDByXDAwMG9cMDAwc1wwMDBvXDAwMGZcMDAwdFwwMDAgXDAwMFdcMDAwb1wwMDByXDAwMGRcMDAwIFwwMDAtXDAwMCBlh072XDAwMDMpCi9Qcm9kdWNlciAo/v9cMDAwbVwwMDBhXDAwMGNcMDAwT1wwMDBTXDAwMCBySGcsXDAwMDFcMDAwM1wwMDAuXDAwMDD/XDAxMHJIhl9cMDAwMlwwMDAyXDAwMEFcMDAwM1wwMDA4XDAwMDD/XDAxMVwwMDAgXDAwMFFcMDAwdVwwMDBhXDAwMHJcMDAwdFwwMDB6XDAwMCBcMDAwUFwwMDBEXDAwMEZcMDAwQ1wwMDBvXDAwMG5cMDAwdFwwMDBlXDAwMHhcMDAwdCkKL0NyZWF0b3IgKFdvcmQpIC9DcmVhdGlvbkRhdGUgKEQ6MjAyMjEyMDUxMzIyMjVaMDAnMDAnKSAvTW9kRGF0ZSAoRDoyMDIyMTIwNTEzMjIyNVowMCcwMCcpCj4+CmVuZG9iagp4cmVmCjAgMTkKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMjAyIDAwMDAwIG4gCjAwMDAwMDMxNjMgMDAwMDAgbiAKMDAwMDAwMDAyMiAwMDAwMCBuIAowMDAwMDAwMzA2IDAwMDAwIG4gCjAwMDAwMDMxMjcgMDAwMDAgbiAKMDAwMDAwMDAwMCAwMDAwMCBuIAowMDAwMDAzMjk2IDAwMDAwIG4gCjAwMDAwMDAwMDAgMDAwMDAgbiAKMDAwMDAwNjEwMSAwMDAwMCBuIAowMDAwMDAwNDE0IDAwMDAwIG4gCjAwMDAwMDMyNDYgMDAwMDAgbiAKMDAwMDAwMzgwMCAwMDAwMCBuIAowMDAwMDAzNDc1IDAwMDAwIG4gCjAwMDAwMDQwNDUgMDAwMDAgbiAKMDAwMDAwNjU1OSAwMDAwMCBuIAowMDAwMDA2MjYzIDAwMDAwIG4gCjAwMDAwMDY3OTUgMDAwMDAgbiAKMDAwMDAxMzYyNiAwMDAwMCBuIAp0cmFpbGVyCjw8IC9TaXplIDE5IC9Sb290IDExIDAgUiAvSW5mbyAxOCAwIFIgL0lEIFsgPDRkZTdjOTUzM2JlZjZmOWM3Mjc2NWIxOGQzNjI5MTM4Pgo8NGRlN2M5NTMzYmVmNmY5YzcyNzY1YjE4ZDM2MjkxMzg+IF0gPj4Kc3RhcnR4cmVmCjE0MDQ4CiUlRU9GCg=="
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
