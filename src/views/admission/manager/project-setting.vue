<template>
	<div class="ml-128px mt-20 mb-20">
		<h1 class="text-4xl text-bold tracking-widest">{{ $t("專案設定") }}</h1>
		<Divider class="bg-ntnuRed" />
		<h2 class="text-2xl text-bold tracking-widest inline-block">
			{{ oldProgramName }}
		</h2>
		<Button
			class="w-110px h-40px !ml-20px p-button-outlined p-button-success"
			@click="update"
		>
			<img
				alt="logo"
				src="/assets/project-setting/Check_fill.png"
				style="width: 1.5rem"
				class="fill-green-500"
			/>
			<span class="tracking-1px">{{ $t("保存") }}</span>
		</Button>
		<Button
			class="w-110px h-40px !ml-20px p-button-outlined p-button-danger"
			@click="deleteProject"
		>
			<img
				alt="logo"
				src="/assets/project-setting/Close_round.png"
				style="width: 1.5rem"
				class="fill-green-500"
			/>
			<span class="tracking-1px">{{ $t("刪除") }}</span>
		</Button>
		<h3 class="text-xs tracking-widest text-gray-500">
			2022/09/15 · {{ $t("新增到專案") }}
		</h3>
		<h5 class="text-base tracking-widest mt-30px">
			{{ $t("專案名稱 (修改)") }} :
		</h5>
		<InputText
			type="text"
			v-model="programName"
			class="w-960px h-44px mt-10px"
		/>
		<div>
			<h5 class="text-base tracking-widest mt-30px">
				{{ $t("屬性") }} :
			</h5>
			<Dropdown
				v-model="selected_type"
				:options="types"
				optionLabel="type_name"
				optionValue="type_name"
				class="!w-320px !h-44px mt-10px"
			/>
		</div>
		<div class="inline-block">
			<h5 class="text-base tracking-widest mt-30px">
				{{ $t("申請端開放時間/日期") }} :
			</h5>
			<Calendar
				inputId="icon"
				v-model="application_start_time"
				:showIcon="true"
				:showTime="true"
				:showSeconds="true"
				class="w-320px h-44px mt-10px"
			/>
		</div>
		<div class="inline-block ml-100px">
			<h5 class="text-base tracking-widest mt-30px">
				{{ $t("申請端關閉時間/日期") }} :
			</h5>
			<Calendar
				inputId="icon"
				v-model="application_end_time"
				:showIcon="true"
				:showTime="true"
				:showSeconds="true"
				class="w-320px h-44px mt-10px"
			/>
		</div>
		<br />
		<div class="inline-block">
			<h5 class="text-base tracking-widest mt-30px">
				{{ $t("審查端第一階段開放時間/日期") }} :
			</h5>
			<Calendar
				inputId="icon"
				v-model="review_stage1_start_time"
				:showIcon="true"
				:showTime="true"
				:showSeconds="true"
				class="w-320px h-44px mt-10px"
			/>
		</div>
		<div class="inline-block ml-100px">
			<h5 class="text-base tracking-widest mt-30px">
				{{ $t("審查端第一階段關閉時間/日期") }} :
			</h5>
			<Calendar
				inputId="icon"
				v-model="review_stage1_end_time"
				:showIcon="true"
				:showTime="true"
				:showSeconds="true"
				class="w-320px h-44px mt-10px"
			/>
		</div>
		<br />
		<div class="inline-block">
			<h5 class="text-base tracking-widest mt-30px">
				{{ $t("審查端第二階段開放時間/日期") }} :
			</h5>
			<Calendar
				inputId="icon"
				v-model="review_stage2_start_time"
				:showIcon="true"
				:showTime="true"
				:showSeconds="true"
				class="w-320px h-44px mt-10px"
			/>
		</div>
		<div class="inline-block ml-100px">
			<h5 class="text-base tracking-widest mt-30px">
				{{ $t("審查端第二階段關閉時間/日期") }} :
			</h5>
			<Calendar
				inputId="icon"
				v-model="review_stage2_end_time"
				:showIcon="true"
				:showTime="true"
				:showSeconds="true"
				class="w-320px h-44px mt-10px"
			/>
		</div>
		<br />
		<div>
			<Checkbox
				inputId="binary"
				v-model="checked"
				:binary="true"
				class="!align-top mt-30px"
			/>
			<h5
				class="text-base tracking-widest mt-30px ml-10px align-top inline-block"
			>
				{{ $t("專案詳細") }} :
			</h5>
			<Textarea
				v-model="project_details"
				rows="5"
				cols="30"
				class="w-950px h-320px !mt-30px !ml-10px"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import Divider from "primevue/divider";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import { ref } from "vue";
import Dropdown from "primevue/dropdown";
import Calendar from "primevue/calendar";
import Textarea from "primevue/textarea";
import Checkbox from "primevue/checkbox";
import { useAdmissionAdminAuthStore } from "@/stores/universalAuth";
import { useGlobalStore } from "@/stores/globalStore";
import { AdmissionAdminAPI } from "@/api/admission/admin/api";
import { useMutation, useQuery } from "@tanstack/vue-query";
import { InvalidSessionError } from "@/api/error";
import { router } from "@/router";
import { useToast } from "primevue/usetoast";

const programName = ref<string>("");
const selected_type = ref();
const types = ref([
	{ type_name: "特殊選才" },
	{ type_name: "碩士班徵試入學" },
	{ type_name: "博士班徵試入學" },
]);
const application_start_time = ref<Date>();
const application_end_time = ref();
const review_stage1_start_time = ref();
const review_stage1_end_time = ref();
const review_stage2_start_time = ref();
const review_stage2_end_time = ref();
const project_details = ref("");
const checked = ref(false);

const globalStore = useGlobalStore();
const adminAuth = useAdmissionAdminAuthStore();
const api = new AdmissionAdminAPI(adminAuth);
const programData = useMutation(async (newProgramData: any) => {
	try {
		return await api.updateProgramData(
			globalStore.program!.id,
			newProgramData
		);
	} catch (error) {
		console.log(error);
	}
});
const {
	isLoading,
	isError,
	data: oldProgramName,
	error,
} = useQuery(["programName"], async () => {
	try {
		const programName = (await api.getProgramList()).filter(
			(program) => program.id === globalStore.program!.id
		)[0].name;
		return programName;
	} catch (e: any) {
		if (e instanceof InvalidSessionError) {
			// FIXME: show session expiry notification??
			// Why are we even here in the first place?
			// MainContainer should have checked already.
			console.error(
				"Session has already expired while querying programList"
			);
			router.push("/");
			return;
		}
	}
});

const toast = useToast();
function update() {
	const today = new Date();
	try {
		programData.mutate({
			category: selected_type.value,
			name: programName.value,
			application_start_date:
				dateTransform(application_start_time.value) + "+08:00",
			application_end_date:
				dateTransform(application_end_time.value) + "+08:00",
			review_start_date:
				dateTransform(review_stage1_start_time.value) + "+08:00",
			review_end_date:
				dateTransform(review_stage1_end_time.value) + "+08:00",
			require_file: '["file1", "file2"]',
			stage: "application",
			updated_at: dateTransform(today) + "+08:00",
		});
		toast.add({ severity: "success", summary: "更改成功", life: 3000 });
	} catch (error) {
		toast.add({ severity: "error", summary: "資料錯誤", life: 3000 });
	}
}

function deleteProject() {
	try {
		api.deleteProgram(globalStore.program!.id);
		toast.add({ severity: "success", summary: "刪除成功", life: 3000 });
	} catch (error) {
		toast.add({ severity: "error", summary: "刪除失敗", life: 3000 });
	}
}

function dateTransform(date?: Date) {
	const result = new Date(date!.setHours(date!.getHours() + 8))
		.toJSON()
		.replace("Z", "");
	return result;
}
</script>
