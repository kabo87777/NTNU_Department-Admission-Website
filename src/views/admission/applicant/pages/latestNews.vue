<template>
	<div>
		<div class="font-[500] text-[32px] font-bold">
			{{ $t("最新資訊") }}
		</div>
		<div class="bigYellowDivider"></div>
	</div>
</template>

<script setup lang="ts">
import { useAdmissionApplicantAuthStore } from "@/stores/universalAuth";
import { AdmissionApplicantAPI } from "@/api/admission/applicant/api";
import { useQuery } from "@tanstack/vue-query";

const applicantAuth = useAdmissionApplicantAuthStore();
const api = new AdmissionApplicantAPI(applicantAuth);
</script>
