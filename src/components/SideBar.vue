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
				class="w-336px h-72px !text-4xl tracking-2px"
			/>

			<router-link
				to="/admission/manager/projectSetting"
				custom
				v-slot="{ navigate }"
			>
				<Button
					class="p-button-secondary p-button-text !mt-48px !w-336px !h-48px"
					@click="navigate"
					role="link"
				>
					<img
						alt="logo"
						src="/assets/sidebar/Setting_line.png"
						style="width: 1.5rem"
					/>
					<span class="text-left tracking-3px ml-3 font-bold text-xl">
						{{ $t("專案設定") }}
					</span>
				</Button>
			</router-link>

			<Button
				class="p-button-secondary p-button-text !mt-24px !w-336px !h-48px"
			>
				<img
					alt="logo"
					src="/assets/sidebar/Chart_light.png"
					style="width: 1.5rem"
				/>
				<span class="text-left tracking-3px ml-3 font-bold text-xl">
					{{ $t("專案狀態") }}
				</span>
			</Button>

			<Divider
				align="left"
				class="text-xs text-ntnuRed !mt-24px text-base"
			>
				<b>{{ $t("申請端設定") }}</b>
			</Divider>

			<Button class="p-button-secondary p-button-text !w-336px !h-48px">
				<img
					alt="logo"
					src="/assets/sidebar/Bell.png"
					style="width: 1.5rem"
				/>
				<span class="text-left tracking-3px ml-3 font-bold text-xl">
					{{ $t("資訊公告") }}
				</span>
			</Button>
			<Button
				class="p-button-secondary p-button-text !mt-24px !w-336px !h-48px"
			>
				<img
					alt="logo"
					src="/assets/sidebar/User_add_alt.png"
					style="width: 1.5rem"
				/>
				<span class="text-left tracking-3px ml-3 font-bold text-xl">
					{{ $t("申請帳號設置") }}
				</span>
			</Button>
			<router-link
				to="/admission/manager/projectSettings"
				custom
				v-slot="{ navigate }"
			>
				<Button
					class="p-button-secondary p-button-text !mt-24px !w-336px !h-48px"
					@click="navigate"
					role="link"
				>
					<img
						alt="logo"
						src="/assets/sidebar/Sort_alfa.png"
						style="width: 1.5rem"
					/>
					<span class="text-left tracking-3px ml-3 font-bold text-xl">
						{{ $t("上傳欄位設置") }}
					</span>
				</Button>
			</router-link>
			<router-link to="/admission/manager/applicantsUploadList">
				<Button
					class="p-button-secondary p-button-text !mt-24px !w-336px !h-48px"
				>
					<img
						alt="logo"
						src="/assets/sidebar/File_dock_search.png"
						style="width: 1.5rem"
					/>
					<span class="text-left tracking-3px ml-3 font-bold text-xl">
						{{ $t("上傳資料列表") }}
					</span>
				</Button>
			</router-link>

			<Divider align="left" class="text-xs text-ntnuRed text-base">
				<b>{{ $t("審查端設定") }}</b>
			</Divider>
			<router-link
				to="/admission/manager/reviewScoreField"
				custom
				v-slot="{ navigate }"
			>
				<Button
					class="p-button-secondary p-button-text !w-336px !h-48px"
					@click="navigate"
					role="link"
				>
					<img
						alt="logo"
						src="/assets/sidebar/Eye_light.png"
						style="width: 1.5rem"
					/>
					<span class="text-left tracking-3px ml-3 font-bold text-xl">
						{{ $t("審查評分設置") }}
					</span>
				</Button>
			</router-link>
			<Button
				class="p-button-secondary p-button-text !mt-24px !w-336px !h-48px"
			>
				<img
					alt="logo"
					src="/assets/sidebar/Flag_finish.png"
					style="width: 1.5rem"
				/>
				<span class="text-left tracking-3px ml-3 font-bold text-xl">
					{{ $t("評分資料列表") }}
				</span>
			</Button>
			<div class="bg-gray-200 bg-opacity-50 !w-400 h-203px !mt-22px">
				<Button
					class="w-168px h-44px p-button-outlined !mt-24px !ml-10px"
				>
					<img
						alt="logo"
						src="/assets/sidebar/User_box.png"
						style="width: 1.25rem"
					/>
					<h1 class="tracking-1px text-xl text-gray-900">
						{{ $t("管理審查者") }}
					</h1>
				</Button>
				<Button
					@click="newProject"
					class="w-146px h-44px p-button-outlined p-button-success !mt-24px !ml-24px"
				>
					<img
						alt="logo"
						src="/assets/sidebar/Add_round.png"
						style="width: 1.25rem"
						class="!ml-0px"
					/>
					<h1 class="tracking-1px text-xl text-gray-900">
						{{ $t("新增專案") }}
					</h1>
				</Button>
				<Dialog
					header="新增專案"
					v-model:visible="displayNewProject"
					class="w-484px h-282px"
				>
					<divider class="!mt-0px" />
					<p class="mt-24px text-base tracking-2px">
						{{ $t("專案名稱") }}
					</p>
					<InputText
						type="text"
						v-model="newProjectName"
						class="!w-428px !h-44px !mt-5px"
					/>
					<div class="flex">
						<Button
							@click="closeDisplayNewProject"
							class="p-button-outlined p-button-success !ml-70px !mt-26px !w-142px !h-44px"
						>
							<img
								alt="logo"
								src="/assets/sidebar/Done_round.png"
								style="width: 1.25rem"
								class="!ml-0px"
							/>
							<span class="text-left text-xl">{{
								$t("建立專案")
							}}</span>
						</Button>
						<Button
							@click="closeDisplayNewProject"
							class="p-button-outlined p-button-danger !ml-32px !mt-26px !w-105px !h-44px"
						>
							<img
								alt="logo"
								src="/assets/sidebar/Close_round.png"
								style="width: 1.25rem"
								class="!ml-0px"
							/>
							<span class="text-left text-xl">{{
								$t("取消")
							}}</span>
						</Button>
					</div>
				</Dialog>
				<div class="flex">
					<img
						alt="logo"
						src="/assets/sidebar/User_circle.png"
						class="h-40px w-40px ml-24px mt-50px"
					/>
					<div class="w-100px h-50px">
						<div class="text-xs ml-16px mt-50px">
							{{ $t("管理端帳戶") }}
						</div>
						<div class="text-xl ml-16px tracking-wider">
							{{ $t("系辦主管") }}
						</div>
					</div>
					<Button class="p-button-text !mt-46px !ml-50px">
						<img
							alt="logo"
							src="/assets/sidebar/Setting_alt_line.png"
							class="w-28px h-28px"
						/>
					</Button>
					<Button class="p-button-text !mt-46px">
						<img
							alt="logo"
							src="/assets/sidebar/Sign_out_circle.png"
							class="w-28px h-28px"
						/>
					</Button>
				</div>
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
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const translation = {
	masterReview: t("2022 研究生審查 Master Review"),
	phdReview: t("2022 博士生審查 Phd Review"),
};
const visibleLeft = ref(true);
let selectedProgram = ref({
	program_name: translation.masterReview,
	value: 1,
});
let programs = ref([
	{ program_name: translation.masterReview, value: 1 },
	{ program_name: translation.phdReview, value: 2 },
]);
const displayNewProject = ref(false);
const newProjectName = ref("");

function newProject() {
	displayNewProject.value = true;
}

function closeDisplayNewProject() {
	displayNewProject.value = false;
}
</script>

<style></style>
