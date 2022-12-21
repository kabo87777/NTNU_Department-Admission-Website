<template>
	<div class="mt-80px ml-50px">
		<div class="font-[500] text-[32px] font-bold">
			{{ $t("使用者管理") }}
		</div>
		<div class="bigYellowDivider"></div>
		<div class="mt-8px px-12px py-24px">
			<div class="text-[20px] font-[350]">
				{{ $t("帳號名稱") }}{{ $t(":") }}{{ applicantInfo?.username }}
			</div>
			<div class="mt-36px text-[20px] font-[350]">
				{{ $t("聯絡信箱") }}：{{ applicantInfo.email }}
			</div>
		</div>
		<ParagraphDivider class="mt-12px" />
		<div class="mt-20px font-[500] font-bold text-[24px] flex">
			<div>{{ $t("修改密碼") }}</div>
			<i class="pi pi-lock ml-16px mt-4px text-[#C6BCD0]" />
		</div>
		<form class="flex flex-col gap-y-2">
			<div class="flex items-center gap-x-8 w-3/5">
				<label
					for=""
					class="block font-normal text-xl text-right align-middle flex-grow w-1/3"
					>{{ $t("舊密碼") }}</label
				>
				<div class="w-2/3">
					<Password
						class="w-full"
						:input-class="invalidClass('old')"
						v-model="password.old"
						:toggle-mask="true"
						:feedback="false"
					/>
					<small v-if="isInvalid('old')" class="block p-error">{{
						$t("此為必填欄位")
					}}</small>
				</div>
			</div>

			<div class="flex items-center gap-x-8 w-3/5">
				<label
					for=""
					class="block font-normal text-xl text-right align-middle flex-grow w-1/3"
					>{{ $t("新密碼") }}</label
				>
				<div class="w-2/3 mt-2">
					<Password
						:input-class="invalidClass('new')"
						class="w-full"
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
					<small v-if="isInvalid('new')" class="block p-error">{{
						$t("格式不符合要求")
					}}</small>
				</div>
			</div>

			<div class="flex items-center gap-x-8 w-3/5">
				<label
					for=""
					class="block font-normal text-xl text-right align-middle flex-grow w-1/3"
					>{{ $t("確認密碼") }}</label
				>

				<div class="w-2/3">
					<Password
						:input-class="invalidClass('confirm')"
						class="w-full"
						v-model="password.confirm"
						:toggle-mask="true"
						:feedback="false"
					/>
					<small class="p-error block" v-if="isInvalid('confirm')">{{
						v$.confirm.required.$invalid
							? $t("此為必填欄位")
							: $t("兩者不符")
					}}</small>
				</div>
			</div>

			<div class="flex gap-x-2 w-3/5">
				<div class="flex-grow"></div>
				<Button
					class=""
					icon="pi pi-pencil"
					:loading="isProcessing"
					@click="handleSubmit()"
					:label="$t('送出變更')"
				/>

				<Button
					class=""
					icon="pi pi-undo"
					@click="resetPassValue()"
					:label="$t('重置表單')"
				/>
			</div>
		</form>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive, toRaw, computed } from "vue";
import { AdmissionApplicantAuthResponse } from "@/api/admission/applicant/types";
import { useAdmissionApplicantAuthStore } from "@/stores/universalAuth";
import { useUserInfoStore } from "@/stores/AdmissionApplicantStore";
import { AdmissionApplicantAPI } from "@/api/admission/applicant/api";
import { useI18n } from "vue-i18n";
import ParagraphDivider from "@/styles/paragraphDividerApplicant.vue";
import { useToast } from "primevue/usetoast";
import Password from "primevue/password";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import "primeicons/primeicons.css";
import useVuelidate from "@vuelidate/core";
import { helpers, required, sameAs } from "@vuelidate/validators";
import { useMutation } from "@tanstack/vue-query";
import type { AdmApplicantChangePasswordRequest } from "@/api/admission/applicant/types";

const { t: $t, locale } = useI18n();
const toast = useToast();
const applicantAuth = useAdmissionApplicantAuthStore();
const applicantStore = useUserInfoStore();
const api = new AdmissionApplicantAPI(applicantAuth);
const applicantInfo = ref(applicantStore.userInfo);

applicantStore.$subscribe((mutation, state) => {
	applicantInfo.value = state.userInfo;
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
	mutationFn: (data: AdmApplicantChangePasswordRequest) => {
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
