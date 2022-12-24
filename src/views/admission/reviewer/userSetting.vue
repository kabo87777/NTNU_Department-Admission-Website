<template>
	<Layout Reviewer>
		<template #Header>
			{{ $t("使用者管理") }}
		</template>
		<template #Body>
			<div flex="~ col gap-4" p="4" border="rounded-lg nGrey-100 2">
				<div>{{ $t("帳號名稱") }}：{{ reviewerInfo?.name }}</div>
				<div>{{ $t("聯絡信箱") }}：{{ reviewerInfo.email }}</div>
				<!-- <div class="mt-20px">{{ $t("手機號碼") }}：{{ phone }}</div> -->
			</div>
			<div text="2xl title" pb="2">{{ $t("修改密碼") }}</div>
			<div flex="~ col gap-1" text="body">
				<div>{{ $t("舊密碼") }}</div>
				<Password
					class="!w-100"
					:input-class="invalidClass('old')"
					v-model="password.old"
					:toggle-mask="true"
					:feedback="false"
				/>
				<div v-if="isInvalid('old')" text="sm danger">
					{{ $t("請輸入舊密碼") }}
				</div>
			</div>
			<div flex="~ gap-8">
				<div flex="~ col gap-1" text="body">
					<div>{{ $t("設定新密碼") }}</div>
					<Password
						class="!w-100"
						:input-class="invalidClass('new')"
						v-model="password.new"
						:toggle-mask="true"
					>
						<template #header>
							<!-- To overrride PrimeVue's panel header -->
							<div></div>
						</template>
						<template #content>
							<!-- To overrride PrimeVue's password strength meter -->
							<div></div>
						</template>
						<template #footer>
							<p>{{ $t("密碼原則") }}</p>

							<ul class="list-disc list-inside mt-2">
								<li
									v-for="item in pwdHints"
									:key="item"
									:class="
										locale === 'zh'
											? 'leading-1.85rem'
											: 'leading-normal'
									"
								>
									{{ item }}
								</li>
							</ul>
						</template>
					</Password>
					<div v-if="isInvalid('new')" text="sm danger">
						{{ $t("格式不符合要求") }}
					</div>
				</div>
				<div flex="~ col gap-1" text="body">
					<div>{{ $t("驗證新密碼") }}</div>
					<Password
						class="!w-100"
						:input-class="invalidClass('confirm')"
						v-model="password.confirm"
						:toggle-mask="true"
						:feedback="false"
					/>
					<div v-if="isInvalid('confirm')" text="sm danger">
						{{
							v$.confirm.required.$invalid
								? $t("此為必填欄位")
								: $t("兩者不符")
						}}
					</div>
				</div>
			</div>
		</template>
		<template #Footer>
			<div flex="~" justify="center" gap="4">
				<NButton
					Reviewer
					class="p-2 w-32"
					icon="pi pi-pencil"
					:loading="isProcessing"
					@click="handleSubmit()"
					>{{ $t("修改送出") }}</NButton
				>
				<NButton
					Reviewer
					class="p-2 w-32"
					icon="pi pi-undo"
					@click="resetPassValue()"
					>{{ $t("重置表單") }}</NButton
				>
			</div>
		</template>
	</Layout>
</template>

<script setup lang="ts">
import Layout from "@/components/Layout.vue";
import Password from "primevue/password";
import { ref, computed } from "vue";
import { useToast } from "primevue/usetoast";
import "primeicons/primeicons.css";
import { AdmissionReviewerAPI } from "@/api/admission/reviewer/api";
import { useAdmissionReviewerAuthStore } from "@/stores/universalAuth";
import { AdmissionReviewerAuthResponse } from "@/api/admission/reviewer/types";
import { useMutation } from "@tanstack/vue-query";
import type { AdmReviewerChangePasswordRequest } from "@/api/admission/reviewer/types";
import { useUserInfoStore } from "@/stores/AdmissionReviewerStore";
import NButton from "@/styles/CustomButton.vue";
import { useI18n } from "vue-i18n";
import useVuelidate from "@vuelidate/core";
import { sameAs, helpers, required } from "@vuelidate/validators";

const { t: $t, locale } = useI18n();
const toast = useToast();

const reviewerAuth = useAdmissionReviewerAuthStore();
const reviewerStore = useUserInfoStore();
const api = new AdmissionReviewerAPI(reviewerAuth);
const reviewerInfo = ref(reviewerStore.userInfo);

reviewerStore.$subscribe((mutation, state) => {
	reviewerInfo.value = state.userInfo;
});

const isProcessing = ref(false);

const password = ref({
	old: "",
	new: "",
	confirm: "",
});

const pwdRegex = helpers.regex(
	/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,128}$/
);

// Must wrap validation rules in computed in order to be reactive
const rules = computed(() => {
	return {
		old: { required },
		new: { pwdRegex, required },
		confirm: {
			sameAsNew: sameAs(password.value.new),
			required: required,
		},
	};
});

const v$ = useVuelidate(rules, password, { $lazy: false });

const isSubmitted = ref(false);

const resetPassValue = () => {
	password.value = {
		old: "",
		new: "",
		confirm: "",
	};
	isSubmitted.value = false;
};

const pwdHints = computed(() => {
	locale; // this line is meant to be the target reference tracked by computed
	return [
		$t("長度須大於八個字元"),
		$t("須有小寫字母"),
		$t("須有大寫字母"),
		$t("須有數字"),
		$t("不可包含特殊符號"),
	];
});

const { mutate: doChangePassword } = useMutation({
	mutationFn: (data: AdmReviewerChangePasswordRequest) => {
		return api.changePassword(data);
	},
	onMutate: () => {
		isProcessing.value = true;
	},
	onSuccess: () => {
		toast.add({
			severity: "success",
			life: 3000,
			summary: $t("操作成功"),
			detail: $t("成功變更密碼"),
		});
		resetPassValue();
	},
	onError: (err) => {
		toast.add({
			severity: "error",
			life: 3000,
			summary: $t("操作失敗"),
			detail: err,
		});
	},
	onSettled: () => {
		isProcessing.value = false;
	},
});

const handleSubmit = () => {
	isSubmitted.value = true;
	if (v$.value.$invalid === false) {
		const raw = password.value;
		const data = {
			current_password: raw.old,
			password: raw.new,
			password_confirmation: raw.confirm,
		};

		doChangePassword(data);
	}
};

const isInvalid = (field: string) => {
	if (typeof v$.value[field] === "undefined")
		throw new Error(`Field ${field} is undefined`);

	return v$.value[field].$invalid && isSubmitted.value;
};

const invalidClass = (field: string) => {
	if (isInvalid(field)) return "w-full p-invalid";
	else return "w-full";
};
</script>
