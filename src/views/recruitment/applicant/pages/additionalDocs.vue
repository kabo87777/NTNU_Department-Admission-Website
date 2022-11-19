<template>
	<div class="flex mt-16px">
			<div class="mt-16px ml-16px">
				<Button
					class="p-button-sm p-button-success p-button-outlined  !text-[16px]"
					type="submit"
					icon="pi pi-plus"
					:label="$t('添加')"
				/>
			</div>
			<div class="mt-16px ml-16px">
				<Button
					class="p-button-sm p-button-secondary p-button-outlined  !text-[16px]"
					type="submit"
					icon="pi pi-sort-alt"
					:label="$t('調整排序')"
				/>
			</div>
	</div>
	<div class="flex mt-16px">
		<div class="mt-16px ml-50px">
			{{ $t("上傳時間") }}
		</div>
		<div class="mt-16px ml-150px">
			{{ $t("補教文件姓名") }}
		</div>
		<div class="mt-16px ml-150px">
			{{ $t("作業狀態") }}
		</div>
		<div class="mt-16px ml-100px">
			{{ $t("操作") }}
		</div>
	</div>
	<div class="flex mt-16px">
	
		
	</div>
	
	<p class="text-xl">畫面與功能維修中</p>
</template>

<script setup lang="ts">
import { reactive, toRaw } from "vue";
import { ref } from 'vue';
import { useRouter } from "vue-router";
import ReviewState from "@/components/attachmentStates/reviewState.vue";
import EditState from "@/components/attachmentStates/editState.vue";
import CreateState from "@/components/attachmentStates/createState.vue";
import ParagraphDivider from "@/styles/paragraphDividerApplicant.vue";
import { AttachmentData } from "@/api/recruitment/applicant/types";
import { useRecruitmentApplicantAuthStore } from "@/stores/universalAuth";
import { RecruitmentApplicantAPI } from "@/api/recruitment/applicant/api";
import { useProjectIdStore } from "@/stores/RecruitmentApplicantStore";
import { useQuery } from "@tanstack/vue-query";
import { InvalidSessionError } from "@/api/error";
import AttachmentList from "@/mocks/attachmentList.json";
import Button from "primevue/button";
import "primeicons/primeicons.css";


</script>
