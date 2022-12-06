<template>
	<div class="relative mt-16px flex">
		<Dialog
			v-model:visible="isModalVisible"
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
					:label="$t('取消')"
					@click="isModalVisible = false"
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
					:label="$t('確認')"
					@click="handleDelete()"
				/>
			</template>
		</Dialog>
		<div class="text-20px text-[#53565A] pt-16px">
			{{ $t(props.category) }}{{ " - " }}{{ props.order }}
		</div>
		<div class="absolute" style="right: 0px">
			<Button
				class="p-button-outlined !h-40px"
				style="border: 2px solid #a4bcc2"
				@click="handleEdit"
			>
				<div>
					<i
						class="pi pi-pencil"
						style="color: rgba(83, 86, 90, 1)"
					/>
				</div>
				<div
					class="mt-[-2px] ml-8px text-18px text-[#53565A] font-bold"
				>
					{{ $t("編輯") }}
				</div>
			</Button>
			<Button
				class="p-button-outlined !h-40px"
				style="border: 2px solid #93282c; margin-left: 16px"
				:loading="isDeleteLoading"
				@click="isModalVisible = true"
			>
				<div>
					<i
						class="pi pi-times"
						style="color: rgba(135, 75, 82, 1)"
					/>
				</div>
				<div
					class="mt-[-2px] ml-8px text-18px text-[#874B52] font-bold"
				>
					{{ $t("刪除") }}
				</div>
			</Button>
		</div>
	</div>
	<div class="normalDivider mt-16px"></div>
	<div class="mt-16px font-medium text-16px">
		{{ $t("項目名稱") }}{{ $t(":") }}{{ props.itemName }}
	</div>
	<div
		v-if="props.category === '就學經歷' || props.category === '教學經歷'"
		class="mt-8px font-medium text-16px"
	>
		{{ $t("所屬學校") }}{{ $t(":") }}{{ props.schoolName }}
	</div>
	<div
		v-if="props.category === '考試與檢定分數'"
		class="mt-8px font-medium text-16px"
	>
		{{ $t("考試與檢定分數") }}{{ $t(":") }}{{ props.score }}
	</div>
	<div class="mt-8px font-medium text-16px">【{{ $t("檔案名稱") }}】</div>
	<div>【{{ $t("檔案") }}】{{ sliceFile() }}</div>
	<div class="font-[350]">{{ $t("onlyPdf") }}</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import "primeicons/primeicons.css";

const props = defineProps([
	"itemId",
	"category",
	"identity",
	"itemName",
	"fileUrl",
	"order",
	"schoolName",
	"score",
	"isDeleteLoading",
]);

const emit = defineEmits(["edit", "delete"]);

const isModalVisible = ref(false);

const sliceFile = () => {
	if (props.fileUrl !== null) {
		const str = decodeURI(props?.fileUrl);
		const index = str.lastIndexOf("/");
		const file = str.slice(index + 1);
		return file;
	}
};

const handleEdit = () => {
	emit("edit", props.order - 1, props.category);
};

const handleDelete = () => {
	emit("delete", props.itemId);
};
</script>
