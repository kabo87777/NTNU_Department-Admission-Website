<template>
	<h1 class="text-4xl text-bold tracking-widest">專案設定</h1>
	<Divider class="bg-ntnuRed" />
	<h2 class="text-2xl text-bold tracking-widest inline-block">
		111年研究生審查
	</h2>
	<Button class="w-100px h-40px ml-20px p-button-outlined p-button-success">
		<img
			alt="logo"
			src="../../src/assets/project-setting/Check_fill.png"
			style="width: 1.5rem"
			class="fill-green-500"
		/>
		<span class="tracking-1px"> 保存 </span>
	</Button>
	<Button class="w-100px h-40px ml-20px p-button-outlined p-button-danger">
		<img
			alt="logo"
			src="../../src/assets/project-setting/Close_round.png"
			style="width: 1.5rem"
			class="fill-green-500"
		/>
		<span class="tracking-1px"> 刪除 </span>
	</Button>
	<h3 class="text-xs tracking-widest text-gray-500">
		2022/09/15 · 新增到專案
	</h3>
	<h5 class="text-base tracking-widest mt-30px">專案名稱 (修改) :</h5>
	<InputText type="text" v-model="profect_name" class="w-800px mt-10px" />
	<div>
		<h5 class="text-base tracking-widest mt-30px">屬性 :</h5>
		<Dropdown
			v-model="selected_type"
			:options="types"
			optionLabel="type_name"
			optionValue="type_name"
			class="w-300px mt-10px"
		/>
	</div>
	<div class="inline-block">
		<h5 class="text-base tracking-widest mt-30px">申請端開放時間/日期 :</h5>
		<Calendar
			inputId="icon"
			v-model="application_start_time"
			:showIcon="true"
			:showTime="true"
			class="w-300px mt-10px"
		/>
	</div>
	<div class="inline-block ml-100px">
		<h5 class="text-base tracking-widest mt-30px">申請端關閉時間/日期 :</h5>
		<Calendar
			inputId="icon"
			v-model="application_end_time"
			:showIcon="true"
			:showTime="true"
			class="w-300px mt-10px"
		/>
	</div>
	<br />
	<div class="inline-block">
		<h5 class="text-base tracking-widest mt-30px">
			審查端第一階段開放時間/日期 :
		</h5>
		<Calendar
			inputId="icon"
			v-model="review_stage1_start_time"
			:showIcon="true"
			:showTime="true"
			class="w-300px mt-10px"
		/>
	</div>
	<div class="inline-block ml-100px">
		<h5 class="text-base tracking-widest mt-30px">
			審查端第一階段關閉時間/日期 :
		</h5>
		<Calendar
			inputId="icon"
			v-model="review_stage1_end_time"
			:showIcon="true"
			:showTime="true"
			class="w-300px mt-10px"
		/>
	</div>
	<br />
	<div class="inline-block">
		<h5 class="text-base tracking-widest mt-30px">
			審查端第二階段開放時間/日期 :
		</h5>
		<Calendar
			inputId="icon"
			v-model="review_stage2_start_time"
			:showIcon="true"
			:showTime="true"
			class="w-300px mt-10px"
		/>
	</div>
	<div class="inline-block ml-100px">
		<h5 class="text-base tracking-widest mt-30px">
			審查端第二階段關閉時間/日期 :
		</h5>
		<Calendar
			inputId="icon"
			v-model="review_stage2_end_time"
			:showIcon="true"
			:showTime="true"
			class="w-300px mt-10px"
		/>
	</div>
	<br />
	<div>
		<Checkbox
			inputId="binary"
			v-model="checked"
			:binary="true"
			class="align-top mt-30px"
		/>
		<h5
			class="text-base tracking-widest mt-30px ml-10px align-top inline-block"
		>
			專案詳細 :
		</h5>
		<Textarea
			v-model="project_details"
			rows="5"
			cols="30"
			class="w-800px h-300px mt-30px ml-10px"
		/>
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

const profect_name = ref<string>("111年研究生審查");
const selected_type = ref({});
const types = ref([
	{ type_name: "特殊選才" },
	{ type_name: "碩士班徵試入學" },
	{ type_name: "博士班徵試入學" },
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
