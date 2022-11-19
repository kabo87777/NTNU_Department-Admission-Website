<template>
	<div v-if="load"></div>
	<div class="ml-128px mr-128px mt-62px" v-else>
		<div class="flex">
			<router-link
				to="/admission/reviewer/applicationReview"
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
						{{ $t("書面資料評閱") }}
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
		<div class="bigBrownDivider"></div>
		<div class="mt-10px h-670px">
			<PDFView :pdfUrl="jsPdf" class="!h650px" />
		</div>
		<div class="bigBlueDivider"></div>
		<div class="flex mt-16px">
			<div class="text-xl mt-5px">
				{{ score1Title }} ({{ score1Proportion }}%)
			</div>
			<InputNumber
				inputId="integeronly"
				v-model="inputScore_1"
				class="ml-34px !w-132px !h-44px"
			/>
			<div class="text-xl ml-125px mt-5px">
				{{ score2Title }} ({{ score2Proportion }}%)
			</div>
			<InputNumber
				inputId="integeronly"
				v-model="inputScore_2"
				class="ml-34px !w-132px !h-44px"
			/>
			<div class="text-xl ml-125px mt-5px">
				{{ score3Title }} ({{ score3Proportion }}%)
			</div>
			<InputNumber
				inputId="integeronly"
				v-model="inputScore_3"
				class="ml-34px !w-132px !h-44px"
			/>
		</div>
		<div class="flex mt-16px">
			<div class="text-xl mt-5px">
				{{ score4Title }} ({{ score4Proportion }}%)
			</div>
			<InputNumber
				inputId="integeronly"
				v-model="inputScore_4"
				class="ml-34px !w-132px !h-44px"
			/>
			<div class="text-xl ml-125px mt-5px">
				{{ score5Title }} ({{ score5Proportion }}%)
			</div>
			<InputNumber
				inputId="integeronly"
				v-model="inputScore_5"
				class="ml-34px !w-132px !h-44px"
			/>
		</div>
		<div class="flex mt-24px">
			<Checkbox
				inputId="binary"
				v-model="accessChecked"
				:binary="true"
				class="!w-31px !h-31px mt-9px"
			/>
			<div class="text-xl ml-5px mt-5px">
				{{ $t("逕取，逕取原因：") }}
			</div>
			<InputText
				type="text"
				v-model="accessReason"
				class="!w-549px !h-44px"
				:disabled="disable"
			/>
			<div class="text-xl ml-220px mt-5px">
				{{ $t("書面分數合計： ") }} {{ total_score }} {{ $t("分") }}
			</div>
			<Button
				class="w-100px h-40px !ml-20px p-button-success"
				@click="saveScore"
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
import { useRoute, useRouter } from "vue-router";
import Button from "primevue/button";
import InputNumber from "primevue/inputnumber";
import Checkbox from "primevue/checkbox";
import InputText from "primevue/inputtext";
import { useI18n } from "vue-i18n";
import PDFView from "@/components/pdfPreview.vue";
import jsPdf from "./test.pdf";
import { useAdmissionReviewerAuthStore } from "@/stores/universalAuth";
import { AdmissionReviewerAPI } from "@/api/admission/reviewer/api";
import { useMutation, useQuery } from "@tanstack/vue-query";
import { InvalidSessionError } from "@/api/error";
import { useGlobalStore } from "@/stores/globalStore";
import { useToast } from "primevue/usetoast";

const route = useRoute();
const { t } = useI18n();
const router = useRouter();

const adminAuth = useAdmissionReviewerAuthStore();
const store = useGlobalStore();
const api = new AdmissionReviewerAPI(adminAuth);

// FIXME: logic may refactor

const ID = computed(() => route.params.id);
const newApplicantGrade = useMutation(async (newProgramData: any) => {
	try {
		return await api.updateSingleApplicantGrade(ID.value, newProgramData);
	} catch (error) {
		console.log(error);
	}
});
const accessChecked = ref();
const disable = computed(() => !accessChecked.value);
const accessReason = ref("");
const score1Proportion = ref(30);
const score2Proportion = ref(30);
const score3Proportion = ref(40);
const score4Proportion = ref(0);
const score5Proportion = ref(0);
const score1Title = ref("");
const score2Title = ref("");
const score3Title = ref("");
const score4Title = ref("評分項目四");
const score5Title = ref("評分項目五");
const inputScore_1 = ref(0);
const inputScore_2 = ref(0);
const inputScore_3 = ref(0);
const inputScore_4 = ref(0);
const inputScore_5 = ref(0);
const name = ref("");
const total_score = computed(() => {
	return (
		(inputScore_1!.value! * score1Proportion.value) / 100 +
		(inputScore_2!.value! * score2Proportion.value) / 100 +
		(inputScore_3!.value! * score3Proportion.value) / 100 +
		(inputScore_4!.value! * score4Proportion.value) / 100 +
		(inputScore_5!.value! * score5Proportion.value) / 100
	);
});

const {
	isLoading,
	isError,
	data: applicantGrade,
	error,
} = useQuery(
	["applicantGrade"],
	async () => {
		try {
			return await api.getSingleApplicantGrade(ID.value);
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
			inputScore_1.value = data!.docs_grade_1;
			inputScore_2.value = data!.docs_grade_2;
			inputScore_3.value = data!.docs_grade_3;
			inputScore_4.value = data!.docs_grade_4;
			inputScore_5.value = data!.docs_grade_5;
			accessChecked.value = data!.isImmediateEnroll;
			accessReason.value = data!.immediate_enroll_comment;
		},
	}
);

const { data: applicantInfo } = useQuery(
	["applicantInfo"],
	async () => {
		try {
			return await api.getSingleApplicantInfo(ID.value);
		} catch (e: any) {
			if (e instanceof InvalidSessionError) {
				// FIXME: show session expiry notification??
				// Why are we even here in the first place?
				// MainContainer should have checked already.
				console.error(
					"Session has already expired while querying applicantInfo"
				);
				router.push("/");
				return;
			}
		}
	},
	{
		onSuccess: (data) => {
			name.value = data![0].name;
		},
	}
);

const { data: programGrading } = useQuery(
	["programGrading"],
	async () => {
		try {
			return await api.getProgramGrading(
				store.admissionReviewerProgram!.id
			);
		} catch (e: any) {
			if (e instanceof InvalidSessionError) {
				// FIXME: show session expiry notification??
				// Why are we even here in the first place?
				// MainContainer should have checked already.
				console.error(
					"Session has already expired while querying applicantInfo"
				);
				router.push("/");
				return;
			}
		}
	},
	{
		onSuccess: (data) => {
			score1Title.value = data!.docs_grade_name_1;
			score2Title.value = data!.docs_grade_name_2;
			score3Title.value = data!.docs_grade_name_3;
			if (data!.docs_grade_name_4) {
				score4Title.value = data!.docs_grade_name_4;
			}
			if (data!.docs_grade_name_5) {
				score5Title.value = data!.docs_grade_name_5;
			}
			score1Proportion.value = data!.docs_grade_weight_1;
			score2Proportion.value = data!.docs_grade_weight_2;
			score3Proportion.value = data!.docs_grade_weight_3;
			if (data!.docs_grade_weight_4) {
				score4Proportion.value = data!.docs_grade_weight_4;
			}
			if (data!.docs_grade_weight_5) {
				score5Proportion.value = data!.docs_grade_weight_5;
			}
		},
	}
);

const load = computed(() => {
	if (isLoading.value) {
		return true;
	}
	return false;
});

const toast = useToast();
function saveScore() {
	const today = new Date();
	try {
		newApplicantGrade.mutate({
			docs_grade_1: inputScore_1.value,
			docs_grade_2: inputScore_2.value,
			docs_grade_3: inputScore_3.value,
			docs_grade_4: inputScore_4.value,
			docs_grade_5: inputScore_5.value,
			isImmediateEnroll: accessChecked.value,
			immediate_enroll_comment: accessReason.value,
			isDocsGraded: true,
			updated_at: dateTransform(today) + "+08:00",
		});
		toast.add({ severity: "success", summary: "保存成功", life: 3000 });
	} catch (error) {
		toast.add({ severity: "error", summary: "資料錯誤", life: 3000 });
	}
}

function dateTransform(date?: Date) {
	const result = new Date(date!.setHours(date!.getHours() + 8))
		.toJSON()
		.replace("Z", "");
	return result;
}
</script>
