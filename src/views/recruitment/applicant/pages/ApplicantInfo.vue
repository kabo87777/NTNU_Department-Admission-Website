<template>
	<div>
		<div class="font-[500] text-[32px] font-bold">
			{{ $t("基本資料") }}
		</div>
		<div class="bigYellowDivider"></div>

		<div class="px-12px py-24px">
			<div class="flex">
				<div class="w-1/3">
					<div class="flex">
						<div>{{ $t("姓名") }}</div>
						<div class="ml-8px text-[#757575]">
							{{ $t("(") + $t("必填") + $t(")") }}
						</div>
					</div>
					<div>
						<InputText
							class="w-[70%] h-36px !mt-4px"
							style="border: 1px solid #736028"
							type="text"
							v-model="info.name"
						/>
					</div>
					<div
						v-show="isRequiredBlank.name"
						class="absolute mt-[-2px]"
					>
						<small class="p-error">
							{{ $t("此為必填欄位") }}
						</small>
					</div>
				</div>
				<div class="w-1/3">
					<div class="flex">
						<div>{{ $t("電子郵件") }}</div>
						<div class="ml-8px text-[#757575]">
							{{ $t("(") + $t("必填") + $t(")") }}
						</div>
					</div>
					<div>
						<InputText
							class="w-[70%] h-36px !mt-4px"
							style="border: 1px solid #736028"
							type="text"
							v-model="applicantStore.userInfo.email"
							:disabled="true"
						/>
					</div>
					<div
						v-show="isRequiredBlank.email"
						class="absolute mt-[-2px]"
					>
						<small class="p-error">
							{{ $t("此為必填欄位") }}
						</small>
					</div>
				</div>
				<div class="w-1/3">
					<div class="flex">
						<div>{{ $t("出生日期") }}</div>
						<div class="ml-8px text-[#757575]">
							{{ $t("(") + $t("必填") + $t(")") }}
						</div>
					</div>
					<div>
						<Calendar
							dateFormat="yy/mm/dd"
							class="w-[70%] h-36px !mt-4px"
							style="
								border: 1px solid #736028;
								border-radius: 6px;
							"
							v-model="info.birth"
						/>
					</div>
					<div
						v-show="isRequiredBlank.birth"
						class="absolute mt-[-2px]"
					>
						<small class="p-error">
							{{ $t("此為必填欄位") }}
						</small>
					</div>
				</div>
			</div>

			<div class="flex mt-24px">
				<div class="w-2/3">
					<div>{{ $t("博士班畢業學校與系所") }}</div>
					<div>
						<InputText
							class="w-[70%] h-36px !mt-4px"
							style="border: 1px solid #736028"
							type="text"
							v-model="info.doctoral"
						/>
					</div>
				</div>
				<div class="w-1/3">
					<div>
						{{
							$t("畢業年度") + $t("(") + $t("西元年份") + $t(")")
						}}
					</div>
					<div>
						<InputNumber
							class="w-[70%] h-36px !mt-4px"
							style="
								border: 1px solid #736028;
								border-radius: 6px;
							"
							:useGrouping="false"
							v-model="info.doctoral_year"
						/>
					</div>
				</div>
			</div>
			<div class="flex mt-24px">
				<div class="w-2/3">
					<div>{{ $t("碩士班畢業學校與系所") }}</div>
					<div>
						<InputText
							class="w-[70%] h-36px !mt-4px"
							style="border: 1px solid #736028"
							type="text"
							v-model="info.master"
						/>
					</div>
				</div>
				<div class="w-1/3">
					<div>
						{{
							$t("畢業年度") + $t("(") + $t("西元年份") + $t(")")
						}}
					</div>
					<div>
						<InputNumber
							class="w-[70%] h-36px !mt-4px"
							style="
								border: 1px solid #736028;
								border-radius: 6px;
							"
							:useGrouping="false"
							v-model="info.master_year"
						/>
					</div>
				</div>
			</div>
			<div class="flex mt-24px">
				<div class="w-2/3">
					<div>{{ $t("學士班畢業學校與系所") }}</div>
					<div>
						<InputText
							class="w-[70%] h-36px !mt-4px"
							style="border: 1px solid #736028"
							type="text"
							v-model="info.college"
						/>
					</div>
				</div>
				<div class="w-1/3">
					<div>
						{{
							$t("畢業年度") + $t("(") + $t("西元年份") + $t(")")
						}}
					</div>
					<div>
						<InputNumber
							class="w-[70%] h-36px !mt-4px"
							style="
								border: 1px solid #736028;
								border-radius: 6px;
							"
							:useGrouping="false"
							v-model="info.college_year"
						/>
					</div>
				</div>
			</div>
			<div class="mt-24px w-2/3">
				<div>{{ $t("現職") }}</div>
				<div>
					<InputText
						class="w-[70%] h-36px !mt-4px"
						style="border: 1px solid #736028"
						type="text"
						v-model="info.current_job"
					/>
				</div>
			</div>
			<div class="mt-24px w-2/3">
				<div>{{ $t("博士班論文主題") }}</div>
				<div>
					<InputText
						class="w-[70%] h-36px !mt-4px"
						style="border: 1px solid #736028"
						type="text"
						v-model="info.doctoral_paper"
					/>
				</div>
			</div>
			<div class="mt-24px w-2/3">
				<div>{{ $t("代表作") }}</div>
				<div>
					<Textarea
						class="w-[70%] !mt-4px"
						style="border: 1px solid #736028"
						type="text"
						v-model="info.publication"
					/>
				</div>
			</div>
			<div class="mt-24px w-2/3">
				<div>{{ $t("備註") }}</div>
				<div>
					<Textarea
						class="w-[70%] !mt-4px"
						style="border: 1px solid #736028"
						type="text"
						v-model="info.remark"
					/>
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
import { reactive, watch, toRaw } from "vue";
import { useRecruitmentApplicantAuthStore } from "@/stores/universalAuth";
import { useUserInfoStore } from "@/stores/RecruitmentApplicantStore";
import { RecruitmentApplicantAPI } from "@/api/recruitment/applicant/api";
import { useProjectIdStore } from "@/stores/RecruitmentApplicantStore";
import { RecruitmentApplicantUserInfoResponse } from "@/api/recruitment/applicant/types";
import { useI18n } from "vue-i18n";
import { useQuery } from "@tanstack/vue-query";
import { useToast } from "primevue/usetoast";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import Textarea from "primevue/textarea";
import Calendar from "primevue/calendar";
import Button from "primevue/button";

const applicantAuth = useRecruitmentApplicantAuthStore();
const applicantStore = useUserInfoStore();
const api = new RecruitmentApplicantAPI(applicantAuth);
const project = useProjectIdStore();

const { t } = useI18n();
const toast = useToast();

let fetchResponse = reactive({
	success: false,
	message: "" as string | [],
});

let loading = reactive({
	fetch: false,
	save: false,
});

let info: RecruitmentApplicantUserInfoResponse =
	reactive<RecruitmentApplicantUserInfoResponse>(
		{} as RecruitmentApplicantUserInfoResponse
	);

let isRequiredBlank = reactive({
	name: false,
	email: false,
	birth: false,
});

const saveInfo = async (body: object) => {
	return await api.patchBasicInfo(project.project.pid, body);
};

const addHours = (numHrs: number, date = new Date()) => {
	const dateCpy = new Date(date.getTime());

	dateCpy.setTime(dateCpy.getTime() + numHrs * 60 * 60 * 1000);

	return dateCpy;
};

const handleSave = async () => {
	if (info.birth === null || info.name === null || info.name === "") {
		isRequiredBlank.name =
			info.name === null || info.name === "" ? true : false;
		isRequiredBlank.birth = info.birth === null ? true : false;

		toast.add({
			severity: "error",
			summary: t("error"),
			detail: t("請輸入必填欄位"),
			life: 5000,
		});
		return;
	}

	isRequiredBlank.name = false;
	isRequiredBlank.birth = false;
	isRequiredBlank.email = false;
	addHours(24, info.birth);

	const body = info;

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
			Object.assign(info, data);
			info.birth = addHours(24, new Date(info.birth));
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
		Object.assign(info, response);
		info.birth = addHours(24, new Date(info.birth));
		loading.fetch = false;
	}
);
</script>
