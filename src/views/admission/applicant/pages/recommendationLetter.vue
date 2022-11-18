<template>
	<div>
		<!-- 新增推薦人 Dialog -->
		<Dialog
			v-model:visible="isModalVisible.create"
			style="width: 900px"
			:draggable="false"
			:modal="true"
		>
			<template #header>
				<div class="font-bold text-[24px]">
					{{ $t("新增推薦人") }}
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
					<div class="mt-32px">
						<div>{{ $t("簽名檔") }}</div>
						<div class="mt-8px">
							<FileUpload
								mode="basic"
								:maxFileSize="1000000"
								:customUpload="true"
								:fileLimit="1"
								@uploader="onUpload"
							>
							</FileUpload>
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
					icon="pi pi-save"
					iconClass="text-[#736028]"
					:label="$t('暫存')"
					@click="handleSave()"
				/>
				<Button
					class="p-button-outlined p-button-secondary"
					style="
						border: 2px solid #bcd19b;
						margin-left: 16px;
						background-color: #d3e8b3;
						height: 44px;
					"
					icon="pi pi-envelope"
					iconClass="text-[#53565A]"
					:label="$t('送出')"
					@click="handleSend()"
				/>
			</template>
		</Dialog>
		<!-- 頁面大標題 -->
		<div class="font-[500] text-[32px] font-bold">
			{{ $t("推薦信作業") }}
		</div>
		<div class="bigYellowDivider"></div>
		<!-- 新增推薦人按鈕 -->
		<Button
			class="p-button-secondary"
			style="
				margin-top: 32px;
				height: 44px;
				background-color: #f0dfad;
				border: 1px solid #a18b4a;
				color: #736028;
			"
			icon="pi pi-plus"
			:label="$t('新增推薦人')"
			@click="openModal('create')"
		/>
		<!-- 推薦信列表頭(有資料時) -->
		<div
			v-if="letterList[0]?.length"
			class="flex mt-24px font-bold text-[18px]"
		>
			<div class="recTableTitleCol">{{ $t("上傳時間") }}</div>
			<div class="recTableTitleCol">{{ $t("推薦人姓名") }}</div>
			<div class="recTableTitleCol">{{ $t("作業狀態") }}</div>
			<div class="recTableTitleCol">{{ $t("操作") }}</div>
		</div>
		<!-- 畫面顯示(無資料時) -->
		<div v-else class="relative h-150">
			<div class="recNoData">
				<img
					src="/assets/admissionApplicant/Newsletter.png"
					alt="NO DATA"
					style="border-radius: 50%"
				/>
				<div class="text-center font-bold text-[24px] text-[#736028]">
					{{ $t("暫時無推薦人") }}
				</div>
			</div>
		</div>
		<!-- 推薦信列表(有資料時) -->
		<div v-if="letterList[0]?.length !== 0">
			<div v-for="(item, index) in letterList[0]" :key="index">
				<!-- <ConfirmDialog group="templating">
					<template #message="slotProps">
						<div class="flex p-4">
							<i
								:class="slotProps.message.icon"
								style="font-size: 1.5rem"
							></i>
							<p class="pl-2">{{ slotProps.message.message }}</p>
						</div>
					</template>
				</ConfirmDialog> -->
				<!-- 列表收起狀態 -->
				<div v-if="!item.isCollapse" class="recTableRowIncollapse">
					<div class="recTableCol">
						{{ convertTime(item.created_at) }}
					</div>
					<div class="recTableCol">{{ item.name }}</div>
					<div class="recTableCol">{{ $t(item.status) }}</div>
					<div class="recTableButtonCol">
						<Button
							class="p-button-outlined p-button-secondary"
							style="
								border: 2px solid #bcd19b;
								font-size: xx-small;
							"
							icon="pi pi-pencil"
							iconClass="text-[#53565A]"
							@click="handleEdit()"
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
							@click="handleDelete()"
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
						<div class="recTableCol">{{ $t(item.status) }}</div>
						<div class="recTableButtonCol">
							<Button
								class="p-button-outlined p-button-secondary"
								style="
									border: 2px solid #bcd19b;
									font-size: xx-small;
								"
								icon="pi pi-pencil"
								iconClass="text-[#53565A]"
								@click="handleEdit()"
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
								@click="handleDelete()"
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
		</div>
	</div>
</template>

<script setup lang="ts">
import { toRaw, ref, reactive } from "vue";
import { useAdmissionApplicantAuthStore } from "@/stores/universalAuth";
import { AdmissionApplicantAPI } from "@/api/admission/applicant/api";
import { InvalidSessionError } from "@/api/error";
import { useQuery } from "@tanstack/vue-query";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { useConfirm } from "primevue/useconfirm";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import FileUpload from "primevue/fileupload";
import ConfirmDialog from "primevue/confirmdialog";
import "primeicons/primeicons.css";

const { t } = useI18n();
const router = useRouter();

const applicantAuth = useAdmissionApplicantAuthStore();
const api = new AdmissionApplicantAPI(applicantAuth);

// const confirm = useConfirm();

const isAPILoading = ref(false);
const isModalVisible = reactive({
	create: false,
	edit: false,
});

const modalValue = reactive({
	name: "",
	appellation: "",
	relationship: "",
	phone: "",
	email: "",
	organization: "",
	position: "",
	sign: "",
});

const isModalValueBlank = reactive({
	name: false,
	appellation: false,
	relationship: false,
	phone: false,
	email: false,
	organization: false,
	position: false,
	sign: false,
});

const { isLoading, data } = useQuery(["recommendLetterList"], async () => {
	try {
		return await api.getRecommendLetterList();
	} catch (e: any) {
		if (e instanceof InvalidSessionError) {
			console.error(
				"Session has already expired while querying programList"
			);
			router.push("/");
			return;
		}
	}
});

const letterList = reactive([
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

const onUpload = (e: any) => {
	console.log(e, "upload clicked");
};

const openModal = (type: string) => {
	if (type === "create") isModalVisible[type] = true;
	else if (type === "edit") isModalVisible[type] = true;

	isModalValueBlank.name = false;
	isModalValueBlank.appellation = false;
	isModalValueBlank.relationship = false;
	isModalValueBlank.phone = false;
	isModalValueBlank.email = false;
	isModalValueBlank.organization = false;
	isModalValueBlank.position = false;
	isModalValueBlank.sign = false;
};

const handleEdit = () => {
	console.log("edit button clicked");
};

const handleDelete = () => {
	// confirm.require({
	// 	group: "templating",
	// 	message: t("確認刪除"),
	// 	header: t("確認"),
	// 	icon: "pi pi-exclamation-triangle",
	// 	acceptIcon: "pi pi-check",
	// 	rejectIcon: "pi pi-times",
	// 	accept: () => {
	// 		console.log("accepted");
	// 	},
	// 	reject: () => {
	// 		console.log("rejected");
	// 	},
	// });
	console.log("delete button clicked");
};

const handleSave = () => {
	console.log("save button clicked");
};

const handleSend = () => {
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
	console.log("send button clicked");
};
console.log(letterList, "here");
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
</style>
