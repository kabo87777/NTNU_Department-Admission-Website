<template>
	<div>
		<div class="mt-24px">
			<div>
				<label class="text-24px font-bold">{{ $t("系統設置") }}</label>
			</div>
		</div>
		<div>
			<SelectButton
				class="mt-16px pl-16px"
				v-model="activeTab"
				:options="tabOptions"
				optionLabel="name"
				aria-labelledby="single"
				:unselectable="false"
			>
			</SelectButton>
		</div>
		<div class="flex mt-32px">
			<div class="w-1/3 pl-16px">{{ $t("開放時間") }}</div>
			<div class="w-1/3 pl-16px">{{ $t("截止時間") }}</div>
		</div>
		<div class="flex mt-16px">
			<div class="w-1/3 pl-16px">
				<div>
					<Calendar
						inputId="icon"
						:showIcon="true"
						:showTime="true"
						dateFormat="yy/mm/dd"
						v-model="date.start"
						:showOnFocus="false"
						placeholder="YYYY/MM/DD hh:mm"
					/>
				</div>
				<div v-show="showRequire.start" class="absolute">
					<small class="p-error">{{ $t("此為必填欄位") }}</small>
				</div>
			</div>
			<div class="w-1/3 pl-16px">
				<div>
					<Calendar
						inputId="icon"
						:showIcon="true"
						:showTime="true"
						dateFormat="yy/mm/dd"
						v-model="date.end"
						:showOnFocus="false"
						placeholder="YYYY/MM/DD hh:mm"
					/>
				</div>
				<div v-show="showRequire.end" class="absolute">
					<small class="p-error">{{ $t("此為必填欄位") }}</small>
				</div>
			</div>
		</div>

		<div class="mt-24px">
			<div>
				<label class="text-24px font-bold">{{ $t("補件需求") }}</label>
			</div>
		</div>
		<div class="flex mt-16px">
			<div class="w-1/3 pl-16px">
				<div>{{ $t("文件名稱") }}:</div>
				<div class="mt-8px">
					<InputText
						type="text"
						v-model="docInfo.name"
						class="h-10 w-240px"
					/>
				</div>
				<div v-show="showRequire.name" class="absolute">
					<small class="p-error">{{ $t("此為必填欄位") }}</small>
				</div>
			</div>
		</div>

		<div class="bigRedDivider" style="margin-top: 32px"></div>
		<div class="flex mt-16px ml-20px justify-center">
			<Button
				@click="saveOnclick"
				class="p-button-outlined p-button-secondary text-20px"
			>
				{{ $t("儲存變更") }}
			</Button>
			<Button
				@click="isModalVisible.sendEmail = true"
				class="p-button-outlined p-button-secondary !ml-40px text-20px"
			>
				{{ $t("寄送E-mail通知") }}
			</Button>
		</div>

		<div class="mt-20px"></div>
	</div>
	<Dialog
		v-model:visible="isModalVisible.sendEmail"
		class="w-500px"
		:closable="false"
		:draggable="false"
		:modal="true"
	>
		<template #header>
			<div class="font-bold text-[24px]">
				{{ $t("確認") }}
			</div>
		</template>
		<template #default>
			<div class="flex">
				<div class="mt-2px">
					<i class="pi pi-question-circle" style="font-size: 20px" />
				</div>
				<div class="ml-4px">
					{{ $t("確認寄送通知") + $t("?") }}
				</div>
			</div>
		</template>
		<template #footer>
			<Button
				class="p-button-outlined p-button-secondary"
				style="border: 2px solid #94282c; color: #94282c; height: 36px"
				icon="pi pi-times"
				iconClass="text-[#94282c]"
				:label="$t('取消')"
				@click="isModalVisible.sendEmail = false"
			/>
			<Button
				class="p-button-outlined p-button-secondary"
				style="
					color: #53565a;
					border: 2px solid #bcd19b;
					margin-left: 16px;
					height: 36px;
				"
				icon="pi pi-check"
				iconClass="text-[#53565A]"
				:label="$t('確認')"
				:loading="isLoading.send"
				@click="handleSendEmail"
			/>
		</template>
	</Dialog>
	<Dialog
		v-model:visible="isModalVisible.saveChange"
		class="w-500px"
		:closable="false"
		:draggable="false"
		:modal="true"
	>
		<template #header>
			<div class="font-bold text-[24px]">
				{{ $t("儲存") }}
			</div>
		</template>
		<template #default>
			<div class="flex">
				<div class="mt-2px">
					<i class="pi pi-question-circle" style="font-size: 20px" />
				</div>
				<div class="ml-4px">
					{{ $t("確認儲存變更") + $t("?") }}
				</div>
			</div>
		</template>
		<template #footer>
			<Button
				class="p-button-outlined p-button-secondary"
				style="border: 2px solid #94282c; color: #94282c; height: 36px"
				icon="pi pi-times"
				iconClass="text-[#94282c]"
				:label="$t('取消')"
				@click="isModalVisible.saveChange = false"
			/>
			<Button
				class="p-button-outlined p-button-secondary"
				style="
					color: #53565a;
					border: 2px solid #bcd19b;
					margin-left: 16px;
					height: 36px;
				"
				icon="pi pi-check"
				iconClass="text-[#53565A]"
				:label="$t('確認')"
				:loading="isLoading.save"
				@click="handleSaveChange"
			/>
		</template>
	</Dialog>
</template>

<script setup lang="ts">
import { reactive, toRaw, watch, ref } from "vue";
import { useRecruitmentAdminAuthStore } from "@/stores/universalAuth";
import { RecruitmentAdminAPI } from "@/api/recruitment/admin/api";
import { useGlobalStore } from "@/stores/RecruitmentAdminStore";
import { useQuery } from "@tanstack/vue-query";
import { RecruimentAdminGetApplicantMoredocResponses } from "@/api/recruitment/admin/types";
import ParagraphDivider from "@/styles/paragraphDivider.vue";
import { useToast } from "primevue/usetoast";
import SelectButton from "primevue/selectbutton";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Calendar from "primevue/calendar";
import Dialog from "primevue/dialog";

const adminAuth = useRecruitmentAdminAuthStore();
const api = new RecruitmentAdminAPI(adminAuth);
const store = useGlobalStore();
const programId = store.program?.id;

const props = defineProps(["userId"]);

const toast = useToast();

let fetchResponse = reactive({
	success: false,
	message: "" as string | [],
});

const activeTab = ref({ name: "關閉", value: false });
let date = reactive({
	start: new Date(),
	end: new Date(),
});
let docInfo = reactive({
	category: "",
	name: "",
});

let showRequire = reactive({
	start: false,
	end: false,
	category: false,
	name: false,
});

let isLoading = reactive({
	save: false,
	send: false,
	fetch: false,
});

const tabOptions = ref([
	{ name: "關閉", value: false },
	{ name: "開啓", value: true },
]);

let isModalVisible = reactive({
	sendEmail: false,
	saveChange: false,
});

const addHours = (numHrs: number, date = new Date()) => {
	const dateCpy = new Date(date.getTime());

	dateCpy.setTime(dateCpy.getTime() + numHrs * 60 * 60 * 1000);

	return dateCpy;
};

const setInfo = (info: RecruimentAdminGetApplicantMoredocResponses) => {
	activeTab.value = info.isMoredoc
		? tabOptions.value[1]
		: tabOptions.value[0];
	date.start = new Date(info.moredoc_start_date);
	date.end = new Date(info.moredoc_end_date);
	docInfo.category = info.moredoc_category;
	docInfo.name = info.moredoc_name;
};

const saveChange = async (body: object) => {
	if (!programId) throw new Error("invalid programId");

	return await api.updateApplicantMoreDocState(programId, props.userId, body);
};

const handleSendEmail = async () => {
	isLoading.send = true;

	const res = await api.sendNotifyApplicantMoreDoc(
		programId as number,
		props.userId
	);

	if (res?.success !== undefined && res?.message !== undefined) {
		fetchResponse.success = toRaw(res.success);
		fetchResponse.message = toRaw(res.message);
	}

	isModalVisible.sendEmail = false;

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

	isLoading.send = false;
};

async function handleSaveChange() {
	isLoading.save = true;

	const body = {
		isMoredoc: activeTab.value.value,
		moredoc_start_date: new Date(date.start),
		moredoc_end_date: new Date(date.end),
		moredoc_category: "其他有利於審查資料",
		moredoc_name: docInfo.name,
	};

	const res = await saveChange(body);

	if (res?.success !== undefined && res?.message !== undefined) {
		fetchResponse.success = toRaw(res.success);
		fetchResponse.message = toRaw(res.message);
	}

	isLoading.save = false;
	isModalVisible.saveChange = false;

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

	isLoading.fetch = true;
}

const resetRequireState = () => {
	showRequire.start = false;
	showRequire.end = false;
	showRequire.category = false;
	showRequire.name = false;
};

const saveOnclick = () => {
	showRequire.start = date.start ? false : true;
	showRequire.end = date.end ? false : true;
	showRequire.category = docInfo.category ? false : true;
	showRequire.name = docInfo.name ? false : true;

	if (!activeTab.value.value) {
		resetRequireState();
		isModalVisible.saveChange = true;
	} else if (
		!showRequire.start &&
		!showRequire.end &&
		!showRequire.category &&
		!showRequire.name
	) {
		resetRequireState();
		isModalVisible.saveChange = true;
	}
};

useQuery(
	["recruitmentApplicantMoredocInfo"],
	async () => {
		if (!programId) throw new Error("invalid programId");

		return await api.getApplicantMoreDocRes(programId, props.userId);
	},
	{
		onSuccess: (data) => {
			setInfo(data as RecruimentAdminGetApplicantMoredocResponses);
		},
	}
);

watch(
	() => isLoading.fetch,
	async () => {
		const response = await api.getApplicantMoreDocRes(
			programId as number,
			props.userId
		);

		setInfo(response);

		isLoading.fetch = false;
	}
);
</script>
