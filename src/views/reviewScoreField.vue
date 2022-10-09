<template>
	<div>
		{{ $t("審查評分欄位") }}
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
				<Checkbox />
				<Checkbox />
				<Checkbox />
				<Checkbox />
				<Checkbox />
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
	<Divider />
	<div>
		<Button label="取消變更" class="p-button-sm" />
		<Button label="設定儲存" class="p-button-sm" />
	</div>
</template>

<script lang="ts">
import { ref } from "vue";

export default {
	setup() {
		const enrollProver = ref();
		return {
			enrollProver,
		};
	},
};
</script>
