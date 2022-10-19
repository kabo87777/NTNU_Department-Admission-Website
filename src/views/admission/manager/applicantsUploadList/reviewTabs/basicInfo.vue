<template>
	<div class="mt-16px pl-8px pr-8px">
		<div class="text-24px font-medium">{{ $t("姓名資訊") }}</div>
		<div class="mt-24px flex">
			<div class="w-1/3">
				<div class="text-16px">{{ $t("稱謂") }}：</div>
				<Dropdown
					v-model="selected_title"
					:options="titles"
					optionLabel="type_name"
					optionValue="type_name"
					class="!border-gray-900 !w-300px !h-40px mt-10px"
				/>
			</div>
			<div class="w-1/3">
				<div class="text-16px">{{ $t("後綴") }}：</div>
				<InputText
					type="text"
					v-model="suffix"
					placeholder="Text"
					class="!border-gray-900 !w-300px !h-40px !mt-5px"
				/>
			</div>
		</div>
		<div class="mt-24px flex">
			<div class="w-1/2">
				<div class="text-16px">{{ $t("中文姓氏") }}：</div>
				<InputText
					type="text"
					v-model="title"
					placeholder="Text"
					class="!border-gray-900 !w-440px !h-40px !mt-5px"
				/>
			</div>
			<div class="w-1/2">
				<div class="text-16px">{{ $t("中文名字") }}：</div>
				<InputText
					type="text"
					v-model="suffix"
					placeholder="Text"
					class="!border-gray-900 !w-440px !h-40px !mt-5px"
				/>
			</div>
		</div>
		<div class="mt-24px flex">
			<div class="w-1/3">
				<div class="text-16px">{{ $t("英文姓氏") }}：</div>
				<InputText
					type="text"
					v-model="title"
					placeholder="Text"
					class="!border-gray-900 !w-300px !h-40px !mt-5px"
				/>
			</div>
			<div class="w-1/3">
				<div class="text-16px">{{ $t("英文中間名字") }}：</div>
				<InputText
					type="text"
					v-model="suffix"
					placeholder="Text"
					class="!border-gray-900 !w-300px !h-40px !mt-5px"
				/>
			</div>
			<div class="w-1/3">
				<div class="text-16px">{{ $t("英文名字") }}：</div>
				<InputText
					type="text"
					v-model="suffix"
					placeholder="Text"
					class="!border-gray-900 !w-300px !h-40px !mt-5px"
				/>
			</div>
		</div>
		<ParagraphDivider />
		<div class="mt-24px text-24px font-medium">
			{{ $t("入學身分(本地人士)") }}
		</div>
		<div class="mt-24px flex">
			<div class="w-1/3">
				<div class="text-16px">{{ $t("入學身分") }}：</div>
				<Dropdown
					v-model="selected_type"
					:options="types"
					optionLabel="type_name"
					optionValue="type_name"
					class="!border-gray-900 !w-300px !h-40px mt-10px"
				/>
			</div>
		</div>
		<div class="mt-24px flex">
			<div class="w-1/3">
				<div class="text-16px">{{ $t("國籍") }}：</div>
				<InputText
					type="text"
					v-model="title"
					placeholder="Text"
					class="!border-gray-900 !w-300px !h-40px !mt-5px"
				/>
			</div>
			<div class="w-1/3">
				<div class="text-16px">{{ $t("身份證字號") }}：</div>
				<InputText
					type="text"
					v-model="suffix"
					placeholder="Text"
					class="!border-gray-900 !w-300px !h-40px !mt-5px"
				/>
			</div>
		</div>
		<ParagraphDivider />
		<div class="mt-24px text-24px font-medium">{{ $t("現居地址") }}</div>
		<div class="mt-16px ml-16px">
			<Checkbox
				inputId="text"
				v-model="textCheckedAddress"
				:binary="true"
			/>
			<label for="text" class="ml-8px font-medium">{{
				$t("與戶籍地址資訊相同")
			}}</label>
		</div>

		<div class="mt-24px flex">
			<div class="w-1/2">
				<div class="text-16px">{{ $t("國家") }}：</div>
				<InputText
					type="text"
					v-model="suffix"
					placeholder="Text"
					class="!border-gray-900 !w-440px !h-40px !mt-5px"
				/>
			</div>
			<div class="w-1/2">
				<div class="text-16px">{{ $t("州") }}：</div>
				<InputText
					type="text"
					v-model="suffix"
					placeholder="Text"
					class="!border-gray-900 !w-440px !h-40px !mt-5px"
				/>
			</div>
		</div>
		<div class="mt-24px flex">
			<div class="w-1/2">
				<div class="text-16px">{{ $t("城市") }}：</div>
				<InputText
					type="text"
					v-model="title"
					placeholder="Text"
					class="!border-gray-900 !w-440px !h-40px !mt-5px"
				/>
			</div>
			<div class="w-1/2">
				<div class="text-16px">{{ $t("郵遞區號") }}：</div>
				<InputText
					type="text"
					v-model="suffix"
					placeholder="Text"
					class="!border-gray-900 !w-440px !h-40px !mt-5px"
				/>
			</div>
		</div>
		<div class="mt-24px">
			<div class="w-2/3">
				<div class="text-16px">{{ $t("街道地址") }}：</div>
				<InputText
					type="text"
					v-model="suffix"
					placeholder="Text"
					class="!border-gray-900 !w-440px !h-40px !mt-5px"
				/>
			</div>
		</div>
		<ParagraphDivider />
		<div class="mt-24px text-24px font-medium">{{ $t("身份資料") }}</div>
		<div class="mt-24px flex">
			<div class="w-1/3">
				<div class="text-16px">{{ $t("法定性別") }}：</div>
			</div>
		</div>

		<div class="mt-24px flex">
			<div class="w-1/5">
				<Checkbox
					inputId="text"
					v-model="textCheckedMan"
					:binary="true"
				/>
				<label for="text" class="ml-8px font-medium">{{
					$t("男性")
				}}</label>
			</div>
			<div class="w-1/5">
				<Checkbox
					inputId="text"
					v-model="textCheckedWoman"
					:binary="true"
				/>
				<label for="text" class="ml-8px font-medium">{{
					$t("女性")
				}}</label>
			</div>
		</div>
		<div class="mt-24px flex">
			<div class="w-1/3">
				<div class="text-16px">{{ $t("性別認同") }}：</div>
			</div>
		</div>
		<div class="mt-24px flex">
			<div class="w-1/5">
				<Checkbox
					inputId="text"
					v-model="textCheckedM"
					:binary="true"
				/>
				<label for="text" class="ml-8px font-medium">{{
					$t("男性")
				}}</label>
			</div>
			<div class="w-1/5">
				<Checkbox
					inputId="text"
					v-model="textCheckedW"
					:binary="true"
				/>
				<label for="text" class="ml-8px font-medium">{{
					$t("女性")
				}}</label>
			</div>
			<div class="w-1/5">
				<Checkbox
					inputId="text"
					v-model="textCheckedB"
					:binary="true"
				/>
				<label for="text" class="ml-8px font-medium">{{
					$t("非二元性別")
				}}</label>
			</div>
		</div>
		<div class="mt-24px flex">
			<div class="w-1/3">
				<div class="text-16px">{{ $t("出生國家") }}：</div>
				<Dropdown
					v-model="country"
					:options="cities"
					optionLabel="name"
					class="!border-gray-900 !w-300px !h-40px mt-10px"
				/>
			</div>
			<div class="w-1/3">
				<div class="text-16px">{{ $t("出生日期") }}：</div>
				<Calendar
					class="!border-gray-900 !w-300px !h-40px !mt-5px"
					inputId="time24"
					v-model="date1"
					:showTime="true"
					:showSeconds="true"
					:showIcon="true"
				>
				</Calendar>
			</div>
		</div>
		<div class="flex mt-16px">
			<div class="mt-16px ml-16px">
				<Checkbox
					inputId="file"
					v-model="textCheckedSecondCountry"
					:binary="true"
				/>
				<label for="file" class="ml-8px font-medium"
					>{{ $t("是否有雙重國籍，第二國籍身分") }}:</label
				>
			</div>
			<div class="ml-16px">
				<span class="p-float-label">
					<Dropdown
						v-model="countrySecond"
						:options="cities"
						optionLabel="name"
						class="!border-gray-900 !w-300px !h-40px mt-10px"
					/>
				</span>
			</div>
		</div>
		<div class="flex mt-16px">
			<div class="mt-16px ml-16px">
				<Checkbox inputId="file" v-model="textCheckedVisa" :binary="true" />
				<label for="file" class="ml-8px font-medium"
					>{{ $t("非台灣國籍，簽證類型") }}:</label
				>
			</div>
			<div class="ml-16px">
				<span class="p-float-label">
					<Dropdown
						id="dropdown"
						v-model="selected_visa"
						:options="cities"
						optionLabel="name"
						class="h-10 w-40"
					/>
				</span>
			</div>
		</div>
		<ParagraphDivider />
		<div class="mt-24px text-24px font-medium">{{ $t("聯絡方式") }}</div>
		<div class="mt-24px flex">
			<div class="w-1/2">
				<div class="text-16px">{{ $t("主要聯絡電話") }}：</div>
				<InputText
					type="text"
					v-model="title"
					placeholder="Text"
					class="!border-gray-900 !w-300px !h-40px !mt-5px"
				/>
			</div>
			<div class="w-1/2">
				<div class="text-16px">{{ $t("次要聯絡電話") }}：</div>
				<InputText
					type="text"
					v-model="title"
					placeholder="Text"
					class="!border-gray-900 !w-300px !h-40px !mt-5px"
				/>
			</div>
		</div>
		<div class="mt-24px flex">
			<div class="w-1/2">
				<div class="text-16px">{{ $t("行動電話") }}：</div>
				<InputText
					type="text"
					v-model="suffix"
					placeholder="Text"
					class="!border-gray-900 !w-300px !h-40px !mt-5px"
				/>
			</div>
			<div class="mt-16px ml-16px">
				<Checkbox inputId="file" v-model="phone" :binary="true" />
				<label for="file" class="ml-8px font-medium"
					>{{ $t("行動電話與主要聯絡電話相同") }}:</label
				>
			</div>
		</div>
		<div class="mt-24px flex">
			<div class="w-1/3">
				<div class="text-16px">{{ $t("電子信箱") }}：</div>
				<InputText
					type="text"
					v-model="suffix"
					placeholder="Text"
					class="!border-gray-900 !w-300px !h-40px !mt-5px"
				/>
			</div>
		</div>
		<div class="mt-24px flex">
			<div class="mt-16px ml-16px">
				<Checkbox inputId="file" v-model="message" :binary="true" />
				<label for="file" class="ml-8px font-medium"
					>{{ $t("願意承擔手機簡訊費用") }}:</label
				>
			</div>
		</div>
	</div>
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
import Calendar from "primevue/calendar";
import Dropdown from "primevue/dropdown";
import ParagraphDivider from "../../../../../styles/paragraphDivider.vue";
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";
const props = defineProps(["userId"]);
const title = ref("");
const suffix = ref("");
const selected_visa = ref();
const textCheckedSecondCountry = ref();
const textCheckedVisa = ref();
const textCheckedAddress = ref(false);
const textCheckedMan = ref(false);
const textCheckedWoman = ref(false);
const textCheckedM = ref(false);
const textCheckedW = ref(false);
const textCheckedB = ref(false);
const phone = ref(false);
const message = ref(false);
const countrySecond = ref();
const country = ref();
const date1 = ref();
const selected_type = ref({});
const types = ref([
	{ type_name: "特殊選才" },
	{ type_name: "碩士班徵試入學" },
	{ type_name: "博士班徵試入學" },
]);
const selected_title = ref({});
const titles = ref([{ type_name: "先生" }, { type_name: "小姐" }]);
const cities = ref([
	{ name: "New York", code: "NY" },
	{ name: "Rome", code: "RM" },
	{ name: "London", code: "LDN" },
	{ name: "Istanbul", code: "IST" },
	{ name: "Paris", code: "PRS" },
]);
console.log(props.userId, "basic info tab");
</script>
