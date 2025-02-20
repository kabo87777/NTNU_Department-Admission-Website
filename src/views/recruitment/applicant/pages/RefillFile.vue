<template>
	<Layout Applicant>
		<template #Header>{{ $t("補交文件系統") }}</template>
		<template #Body>
			<!-- 畫面顯示(開放補件時) -->
			<div v-if="isEnabled">
				<div>
					<CreateState
						v-if="refillFile.state === 3"
						category="補交文件"
						identity="admissionApplicant"
						@edit="createToEdit"
					/>
					<RefillState
						v-else-if="refillFile.state === 4"
						identity="admissionApplicant"
						:isUploadLoading="refillFile.loading"
						@cancel="editToCreate"
						@upload="handleUpload"
					/>
				</div>
			</div>

			<!-- 畫面顯示(未開放補件時) -->
			<div v-else>
				<div pos="absolute inset-0 my-1/5">
					<img
						src="/assets/admissionApplicant/Newsletter.png"
						alt="NO DATA"
						class="w-1/2 mx-auto"
					/>
					<div text="xl secondary center">
						{{ $t("暫未開放補件") }}
					</div>
				</div>
			</div>
		</template>
	</Layout>
</template>

<script setup lang="ts">
import Layout from "@/components/Layout.vue";
import CreateState from "@/components/attachmentStates/createState.vue";
import RefillState from "@/components/attachmentStates/RefillState.vue";
import { ref, reactive, toRaw, onMounted, watch } from "vue";
import { useRecruitmentApplicantAuthStore } from "@/stores/universalAuth";
import { RecruitmentApplicantAPI } from "@/api/recruitment/applicant/api";
import { useProjectIdStore } from "@/stores/RecruitmentApplicantStore";
import { useToast } from "primevue/usetoast";

const applicantAuth = useRecruitmentApplicantAuthStore();
const api = new RecruitmentApplicantAPI(applicantAuth);
const project = useProjectIdStore();

const toast = useToast();

const isEnabled = ref(false);

let refillFile = reactive({
	state: 3,
	loading: false,
	order: 1,
});

let fetchResponse = reactive({
	success: false,
	message: "" as string | [],
});

const editToCreate = () => {
	refillFile.state = 3;
};

const createToEdit = () => {
	refillFile.state = 4;
};

const uploadFile = async (body: object) => {
	return await api.uploadRefillFile(body, project.project.pid);
};

const handleUpload = async (body: object) => {
	refillFile.loading = true;

	const res = await uploadFile(body);

	if (res?.success !== undefined && res?.message !== undefined) {
		fetchResponse.success = toRaw(res.success);
		fetchResponse.message = toRaw(res.message);
	}

	refillFile.loading = false;

	if (fetchResponse.success) {
		toast.add({
			severity: "success",
			summary: "Success",
			detail: fetchResponse.message,
			life: 3000,
		});
	} else {
		toast.add({
			severity: "error",
			summary: "Error",
			detail: fetchResponse.message,
			life: 5000,
		});
	}
};

onMounted(async () => {
	await api.getProgramList().then((res) => {
		res.map((item) => {
			if (item.id === project.project.pid && item.isMoredoc)
				isEnabled.value = true;
		});
	});
});

watch(
	() => refillFile.loading,
	async () => {
		await api.getProgramList().then((res) => {
			res.map((item) => {
				if (item.id === project.project.pid && item.isMoredoc)
					isEnabled.value = true;
				else isEnabled.value = false;
			});
		});
	}
);
</script>

<style setup lang="css">
/* .recruitmentAdditionNoData {
	position: absolute;
	left: 50%;
	top: 63%;
	transform: translate(-50%, -50%);
	height: 400px;
	width: 500px;
} */
</style>
