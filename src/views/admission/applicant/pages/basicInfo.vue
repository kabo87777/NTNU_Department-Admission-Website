<template>
	<Layout Applicant>
		<template #Header>{{ $t("基本資料") }}</template>
		<template #Body>
			<Message severity="warn" pos="sticky top-0" z="10" m="!0">
				"*" 皆為必填項目
			</Message>
			<div
				class="px-12px py-12px"
				v-if="requiredInputFields.includes('en_givenname')"
			>
				<div class="flex">
					<div class="text-[24px] font-[50] font-bold">
						{{ $t("姓名資訊") }}
					</div>
				</div>
				<div class="flex pt-16px">
					<div class="w-1/3">
						<div>{{ $t("中文姓氏") }}</div>
						<div class="mt-4px text-12px text-[#8D9093]"></div>
						<div>
							<InputText
								class="w-[70%] h-36px !mt-4px"
								style="border: 1px solid #736028"
								type="text"
								v-model="name.zhFamName"
							/>
						</div>
					</div>
					<div class="w-1/3">
						<div>{{ $t("中文名字") }}</div>
						<div>
							<InputText
								class="w-[70%] h-36px !mt-4px"
								style="border: 1px solid #736028"
								type="text"
								v-model="name.zhName"
							/>
						</div>
					</div>
				</div>
				<div class="flex pt-12px pb-16px">
					<div class="w-1/3">
						<div>{{ "*" + $t("英文姓氏") }}</div>
						<div>
							<InputText
								class="w-[70%] h-36px !mt-4px"
								style="border: 1px solid #736028"
								type="text"
								v-model="name.enFamName"
							/>
						</div>
						<div
							v-show="required.enFamName"
							class="absolute mt-[-4px]"
						>
							<small class="p-error">
								{{ $t("此為必填欄位") }}
							</small>
						</div>
					</div>
					<div class="w-1/3">
						<div>{{ "*" + $t("英文名字") }}</div>
						<div>
							<InputText
								class="w-[70%] h-36px !mt-4px"
								style="border: 1px solid #736028"
								type="text"
								v-model="name.enName"
							/>
						</div>
						<div
							v-show="required.enName"
							class="absolute mt-[-4px]"
						>
							<small class="p-error">
								{{ $t("此為必填欄位") }}
							</small>
						</div>
					</div>
					<div class="w-1/3">
						<div>{{ $t("英文中間名") }}</div>
						<div>
							<InputText
								class="w-[70%] h-36px !mt-4px"
								style="border: 1px solid #736028"
								type="text"
								v-model="name.enMidName"
							/>
						</div>
					</div>
				</div>
			</div>
			<div
				class="px-12px pt-12px pb-24px"
				v-if="requiredInputFields.includes('nationality')"
			>
				<div class="flex">
					<div class="text-[24px] font-[50] font-bold">
						{{ $t("入學身分") }}
					</div>
				</div>
				<div class="flex pt-24px">
					<div class="w-1/3">
						<div>{{ "*" + $t("入學身分") }}</div>
						<div>
							<Dropdown
								class="w-[70%] h-36px !mt-4px"
								style="border: 1px solid #736028"
								v-model="identity.selectedIdentity"
								placeholder="請選擇身分"
								:options="identityOptions"
								optionLabel="name"
								optionValue="name"
							>
								<template #value="slotProps">
									<div
										v-if="slotProps.value"
										class="mt-[-8px]"
									>
										{{ slotProps.value }}
									</div>
									<div v-else class="mt-[-8px]">
										{{ $t(slotProps.placeholder) }}
									</div>
								</template>
								<template #option="slotProps">
									<div class="mt-[-8px] h-12px">
										{{ $t(slotProps.option.name) }}
									</div>
								</template>
							</Dropdown>
						</div>
						<div
							v-show="required.identity"
							class="absolute mt-[-4px]"
						>
							<small class="p-error">
								{{ $t("此為必填欄位") }}
							</small>
						</div>
					</div>
				</div>
				<div v-if="identity.selectedIdentity === '外籍人士'">
					<div>
						<div class="flex py-16px">
							<div class="w-1/3">
								<div>{{ $t("國籍") }}</div>
								<div>
									<InputText
										class="w-[70%] h-36px !mt-4px"
										style="border: 1px solid #736028"
										type="text"
										v-model="identity.nationality"
									/>
								</div>
								<div
									v-show="required.country"
									class="absolute mt-[-4px]"
								>
									<small class="p-error">
										{{ $t("此為必填欄位") }}
									</small>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div>
				<div
					class="px-12px py-12px"
					v-if="requiredInputFields.includes('communicate_address')"
				>
					<div class="flex">
						<div class="text-[24px] font-[50] font-bold">
							{{ $t("通訊地址") }}
						</div>
					</div>
					<div class="flex py-16px">
						<div class="w-2/3">
							<div>{{ "*" + $t("地址") }}</div>
							<div>
								<InputText
									class="w-[80%] h-36px !mt-4px"
									style="border: 1px solid #736028"
									type="text"
									v-model="currentAddr.addr"
								/>
							</div>
							<div
								v-show="required.currentAddr"
								class="absolute mt-[-4px]"
							>
								<small class="p-error">
									{{ $t("此為必填欄位") }}
								</small>
							</div>
						</div>
						<div class="w-1/3">
							<div>{{ $t("郵遞區號") }}</div>
							<div>
								<InputText
									class="w-[70%] h-36px !mt-4px"
									style="border: 1px solid #736028"
									type="text"
									v-model="currentAddr.postcode"
								/>
							</div>
							<div
								v-show="required.currentPostcode"
								class="absolute mt-[-4px]"
							>
								<small class="p-error">
									{{ $t("此為必填欄位") }}
								</small>
							</div>
						</div>
					</div>
					<div class="flex py-16px">
						<div class="w-2/3">
							<div>{{ $t("電子郵件") }}</div>
							<div>
								<InputText
									class="w-[80%] h-36px !mt-4px"
									style="border: 1px solid #736028"
									type="text"
									v-model="email"
									:disabled="true"
								/>
							</div>
							<div
								v-show="required.currentAddr"
								class="absolute mt-[-4px]"
							>
								<small class="p-error">
									{{ $t("此為必填欄位") }}
								</small>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div
				class="px-12px py-12px"
				v-if="requiredInputFields.includes('sex')"
			>
				<div class="flex">
					<div class="text-[24px] font-[50] font-bold">
						{{ $t("身份資料") }}
					</div>
				</div>
				<div class="mt-24px">
					<div>{{ "*" + $t("性別") }}</div>
					<div class="mt-2px flex">
						<div>
							<RadioButton v-model="born.sex" value="male" />
							<label class="ml-4px">{{ $t("男性") }}</label>
						</div>
						<div class="ml-160px">
							<RadioButton v-model="born.sex" value="female" />
							<label class="ml-4px">{{ $t("女性") }}</label>
						</div>
					</div>
					<div v-show="required.sex" class="absolute mt-[-4px]">
						<small class="p-error">
							{{ $t("此為必填欄位") }}
						</small>
					</div>
				</div>
				<div class="flex py-16px">
					<div class="w-1/3">
						<div>{{ $t("出生國家") }}</div>
						<div>
							<InputText
								class="w-[70%] h-36px !mt-4px"
								style="border: 1px solid #736028"
								type="text"
								v-model="born.country"
							/>
						</div>
						<div
							v-show="required.country"
							class="absolute mt-[-4px]"
						>
							<small class="p-error">
								{{ $t("此為必填欄位") }}
							</small>
						</div>
					</div>
					<div class="w-1/3">
						<div>{{ $t("出生日期") }}</div>
						<div>
							<Calendar
								v-model="born.birth"
								dateFormat="yy/mm/dd"
								class="w-[70%] h-36px !mt-4px"
								style="
									border: 1px solid #736028;
									border-radius: 6px;
								"
								:show-icon="true"
								:showOnFocus="false"
								placeholder="YYYY/MM/DD"
							/>
						</div>
						<div v-show="required.birth" class="absolute mt-[-4px]">
							<small class="p-error">
								{{ $t("此為必填欄位") }}
							</small>
						</div>
					</div>
				</div>
			</div>
			<div
				class="px-12px py-12px"
				v-if="requiredInputFields.includes('mobile_phone')"
			>
				<div class="flex">
					<div class="text-[24px] font-[50] font-bold">
						{{ $t("聯絡方式") }}
					</div>
				</div>
				<div class="flex py-16px">
					<div class="w-1/3">
						<div>{{ "*" + $t("行動電話") }}</div>
						<div>
							<InputText
								class="w-[70%] h-36px !mt-4px"
								style="border: 1px solid #736028"
								type="text"
								v-model="contact.phone"
							/>
						</div>
						<div v-show="required.phone" class="absolute mt-[-4px]">
							<small class="p-error">
								{{ $t("此為必填欄位") }}
							</small>
						</div>
					</div>
				</div>
			</div>
		</template>
		<template #Footer>
			<NButton
				Applicant
				icon="pi pi-save"
				class="mx-auto h-11 min-w-36"
				@click="handleSave()"
				>{{ $t("儲存") }}</NButton
			>
		</template>
	</Layout>
</template>

<script setup lang="ts">
import { ref, reactive, watch, toRaw } from "vue";
import { useToast } from "primevue/usetoast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import Dropdown from "primevue/dropdown";
import InputText from "primevue/inputtext";
import RadioButton from "primevue/radiobutton";
import Calendar from "primevue/calendar";
import NButton from "@/styles/CustomButton.vue";
import Layout from "@/components/Layout.vue";
import dayjs from "dayjs";
import Message from "primevue/message";
import { useAdmissionApplicantAuthStore } from "@/stores/universalAuth";
import { AdmissionApplicantAPI } from "@/api/admission/applicant/api";
import { AdmissionApplicantGetUserInfoResponse } from "@/api/admission/applicant/types";
import { AdmissionApplicantAuthResponse } from "@/api/admission/applicant/types";
import { useUserInfoStore } from "@/stores/AdmissionApplicantStore";

const applicantAuth = useAdmissionApplicantAuthStore();
const applicantStore = useUserInfoStore();
const api = new AdmissionApplicantAPI(applicantAuth);
// const project = useProjectIdStore();
const applicantInfo: AdmissionApplicantAuthResponse = toRaw(
	applicantStore.userInfo
);
const email = ref(applicantInfo.email);
const toast = useToast();
const now = dayjs();

const requiredInputFields = ref("");

let fetchResponse = reactive({
	success: false,
	message: "" as string | [],
});

let loading = reactive({
	fetch: false,
	save: false,
});

let name = reactive({
	id: 0,
	admission_id: 0,
	appellation: "",
	suffix: "",
	zhFamName: "",
	zhName: "",
	enFamName: "",
	enName: "",
	enMidName: "",
});

let identity = reactive({
	selectedIdentity: "",
	ic: "",
	nationality: "",
	ui: "",
});

let currentAddr = reactive({
	addr: "",
	postcode: "",
});

let born = reactive({
	sex: "",
	country: "",
	birth: new Date(),
	// birth: dayjs(new Date()),
});

let contact = reactive({
	phone: "",
});

let required = reactive({
	enFamName: false,
	enName: false,
	identity: false,
	icNum: false,
	nationality: false,
	// passport: false,
	ui: false,
	householdAddr: false,
	householdpostcode: false,
	currentAddr: false,
	currentPostcode: false,
	sex: false,
	country: false,
	birth: false,
	email: false,
	phone: false,
});

const identityOptions = ref([{ name: "本國人士" }, { name: "外籍人士" }]);

const setBasicInfo = (res: AdmissionApplicantGetUserInfoResponse) => {
	name.id = res.id as number;
	name.admission_id = res.admission_id as number;
	name.appellation = res.title as string;
	name.suffix = res.suffix as string;
	name.zhFamName = res.cn_surname as string;
	name.zhName = res.name as string;
	name.enFamName = res.en_surname as string;
	name.enMidName = res.en_midname as string;
	name.enName = res.en_givenname as string;

	if (res.nationality === "台灣") {
		identity.selectedIdentity = "本國人士";
		identity.ic = res.national_id as string;
		identity.nationality = res.nationality as string;
	} else if (res.nationality !== null) {
		identity.selectedIdentity = "外籍人士";
		identity.ui = res.national_id as string;
		identity.nationality = res.nationality as string;
	}

	currentAddr.addr = res.communicate_address as string;
	currentAddr.postcode = res.communicate_zipcode as string;

	born.sex = res.sex as string;
	born.country = res.birthcountry as string;
	if (res.birth) {
		born.birth = new Date(res.birth);
	}

	contact.phone = res.mobile_phone as string;
};

const addHours = (numHrs: number, date = new Date()) => {
	const dateCpy = new Date(date.getTime());

	dateCpy.setTime(dateCpy.getTime() + numHrs * 60 * 60 * 1000);

	return dateCpy;
};

const handleSave = async () => {
	const body = {
		id: name.id,
		admission_id: name.admission_id,
		title: name.appellation,
		suffix: name.suffix,
		cn_surname: name.zhFamName,
		name: name.zhName,
		en_surname: name.enFamName,
		en_midname: name.enMidName,
		en_givenname: name.enName,
		nationality:
			identity.selectedIdentity === "本國人士"
				? "台灣"
				: identity.nationality,
		national_id:
			identity.selectedIdentity === "本國人士"
				? identity.ic
				: identity.ui,

		communicate_address: currentAddr.addr,
		communicate_zipcode: currentAddr.postcode,
		sex: born.sex,
		birthcountry: born.country,
		birth: addHours(8, new Date(born.birth)),
		mobile_phone: contact.phone,
		isForeigner: identity.selectedIdentity === "本國人士" ? false : true,
	};

	loading.save = true;

	const res = await api.patchBasicInfo(body);

	if (res?.success !== undefined && res?.message !== undefined) {
		fetchResponse.success = toRaw(res.success);
		fetchResponse.message = toRaw(res.message);
	}

	loading.save = false;

	if (fetchResponse.success) {
		toast.add({
			severity: "success",
			summary: "Success",
			detail: fetchResponse.message,
			life: 3000,
		});
	} else {
		toast.add({
			severity: "error",
			summary: "Error",
			detail: fetchResponse.message,
			life: 5000,
		});
	}

	loading.fetch = true;
};

useQuery(
	["getAdmApplicantBasicInfo"],
	async () => {
		return await api.getUserInfo();
	},
	{
		onSuccess: (data) => {
			setBasicInfo(data);
		},
		onError: (data) => {
			toast.add({
				severity: "error",
				summary: "Error",
				detail: "Unable to fetch user basic info",
				life: 5000,
			});
			console.log(data);
		},
	}
);

useQuery(
	["getAdmApplicantProgramInfo_1"],
	async () => {
		return await api.getProgram();
	},
	{
		onSuccess: (data) => {
			requiredInputFields.value = data.applicant_required_info;
		},
		onError: (data) => {
			toast.add({
				severity: "error",
				summary: "Error",
				detail: "Unable to fetch user require input",
				life: 5000,
			});
			console.log(data);
		},
	}
);

watch(
	() => loading.fetch,
	async () => {
		const response = await api.getUserInfo();
		setBasicInfo(response);
	}
);
</script>
