<template>
	<Dialog
		:modal="true"
		:draggable="false"
		@after-hide="resetForm()"
		v-model:visible="isVisible"
	>
		<template #header>
			<h3 class="font-black text-lg">{{ $t("建立審查者帳號") }}</h3>
		</template>

		<template #default>
			<Transition>
				<Message severity="error" v-if="isError">{{
					$t("處理失敗，請關閉對話窗後再試")
				}}</Message>
			</Transition>
			<div class="w-md flex flex-col gap-y-2">
				<div>
					<label for="" class="block font-black">{{
						$t("姓名")
					}}</label>
					<InputText
						type="text"
						:class="{
							'w-full': true,
							'p-invalid': isInvalid('name'),
						}"
						v-model:model-value="data.name"
					/>
					<small class="p-error" v-if="isInvalid('name')">{{
						$t("此為必填欄位")
					}}</small>
				</div>

				<div>
					<label for="" class="block font-black">{{
						$t("電子信箱")
					}}</label>

					<InputText
						type="email"
						:class="{
							'w-full': true,
							'p-invalid': isInvalid('email'),
						}"
						v-model:model-value="data.email"
					/>
					<small class="p-error" v-if="isInvalid('email')">{{
						$t("電子信箱格式錯誤")
					}}</small>
				</div>
			</div>
		</template>
		<template #footer>
			<div flex="~ gap-6" justify="center">
				<NButton
					Admin
					:icon="
						isProcessing ? 'pi pi-spin pi-spinner' : 'pi pi-check'
					"
					class="h-11 min-w-36"
					@click="submit()"
					>{{ $t("送出") }}</NButton
				>
				<NButton
					icon="pi pi-times"
					class="h-11 min-w-36"
					@click="isVisible = false"
					>{{ $t("取消") }}</NButton
				>
			</div>
		</template>
	</Dialog>
</template>

<script setup lang="ts">
import { RecruitmentAdminAPI } from "@/api/recruitment/admin/api";
import { RecruitmentAdminCreateReviewerRequest } from "@/api/recruitment/admin/types";
import { useRecruitmentAdminAuthStore } from "@/stores/universalAuth";
import NButton from "@/styles/CustomButton.vue";
import { useMutation } from "@tanstack/vue-query";
import useVuelidate from "@vuelidate/core";
import { email, helpers, required } from "@vuelidate/validators";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import Message from "primevue/message";
import Password from "primevue/password";
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
const { locale, t: $t } = useI18n();

const props = defineProps(["visible"]);
const emit = defineEmits(["update:visible", "success"]);

const isVisible = computed({
	get() {
		return props.visible;
	},
	set(state: boolean) {
		emit("update:visible", state);
	},
});

const isError = ref(false);
const isSubmitted = ref(false);
const isProcessing = ref(false);
const adminAuth = useRecruitmentAdminAuthStore();
const api = new RecruitmentAdminAPI(adminAuth);

const data = ref({
	name: "",
	email: "",
	redirect_url: "http://127.0.0.1:5173/recruitment/reviewer/setupaccount",
});
const resetForm = () => {
	data.value = {
		name: "",
		email: "",
		redirect_url: "http://127.0.0.1:5173/recruitment/reviewer/setupaccount",
	};
	isSubmitted.value = false;
};

const pwdRegex = helpers.regex(
	/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,128}$/
);

const v$ = useVuelidate(
	{
		name: { required },
		email: { email, required },
	},
	data,
	{ $lazy: false }
);

const isInvalid = (field: string) => {
	return v$.value[field].$invalid && isSubmitted.value;
};

const submit = () => {
	isSubmitted.value = true;

	if (v$.value.$invalid) return;

	isProcessing.value = true;
	mutate(data.value, {
		onSuccess: () => {
			isVisible.value = false;
			emit("success");
		},
		onError: (err) => {
			isError.value = true;
			console.log(err);
		},
		onSettled: () => {
			isProcessing.value = false;
		},
	});
};

const { mutate } = useMutation({
	mutationFn: async (body: RecruitmentAdminCreateReviewerRequest) => {
		return api.createReviewerAccount(body);
	},
});
</script>
