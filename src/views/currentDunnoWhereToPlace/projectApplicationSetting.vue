<template>
	<div class="pt-62px pl-128px pr-128px">
		<div class="font-medium text-32px">申請上傳欄位</div>
		<div class="bigRedDivider"></div>
		<SelectButton
			class="mt-8px"
			v-model="currentTab"
			:options="tabOptions"
			aria-labelledby="single"
		/>
		<div v-if="currentTab === '基本資料欄位'">wait for it</div>
		<div v-else-if="currentTab === '檢附資料欄位'">
			<div class="mt-16px">
				<div>
					<Checkbox
						inputId="schoolExp"
						v-model="schoolExpChecked"
						:binary="true"
					/>
					<label for="schoolExp" class="ml-8px text-24px font-medium"
						>就學經歷</label
					>
				</div>
				<div class="flex mt-40px">
					<div class="w-1/3 pl-16px">※ 稱謂/後綴</div>
					<div class="w-1/3 pl-16px">※ 中文姓氏/名字</div>
					<div class="w-1/3 pl-16px">※ 英文姓氏/中間名/名字</div>
				</div>
				<div class="flex relative mt-40px">
					<div class="smallRedDivider"></div>
					<div class="smallRedDivider absolute right-0"></div>
				</div>
			</div>
			<div class="mt-16px">
				<div>
					<Checkbox
						inputId="score"
						v-model="scoreChecked"
						:binary="true"
					/>
					<label for="score" class="ml-8px text-24px font-medium"
						>考試與檢定分數</label
					>
				</div>
				<div class="flex mt-40px">
					<div class="w-1/3 pl-16px">※ 國家/州</div>
					<div class="w-1/3 pl-16px">※ 城市/郵遞區號</div>
					<div class="w-1/3 pl-16px">※ 街道地址</div>
				</div>
				<div class="flex relative mt-40px">
					<div class="smallRedDivider"></div>
					<div class="smallRedDivider absolute right-0"></div>
				</div>
			</div>
			<div class="mt-16px">
				<div>
					<Checkbox
						inputId="other"
						v-model="otherChecked"
						:binary="true"
					/>
					<label for="other" class="ml-8px text-24px font-medium"
						>其他有利於審查資料</label
					>
				</div>
				<div class="flex mt-40px">
					<div class="w-1/3 pl-16px">※ 國家/州</div>
					<div class="w-1/3 pl-16px">※ 城市/郵遞區號</div>
					<div class="w-1/3 pl-16px">※ 街道地址</div>
				</div>
				<div class="flex relative mt-40px">
					<div class="smallRedDivider"></div>
					<div class="smallRedDivider absolute right-0"></div>
				</div>
			</div>
			<div class="mt-16px">
				<div>
					<Checkbox
						inputId="identity"
						v-model="identityChecked"
						:binary="true"
					/>
					<label for="identity" class="ml-8px text-24px font-medium"
						>身份資料</label
					>
				</div>
				<div class="flex mt-40px">
					<div class="w-1/3 pl-16px">※ 法定性別/ 性別認同</div>
					<div class="w-1/3 pl-16px">※ 城市/郵遞區號</div>
					<div class="w-1/3 pl-16px">※ 街道地址</div>
				</div>
			</div>
		</div>
		<div class="mt-100px">
			<div class="bigRedDivider"></div>
		</div>
		<div class="flex mt-24px">
			<div class="m-auto">
				<div class="flex">
					<Button
						label="取消變更"
						icon="pi pi-times"
						class="p-button-outlined"
					/>
					<div class="w-24px"></div>
					<Button
						label="儲存設定"
						icon="pi pi-check"
						class="p-button"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import "../../styles/customize.css";
import "primeicons/primeicons.css";
import SelectButton from "primevue/selectbutton";
import Checkbox from "primevue/checkbox";
import Button from "primevue/button";
import { ref } from "vue";

const currentTab = ref("基本資料欄位");
const tabOptions = ref(["基本資料欄位", "檢附資料欄位"]);
const schoolExpChecked = ref(false);
const scoreChecked = ref(false);
const otherChecked = ref(false);
const identityChecked = ref(false);
</script>
