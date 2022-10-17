<template>
	<div class="pt-62px pl-128px pr-128px">
		<div class="text-32px font-medium">上傳資料列表</div>
		<div class="bigRedDivider"></div>
		<div class="mt-16px">
			<DataTable :value="applicantsData">
				<Column field="accId">
					<template #header>
						<div class="m-auto">{{ $t("帳號") }}</div>
					</template>
					<template #body="slotProps">
						<div
							class="m-auto w-50px text-center text-blue-500 hover:text-blue-300"
						>
							<router-link
								:to="{
									path: `/admission/manager/applicantsUploadList/${slotProps.data.accId}`,
								}"
							>
								{{ slotProps.data.accId }}
							</router-link>
						</div>
					</template>
				</Column>
				<Column field="name">
					<template #header>
						<div class="m-auto">{{ $t("姓名") }}</div>
					</template>
					<template #body="slotProps">
						<div
							class="m-auto w-50px text-center text-blue-500 hover:text-blue-300"
						>
							<router-link
								:to="{
									path: `/admission/manager/applicantsUploadList/${slotProps.data.accId}`,
								}"
							>
								{{ slotProps.data.name }}
							</router-link>
						</div>
					</template>
				</Column>
				<Column field="upload_status">
					<template #header>
						<div class="m-auto">{{ $t("上傳狀態") }}</div>
					</template>
					<template #body="slotProps">
						<div class="m-auto text-center">
							<Tag
								v-if="slotProps.data.upload_status === 'sent'"
								severity="success"
							>
								{{ slotProps.data.upload_status }}
							</Tag>
							<Tag
								v-else-if="
									slotProps.data.upload_status === 'unstart'
								"
								severity="danger"
							>
								{{ slotProps.data.upload_status }}
							</Tag>
							<Tag
								v-else-if="
									slotProps.data.upload_status === 'draft'
								"
								severity="warning"
							>
								{{ slotProps.data.upload_status }}
							</Tag>
						</div>
					</template>
				</Column>
				<Column field="attachment_enable">
					<template #header>
						<div class="m-auto">{{ $t("補件狀態") }}</div>
					</template>
					<template #body="slotProps">
						<div class="m-auto text-center">
							{{ slotProps.data.attachment_enable }}
						</div>
					</template>
				</Column>
				<Column field="attachment_status">
					<template #header>
						<div class="m-auto">{{ $t("補件系統") }}</div>
					</template>
					<template #body="slotProps">
						<div class="m-auto text-center">
							<Tag
								v-if="
									slotProps.data.attachment_status === 'sent'
								"
								severity="success"
							>
								{{ slotProps.data.attachment_status }}
							</Tag>
						</div>
					</template>
				</Column>
			</DataTable>
		</div>
	</div>
</template>

<script setup lang="ts">
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Tag from "primevue/tag";
import "../../../../styles/customize.css";
import applicantsList from "./uploadList.json";

const applicantsData = applicantsList.applicants;
console.log(applicantsData);
</script>

<style setup lang="css">
.green {
	color: green;
}
</style>
