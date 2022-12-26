<template>
	<Layout Applicant>
		<template #Header>{{ $t("基本資料") }}</template>
		<template #Body>
			<!-- 姓名 -->
			<div space="y-1" m="2">
				<div flex="~ gap-2" class="items-end" text="body">
					<div>{{ $t("姓名") }}</div>
					<div text="sm danger">{{ "*\ \ " + $t("必填") }}</div>
				</div>
				<div flex="~ gap-6" class="items-center">
					<InputText
						class="w-1/3 min-w-50 max-w-100 h-12"
						:class="{ 'p-invalid': isRequiredBlank.name }"
						type="text"
						v-model="info.name"
					/>
					<div v-show="isRequiredBlank.name" text="danger">
						{{ $t("此為必填欄位") }}
					</div>
				</div>
			</div>

			<!-- 電子郵件 -->
			<div space="y-1" m="2">
				<div text="body">{{ $t("電子郵件") }}</div>
				<div text="secondary">{{ applicantStore.userInfo.email }}</div>
			</div>

			<!-- 出生日期 -->
			<div space="y-1" m="2">
				<div flex="~ gap-2" class="items-end" text="body">
					<div>{{ $t("出生日期") }}</div>
					<div text="sm danger">{{ "*\ \ " + $t("必填") }}</div>
				</div>
				<div flex="~ gap-6" class="items-center">
					<Calendar
						dateFormat="yy/mm/dd"
						class="w-1/3 min-w-50 max-w-100 h-12"
						v-model="info.birth"
						:show-icon="true"
						:showOnFocus="false"
						placeholder="YYYY/MM/DD"
					/>
					<div v-show="isRequiredBlank.birth" text="danger">
						{{ $t("此為必填欄位") }}
					</div>
				</div>
			</div>

			<!-- 博士班畢業學校與系所 -->
			<div flex="~ gap-6" m="2">
				<div space="y-1" w="1/2 min-50 max-100">
					<div text="body">{{ $t("博士班畢業學校與系所") }}</div>
					<InputText
						class="w-full h-12"
						type="text"
						v-model="info.doctoral"
					/>
				</div>
				<div space="y-1" w="1/3 min-30 max-60">
					<div text="body">
						{{
							$t("畢業年度") + $t("(") + $t("西元年份") + $t(")")
						}}
					</div>
					<InputNumber
						class="w-full h-12"
						v-model="info.doctoral_year"
					/>
				</div>
			</div>

			<!-- 碩士班畢業學校與系所 -->
			<div flex="~ gap-6" m="2">
				<div space="y-1" w="1/2 min-50 max-100">
					<div text="body">{{ $t("碩士班畢業學校與系所") }}</div>
					<InputText
						class="w-full h-12"
						type="text"
						v-model="info.master"
					/>
				</div>
				<div space="y-1" w="1/3 min-30 max-60">
					<div text="body">
						{{
							$t("畢業年度") + $t("(") + $t("西元年份") + $t(")")
						}}
					</div>
					<InputNumber
						class="w-full h-12"
						v-model="info.master_year"
					/>
				</div>
			</div>

			<!-- 學士班畢業學校與系所 -->
			<div flex="~ gap-6" m="2">
				<div space="y-1" w="1/2 min-50 max-100">
					<div text="body">{{ $t("學士班畢業學校與系所") }}</div>
					<InputText
						class="w-full h-12"
						type="text"
						v-model="info.college"
					/>
				</div>
				<div space="y-1" w="1/3 min-30 max-60">
					<div text="body">
						{{
							$t("畢業年度") + $t("(") + $t("西元年份") + $t(")")
						}}
					</div>
					<InputNumber
						class="w-full h-12"
						v-model="info.college_year"
					/>
				</div>
			</div>

			<!-- 現職 -->
			<div space="y-1" m="2">
				<div text="body">{{ $t("現職") }}</div>
				<InputText
					class="w-1/2 min-w-50 max-w-100 h-12"
					type="text"
					v-model="info.current_job"
				/>
			</div>

			<!-- 博士班論文主題 -->
			<div space="y-1" m="2">
				<div text="body">{{ $t("博士班論文主題") }}</div>
				<InputText
					class="w-1/2 min-w-50 max-w-100 h-12"
					type="text"
					v-model="info.doctoral_paper"
				/>
			</div>

			<!-- 代表作 -->
			<div space="y-1" m="2">
				<div text="body">{{ $t("代表作") }}</div>
				<Textarea
					class="w-full h-80"
					type="text"
					v-model="info.publication"
				/>
			</div>
		</template>
		<template #Footer>
			<NButton
				Applicant
				class="h-11 min-w-36 mx-auto"
				icon="pi pi-save"
				@click="handleSave()"
				>{{ $t("儲存") }}
			</NButton>
		</template>
	</Layout>
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
import Layout from "@/components/Layout.vue";
import NButton from "@/styles/CustomButton.vue";
import Message from "primevue/message";
import { RecruitmentApplicantAuthResponse } from "@/api/recruitment/applicant/types";
const applicantAuth = useRecruitmentApplicantAuthStore();
const applicantStore = useUserInfoStore();
const api = new RecruitmentApplicantAPI(applicantAuth);
const project = useProjectIdStore();

const { t } = useI18n();
const toast = useToast();
const applicantInfo: RecruitmentApplicantAuthResponse = toRaw(
	applicantStore.userInfo
);

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
