<template>
	<div class="ml-128px">
		<h1 class="text-4xl text-bold tracking-widest">
			{{ $t("評分資料列表") }}
		</h1>
		<div class="bigRedDivider"></div>
		<SelectButton
			class="mt-20px h-45px !w-1280px"
			v-model="currentTab"
			:options="tabOptions"
			aria-labelledby="single"
		/>
		<div v-if="currentTab === '第一階段 (書面審查)'">
			<DataTable
				:value="phase1_list"
				responsiveLayout="scroll"
				dataKey="id"
				:scrollable="true"
				scrollHeight="700px"
			>
				<Column field="id" header="帳戶 ID"></Column>
				<Column field="name" header="申請人姓名"></Column>
				<Column field="book_review_score" header="書審分數"></Column>
				<Column
					field="access"
					header="逕取"
					dataType="boolean"
					bodyClass="text-center"
					style="min-width: 8rem"
				>
					<template #body="slotProps">
						<i v-if="slotProps.data.access" class="pi pi-check"></i>
						<p v-else>-</p>
					</template>
				</Column>
				<Column field="phase1_result" header="階段審核結果"></Column>
				<Column :exportable="false" style="min-width: 8rem">
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
				header="評分資料編輯"
				:modal="true"
				class="w-720px h-988px"
			>
				<Divider></Divider>
				<div class="flex mt-24px">
					<div class="text-lg">帳號 ID :</div>
					<div class="text-lg ml-266px">帳號名稱 :</div>
				</div>
				<div class="flex mt-18.5px">
					<div>
						{{ id }}
					</div>
					<div class="text-base ml-300px">
						{{ name }}
					</div>
				</div>
				<SelectButton
					v-if="disable1"
					class="h-39px mt-32px !w-664px"
					v-model="dialogCurrentTab"
					:options="dialogTabOptions"
				/>
				<SelectButton
					v-else
					class="h-39px mt-32px !w-664px"
					v-model="dialogCurrentTab"
					:options="dialogTabOptions"
					disabled
				/>
				<DataTable
					:value="scores"
					responsiveLayout="scroll"
					dataKey="id"
					class="text-base mt-24px"
				>
					<Column field="name" header="審查委員"></Column>
					<Column
						field="access"
						header="逕取"
						dataType="boolean"
						bodyClass="text-center"
						style="min-width: 8rem"
					>
						<template #body="slotProps">
							<i
								v-if="slotProps.data.access"
								class="pi pi-check"
							></i>
							<p v-else>-</p>
						</template>
					</Column>
					<Column field="score_1" header="學習歷程"></Column>
					<Column field="score_2" header="發展潛能"></Column>
					<Column field="score_3" header="學習潛力"></Column>
				</DataTable>
				<div class="flex mt-20px ml-5px">
					<div>平均分數</div>
					<div class="ml-240px">80</div>
					<div class="ml-107px">70</div>
					<div class="ml-107px">66.6</div>
				</div>
				<div class="flex mt-52px ml-53px">
					<div>
						<div>一階審查結果</div>
						<Dropdown
							v-model="p1_result"
							:options="p1_result_option"
							class="w-228px h-44px mt-8px"
						/>
					</div>
					<div class="ml-120px">
						<div>口試順序</div>
						<InputText
							v-if="disable1"
							type="text"
							v-model="oral_order"
							class="w-148px h-44px mt-8px"
						/>
						<InputText
							v-else
							type="text"
							v-model="oral_order"
							disabled
							class="w-148px h-44px mt-8px"
						/>
					</div>
				</div>
				<div class="flex mt-32px ml-52px">
					<div>
						<div>二階審查結果</div>
						<Dropdown
							v-if="disable1"
							v-model="p2_result"
							:options="p2_result_option"
							class="w-228px h-44px mt-8px"
						/>
						<Dropdown
							v-else
							v-model="p2_result"
							:options="p2_result_option"
							disabled
							class="w-228px h-44px mt-8px"
						/>
					</div>
					<div class="ml-120px">
						<div>錄取順序</div>
						<InputText
							v-if="disable1"
							type="text"
							v-model="oral_order"
							class="w-148px h-44px mt-8px"
						/>
						<InputText
							v-else-if="!disable1"
							type="text"
							v-model="oral_order"
							disabled
							class="w-148px h-44px mt-8px"
						/>
					</div>
				</div>
				<Button
					class="w-140px h-44px !mt-40px !ml-200px p-button-outlined p-button-success"
					@click="doneEdit"
				>
					<img
						alt="logo"
						src="/assets/gradeDataList/Done_round.png"
						style="width: 1.5rem"
						class="fill-green-500"
					/>
					<span class="tracking-1px">儲存變更</span>
				</Button>
				<Button
					class="w-100px h-44px !mt-40px !ml-49px p-button-outlined p-button-danger"
					@click="doneEdit"
				>
					<img
						alt="logo"
						src="/assets/project-setting/Close_round.png"
						style="width: 1.5rem"
						class="fill-green-500"
					/>
					<span class="tracking-1px">取消</span>
				</Button>
			</Dialog>
			<div class="bigRedDivider !mt-50px"></div>
			<div class="flex text-xl mt-20px">
				<div>待審核 3位</div>
				<Divider layout="vertical" class="!ml-30px" />
				<div class="!ml-30px">錄取二階 32位</div>
				<Divider layout="vertical" class="!ml-30px" />
				<div class="!ml-30px">逕取 1位</div>
				<Divider layout="vertical" class="!ml-30px" />
				<div class="!ml-30px">不錄取 1位</div>
				<Button
					class="w-140px h-44px !ml-500px p-button-outlined p-button-help"
				>
					<img
						alt="logo"
						src="/assets/gradeDataList/Paper.png"
						style="width: 1.5rem"
						class="fill-green-500"
					/>
					<span class="tracking-1px">報表列印</span>
				</Button>
			</div>
		</div>
		<div v-if="currentTab === '第二階段 (口試審查)'">
			<DataTable
				:value="phase2_list"
				responsiveLayout="scroll"
				dataKey="id"
				:scrollable="true"
				scrollHeight="700px"
			>
				<Column field="oral_order" header="口試順序"></Column>
				<Column field="id" header="帳戶 ID"></Column>
				<Column field="name" header="申請人姓名"></Column>
				<Column field="score" header="書審/口試分數"></Column>
				<Column field="final_result" header="最終審查結果"></Column>
				<Column :exportable="false" style="min-width: 8rem">
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
				header="評分資料編輯"
				:modal="true"
				class="w-720px h-988px"
			>
				<Divider></Divider>
				<div class="flex mt-24px">
					<div class="text-lg">帳號 ID :</div>
					<div class="text-lg ml-266px">帳號名稱 :</div>
				</div>
				<div class="flex mt-18.5px">
					<div>
						{{ id }}
					</div>
					<div class="text-base ml-300px">
						{{ name }}
					</div>
				</div>
				<SelectButton
					v-if="disable1"
					class="h-39px mt-32px !w-664px"
					v-model="dialogCurrentTab"
					:options="dialogTabOptions"
				/>
				<SelectButton
					v-else
					class="h-39px mt-32px !w-664px"
					v-model="dialogCurrentTab"
					:options="dialogTabOptions"
					disabled
				/>
				<DataTable
					:value="scores"
					responsiveLayout="scroll"
					dataKey="id"
					class="text-base mt-24px"
				>
					<Column field="name" header="審查委員"></Column>
					<Column
						field="access"
						header="逕取"
						dataType="boolean"
						bodyClass="text-center"
						style="min-width: 8rem"
					>
						<template #body="slotProps">
							<i
								v-if="slotProps.data.access"
								class="pi pi-check"
							></i>
							<p v-else>-</p>
						</template>
					</Column>
					<Column field="score_1" header="學習歷程"></Column>
					<Column field="score_2" header="發展潛能"></Column>
					<Column field="score_3" header="學習潛力"></Column>
				</DataTable>
				<div class="flex mt-20px ml-5px">
					<div>平均分數</div>
					<div class="ml-240px">80</div>
					<div class="ml-107px">70</div>
					<div class="ml-107px">66.6</div>
				</div>
				<div class="flex mt-52px ml-53px">
					<div>
						<div>一階審查結果</div>
						<Dropdown
							v-model="p1_result"
							:options="p1_result_option"
							class="w-228px h-44px mt-8px"
						/>
					</div>
					<div class="ml-120px">
						<div>口試順序</div>
						<InputText
							v-if="disable1"
							type="text"
							v-model="oral_order"
							class="w-148px h-44px mt-8px"
						/>
						<InputText
							v-else
							type="text"
							v-model="oral_order"
							disabled
							class="w-148px h-44px mt-8px"
						/>
					</div>
				</div>
				<div class="flex mt-32px ml-52px">
					<div>
						<div>二階審查結果</div>
						<Dropdown
							v-if="disable1"
							v-model="p2_result"
							:options="p2_result_option"
							class="w-228px h-44px mt-8px"
						/>
						<Dropdown
							v-else
							v-model="p2_result"
							:options="p2_result_option"
							disabled
							class="w-228px h-44px mt-8px"
						/>
					</div>
					<div class="ml-120px">
						<div>錄取順序</div>
						<InputText
							v-if="disable1"
							type="text"
							v-model="oral_order"
							class="w-148px h-44px mt-8px"
						/>
						<InputText
							v-else-if="!disable1"
							type="text"
							v-model="oral_order"
							disabled
							class="w-148px h-44px mt-8px"
						/>
					</div>
				</div>
				<Button
					class="w-140px h-44px !mt-40px !ml-200px p-button-outlined p-button-success"
					@click="doneEdit"
				>
					<img
						alt="logo"
						src="/assets/gradeDataList/Done_round.png"
						style="width: 1.5rem"
						class="fill-green-500"
					/>
					<span class="tracking-1px">儲存變更</span>
				</Button>
				<Button
					class="w-100px h-44px !mt-40px !ml-49px p-button-outlined p-button-danger"
					@click="doneEdit"
				>
					<img
						alt="logo"
						src="/assets/project-setting/Close_round.png"
						style="width: 1.5rem"
						class="fill-green-500"
					/>
					<span class="tracking-1px">取消</span>
				</Button>
			</Dialog>
			<div class="bigRedDivider !mt-50px"></div>
			<div class="flex text-xl mt-20px">
				<div>待審核 3位</div>
				<Divider layout="vertical" class="!ml-30px" />
				<div class="!ml-30px">錄取二階 32位</div>
				<Divider layout="vertical" class="!ml-30px" />
				<div class="!ml-30px">逕取 1位</div>
				<Divider layout="vertical" class="!ml-30px" />
				<div class="!ml-30px">不錄取 1位</div>
				<Button
					class="w-212px h-44px !ml-256px p-button-outlined p-button-help"
				>
					<img
						alt="logo"
						src="/assets/gradeDataList/Sort_arrow.png"
						style="width: 1.5rem"
						class="fill-green-500"
					/>
					<span class="tracking-1px">依口試順序重排</span>
				</Button>
				<Button
					class="w-140px h-44px !ml-32px p-button-outlined p-button-help"
				>
					<img
						alt="logo"
						src="/assets/gradeDataList/Paper.png"
						style="width: 1.5rem"
						class="fill-green-500"
					/>
					<span class="tracking-1px">報表列印</span>
				</Button>
			</div>
		</div>
		<div v-if="currentTab === '錄取名單'">
			<DataTable
				:value="final_list"
				responsiveLayout="scroll"
				dataKey="id"
				:scrollable="true"
				scrollHeight="700px"
			>
				<Column field="final_result" header="審查結果"></Column>
				<Column field="admission_order" header="錄取順序"></Column>
				<Column field="id" header="帳戶 ID"></Column>
				<Column field="name" header="申請人姓名"></Column>
				<Column field="score" header="書審/口試分數"></Column>
				<Column :exportable="false" style="min-width: 8rem">
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
				header="評分資料編輯"
				:modal="true"
				class="w-720px h-988px"
			>
				<Divider></Divider>
				<div class="flex mt-24px">
					<div class="text-lg">帳號 ID :</div>
					<div class="text-lg ml-266px">帳號名稱 :</div>
				</div>
				<div class="flex mt-18.5px">
					<div>
						{{ id }}
					</div>
					<div class="text-base ml-300px">
						{{ name }}
					</div>
				</div>
				<SelectButton
					v-if="disable1"
					class="h-39px mt-32px !w-664px"
					v-model="dialogCurrentTab"
					:options="dialogTabOptions"
				/>
				<SelectButton
					v-else
					class="h-39px mt-32px !w-664px"
					v-model="dialogCurrentTab"
					:options="dialogTabOptions"
					disabled
				/>
				<DataTable
					:value="scores"
					responsiveLayout="scroll"
					dataKey="id"
					class="text-base mt-24px"
				>
					<Column field="name" header="審查委員"></Column>
					<Column
						field="access"
						header="逕取"
						dataType="boolean"
						bodyClass="text-center"
						style="min-width: 8rem"
					>
						<template #body="slotProps">
							<i
								v-if="slotProps.data.access"
								class="pi pi-check"
							></i>
							<p v-else>-</p>
						</template>
					</Column>
					<Column field="score_1" header="學習歷程"></Column>
					<Column field="score_2" header="發展潛能"></Column>
					<Column field="score_3" header="學習潛力"></Column>
				</DataTable>
				<div class="flex mt-20px ml-5px">
					<div>平均分數</div>
					<div class="ml-240px">80</div>
					<div class="ml-107px">70</div>
					<div class="ml-107px">66.6</div>
				</div>
				<div class="flex mt-52px ml-53px">
					<div>
						<div>一階審查結果</div>
						<Dropdown
							v-model="p1_result"
							:options="p1_result_option"
							class="w-228px h-44px mt-8px"
						/>
					</div>
					<div class="ml-120px">
						<div>口試順序</div>
						<InputText
							v-if="disable1"
							type="text"
							v-model="oral_order"
							class="w-148px h-44px mt-8px"
						/>
						<InputText
							v-else
							type="text"
							v-model="oral_order"
							disabled
							class="w-148px h-44px mt-8px"
						/>
					</div>
				</div>
				<div class="flex mt-32px ml-52px">
					<div>
						<div>二階審查結果</div>
						<Dropdown
							v-if="disable1"
							v-model="p2_result"
							:options="p2_result_option"
							class="w-228px h-44px mt-8px"
						/>
						<Dropdown
							v-else
							v-model="p2_result"
							:options="p2_result_option"
							disabled
							class="w-228px h-44px mt-8px"
						/>
					</div>
					<div class="ml-120px">
						<div>錄取順序</div>
						<InputText
							v-if="disable1"
							type="text"
							v-model="oral_order"
							class="w-148px h-44px mt-8px"
						/>
						<InputText
							v-else-if="!disable1"
							type="text"
							v-model="oral_order"
							disabled
							class="w-148px h-44px mt-8px"
						/>
					</div>
				</div>
				<Button
					class="w-140px h-44px !mt-40px !ml-200px p-button-outlined p-button-success"
					@click="doneEdit"
				>
					<img
						alt="logo"
						src="/assets/gradeDataList/Done_round.png"
						style="width: 1.5rem"
						class="fill-green-500"
					/>
					<span class="tracking-1px">儲存變更</span>
				</Button>
				<Button
					class="w-100px h-44px !mt-40px !ml-49px p-button-outlined p-button-danger"
					@click="doneEdit"
				>
					<img
						alt="logo"
						src="/assets/project-setting/Close_round.png"
						style="width: 1.5rem"
						class="fill-green-500"
					/>
					<span class="tracking-1px">取消</span>
				</Button>
			</Dialog>
			<div class="bigRedDivider !mt-50px"></div>
			<div class="flex text-xl mt-20px">
				<Button
					class="w-212px h-44px !ml-430px p-button-outlined p-button-help"
				>
					<img
						alt="logo"
						src="/assets/gradeDataList/Sort_arrow.png"
						style="width: 1.5rem"
						class="fill-green-500"
					/>
					<span class="tracking-1px">依錄取順序重排</span>
				</Button>
				<Button
					class="w-140px h-44px !ml-32px p-button-outlined p-button-help"
				>
					<img
						alt="logo"
						src="/assets/gradeDataList/Paper.png"
						style="width: 1.5rem"
						class="fill-green-500"
					/>
					<span class="tracking-1px">報表列印</span>
				</Button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import "@/styles/customize.css";
import "primeicons/primeicons.css";
import SelectButton from "primevue/selectbutton";
import { ref } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import Divider from "primevue/divider";
import Dropdown from "primevue/dropdown";
import InputText from "primevue/inputtext";

const phase1_list = ref([
	{
		id: "1000",
		name: "Aaa",
		book_review_score: 80,
		access: false,
		phase1_result: "待審核",
	},
	{
		id: "1001",
		name: "Bbb",
		book_review_score: 70,
		access: false,
		phase1_result: "進赴二階",
	},
	{
		id: "1002",
		name: "Ccc",
		book_review_score: 60,
		access: true,
		phase1_result: "逕取",
	},
	{
		id: "1003",
		name: "Ddd",
		book_review_score: 50,
		access: false,
		phase1_result: "待審核",
	},
	{
		id: "1004",
		name: "Eee",
		book_review_score: 40,
		access: false,
		phase1_result: "不通過",
	},
	{
		id: "1005",
		name: "Fff",
		book_review_score: 30,
		access: false,
		phase1_result: "進赴二階",
	},
	{
		id: "1006",
		name: "Ggg",
		book_review_score: 20,
		access: false,
		phase1_result: "不通過",
	},
	{
		id: "1007",
		name: "Ggg",
		book_review_score: 20,
		access: false,
		phase1_result: "不通過",
	},
	{
		id: "1008",
		name: "Ggg",
		book_review_score: 20,
		access: false,
		phase1_result: "不通過",
	},
	{
		id: "1009",
		name: "Ggg",
		book_review_score: 20,
		access: false,
		phase1_result: "不通過",
	},
]);
// phase1_list.value[phase1_list.value.findIndex((obj => obj.id == "1000"))].name = "abc"

const scores = ref([
	{
		name: "Mike",
		access: false,
		score_1: "85",
		score_2: "70",
		score_3: "60",
	},
	{
		name: "Amber",
		access: false,
		score_1: "90",
		score_2: "65",
		score_3: "60",
	},
	{ name: "John", access: true, score_1: "-", score_2: "-", score_3: "-" },
	{
		name: "Peter",
		access: false,
		score_1: "65",
		score_2: "75",
		score_3: "80",
	},
]);

const currentTab = ref("第一階段 (書面審查)");
const tabOptions = ref([
	"第一階段 (書面審查)",
	"第二階段 (口試審查)",
	"錄取名單",
]);
const dialogCurrentTab = ref("第一階段 (書面審查)");
const dialogTabOptions = ref(["第一階段 (書面審查)", "第二階段 (口試審查)"]);
const productDialog = ref(false);
const name = ref("");
const id = ref("");
const p1_result = ref("");
const p1_result_option = ref(["待審核", "不通過", "進赴二階", "逕取"]);
const p2_result = ref("正取");
const p2_result_option = ref(["待審核", "正取", "備取", "不錄取"]);
const oral_order = ref();
const disable1 = ref<boolean>(p1_result.value === "進赴二階");

const phase2_list = ref([
	{
		oral_order: "1",
		id: "1000",
		name: "Aaa",
		score: "85/70",
		final_result: "正取",
	},
	{
		oral_order: "2",
		id: "1001",
		name: "Bbb",
		score: "73/90",
		final_result: "備取",
	},
	{
		oral_order: "3",
		id: "1002",
		name: "Ccc",
		score: "82/77",
		final_result: "正取",
	},
	{
		oral_order: "4",
		id: "1003",
		name: "Ddd",
		score: "77/60",
		final_result: "待審核",
	},
	{
		oral_order: "X",
		id: "1004",
		name: "Eee",
		score: "逕取通過",
		final_result: "正取",
	},
	{
		oral_order: "X",
		id: "1005",
		name: "Fff",
		score: "59/書審未過",
		final_result: "不錄取",
	},
	{
		oral_order: "X",
		id: "1006",
		name: "Ggg",
		score: "65/書審未過",
		final_result: "不錄取",
	},
	{
		oral_order: "X",
		id: "1007",
		name: "Ggg",
		score: "65/書審未過",
		final_result: "不錄取",
	},
	{
		oral_order: "X",
		id: "1008",
		name: "Ggg",
		score: "65/書審未過",
		final_result: "不錄取",
	},
	{
		oral_order: "X",
		id: "1009",
		name: "Ggg",
		score: "65/書審未過",
		final_result: "不錄取",
	},
]);

const final_list = ref([
	{
		admission_order: "1",
		id: "1000",
		name: "Aaa",
		score: "85/70",
		final_result: "正取",
	},
	{
		admission_order: "2",
		id: "1001",
		name: "Bbb",
		score: "73/90",
		final_result: "備取",
	},
	{
		admission_order: "3",
		id: "1002",
		name: "Ccc",
		score: "82/77",
		final_result: "正取",
	},
	{
		admission_order: "4",
		id: "1003",
		name: "Ddd",
		score: "77/60",
		final_result: "待審核",
	},
	{
		admission_order: "X",
		id: "1004",
		name: "Eee",
		score: "逕取通過",
		final_result: "正取",
	},
	{
		admission_order: "X",
		id: "1005",
		name: "Fff",
		score: "59/書審未過",
		final_result: "不錄取",
	},
	{
		admission_order: "X",
		id: "1006",
		name: "Ggg",
		score: "65/書審未過",
		final_result: "不錄取",
	},
	{
		admission_order: "X",
		id: "1007",
		name: "Ggg",
		score: "65/書審未過",
		final_result: "不錄取",
	},
	{
		admission_order: "X",
		id: "1008",
		name: "Ggg",
		score: "65/書審未過",
		final_result: "不錄取",
	},
	{
		admission_order: "X",
		id: "1009",
		name: "Ggg",
		score: "65/書審未過",
		final_result: "不錄取",
	},
]);

const editProduct = (prod: any) => {
	console.log(prod.data.id);
	name.value = prod.data.name;
	id.value = prod.data.id;
	productDialog.value = true;
	p1_result.value = prod.data.phase1_result;
	disable1.value = p1_result.value === "進赴二階";
};

function doneEdit() {
	phase1_list.value[
		phase1_list.value.findIndex((obj) => obj.id == id.value)
	].phase1_result = p1_result.value;
	productDialog.value = false;
}
</script>
