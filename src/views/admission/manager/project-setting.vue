<template>
	<!-- Header -->
	<div class="fixed bg-white top-15 left-1/4 right-0 z-50 <lg:left-60">
		<div class="w-9/10 pt-6 m-auto">
			<h1 class="text-4xl text-bold tracking-widest">
				{{ $t("專案設定") }}
			</h1>
			<div class="bigRedDivider"></div>
		</div>
	</div>

	<!-- Body -->
	<div class="py-20" text="body xl">
		<h5 class="text-base tracking-widest mt-32px">
			{{ $t("專案名稱 (修改)") }} :
		</h5>
		<InputText
			type="text"
			v-model="programName"
			class="w-960px h-44px !mt-16px"
		/>
		<div>
			<h5 class="text-base tracking-widest mt-32px">
				{{ $t("屬性") }} :
			</h5>
			<Dropdown
				v-model="selected_type"
				:options="types"
				optionLabel="type_name"
				optionValue="type_name"
				class="!w-320px !h-44px mt-16px"
			/>
		</div>
		<div class="text-lg tracking-widest font-bold mt-36px text-red-500">
			{{ $t("請在申請端開放之前完成其他專案設定") }}
		</div>
		<div class="inline-block">
			<h5 class="text-base tracking-widest mt-48px">
				{{ $t("申請端開放時間/日期") }} :
			</h5>
			<div>
				<Calendar
					inputId="icon"
					v-model="application_start_time"
					:showIcon="true"
					:showTime="true"
					class="w-320px h-44px mt-16px"
					:baseZIndex="zIndex"
					dateFormat="yy/mm/dd"
				/>
			</div>
		</div>
		<div class="inline-block ml-100px">
			<h5 class="text-base tracking-widest mt-48px">
				{{ $t("申請端關閉時間/日期") }} :
			</h5>
			<div>
				<Calendar
					inputId="icon"
					v-model="application_end_time"
					:showIcon="true"
					:showTime="true"
					class="w-320px h-44px mt-16px"
					:baseZIndex="zIndex"
					dateFormat="yy/mm/dd"
				/>
			</div>
		</div>
		<br />
		<div class="inline-block">
			<h5 class="text-base tracking-widest mt-32px">
				{{ $t("書面審查開放時間/日期") }} :
			</h5>
			<Calendar
				inputId="icon"
				v-model="review_stage1_start_time"
				:showIcon="true"
				:showTime="true"
				class="w-320px h-44px mt-16px"
				:baseZIndex="zIndex"
				dateFormat="yy/mm/dd"
			/>
		</div>
		<div class="inline-block ml-100px">
			<h5 class="text-base tracking-widest mt-32px">
				{{ $t("書面審查關閉時間/日期") }} :
			</h5>
			<Calendar
				inputId="icon"
				v-model="review_stage1_end_time"
				:showIcon="true"
				:showTime="true"
				class="w-320px h-44px mt-16px"
				:baseZIndex="zIndex"
				dateFormat="yy/mm/dd"
			/>
		</div>
		<br />
		<div class="inline-block">
			<h5 class="text-base tracking-widest mt-32px">
				{{ $t("口試審查開放時間/日期") }} :
			</h5>
			<Calendar
				inputId="icon"
				v-model="review_stage2_start_time"
				:showIcon="true"
				:showTime="true"
				class="w-320px h-44px mt-16px"
				:baseZIndex="zIndex"
				dateFormat="yy/mm/dd"
			/>
		</div>
		<div class="inline-block ml-100px">
			<h5 class="text-base tracking-widest mt-32px">
				{{ $t("口試審查關閉時間/日期") }} :
			</h5>
			<Calendar
				inputId="icon"
				v-model="review_stage2_end_time"
				:showIcon="true"
				:showTime="true"
				class="w-320px h-44px mt-16px"
				:baseZIndex="zIndex"
				dateFormat="yy/mm/dd"
			/>
		</div>
	</div>

	<!-- Footer -->
	<div class="fixed bg-white bottom-0 left-1/4 right-0 z-50 <lg:left-60">
		<div class="w-9/10 pt-2 m-auto space-y-2 pb-6">
			<div>
				<div class="bigRedDivider"></div>
			</div>
			<div class="flex mt-24px">
				<div class="m-auto">
					<div class="flex">
						<Button
							class="bg-white h-60px w-140px border-ntnuRed"
							@click="deleteProject"
						>
							<i
								class="pi pi-times ml-1 mr-2 box-border"
								text="sm ntnuRed"
							></i>
							<div class="m-auto tracking-2" text="sm ntnuRed">
								<div>{{ $t("刪除專案") }}</div>
							</div>
						</Button>
						<div class="w-24px"></div>
						<Button
							class="bg-Green h-60px w-140px border-ntnuRed"
							@click="update"
						>
							<i
								class="pi pi-check ml-1 mr-2 box-border"
								text="sm black"
							></i>
							<div class="m-auto tracking-2" text="sm black">
								<div>{{ $t("儲存設定") }}</div>
							</div>
						</Button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import Divider from "primevue/divider";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import { ref, watch } from "vue";
import Dropdown from "primevue/dropdown";
import Calendar from "primevue/calendar";
import Textarea from "primevue/textarea";
import Checkbox from "primevue/checkbox";
import SelectButton from "primevue/selectbutton";
import { useAdmissionAdminAuthStore } from "@/stores/universalAuth";
import { useGlobalStore } from "@/stores/globalStore";
import { AdmissionAdminAPI } from "@/api/admission/admin/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { InvalidSessionError } from "@/api/error";
import { router } from "@/router";
import { useToast } from "primevue/usetoast";
import { useI18n } from "vue-i18n";

const programName = ref<string>("");
const oldProgramName = ref<string>("");
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
const checked = ref(false);
const programCreateDate = ref("");
const review_stage = ref("");
const { t } = useI18n();
const translation = {
	phase1: t("第一階段 (書面審查)"),
	phase2: t("第二階段 (口試審查)"),
};
const zIndex = 100;
const review_stages = ref([translation.phase1, translation.phase2]);
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
	data: program,
	error,
} = useQuery(
	["Aadminprogram"],
	async () => {
		const programs = await api.getProgramList();

		const filteredPrograms = programs.filter(
			(program) => program.id === globalStore.program!.id
		);

		if (filteredPrograms.length < 1) {
			throw new Error("No available programs!");
		}

		return filteredPrograms[0];
	},
	{
		onSuccess: (data) => {
			oldProgramName.value = data.name;
			programName.value = data.name;
			selected_type.value = data.category;
			programCreateDate.value = data.created_at.slice(0, 10);
			application_start_time.value = new Date(
				data.application_start_date
			);
			application_end_time.value = new Date(data.application_end_date);
			review_stage1_start_time.value = new Date(data.review_start_date);
			review_stage1_end_time.value = new Date(data.review_end_date);
			if (data.stage === "docs_stage") {
				review_stage.value = translation.phase1;
			}
			if (data.stage === "oral_stage") {
				review_stage.value = translation.phase2;
			}
		},
		// TODO: onError
	}
);

const toast = useToast();
const stage = ref("");
const queryClient = useQueryClient();
async function update() {
	if (application_end_time.value < application_start_time.value!) {
		toast.add({
			severity: "error",
			summary: "錯誤",
			detail: "申請截止時間不得早於申請開始時間",
			life: 3000,
		});
		return;
	}
	if (review_stage1_end_time.value < review_stage1_start_time.value!) {
		toast.add({
			severity: "error",
			summary: "錯誤",
			detail: "書面審查截止時間不得早於書面審查開始時間",
			life: 3000,
		});
		return;
	}
	if (review_stage2_end_time.value < review_stage2_start_time.value!) {
		toast.add({
			severity: "error",
			summary: "錯誤",
			detail: "口試審查截止時間不得早於口試審查開始時間",
			life: 3000,
		});
		return;
	}
	if (review_stage.value === translation.phase1) {
		stage.value = "docs_stage";
	} else if (review_stage.value === translation.phase2) {
		stage.value = "oral_stage";
	} else {
		stage.value = "application_stage";
	}
	try {
		programData.mutate(
			{
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
				stage: stage.value,
			},
			{
				onSuccess: () => {
					queryClient.invalidateQueries({
						queryKey: ["programList"],
					});
				},
			}
		);
		toast.add({ severity: "success", summary: "更改成功", life: 3000 });
	} catch (error) {
		toast.add({ severity: "error", summary: "資料錯誤", life: 3000 });
	}
}

async function deleteProject() {
	try {
		await api.deleteProgram(globalStore.program!.id);
		toast.add({ severity: "success", summary: "刪除成功", life: 3000 });
	} catch (error) {
		toast.add({ severity: "error", summary: "刪除失敗", life: 3000 });
	}
	await queryClient.invalidateQueries({ queryKey: ["programList"] });
}

globalStore.$subscribe(() => {
	queryClient.invalidateQueries({
		queryKey: ["Aadminprogram"],
	});
});

function dateTransform(date?: Date) {
	const result = new Date(date!.setHours(date!.getHours() + 8))
		.toJSON()
		.replace("Z", "");
	return result;
}
</script>
