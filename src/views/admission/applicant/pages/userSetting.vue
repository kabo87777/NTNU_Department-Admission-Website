<template>
	<div>
		<div class="font-[500] text-[32px] font-bold">
			{{ $t("使用者管理") }}
		</div>
		<div class="bigYellowDivider"></div>
		<div class="mt-8px px-12px py-24px">
			<div class="text-[20px] font-[350]">
				{{ $t("帳號名稱") }}{{ $t(":") }}{{ " " }}name
			</div>
			<div class="mt-36px text-[20px] font-[350]">
				{{ $t("聯絡信箱") }}{{ $t(":") }}{{ " " }}email
			</div>
			<div class="mt-36px text-[20px] font-[350]">
				{{ $t("手機號碼") }}{{ $t(":") }}{{ " " }}09123456789
			</div>
		</div>
		<ParagraphDivider class="mt-12px" />
		<div class="mt-20px font-[500] font-bold text-[24px] flex">
			<div>{{ $t("修改密碼") }}</div>
			<i class="pi pi-lock ml-16px mt-4px text-[#C6BCD0]" />
		</div>
		<div class="mt-8px px-12px py-24px">
			<div class="w-[50%]">{{ $t("請輸入舊密碼") }}{{ $t(":") }}</div>
			<div class="w-[50%]">
				<InputText class="w-[70%] h-40px !mt-4px" type="password" />
			</div>
			<div class="flex mt-24px">
				<div class="w-[50%]">
					<div>{{ $t("設定新密碼") }}{{ $t(":") }}</div>
					<div>
						<InputText
							class="w-[70%] h-40px !mt-4px"
							type="password"
						/>
					</div>
				</div>
				<div class="w-[50%]">
					<div>{{ $t("確認密碼") }}{{ $t(":") }}</div>
					<div>
						<InputText
							class="w-[70%] h-40px !mt-4px"
							type="password"
						/>
					</div>
				</div>
			</div>
			<Button
				class="p-button-sm p-button-secondary p-button-outlined !mt-24px"
			>
				<i class="pi pi-pencil" />
				<p class="ml-8px text-16px font-[500] font-bold">
					{{ $t("修改送出") }}
				</p>
			</Button>
		</div>
	</div>
</template>

<script setup lang="ts">
import ParagraphDivider from "../../../../styles/paragraphDividerApplicant.vue";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import "primeicons/primeicons.css";
</script>
