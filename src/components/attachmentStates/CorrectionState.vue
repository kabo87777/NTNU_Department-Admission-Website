<template>
	<div :class="dynamicClass()">
		<div class="p-[12px] w-9/10">
			<Dialog
				v-model:visible="isModalVisible"
				style="width: 500px"
				:closable="false"
				:draggable="false"
				:modal="true"
			>
				<template #header>
					<div class="font-bold text-[24px]">
						{{ $t("確認") }}
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
						:label="$t('取消')"
						@click="isModalVisible = false"
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
						:label="$t('確認')"
						:loading="isEditLoading"
						@click="handleEdit"
					/>
				</template>
			</Dialog>
			<div class="font-[350]">{{ $t("項目名稱") }}{{ $t(":") }}</div>
			<InputText
				style="margin-top: 8px; border: 1px solid; width: 30%"
				v-model="name"
			/>
			<div
				v-if="
					props.category === '就學經歷' ||
					props.category === '教學經歷'
				"
				class="font-[350] mt-16px"
			>
				{{ $t("所屬學校") }}{{ $t(":") }}
			</div>
			<InputText
				v-if="
					props.category === '就學經歷' ||
					props.category === '教學經歷'
				"
				style="margin-top: 8px; border: 1px solid; width: 30%"
				v-model="schoolName"
			/>
			<div
				v-if="props.category === '考試與檢定分數'"
				class="font-[350] mt-16px"
			>
				{{ $t("分數") }}{{ $t(":") }}
			</div>
			<InputNumber
				v-if="props.category === '考試與檢定分數'"
				style="
					margin-top: 8px;
					border: 1px solid;
					width: 30%;
					border-radius: 8px;
				"
				v-model="score"
			/>
			<div
				class="normalDivider"
				style="width: 85%; margin-top: 16px"
			></div>
			<!-- <div v-if="file.name === ''" class="mt-16px" style="width: 85%">
				<FileUpload
					style="
						background-color: #bdbdbd;
						color: black;
						border: #bdbdbd;
					"
					:chooseLabel="$t('選擇檔案')"
					mode="basic"
					:customUpload="true"
					@uploader="handleUpload"
					:maxFileSize="5000000"
					:fileLimit="1"
					accept=".pdf"
				>
				</FileUpload>
			</div> -->
			<Button
				style="
					background-color: #bdbdbd;
					color: black;
					border: #bdbdbd;
					margin-top: 16px;
				"
				disabled
			>
				{{ sliceFile() }}
			</Button>
			<p class="mt-16px">{{ $t("onlyPdf") }}</p>
		</div>
		<div
			class="bg-[#ECECEB] w-1/10"
			style="
				border-top-right-radius: 8px;
				border-bottom-right-radius: 8px;
				position: relative;
			"
		>
			<div
				style="
					position: absolute;
					top: 50%;
					transform: translate(-50%, -50%);
					left: 50%;
				"
			>
				<div>
					<Button
						class="p-button-outlined"
						style="border: 2px solid #bcd19b"
						icon="pi pi-check"
						iconClass="text-[#53565A]"
						@click="isModalVisible = true"
					/>
				</div>
				<div class="mt-16px">
					<Button
						class="p-button-outlined"
						style="border: 2px solid #93282c"
						icon="pi pi-times"
						iconClass="text-[#93282C]"
						@click="handleCancel"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import Dialog from "primevue/dialog";
import "primeicons/primeicons.css";

const props = defineProps([
	"category",
	"identity",
	"order",
	"itemId",
	"itemName",
	"schoolName",
	"score",
	"isEditLoading",
	"fileUrl",
]);

const name = ref(props.itemName);
const schoolName = ref(props.schoolName);
const score = ref(props.score);
let file = reactive({
	fileUrl: "",
	name: "",
	size: 0,
	type: "",
	isUploaded: false,
});

const isModalVisible = ref(false);

const emit = defineEmits(["cancel", "correction"]);

const dynamicClass = (): string => {
	switch (props.identity) {
		case "admissionManager":
			return "admissionManagerCreateState";
		case "admissionApplicant":
			return "admissionApplicantCreateState";
	}
	return "";
};

const handleUpload = (event: any) => {
	//event.files == files to upload
	file.fileUrl = event.files[0].objectURL;
	file.name = event.files[0].name;
	file.size = event.files[0].size;
	file.type = event.files[0].type;
	file.isUploaded = true;
};

const handleCancel = () => {
	emit("cancel", props.order - 1, props.category);
};

const sliceFile = () => {
	if (props.fileUrl !== null) {
		const str = decodeURI(props?.fileUrl);
		const index = str.lastIndexOf("/");
		const file = str.slice(index + 1);
		return file;
	}
};

const handleEdit = () => {
	const body = {
		name: name.value,
		category: props.category,
		filepath: file.fileUrl,
		school:
			props.category === "就學經歷" || props.category === "教學經歷"
				? schoolName.value
				: null,
		score: props.category === "考試與檢定分數" ? score.value : null,
	};

	emit("correction", body, props.itemId);
};
</script>

<style setup lang="css">
.admissionManagerEditState {
	margin-top: 24px;
	border: 1px solid #874b52;
	border-radius: 8px;
	display: flex;
}

.admissionApplicantEditState {
	margin-top: 24px;
	border: 1px solid #736028;
	border-radius: 8px;
	display: flex;
}
</style>
