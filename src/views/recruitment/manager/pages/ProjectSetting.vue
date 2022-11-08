<template>
	<div>
		<h1 class="text-4xl text-bold tracking-widest">{{ $t("專案設定") }}</h1>
		<Divider class="bg-ntnuRed" />
		<h2 class="text-2xl text-bold tracking-widest inline-block">
			{{ $t("111年教授徵聘 A 組") }}
		</h2>
		<Button
			class="w-110px h-40px !ml-20px p-button-outlined p-button-success"
		>
			<img
				alt="logo"
				src="/assets/project-setting/Check_fill.png"
				style="width: 1.5rem"
				class="fill-green-500"
			/>
			<span class="tracking-1px">{{ $t("保存") }}</span>
		</Button>
		<Button
			class="w-110px h-40px !ml-20px p-button-outlined p-button-danger"
		>
			<img
				alt="logo"
				src="/assets/project-setting/Close_round.png"
				style="width: 1.5rem"
				class="fill-green-500"
			/>
			<span class="tracking-1px">{{ $t("刪除") }}</span>
		</Button>
		<h3 class="text-xs tracking-widest text-gray-500">
			2022/09/15 · {{ $t("新增到專案") }}
		</h3>
		<h5 class="text-base tracking-widest mt-30px mb-10px">
			{{ $t("專案名稱 (修改)") }} :
		</h5>
		<InputText
			type="text"
			v-model="profect_name"
			class="w-960px h-44px mt-10px"
		/>
		<div>
			<!-- <h5 class="text-base tracking-widest mt-30px">
				{{ $t("屬性") }} :
			</h5>
			<Dropdown
				v-model="selected_type"
				:options="types"
				optionLabel="type_name"
				optionValue="type_name"
				class="!w-320px !h-44px mt-10px"
			/> -->
		</div>
		<div class="inline-block">
			<h5 class="text-base tracking-widest mt-30px">
				{{ $t("申請端開放時間/日期") }} :
			</h5>
			<Calendar
				inputId="icon"
				v-model="application_start_time"
				:showIcon="true"
				:showTime="true"
				class="w-320px h-44px mt-10px"
			/>
		</div>
		<div class="inline-block ml-100px">
			<h5 class="text-base tracking-widest mt-30px">
				{{ $t("申請端關閉時間/日期") }} :
			</h5>
			<Calendar
				inputId="icon"
				v-model="application_end_time"
				:showIcon="true"
				:showTime="true"
				class="w-320px h-44px mt-10px"
			/>
		</div>
		<br />
		<div class="inline-block">
			<h5 class="text-base tracking-widest mt-30px">
				{{ $t("審查端開放時間/日期") }} :
			</h5>
			<Calendar
				inputId="icon"
				v-model="review_stage1_start_time"
				:showIcon="true"
				:showTime="true"
				class="w-320px h-44px mt-10px"
			/>
		</div>
		<div class="inline-block ml-100px">
			<h5 class="text-base tracking-widest mt-30px">
				{{ $t("審查端關閉時間/日期") }} :
			</h5>
			<Calendar
				inputId="icon"
				v-model="review_stage1_end_time"
				:showIcon="true"
				:showTime="true"
				class="w-320px h-44px mt-10px"
			/>
		</div>
		<br />
		<div>
			<Checkbox
				inputId="binary"
				v-model="checked"
				:binary="true"
				class="!align-top mt-30px"
			/>
			<h5
				class="text-base tracking-widest mt-30px ml-10px align-top inline-block"
			>
				{{ $t("專案詳細") }} :
			</h5>
			<Textarea
				v-model="project_details"
				rows="5"
				cols="30"
				class="w-950px h-320px !mt-30px !ml-10px"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import Divider from "primevue/divider";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import { ref } from "vue";
import Dropdown from "primevue/dropdown";
import Calendar from "primevue/calendar";
import Textarea from "primevue/textarea";
import Checkbox from "primevue/checkbox";

const profect_name = ref<string>("教授徵聘 A 組");
const selected_type = ref({});
const types = ref([
	{ type_name: "教授徵聘 A 組" },
	{ type_name: "教授徵聘 B 組" },
	{ type_name: "教授徵聘 C 組" },
]);
const application_start_time = ref();
const application_end_time = ref();
const review_stage1_start_time = ref();
const review_stage1_end_time = ref();
const review_stage2_start_time = ref();
const review_stage2_end_time = ref();
const project_details = ref("");
const checked = ref(false);
</script>
