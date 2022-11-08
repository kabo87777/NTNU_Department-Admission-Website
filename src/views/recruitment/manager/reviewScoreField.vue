<template>
	<div class="ml-128px mr-128px mt-62px">
		<h1 class="text-4xl text-bold tracking-widest">
			{{ $t("審查評分欄位") }}
		</h1>
		<div class="bigRedDivider"></div>
		<div class="mt-20px text-2xl">
			{{ $t("必閱基本資料") }}
		</div>
		<div class="mt-24px">
			<div class="flex mt-40px text-blackLight">
				<div class="w-1/3 pl-16px">{{ $t("※ 國家/州") }}</div>
				<div class="w-1/3 pl-16px">{{ $t("※ 城市/郵遞區號") }}</div>
				<div class="w-1/3 pl-16px">{{ $t("※ 街道地址") }}</div>
			</div>
		</div>
		<ParagraphDivider />
		<div class="mt-20px text-2xl">
			{{ $t("必閱檢附資料") }}
		</div>
		<div class="mt-24px">
			<Checkbox :binary="true" v-model="enrollProver"> </Checkbox>
			<label for="enrollProver" class="ml-8px text-s text-blackLight">{{
				$t("教學證明")
			}}</label>
		</div>
		<div class="bigRedDivider"></div>
		<div class="flex mt-24px">
			<div class="m-auto">
				<div class="flex">
					<Button
						class="bg-white h-60px w-140px border-ntnuRed p-button-outlined"
					>
						<i
							class="ml-1 mr-2 box-border text-sm text-ntnuRed pi pi-times"
						></i>
						<div class="m-auto text-sm text-ntnuRed tracking-2">
							<div>{{ $t("取消變更") }}</div>
						</div>
					</Button>
					<div class="w-24px"></div>
					<Button class="bg-Green h-60px w-140px border-ntnuRed">
						<i
							class="ml-1 mr-2 box-border text-sm text-black pi pi-check"
						></i>
						<div class="m-auto text-sm text-black tracking-2">
							<div>{{ $t("儲存設定") }}</div>
						</div>
					</Button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import ParagraphDivider from "../../../styles/paragraphDivider.vue";
import { reactive, ref } from "vue";
import Checkbox from "primevue/checkbox";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import SelectButton from "primevue/selectbutton";

const enrollProver = ref();
const selectStage = ref(true);
const stage = reactive([
	{ name: "第一階段（書面審查）" },
	{ name: "第二階段（口試審查）" },
]);
</script>
