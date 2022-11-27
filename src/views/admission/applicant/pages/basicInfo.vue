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

		<!-- <div class="mt-24px flex">
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
		</div> -->
		<div class="mt-24px">
			<div class="w-3/4">
				<div class="text-16px">{{ $t("地址") }}：</div>
				<InputText
					type="text"
					v-model="residentAddress.streetAddress"
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

		<!-- <div class="mt-24px flex">
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
		</div> -->
		<div class="mt-24px">
			<div class="w-3/4">
				<div class="text-16px">{{ $t("地址") }}：</div>
				<InputText
					type="text"
					v-model="currentAddress.streetAddress"
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
					v-model="identityInfo.gender"
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
					v-model="identityInfo.gender"
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
			<!-- <div class="w-1/2">
				<div class="text-16px">{{ $t("次要聯絡電話") }}：</div>
				<InputText
					type="text"
					v-model="contactInfo.secondPhone"
					placeholder="Text"
					class="!border-gray-900 !w-300px !h-40px !mt-5px"
				/>
			</div> -->
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
		<!-- <div class="mt-24px flex">
			<div class="mt-16px ml-16px">
				<Checkbox inputId="file" v-model="message" :binary="true" />
				<label for="file" class="ml-8px font-medium"
					>{{ $t("願意承擔手機簡訊費用") }}:</label
				>
			</div>
		</div> -->
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

import { ref,reactive, onMounted, toRaw, watch } from "vue";
import { InvalidSessionError } from "@/api/error";
import ReviewState from "@/components/attachmentStates/reviewState.vue";
import EditState from "@/components/attachmentStates/editState.vue";
import CreateState from "@/components/attachmentStates/createState.vue";
import CorrectionState from "@/components/attachmentStates/CorrectionState.vue";
import {
	AdmissionApplicantGetUserInfoResponse
} from "@/api/admission/applicant/types";
import { useAdmissionApplicantAuthStore } from "@/stores/universalAuth";
import { AdmissionApplicantAPI } from "@/api/admission/applicant/api";
import { useToast } from "primevue/usetoast";

const applicantAuth = useAdmissionApplicantAuthStore();
const api = new AdmissionApplicantAPI(applicantAuth);
//manager have six part to choose open or close
const basicInfoList: AdmissionApplicantGetUserInfoResponse[] = reactive([]);
const nameList: AdmissionApplicantGetUserInfoResponse[] = reactive([]);
const schoolExpList: AdmissionApplicantGetUserInfoResponse[] = reactive([]);
const registerResidenceList: AdmissionApplicantGetUserInfoResponse[] = reactive([]);
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
	nationality: "",
	ID: "",
});

const admissionStatus = ref({
	admissionIdendity: "",
	nationality: "",
	passport: "",
	ARC: "",
});

const residentAddress = ref({
	country: "",
	state: "",
	city: "",
	postalCode: "",
	streetAddress: "",
});
const currentAddress = ref({
	country: "",
	state: "",
	city: "",
	postalCode: "",
	streetAddress: "",
});
const identityInfo = ref({
	sex: "",
	gender: "",
	country: "",
	date: new Date(),
	streetAddress: "",
	secondCountry: "",
	visa: "",
});
const contactInfo = ref({
	primaryPhone: "",
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

// //get info API
// const clearAllList = () => {
// 	const basicInfoList: AdmissionApplicantGetUserInfoResponse[] = reactive([]);
// 	const nameList: AdmissionApplicantGetUserInfoResponse[] = reactive([]);
// 	const schoolExpList: AdmissionApplicantGetUserInfoResponse[] = reactive([]);
// 	const registerResidenceList: AdmissionApplicantGetUserInfoResponse[] = reactive([]);
// 	const addressList: AdmissionApplicantGetUserInfoResponse[] = reactive([]);
// 	const identityList: AdmissionApplicantGetUserInfoResponse[] = reactive([]);
// 	const connectionList: AdmissionApplicantGetUserInfoResponse[] = reactive([]);
// 	const otherList: AdmissionApplicantGetUserInfoResponse[] = reactive([]);
// };

// const isLoading = reactive({
// 	delete: false,
// 	create: false,
// 	edit: false,
// 	fetch: false,
// });

// const getUserInfo = async () => {
// 	return await api.getUserInfo();
// };

// onMounted(async () => {
// 	const response = getUserInfo();
// 	await response.then((res) => {
// 		res.map((item) => {
// 			if (item) {
// 				basicInfoList.push(item);
// 			}
// 		});
// 	});

// 	splitSixList(toRaw(basicInfoList));
// });

// watch(
// 	() => isLoading.fetch,
// 	async () => {
// 		const response = getUserInfo();

// 		clearAllList();

// 		await response.then((res) => {
// 			res.map((item) => {
// 				if (item) {
// 					basicInfoList.push(item);
// 				}
// 			});
// 		});

// 		isLoading.fetch = false;

// 		splitSixList(toRaw(basicInfoList));
// 	}
// );

// const splitSixList = async (fullList: AdmissionApplicantGetUserInfoResponse[]) => {
// 	fullList.map((item) => {
// 		switch (item.category) {
// 			case "姓名資訊": {
// 				nameList.push({
// 					...item,
// 					order: nameList.length
// 				});
// 				break;
// 			}
// 			case "入學身分": {
// 				schoolExpList.push({
// 					...item,
// 					order: schoolExpList.length
// 				});
// 				break;
// 			}
// 			case "戶籍資訊": {
// 				registerResidenceList.push({
// 					...item,
// 					order: registerResidenceList.length
// 				});
// 				break;
// 			}
// 			case "現居地址": {
// 				addressList.push({
// 					...item,
// 					order: addressList.length
// 				});
// 				break;
// 			}
// 			case "身份資料": {
// 				identityList.push({
// 					...item,
// 					order: identityList.length
// 				});
// 				break;
// 			}
// 			case "聯絡資料": {
// 				connectionList.push({
// 					...item,
// 					order: connectionList.length
// 				});
// 				break;
// 			}
// 			//need to fix whether have other list or not
// 			default: {
// 				otherList.push({
// 					...item,
// 					order: otherList.length
// 				});
// 			}
// 		}
// 	});

// 	nameList.push({
// 		order: nameList.length,
// 	});

// 	schoolExpList.push({
// 		order: schoolExpList.length,
// 		state: 3,
// 	});

// 	registerResidenceList.push({
// 		order: registerResidenceList.length,
// 		state: 3,
// 	});

// 	addressList.push({
// 		order: addressList.length,
// 		state: 3,
// 	});

// 	identityList.push({
// 		order: identityList.length,
// 		state: 3,
// 	});

// 	connectionList.push({
// 		order: connectionList.length,
// 		state: 3,
// 	});

// 	otherList.push({
// 		order: otherList.length,
// 		state: 3,
// 	});
// };
</script>
