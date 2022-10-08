<template>
	<div>
		<Sidebar
			v-model:visible="visibleLeft"
			:dismissable="true"
			:showCloseIcon="false"
			:baseZIndex="-1"
			:modal="false"
			class="mt-15 !w-384px"
		>
			<Dropdown
				v-model="selectedProgram"
				:options="programs"
				optionLabel="program_name"
				class="w-336px h-72px !text-3xl tracking-2px"
			/>

			<router-link to="/projectSetting" custom v-slot="{ navigate }">
				<Button
					class="p-button-secondary p-button-text !mt-48px !w-336px !h-48px"
					@click="navigate"
					role="link"
				>
					<img
						alt="logo"
						src="../../src/assets/sidebar/Setting_line.png"
						style="width: 1.5rem"
					/>
					<span class="text-left tracking-3px ml-3 font-bold text-xl">
						專案設定
					</span>
				</Button>
			</router-link>

			<Button class="p-button-secondary p-button-text !mt-24px   !w-336px !h-48px">
				<img
					alt="logo"
					src="../../src/assets/sidebar/Chart_light.png"
					style="width: 1.5rem"
				/>
				<span class="text-left tracking-3px ml-3 font-bold text-xl">
					專案狀態
				</span>
			</Button>

			<Divider align="left" class="text-xs text-ntnuRed !mt-24px text-base">
				<b>申請端設定</b>
			</Divider>

			<Button class="p-button-secondary p-button-text !w-336px !h-48px">
				<img
					alt="logo"
					src="../../src/assets/sidebar/Bell.png"
					style="width: 1.5rem"
				/>
				<span class="text-left tracking-3px ml-3 font-bold text-xl">
					資訊公告
				</span>
			</Button>
			<Button class="p-button-secondary p-button-text !mt-24px   !w-336px !h-48px">
				<img
					alt="logo"
					src="../../src/assets/sidebar/User_add_alt.png"
					style="width: 1.5rem"
				/>
				<span class="text-left tracking-3px ml-3 font-bold text-xl">
					申請帳號設置
				</span>
			</Button>
			<Button class="p-button-secondary p-button-text !mt-24px   !w-336px !h-48px">
				<img
					alt="logo"
					src="../../src/assets/sidebar/Sort_alfa.png"
					style="width: 1.5rem"
				/>
				<span class="text-left tracking-3px ml-3 font-bold text-xl">
					上傳欄位設置
				</span>
			</Button>
			<Button class="p-button-secondary p-button-text !mt-24px   !w-336px !h-48px">
				<img
					alt="logo"
					src="../../src/assets/sidebar/File_dock_search.png"
					style="width: 1.5rem"
				/>
				<span class="text-left tracking-3px ml-3 font-bold text-xl">
					上傳資料列表
				</span>
			</Button>

			<Divider align="left" class="text-xs text-ntnuRed text-base">
				<b>審查端設定</b>
			</Divider>

			<Button class="p-button-secondary p-button-text !w-336px !h-48px">
				<img
					alt="logo"
					src="../../src/assets/sidebar/Eye_light.png"
					style="width: 1.5rem"
				/>
				<span class="text-left tracking-3px ml-3 font-bold text-xl">
					審查評分設置
				</span>
			</Button>
			<Button class="p-button-secondary p-button-text !mt-24px   !w-336px !h-48px">
				<img
					alt="logo"
					src="../../src/assets/sidebar/Flag_finish.png"
					style="width: 1.5rem"
				/>
				<span class="text-left tracking-3px ml-3 font-bold text-xl">
					評分資料列表
				</span>
			</Button>
			<div class="bg-gray-500 !w-full h-196px">

			</div>
		</Sidebar>
	</div>
</template>

<script setup lang="ts">
import "primevue/resources/primevue.min.css";
import Sidebar from "primevue/sidebar";
import { ref } from "vue";
import Dropdown from "primevue/dropdown";
import Button from "primevue/button";
import Divider from "primevue/divider";

const visibleLeft = ref(true);
const selectedProgram = ref({ program_name: "111年研究生審查" });
const programs = ref([
	{ program_name: "111年研究生審查" },
	{ program_name: "111年博士生審查" },
]);
</script>

<style></style>
