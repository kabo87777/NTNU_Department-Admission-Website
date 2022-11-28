<template>
	<div class="mt-16px pl-8px pr-8px">
		<div class="w-1/2">
			<label class="text-24px font-medium">{{ $t("姓名資訊") }}</label>
			<label class="pl-8px">
				<i class="text-green pi pi-check"></i>
			</label>
			<label class="pl-8px text-14px text-stone-500">
				"*"{{ $t("米字號表示該項目為必填欄位") }}
			</label>
		</div>
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
		<div class="w-600px">
			<label class="text-24px font-medium">{{
				$t("入學身分(本地人士)")
			}}</label>
			<label class="pl-8px">
				<i class="text-green pi pi-pencil"></i>
			</label>
			<label class="pl-8px text-14px text-stone-500">
				"*"{{ $t("米字號表示該項目為必填欄位") }}
			</label>
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
		<div class="w-600px">
			<label class="text-24px font-medium">{{
				$t("入學身分(外籍生)")
			}}</label>
			<label class="pl-8px">
				<i class="text-green pi pi-pencil"></i>
			</label>
			<label class="pl-8px text-14px text-stone-500">
				"*"{{ $t("米字號表示該項目為必填欄位") }}
			</label>
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
		<div class="w-600px">
			<label class="text-24px font-medium">{{ $t("戶籍地址") }}</label>
			<label class="pl-8px">
				<i class="text-green pi pi-pencil"></i>
			</label>
			<label class="pl-8px text-14px text-stone-500">
				"*"{{ $t("米字號表示該項目為必填欄位") }}
			</label>
		</div>
		<div class="mt-24px">
			<div class="w-3/4">
				<div class="text-16px">{{ $t("地址") }}：</div>
				<InputText
					type="text"
					v-model="residentAddress.Address"
					placeholder="Text"
					class="!border-gray-900 !w-440px !h-40px !mt-5px"
				/>
			</div>
		</div>
		<ParagraphDivider />
		<div class="w-600px">
			<label class="text-24px font-medium">{{ $t("現居地址") }}</label>
			<label class="pl-8px">
				<i class="text-green pi pi-pencil"></i>
			</label>
			<label class="pl-8px text-14px text-stone-500">
				"*"{{ $t("米字號表示該項目為必填欄位") }}
			</label>
		</div>
		<div class="mt-16px ml-16px">
			<Checkbox
				inputId="text"
				v-model="textCheckedAddress"
				:binary="true"
				v-on:click="address"
			/>
			<label for="text" class="ml-8px font-medium">{{
				$t("與戶籍地址資訊相同")
			}}</label>
		</div>
		<div class="mt-24px">
			<div class="w-3/4">
				<div class="text-16px">{{ $t("地址") }}：</div>
				<InputText
					type="text"
					v-model="currentAddress.Address"
					placeholder="Text"
					class="!border-gray-900 !w-440px !h-40px !mt-5px"
				/>
			</div>
		</div>
		<ParagraphDivider />
		<div class="w-600px">
			<label class="text-24px font-medium">{{ $t("身份資料") }}</label>
			<label class="pl-8px">
				<i class="text-green pi pi-pencil"></i>
			</label>
			<label class="pl-8px text-14px text-stone-500">
				"*"{{ $t("米字號表示該項目為必填欄位") }}
			</label>
		</div>

		<div class="mt-24px flex">
			<div class="w-1/3">
				<div class="text-16px">{{ $t("性別") }}：</div>
			</div>
		</div>

		<div class="mt-24px flex">
			<div class="field-radiobutton w-1/5">
				<RadioButton
					inputId="city1"
					name="city"
					value="male"
					v-model="identityInfo.sex"
				/>
				<label
					for="city1"
					class="!border-gray-900 ml-8px font-medium"
					>{{ $t("男性") }}</label
				>
			</div>
			<div class="field-radiobutton w-1/5">
				<RadioButton
					inputId="city2"
					name="city"
					value="female"
					v-model="identityInfo.sex"
				/>
				<label for="city2" class="ml-8px font-medium">{{
					$t("女性")
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

		<ParagraphDivider />
		<div class="w-600px">
			<label class="text-24px font-medium">{{ $t("聯絡方式") }}</label>
			<label class="pl-8px">
				<i class="text-green pi pi-pencil"></i>
			</label>
			<label class="pl-8px text-14px text-stone-500">
				"*"{{ $t("米字號表示該項目為必填欄位") }}
			</label>
		</div>
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
				<Checkbox
					inputId="file"
					v-model="textCheckedphone"
					:binary="true"
					v-on:click="phone"
				/>
				<label for="file" class="ml-8px font-medium">{{
					$t("行動電話與主要聯絡電話相同")
				}}</label>
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
	</div>
</template>

<script setup lang="ts">
import "@/styles/customize.css";
import "primeicons/primeicons.css";

import SelectButton from "primevue/selectbutton";
import MultiSelect from "primevue/multiselect";
import RadioButton from "primevue/radiobutton";
import InputText from "primevue/inputtext";
import Checkbox from "primevue/checkbox";
import Button from "primevue/button";
import Calendar from "primevue/calendar";
import Dropdown from "primevue/dropdown";
import ParagraphDivider from "@/styles/paragraphDivider.vue";
import { useI18n } from "vue-i18n";

import { ref, reactive, onMounted, toRaw, watch } from "vue";
import { InvalidSessionError } from "@/api/error";
import { AdmissionApplicantGetUserInfoResponse } from "@/api/admission/applicant/types";
import { useAdmissionApplicantAuthStore } from "@/stores/universalAuth";
import { AdmissionApplicantAPI } from "@/api/admission/applicant/api";
import { useToast } from "primevue/usetoast";

const applicantAuth = useAdmissionApplicantAuthStore();
const api = new AdmissionApplicantAPI(applicantAuth);
//manager have six part to choose open or close
const basicInfoList: AdmissionApplicantGetUserInfoResponse[] = reactive([]);
const nameList: AdmissionApplicantGetUserInfoResponse[] = reactive([]);
const schoolExpList: AdmissionApplicantGetUserInfoResponse[] = reactive([]);
const registerResidenceList: AdmissionApplicantGetUserInfoResponse[] = reactive(
	[]
);
const addressList: AdmissionApplicantGetUserInfoResponse[] = reactive([]);
const identityList: AdmissionApplicantGetUserInfoResponse[] = reactive([]);
const connectionList: AdmissionApplicantGetUserInfoResponse[] = reactive([]);

const fetchResponse = reactive({
	success: false,
	message: "" as string | [],
});

const nameInfo = ref({
	selected_title: "",
	suffix: "",
	title: "",
	chLastName: "",
	chFirstName: "",
	lastName: "",
	middleName: "",
	firstName: "",
});

const admissionStatusLocal = ref({
	admissionIdendity: "",
	ID: "",
});

const admissionStatus = ref({
	admissionIdendity: "",
	nationality: "",
	passport: "",
	ARC: "",
});

const residentAddress = ref({
	Address: "",
});
const currentAddress = ref({
	Address: "",
});
const identityInfo = ref({
	sex: "",
	country: "",
	date: new Date(),
});
const contactInfo = ref({
	primaryPhone: "",
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

//copy phone number
const phone = (prod: any) => {
	if (textCheckedphone.value === false) {
		contactInfo.value.mobilePhone = contactInfo.value.primaryPhone;
	}
};
//copy address
const address = (prod: any) => {
	if (textCheckedAddress.value === false) {
		Object.assign(currentAddress.value, residentAddress.value);
	}
};
</script>
