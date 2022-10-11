<template>
	<div class="pl-128px pr-128px">
		<div class="text-32px font-medium">上傳資料列表</div>
		<div class="bigRedDivider"></div>
		<div class="mt-16px">
			<DataTable :value="applicantsData">
				<Column field="accId">
					<template #header>
						{{ $t("ID") }}
					</template>
					<template #body="slotProps">
						{{ slotProps.data.accId }}
					</template>
				</Column>
				<Column field="name">
					<template #header> Name </template>
					<template #body="slotProps">
						{{ slotProps.data.name }}
					</template>
				</Column>
				<Column field="upload_status">
					<template #header> Upload Status </template>
					<template #body="slotProps">
						{{ slotProps.data.upload_status }}
						<!-- <div v-switch="slotProps.data.upload_status">
							<p v-case="'sent'">YAY</p>
							<p v-case="'unstart'">LAZY</p>
							<p v-case="'draft'">WORKHARD</p>
						</div> -->
					</template>
				</Column>
				<Column field="attachment_enable">
					<template #header>
						Additional Documents Upload System
					</template>
					<template #body="slotProps">
						{{ slotProps.data.attachment_enable }}
					</template>
				</Column>
				<Column field="attachment_status">
					<template #header>
						Additional Documents Upload Status
					</template>
					<template #body="slotProps">
						{{ slotProps.data.attachment_status }}
					</template>
				</Column>
			</DataTable>
		</div>
	</div>
</template>

<script setup lang="ts">
//import VSwitch from "v-switch-case";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import "../../../../styles/customize.css";
import applicantsList from "./uploadList.json";

//Vue.use(VSwitch);

const applicantsData = applicantsList.applicants;
console.log(applicantsData);
</script>
