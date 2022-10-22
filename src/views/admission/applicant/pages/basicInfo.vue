<template>
	
	<div class="mt-16px pl-8px pr-8px">
		<div class="text-24px font-medium">{{ $t("姓名資訊") }}</div>
		<div class="mt-24px flex">
			<div class="w-1/3">
				<div class="text-16px">{{ $t("稱謂") }}：</div>
				<Dropdown
					v-model="nameInfo.selected_title"
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
					v-model="nameInfo.suffix"
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
					v-model="nameInfo.chLastName"
					placeholder="Text"
					class="!border-gray-900 !w-440px !h-40px !mt-5px"
				/>
			</div>
			<div class="w-1/2">
				<div class="text-16px">{{ $t("中文名字") }}：</div>
				<InputText
					type="text"
					v-model="nameInfo.chFirstName"
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
					v-model="nameInfo.lastName"
					placeholder="Text"
					class="!border-gray-900 !w-300px !h-40px !mt-5px"
				/>
			</div>
			<div class="w-1/3">
				<div class="text-16px">{{ $t("英文中間名字") }}：</div>
				<InputText
					type="text"
					v-model="nameInfo.middleName"
					placeholder="Text"
					class="!border-gray-900 !w-300px !h-40px !mt-5px"
				/>
			</div>
			<div class="w-1/3">
				<div class="text-16px">{{ $t("英文名字") }}：</div>
				<InputText
					type="text"
					v-model="nameInfo.firstName"
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
					v-model="admissionStatusLocal.admissionIdendity"
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
					v-model="admissionStatusLocal.nationality"
					placeholder="Text"
					class="!border-gray-900 !w-300px !h-40px !mt-5px"
				/>
			</div>
			<div class="w-1/3">
				<div class="text-16px">{{ $t("身份證字號") }}：</div>
				<InputText
					type="text"
					v-model="admissionStatusLocal.ID"
					placeholder="Text"
					class="!border-gray-900 !w-300px !h-40px !mt-5px"
				/>
			</div>
		</div>
		<ParagraphDivider />
		<div class="mt-24px text-24px font-medium">
			{{ $t("入學身分(外籍生)") }}
		</div>
		<div class="mt-24px flex">
			<div class="w-1/3">
				<div class="text-16px">{{ $t("入學身分") }}：</div>
				<Dropdown
					v-model="admissionStatus.admissionIdendity"
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
					v-model="admissionStatus.nationality"
					placeholder="Text"
					class="!border-gray-900 !w-300px !h-40px !mt-5px"
				/>
			</div>
			<div class="w-1/3">
				<div class="text-16px">{{ $t("護照號碼") }}：</div>
				<InputText
					type="text"
					v-model="admissionStatus.passport"
					placeholder="Text"
					class="!border-gray-900 !w-300px !h-40px !mt-5px"
				/>
			</div>
			<div class="w-1/3">
				<div class="text-16px">{{ $t("居留證統一證號") }}：</div>
				<InputText
					type="text"
					v-model="admissionStatus.ARC"
					placeholder="Text"
					class="!border-gray-900 !w-300px !h-40px !mt-5px"
				/>
			</div>
		</div>
		<ParagraphDivider />
		<div class="mt-24px text-24px font-medium">{{ $t("戶籍地址") }}</div>

		<div class="mt-24px flex">
			<div class="w-1/2">
				<div class="text-16px">{{ $t("國家") }}：</div>
				<InputText
					type="text"
					v-model="residentAddress.country"
					placeholder="Text"
					class="!border-gray-900 !w-440px !h-40px !mt-5px"
				/>
			</div>
			<div class="w-1/2">
				<div class="text-16px">{{ $t("州") }}：</div>
				<InputText
					type="text"
					v-model="residentAddress.state"
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
					v-model="residentAddress.city"
					placeholder="Text"
					class="!border-gray-900 !w-440px !h-40px !mt-5px"
				/>
			</div>
			<div class="w-1/2">
				<div class="text-16px">{{ $t("郵遞區號") }}：</div>
				<InputText
					type="text"
					v-model="residentAddress.postalCode"
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
					v-model="residentAddress.streetAddress"
					placeholder="Text"
					class="!border-gray-900 !w-440px !h-40px !mt-5px"
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
					v-model="currentAddress.country"
					placeholder="Text"
					class="!border-gray-900 !w-440px !h-40px !mt-5px"
				/>
			</div>
			<div class="w-1/2">
				<div class="text-16px">{{ $t("州") }}：</div>
				<InputText
					type="text"
					v-model="currentAddress.state"
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
					v-model="currentAddress.city"
					placeholder="Text"
					class="!border-gray-900 !w-440px !h-40px !mt-5px"
				/>
			</div>
			<div class="w-1/2">
				<div class="text-16px">{{ $t("郵遞區號") }}：</div>
				<InputText
					type="text"
					v-model="currentAddress.postalCode"
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
					v-model="currentAddress.streetAddress"
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
			<div class="field-radiobutton w-1/5">
				<RadioButton inputId="city1" name="city" value="male" v-model="identityInfo.gender" />
				<label for="city1" class="!border-gray-900 ml-8px font-medium">{{
					$t("男性")
				}}</label>
			</div>
			<div class="field-radiobutton w-1/5">
				<RadioButton inputId="city2" name="city" value="female" v-model="identityInfo.gender" />
				<label  for="city2" class="ml-8px font-medium">{{
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
			<div class="field-radiobutton w-1/5">
				<RadioButton inputId="city3" name="sex" value="male" v-model="identityInfo.sex" />
				<label for="city3" class="ml-8px font-medium">{{
					$t("男性")
				}}</label>
			</div>
			<div class="field-radiobutton w-1/5">
				<RadioButton inputId="city4" name="sex" value="female" v-model="identityInfo.sex" />
				<label for="city4" class="ml-8px font-medium">{{
					$t("女性")
				}}</label>
			</div>
			<div class="field-radiobutton w-1/5">
				<RadioButton inputId="city5" name="sex" value="nonBinary" v-model="identityInfo.sex" />
				<label for="city5" class="ml-8px font-medium">{{
					$t("非二元性別")
				}}</label>
			</div>
		</div>

		<div class="mt-24px flex">
			<div class="w-1/3">
				<div class="text-16px">{{ $t("出生國家") }}：</div>
				<Dropdown
					v-model="identityInfo.country"
					:options="cities"
					optionLabel="name"
					class="!border-gray-900 !w-300px !h-40px mt-10px"
				/>
			</div>
			<div class="w-1/3">
				<div class="text-16px">{{ $t("出生日期") }}：</div>
				<Calendar
					class="!border-gray-900 !w-300px !h-40px !mt-5px"
					inputId="dateformat"
					v-model="date1"
					dateFormat="mm-dd-yy"
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
						v-model="identityInfo.secondCountry"
						:options="cities"
						optionLabel="name"
						class="!border-gray-900 !w-300px !h-40px mt-10px"
					/>
				</span>
			</div>
		</div>
		<div class="flex mt-16px">
			<div class="mt-16px ml-16px">
				<Checkbox
					inputId="file"
					v-model="textCheckedVisa"
					:binary="true"
				/>
				<label for="file" class="ml-8px font-medium"
					>{{ $t("非台灣國籍，簽證類型") }}:</label
				>
			</div>
			<div class="ml-16px">
				<span class="p-float-label">
					<Dropdown
						id="dropdown"
						v-model="identityInfo.visa"
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
					v-model="contactInfo.primaryPhone"
					placeholder="Text"
					class="!border-gray-900 !w-300px !h-40px !mt-5px"
				/>
			</div>
			<div class="w-1/2">
				<div class="text-16px">{{ $t("次要聯絡電話") }}：</div>
				<InputText
					type="text"
					v-model="contactInfo.secondPhone"
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
					v-model="contactInfo.mobilePhone"
					placeholder="Text"
					class="!border-gray-900 !w-300px !h-40px !mt-5px"
				/>
			</div>
			<div class="mt-16px ml-16px">
				<Checkbox inputId="file" v-model="textCheckedphone" :binary="true" />
				<label for="file" class="ml-8px font-medium"
					>{{ $t("行動電話與主要聯絡電話相同") }}</label
				>
			</div>
		</div>
		<div class="mt-24px flex">
			<div class="w-1/3">
				<div class="text-16px">{{ $t("電子信箱") }}：</div>
				<InputText
					type="text"
					v-model="contactInfo.email"
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
import RadioButton from "primevue/radiobutton";
import InputText from "primevue/inputtext";
import Checkbox from "primevue/checkbox";
import Button from "primevue/button";
import Calendar from "primevue/calendar";
import Dropdown from "primevue/dropdown";
import ParagraphDivider from "../../../../styles/paragraphDivider.vue";
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";

const nameInfo = ref({
	selected_title :"" ,
	suffix: "",
	title: "",
	chLastName: "",
	chFirstName: "",
	lastName: "",
	middleName: "",
	firstName: "",
});

const admissionStatusLocal = ref({
	admissionIdendity :"" ,
	nationality: "",
	ID: "",
	
});

const admissionStatus = ref({
	admissionIdendity :"" ,
	nationality: "",
	passport: "",
	ARC: "",
});

const residentAddress = ref({
	country :"" ,
	state: "",
	city: "",
	postalCode: "",
	streetAddress: "",
	
});
const currentAddress = ref({
	country :"" ,
	state: "",
	city: "",
	postalCode: "",
	streetAddress: "",
	
});
const identityInfo = ref({
	sex :"" ,
	gender: "",
	country: "",
	date:Date ,
	streetAddress: "",
	secondCountry: "",
	visa: "",
});
const contactInfo = ref({
	primaryPhone :"" ,
	secondPhone: "",
	mobilePhone: "",
	email: "",
});
const props = defineProps(["userId"]);
const city = ref();
const textCheckedSecondCountry = ref();
const textCheckedVisa = ref(false);
const textCheckedAddress = ref(false);
const textCheckedphone = ref(false);
const message = ref(false);
const date1 = ref();
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
