<template>
	<Layout Admin noMargin>
		<template #Header>
			{{ $t("評分資料列表") }}
		</template>
		<template #Body>
			<NSelect
				Admin
				class="sticky top-0 h-12 z-50"
				:optionNum="6"
				@currentTab="handleTab"
			>
				<template #Select1>{{ $t("書面審查") }}</template>
				<template #Select2>{{ $t("口試審查") }}</template>
				<template #Select3>{{ $t("逕取名單") }}</template>
				<template #Select4>{{ $t("正取名單") }}</template>
				<template #Select5>{{ $t("備取名單") }}</template>
				<template #Select6>{{ $t("報表列印") }}</template>
			</NSelect>
			<!-- Select 1 -->
			<DataTable
				v-if="currentTab === translation.phase1"
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
					<template #body="slotProps">
						<i v-if="slotProps.data.application_stage === null">{{
							$t("待審核")
						}}</i>
						<p v-else>
							{{ slotProps.data.application_stage }}
						</p>
					</template>
				</Column>
				<Column :exportable="false" style="min-width: 8rem">
					<template #body="slotProps">
						<NButton
							Admin
							icon="pi pi-pencil"
							class="w-11 h-11"
							@click="editProduct(slotProps)"
						/>
					</template>
				</Column>
			</DataTable>
			<!-- Select 2 -->
			<DataTable
				v-if="currentTab === translation.phase2"
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
						<NButton
							Admin
							icon="pi pi-pencil"
							class="w-11 h-11"
							@click="editProduct(slotProps)"
						/>
					</template>
				</Column>
			</DataTable>
			<!-- Select 3 -->
			<DataTable
				v-if="currentTab === translation.iEnrollList"
				:value="iEnrollList"
				responsiveLayout="scroll"
				dataKey="id"
				:scrollable="true"
				scrollHeight="700px"
				class="p-datatable-lg !h-700px"
				removableSort
			>
				<Column field="id" :header="ID"></Column>
				<Column field="name" :header="applicantName"></Column>
				<Column
					field="grades"
					:header="reviewerGrade"
					:sortable="true"
				></Column>
			</DataTable>
			<!-- Select 4 -->
			<DataTable
				v-if="currentTab === translation.admissionList"
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
			<!-- Select 5 -->
			<DataTable
				v-if="currentTab === translation.reserveList"
				:value="reserveList"
				responsiveLayout="scroll"
				dataKey="id"
				:scrollable="true"
				scrollHeight="700px"
				@rowReorder="onRowReorder4"
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
			<!-- Select 6 -->
			<div
				v-if="currentTab === translation.printReport"
				flex="~ col gap-6"
			>
				<div flex="~ gap-8" p="8" bg="nGrey-50" border="rounded-lg">
					<div text="xl title center" font="medium" my="auto" w="80">
						{{ $t("審查書面評分") }}
					</div>
					<div v-if="betweenDocs">
						{{ $t("於") }} {{ docs_end_time }}
						{{ $t("後開放列印") }}
					</div>
					<div v-else class="flex">
						<NButton
							Applicant
							icon="pi pi-print"
							size="lg"
							class="h-14"
							@click="
								downloadPDFFile(docPdfData, 'doc_report', false)
							"
						>
							{{ $t("報表列印") }}
						</NButton>
						<NButton
							Admin
							icon="pi pi-eye-slash"
							size="lg"
							class="h-14"
							@click="
								downloadPDFFile(
									docAnonyPdfData,
									'doc_report',
									true
								)
							"
						>
							{{ $t("匿名報表列印") }}
						</NButton>
					</div>
				</div>
				<div flex="~ gap-8" p="8" border="2 rounded-lg nGrey-50">
					<div text="xl title center" font="medium" my="auto" w="80">
						{{ $t("審查總評分") }}
					</div>
					<div v-if="betweenReview">
						{{ $t("於") }} {{ oral_end_time }}
						{{ $t("後開放列印") }}
					</div>
					<div v-else class="flex">
						<NButton
							Applicant
							icon="pi pi-print"
							size="lg"
							class="h-14"
							@click="
								downloadPDFFile(
									genPdfData,
									'general_report',
									false
								)
							"
						>
							{{ $t("報表列印") }}
						</NButton>
						<NButton
							Admin
							icon="pi pi-eye-slash"
							size="lg"
							class="h-14"
							@click="
								downloadPDFFile(
									genAnonyPdfData,
									'general_report',
									true
								)
							"
						>
							{{ $t("匿名報表列印") }}
						</NButton>
					</div>
				</div>
				<div flex="~ gap-8" p="8" bg="nGrey-50" border="rounded-lg">
					<div text="xl title center" font="medium" my="auto" w="80">
						{{ $t("錄取名單") }}
					</div>
					<div v-if="betweenReview">
						{{ $t("於") }} {{ oral_end_time }}
						{{ $t("後開放列印") }}
					</div>
					<div v-else>
						<NButton
							Applicant
							icon="pi pi-print"
							size="lg"
							class="h-14"
							@click="
								downloadPDFFile(
									enrollPdfData,
									'enroll_report',
									false
								)
							"
						>
							{{ $t("報表列印") }}
						</NButton>
					</div>
				</div>
			</div>
		</template>
		<template #Footer>
			<div v-if="currentTab === translation.phase1">
				<div flex="~ gap-4" justify="items-center" text="body" mx="4">
					<div my="auto">
						{{ $t("待審核") }} {{ docsStage1Count }}
						{{ $t("位") }}
					</div>
					<Divider layout="vertical" />
					<div my="auto">
						{{ $t("進赴二階") }} {{ docsStage2Count }}
						{{ $t("位") }}
					</div>
					<Divider layout="vertical" />
					<div my="auto">
						{{ $t("逕取") }} {{ docsStage3Count }}
						{{ $t("位") }}
					</div>
					<Divider layout="vertical" />
					<div my="auto">
						{{ $t("不通過") }} {{ docsStage4Count }}
						{{ $t("位") }}
					</div>
					<Divider layout="vertical" />
					<div my="auto">
						{{ $t("未送審") }} {{ docsStage5Count }}
						{{ $t("位") }}
					</div>
				</div>
			</div>
			<div v-if="currentTab === translation.phase2">
				<div flex="~ gap-4" text="body" mx="4">
					<div my="auto">
						{{ $t("待審核") }} {{ oralStage1Count }}
						{{ $t("位") }}
					</div>
					<Divider layout="vertical" />
					<div my="auto">
						{{ $t("正取") }} {{ oralStage2Count }}
						{{ $t("位") }}
					</div>
					<Divider layout="vertical" />
					<div my="auto">
						{{ $t("備取") }} {{ oralStage3Count }}
						{{ $t("位") }}
					</div>
					<Divider layout="vertical" />
					<div my="auto">
						{{ $t("不通過") }} {{ oralStage4Count }}
						{{ $t("位") }}
					</div>
					<NButton
						Admin
						class="h-11 max-w-36 ml-auto"
						@click="saveOralOrder"
						icon="pi pi-save"
					>
						<span class="tracking-1px">{{ $t("保存順序") }}</span>
					</NButton>
				</div>
			</div>
			<div v-if="currentTab === translation.admissionList">
				<div flex="~" justify="center" text="body" mx="4">
					<NButton
						Admin
						class="h-11 max-w-36"
						@click="saveEnrollOrder"
						icon="pi pi-save"
					>
						<span class="tracking-1px">{{ $t("保存順序") }}</span>
					</NButton>
				</div>
			</div>
			<div v-if="currentTab === translation.reserveList">
				<div flex="~" justify="center" text="body" mx="4">
					<NButton
						Admin
						class="h-11 max-w-36"
						@click="saveReserveOrder"
						icon="pi pi-save"
					>
						<span class="tracking-1px">{{ $t("保存順序") }}</span>
					</NButton>
				</div>
			</div>
		</template>
	</Layout>

	<!-- Dialog - 1 -->
	<Dialog
		v-if="currentTab === translation.phase1"
		v-model:visible="productDialog"
		:draggable="false"
		:closable="false"
		:modal="true"
		class="w-160"
	>
		<template #header>
			<div text="2xl title">{{ $t("評分資料編輯") }}</div>
		</template>
		<template #default>
			<div flex="~ col gap-6 mx-2">
				<!-- 基本資料 -->
				<div flex="~ col gap-4" bg="gray-100" p="4" border="rounded-lg">
					<div text="body" flex="~ gap-6">
						<div>{{ $t("帳號ID") }} :</div>
						<div>{{ id }}</div>
					</div>
					<div text="body" flex="~ gap-6">
						<div>{{ $t("帳號名稱") }} :</div>
						<div>{{ name }}</div>
					</div>
				</div>
				<!-- Select Button -->
				<!-- <NSelect
					Admin
					class="h-11"
					:disabled="disable1"
					@currentTab="handleDialogTab"
				>
					<template #Select1>{{ $t("書面審查") }}</template>
					<template #Select2>{{ $t("口試審查") }}</template>
				</NSelect> -->
				<!-- 1. 書面審查 -->
				<DataTable
					v-if="dialogCurrentTab === translation.phase1"
					:value="docsReviewerScore"
					responsiveLayout="scroll"
					dataKey="id"
					class="text-base"
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
								v-if="slotProps.data.isImmediateEnroll"
								class="pi pi-check"
							></i>
							<p v-else>-</p>
						</template>
					</Column>
					<Column field="grades" :header="totalScore"></Column>
				</DataTable>
				<div v-if="dialogCurrentTab === translation.phase1">
					<div flex="~ gap-2" justify="end" text="sm secondary">
						<div>{{ $t("平均分數") }}</div>
						<div mr="4">{{ docsAverageGrade }}</div>
					</div>
				</div>
				<!-- 2. 口試審查 -->
				<DataTable
					v-if="dialogCurrentTab === translation.phase2"
					:value="oralReviewerScore"
					responsiveLayout="scroll"
					dataKey="id"
					class="text-base"
				>
					<Column field="name" :header="reviewer"></Column>
					<Column field="grades" :header="totalScore"></Column>
				</DataTable>
				<div v-if="dialogCurrentTab === translation.phase2">
					<div flex="~ gap-2" justify="end" text="sm secondary">
						<div>{{ $t("平均分數") }}</div>
						<div mr="4">{{ oralAverageGrade }}</div>
					</div>
				</div>
				<!-- 1. 書面審查 - 結果 -->
				<div v-if="disable2" flex="~ col gap-6" mx="8">
					<div space="y-1">
						<div>{{ $t("一階審查結果") }}</div>
						<Dropdown
							v-if="disable"
							v-model="p1_result"
							:options="p1_result_option"
							disabled
							class="h-12 w-1/2"
						/>
						<Dropdown
							v-else
							v-model="p1_result"
							:options="p1_result_option"
							class="h-12 w-1/2"
						/>
					</div>
					<div space="y-1">
						<div>{{ $t("口試順序") }}</div>
						<InputText
							v-if="disable1"
							type="text"
							v-model="oral_order"
							class="h-12 w-1/2"
						/>
						<InputText
							v-else
							type="text"
							v-model="oral_order"
							disabled
							class="h-12 w-1/2"
						/>
					</div>
				</div>
				<!-- 2. 口試審查 - 結果 -->
				<div v-else flex="~ col gap-6" mx="8">
					<div space="y-1">
						<div>{{ $t("二階審查結果") }}</div>
						<Dropdown
							v-if="disable1"
							v-model="p2_result"
							:options="p2_result_option"
							class="h-12 w-1/2"
						/>
						<Dropdown
							v-else
							v-model="p2_result"
							:options="p2_result_option"
							disabled
							class="h-12 w-1/2"
						/>
					</div>
					<div space="y-1">
						<div>{{ $t("錄取順序") }}</div>
						<InputText
							v-if="disable1"
							type="text"
							v-model="admitted_order"
							class="h-12 w-1/2"
						/>
						<InputText
							v-else-if="!disable1"
							type="text"
							v-model="admitted_order"
							disabled
							class="h-12 w-1/2"
						/>
					</div>
				</div>
			</div>
		</template>
		<template #footer>
			<div flex="~ gap-6" justify="center">
				<NButton
					Admin
					class="min-w-32 h-11"
					@click="doneEdit"
					icon="pi pi-check"
					>{{ $t("儲存變更") }}
				</NButton>
				<NButton
					class="min-w-32 h-11"
					@click="cancelEdit"
					icon="pi pi-times"
					>{{ $t("取消") }}
				</NButton>
			</div>
		</template>
	</Dialog>

	<!-- Dialog - 2 -->
	<Dialog
		v-if="currentTab === translation.phase2"
		v-model:visible="productDialog"
		:draggable="false"
		:closable="false"
		:modal="true"
		class="w-160"
	>
		<template #header>
			<div text="2xl title">{{ $t("評分資料編輯") }}</div>
		</template>
		<template #default>
			<div flex="~ col gap-6 mx-2">
				<!-- 基本資料 -->
				<div flex="~ col gap-4" bg="gray-100" p="4" border="rounded-lg">
					<div text="body" flex="~ gap-6">
						<div>{{ $t("帳號ID") }} :</div>
						<div>{{ id }}</div>
					</div>
					<div text="body" flex="~ gap-6">
						<div>{{ $t("帳號名稱") }} :</div>
						<div>{{ name }}</div>
					</div>
				</div>
				<!-- Select Button -->
				<!-- <NSelect Admin class="h-11" @currentTab="handleDialogTab2" disabled>
					<template #Select1>{{ $t("書面審查") }}</template>
					<template #Select2>{{ $t("口試審查") }}</template>
				</NSelect> -->

				<!-- 1. 書面審查 -->
				<DataTable
					v-if="dialogCurrentTab2 === translation.phase1"
					:value="docsReviewerScore"
					responsiveLayout="scroll"
					dataKey="id"
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
				<div v-if="dialogCurrentTab2 === translation.phase1">
					<div flex="~ gap-2" justify="end" text="sm secondary">
						<div>{{ $t("平均分數") }}</div>
						<div mr="4">{{ docsAverageGrade }}</div>
					</div>
				</div>
				<!-- 2. 口試審查 -->
				<DataTable
					v-if="dialogCurrentTab2 === translation.phase2"
					:value="oralReviewerScore"
					responsiveLayout="scroll"
					dataKey="id"
				>
					<Column field="name" :header="reviewer"></Column>
					<Column field="grades" :header="totalScore"></Column>
				</DataTable>
				<div v-if="dialogCurrentTab2 === translation.phase2">
					<div flex="~ gap-2" justify="end" text="sm secondary">
						<div>{{ $t("平均分數") }}</div>
						<div mr="4">{{ docsAverageGrade }}</div>
					</div>
				</div>
			</div>
			<!-- 1. 書面審查 - 結果 -->
			<div flex="~ col gap-6" mx="8" v-if="disable3">
				<div space="y-1">
					<div>{{ $t("一階審查結果") }}</div>
					<Dropdown
						v-model="p1_result"
						:options="p1_result_option"
						class="h-12 w-1/2"
					/>
				</div>
				<div space="y-1">
					<div>{{ $t("口試順序") }}</div>
					<InputText
						type="text"
						v-model="oral_order"
						:disabled="!disable1"
						class="h-12 w-1/2"
					/>
				</div>
			</div>
			<!-- 2. 口試審查 - 結果 -->
			<div flex="~ col gap-6" mx="8" v-else>
				<div space="y-1">
					<div>{{ $t("二階審查結果") }}</div>
					<Dropdown
						v-model="p2_result"
						:options="p2_result_option"
						:disabled="!disable1"
						class="h-12 w-1/2"
					/>
				</div>
				<div space="y-1">
					<div>{{ $t("錄取順序") }}</div>
					<InputText
						type="text"
						v-model="admitted_order"
						:disabled="!disable1"
						class="h-12 w-1/2"
					/>
				</div>
			</div>
		</template>
		<template #footer>
			<div flex="~ gap-6" justify="center">
				<NButton
					Admin
					class="min-w-36 h-11"
					@click="doneEdit"
					icon="pi pi-check"
				>
					<span class="tracking-1px">{{ $t("儲存變更") }}</span>
				</NButton>
				<NButton
					class="min-w-36 h-11"
					@click="cancelEdit"
					icon="pi pi-times"
				>
					<span class="tracking-1px">{{ $t("取消") }}</span>
				</NButton>
			</div>
		</template>
	</Dialog>
</template>

<script setup lang="ts">
import "@/styles/customize.css";
import "primeicons/primeicons.css";
import SelectButton from "primevue/selectbutton";
import NSelect from "@/components/SelectButton.vue";
import DataTable from "primevue/datatable";
import Layout from "@/components/Layout.vue";
import Column from "primevue/column";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import Divider from "primevue/divider";
import Dropdown from "primevue/dropdown";
import InputText from "primevue/inputtext";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import { useAdmissionAdminAuthStore } from "@/stores/universalAuth";
import { AdmissionAdminAPI } from "@/api/admission/admin/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { InvalidSessionError } from "@/api/error";
import { useGlobalStore } from "@/stores/globalStore";
import { useToast } from "primevue/usetoast";
import { AdmissionAdminReviewerGradeResponse } from "@/api/admission/admin/types";
import { AdmissionAdminOralGradeListResponse } from "@/api/admission/admin/types";
import Toast from "primevue/toast";
import NButton from "@/styles/CustomButton.vue";

const adminAuth = useAdmissionAdminAuthStore();
const api = new AdmissionAdminAPI(adminAuth);
const store = useGlobalStore();
const router = useRouter();
const toast = useToast();

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
const iEnrollList = ref();
const applicantID = ref();
const today = new Date();
const betweenDocs = computed(() => {
	return dateTransform(today) < store.program!.docs_end_date!;
});
const betweenReview = computed(() => {
	return dateTransform(today) < store.program!.review_end_date!;
});

const docs_end_time =
	store.program!.docs_end_date.slice(0, 4) +
	"/" +
	store.program!.docs_end_date.slice(5, 7) +
	"/" +
	store.program!.docs_end_date.slice(8, 10) +
	" " +
	store.program!.docs_end_date.slice(11, 16);
const oral_end_time =
	store.program!.review_end_date.slice(0, 4) +
	"/" +
	store.program!.review_end_date.slice(5, 7) +
	"/" +
	store.program!.review_end_date.slice(8, 10) +
	" " +
	store.program!.review_end_date.slice(11, 16);
const applicantDocsGradeList = useQuery(
	["admissionAdminDocsGradeList"],
	async () => {
		return await api.getDocsGradeList(store.program!.id!);
	},
	{
		onSuccess: (data) => {
			docsStage1Count.value =
				data!.filter((item) => item.application_stage === null).length +
				data!.filter((item) => item.application_stage === "待審核")
					.length;
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
			iEnrollList.value = data!.filter(
				(item) => item.application_stage === "逕取"
			);
			applicantID.value = data![0].id;
		},
	}
);
const applicantOralGradeList = useQuery(
	["admissionAdminOralGradeList"],
	async () => {
		return await api.getOralGradeList(store.program!.id!);
	},
	{
		onSuccess: (data) => {
			oralGradeList.value = data!.filter(
				(item) => item.isImmediateEnroll === false
			);
			oralGradeList.value.sort((a, b) => a.oral_order - b.oral_order);
			oralStage1Count.value =
				data!.filter((item) => item.enroll_stage === null).length +
				data!.filter((item) => item.enroll_stage === "待審核").length;
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
			admittedList.value.sort(
				(a: any, b: any) => a.enroll_order - b.enroll_order
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
			reserveOrderList.value.sort(
				(a: any, b: any) => a.enroll_order - b.enroll_order
			);
		},
	}
);
const { t } = useI18n();
const translation = {
	phase1: t("第一階段 (書面審查)"),
	phase2: t("第二階段 (口試審查)"),
	admissionList: t("正取名單"),
	reserveList: t("備取名單"),
	iEnrollList: t("逕取名單"),
	pending: t("待審核"),
	notPass: t("不通過"),
	passtophase2: t("進赴二階"),
	admitted: t("正取"),
	alternate: t("備取"),
	derectlyAdmitted: t("逕取"),
	derectlyAdmittedPass: t("逕取通過"),
	writtenReviewNotPass: t("書審未過"),
	printReport: t("報表列印"),
};

const docsReviewerScore = ref<AdmissionAdminReviewerGradeResponse[]>();
const oralReviewerScore = ref<AdmissionAdminReviewerGradeResponse[]>();
const currentTab = ref(translation.phase1);
const handleTab = (selectTab: number) => {
	switch (selectTab) {
		case 1:
			currentTab.value = translation.phase1;
			return;
		case 2:
			currentTab.value = translation.phase2;
			return;
		case 3:
			currentTab.value = translation.iEnrollList;
			return;
		case 4:
			currentTab.value = translation.admissionList;
			return;
		case 5:
			currentTab.value = translation.reserveList;
			return;
		case 6:
			currentTab.value = translation.printReport;
			return;
	}
};
const dialogCurrentTab = ref(translation.phase1);
const handleDialogTab = (selectTab: number) => {
	if (selectTab === 2) dialogCurrentTab.value = translation.phase2;
	else dialogCurrentTab.value = translation.phase1;
};
const dialogCurrentTab2 = ref(translation.phase2);
const handleDialogTab2 = (selectTab: number) => {
	if (selectTab === 2) dialogCurrentTab2.value = translation.phase2;
	else dialogCurrentTab2.value = translation.phase2;
};
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
	return p1_result.value === translation.passtophase2;
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
	admittedList.value = event.value;
};

const onRowReorder4 = (event: any) => {
	reserveList.value = event.value;
};

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
			if (applicantID.value !== undefined) {
				return await api.getSingleDocsGrade(applicantID.value);
			}
			return null;
		} catch (error) {
			console.log(error);
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
			if (applicantID.value !== undefined) {
				return await api.getSingleOralGrade(applicantID.value);
			}
			return null;
		} catch (error) {
			console.log(error);
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

store.$subscribe(() => {
	queryClient.invalidateQueries({
		queryKey: ["admissionAdminDocsGradeList"],
	});
	queryClient.invalidateQueries({
		queryKey: ["admissionAdminOralGradeList"],
	});
});
const editProduct = (prod: any) => {
	name.value = prod.data.name;
	id.value = prod.data.id;
	productDialog.value = true;
	applicantID.value = prod.data.id;
	applicantDocsGrade.refetch({ throwOnError: true });
	applicantOralGrade.refetch({ throwOnError: true });
};

const applicantStage = useMutation(async (newStage: any) => {
	try {
		return await api.updateApplicantStage(applicantID.value, newStage);
	} catch (error) {
		console.log(error);
	}
});
const queryClient = useQueryClient();
async function doneEdit() {
	applicantStage.mutate({
		docs_stage: p1_result.value,
		docs_order: oral_order.value,
		oral_stage: p2_result.value,
		oral_order: admitted_order.value,
	});
	applicantDocsGradeList.refetch({ throwOnError: true });
	applicantOralGradeList.refetch({ throwOnError: true });
	productDialog.value = false;
	await queryClient.invalidateQueries({
		queryKey: ["admissionAdminDocsGradeList"],
	});
	await queryClient.invalidateQueries({
		queryKey: ["admissionAdminOralGradeList"],
	});
}
function cancelEdit() {
	productDialog.value = false;
}

const batchUpdateApplicantStages = useMutation(
	async (applicants: any) => {
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
	},
	{
		onSuccess: () => {
			toast.add({
				severity: "success",
				summary: "Success",
				detail: "保存成功",
				life: 3000,
			});
			queryClient.invalidateQueries({
				queryKey: ["admissionAdminDocsGradeList"],
			});
			queryClient.invalidateQueries({
				queryKey: ["admissionAdminOralGradeList"],
			});
		},
		onError: () => {
			toast.add({
				severity: "error",
				summary: "Error",
				detail: "保存失敗",
				life: 3000,
			});
		},
	}
);

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

async function downloadPDFFile(
	getPDFfn: () => Promise<string>,
	reportType: string,
	anonymous: boolean
) {
	let pdf;

	try {
		pdf = await getPDFfn();
	} catch (error: any) {
		toast.add({
			severity: "error",
			summary: "Unable to download PDF: " + error.toString(),
			life: 3000,
		});

		return;
	}

	const linkSource = `data:application/pdf;base64,${pdf}`;
	const downloadLink = document.createElement("a");
	const ID = store.program!.id!;
	const fileName = ref("");

	if (anonymous) {
		fileName.value = "anonymous_" + reportType + "_" + ID + ".pdf";
	} else {
		fileName.value = reportType + "_" + ID + ".pdf";
	}

	downloadLink.href = linkSource;
	downloadLink.download = fileName.value;
	downloadLink.click();
}

const docPdfData = async () => {
	await api.getDocsReportGenerated(store.program!.id!);
	return await api.getDocsReport(store.program!.id!);
};

const docAnonyPdfData = async () => {
	await api.getDocsAnonyReportGenerated(store.program!.id!);
	return await api.getDocsAnonyReport(store.program!.id!);
};

const genPdfData = async () => {
	await api.getGenReportGenerated(store.program!.id!);
	return await api.getGenReport(store.program!.id!);
};

const genAnonyPdfData = async () => {
	await api.getGenAnonyReportGenerated(store.program!.id!);
	return await api.getGenAnonyReport(store.program!.id!);
};

const enrollPdfData = async () => {
	await api.getEnrollReportGenerated(store.program!.id!);
	return await api.getEnrollReport(store.program!.id!);
};

function dateTransform(date?: Date) {
	const result = new Date(date!.setHours(date!.getHours() + 8))
		.toJSON()
		.replace("Z", "");
	return result;
}
</script>
