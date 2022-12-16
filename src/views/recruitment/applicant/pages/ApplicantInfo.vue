<template>
	<div>
		<div class="font-[500] text-[32px] font-bold">
			{{ $t("基本資料") }}
		</div>
		<div class="bigYellowDivider"></div>

		<div
			class="px-12px py-24px"
		>
			<div class="flex">
				<div class="text-[24px] font-[50] font-bold">
					{{ $t("姓名資訊") }}
				</div>
				<div class="mt-6px ml-40px text-[#8D9093] text-[14px]">
					{{ $t('" * " 為必填欄位') }}
				</div>
			</div>
			<div class="flex pt-24px">
				<div class="w-1/3">
					<div>{{ $t("稱謂") }}</div>
					<div>
						<InputText
							class="w-[70%] h-36px !mt-4px"
							style="border: 1px solid #736028"
							type="text"
							v-model="name.appellation"
						/>
					</div>
				</div>
				<div class="w-1/3">
					<div>{{ $t("後綴") }}</div>
					<div>
						<InputText
							class="w-[70%] h-36px !mt-4px"
							style="border: 1px solid #736028"
							type="text"
							v-model="name.suffix"
						/>
					</div>
				</div>
			</div>
			<div class="flex pt-16px">
				<div class="w-1/3">
					<div>{{ $t("中文姓氏") }}</div>
					<div class="mt-4px text-12px text-[#8D9093]">
						{{ "*" + $t("無則免填") }}
					</div>
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
					<div class="mt-4px text-12px text-[#8D9093]">
						{{ "*" + $t("無則免填") }}
					</div>
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
			<div class="flex py-16px">
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
					<div v-show="required.enFamName" class="absolute mt-[-4px]">
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
					<div v-show="required.enName" class="absolute mt-[-4px]">
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
		<ParagraphDivider />
		<div
			class="px-12px py-24px"
		>
			<div class="flex">
				<div class="text-[24px] font-[50] font-bold">
					{{ $t("入職身份") }}
				</div>
				<div class="mt-6px ml-40px text-[#8D9093] text-[14px]">
					{{ $t('" * " 為必填欄位') }}
				</div>
			</div>
			<div class="flex pt-24px">
				<div class="w-1/3">
					<div>{{ "*" + $t("入職身份") }}</div>
					<div>
						<Dropdown
							class="w-[70%] h-36px !mt-4px"
							style="border: 1px solid #736028"
							v-model="identity.selectedIdentity"
							placeholder="請選擇身份"
							:options="identityOptions"
							optionLabel="name"
							optionValue="name"
						>
							<template #value="slotProps">
								<div v-if="slotProps.value" class="mt-[-8px]">
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
					<div v-show="required.identity" class="absolute mt-[-4px]">
						<small class="p-error">
							{{ $t("此為必填欄位") }}
						</small>
					</div>
				</div>
			</div>
			<div
				class="flex py-16px"
				v-if="identity.selectedIdentity === '外籍人士'"
			>
				<div class="w-1/3">
					<div>{{ "*" + $t("國籍") }}</div>
					<div>
						<InputText
							class="w-[70%] h-36px !mt-4px"
							style="border: 1px solid #736028"
							type="text"
							v-model="identity.nationality"
						/>
					</div>
					<div v-show="required.country" class="absolute mt-[-4px]">
						<small class="p-error">
							{{ $t("此為必填欄位") }}
						</small>
					</div>
				</div>
				<div class="w-1/3">
					<div>{{ "*" + $t("居留證統一證號") }}</div>
					<div>
						<InputText
							class="w-[70%] h-36px !mt-4px"
							style="border: 1px solid #736028"
							type="text"
							v-model="identity.ui"
						/>
					</div>
					<div v-show="required.ui" class="absolute mt-[-4px]">
						<small class="p-error">
							{{ $t("此為必填欄位") }}
						</small>
					</div>
				</div>
			</div>
			<div class="flex py-16px" v-else>
				<div class="w-1/3">
					<div>{{ "*" + $t("身份證字號") }}</div>
					<div>
						<InputText
							class="w-[70%] h-36px !mt-4px"
							style="border: 1px solid #736028"
							type="text"
							v-model="identity.ic"
						/>
					</div>
					<div v-show="required.icNum" class="absolute mt-[-4px]">
						<small class="p-error">
							{{ $t("此為必填欄位") }}
						</small>
					</div>
				</div>
			</div>
		</div>
		<ParagraphDivider  />
		<div
			class="px-12px py-24px"
		>
			<div class="flex">
				<div class="text-[24px] font-[50] font-bold">
					{{ $t("現居地址") }}
				</div>
				<div class="mt-6px ml-40px text-[#8D9093] text-[14px]">
					{{ $t('" * " 為必填欄位') }}
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
					<div>{{ "*" + $t("郵遞區號") }}</div>
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
		</div>
		<ParagraphDivider />
		<div
			class="px-12px py-24px"
		>
			<div class="flex">
				<div class="text-[24px] font-[50] font-bold">
					{{ $t("身份資料") }}
				</div>
				<div class="mt-6px ml-40px text-[#8D9093] text-[14px]">
					{{ $t('" * " 為必填欄位') }}
				</div>
			</div>
			<div class="mt-24px">
				<div>{{ "*" + $t("生理性別") }}</div>
				<div class="mt-2px flex">
					<div>
						<RadioButton v-model="born.sex" value="male" />
						<label class="ml-4px">{{ $t("生理男性") }}</label>
					</div>
					<div class="ml-160px">
						<RadioButton v-model="born.sex" value="female" />
						<label class="ml-4px">{{ $t("生理女性") }}</label>
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
					<div>{{ "*" + $t("出生國家") }}</div>
					<div>
						<InputText
							class="w-[70%] h-36px !mt-4px"
							style="border: 1px solid #736028"
							type="text"
							v-model="born.country"
						/>
					</div>
					<div v-show="required.country" class="absolute mt-[-4px]">
						<small class="p-error">
							{{ $t("此為必填欄位") }}
						</small>
					</div>
				</div>
				<div class="w-1/3">
					<div>{{ "*" + $t("出生日期") }}</div>
					<div>
						<Calendar
							v-model="born.birth"
							dateFormat="yy/mm/dd"
							class="w-[70%] h-36px !mt-4px"
							style="
								border: 1px solid #736028;
								border-radius: 6px;
							"
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
		<ParagraphDivider />
		<div
			class="px-12px py-24px"
		>
			<div class="flex">
				<div class="text-[24px] font-[50] font-bold">
					{{ $t("聯絡方式") }}
				</div>
				<div class="mt-6px ml-40px text-[#8D9093] text-[14px]">
					{{ $t('" * " 為必填欄位') }}
				</div>
			</div>
			<div class="flex py-16px">
				<!-- <div class="w-1/3">
					<div>{{ "*" + $t("電郵") }}</div>
					<div>
						<InputText
							class="w-[70%] h-36px !mt-4px"
							style="border: 1px solid #736028"
							type="email"
							v-model="contact.email"
						/>
					</div>
					<div v-show="required.email" class="absolute mt-[-4px]">
						<small class="p-error">
							{{ $t("此為必填欄位") }}
						</small>
					</div>
				</div> -->
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
		<div class="bigYellowDivider"></div>
		<div>
			<Button
				class="p-button-secondary"
				style="
					margin-top: 32px;
					margin-left: 100%;
					transform: translateX(-100%);
					width: 100px;
					height: 44px;
					background-color: #f0dfad;
					border: 2px solid #a18b4a;
					color: #736028;
				"
				icon="pi pi-save"
				:label="$t('儲存')"
				@click="handleSave()"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, toRaw } from "vue";
import { useRecruitmentApplicantAuthStore } from "@/stores/universalAuth";
import { RecruitmentApplicantAPI } from "@/api/recruitment/applicant/api";
import { useProjectIdStore } from "@/stores/RecruitmentApplicantStore";
import { RecruitmentApplicantUserInfoResponse } from "@/api/recruitment/applicant/types";
import { useQuery } from "@tanstack/vue-query";
import ParagraphDivider from "@/styles/paragraphDividerApplicant.vue";
import { useToast } from "primevue/usetoast";
import Dropdown from "primevue/dropdown";
import InputText from "primevue/inputtext";
import RadioButton from "primevue/radiobutton";
import Calendar from "primevue/calendar";
import Button from "primevue/button";

const applicantAuth = useRecruitmentApplicantAuthStore();
const api = new RecruitmentApplicantAPI(applicantAuth);
const project = useProjectIdStore();

const toast = useToast();

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
});

let contact = reactive({
	email: "",
	phone: "",
});

let required = reactive({
	enFamName: false,
	enName: false,
	identity: false,
	icNum: false,
	nationality: false,
	passport: false,
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

const basicInfo: RecruitmentApplicantUserInfoResponse =
	reactive<RecruitmentApplicantUserInfoResponse>(
		{} as RecruitmentApplicantUserInfoResponse
	);

const setBasicInfo = (res: RecruitmentApplicantUserInfoResponse) => {
	name.id = res.id as number;
	name.appellation = res.title as string;
	name.suffix = res.suffix as string;
	name.zhFamName = res.cn_surname as string;
	name.zhName = res.name as string;
	name.enFamName = res.en_surname as string;
	name.enMidName = res.en_midname as string;
	name.enName = res.en_givenname as string;

	if (res.nationality === "台灣") {
		identity.selectedIdentity = "本地人士";
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
	born.birth = res.birth as Date;

	contact.phone = res.mobile_phone as string;
};

const saveInfo = async (body: object) => {
	return await api.patchBasicInfo(project.project.pid, body);
};

const addHours = (numHrs: number, date = new Date()) => {
	const dateCpy = new Date(date.getTime());

	dateCpy.setTime(dateCpy.getTime() + numHrs * 60 * 60 * 1000);

	return dateCpy;
};

const handleSave = async () => {
	const body = {
		id: name.id,
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
	};

	const keys = Object.keys(body);
	Object.values(body).map((value, index) => {
		if (value === null || value === "") {
			const keyName = keys[
				index
			] as keyof RecruitmentApplicantUserInfoResponse;

			delete body[keyName];
		}
	});

	loading.save = true;

	const res = await saveInfo(body);

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
	["getRecruitmentApplicantBasicInfo"],
	async () => {
		return await api.getBasicInfo(project.project.pid);
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

watch(
	() => loading.fetch,
	async () => {
		const response = await api.getBasicInfo(project.project.pid);
		setBasicInfo(response);

		loading.fetch = false;
	}
);
</script>
