<template>
	<div class="pt-62px pl-128px pr-128px">
		<div class="font-medium text-32px">{{ $t("申請上傳欄位") }}</div>
		<div class="bigRedDivider"></div>
		<div class="p-fluid">
			<SelectButton
				class="mt-8px"
				v-model="activeTab"
				:options="tabOptions"
				optionLabel="name"
				aria-labelledby="single"
			>
			</SelectButton>
		</div>
		<div v-if="activeTab.value === 1">
			<div class="mt-16px">
				<div>
					<Checkbox
						inputId="nameInfo"
						v-model="nameInfo"
						:binary="true"
					/>
					<label
						for="nameInfo"
						class="ml-8px text-24px font-medium"
						>{{ $t("姓名資訊") }}</label
					>
				</div>
				<div class="flex mt-40px">
					<div class="w-1/3 pl-16px">{{ $t("※ 稱謂/後綴") }}</div>
					<div class="w-1/3 pl-16px">{{ $t("※ 中文姓氏/名字") }}</div>
					<div class="w-1/3 pl-16px">
						{{ $t("※ 英文姓氏/中間名/名字") }}
					</div>
				</div>
				<ParagraphDivider />
			</div>
			<div class="mt-16px">
				<div>
					<Checkbox
						inputId="permanentAd"
						v-model="permanentAd"
						:binary="true"
					/>
					<label
						for="permanentAd"
						class="ml-8px text-24px font-medium"
						>{{ $t("戶籍資訊") }}</label
					>
				</div>
				<div class="flex mt-40px">
					<div class="w-1/3 pl-16px">{{ $t("※ 國家/州") }}</div>
					<div class="w-1/3 pl-16px">{{ $t("※ 城市/郵遞區號") }}</div>
					<div class="w-1/3 pl-16px">{{ $t("※ 街道地址") }}</div>
				</div>
				<ParagraphDivider />
			</div>
			<div class="mt-16px">
				<div>
					<Checkbox
						inputId="mailingAd"
						v-model="mailingAd"
						:binary="true"
					/>
					<label
						for="mailingAd"
						class="ml-8px text-24px font-medium"
						>{{ $t("現居地址") }}</label
					>
				</div>
				<div class="flex mt-40px">
					<div class="w-1/3 pl-16px">{{ $t("※ 國家/州") }}</div>
					<div class="w-1/3 pl-16px">{{ $t("※ 城市/郵遞區號") }}</div>
					<div class="w-1/3 pl-16px">{{ $t("※ 街道地址") }}</div>
				</div>
				<ParagraphDivider />
			</div>
			<div class="mt-16px">
				<div>
					<Checkbox
						inputId="basicIdentityInfo"
						v-model="basicIdentityInfo"
						:binary="true"
					/>
					<label
						for="basicIdentityInfo"
						class="ml-8px text-24px font-medium"
						>{{ $t("身份資料") }}</label
					>
				</div>
				<div class="flex mt-40px">
					<div class="w-1/4 pl-16px">
						{{ $t("※ 法定性別/ 性別認同") }}
					</div>
					<div class="w-1/4 pl-16px">{{ $t("※ 出生國") }}</div>
					<div class="w-1/4 pl-16px">{{ $t("※ 主要國籍") }}</div>
					<div class="w-1/4 pl-16px">{{ $t("※ 出生日期") }}</div>
				</div>
				<ParagraphDivider />
			</div>
		</div>
		<div v-else-if="activeTab.value === 2">
			<div class="mt-16px">
				<div>
					<Checkbox
						inputId="teachingExp"
						v-model="teachingExpChecked"
						:binary="true"
					/>
					<label
						for="schoolExp"
						class="ml-8px text-24px font-medium"
						>{{ $t("教學經歷") }}</label
					>
				</div>
				<div class="flex mt-40px">
					<div class="pl-16px">{{ $t("※ 檔案上傳") }}</div>
				</div>
				<ParagraphDivider />
			</div>
			<div class="mt-16px">
				<div>
					<Checkbox
						inputId="score"
						v-model="scoreChecked"
						:binary="true"
					/>
					<label for="score" class="ml-8px text-24px font-medium">{{
						$t("考試與檢定分數")
					}}</label>
				</div>
				<div class="flex mt-40px">
					<div class="pl-16px">{{ $t("※ 檔案上傳") }}</div>
				</div>
				<ParagraphDivider />
			</div>
			<div class="mt-16px">
				<div>
					<Checkbox
						inputId="other"
						v-model="otherChecked"
						:binary="true"
					/>
					<label for="other" class="ml-8px text-24px font-medium">{{
						$t("其他有利於審查資料")
					}}</label>
				</div>
				<div class="flex mt-40px">
					<div class="w-1/3 pl-16px">{{ $t("※ 國家/州") }}</div>
					<div class="w-1/3 pl-16px">{{ $t("※ 城市/郵遞區號") }}</div>
					<div class="w-1/3 pl-16px">{{ $t("※ 街道地址") }}</div>
				</div>
				<ParagraphDivider />
			</div>
		</div>
		<div class="mt-100px">
			<div class="bigRedDivider"></div>
		</div>
		<div class="flex mt-24px">
			<div class="m-auto">
				<div class="flex">
					<Button class="bg-white h-60px w-140px border-ntnuRed">
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
import ParagraphDivider from "/src/styles/paragraphDivider.vue";
import "primeicons/primeicons.css";
import SelectButton from "primevue/selectbutton";
import Checkbox from "primevue/checkbox";
import Button from "primevue/button";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const translation = {
	basicCol: t("基本資料欄位"),
	attachmentCol: t("檢附資料欄位"),
};
const activeTab = ref({ name: translation.basicCol, value: 1 });
const tabOptions = ref([
	{ name: translation.basicCol, value: 1 },
	{ name: translation.attachmentCol, value: 2 },
]);
const teachingExpChecked = ref(false);
const scoreChecked = ref(false);
const otherChecked = ref(false);
const nameInfo = ref(false);
const permanentAd = ref(false);
const mailingAd = ref(false);
const basicIdentityInfo = ref(false);
</script>

<style setup lang="css">
.bg-Green {
	background-color: #bcd19b;
}
.bg-darkBlue {
	background-color: #07385a;
}
.bg-white {
	background-color: #ffffff;
}
</style>
