<template>
	<div>
		{{ $t("審查評分欄位") }}
		<div>
			<SelectButton
				v-model="selectStage"
				:options="stage"
				optionLabel="name"
			/>
		</div>
	</div>
	<Divider />
	<div>
		{{ $t("評分設定") }}
		<div>
			<div>
				{{ $t("評分項目一名稱：") }}
				{{ $t("評分項目一分數佔比：") }}
			</div>
			<InputText />
			<InputText />
		</div>
		<div>
			<div>
				{{ $t("評分項目二名稱：") }}
				{{ $t("評分項目二分數佔比：") }}
			</div>
			<InputText />
			<InputText />
		</div>
		<div>
			<div>
				{{ $t("評分項目三名稱：") }}
				{{ $t("評分項目三分數佔比：") }}
			</div>
			<InputText />
			<InputText />
		</div>
	</div>
	<div>
		{{ $t("顯示欄位：基本資料") }}
		<div>
			<div>
				<Checkbox />
				{{ $t("姓名資訊") }}
			</div>
			<div>
				<Checkbox />
				{{ $t("入學身份") }}
			</div>
			<div>
				<Checkbox />
				{{ $t("戶籍資訊") }}
			</div>
			<div>
				<Checkbox />
				{{ $t("現居資訊") }}
			</div>
			<div>
				<Checkbox />
				{{ $t("身份資料") }}
			</div>
			<div>
				<Checkbox />
				{{ $t("聯絡方式") }}
			</div>
			{{ $t("國家/州") }}
			{{ $t("城市/郵遞區號") }}
			{{ $t("街道地址") }}
		</div>
	</div>
	<div>
		{{ $t("顯示欄位：檢附資料") }}
	</div>
	<div>
		<Checkbox :binary="true" m-model="enrollProver" />
		{{ $t("就學證明") }}
	</div>
	<div>
		<Checkbox :binary="true" m-model="enrollProver" />
		{{ $t("考試與其他分數") }}
	</div>
	<div>
		<Checkbox :binary="true" m-model="enrollProver" />
		{{ $t("其他有利於審查之資料") }}
	</div>
	<Divider />
	<div>
		<Button label="取消變更" class="p-button-sm" />
		<Button label="設定儲存" class="p-button-sm" />
	</div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import Checkbox from "primevue/checkbox";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import SelectButton from "primevue/selectbutton";

const selectStage = ref(true);
const stage = reactive([
	{ name: "第一階段（書面審查）" },
	{ name: "第二階段（口試審查）" },
]);
const enrollProver = ref();
</script>
