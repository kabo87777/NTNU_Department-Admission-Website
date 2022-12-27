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
			<!-- 設定專案屬性 -->
			<div flex="~ col gap-1" text="body">
				<div>{{ $t("設定專案屬性") }} :</div>
				<Dropdown
					v-model="selected_type"
					:options="types"
					optionLabel="type_name"
					optionValue="type_name"
					w="!300px"
				/>
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
						v-model="application_start_time"
						:showIcon="true"
						:showTime="true"
						class="!w-300px customDatePicker"
						:baseZIndex="zIndex"
						dateFormat="yy/mm/dd"
						:showOnFocus="false"
						placeholder="YYYY/MM/DD hh:mm"
					/>
				</div>
				<div flex="~ col gap-1">
					<div>{{ $t("關閉日期與時間") }} :</div>
					<Calendar
						inputId="icon"
						v-model="application_end_time"
						:showIcon="true"
						:showTime="true"
						class="!w-300px customDatePicker"
						:baseZIndex="zIndex"
						dateFormat="yy/mm/dd"
						:showOnFocus="false"
						placeholder="YYYY/MM/DD hh:mm"
					/>
				</div>
			</div>
			<div pt="6" text="xl pReviewer">{{ $t("審查端 - 書面審查") }}</div>
			<div flex="~ gap-12" ml="4" text="secondary">
				<div flex="~ col gap-1">
					<div>{{ $t("開放日期與時間") }} :</div>
					<Calendar
						inputId="icon"
						v-model="review_stage1_start_time"
						:showIcon="true"
						:showTime="true"
						class="!w-300px customDatePicker"
						:baseZIndex="zIndex"
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
						:baseZIndex="zIndex"
						dateFormat="yy/mm/dd"
						:showOnFocus="false"
						placeholder="YYYY/MM/DD hh:mm"
					/>
				</div>
			</div>

			<div pt="6" text="xl pReviewer">{{ $t("審查端 - 口試審查") }}</div>
			<div flex="~ gap-12" ml="4" text="secondary">
				<div flex="~ col gap-1">
					<div>{{ $t("開放日期與時間") }} :</div>
					<Calendar
						inputId="icon"
						v-model="review_stage2_start_time"
						:showIcon="true"
						:showTime="true"
						class="!w-300px customDatePicker"
						:baseZIndex="zIndex"
						dateFormat="yy/mm/dd"
						:showOnFocus="false"
						placeholder="YYYY/MM/DD hh:mm"
					/>
				</div>
				<div flex="~ col gap-1">
					<div>{{ $t("關閉日期與時間") }} :</div>
					<Calendar
						inputId="icon"
						v-model="review_stage2_end_time"
						:showIcon="true"
						:showTime="true"
						class="!w-300px customDatePicker"
						:baseZIndex="zIndex"
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
					@click="update"
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
import InputText from "primevue/inputtext";
import Layout from "@/components/Layout.vue";
import { ref, watch } from "vue";
import Dropdown from "primevue/dropdown";
import Calendar from "primevue/calendar";
import PDivider from "@/styles/PrDivider.vue";
import { useAdmissionAdminAuthStore } from "@/stores/universalAuth";
import { useGlobalStore } from "@/stores/globalStore";
import { AdmissionAdminAPI } from "@/api/admission/admin/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { InvalidSessionError } from "@/api/error";
import { useToast } from "primevue/usetoast";
import { useI18n } from "vue-i18n";
import NButton from "@/styles/CustomButton.vue";
import ConfirmDialog from "primevue/confirmdialog";
import { useConfirm } from "primevue/useconfirm";

const programName = ref<string>("");
const oldProgramName = ref<string>("");
const selected_type = ref();
const { t: $t } = useI18n();
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
			review_stage1_end_time.value = new Date(data.docs_end_date);
			review_stage2_start_time.value = new Date(data.oral_start_date);
			review_stage2_end_time.value = new Date(data.review_end_date);
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
	if (review_stage2_start_time.value < review_stage1_end_time.value!) {
		toast.add({
			severity: "error",
			summary: "錯誤",
			detail: "口試審查開始時間不得早於書面審查截止時間",
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
					dateTransform(application_start_time.value) + "+00:00",
				application_end_date:
					dateTransform(application_end_time.value) + "+00:00",
				review_start_date:
					dateTransform(review_stage1_start_time.value) + "+00:00",
				docs_end_date:
					dateTransform(review_stage1_end_time.value) + "+00:00",
				oral_start_date:
					dateTransform(review_stage2_start_time.value) + "+00:00",
				review_end_date:
					dateTransform(review_stage2_end_time.value) + "+00:00",
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
