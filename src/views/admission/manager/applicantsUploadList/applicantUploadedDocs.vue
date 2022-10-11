<template>
	<div class="ml-128px">
		<div class="bigRedDivider"></div>
		<div class="p-fluid">
			<SelectButton
				class="mt-8px"
				v-model="activeTab"
				:options="tabs"
				optionLabel="name"
				aria-labelledby="single"
			>
				<template #option="slotProps">
					<p class="">{{ slotProps.option.name }}</p>
				</template>
			</SelectButton>
		</div>
		<div class="mt-8px" v-show="activeTab.value === 1">
			<BasicInfo :userId="1" />
		</div>
		<div class="mt-8px" v-show="activeTab.value === 2">
			<AttachmentInfo :userId="1" />
		</div>
		<div class="mt-8px" v-show="activeTab.value === 3">
			<AdditionalInfo :userId="1" />
		</div>
	</div>
</template>

<script setup lang="ts">
import BasicInfo from "./reviewTabs/basicInfo.vue";
import AttachmentInfo from "./reviewTabs/attachmentInfo.vue";
import AdditionalInfo from "./reviewTabs/additionalInfo.vue";
import SelectButton from "primevue/selectbutton";
import "../../../../styles/customize.css";
import { ref } from "vue";

const activeTab = ref({ name: "基本資料欄位", value: 1 });
const tabs = ref([
	{ name: "基本資料欄位", value: 1 },
	{ name: "檢附資料欄位", value: 2 },
	{ name: "補件系統欄位", value: 3 },
]);
</script>
