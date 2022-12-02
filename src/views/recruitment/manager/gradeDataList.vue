<template>
	<div>
		<h1 class="text-4xl text-bold tracking-widest">
			{{ $t("評分資料列表") }}
		</h1>
		<div class="bigRedDivider"></div>
		<div>
			<DataTable
				:value="data_list"
				responsiveLayout="scroll"
				dataKey="id"
				:scrollable="true"
				scrollHeight="700px"
			>
				<Column field="id" :header="ID"></Column>
				<Column field="name" :header="applicantName"></Column>
				<Column field="recommand" :header="recommand"></Column>
				<Column field="result" :header="result"></Column>
				<Column field="interviewTime" :header="interviewTime"></Column>
				<Column
					:header="edit"
					:exportable="false"
					style="min-width: 8rem"
				>
					<template #body="slotProps">
						<Button
							icon="pi pi-pencil"
							class="p-button-outlined p-button-success"
							@click="editProduct(slotProps)"
						/>
					</template>
				</Column>
			</DataTable>
			<Dialog
				v-model:visible="productDialog"
				:header="gradeDataEdit"
				:modal="true"
				class="w-720px h-873px"
			>
				<div class="flex mt-24px">
					<div class="text-lg">{{ $t("帳號ID") }} :</div>
					<div class="text-lg ml-266px">{{ $t("帳號名稱") }} :</div>
				</div>
				<div class="flex mt-18.5px">
					<div>
						{{ id }}
					</div>
					<div class="text-base ml-300px">
						{{ name }}
					</div>
				</div>
				<DataTable
					:value="scores"
					responsiveLayout="scroll"
					dataKey="id"
					class="text-base mt-56px"
				>
					<Column field="name" :header="reviewer"></Column>
					<Column
						field="recommandOrNot"
						:header="recommandOrNot"
						dataType="boolean"
						bodyClass="text-center"
						style="min-width: 8rem"
					>
						<template #body="slotProps">
							<i
								v-if="slotProps.data.recommandOrNot"
								class="pi pi-check"
							></i>
							<p v-else>-</p>
						</template>
					</Column>
					<Column field="note" :header="note"></Column>
				</DataTable>
				<div class="bigRedDivider"></div>
				<div class="flex mt-15px ml-36px">
					<div>
						{{ recommand }}
					</div>
					<div class="ml-48px">2/1</div>
				</div>
				<div class="mt-55px ml-52px">
					{{ $t("書面審查結果") }}
				</div>
				<Dropdown
					v-model="selectedResult"
					:options="results"
					class="mt-8px !w-576px !h-44px ml-52px"
				>
				</Dropdown>
				<div class="mt-32px ml-52px">
					{{ $t("面試時間") }}
				</div>
				<Dropdown
					v-if="disable"
					v-model="selectedInterviewTime"
					:options="interviewTimes"
					class="mt-8px !w-576px !h-44px ml-52px"
				>
				</Dropdown>
				<Dropdown
					v-else
					v-model="selectedInterviewTime"
					:options="interviewTimes"
					class="mt-8px !w-576px !h-44px ml-52px"
					disabled
				>
				</Dropdown>
				<Button
					class="w-140px h-44px !mt-48px !ml-200px p-button-outlined p-button-success"
					@click="doneEdit"
				>
					<img
						alt="logo"
						src="/assets/gradeDataList/Done_round.png"
						style="width: 1.5rem"
						class="fill-green-500"
					/>
					<span class="tracking-1px">{{ $t("儲存變更") }}</span>
				</Button>
				<Button
					class="w-100px h-44px !mt-48px !ml-49px p-button-outlined p-button-danger"
					@click="doneEdit"
				>
					<img
						alt="logo"
						src="/assets/project-setting/Close_round.png"
						style="width: 1.5rem"
						class="fill-green-500"
					/>
					<span class="tracking-1px">{{ $t("取消") }}</span>
				</Button>
			</Dialog>
			<div class="bigRedDivider !mt-50px"></div>
			<div class="flex text-xl mt-20px">
				<div>{{ $t("待審核") }} 3 {{ $t("位") }}</div>
				<Divider layout="vertical" class="!ml-30px" />
				<div class="!ml-30px">{{ $t("通過") }} 1 {{ $t("位") }}</div>
				<Divider layout="vertical" class="!ml-30px" />
				<div class="!ml-30px">{{ $t("不通過") }} 1 {{ $t("位") }}</div>
				<Button
					class="w-140px h-44px !ml-480px p-button-outlined p-button-help"
				>
					<img
						alt="logo"
						src="/assets/gradeDataList/Paper.png"
						style="width: 1.5rem"
						class="fill-green-500"
					/>
					<span class="tracking-1px">{{ $t("報表列印") }}</span>
				</Button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import "@/styles/customize.css";
import "primeicons/primeicons.css";
import { computed, ref } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import Divider from "primevue/divider";
import Dropdown from "primevue/dropdown";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const translation = {
	pending: t("待審核"),
	notPass: t("不通過"),
	pass: t("通過"),
};

// 連結API
const data_list = ref([
	{
		id: "1000",
		name: "Aaa",
		recommand: "3/1",
		result: translation.pass,
		interviewTime: "2022/10/30",
	},
	{
		id: "1001",
		name: "Bbb",
		recommand: "3/2",
		result: translation.pending,
		interviewTime: "",
	},
	{
		id: "1002",
		name: "Ccc",
		recommand: "3/3",
		result: translation.notPass,
		interviewTime: "",
	},
	{
		id: "1003",
		name: "Ddd",
		recommand: "3/4",
		result: translation.pass,
		interviewTime: "2022/10/30",
	},
	{
		id: "1004",
		name: "Eee",
		recommand: "3/5",
		result: translation.pending,
		interviewTime: "",
	},
	{
		id: "1005",
		name: "Fff",
		recommand: "3/6",
		result: translation.pending,
		interviewTime: "",
	},
	{
		id: "1006",
		name: "Ggg",
		recommand: "3/7",
		result: translation.notPass,
		interviewTime: "",
	},
	{
		id: "1007",
		name: "Hhh",
		recommand: "3/8",
		result: translation.notPass,
		interviewTime: "",
	},
	{
		id: "1008",
		name: "Iii",
		recommand: "3/9",
		result: translation.pass,
		interviewTime: "2022/10/30",
	},
	{
		id: "1009",
		name: "Jjj",
		recommand: "3/10",
		result: translation.pending,
		interviewTime: "",
	},
]);

const scores = ref([
	{
		name: "Mike",
		recommandOrNot: true,
		note: "good",
	},
	{
		name: "Amber",
		recommandOrNot: false,
		note: "bad",
	},
	{
		name: "Peter",
		recommandOrNot: true,
		note: "good",
	},
]);

const productDialog = ref(false);
const name = ref("");
const id = ref("");
const selectedResult = ref(translation.pending);
const results = ref([
	translation.pending,
	translation.notPass,
	translation.pass,
]);
const selectedInterviewTime = ref("2022/10/30");
const interviewTimes = ref(["2022/10/30", "2022/10/31", "2022/11/01"]);
const disable = computed(() => {
	return selectedResult.value === translation.pass;
});

const ID = computed(() => t("帳號ID"));
const applicantName = computed(() => t("申請人姓名"));
const gradeDataEdit = computed(() => t("評分資料編輯"));
const recommand = computed(() => t("推薦/不推薦"));
const result = computed(() => t("審查結果"));
const interviewTime = computed(() => t("面試時間"));
const recommandOrNot = computed(() => t("是否推薦"));
const note = computed(() => t("評比註記"));
const reviewer = computed(() => t("審查委員"));
const edit = computed(() => t("操作"));

const editProduct = (prod: any) => {
	name.value = prod.data.name;
	id.value = prod.data.id;
	productDialog.value = true;
};

function doneEdit() {
	// phase1_list.value[
	// 	phase1_list.value.findIndex((obj) => obj.id == id.value)
	// ].phase1_result = p1_result.value;
	productDialog.value = false;
}
</script>
