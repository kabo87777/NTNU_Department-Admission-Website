<template>
  <h1 class="text-4xl font-bold">{{ $t("申請者帳號設定") }}</h1>
  <Divider/>
  <DataTable :value="tableData">
    <template #empty>
      <h2>{{ $t("尚無申請者帳號") }}</h2>
    </template>
    
    <Column field="id">
      <template #header>{{ $t("申請者帳號") }}</template>
    </Column>

    <Column field="name">
      <template #header>{{ $t("姓名") }}</template>
    </Column>

    <Column field="email">
      <template #header>{{ $t("電子信箱") }}</template>
    </Column>

    <Column>
      <template #header>{{ $t("操作") }}</template>
      <template #body="slotProps">
        <Button
         icon="pi pi-pencil"
         class="p-button-outlined p-button-success"
         @click="openModal(slotProps.data)"></Button>
      </template>
    </Column>

  </DataTable>

  <Dialog v-model:visible="modalVisible" :modal="true">
    <template #header>
      <h3 class="font-extrabold text-lg">
				{{ $t("編輯申請者帳號") }}
			</h3>
    </template>

    <template #default>
      <div class="w-md">
        <label for="" class="block font-black">{{ $t("帳號 ID") }}</label>
        <div>{{ modalData.id }}</div>

        <div class="mt-3">
          <label for="" class="block font-black">{{ $t("姓名") }}</label>
          <InputText type="text" class="w-full mt-1" v-model:model-value="modalData.name"></InputText>
        </div>

        <div class="mt-3">
          <label for="" class="block font-black">{{ $t("電子信箱") }}</label>
          <InputText type="email" class="w-full mt-1" v-model:model-value="modalData.email"></InputText>
        </div>

        <div class="mt-3">
          <label for="password" class="block font-black">{{ $t("密碼") }}</label>
          <InputText type="password" class="w-full mt-1" v-model:model-value="modalData.passowrd"></InputText>
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
import Button from 'primevue/button';
import Checkbox from 'primevue/checkbox';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import Dialog from 'primevue/dialog';
import Divider from 'primevue/divider';
import InputText from 'primevue/inputtext';
import { Ref, ref } from 'vue'
import ApplicantAccounts from '@/mocks/ApplicantAccounts.json'
import { table } from 'console';

const mockData = ApplicantAccounts.accounts

const modalVisible = ref(false)

interface OwO{
  id: string|number,
  name: string,
  email: string,
  passowrd?: string
}

const tableData: Ref<OwO[]> = ref(mockData)
const modalData: Ref<OwO> = ref({} as OwO)

const openModal = (data: OwO)=>{
  modalData.value=data
  modalVisible.value=true
}

const saveChange = ()=>{
  let index = tableData.value.findIndex((x) => x.id === modalData.value.id);
	console.log(index);
	if (!isNaN(index)) {
		tableData.value[index] = modalData.value;
		console.log(tableData.value);
	}
	modalVisible.value = false;
}
</script>