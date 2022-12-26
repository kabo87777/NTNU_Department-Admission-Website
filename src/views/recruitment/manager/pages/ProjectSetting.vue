<template>
	<ConfirmDialog :draggable="false" />
	<Layout Admin>
		<template #Header>
			{{ $t("專案設定") }}
		</template>
		<template #Body>
			<!-- 專案名稱 -->
			<div pos="sticky top-0" bg="white" pb="2" z="50">
				<div text="sm secondary">
					{{ $t("當前專案") }}
				</div>
				<div flex="~ gap-4" p="4" border="rounded-lg nGrey-100 2">
					<div text="3xl pAdmin" font="medium tracking-widest">
						{{ oldProgramName }}
					</div>
					<div text="sm secondary" mt="auto">
						{{ programCreateDate }} · {{ $t("新增到專案") }}
					</div>
				</div>
			</div>
			<!-- 基本設定 -->
			<div text="2xl title" pb="2">
				{{ $t("基本屬性") }}
			</div>
			<!-- 修改專案名稱 -->
			<div flex="~ col gap-1" text="body">
				<div>{{ $t("修改專案名稱") }} :</div>
				<InputText w="!300px" type="text" v-model="programName" />
			</div>
			<PDivider Admin />
			<!-- 開放時間 -->
			<div flex="~ gap-2" pb="2">
				<div text="2xl title">{{ $t("開放時間") }}</div>
				<div text="sm warning" mt="auto">
					※ {{ $t("請在申請端開放之前完成其他專案設定") }}
				</div>
			</div>
			<div text="xl pApplicant">{{ $t("申請端") }}</div>
			<div flex="~ gap-12" ml="4" text="secondary">
				<div flex="~ col gap-1">
					<div>{{ $t("開放日期與時間") }} :</div>
					<Calendar
						inputId="icon"
						v-model="recruit_start_time"
						:showIcon="true"
						:showTime="true"
						class="!w-300px customDatePicker"
						dateFormat="yy/mm/dd"
						:showOnFocus="false"
						placeholder="YYYY/MM/DD hh:mm"
					/>
				</div>
				<div flex="~ col gap-1">
					<div>{{ $t("關閉日期與時間") }} :</div>
					<Calendar
						inputId="icon"
						v-model="recruit_end_time"
						:showIcon="true"
						:showTime="true"
						class="!w-300px customDatePicker"
						dateFormat="yy/mm/dd"
						:showOnFocus="false"
						placeholder="YYYY/MM/DD hh:mm"
					/>
				</div>
			</div>
			<div pt="6" text="xl pReviewer">{{ $t("審查端") }}</div>
			<div flex="~ gap-12" ml="4" text="secondary">
				<div flex="~ col gap-1">
					<div>{{ $t("開放日期與時間") }} :</div>
					<Calendar
						inputId="icon"
						v-model="review_stage1_start_time"
						:showIcon="true"
						:showTime="true"
						class="!w-300px customDatePicker"
						dateFormat="yy/mm/dd"
						:showOnFocus="false"
						placeholder="YYYY/MM/DD hh:mm"
					/>
				</div>
				<div flex="~ col gap-1">
					<div>{{ $t("關閉日期與時間") }} :</div>
					<Calendar
						inputId="icon"
						v-model="review_stage1_end_time"
						:showIcon="true"
						:showTime="true"
						class="!w-300px customDatePicker"
						dateFormat="yy/mm/dd"
						:showOnFocus="false"
						placeholder="YYYY/MM/DD hh:mm"
					/>
				</div>
			</div>
		</template>
		<template #Footer>
			<div class="flex" justify="end">
				<NButton
					Admin
					class="h-11 min-w-36 mx-auto"
					@click="updateProgramData"
					icon="pi pi-save"
				>
					<div>{{ $t("儲存設定") }}</div>
				</NButton>
				<NButton
					Danger
					class="h-11 min-w-36 absolute"
					@click="confirmDeleteProject()"
					icon="pi pi-trash"
				>
					<div>{{ $t("刪除專案") }}</div>
				</NButton>
			</div>
		</template>
	</Layout>
</template>

<script setup lang="ts">
import { useToast } from "primevue/usetoast";
import Calendar from "primevue/calendar";
import Layout from "@/components/Layout.vue";
import InputText from "primevue/inputtext";
import PDivider from "@/styles/PrDivider.vue";
import NButton from "@/styles/CustomButton.vue";
import { useI18n } from "vue-i18n";
import ConfirmDialog from "primevue/confirmdialog";
import { useConfirm } from "primevue/useconfirm";

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
const { t: $t } = useI18n();

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
				dateTransform(recruit_start_time.value) + "+00:00",
			recruit_end_date: dateTransform(recruit_end_time.value) + "+00:00",
			review_start_date:
				dateTransform(review_stage1_start_time.value) + "+00:00",
			review_end_date:
				dateTransform(review_stage1_end_time.value) + "+00:00",
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

	await queryClient.invalidateQueries({
		queryKey: ["recruitmentAdminprogramList"],
	});
}

globalStore.$subscribe(() => {
	queryClient.invalidateQueries({ queryKey: ["RAdminprogram"] });
});

const confirm = useConfirm();
const confirmDeleteProject = () => {
	confirm.require({
		header: $t("是否要刪除此專案？"),
		message: $t("此動作不可回復，請謹慎操作"),
		icon: "pi pi-exclamation-triangle",
		accept: () => {
			deleteProject();
		},
		acceptLabel: $t("確認"),
		rejectLabel: $t("取消"),
	});
};

function dateTransform(date?: Date) {
	const result = new Date(date!.setHours(date!.getHours()))
		.toJSON()
		.replace("Z", "");
	return result;
}
</script>

<style lang="scss">
.customDatePicker {
	.p-datepicker {
		z-index: 101;
	}
}
</style>
