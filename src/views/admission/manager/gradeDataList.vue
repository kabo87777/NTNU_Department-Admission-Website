<template>
	<div class="ml-128px mr-128px mt-62px">
		<h1 class="text-4xl text-bold tracking-widest">
			{{ $t("評分資料列表") }}
		</h1>
		<div class="bigRedDivider"></div>
		<div class="p-fluid">
			<SelectButton
				class="mt-20px h-45px !w-1280px"
				v-model="currentTab"
				:options="tabOptions"
				aria-labelledby="single"
			/>
		</div>
		<div v-if="currentTab === translation.phase1">
			<DataTable
				:value="applicantDocsGradeList.data.value"
				responsiveLayout="scroll"
				dataKey="id"
				:scrollable="true"
				scrollHeight="700px"
				class="p-datatable-lg !h-700px"
			>
				<Column field="id" :header="ID"></Column>
				<Column field="name" :header="applicantName"></Column>
				<Column field="grades" :header="reviewerGrade"></Column>
				<Column
					field="isImmediateEnroll"
					:header="directedAdmitted"
					dataType="boolean"
					bodyClass="text-center"
					style="min-width: 8rem"
				>
					<template #body="slotProps">
						<i
							v-if="slotProps.data.isImmediateEnroll"
							class="pi pi-check"
						></i>
						<p v-else>-</p>
					</template>
				</Column>
				<Column field="application_stage" :header="phaseResult">
				</Column>
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
				<div class="p-fluid">
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
				</div>
				<DataTable
					v-if="dialogCurrentTab === translation.phase1"
					:value="docsReviewerScore"
					responsiveLayout="scroll"
					dataKey="id"
					class="text-base mt-24px !h-286px"
				>
					<Column field="name" :header="reviewer"></Column>
					<Column
						field="isimmendiateenroll"
						:header="directedAdmitted"
						dataType="boolean"
						bodyClass="text-center"
						style="min-width: 8rem"
					>
						<template #body="slotProps">
							<i
								v-if="slotProps.data.isimmendiateenroll"
								class="pi pi-check"
							></i>
							<p v-else>-</p>
						</template>
					</Column>
					<Column field="grades" :header="totalScore"></Column>
				</DataTable>
				<DataTable
					v-if="dialogCurrentTab === translation.phase2"
					:value="oralReviewerScore"
					responsiveLayout="scroll"
					dataKey="id"
					class="text-base mt-24px !h-286px"
				>
					<Column field="name" :header="reviewer"></Column>
					<Column field="grades" :header="totalScore"></Column>
				</DataTable>
				<div
					v-if="dialogCurrentTab === translation.phase1"
					class="flex mt-20px ml-15px"
				>
					<div>{{ $t("平均分數") }}</div>
					<div class="ml-330px">{{ docsAverageGrade }}</div>
				</div>
				<div
					v-if="dialogCurrentTab === translation.phase2"
					class="flex mt-20px ml-15px"
				>
					<div>{{ $t("平均分數") }}</div>
					<div class="ml-188px">{{ oralAverageGrade }}</div>
				</div>
				<div class="flex mt-100px ml-53px" v-if="disable2">
					<div>
						<div>{{ $t("一階審查結果") }}</div>
						<Dropdown
							v-if="disable"
							v-model="p1_result"
							:options="p1_result_option"
							class="w-228px h-44px mt-8px"
						/>
						<Dropdown
							v-else
							v-model="p1_result"
							:options="p1_result_option"
							disabled
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
				<div class="flex mt-100px ml-52px" v-else>
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
					class="w-140px h-44px !mt-100px !ml-200px p-button-outlined p-button-success"
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
					@click="cancelEdit"
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
			<div class="bigRedDivider !mt-30px"></div>
			<div class="flex text-xl mt-20px">
				<div>
					{{ $t("待審核") }} {{ docsStage1Count }} {{ $t("位") }}
				</div>
				<Divider layout="vertical" class="!ml-30px" />
				<div class="!ml-30px">
					{{ $t("進赴二階") }} {{ docsStage2Count }} {{ $t("位") }}
				</div>
				<Divider layout="vertical" class="!ml-30px" />
				<div class="!ml-30px">
					{{ $t("逕取") }} {{ docsStage3Count }} {{ $t("位") }}
				</div>
				<Divider layout="vertical" class="!ml-30px" />
				<div class="!ml-30px">
					{{ $t("不通過") }} {{ docsStage4Count }} {{ $t("位") }}
				</div>
				<Divider layout="vertical" class="!ml-30px" />
				<div class="!ml-30px">
					{{ $t("未送審") }} {{ docsStage5Count }} {{ $t("位") }}
				</div>
				<Button
					class="w-140px h-44px !ml-299px p-button-outlined p-button-help"
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
				:value="oralGradeList"
				responsiveLayout="scroll"
				dataKey="id"
				:scrollable="true"
				scrollHeight="700px"
				@rowReorder="onRowReorder2"
				class="p-datatable-lg !h-700px"
				removableSort
			>
				<Column
					:rowReorder="true"
					headerStyle="width: 3rem"
					:reorderableColumn="false"
				/>
				<Column
					field="oral_order"
					:header="oralOrder"
					:sortable="true"
				></Column>
				<Column field="id" :header="ID"></Column>
				<Column field="name" :header="applicantName"></Column>
				<Column field="docs_grades" :header="docsScore"></Column>
				<Column field="oral_grades" :header="oralScore"></Column>
				<Column field="total_grades" :header="final_score"></Column>
				<Column field="enroll_stage" :header="finalResult">
					<template #body="slotProps">
						<i v-if="slotProps.data.enroll_stage === null">{{
							$t("待審核")
						}}</i>
						<p v-else>{{ slotProps.data.enroll_stage }}</p>
					</template>
				</Column>
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
				<div class="p-fluid">
					<SelectButton
						class="h-39px mt-32px !w-664px"
						v-model="dialogCurrentTab2"
						:options="dialogTabOptions"
					/>
				</div>
				<DataTable
					v-if="dialogCurrentTab2 === translation.phase1"
					:value="docsReviewerScore"
					responsiveLayout="scroll"
					dataKey="id"
					class="text-base mt-24px !h-286px"
				>
					<Column field="name" :header="reviewer"></Column>
					<Column
						field="isimmendiateenroll"
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
					<Column field="grades" :header="totalScore"></Column>
				</DataTable>
				<DataTable
					v-if="dialogCurrentTab2 === translation.phase2"
					:value="oralReviewerScore"
					responsiveLayout="scroll"
					dataKey="id"
					class="text-base mt-24px !h-286px"
				>
					<Column field="name" :header="reviewer"></Column>
					<Column field="grades" :header="totalScore"></Column>
				</DataTable>
				<div
					v-if="dialogCurrentTab2 === translation.phase1"
					class="flex mt-20px ml-15px"
				>
					<div>{{ $t("平均分數") }}</div>
					<div class="!ml-330px">{{ docsAverageGrade }}</div>
				</div>
				<div
					v-if="dialogCurrentTab2 === translation.phase2"
					class="flex mt-20px ml-15px"
				>
					<div>{{ $t("平均分數") }}</div>
					<div class="ml-188px">{{ oralAverageGrade }}</div>
				</div>
				<div class="flex mt-100px ml-53px" v-if="disable3">
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
				<div class="flex mt-100px ml-52px" v-else>
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
					class="w-140px h-44px !mt-100px !ml-200px p-button-outlined p-button-success"
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
					@click="cancelEdit"
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
			<div class="bigRedDivider !mt-30px"></div>
			<div class="flex text-xl mt-20px">
				<div>
					{{ $t("待審核") }} {{ oralStage1Count }} {{ $t("位") }}
				</div>
				<Divider layout="vertical" class="!ml-30px" />
				<div class="!ml-30px">
					{{ $t("正取") }} {{ oralStage2Count }} {{ $t("位") }}
				</div>
				<Divider layout="vertical" class="!ml-30px" />
				<div class="!ml-30px">
					{{ $t("備取") }} {{ oralStage3Count }} {{ $t("位") }}
				</div>
				<Divider layout="vertical" class="!ml-30px" />
				<div class="!ml-30px">
					{{ $t("不通過") }} {{ oralStage4Count }} {{ $t("位") }}
				</div>
				<Button
					class="w-140px h-44px !ml-360px p-button-outlined p-button-success"
					@click="saveOralOrder"
				>
					<img
						alt="logo"
						src="/assets/project-setting/Check_fill.png"
						style="width: 1.5rem"
						class="fill-green-500"
					/>
					<span class="tracking-1px">{{ $t("保存順序") }}</span>
				</Button>
				<Button
					class="w-140px h-44px !ml-20px p-button-outlined p-button-help"
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
				:value="admittedList"
				responsiveLayout="scroll"
				dataKey="id"
				:scrollable="true"
				scrollHeight="700px"
				@rowReorder="onRowReorder3"
				class="p-datatable-lg !h-700px"
				removableSort
			>
				<Column
					:rowReorder="true"
					headerStyle="width: 3rem"
					:reorderableColumn="false"
				/>
				<Column field="enroll_stage" :header="reviewResult">
					<template #body="slotProps">
						<i v-if="slotProps.data.enroll_stage === null">{{
							$t("待審核")
						}}</i>
						<p v-else>{{ slotProps.data.enroll_stage }}</p>
					</template>
				</Column>
				<Column
					field="enroll_order"
					:header="admissionOrder"
					:sortable="true"
				></Column>
				<Column field="id" :header="ID"></Column>
				<Column field="name" :header="applicantName"></Column>
				<Column field="docs_grades" :header="docsScore"></Column>
				<Column field="oral_grades" :header="oralScore"></Column>
				<Column field="total_grades" :header="final_score"></Column>
			</DataTable>
			<div class="bigRedDivider !mt-30px"></div>
			<div class="flex text-xl mt-20px">
				<Button
					class="w-140px h-44px !ml-470px p-button-outlined p-button-success"
					@click="saveEnrollOrder"
				>
					<img
						alt="logo"
						src="/assets/project-setting/Check_fill.png"
						style="width: 1.5rem"
						class="fill-green-500"
					/>
					<span class="tracking-1px">{{ $t("保存順序") }}</span>
				</Button>
				<Button
					class="w-140px h-44px !ml-30px p-button-outlined p-button-help"
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
		<div v-if="currentTab === translation.reserveList">
			<DataTable
				:value="reserveList"
				responsiveLayout="scroll"
				dataKey="id"
				:scrollable="true"
				scrollHeight="700px"
				@rowReorder="onRowReorder3"
				class="p-datatable-lg !h-700px"
				removableSort
			>
				<Column
					:rowReorder="true"
					headerStyle="width: 3rem"
					:reorderableColumn="false"
				/>
				<Column field="enroll_stage" :header="reviewResult">
					<template #body="slotProps">
						<i v-if="slotProps.data.enroll_stage === null">{{
							$t("待審核")
						}}</i>
						<p v-else>{{ slotProps.data.enroll_stage }}</p>
					</template>
				</Column>
				<Column
					field="enroll_order"
					:header="admissionOrder"
					:sortable="true"
				></Column>
				<Column field="id" :header="ID"></Column>
				<Column field="name" :header="applicantName"></Column>
				<Column field="docs_grades" :header="docsScore"></Column>
				<Column field="oral_grades" :header="oralScore"></Column>
				<Column field="total_grades" :header="final_score"></Column>
			</DataTable>
			<div class="bigRedDivider !mt-30px"></div>
			<div class="flex text-xl mt-20px">
				<Button
					class="w-140px h-44px !ml-470px p-button-outlined p-button-success"
					@click="saveReserveOrder"
				>
					<img
						alt="logo"
						src="/assets/project-setting/Check_fill.png"
						style="width: 1.5rem"
						class="fill-green-500"
					/>
					<span class="tracking-1px">{{ $t("保存順序") }}</span>
				</Button>
				<Button
					class="w-140px h-44px !ml-30px p-button-outlined p-button-help"
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
import { useRouter } from "vue-router";
import { useAdmissionAdminAuthStore } from "@/stores/universalAuth";
import { AdmissionAdminAPI } from "@/api/admission/admin/api";
import { useMutation, useQuery } from "@tanstack/vue-query";
import { InvalidSessionError } from "@/api/error";
import { useGlobalStore } from "@/stores/globalStore";
import { useToast } from "primevue/usetoast";
import { AdmissionAdminReviewerGradeResponse } from "@/api/admission/admin/types";
import { AdmissionAdminOralGradeListResponse } from "@/api/admission/admin/types";
import singleApplicantGradeVue from "@/components/singleApplicantGrade.vue";

const adminAuth = useAdmissionAdminAuthStore();
const api = new AdmissionAdminAPI(adminAuth);
const store = useGlobalStore();
const router = useRouter();

const docsStage1Count = ref(0);
const docsStage2Count = ref(0);
const docsStage3Count = ref(0);
const docsStage4Count = ref(0);
const docsStage5Count = ref(0);
const oralStage1Count = ref(0);
const oralStage2Count = ref(0);
const oralStage3Count = ref(0);
const oralStage4Count = ref(0);
const oralOrderList = ref<number[]>();
const admittedOrderList = ref<number[]>();
const reserveOrderList = ref<number[]>();
const oralGradeList = ref<AdmissionAdminOralGradeListResponse[]>();
const admittedList = ref();
const reserveList = ref();
const applicantDocsGradeList = useQuery(
	["admissionAdminDocsGradeList"],
	async () => {
		try {
			return await api.getDocsGradeList(store.program!.id!);
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
	},
	{
		onSuccess: (data) => {
			docsStage1Count.value = data!.filter(
				(item) => item.application_stage === null
			).length;
			docsStage2Count.value = data!.filter(
				(item) => item.application_stage === "進赴二階"
			).length;
			docsStage3Count.value = data!.filter(
				(item) => item.application_stage === "逕取"
			).length;
			docsStage4Count.value = data!.filter(
				(item) => item.application_stage === "不通過"
			).length;
			docsStage5Count.value = data!.filter(
				(item) => item.application_stage === "未送審"
			).length;
		},
	}
);
const applicantOralGradeList = useQuery(
	["admissionAdminOralGradeList"],
	async () => {
		try {
			return await api.getOralGradeList(store.program!.id!);
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
	},
	{
		onSuccess: (data) => {
			oralGradeList.value = data;
			oralStage1Count.value = data!.filter(
				(item) => item.enroll_stage === null
			).length;
			oralStage2Count.value = data!.filter(
				(item) => item.enroll_stage === "正取"
			).length;
			oralStage3Count.value = data!.filter(
				(item) => item.enroll_stage === "備取"
			).length;
			oralStage4Count.value = data!.filter(
				(item) => item.enroll_stage === "不通過"
			).length;
			oralOrderList.value = [];
			for (let i = 1; i <= data!.length; i++) {
				oralOrderList.value.push(i);
			}
			admittedList.value = data!.filter(
				(item) => item.enroll_stage === "正取"
			);
			admittedOrderList.value = [];
			for (let i = 1; i <= admittedList.value.length; i++) {
				admittedOrderList.value.push(i);
			}
			reserveList.value = data!.filter(
				(item) => item.enroll_stage === "備取"
			);
			reserveOrderList.value = [];
			for (let i = 1; i <= reserveList.value.length; i++) {
				reserveOrderList.value.push(i);
			}
		},
	}
);
const { t } = useI18n();
const translation = {
	phase1: t("第一階段 (書面審查)"),
	phase2: t("第二階段 (口試審查)"),
	admissionList: t("正取名單"),
	reserveList: t("備取名單"),
	pending: t("待審核"),
	notPass: t("不通過"),
	passtophase2: t("進赴二階"),
	admitted: t("正取"),
	alternate: t("備取"),
	derectlyAdmitted: t("逕取"),
	derectlyAdmittedPass: t("逕取通過"),
	writtenReviewNotPass: t("書審未過"),
};

const docsReviewerScore = ref<AdmissionAdminReviewerGradeResponse[]>();
const oralReviewerScore = ref<AdmissionAdminReviewerGradeResponse[]>();
const currentTab = ref(translation.phase1);
const tabOptions = ref([
	translation.phase1,
	translation.phase2,
	translation.admissionList,
	translation.reserveList,
]);
const dialogCurrentTab = ref(translation.phase1);
const dialogCurrentTab2 = ref(translation.phase2);
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
	translation.notPass,
]);
const oral_order = ref();
const admitted_order = ref();
const disable = computed(() => {
	return p1_result.value === "未送審";
});
const disable1 = computed(() => {
	return p1_result.value === translation.passtophase2 || !disable.value;
});
const disable2 = computed(() => {
	return dialogCurrentTab.value === translation.phase1;
});
const disable3 = computed(() => {
	return dialogCurrentTab2.value === translation.phase1;
});

const ID = computed(() => t("帳號ID"));
const applicantName = computed(() => t("申請人姓名"));
const reviewerGrade = computed(() => t("書審分數"));
const phaseResult = computed(() => t("階段審核結果"));
const directedAdmitted = computed(() => t("逕取"));
const gradeDataEdit = computed(() => t("評分資料編輯"));
const reviewer = computed(() => t("審查委員"));
const oralOrder = computed(() => t("口試順序"));
const finalResult = computed(() => t("最終審查結果"));
const reviewResult = computed(() => t("審查結果"));
const admissionOrder = computed(() => t("錄取順序"));
const totalScore = computed(() => t("審查委員給定總分"));
const final_score = computed(() => t("最後總分"));
const docsScore = computed(() => t("書審分數"));
const oralScore = computed(() => t("口試分數"));

const onRowReorder2 = (event: any) => {
	oralGradeList.value = event.value;
};

const onRowReorder3 = (event: any) => {
	oralGradeList.value = event.value;
};
const applicantID = ref(1);
const docsReviewerCount = ref(0);
const oralReviewerCount = ref(0);
const docsTotalGrade = ref(0);
const oralTotalGrade = ref(0);
const docsAverageGrade = ref(0);
const oralAverageGrade = ref(0);
const applicantDocsGrade = useQuery(
	["admissionAdminDocsGrade", applicantID],
	async () => {
		try {
			return await api.getSingleDocsGrade(applicantID);
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
	},
	{
		onSuccess: (data) => {
			docsReviewerCount.value = data!.reviewer.length;
			docsTotalGrade.value = 0;
			data!.reviewer.forEach((element) => {
				docsTotalGrade.value += element.grades;
			});
			docsAverageGrade.value =
				docsTotalGrade.value / docsReviewerCount.value;
			docsReviewerScore.value = data!.reviewer;
			p1_result.value = data!.stage;
			oral_order.value = data!.oral_order;
		},
	}
);
const applicantOralGrade = useQuery(
	["admissionAdminOralGrade", applicantID],
	async () => {
		try {
			return await api.getSingleOralGrade(applicantID);
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
	},
	{
		onSuccess: (data) => {
			oralReviewerCount.value = data!.reviewer.length;
			oralTotalGrade.value = 0;
			data!.reviewer.forEach((element) => {
				oralTotalGrade.value += element.grades;
			});
			oralAverageGrade.value =
				oralTotalGrade.value / oralReviewerCount.value;
			oralReviewerScore.value = data!.reviewer;
			p2_result.value = data!.enroll_stage;
			admitted_order.value = data!.enroll_order;
		},
	}
);
const editProduct = (prod: any) => {
	name.value = prod.data.name;
	id.value = prod.data.id;
	productDialog.value = true;
	applicantID.value = prod.data.id;
	if (!applicantDocsGrade.isFetched.value) {
		applicantDocsGrade.refetch({ throwOnError: true });
	}
	if (!applicantOralGrade.isFetched.value) {
		applicantOralGrade.refetch({ throwOnError: true });
	}
};

const applicantStage = useMutation(async (newStage: any) => {
	try {
		return await api.updateApplicantStage(applicantID.value, newStage);
	} catch (error) {
		console.log(error);
	}
});
function doneEdit() {
	applicantStage.mutate({
		docs_stage: p1_result.value,
		docs_order: oral_order.value,
		oral_stage: p2_result.value,
		oral_order: admitted_order.value,
	});
	applicantDocsGradeList.refetch({ throwOnError: true });
	productDialog.value = false;
}
function cancelEdit() {
	productDialog.value = false;
}

const batchUpdateApplicantStages = useMutation(async (applicants: any) => {
	for (const applicant of applicants) {
		try {
			const result = await api.updateApplicantStage(
				applicant.applicantID,
				applicant.stages
			);
			if (result.status !== "success")
				throw new Error(
					`Failed to patch applicant (id = ${applicant.applicantID})`
				);

			// console.log(`Patched applicant (id = ${applicant.applicantID})`)
			// update progress
		} catch (error) {
			console.log(error);
			break;
		}
	}
});

function saveOralOrder() {
	let list = [];

	for (const [idx, entry] of oralGradeList!.value!.entries()) {
		const applicantID = oralGradeList!.value![idx].id;

		list.push({
			applicantID,
			stages: {
				docs_order: oralOrderList!.value![idx],
			},
		});
	}

	batchUpdateApplicantStages.mutate(list);
	oralOrderList.value = [];
	for (let i = 1; i <= oralGradeList.value!.length; i++) {
		oralOrderList.value.push(i);
	}
}

function saveEnrollOrder() {
	let list = [];

	for (const [idx, entry] of admittedList!.value!.entries()) {
		const applicantID = admittedList!.value![idx].id;

		list.push({
			applicantID,
			stages: {
				oral_order: admittedOrderList!.value![idx],
			},
		});
	}

	batchUpdateApplicantStages.mutate(list);
	admittedOrderList.value = [];
	for (let i = 1; i <= admittedList.value!.length; i++) {
		admittedOrderList.value.push(i);
	}
}

function saveReserveOrder() {
	let list = [];

	for (const [idx, entry] of reserveList!.value!.entries()) {
		const applicantID = reserveList!.value![idx].id;

		list.push({
			applicantID,
			stages: {
				oral_order: reserveOrderList!.value![idx],
			},
		});
	}

	batchUpdateApplicantStages.mutate(list);
	reserveOrderList.value = [];
	for (let i = 1; i <= reserveList.value!.length; i++) {
		reserveOrderList.value.push(i);
	}
}
</script>
