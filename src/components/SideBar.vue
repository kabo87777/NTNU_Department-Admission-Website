<template>
	<div>
		<Sidebar
			v-model:visible="visibleLeft"
			:dismissable="true"
			:showCloseIcon="false"
			:baseZIndex="-1"
			:modal="false"
			class="mt-15"
		>
			<Dropdown
				v-model="selectedProgram"
				:options="programs"
				optionLabel="program_name"
				class="w-full h-60px !text-3xl tracking-2px"
			/>

			<router-link to="/projectSetting" custom v-slot="{ navigate }">
				<Button
					class="p-button-secondary p-button-text mt-5 mb-2 h-10 w-full"
					@click="navigate"
					role="link"
				>
					<img
						alt="logo"
						src="../../src/assets/sidebar/Setting_line.png"
						style="width: 1.5rem"
					/>
					<span class="text-left tracking-3px ml-3 font-bold">
						專案設定
					</span>
				</Button>
			</router-link>

			<Button class="p-button-secondary p-button-text mt-2 h-10 w-full">
				<img
					alt="logo"
					src="../../src/assets/sidebar/Chart_light.png"
					style="width: 1.5rem"
				/>
				<span class="text-left tracking-3px ml-3 font-bold">
					專案狀態
				</span>
			</Button>

			<Divider align="left" class="text-xs text-ntnuRed">
				<b>申請端設定</b>
			</Divider>

			<Button class="p-button-secondary p-button-text mt-2 h-10 w-full">
				<img
					alt="logo"
					src="../../src/assets/sidebar/Bell.png"
					style="width: 1.5rem"
				/>
				<span class="text-left tracking-3px ml-3 font-bold">
					資訊公告
				</span>
			</Button>
			<Button class="p-button-secondary p-button-text mt-2 h-10 w-full">
				<img
					alt="logo"
					src="../../src/assets/sidebar/User_add_alt.png"
					style="width: 1.5rem"
				/>
				<span class="text-left tracking-3px ml-3 font-bold">
					申請帳號設置
				</span>
			</Button>
			<Button class="p-button-secondary p-button-text mt-2 h-10 w-full">
				<img
					alt="logo"
					src="../../src/assets/sidebar/Sort_alfa.png"
					style="width: 1.5rem"
				/>
				<span class="text-left tracking-3px ml-3 font-bold">
					上傳欄位設置
				</span>
			</Button>
			<Button class="p-button-secondary p-button-text mt-2 h-10 w-full">
				<img
					alt="logo"
					src="../../src/assets/sidebar/File_dock_search.png"
					style="width: 1.5rem"
				/>
				<span class="text-left tracking-3px ml-3 font-bold">
					上傳資料列表
				</span>
			</Button>

			<Divider align="left" class="text-xs text-ntnuRed">
				<b>審查端設定</b>
			</Divider>

			<Button class="p-button-secondary p-button-text mt-2 h-10 w-full">
				<img
					alt="logo"
					src="../../src/assets/sidebar/Eye_light.png"
					style="width: 1.5rem"
				/>
				<span class="text-left tracking-3px ml-3 font-bold">
					審查評分設置
				</span>
			</Button>
			<Button class="p-button-secondary p-button-text mt-2 h-10 w-full">
				<img
					alt="logo"
					src="../../src/assets/sidebar/Flag_finish.png"
					style="width: 1.5rem"
				/>
				<span class="text-left tracking-3px ml-3 font-bold">
					評分資料列表
				</span>
			</Button>
		</Sidebar>
		<!-- <Button icon="pi pi-arrow-right" @click="visibleLeft = true"  /> -->
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
const programs = ref([{ program_name: "111年研究生審查" }]);
</script>

<style></style>
