<template>
	<Layout Applicant>
		<template #Header>{{ $t("推薦信作業") }}</template>
		<template #Body>
			<!-- 推薦信列表頭(有資料時) -->
			<div
				v-if="letterList[0]?.length"
				class="flex mt-24px font-bold text-[18px]"
			>
				<div class="recTableTitleCol">{{ t("上傳時間") }}</div>
				<div class="recTableTitleCol">{{ t("推薦人姓名") }}</div>
				<div class="recTableTitleCol">{{ t("作業狀態") }}</div>
				<div class="recTableTitleCol">{{ t("操作") }}</div>
			</div>
			<!-- 畫面顯示(無資料時) -->
			<div v-else class="relative h-150">
				<div class="recNoData">
					<img
						src="/assets/admissionApplicant/Newsletter.png"
						alt="NO DATA"
						style="border-radius: 50%"
					/>
					<div
						class="text-center font-bold text-[24px] text-[#736028]"
					>
						{{ $t("暫無推薦人") }}
					</div>
				</div>
			</div>
			<!-- 推薦信列表(有資料時) -->
			<div v-if="letterList[0]?.length !== 0">
				<div v-for="(item, index) in letterList[0]" :key="index">
					<!-- 列表收起狀態 -->
					<div v-if="!item.isCollapse" class="recTableRowIncollapse">
						<div class="recTableCol">
							{{ convertTime(item.created_at) }}
						</div>
						<div class="recTableCol">{{ item.name }}</div>
						<div class="recTableCol">{{ t(item.status) }}</div>
						<div class="recTableButtonCol">
							<Button
								class="p-button-outlined p-button-secondary"
								style="
									border: 2px solid #bcd19b;
									font-size: xx-small;
								"
								icon="pi pi-envelope"
								iconClass="text-[#53565A]"
								v-tooltip.top="t('發出邀請')"
								:disabled="item.stage === '已寄出'"
								@click="
									isModalVisible.request = true;
									selectedItem = item.id;
								"
							/>
							<Button
								class="p-button-outlined p-button-secondary"
								style="
									border: 2px solid #93282c;
									margin-left: 16px;
									font-size: xx-small;
								"
								icon="pi pi-trash"
								iconClass="text-[#93282C]"
								v-tooltip.top="t('刪除')"
								:disabled="item.stage === '已寄出'"
								@click="
									isModalVisible.delete = true;
									selectedItem = item.id;
								"
							/>
						</div>
						<i
							class="pi pi-angle-down collapseIcon"
							@click="item.isCollapse = !item.isCollapse"
						></i>
					</div>
					<!-- 列表展開狀態 -->
					<div v-else class="recTableRowCollapse">
						<div class="recTableRowCollapseItem font-bold">
							<div class="recTableCol">
								{{ convertTime(item.created_at) }}
							</div>
							<div class="recTableCol">{{ item.name }}</div>
							<div class="recTableCol">{{ t(item.status) }}</div>
							<div class="recTableButtonCol">
								<Button
									class="p-button-outlined p-button-secondary"
									style="
										border: 2px solid #bcd19b;
										font-size: xx-small;
									"
									icon="pi pi-envelope"
									iconClass="text-[#53565A]"
									v-tooltip.top="t('發出邀請')"
									:disabled="item.stage === '已寄出'"
									@click="
										isModalVisible.request = true;
										selectedItem = item.id;
									"
								/>
								<Button
									class="p-button-outlined p-button-secondary"
									style="
										border: 2px solid #93282c;
										margin-left: 16px;
										font-size: xx-small;
									"
									icon="pi pi-trash"
									iconClass="text-[#93282C]"
									v-tooltip.top="t('刪除')"
									:disabled="item.stage === '已寄出'"
									@click="
										isModalVisible.delete = true;
										selectedItem = item.id;
									"
								/>
							</div>
							<i
								class="pi pi-angle-up collapseIcon"
								@click="item.isCollapse = !item.isCollapse"
							></i>
						</div>
						<div class="recTableRowCollapseItem">
							<div class="recTableSemiCol">
								{{ $t("推薦人姓名") + $t(":") }}
								{{ item.name }}
							</div>
							<div class="recTableSemiCol">
								{{ $t("推薦人稱謂") + $t(":") }}
								{{ item.title }}
							</div>
						</div>
						<div class="recTableRowCollapseItem">
							<div class="recTableSemiCol">
								{{ $t("關係") + $t(":") }}
								{{ item.relation }}
							</div>
							<div class="recTableSemiCol">
								{{ $t("電話") + $t(":") }}
								{{ item.phone }}
							</div>
						</div>
						<div class="recTableRowCollapseItem">
							<div class="recTableSemiCol">
								{{ $t("電郵") + $t(":") }}
								{{ item.email }}
							</div>
						</div>
						<div class="recTableRowCollapseItem">
							<div class="recTableSemiCol">
								{{ $t("單位") + $t(":") }}
								{{ item.institution }}
							</div>
							<div class="recTableSemiCol">
								{{ $t("職稱") + $t(":") }}
								{{ item.position }}
							</div>
						</div>
						<div class="recTableRowCollapseItem">
							<div class="recTableSemiCol flex">
								<div class="font-bold">{{ $t("簽名檔") }}</div>
								<div class="ml-24px">{{ $t("限制") }}</div>
							</div>
						</div>
					</div>
				</div>
				<!-- 送出邀請Dialog -->
				<Dialog
					v-model:visible="isModalVisible.request"
					style="width: 500px"
					:closable="false"
					:draggable="false"
					:modal="true"
				>
					<template #header>
						<div class="font-bold text-[24px]">
							{{ $t("發出邀請") }}
						</div>
					</template>
					<template #default>
						<div class="flex">
							<div class="mt-2px">
								<i
									class="pi pi-question-circle"
									style="font-size: 20px"
								/>
							</div>
							<div class="ml-4px">
								{{ $t("確認送出") + $t("?") }}
							</div>
						</div>
					</template>
					<template #footer>
						<Button
							class="p-button-outlined p-button-secondary"
							style="
								border: 2px solid #a18b4a;
								color: #736028;
								height: 36px;
							"
							icon="pi pi-times"
							iconClass="text-[#736028]"
							:label="t('取消')"
							@click="isModalVisible.request = false"
						/>
						<Button
							class="p-button-outlined p-button-secondary"
							style="
								color: #53565a;
								border: 2px solid #bcd19b;
								margin-left: 16px;
								height: 36px;
							"
							icon="pi pi-check"
							iconClass="text-[#53565A]"
							:label="t('確認')"
							:loading="isActionLoading.request"
							@click="handleRequest(selectedItem)"
						/>
					</template>
				</Dialog>
				<!-- 刪除Dialog -->
				<Dialog
					v-model:visible="isModalVisible.delete"
					style="width: 500px"
					:closable="false"
					:draggable="false"
					:modal="true"
				>
					<template #header>
						<div class="font-bold text-[24px]">
							{{ $t("刪除") }}
						</div>
					</template>
					<template #default>
						<div class="flex">
							<div class="mt-2px">
								<i
									class="pi pi-exclamation-triangle"
									style="font-size: 20px"
								/>
							</div>
							<div class="ml-4px">
								{{ $t("確認刪除") + $t("?") }}
							</div>
						</div>
					</template>
					<template #footer>
						<Button
							class="p-button-outlined p-button-secondary"
							style="
								border: 2px solid #a18b4a;
								color: #736028;
								height: 36px;
							"
							icon="pi pi-times"
							iconClass="text-[#736028]"
							:label="t('取消')"
							@click="isModalVisible.delete = false"
						/>
						<Button
							class="p-button-outlined p-button-secondary"
							style="
								color: #93282c;
								border: 2px solid #93282c;
								margin-left: 16px;
								height: 36px;
							"
							icon="pi pi-check"
							iconClass="text-[#93282C]"
							:label="t('確認')"
							@click="handleDelete(selectedItem)"
						/>
					</template>
				</Dialog>
				<NButton
					Applicant
					icon="pi pi-plus"
					class="w-[100%] mt-32px"
					@click="openModal()"
				>
					{{ $t("新增推薦人") }}
				</NButton>
			</div>
		</template>
		<template #Footer></template>
	</Layout>
	<div>
		<!-- 新增推薦人 Dialog -->
		<Dialog
			v-model:visible="isModalVisible.fill"
			style="width: 900px"
			:draggable="false"
			:closable="false"
			:modal="true"
		>
			<template #header>
				<div class="flex">
					<div class="font-bold text-[24px]">
						{{ t("新增推薦人") }}
					</div>
					<div
						v-if="modalShowErr"
						style="
							position: absolute;
							right: 24px;
							background-color: #ef9a9a;
							width: auto;
							height: 44px;
							border-radius: 8px;
							border: 2px solid #c62828;
							margin-top: -12px;
							padding: 8px 8px;
							color: #c62828;
							text-align: center;
						"
					>
						{{ $t("error") + $t("!") + " "
						}}{{ fetchResponse.message }}
					</div>
				</div>
			</template>
			<template #default>
				<div class="bigYellowDivider"></div>
				<div class="text-[17px]">
					<div class="flex mt-32px">
						<div class="w-1/2">
							<div>{{ $t("推薦人姓名") }}</div>
							<div>
								<InputText
									class="w-[70%] h-40px !mt-8px"
									id="name"
									type="text"
									v-model="modalValue.name"
									aria-describedby="name-help"
								/>
							</div>
							<div class="absolute" v-if="isModalValueBlank.name">
								<small id="name-help" class="p-error">
									{{ $t("此為必填欄位") }}
								</small>
							</div>
						</div>
						<div class="w-1/2">
							<div>{{ $t("推薦人稱謂") }}</div>
							<div>
								<InputText
									class="w-[70%] h-40px !mt-8px"
									id="appellation"
									type="text"
									v-model="modalValue.appellation"
									aria-describedby="appellation-help"
								/>
							</div>
							<div
								class="absolute"
								v-if="isModalValueBlank.appellation"
							>
								<small id="appellation-help" class="p-error">
									{{ $t("此為必填欄位") }}
								</small>
							</div>
						</div>
					</div>
					<div class="flex mt-32px">
						<div class="w-1/2">
							<div>{{ $t("關係") }}</div>
							<div>
								<InputText
									class="w-[70%] h-40px !mt-8px"
									id="relationship"
									type="text"
									v-model="modalValue.relationship"
									aria-describedby="relationship-help"
								/>
							</div>
							<div
								class="absolute"
								v-if="isModalValueBlank.relationship"
							>
								<small id="relationship-help" class="p-error">
									{{ $t("此為必填欄位") }}
								</small>
							</div>
						</div>
						<div class="w-1/2">
							<div>{{ $t("電話") }}</div>
							<div>
								<InputText
									class="w-[70%] h-40px !mt-8px"
									id="phone"
									type="text"
									v-model="modalValue.phone"
									aria-describedby="phone-help"
								/>
							</div>
							<div
								class="absolute"
								v-if="isModalValueBlank.phone"
							>
								<small id="phone-help" class="p-error">
									{{ $t("此為必填欄位") }}
								</small>
							</div>
						</div>
					</div>
					<div class="w-1/2 mt-32px">
						<div>{{ $t("電郵") }}</div>
						<div>
							<InputText
								class="w-[70%] h-40px !mt-8px"
								id="email"
								type="text"
								v-model="modalValue.email"
								aria-describedby="email-help"
							/>
						</div>
						<div class="absolute" v-if="isModalValueBlank.email">
							<small id="email-help" class="p-error">
								{{ $t("此為必填欄位") }}
							</small>
						</div>
					</div>
					<div class="flex mt-32px">
						<div class="w-1/2">
							<div>{{ $t("單位") }}</div>
							<div>
								<InputText
									class="w-[70%] h-40px !mt-8px"
									id="organization"
									type="text"
									v-model="modalValue.organization"
									aria-describedby="organization-help"
								/>
							</div>
							<div
								class="absolute"
								v-if="isModalValueBlank.organization"
							>
								<small id="organization-help" class="p-error">
									{{ $t("此為必填欄位") }}
								</small>
							</div>
						</div>
						<div class="w-1/2">
							<div>{{ $t("職稱") }}</div>
							<div>
								<InputText
									class="w-[70%] h-40px !mt-8px"
									id="position"
									type="text"
									v-model="modalValue.position"
									aria-describedby="position-help"
								/>
							</div>
							<div
								class="absolute"
								v-if="isModalValueBlank.position"
							>
								<small id="position-help" class="p-error">
									{{ $t("此為必填欄位") }}
								</small>
							</div>
						</div>
					</div>
				</div>
				<div class="bigYellowDivider" style="margin-top: 40px"></div>
			</template>
			<template #footer>
				<Button
					class="p-button-outlined p-button-secondary"
					style="
						border: 2px solid #a18b4a;
						color: #736028;
						background-color: #f0dfad;
						height: 44px;
					"
					icon="pi pi-times"
					iconClass="text-[#736028]"
					:label="t('取消')"
					@click="
						() => {
							isModalVisible.fill = false;
							clearFetchResponse();
							modalShowErr = false;
						}
					"
				/>
				<Button
					class="p-button-outlined p-button-secondary"
					style="
						border: 2px solid #bcd19b;
						margin-left: 16px;
						background-color: #d3e8b3;
						height: 44px;
					"
					icon="pi pi-save"
					iconClass="text-[#53565A]"
					:label="t('儲存')"
					:loading="isActionLoading.save"
					@click="handleSave()"
				/>
			</template>
		</Dialog>
	</div>
</template>

<script setup lang="ts">
import { toRaw, ref, reactive, watch } from "vue";
import { useAdmissionApplicantAuthStore } from "@/stores/universalAuth";
import { AdmissionApplicantAPI } from "@/api/admission/applicant/api";
import type { AdmissionApplicantRecLetListRes } from "@/api/admission/applicant/types";
import { useQuery } from "@tanstack/vue-query";
import { useI18n } from "vue-i18n";
import { useToast } from "primevue/usetoast";
import Button from "primevue/button";
import NButton from "@/styles/CustomButton.vue";
import Dialog from "primevue/dialog";
import Layout from "@/components/Layout.vue";
import InputText from "primevue/inputtext";
import "primeicons/primeicons.css";

const { t } = useI18n();

const applicantAuth = useAdmissionApplicantAuthStore();
const api = new AdmissionApplicantAPI(applicantAuth);

const toast = useToast();

let isActionLoading = reactive({
	request: false,
	save: false,
	delete: false,
	fetch: false,
});

const modalShowErr = ref(false);

const selectedItem = ref(0);

let isModalVisible = reactive({
	fill: false,
	delete: false,
	request: false,
});

let modalValue = reactive({
	name: "",
	appellation: "",
	relationship: "",
	phone: "",
	email: "",
	organization: "",
	position: "",
	sign: "",
});

let isModalValueBlank = reactive({
	name: false,
	appellation: false,
	relationship: false,
	phone: false,
	email: false,
	organization: false,
	position: false,
	sign: false,
});

let fetchResponse = reactive({
	success: false,
	message: "" as string | [],
});

const { data } = useQuery(
	["recommendLetterList"],
	async () => {
		return await api.getRecommendLetterList();
	},
	{
		onSuccess: (data) => {
			letterList[0] = data!.map((item) => {
				return {
					...item,
					isCollapse: false,
				};
			});
		},
	}
);

let letterList = reactive([
	data.value?.map((item) => {
		return {
			...item,
			isCollapse: false,
		};
	}),
]);

const convertTime = (originTime: string) => {
	return (
		originTime.slice(0, 4) +
		"/" +
		originTime.slice(5, 7) +
		"/" +
		originTime.slice(8, 10) +
		" " +
		originTime.slice(11, 19)
	);
};

const clearModalValue = () => {
	modalValue.name = "";
	modalValue.appellation = "";
	modalValue.relationship = "";
	modalValue.phone = "";
	modalValue.email = "";
	modalValue.organization = "";
	modalValue.position = "";
	modalValue.sign = "";
};

const resetIsModalValueBlank = () => {
	isModalValueBlank.name = false;
	isModalValueBlank.appellation = false;
	isModalValueBlank.relationship = false;
	isModalValueBlank.phone = false;
	isModalValueBlank.email = false;
	isModalValueBlank.organization = false;
	isModalValueBlank.position = false;
	isModalValueBlank.sign = false;
};

const clearFetchResponse = () => {
	fetchResponse.success = false;
	fetchResponse.message = "";
};

const openModal = () => {
	isModalVisible.fill = true;
	resetIsModalValueBlank();
	clearModalValue();
};

const handleDelete = async (letterId: number) => {
	isActionLoading.delete = true;
	const response = await api.deleteRecommendLetter(letterId);

	if (response?.success !== undefined && response?.message !== undefined) {
		fetchResponse.success = toRaw(response.success);
		fetchResponse.message = toRaw(response.message);
	}

	isActionLoading.delete = false;
	isActionLoading.fetch = true;

	if (fetchResponse.success) {
		toast.add({
			severity: "success",
			summary: "Success",
			detail: fetchResponse.message,
			life: 3000,
		});
	} else {
		toast.add({
			severity: "error",
			summary: "Error",
			detail: fetchResponse.message,
			life: 5000,
		});
	}

	clearFetchResponse();
	isModalVisible.delete = false;
};

const handleSave = async () => {
	isModalValueBlank.name = modalValue.name === "" ? true : false;
	isModalValueBlank.appellation =
		modalValue.appellation === "" ? true : false;
	isModalValueBlank.relationship =
		modalValue.relationship === "" ? true : false;
	isModalValueBlank.phone = modalValue.phone === "" ? true : false;
	isModalValueBlank.email = modalValue.email === "" ? true : false;
	isModalValueBlank.organization =
		modalValue.organization === "" ? true : false;
	isModalValueBlank.position = modalValue.position === "" ? true : false;
	isModalValueBlank.sign = modalValue.sign === "" ? true : false;

	if (
		!isModalValueBlank.name &&
		!isModalValueBlank.appellation &&
		!isModalValueBlank.relationship &&
		!isModalValueBlank.phone &&
		!isModalValueBlank.email &&
		!isModalValueBlank.organization &&
		!isModalValueBlank.position
	) {
		isActionLoading.fetch = true;
		isActionLoading.save = true;
		const body = {
			name: modalValue.name,
			title: modalValue.appellation,
			email: modalValue.email,
			phone: modalValue.phone,
			relation: modalValue.relationship,
			institution: modalValue.organization,
			position: modalValue.position,
			filepath: {
				url: modalValue.sign,
			},
		};

		const response = await api.saveRecommendLetter(body);

		if (
			response?.success !== undefined &&
			response?.message !== undefined
		) {
			fetchResponse.success = toRaw(response.success);
			fetchResponse.message = toRaw(response.message);
		}

		isActionLoading.save = false;

		if (fetchResponse.success) {
			resetIsModalValueBlank();
			clearModalValue();
			modalShowErr.value = false;
			isModalVisible.fill = false;
			toast.add({
				severity: "success",
				summary: "Success",
				detail: fetchResponse.message,
				life: 3000,
			});
		} else {
			modalShowErr.value = true;
		}

		if (fetchResponse.success) clearFetchResponse();
	}
};

const handleRequest = async (letterId: number) => {
	isActionLoading.request = true;

	const url = "http://127.0.0.1:5173/admission/recommendLetterFillIn";
	const response = await api.requestRecommendLetter(letterId, {
		params: { redirect_url: url },
	});

	if (response?.success !== undefined && response?.message !== undefined) {
		fetchResponse.success = toRaw(response.success);
		fetchResponse.message = toRaw(response.message);
	}

	isActionLoading.request = false;
	isActionLoading.fetch = true;

	if (fetchResponse.success) {
		toast.add({
			severity: "success",
			summary: "Success",
			detail: fetchResponse.message,
			life: 3000,
		});
	} else {
		toast.add({
			severity: "error",
			summary: "Error",
			detail: fetchResponse.message,
			life: 5000,
		});
	}

	clearFetchResponse();
	isModalVisible.request = false;
};

watch(
	() => isActionLoading.fetch,
	async () => {
		const response: AdmissionApplicantRecLetListRes[] =
			await api.getRecommendLetterList();
		letterList[0] = response?.map((item) => {
			return {
				...item,
				isCollapse: false,
			};
		});
		isActionLoading.fetch = false;
	}
);
</script>

<style setup lang="css">
.recTableTitleCol {
	width: 23%;
	text-align: center;
}

.recTableRowIncollapse {
	position: relative;
	display: flex;
	height: 80px;
	margin-top: 16px;
	background-color: rgba(236, 236, 235, 1);
	border-radius: 8px;
	border: 2px solid rgb(204, 204, 204);
	font-weight: bold;
}

.recTableRowCollapse {
	margin-top: 16px;
	padding-bottom: 28px;
	background-color: rgba(236, 236, 235, 1);
	border-radius: 8px;
	border: 2px solid rgb(204, 204, 204);
}

.recTableRowCollapseItem {
	position: relative;
	display: flex;
}

.recTableSemiCol {
	width: 50%;
	padding-left: 5%;
	margin-top: 36px;
}

.recTableCol {
	width: 23%;
	text-align: center;
	padding-top: 24px;
}

.recTableButtonCol {
	width: 23%;
	text-align: center;
	margin-top: 16px;
}

.collapseIcon {
	position: absolute;
	right: 24px;
	margin-top: 26px;
}

.collapseIcon:hover {
	cursor: pointer;
	color: rgba(0, 0, 0, 0.5);
}

.recNoData {
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	height: 400px;
	width: 500px;
}

.button {
	cursor: pointer;
}

.button:hover {
	cursor: not-allowed;
}
</style>
