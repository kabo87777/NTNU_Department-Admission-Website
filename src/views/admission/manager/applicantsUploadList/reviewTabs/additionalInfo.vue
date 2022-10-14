<template>

	<div class="mt-16px">
		<div class="mt-16px">
				<div>
					<label
						class=" ml-8px text-24px font-medium"
						>系統設置</label
					>
				</div>
		</div>
		<div>
			<SelectButton
				class="mt-16px  pl-16px selecttable"
				v-model="activeTab"
				:options="tabOptions"
				optionLabel="name"
				aria-labelledby="single"
			>
			</SelectButton>
		</div>
		<div class="flex mt-16px">
			<div class="w-1/3 pl-16px">開放時間</div>
			<div class="w-1/3 pl-16px">截止時間</div>
			
		</div>	
		<div class="flex mt-16px">
			<div p-fluid grid formgrid >
				<Calendar class=" pl-16px" inputId="time24" v-model="date1" :showTime="true" :showSeconds="true" :showIcon="true" > </Calendar> 
			</div>
			<div p-fluid grid formgrid >
				<Calendar class=" pl-50px" inputId="time24" v-model="date2" :showTime="true" :showSeconds="true" :showIcon="true" > </Calendar>
			</div>
            	
		</div>
		
		<div class="flex relative mt-40px">
			<div class="smallRedDivider"></div>
			<div class="smallRedDivider absolute right-0"></div>
		</div>
		<div class="mt-16px">
				<div>
					<label
						class=" ml-8px text-24px font-medium"
						>補件需求</label
					>
				</div>
		</div>		
		<div class="block mt-16px  ">
			<div class="w-1/3 pl-16px">補件需求說明:</div>
			<div class=" mt-8px ml-16px">
				<InputText type="text" v-model="inputvalue" class="h-10  " />
        		<span :style="{marginLeft: '.5em'}">{{inputvalue}}</span>
			</div>
		</div>	
		<div class="mt-16px ml-16px">
			<Checkbox
				inputId="text"
				v-model="textChecked"
				:binary="true"
			/>
			<label
				for="text"
				class="ml-8px  font-medium"
				>文字輸入框</label
			>
		</div>
		<div class="flex mt-16px">
			<div class="mt-16px ml-16px">
				<Checkbox
					inputId="file"
					v-model="fileChecked"
					:binary="true"
				/>
				<label
					for="file"
					class="ml-8px  font-medium"
					>上傳檔案，檔案類型:</label
				>		
			</div>
			<div  class=" ml-16px">
				<span class="p-float-label">
							<Dropdown id="dropdown" v-model="value8" :options="cities" optionLabel="name" class="h-10  w-40" />
				</span>	
			</div>

			<div class="flex relative mt-40px">
				<div class="smallRedDivider"></div>
				<div class="smallRedDivider absolute right-0"></div>
			</div>    	
		</div>
		<div class="flex relative mt-40px">
			<div class="smallRedDivider"></div>
			<div class="smallRedDivider absolute right-0"></div>
		</div>
		<div class="mt-16px">
			<div>
				<label
					class=" ml-8px text-24px font-medium"
				>提交內容</label
				>
			</div>
		</div>
		<div class="mt-16px">
			※ 尚未提交任何文字，檔案
		</div>
		<div class="bigRedDivider"></div>
		<div class="mt-16px ml-20px grid justify-center">
			<Button label="Secondary" class="grid justify-center p-button-outlined p-button-secondary text-20px tracking-wide " >
				寄送E-mail通知
			</Button>
		</div>
		
		<div class="mt-20px"></div>
	
	</div>

</template>

<script setup lang="ts">
import "@/styles/customize.css";
import "primeicons/primeicons.css";
import {  onMounted } from 'vue';

import SelectButton from "primevue/selectbutton";
import MultiSelect from 'primevue/multiselect';
import InputText from "primevue/inputtext";
import Checkbox from "primevue/checkbox";
import Button from "primevue/button";
import Dropdown from "primevue/dropdown"
import Calendar from "primevue/calendar";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
const selectedCity = ref();
const { t } = useI18n();
const textChecked = ref(false);
const fileChecked = ref(false);
const date1 = ref();
const date2 = ref();
let today = new Date();
let month = today.getMonth();
let year = today.getFullYear();
let prevMonth = (month === 0) ? 11 : month -1;
let prevYear = (prevMonth === 11) ? year - 1 : year;
let nextMonth = (month === 11) ? 0 : month + 1;
let nextYear = (nextMonth === 0) ? year + 1 : year;

const inputvalue = ref();
const translation = {
	basicCol: t("啟用"),
	attachmentCol: t("關閉"),
};
const activeTab = ref({ name: translation.basicCol, value: 1 });
const tabOptions = ref([
	{ name: translation.basicCol, value: 1 },
	{ name: translation.attachmentCol, value: 2 },
]);
const selectedCities1 = ref();
const value8 = ref();
const cities = ref([
            {name: '.pdf', code: 'pdf'},
            {name: '.doc', code: 'doc'},
        ]);

const props = defineProps(["userId"]);
console.log(props.userId, "additional info tab");
</script>

<style setup lang="css">

.selecttable {
	height: 50%;
  	width: 25%;
  /* background-color: powderblue; */
}
</style>
