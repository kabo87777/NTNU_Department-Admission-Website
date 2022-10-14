<template>
	<div class="ml-128px">
		<div class="flex">
			<div class="mt-8px text-20px">
				<router-link to="/admission/manager/applicantsUploadList"
					><i class="pi pi-chevron-left"></i
					>{{ $t("上傳資料列表") }}</router-link
				>
			</div>
			<div class="ml-24px font-medium text-32px">
				{{ route.params.accId }} name
			</div>
		</div>
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
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import BasicInfo from "./reviewTabs/basicInfo.vue";
import AttachmentInfo from "./reviewTabs/attachmentInfo.vue";
import AdditionalInfo from "./reviewTabs/additionalInfo.vue";
import SelectButton from "primevue/selectbutton";
import "primeicons/primeicons.css";
import "../../../../styles/customize.css";

const route = useRoute();
const activeTab = ref({ name: "基本資料欄位", value: 1 });
const tabs = ref([
	{ name: "基本資料欄位", value: 1 },
	{ name: "檢附資料欄位", value: 2 },
	{ name: "補件系統欄位", value: 3 },
]);

onMounted(() => {
	console.log(route.params);
});
</script>
