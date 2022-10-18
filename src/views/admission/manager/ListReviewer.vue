<template>
	<h1 class="text-4xl font-bold">{{ $t("管理審查者") }}</h1>
	<Divider></Divider>
	<DataTable :value="tableData">
		<template #empty>
			<h2>{{ $t("尚無審查者帳號") }}</h2>
		</template>

		<Column field="id">
			<template #header>{{ $t("審查者帳號") }}</template>
		</Column>

		<Column field="name">
			<template #header>{{ $t("姓名") }}</template>
		</Column>

		<Column field="email">
			<template #header>{{ $t("電子信箱") }}</template>
		</Column>

		<Column field="roles">
			<template #header>{{ $t("身份組") }}</template>
			<template #body="slotProps">
				<Tag
					v-for="role in truncateRoles(slotProps.data.roles)"
					:key="role"
					>{{ role }}</Tag
				>
			</template>
		</Column>

		<Column>
			<template #header>{{ $t("動作") }}</template>
			<template #body="slotProps">
				<Button
					icon="pi pi-pencil"
					class="p-button-outlined p-button-success"
					@click="openModal(slotProps.data)"
				></Button>
			</template>
		</Column>
	</DataTable>

	<Dialog v-model:visible="modalVisible" :modal="true">
		<template #header>
			<h3 class="font-extrabold text-lg">
				{{ $t("編輯審查者帳號") }}
			</h3>
		</template>
		<template #default>
			<div class="w-xl">
				<div class="grid grid-cols-2">
					<div class="col-start-1">
						<h3 font="font-black">{{ $t("審查者帳號") }}</h3>
						<h4 class="">{{ modalData.id }}</h4>
					</div>

					<div class="col-start-2 font-black">
						<label class="block">{{ $t("姓名") }}</label>
						<InputText
							type="text"
							class=""
							v-model="modalData.name"
						>
						</InputText>
					</div>
				</div>
				<div>
					<label for="" class="block font-black">{{
						$t("電子信箱")
					}}</label>
					<InputText
						type="email"
						class="w-full"
						v-model="modalData.email"
					></InputText>
				</div>

				<div class="mt-5">
					<h3 class="font-black">{{ $t("管理身份組") }}</h3>
					<Divider class="!mt-0"></Divider>
					<div
						class="inline-flex items-center"
						v-for="role in modalData.roles"
						:key="role.id"
					>
						<Checkbox :binary="true" :value="true"></Checkbox>
						<span class="mx-1">{{ role.name }}</span>
					</div>
				</div>
			</div>
		</template>
		<template #footer>
			<div class="flex justify-center">
				<div class="space-x-2">
					<Button
						icon="pi pi-check"
						:label="$t('儲存')"
						class="p-button-outlined p-button-success"
						@click="saveChange"
					></Button>
					<Button
						icon="pi pi-times"
						:label="$t('取消')"
						class="p-button-outlined p-button-danger"
						@click="modalVisible = false"
					></Button>
				</div>
			</div>
		</template>
	</Dialog>
</template>

<script setup lang="ts">
import DataTable from "primevue/datatable";
import Row from "primevue/row";
import Column from "primevue/column";
import ColumnGroup from "primevue/columngroup";
import { ref } from "vue";
import type { Ref } from "vue";
import { useI18n } from "vue-i18n";
import Divider from "primevue/divider";
import Tag from "primevue/tag";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import Checkbox from "primevue/checkbox";
import mockData from "@/mocks/reviewers.json";
const { t } = useI18n();

const response = mockData.reviewers;

interface OwO {
	id: string | number;
	name: string;
	email: string;
	roles: {
		id: string | number;
		name: string;
		checked?: boolean;
	}[];
}

const tableData: Ref<OwO[]> = ref<OwO[]>(response);

const modalVisible = ref(false);
const modalData: Ref<OwO> = ref<OwO>({} as OwO);

const openModal = (data: OwO) => {
	// Make a copy of original data
	modalData.value = { ...data };
	modalVisible.value = true;
};

const saveChange = () => {
	console.log(modalData.value);
	let index = tableData.value.findIndex((x) => x.id === modalData.value.id);
	console.log(index);
	if (!isNaN(index)) {
		tableData.value[index] = modalData.value;
		console.log(tableData.value);
	}
	modalVisible.value = false;
};

const truncateRoles = (rolesData: { id: number; name: string }[]) => {
	let result: string[];

	if (rolesData.length > 3) {
		result = rolesData.slice(0, 3).map((x) => x.name);
		result = result.concat(["..."]);
	} else {
		result = rolesData.map((x) => x.name);
	}

	return result;
};
</script>
