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
			<div class="w-md flex flex-col gap-y-2">
				<div>
					<label for="" class="block font-black">{{
						$t("帳號")
					}}</label>
					<InputText
						:class="{
							'w-full': true,
							'p-invalid': isInvalid('username'),
						}"
						v-model:model-value="data.username"
					/>
					<small class="p-error" v-if="isInvalid('username')">{{
						$t("此為必填欄位")
					}}</small>
				</div>

				<div>
					<label for="" class="block font-black">{{
						$t("密碼")
					}}</label>
					<Password
						:class="{
							'w-full': true,
							'p-invalid': isInvalid('password'),
						}"
						:toggle-mask="true"
						input-class="w-full"
						v-model:model-value="data.password"
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
					<small class="p-error" v-if="isInvalid('password')">{{
						$t("格式不符合要求")
					}}</small>
				</div>

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
import { useRecruitmentAdminAuthStore } from "@/stores/universalAuth";
import NButton from "@/styles/CustomButton.vue";
import useVuelidate from "@vuelidate/core";
import { email, helpers, required } from "@vuelidate/validators";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import { ref, defineProps, computed } from "vue";
import { useI18n } from "vue-i18n";
const { locale, t: $t } = useI18n();

const props = defineProps(["visible"]);
const emit = defineEmits(["update:visible", "submit"]);

const isVisible = computed({
	get() {
		return props.visible;
	},
	set(state: boolean) {
		emit("update:visible", state);
	},
});
const isSubmitted = ref(false);
const isProcessing = ref(false);
const adminAuth = useRecruitmentAdminAuthStore();

const data = ref({
	name: "",
	email: "",
	username: "",
	password: "",
});
const resetForm = () => {
	data.value = {
		name: "",
		email: "",
		username: "",
		password: "",
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
		password: { pwdRegex, required },
		username: { required },
	},
	data,
	{ $lazy: false }
);

const isInvalid = (field: string) => {
	return v$.value[field].$invalid && isSubmitted.value;
};

const submit = () => {
	isSubmitted.value = true;
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
</script>
