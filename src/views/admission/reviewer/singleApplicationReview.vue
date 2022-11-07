<template>
	<div class="ml-128px mr-128px mt-62px">
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
		<div class="flex mt-32px">
			<div class="text-xl mt-5px">
				{{ $t("學習歷程") }} ({{ learningExProportion }}%)
			</div>
			<InputNumber
				inputId="integeronly"
				v-model="inputScore_1"
				class="ml-34px !w-132px !h-44px"
			/>
			<div class="text-xl ml-125px mt-5px">
				{{ $t("發展潛能") }} ({{ devPotentialProportion }}%)
			</div>
			<InputNumber
				inputId="integeronly"
				v-model="inputScore_2"
				class="ml-34px !w-132px !h-44px"
			/>
			<div class="text-xl ml-125px mt-5px">
				{{ $t("學習潛力") }} ({{ learnPotentialProportion }}%)
			</div>
			<InputNumber
				inputId="integeronly"
				v-model="inputScore_3"
				class="ml-34px !w-132px !h-44px"
			/>
		</div>
		<div class="flex mt-42px">
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
import { useRoute } from "vue-router";
import Button from "primevue/button";
import InputNumber from "primevue/inputnumber";
import Checkbox from "primevue/checkbox";
import InputText from "primevue/inputtext";
import { useI18n } from "vue-i18n";
import PDFView from "@/components/pdfPreview.vue";
import jsPdf from "./test.pdf";

const route = useRoute();
const { t } = useI18n();

// FIXME: logic may refactor

const ID = computed(() => route.params.id);
const inputScore_1 = ref(25);
const inputScore_2 = ref(22);
const inputScore_3 = ref(31);
const accessChecked = ref();
const disable = computed(() => !accessChecked.value);
const accessReason = ref("");
const total_score = computed(
	() => inputScore_1.value + inputScore_2.value + inputScore_3.value
);
const learningExProportion = ref(30);
const devPotentialProportion = ref(30);
const learnPotentialProportion = ref(40);

// FIXME: This should not be hardcode.

const data_list = ref([
	{
		id: "1000",
		name: "Aaa",
		score_1: 25,
		score_2: 25,
		score_3: 30,
		total_score: 80,
		contactInfo: "0912345678",
		schoolEx: "a國小 b國中 c高中",
		exam: "GRE:340 TOEFL:120",
		otherInfo: "olympic champion",
	},
	{
		id: "1001",
		name: "Bbb",
		score_1: 25,
		score_2: 25,
		score_3: 30,
		total_score: 80,
		contactInfo: "0912345678",
		schoolEx: "a國小 b國中 c高中",
		exam: "GRE:340 TOEFL:120",
		otherInfo: "olympic champion",
	},
	{
		id: "1002",
		name: "Ccc",
		score_1: 25,
		score_2: 25,
		score_3: 30,
		total_score: 80,
		contactInfo: "0912345678",
		schoolEx: "a國小 b國中 c高中",
		exam: "GRE:340 TOEFL:120",
		otherInfo: "olympic champion",
	},
	{
		id: "1003",
		name: "Ddd",
		score_1: 25,
		score_2: 25,
		score_3: 30,
		total_score: 80,
		contactInfo: "0912345678",
		schoolEx: "a國小 b國中 c高中",
		exam: "GRE:340 TOEFL:120",
		otherInfo: "olympic champion",
	},
	{
		id: "1004",
		name: "Eee",
		score_1: 25,
		score_2: 25,
		score_3: 30,
		total_score: 80,
		contactInfo: "0912345678",
		schoolEx: "a國小 b國中 c高中",
		exam: "GRE:340 TOEFL:120",
		otherInfo: "olympic champion",
	},
	{
		id: "1005",
		name: "fff",
		score_1: 25,
		score_2: 25,
		score_3: 30,
		total_score: 80,
		contactInfo: "0912345678",
		schoolEx: "a國小 b國中 c高中",
		exam: "GRE:340 TOEFL:120",
		otherInfo: "olympic champion",
	},
	{
		id: "1006",
		name: "Ggg",
		score_1: 25,
		score_2: 25,
		score_3: 30,
		total_score: 80,
		contactInfo: "0912345678",
		schoolEx: "a國小 b國中 c高中",
		exam: "GRE:340 TOEFL:120",
		otherInfo: "olympic champion",
	},
	{
		id: "1007",
		name: "Hhh",
		score_1: 25,
		score_2: 25,
		score_3: 30,
		total_score: 80,
		contactInfo: "0912345678",
		schoolEx: "a國小 b國中 c高中",
		exam: "GRE:340 TOEFL:120",
		otherInfo: "olympic champion",
	},
	{
		id: "1008",
		name: "Iii",
		score_1: 25,
		score_2: 25,
		score_3: 30,
		total_score: 80,
		contactInfo: "0912345678",
		schoolEx: "a國小 b國中 c高中",
		exam: "GRE:340 TOEFL:120",
		otherInfo: "olympic champion",
	},
	{
		id: "1009",
		name: "Jjj",
		score_1: 25,
		score_2: 25,
		score_3: 30,
		total_score: 80,
		contactInfo: "0912345678",
		schoolEx: "a國小 b國中 c高中",
		exam: "GRE:340 TOEFL:120",
		otherInfo: "olympic champion",
	},
	{
		id: "1010",
		name: "Kkk",
		score_1: 25,
		score_2: 25,
		score_3: 30,
		total_score: 80,
		contactInfo: "0912345678",
		schoolEx: "a國小 b國中 c高中",
		exam: "GRE:340 TOEFL:120",
		otherInfo: "olympic champion",
	},
]);

const name = computed(
	() =>
		data_list.value[data_list.value.findIndex((obj) => obj.id == ID.value)]
			.name
);

function saveScore() {
	data_list.value[
		data_list.value.findIndex((obj) => obj.id == ID.value)
	].score_1 = inputScore_1.value;
	data_list.value[
		data_list.value.findIndex((obj) => obj.id == ID.value)
	].score_2 = inputScore_2.value;
	data_list.value[
		data_list.value.findIndex((obj) => obj.id == ID.value)
	].score_3 = inputScore_3.value;
}
</script>
