<template>
	<div class="ml-128px">
		<h1 class="text-4xl text-bold tracking-widest">
			{{ $t("評分資料列表") }}
		</h1>
		<div class="bigRedDivider"></div>
		<SelectButton
			class="mt-8px h-45px !w-1280px"
			v-model="currentTab"
			:options="tabOptions"
			aria-labelledby="single"
		/>
		<div v-if="currentTab === '第一階段 (書面審查)'">
			第一階段 (書面審查)
		</div>
		<div v-if="currentTab === '第二階段 (口試審查)'">
			第二階段 (口試審查)
		</div>
		<div v-if="currentTab === '錄取名單'">錄取名單</div>
	</div>
</template>

<script setup lang="ts">
import "@/styles/customize.css";
import "primeicons/primeicons.css";
import SelectButton from "primevue/selectbutton";
import { ref } from "vue";

const currentTab = ref("第一階段 (書面審查)");
const tabOptions = ref([
	"第一階段 (書面審查)",
	"第二階段 (口試審查)",
	"錄取名單",
]);
</script>
