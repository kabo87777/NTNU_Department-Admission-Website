<template>
	<div>
		<div style="position: fixed; top: 0; width: 100%; z-index: 10">
			<NavBar :showSwitchLang="false" />
		</div>
		<div style="margin-top: 60px; padding: 60px 20%">
			<div class="text-28px font-bold">推薦人您好 Hello Recommender</div>
			<div class="bigRedDivider"></div>
			<div class="contentContainer">
				<div>
					<div>請上傳簽名檔</div>
					<div>Please upload your signature</div>
				</div>
				<div v-if="fileName === ''" class="mt-4px" style="width: 85%">
					<FileUpload
						style="
							background-color: #bdbdbd;
							color: black;
							border: #bdbdbd;
						"
						chooseLabel="選擇檔案 Choose File"
						mode="basic"
						:customUpload="true"
						@uploader="onUpload"
						:maxFileSize="5000000"
						:fileLimit="1"
						accept=".pdf"
					>
					</FileUpload>
				</div>
				<Button
					v-else
					style="
						background-color: #bdbdbd;
						color: black;
						border: #bdbdbd;
						margin-top: 4px;
					"
					disabled
				>
					{{ fileName }}
				</Button>
			</div>
			<div class="contentContainer">
				<div>
					<div>請輸入推薦信内容</div>
					<div>Please fill in recommend letter below</div>
				</div>
				<Textarea
					style="
						width: 100%;
						max-width: 100%;
						height: 300px;
						margin-top: 4px;
						border-radius: 12px;
					"
					v-model="content"
				/>
			</div>
			<div class="bigRedDivider" style="margin-top: 24px"></div>
			<div style="margin-top: 16px; margin-left: 100%">
				<Dialog
					v-model:visible="isModalVisible"
					style="width: 600px"
					:closable="false"
					:draggable="false"
					:modal="true"
				>
					<template #header>
						<div class="font-bold text-[24px]">
							送出推薦信 Send Recommend Letter
						</div>
					</template>
					<template #default>
						<div class="flex">
							<div class="mt-2px">
								<i
									class="pi pi-question-circle"
									style="font-size: 24px; margin-top: 8px"
								/>
							</div>
							<div class="ml-8px">
								<div>確認送出?</div>
								<div>Are you sure to send?</div>
							</div>
						</div>
					</template>
					<template #footer>
						<Button
							class="p-button-outlined p-button-secondary"
							style="
								border: 2px solid #a18b4a;
								color: #736028;
								height: 40px;
								width: 40px;
							"
							icon="pi pi-times"
							iconClass="text-[#736028]"
							@click="isModalVisible = false"
						/>
						<Button
							class="p-button-outlined p-button-secondary"
							style="
								color: #53565a;
								border: 2px solid #bcd19b;
								margin-left: 16px;
								height: 40px;
								width: 40px;
							"
							icon="pi pi-check"
							iconClass="text-[#53565A]"
							:loading="isSending"
						/>
					</template>
				</Dialog>
				<Button
					class="p-button-outlined p-button-secondary"
					style="
						transform: translateX(-100%);
						border: 2px solid #bcd19b;
						height: 44px;
						width: max-content;
						background-color: #f0dfad;
						border: 2px solid #a18b4a;
						color: #736028;
					"
					icon="pi pi-save"
					iconClass="text-[#53565A]"
					label="儲存 Save"
					@click="isModalVisible = true"
				/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useToast } from "primevue/usetoast";
import NavBar from "@/components/NavBar.vue";
import Textarea from "primevue/textarea";
import Button from "primevue/button";
import FileUpload, { FileUploadUploaderEvent } from "primevue/fileupload";
import Dialog from "primevue/dialog";

const formData = new FormData();
const fileName = ref("");
const content = ref("");
const isSending = ref(false);
const isModalVisible = ref(false);

const toast = useToast();

const onUpload = (event: FileUploadUploaderEvent) => {
	const uploadedFile = Array.isArray(event.files)
		? event.files[0]
		: event.files;
	formData.append("filepath", uploadedFile);
	fileName.value = uploadedFile.name;
};

const handleSend = async () => {
	isSending.value = true;
	isModalVisible.value = false;
};
</script>

<style setup lang="css">
.contentContainer {
	margin: auto;
	margin-top: 20px;
	padding: 24px 32px;
	font-size: 18px;
	font-weight: 600;
	border: 3px dashed rgb(174, 174, 174);
	border-radius: 16px;
	background-color: rgb(244, 244, 244);
}
</style>
