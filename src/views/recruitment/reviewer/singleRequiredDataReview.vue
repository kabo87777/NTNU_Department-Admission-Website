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
		<div class="bigBrownDivider"></div>
		<div class="mt-10px h-670px">
			<PDFView :pdfUrl="jsPdf" class="!h650px" />
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
				v-model="reason"
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
import { computed, onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import Button from "primevue/button";
import Dropdown from "primevue/dropdown";
import Checkbox from "primevue/checkbox";
import InputText from "primevue/inputtext";
import { useI18n } from "vue-i18n";
import PDFView from "@/components/pdfPreview.vue";
import jsPdf from "./test.pdf";

const route = useRoute();
const { t } = useI18n();

const ID = computed(() => route.params.id);
const inputScore_1 = ref(25);
const inputScore_2 = ref(22);
const inputScore_3 = ref(31);
const checked = ref();
const disable = computed(() => !checked.value);
const accessReason = ref("");
const total_score = computed(
	() => inputScore_1.value + inputScore_2.value + inputScore_3.value
);
const reason = ref("");

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

const name = computed(
	() =>
		data_list.value[data_list.value.findIndex((obj) => obj.id == ID.value)]
			.name
);

const nameInfo = computed(
	() =>
		data_list.value[data_list.value.findIndex((obj) => obj.id == ID.value)]
			.name
);

function saveScore() {
	console.log("save");
}
</script>
