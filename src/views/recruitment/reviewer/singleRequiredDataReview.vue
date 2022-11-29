<template>
	<div class="ml-128px mr-128px mt-62px">
		<div class="flex">
			<router-link
				to="/recruitment/reviewer/requiredDataReview"
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
						{{ $t("必看資料評閱") }}
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
		<div class="p-fluid">
			<SelectButton
				v-model="data"
				:options="datas"
				aria-labelledby="single"
				disabled
				class="!h-50px"
			/>
		</div>
		<div class="bigBrownDivider"></div>
		<div class="mt-10px h-670px">
			<PDFView
				:pdfUrl="jsPdf"
				class="!h650px"
				v-if="data != '基本資料'"
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
const data = ref("基本資料");
const datas = ref(["基本資料", "PDF"]);

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
		try {
			return await api.getApplicantComment(
				store.recruitmentReviewerProgram!.id!,
				ID.value
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
		try {
			return await api.getApplicantInfo(
				store.recruitmentReviewerProgram!.id!,
				ID.value
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
