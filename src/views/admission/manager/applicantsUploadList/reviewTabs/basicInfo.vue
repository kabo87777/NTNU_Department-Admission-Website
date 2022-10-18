<template>
	<div class="mt-16px pl-8px pr-8px">
		<div class="text-24px font-medium">姓名資訊</div>
		<div class="mt-24px flex">
			<div class="w-1/3">
				<div class="text-16px">稱謂：</div>
				<InputText
					type="text"
					v-model="title"
					placeholder="Text"
					class="!border-gray-900 !w-300px !h-40px !mt-5px "
				/>
			</div>
			<div class="w-1/3">
				<div class="text-16px">後綴：</div>
				<InputText
					type="text"
					v-model="suffix"
					placeholder="Text"
					class="!border-gray-900 !w-300px !h-40px !mt-5px"
				/>
			</div>
		</div>
		<div class="mt-24px flex">
			<div class="w-1/2">
				<div class="text-16px">中文姓氏：</div>
				<InputText
					type="text"
					v-model="title"
					placeholder="Text"
					class="!border-gray-900 !w-440px !h-40px !mt-5px"
				/>
			</div>
			<div class="w-1/2">
				<div class="text-16px">中文名字：</div>
				<InputText
					type="text"
					v-model="suffix"
					placeholder="Text"
					class="!border-gray-900 !w-440px !h-40px !mt-5px"
				/>
			</div>
		</div>
		<div class="mt-24px flex">
			<div class="w-1/3">
				<div class="text-16px">英文姓氏：</div>
				<InputText
					type="text"
					v-model="title"
					placeholder="Text"
					class="!border-gray-900 !w-300px !h-40px !mt-5px "
				/>
			</div>
			<div class="w-1/3">
				<div class="text-16px">英文名字：</div>
				<InputText
					type="text"
					v-model="suffix"
					placeholder="Text"
					class="!border-gray-900 !w-300px !h-40px !mt-5px"
				/>
			</div>
		</div>
		<ParagraphDivider />
		<div class="mt-24px text-24px font-medium">入職身分(本地人士)</div>
		<div class="mt-24px flex">
			<div class="w-1/3">
				<div class="text-16px">入學身分：</div>
				<InputText
					type="text"
					v-model="title"
					placeholder="Text"
					class="!border-gray-900 !w-300px !h-40px !mt-5px "
				/>
			</div>
			
		</div>
		<div class="mt-24px flex">
			<div class="w-1/3">
				<div class="text-16px">國籍：</div>
				<InputText
					type="text"
					v-model="title"
					placeholder="Text"
					class="!border-gray-900 !w-300px !h-40px !mt-5px "
				/>
			</div>
			<div class="w-1/3">
				<div class="text-16px">身份證字號：</div>
				<InputText
					type="text"
					v-model="suffix"
					placeholder="Text"
					class="!border-gray-900 !w-300px !h-40px !mt-5px"
				/>
			</div>
		</div>
		<ParagraphDivider />
		<div class="mt-24px text-24px font-medium">現居地址</div>
		<div class="mt-16px ml-16px">
			<Checkbox inputId="text" v-model="textCheckedAddress" :binary="true" />
			<label for="text" class="ml-8px font-medium">與戶籍地址資訊相同</label>
		</div>
		
		<div class="mt-24px flex">
			<div class="w-1/2">
				<div class="text-16px">國家：</div>
				<InputText
					type="text"
					v-model="title"
					placeholder="Text"
					class="!border-gray-900 !w-440px !h-40px !mt-5px"
				/>
			</div>
			<div class="w-1/2">
				<div class="text-16px">州：</div>
				<InputText
					type="text"
					v-model="suffix"
					placeholder="Text"
					class="!border-gray-900 !w-440px !h-40px !mt-5px"
				/>
			</div>
		</div>
		<div class="mt-24px flex">
			<div class="w-1/2">
				<div class="text-16px">城市：</div>
				<InputText
					type="text"
					v-model="title"
					placeholder="Text"
					class="!border-gray-900 !w-440px !h-40px !mt-5px"
				/>
			</div>
			<div class="w-1/2">
				<div class="text-16px">郵遞區號：</div>
				<InputText
					type="text"
					v-model="suffix"
					placeholder="Text"
					class="!border-gray-900 !w-440px !h-40px !mt-5px"
				/>
			</div>
		</div>
		<div class="mt-24px ">
			<div class="w-2/3">
				<div class="text-16px">街道地址：</div>
				<InputText
					type="text"
					v-model="suffix"
					placeholder="Text"
					class="!border-gray-900 !w-440px !h-40px !mt-5px"
				/>
			</div>
			
		</div>
		<ParagraphDivider />
		<div class="mt-24px text-24px font-medium">身份資料</div>
		<div class="mt-24px flex">
			<div class="w-1/3">
				<div class="text-16px">法定性別：</div>
			</div>
		</div>

		<div class="mt-24px flex">
			<div class="w-1/5">
				<Checkbox inputId="text" v-model="textCheckedMan" :binary="true" />
				<label for="text" class="ml-8px font-medium">男性</label>
			</div>
			<div class="w-1/5">
				<Checkbox inputId="text" v-model="textCheckedWoman" :binary="true" />
				<label for="text" class="ml-8px font-medium">女性</label>
			</div>
		</div>
		<div class="mt-24px flex">
			<div class="w-1/3">
				<div class="text-16px">性別認同：</div>
			</div>
		</div>
		<div class="mt-24px flex">
			<div class="w-1/5">
				<Checkbox inputId="text" v-model="textCheckedM" :binary="true" />
				<label for="text" class="ml-8px font-medium">男性</label>
			</div>
			<div class="w-1/5">
				<Checkbox inputId="text" v-model="textCheckedW" :binary="true" />
				<label for="text" class="ml-8px font-medium">女性</label>
			</div>
			<div class="w-1/5">
				<Checkbox inputId="text" v-model="textCheckedB" :binary="true" />
				<label for="text" class="ml-8px font-medium">非二元性別</label>
			</div>
		</div>
		<div class="mt-24px flex">
			<div class="w-1/3">
				<div class="text-16px">出生國家：</div>
				<InputText
					type="text"
					v-model="title"
					placeholder="Text"
					class="!border-gray-900 !w-300px !h-40px !mt-5px "
				/>
			</div>
			<div class="w-1/3">
				<div class="text-16px">出生日期：</div>
				<InputText
					type="text"
					v-model="suffix"
					placeholder="Text"
					class="!border-gray-900 !w-300px !h-40px !mt-5px"
				/>
			</div>
		</div>
		<div class="flex mt-16px">
			<div class="mt-16px ml-16px">
				<Checkbox inputId="file" v-model="nationalSecond" :binary="true" />
				<label for="file" class="ml-8px font-medium"
					>是否具有雙重國籍，第二國籍身份:</label
				>
			</div>
			<div class="ml-16px">
				<span class="p-float-label">
					<Dropdown
						id="dropdown"
						v-model="value8"
						:options="cities"
						optionLabel="name"
						class="h-10 w-40"
					/>
				</span>
			</div>
		</div>
		<div class="flex mt-16px">
			<div class="mt-16px ml-16px">
				<Checkbox inputId="file" v-model="national" :binary="true" />
				<label for="file" class="ml-8px font-medium"
					>非台灣國籍，簽證類型:</label
				>
			</div>
			<div class="ml-16px">
				<span class="p-float-label">
					<Dropdown
						id="dropdown"
						v-model="value8"
						:options="cities"
						optionLabel="name"
						class="h-10 w-40"
					/>
				</span>
			</div>
		</div>
		<ParagraphDivider />
		<div class="mt-24px text-24px font-medium">聯絡方式</div>
		<div class="mt-24px flex">
			<div class="w-1/2">
				<div class="text-16px">主要聯絡電話：</div>
				<InputText
					type="text"
					v-model="title"
					placeholder="Text"
					class="!border-gray-900 !w-300px !h-40px !mt-5px "
				/>
			</div>
			<div class="w-1/2">
				<div class="text-16px">次要聯絡電話：</div>
				<InputText
					type="text"
					v-model="title"
					placeholder="Text"
					class="!border-gray-900 !w-300px !h-40px !mt-5px "
				/>
			</div>
			
		</div>
		<div class="mt-24px flex">
			
			<div class="w-1/2">
				<div class="text-16px">行動電話：</div>
				<InputText
					type="text"
					v-model="suffix"
					placeholder="Text"
					class="!border-gray-900 !w-300px !h-40px !mt-5px"
				/>
			</div>
			<div class="mt-16px ml-16px">
				<Checkbox inputId="file" v-model="phone" :binary="true" />
				<label for="file" class="ml-8px font-medium"
					>行動電話與主要聯絡電話相同:</label
				>
			</div>
		</div>
		<div class="mt-24px flex">
			
			<div class="w-1/3">
				<div class="text-16px">電子信箱：</div>
				<InputText
					type="text"
					v-model="suffix"
					placeholder="Text"
					class="!border-gray-900 !w-300px !h-40px !mt-5px"
				/>
			</div>
			
		</div>
		<div class="mt-24px flex">
			<div class="mt-16px ml-16px">
				<Checkbox inputId="file" v-model="message" :binary="true" />
				<label for="file" class="ml-8px font-medium"
					>願意承擔手機簡訊費用:</label
				>
			</div>
		</div>
		
		

	</div>
</template>

<script setup lang="ts">
import "@/styles/customize.css";
import "primeicons/primeicons.css";
import { onMounted } from "vue";

import SelectButton from "primevue/selectbutton";
import MultiSelect from "primevue/multiselect";
import InputText from "primevue/inputtext";
import Checkbox from "primevue/checkbox";
import Button from "primevue/button";
import Dropdown from "primevue/dropdown";
import Calendar from "primevue/calendar";
import Dialog from "primevue/dialog";
import ParagraphDivider from "../../../../../styles/paragraphDivider.vue";
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";
const props = defineProps(["userId"]);
const title = ref("");
const suffix = ref("");
const textCheckedAddress = ref(false);
const textCheckedMan = ref(false);
const textCheckedWoman = ref(false);
const textCheckedM = ref(false);
const textCheckedW = ref(false);
const textCheckedB = ref(false);
const phone = ref(false);
const message = ref(false);
const nationalSecond = ref(false);
const national = ref(false);


console.log(props.userId, "basic info tab");
</script>
