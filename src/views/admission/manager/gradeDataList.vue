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
		<div v-if="currentTab === translation.phase1">
			<DataTable
				:value="phase1_list"
				responsiveLayout="scroll"
				dataKey="id"
				:scrollable="true"
				scrollHeight="700px"
			>
				<Column field="id" :header="ID"></Column>
				<Column field="name" :header="applicantName"></Column>
				<Column
					field="book_review_score"
					:header="reviewerGrade"
				></Column>
				<Column
					field="access"
					:header="directedAdmitted"
					dataType="boolean"
					bodyClass="text-center"
					style="min-width: 8rem"
				>
					<template #body="slotProps">
						<i v-if="slotProps.data.access" class="pi pi-check"></i>
						<p v-else>-</p>
					</template>
				</Column>
				<Column field="phase1_result" :header="phaseResult"></Column>
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
				:header="gradeDataEdit"
				:modal="true"
				class="w-720px h-988px"
			>
				<Divider></Divider>
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
					v-if="dialogCurrentTab === translation.phase1"
					:value="scores"
					responsiveLayout="scroll"
					dataKey="id"
					class="text-base mt-24px"
				>
					<Column field="name" :header="reviewer"></Column>
					<Column
						field="access"
						:header="directedAdmitted"
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
					<Column field="score_1" :header="learningEx"></Column>
					<Column field="score_2" :header="devPotential"></Column>
					<Column field="score_3" :header="learnPotential"></Column>
				</DataTable>
				<DataTable
					v-if="dialogCurrentTab === translation.phase2"
					:value="scores"
					responsiveLayout="scroll"
					dataKey="id"
					class="text-base mt-24px"
				>
					<Column field="name" :header="reviewer"></Column>
					<Column field="score_1" :header="gradeItem1"></Column>
					<Column field="score_2" :header="gradeItem2"></Column>
					<Column field="score_3" :header="gradeItem3"></Column>
				</DataTable>
				<div
					v-if="dialogCurrentTab === translation.phase1"
					class="flex mt-20px ml-5px"
				>
					<div>{{ $t("平均分數") }}</div>
					<div class="ml-240px">80</div>
					<div class="ml-107px">70</div>
					<div class="ml-107px">66.6</div>
				</div>
				<div
					v-if="dialogCurrentTab === translation.phase2"
					class="flex mt-20px ml-5px"
				>
					<div>{{ $t("平均分數") }}</div>
					<div class="ml-95px">80</div>
					<div class="ml-155px">70</div>
					<div class="ml-155px">66.6</div>
				</div>
				<div class="flex mt-52px ml-53px">
					<div>
						<div>{{ $t("一階審查結果") }}</div>
						<Dropdown
							v-model="p1_result"
							:options="p1_result_option"
							class="w-228px h-44px mt-8px"
						/>
					</div>
					<div class="ml-120px">
						<div>{{ $t("口試順序") }}</div>
						<InputText
							v-if="disable1"
							type="text"
							v-model="oral_order"
							class="w-148px h-44px !mt-8px"
						/>
						<InputText
							v-else
							type="text"
							v-model="oral_order"
							disabled
							class="w-148px h-44px !mt-8px"
						/>
					</div>
				</div>
				<div class="flex mt-32px ml-52px">
					<div>
						<div>{{ $t("二階審查結果") }}</div>
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
						<div>{{ $t("錄取順序") }}</div>
						<InputText
							v-if="disable1"
							type="text"
							v-model="admitted_order"
							class="w-148px h-44px !mt-8px"
						/>
						<InputText
							v-else-if="!disable1"
							type="text"
							v-model="admitted_order"
							disabled
							class="w-148px h-44px !mt-8px"
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
					<span class="tracking-1px">{{ $t("儲存變更") }}</span>
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
					<span class="tracking-1px">{{ $t("取消") }}</span>
				</Button>
			</Dialog>
			<div class="bigRedDivider !mt-50px"></div>
			<div class="flex text-xl mt-20px">
				<div>{{ $t("待審核") }} 3 {{ $t("位") }}</div>
				<Divider layout="vertical" class="!ml-30px" />
				<div class="!ml-30px">
					{{ $t("進赴二階") }} 32 {{ $t("位") }}
				</div>
				<Divider layout="vertical" class="!ml-30px" />
				<div class="!ml-30px">{{ $t("逕取") }} 1 {{ $t("位") }}</div>
				<Divider layout="vertical" class="!ml-30px" />
				<div class="!ml-30px">{{ $t("不錄取") }} 1 {{ $t("位") }}</div>
				<Button
					class="w-140px h-44px !ml-500px p-button-outlined p-button-help"
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
		<div v-if="currentTab === translation.phase2">
			<DataTable
				:value="phase2_list"
				responsiveLayout="scroll"
				dataKey="id"
				:scrollable="true"
				scrollHeight="700px"
			>
				<Column field="oral_order" :header="oralOrder"></Column>
				<Column field="id" :header="ID"></Column>
				<Column field="name" :header="applicantName"></Column>
				<Column field="score" :header="woScore"></Column>
				<Column field="final_result" :header="finalResult"></Column>
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
					<Column field="name" :header="reviewer"></Column>
					<Column
						field="access"
						:header="translation.derectlyAdmitted"
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
					<Column field="score_1" :header="learningEx"></Column>
					<Column field="score_2" :header="devPotential"></Column>
					<Column field="score_3" :header="learnPotential"></Column>
				</DataTable>
				<div
					v-if="dialogCurrentTab === translation.phase1"
					class="flex mt-20px ml-5px"
				>
					<div>{{ $t("平均分數") }}</div>
					<div class="ml-240px">80</div>
					<div class="ml-107px">70</div>
					<div class="ml-107px">66.6</div>
				</div>
				<div
					v-if="dialogCurrentTab === translation.phase2"
					class="flex mt-20px ml-5px"
				>
					<div>{{ $t("平均分數") }}</div>
					<div class="ml-95px">80</div>
					<div class="ml-155px">70</div>
					<div class="ml-155px">66.6</div>
				</div>
				<div class="flex mt-52px ml-53px">
					<div>
						<div>{{ $t("一階審查結果") }}</div>
						<Dropdown
							v-model="p1_result"
							:options="p1_result_option"
							class="w-228px h-44px mt-8px"
						/>
					</div>
					<div class="ml-120px">
						<div>{{ $t("口試順序") }}</div>
						<InputText
							v-if="disable1"
							type="text"
							v-model="oral_order"
							class="w-148px h-44px !mt-8px"
						/>
						<InputText
							v-else
							type="text"
							v-model="oral_order"
							disabled
							class="w-148px h-44px !mt-8px"
						/>
					</div>
				</div>
				<div class="flex mt-32px ml-52px">
					<div>
						<div>{{ $t("二階審查結果") }}</div>
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
						<div>{{ $t("錄取順序") }}</div>
						<InputText
							v-if="disable1"
							type="text"
							v-model="admitted_order"
							class="w-148px h-44px !mt-8px"
						/>
						<InputText
							v-else-if="!disable1"
							type="text"
							v-model="admitted_order"
							disabled
							class="w-148px h-44px !mt-8px"
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
					<span class="tracking-1px">{{ $t("儲存變更") }}</span>
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
					<span class="tracking-1px">{{ $t("取消") }}</span>
				</Button>
			</Dialog>
			<div class="bigRedDivider !mt-50px"></div>
			<div class="flex text-xl mt-20px">
				<div>{{ $t("待審核") }} 3 {{ $t("位") }}</div>
				<Divider layout="vertical" class="!ml-30px" />
				<div class="!ml-30px">
					{{ $t("進赴二階") }} 32 {{ $t("位") }}
				</div>
				<Divider layout="vertical" class="!ml-30px" />
				<div class="!ml-30px">{{ $t("逕取") }} 1 {{ $t("位") }}</div>
				<Divider layout="vertical" class="!ml-30px" />
				<div class="!ml-30px">{{ $t("不錄取") }} 1 {{ $t("位") }}</div>
				<Button
					class="w-212px h-44px !ml-256px p-button-outlined p-button-help"
				>
					<img
						alt="logo"
						src="/assets/gradeDataList/Sort_arrow.png"
						style="width: 1.5rem"
						class="fill-green-500"
					/>
					<span class="tracking-1px">{{ $t("依口試順序重排") }}</span>
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
					<span class="tracking-1px">{{ $t("報表列印") }}</span>
				</Button>
			</div>
		</div>
		<div v-if="currentTab === translation.admissionList">
			<DataTable
				:value="final_list"
				responsiveLayout="scroll"
				dataKey="id"
				:scrollable="true"
				scrollHeight="700px"
			>
				<Column field="final_result" :header="reviewResult"></Column>
				<Column
					field="admission_order"
					:header="admissionOrder"
				></Column>
				<Column field="id" :header="ID"></Column>
				<Column field="name" :header="applicantName"></Column>
				<Column field="score" :header="woScore"></Column>
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
				:header="gradeDataEdit"
				:modal="true"
				class="w-720px h-988px"
			>
				<Divider></Divider>
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
					<Column field="name" :header="reviewer"></Column>
					<Column
						field="access"
						:header="translation.derectlyAdmitted"
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
					<Column field="score_1" :header="learningEx"></Column>
					<Column field="score_2" :header="devPotential"></Column>
					<Column field="score_3" :header="learnPotential"></Column>
				</DataTable>
				<div
					v-if="dialogCurrentTab === translation.phase1"
					class="flex mt-20px ml-5px"
				>
					<div>{{ $t("平均分數") }}</div>
					<div class="ml-240px">80</div>
					<div class="ml-107px">70</div>
					<div class="ml-107px">66.6</div>
				</div>
				<div
					v-if="dialogCurrentTab === translation.phase2"
					class="flex mt-20px ml-5px"
				>
					<div>{{ $t("平均分數") }}</div>
					<div class="ml-95px">80</div>
					<div class="ml-155px">70</div>
					<div class="ml-155px">66.6</div>
				</div>
				<div class="flex mt-52px ml-53px">
					<div>
						<div>{{ $t("一階審查結果") }}</div>
						<Dropdown
							v-model="p1_result"
							:options="p1_result_option"
							class="w-228px h-44px mt-8px"
						/>
					</div>
					<div class="ml-120px">
						<div>{{ $t("口試順序") }}</div>
						<InputText
							v-if="disable1"
							type="text"
							v-model="oral_order"
							class="w-148px h-44px !mt-8px"
						/>
						<InputText
							v-else
							type="text"
							v-model="oral_order"
							disabled
							class="w-148px h-44px !mt-8px"
						/>
					</div>
				</div>
				<div class="flex mt-32px ml-52px">
					<div>
						<div>{{ $t("二階審查結果") }}</div>
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
						<div>{{ $t("錄取順序") }}</div>
						<InputText
							v-if="disable1"
							type="text"
							v-model="admitted_order"
							class="w-148px h-44px !mt-8px"
						/>
						<InputText
							v-else-if="!disable1"
							type="text"
							v-model="admitted_order"
							disabled
							class="w-148px h-44px !mt-8px"
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
					<span class="tracking-1px">{{ $t("儲存變更") }}</span>
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
					<span class="tracking-1px">{{ $t("取消") }}</span>
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
					<span class="tracking-1px">{{ $t("依錄取順序重排") }}</span>
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
					<span class="tracking-1px">{{ $t("報表列印") }}</span>
				</Button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import "@/styles/customize.css";
import "primeicons/primeicons.css";
import SelectButton from "primevue/selectbutton";
import { computed, ref } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import Divider from "primevue/divider";
import Dropdown from "primevue/dropdown";
import InputText from "primevue/inputtext";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const translation = {
	phase1: t("第一階段 (書面審查)"),
	phase2: t("第二階段 (口試審查)"),
	admissionList: t("錄取名單"),
	pending: t("待審核"),
	notPass: t("不通過"),
	passtophase2: t("進赴二階"),
	admitted: t("正取"),
	alternate: t("備取"),
	notAdmitted: t("不錄取"),
	derectlyAdmitted: t("逕取"),
	derectlyAdmittedPass: t("逕取通過"),
	writtenReviewNotPass: t("書審未過"),
};

const phase1_list = ref([
	{
		id: "1000",
		name: "Aaa",
		book_review_score: 80,
		access: false,
		phase1_result: translation.pending,
	},
	{
		id: "1001",
		name: "Bbb",
		book_review_score: 70,
		access: false,
		phase1_result: translation.passtophase2,
	},
	{
		id: "1002",
		name: "Ccc",
		book_review_score: 60,
		access: true,
		phase1_result: translation.derectlyAdmitted,
	},
	{
		id: "1003",
		name: "Ddd",
		book_review_score: 50,
		access: false,
		phase1_result: translation.pending,
	},
	{
		id: "1004",
		name: "Eee",
		book_review_score: 40,
		access: false,
		phase1_result: translation.notPass,
	},
	{
		id: "1005",
		name: "Fff",
		book_review_score: 30,
		access: false,
		phase1_result: translation.passtophase2,
	},
	{
		id: "1006",
		name: "Ggg",
		book_review_score: 20,
		access: false,
		phase1_result: translation.notPass,
	},
	{
		id: "1007",
		name: "Ggg",
		book_review_score: 20,
		access: false,
		phase1_result: translation.notPass,
	},
	{
		id: "1008",
		name: "Ggg",
		book_review_score: 20,
		access: false,
		phase1_result: translation.notPass,
	},
	{
		id: "1009",
		name: "Ggg",
		book_review_score: 20,
		access: false,
		phase1_result: translation.notPass,
	},
]);

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
const currentTab = ref(translation.phase1);
const tabOptions = ref([
	translation.phase1,
	translation.phase2,
	translation.admissionList,
]);
const dialogCurrentTab = ref(translation.phase1);
const dialogTabOptions = ref([translation.phase1, translation.phase2]);
const productDialog = ref(false);
const name = ref("");
const id = ref("");
const p1_result = ref("");
const p1_result_option = ref([
	translation.pending,
	translation.notPass,
	translation.passtophase2,
	translation.derectlyAdmitted,
]);
const p2_result = ref(translation.admitted);
const p2_result_option = ref([
	translation.pending,
	translation.admitted,
	translation.alternate,
	translation.notAdmitted,
]);
const oral_order = ref();
const admitted_order = ref();
const disable1 = computed(() => {
	return p1_result.value === translation.passtophase2;
});
const phase2_list = ref([
	{
		oral_order: "1",
		id: "1000",
		name: "Aaa",
		score: "85/70",
		final_result: translation.admitted,
	},
	{
		oral_order: "2",
		id: "1001",
		name: "Bbb",
		score: "73/90",
		final_result: translation.alternate,
	},
	{
		oral_order: "3",
		id: "1002",
		name: "Ccc",
		score: "82/77",
		final_result: translation.admitted,
	},
	{
		oral_order: "4",
		id: "1003",
		name: "Ddd",
		score: "77/60",
		final_result: translation.pending,
	},
	{
		oral_order: "X",
		id: "1004",
		name: "Eee",
		score: translation.derectlyAdmittedPass,
		final_result: translation.admitted,
	},
	{
		oral_order: "X",
		id: "1005",
		name: "Fff",
		score: "59/" + translation.writtenReviewNotPass,
		final_result: translation.notAdmitted,
	},
	{
		oral_order: "X",
		id: "1006",
		name: "Ggg",
		score: "65/" + translation.writtenReviewNotPass,
		final_result: translation.notAdmitted,
	},
	{
		oral_order: "X",
		id: "1007",
		name: "Ggg",
		score: "65/" + translation.writtenReviewNotPass,
		final_result: translation.notAdmitted,
	},
	{
		oral_order: "X",
		id: "1008",
		name: "Ggg",
		score: "65/" + translation.writtenReviewNotPass,
		final_result: translation.notAdmitted,
	},
	{
		oral_order: "X",
		id: "1009",
		name: "Ggg",
		score: "65/" + translation.writtenReviewNotPass,
		final_result: translation.notAdmitted,
	},
]);

const final_list = ref([
	{
		admission_order: "1",
		id: "1000",
		name: "Aaa",
		score: "85/70",
		final_result: translation.admitted,
	},
	{
		admission_order: "2",
		id: "1001",
		name: "Bbb",
		score: "73/90",
		final_result: translation.alternate,
	},
	{
		admission_order: "3",
		id: "1002",
		name: "Ccc",
		score: "82/77",
		final_result: translation.admitted,
	},
	{
		admission_order: "4",
		id: "1003",
		name: "Ddd",
		score: "77/60",
		final_result: translation.pending,
	},
	{
		admission_order: "X",
		id: "1004",
		name: "Eee",
		score: translation.derectlyAdmittedPass,
		final_result: translation.admitted,
	},
	{
		admission_order: "X",
		id: "1005",
		name: "Fff",
		score: "59/" + translation.writtenReviewNotPass,
		final_result: translation.notAdmitted,
	},
	{
		admission_order: "X",
		id: "1006",
		name: "Ggg",
		score: "65/" + translation.writtenReviewNotPass,
		final_result: translation.notAdmitted,
	},
	{
		admission_order: "X",
		id: "1007",
		name: "Ggg",
		score: "65/" + translation.writtenReviewNotPass,
		final_result: translation.notAdmitted,
	},
	{
		admission_order: "X",
		id: "1008",
		name: "Ggg",
		score: "65/" + translation.writtenReviewNotPass,
		final_result: translation.notAdmitted,
	},
	{
		admission_order: "X",
		id: "1009",
		name: "Ggg",
		score: "65/" + translation.writtenReviewNotPass,
		final_result: translation.notAdmitted,
	},
]);

const ID = computed(() => t("帳號ID"));
const applicantName = computed(() => t("申請人姓名"));
const reviewerGrade = computed(() => t("書審分數"));
const phaseResult = computed(() => t("階段審核結果"));
const directedAdmitted = computed(() => t("逕取"));
const gradeDataEdit = computed(() => t("評分資料編輯"));
const reviewer = computed(() => t("審查委員"));
const learningEx = computed(() => t("學習歷程"));
const devPotential = computed(() => t("發展潛能"));
const learnPotential = computed(() => t("學習潛力"));
const gradeItem1 = computed(() => t("評分項目一"));
const gradeItem2 = computed(() => t("評分項目二"));
const gradeItem3 = computed(() => t("評分項目三"));
const oralOrder = computed(() => t("口試順序"));
const woScore = computed(() => t("書審/口試分數"));
const finalResult = computed(() => t("最終審查結果"));
const reviewResult = computed(() => t("審查結果"));
const admissionOrder = computed(() => t("錄取順序"));

const editProduct = (prod: any) => {
	name.value = prod.data.name;
	id.value = prod.data.id;
	productDialog.value = true;
	p1_result.value = prod.data.phase1_result;
	if (prod.data.final_result) {
		p1_result.value = translation.passtophase2;
		p2_result.value = prod.data.final_result;
	}
};

function doneEdit() {
	phase1_list.value[
		phase1_list.value.findIndex((obj) => obj.id == id.value)
	].phase1_result = p1_result.value;
	productDialog.value = false;
}
</script>
