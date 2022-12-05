<template>
	<div class="mt-16px">
		<div class="mt-16px">
			<div>
				<label class="ml-8px text-24px font-medium">{{
					$t("系統設置")
				}}</label>
			</div>
		</div>
		<div>
			<SelectButton
				class="mt-16px pl-16px selecttable"
				v-model="activeTab"
				:options="tabOptions"
				optionLabel="name"
				aria-labelledby="single"
			>
			</SelectButton>
		</div>
		<div class="flex mt-16px">
			<div class="w-1/3 pl-16px">{{ $t("開放時間") }}</div>
			<div class="w-1/3 pl-16px">{{ $t("截止時間") }}</div>
		</div>
		<div class="flex mt-16px">
			<div class="w-1/3 pl-16px">
				<Calendar
					inputId="time24"
					v-model="date1"
					:showTime="true"
					:showSeconds="true"
					:showIcon="true"
				>
				</Calendar>
			</div>
			<div class="w-1/3 pl-16px">
				<Calendar
					inputId="time24"
					v-model="date2"
					:showTime="true"
					:showSeconds="true"
					:showIcon="true"
				>
				</Calendar>
			</div>
		</div>

		<ParagraphDivider />

		<div class="mt-16px">
			<div>
				<label class="ml-8px text-24px font-medium">{{
					$t("補件需求")
				}}</label>
			</div>
		</div>
		<div class="block mt-16px">
			<div class="w-1/3 pl-16px">{{ $t("補件需求說明") }}:</div>
			<div class="mt-8px ml-16px">
				<InputText type="text" v-model="inputvalue" class="h-10" />
				<span :style="{ marginLeft: '.5em' }">{{ inputvalue }}</span>
			</div>
		</div>

		<div class="bigRedDivider" style="margin-top: 32px"></div>
		<div class="mt-16px ml-20px grid justify-center">
			<Button
				@click="displayEmail"
				class="grid justify-center p-button-outlined p-button-secondary text-20px tracking-wide"
			>
				{{ $t("寄送E-mail通知") }}
			</Button>
		</div>

		<div class="mt-20px"></div>
	</div>
	<Dialog
		header="寄送email通知"
		v-model:visible="emailNotification"
		class="w-484px h-238px !tracking-4px"
	>
		<divider class="!mt-0px" />
		<p class="mt-24px text-base tracking-2px">
			{{ $t("確定要寄送email通知已開啟補件系統嗎") }}?
		</p>
		<div class="flex">
			<Button
				@click="closeEmail"
				class="p-button-outlined p-button-success !ml-70px !mt-26px !w-105px !h-44px"
			>
				<img
					alt="logo"
					src="/assets/sidebar/Done_round.png"
					style="width: 1.25rem"
					class="!ml-0px"
				/>
				<span class="text-left text-xl">
					{{ $t("確定") }}
				</span>
			</Button>
			<Button
				@click="closeEmail"
				class="p-button-outlined p-button-danger !ml-32px !mt-26px !w-105px !h-44px"
			>
				<img
					alt="logo"
					src="/assets/sidebar/Close_round.png"
					style="width: 1.25rem"
					class="!ml-0px"
				/>
				<span class="text-left text-xl">{{ $t("取消") }}</span>
			</Button>
		</div>
	</Dialog>
</template>

<script setup lang="ts">
import "@/styles/customize.css";
import "primeicons/primeicons.css";
import { onMounted } from "vue";

import SelectButton from "primevue/selectbutton";
import MultiSelect from "primevue/multiselect";
import InputText from "primevue/inputtext";
import Checkbox from "primevue/checkbox";
import Button from "primevue/button";
import Dropdown from "primevue/dropdown";
import Calendar from "primevue/calendar";
import Dialog from "primevue/dialog";
import ParagraphDivider from "../../../../../styles/paragraphDivider.vue";
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";
const selectedCity = ref();
const { t } = useI18n();
const textChecked = ref(false);
const fileChecked = ref(false);
const date1 = ref();
const date2 = ref();
let today = new Date();
let month = today.getMonth();
let year = today.getFullYear();
let prevMonth = month === 0 ? 11 : month - 1;
let prevYear = prevMonth === 11 ? year - 1 : year;
let nextMonth = month === 11 ? 0 : month + 1;
let nextYear = nextMonth === 0 ? year + 1 : year;

const inputvalue = ref();
const translation = {
	basicCol: t("Turn ON"),
	attachmentCol: t("TurnOFF"),
};
const activeTab = ref({ name: translation.basicCol, value: 1 });
const tabOptions = ref([
	{ name: translation.basicCol, value: 1 },
	{ name: translation.attachmentCol, value: 2 },
]);
const selectedCities1 = ref();
const value8 = ref();
const cities = ref([{ name: ".pdf", code: "pdf" }]);

const props = defineProps(["userId"]);
console.log(props.userId, "additional info tab");
const emailNotification = ref(false);
function displayEmail() {
	emailNotification.value = true;
}

function closeEmail() {
	emailNotification.value = false;
}
</script>

<style setup lang="css">
.selecttable {
	height: 50%;
	width: 25%;
	/* background-color: powderblue; */
}
</style>
