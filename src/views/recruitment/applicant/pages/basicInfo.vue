<template>
	<div>
		<div class="font-[500] text-[32px] font-bold">
			{{ $t("基本資料") }}
		</div>
		<div class="bigYellowDivider"></div>

		<div class="px-12px py-24px">
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
							id="apellation"
							type="text"
						/>
					</div>
				</div>
				<div class="w-1/3">
					<div>{{ $t("後綴") }}</div>
					<div>
						<InputText
							class="w-[70%] h-36px !mt-4px"
							style="border: 1px solid #736028"
							id="suffix"
							type="text"
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
							id="zhFamName"
							type="text"
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
							id="zhName"
							type="text"
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
							id="enFamName"
							type="text"
							aria-describedby="enFamName-help"
						/>
					</div>
					<div class="absolute mt-[-4px]">
						<small id="enFamName-help" class="p-error">
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
							id="enName"
							type="text"
							aria-describedby="enName-help"
						/>
					</div>
					<div class="absolute mt-[-4px]">
						<small id="enName-help" class="p-error">
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
							id="enMidName"
							type="text"
						/>
					</div>
				</div>
			</div>
		</div>
		<ParagraphDivider />
		<div class="px-12px py-24px">
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
							aria-describedby="dropdown-help"
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
					<div class="absolute mt-[-4px]">
						<small id="dropdown-help" class="p-error">
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
							id="nation"
							type="text"
							aria-describedby="nation-help"
						/>
					</div>
					<div class="absolute mt-[-4px]">
						<small id="nation-help" class="p-error">
							{{ $t("此為必填欄位") }}
						</small>
					</div>
				</div>
				<div class="w-1/3">
					<div>{{ "*" + $t("護照號碼") }}</div>
					<div>
						<InputText
							class="w-[70%] h-36px !mt-4px"
							style="border: 1px solid #736028"
							id="passport"
							type="text"
							aria-describedby="passport-help"
						/>
					</div>
					<div class="absolute mt-[-4px]">
						<small id="passport-help" class="p-error">
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
							id="ui"
							type="text"
							aria-describedby="ui-help"
						/>
					</div>
					<div class="absolute mt-[-4px]">
						<small id="ui-help" class="p-error">
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
							id="icNum"
							type="text"
							aria-describedby="identity-help"
						/>
					</div>
					<div class="absolute mt-[-4px]">
						<small id="identity-help" class="p-error">
							{{ $t("此為必填欄位") }}
						</small>
					</div>
				</div>
			</div>
		</div>
		<ParagraphDivider />
		<div v-if="identity.selectedIdentity !== '外籍人士'">
			<div class="px-12px py-24px">
				<div class="flex">
					<div class="text-[24px] font-[50] font-bold">
						{{ $t("戶籍地址") }}
					</div>
					<div class="mt-6px ml-40px text-[#8D9093] text-[14px]">
						{{ $t('" * " 為必填欄位') }}
					</div>
				</div>
				<div class="flex py-16px">
					<div class="w-1/3">
						<div>{{ "*" + $t("縣市") }}</div>
						<div>
							<InputText
								class="w-[70%] h-36px !mt-4px"
								style="border: 1px solid #736028"
								id="state"
								type="text"
								aria-describedby="state-help"
							/>
						</div>
						<div class="absolute mt-[-4px]">
							<small id="state-help" class="p-error">
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
								id="postcode"
								type="text"
								aria-describedby="postcode-help"
							/>
						</div>
						<div class="absolute mt-[-4px]">
							<small id="postcode-help" class="p-error">
								{{ $t("此為必填欄位") }}
							</small>
						</div>
					</div>
					<div class="w-1/3">
						<div>{{ "*" + $t("街道地址") }}</div>
						<div>
							<InputText
								class="w-[70%] h-36px !mt-4px"
								style="border: 1px solid #736028"
								id="street"
								type="text"
								aria-describedby="street-help"
							/>
						</div>
						<div class="absolute mt-[-4px]">
							<small id="street-help" class="p-error">
								{{ $t("此為必填欄位") }}
							</small>
						</div>
					</div>
				</div>
			</div>
			<ParagraphDivider />
		</div>
		<div class="px-12px py-24px">
			<div class="flex">
				<div class="text-[24px] font-[50] font-bold">
					{{ $t("現居地址") }}
				</div>
				<div class="mt-6px ml-40px text-[#8D9093] text-[14px]">
					{{ $t('" * " 為必填欄位') }}
				</div>
			</div>
			<div class="mt-16px">
				<Checkbox v-model="currentAddr.isAddrSame" :binary="true" />
				<label class="ml-4px">{{ $t("住址相同") }}</label>
			</div>
			<div class="flex py-16px">
				<div class="w-1/3">
					<div>{{ "*" + $t("縣市") }}</div>
					<div>
						<InputText
							class="w-[70%] h-36px !mt-4px"
							style="border: 1px solid #736028"
							id="state"
							type="text"
							aria-describedby="state-help"
						/>
					</div>
					<div class="absolute mt-[-4px]">
						<small id="state-help" class="p-error">
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
							id="postcode"
							type="text"
							aria-describedby="postcode-help"
						/>
					</div>
					<div class="absolute mt-[-4px]">
						<small id="postcode-help" class="p-error">
							{{ $t("此為必填欄位") }}
						</small>
					</div>
				</div>
				<div class="w-1/3">
					<div>{{ "*" + $t("街道地址") }}</div>
					<div>
						<InputText
							class="w-[70%] h-36px !mt-4px"
							style="border: 1px solid #736028"
							id="street"
							type="text"
							aria-describedby="street-help"
						/>
					</div>
					<div class="absolute mt-[-4px]">
						<small id="street-help" class="p-error">
							{{ $t("此為必填欄位") }}
						</small>
					</div>
				</div>
			</div>
		</div>
		<ParagraphDivider />
		<div class="px-12px py-24px">
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
					<div aria-describedby="sex-help">
						<RadioButton v-model="born.sex" value="male" />
						<label class="ml-4px">{{ $t("生理男性") }}</label>
					</div>
					<div class="ml-160px">
						<RadioButton v-model="born.sex" value="female" />
						<label class="ml-4px">{{ $t("生理女性") }}</label>
					</div>
				</div>
				<div class="absolute mt-[-4px]">
					<small id="sex-help" class="p-error">
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
							id="bornCountry"
							type="text"
							aria-describedby="bornCountry-help"
						/>
					</div>
					<div class="absolute mt-[-4px]">
						<small id="bornCountry-help" class="p-error">
							{{ $t("此為必填欄位") }}
						</small>
					</div>
				</div>
				<div class="w-1/3">
					<div>{{ "*" + $t("出生日期") }}</div>
					<div>
						<Calendar
							v-model="born.birth"
							dateFormat="mm-dd-yy"
							class="w-[70%] h-36px !mt-4px"
							style="
								border: 1px solid #736028;
								border-radius: 6px;
							"
							aria-describedby="birth-help"
						/>
					</div>
					<div class="absolute mt-[-4px]">
						<small id="birth-help" class="p-error">
							{{ $t("此為必填欄位") }}
						</small>
					</div>
				</div>
			</div>
		</div>
		<ParagraphDivider />
		<div class="px-12px py-24px">
			<div class="flex">
				<div class="text-[24px] font-[50] font-bold">
					{{ $t("聯絡方式") }}
				</div>
				<div class="mt-6px ml-40px text-[#8D9093] text-[14px]">
					{{ $t('" * " 為必填欄位') }}
				</div>
			</div>
			<div class="flex py-16px">
				<div class="w-1/3">
					<div>{{ "*" + $t("電郵") }}</div>
					<div>
						<InputText
							class="w-[70%] h-36px !mt-4px"
							style="border: 1px solid #736028"
							id="email"
							type="email"
							aria-describedby="email-help"
							v-model="contact.email"
						/>
					</div>
					<div class="absolute mt-[-4px]">
						<small id="email-help" class="p-error">
							{{ $t("此為必填欄位") }}
						</small>
					</div>
				</div>
				<div class="w-1/3">
					<div>{{ "*" + $t("行動電話") }}</div>
					<div>
						<InputText
							class="w-[70%] h-36px !mt-4px"
							style="border: 1px solid #736028"
							id="phone"
							type="text"
							aria-describedby="phone-help"
							v-model="contact.phone"
						/>
					</div>
					<div class="absolute mt-[-4px]">
						<small id="phone-help" class="p-error">
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
				@click="handleSave"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch, toRaw } from "vue";
import { useRecruitmentApplicantAuthStore } from "@/stores/universalAuth";
import { RecruitmentApplicantAPI } from "@/api/recruitment/applicant/api";
import { useProjectIdStore } from "@/stores/RecruitmentApplicantStore";
import { RecruitmentApplicantUserInfoResponse } from "@/api/recruitment/applicant/types";
import { InvalidSessionError } from "@/api/error";
import ParagraphDivider from "@/styles/paragraphDividerApplicant.vue";
import { useToast } from "primevue/usetoast";
import Dropdown from "primevue/dropdown";
import InputText from "primevue/inputtext";
import Checkbox from "primevue/checkbox";
import RadioButton from "primevue/radiobutton";
import Calendar from "primevue/calendar";
import Button from "primevue/button";

const applicantAuth = useRecruitmentApplicantAuthStore();
const api = new RecruitmentApplicantAPI(applicantAuth);
const project = useProjectIdStore();

const toast = useToast();

const fetchResponse = reactive({
	success: false,
	message: "" as string | [],
});

const loading = reactive({
	fetch: false,
	save: false,
});

const name = reactive({
	appellation: "",
	suffix: "",
	zhFamName: "",
	zhName: "",
	enFamName: "",
	enName: "",
	enMidName: "",
});

const identity = reactive({
	selectedIdentity: "",
	ic: "",
	nationality: "",
	passport: "",
	ui: "",
});

const householdAddr = reactive({
	state: "",
	postcode: "",
	street: "",
});

const currentAddr = reactive({
	isAddrSame: false,
	state: "",
	postcode: "",
	street: "",
});

const born = reactive({
	sex: "",
	country: "",
	birth: new Date(),
});

const contact = reactive({
	email: "",
	phone: "",
});

const identityOptions = ref([{ name: "本地人士" }, { name: "外籍人士" }]);

const basicInfo: RecruitmentApplicantUserInfoResponse =
	reactive<RecruitmentApplicantUserInfoResponse>(
		{} as RecruitmentApplicantUserInfoResponse
	);

const setBasicInfo = (res: RecruitmentApplicantUserInfoResponse) => {
	// basicInfo.id = res.id;
	// basicInfo.name = res.name;
	// basicInfo.email = res.email;
	// basicInfo.national_id = res.national_id;
	// basicInfo.sex = res.sex;
	// basicInfo.birth = res.birth;
	// basicInfo.day_phone = res.day_phone;
	// basicInfo.night_phone = res.night_phone;
	// basicInfo.mobile_phone = res.mobile_phone;
	// basicInfo.household_address = res.household_address;
	// basicInfo.household_zipcode = res.household_zipcode;
	// basicInfo.communicate_address = res.communicate_address;
	// basicInfo.communicate_zipcode = res.communicate_zipcode;
	// basicInfo.GSAT_num = res.GSAT_num;
	// basicInfo.GSAT_registration = res.GSAT_registration;
	// basicInfo.graduated_school = res.graduated_school;
	// basicInfo.graduated_major = res.graduated_major;
	// basicInfo.isSameDept = res.isSameDept;
	// basicInfo.isDisabled = res.isDisabled;
	// basicInfo.r_applicant_id = res.r_applicant_id;
	// basicInfo.created_at = res.created_at;
	// basicInfo.updated_at = res.updated_at;

	born.sex = res.sex as string;
	born.birth = new Date(res.birth as string);

	contact.phone = res.mobile_phone as string;
};

const saveInfo = async (body: object) => {
	try {
		return await api.patchBasicInfo(project.project.pid, body);
	} catch (e: any) {
		if (e instanceof InvalidSessionError) {
			console.error(
				"Session has already expired while changing password"
			);
			return;
		}
	}
};

const handleSave = async () => {
	const body = {
		name: name.zhName,
		email: contact.email,
		mobile_phone: contact.phone,
		sex: born.sex,
		birth: born.birth,
	};

	loading.save = true;

	const response = saveInfo(body);

	await response.then((res) => {
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
	});

	loading.fetch = true;
};

const getBasicInfo = async () => {
	return await api.getBasicInfo(project.project.pid);
};

onMounted(async () => {
	const response = getBasicInfo();

	await response.then((res) => {
		if (Object.keys(res).length) setBasicInfo(res);
	});
});

watch(
	() => loading.fetch,
	async () => {
		const response = getBasicInfo();
		console.log("on watch");
		await response.then((res) => {
			if (Object.keys(res).length) setBasicInfo(res);
		});

		loading.fetch = false;
	}
);
</script>
