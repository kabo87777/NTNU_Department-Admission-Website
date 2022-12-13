<template>
	<div>
		<h1 class="text-4xl text-bold tracking-widest">{{ $t("專案設定") }}</h1>
		<div class="bigRedDivider"></div>
		<h2 class="text-2xl text-bold tracking-widest inline-block mt-16px">
			{{ oldProgramName }}
		</h2>
		<h3 class="text-s tracking-widest text-gray-500 mt-8px">
			{{ programCreateDate }} · {{ $t("新增到專案") }}
		</h3>
		<h5 class="text-base tracking-widest mt-32px mb-10px">
			{{ $t("專案名稱 (修改)") }} :
		</h5>
		<InputText
			type="text"
			v-model="programName"
			class="w-960px h-44px mt-16px"
		/>
		<div class="text-lg tracking-widest font-bold mt-120px text-red-500">
			{{ $t("請在申請端開放之前完成其他專案設定") }}
		</div>
		<div class="inline-block">
			<h5 class="text-base tracking-widest mt-48px">
				{{ $t("申請端開放時間/日期") }} :
			</h5>
			<Calendar
				inputId="icon"
				v-model="recruit_start_time"
				:showIcon="true"
				:showTime="true"
				class="w-320px h-44px mt-10px"
				dateFormat="yy/mm/dd"
			/>
		</div>
		<div class="inline-block ml-100px">
			<h5 class="text-base tracking-widest mt-48px">
				{{ $t("申請端關閉時間/日期") }} :
			</h5>
			<Calendar
				inputId="icon"
				v-model="recruit_end_time"
				:showIcon="true"
				:showTime="true"
				class="w-320px h-44px mt-10px"
				dateFormat="yy/mm/dd"
			/>
		</div>
		<br />
		<div class="inline-block">
			<h5 class="text-base tracking-widest mt-30px">
				{{ $t("審查端開放時間/日期") }} :
			</h5>
			<Calendar
				inputId="icon"
				v-model="review_stage1_start_time"
				:showIcon="true"
				:showTime="true"
				class="w-320px h-44px mt-10px"
				dateFormat="yy/mm/dd"
			/>
		</div>
		<div class="inline-block ml-100px">
			<h5 class="text-base tracking-widest mt-30px">
				{{ $t("審查端關閉時間/日期") }} :
			</h5>
			<Calendar
				inputId="icon"
				v-model="review_stage1_end_time"
				:showIcon="true"
				:showTime="true"
				class="w-320px h-44px mt-10px"
				dateFormat="yy/mm/dd"
			/>
		</div>
		<div class="mt-200px">
			<div class="bigRedDivider"></div>
		</div>
		<div class="flex mt-24px">
			<div class="m-auto">
				<div class="flex">
					<NButton
						type="Admin"
						class="bg-white h-60px w-140px"
						@click="deleteProject"
						icon="pi pi-times"
					>
						<div>{{ $t("刪除專案") }}</div>
					</NButton>
					<div class="w-24px"></div>
					<NButton
						type="Admin"
						class="bg-Green h-60px w-140px"
						@click="updateProgramData"
						icon="pi pi-check"
					>
						<div>{{ $t("儲存設定") }}</div>
					</NButton>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useToast } from "primevue/usetoast";
import Button from "primevue/button";
import Calendar from "primevue/calendar";
import Checkbox from "primevue/checkbox";
import Divider from "primevue/divider";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import NButton from "@/styles/CustomButton.vue";

import { ref } from "vue";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";

import { RecruitmentAdminAPI } from "@/api/recruitment/admin/api";
import { useRecruitmentAdminAuthStore } from "@/stores/universalAuth";
import { useGlobalStore } from "@/stores/RecruitmentAdminStore";

const programName = ref<string>("");
const oldProgramName = ref<string>("");
const selected_type = ref({});
const recruit_start_time = ref();
const recruit_end_time = ref();
const review_stage1_start_time = ref();
const review_stage1_end_time = ref();
const checked = ref(false);
const programCreateDate = ref("");

// Get QueryClient from the context
const queryClient = useQueryClient();
const globalStore = useGlobalStore();
const toast = useToast();
const adminAuth = useRecruitmentAdminAuthStore();

const api = new RecruitmentAdminAPI(adminAuth);

const programDataMutation = useMutation(async (newProgramData: any) => {
	return await api.updateProgramData(globalStore.program!.id, newProgramData);
});

useQuery(
	["RAdminprogram"],
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
			recruit_start_time.value = new Date(data.recruit_start_date);
			recruit_end_time.value = new Date(data.recruit_end_date);
			review_stage1_start_time.value = new Date(data.review_start_date);
			review_stage1_end_time.value = new Date(data.review_end_date);
		},
	}
);

function updateProgramData() {
	if (recruit_end_time.value < recruit_start_time.value) {
		toast.add({
			severity: "error",
			summary: "錯誤",
			detail: "申請結束時間不得早於申請開始時間",
			life: 3000,
		});
		return;
	}
	if (review_stage1_end_time.value < review_stage1_start_time.value) {
		toast.add({
			severity: "error",
			summary: "錯誤",
			detail: "審核結束時間不得早於審核開始時間",
			life: 3000,
		});
		return;
	}
	programDataMutation.mutate(
		{
			category: selected_type.value,
			name: programName.value,
			recruit_start_date:
				dateTransform(recruit_start_time.value) + "+08:00",
			recruit_end_date: dateTransform(recruit_end_time.value) + "+08:00",
			review_start_date:
				dateTransform(review_stage1_start_time.value) + "+08:00",
			review_end_date:
				dateTransform(review_stage1_end_time.value) + "+08:00",
		},
		{
			onError: (e: any) => {
				toast.add({
					severity: "error",
					summary: e.toString(),
					life: 3000,
				});
			},
			onSuccess: () => {
				toast.add({
					severity: "success",
					summary: "更改成功",
					life: 3000,
				});
			},
			onSettled: async () => {
				await queryClient.invalidateQueries({ queryKey: ["program"] });
			},
		}
	);
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
	queryClient.invalidateQueries({ queryKey: ["RAdminprogram"] });
});

function dateTransform(date?: Date) {
	const result = new Date(date!.setHours(date!.getHours() + 8))
		.toJSON()
		.replace("Z", "");
	return result;
}
</script>
