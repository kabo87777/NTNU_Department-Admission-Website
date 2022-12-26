<template>
	<Dialog :modal="true" v-model:visible="visible" :draggable="false">
		<template #header>
			<h3 class="font-black text-lg">{{ $t("建立審查者帳號") }}</h3>
		</template>

		<template #default>
			<div class="w-lg grid gap-y-2">
				<div>
					<label class="block font-black">{{ $t("姓名") }}</label>
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
						class="w-full"
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
			<div class="flex justify-center">
				<div class="space-x-2">
					<Button
						icon="pi pi-check"
						:label="$t('送出')"
						class="p-button-outlined p-button-success"
						@click="submit()"
					></Button>
					<Button
						icon="pi pi-times"
						:label="$t('取消')"
						class="p-button-outlined p-button-danger"
						@click="close()"
					></Button>
				</div>
			</div>
		</template>
	</Dialog>
</template>

<script setup lang="ts">
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import { ref, computed, toRaw } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps(["show"]);
const emit = defineEmits(["update:show", "submit"]);

const { t: $t } = useI18n();

const visible = computed({
	get() {
		return props.show;
	},
	set(state: boolean) {
		emit("update:show", state);
	},
});

const data = ref({
	name: "",
	email: "",
	redirect_url: `${import.meta.env.VITE_BASEURL}/admission/reviewer/setupaccount`,
});
const v$ = useVuelidate(
	{
		name: { required },
		email: { required, email },
	},
	data,
	{ $lazy: false }
);

const close = () => {
	visible.value = false;
	// Reset form on close
	data.value.name = "";
	data.value.email = "";
	isSubmitted.value = false;
};

const isSubmitted = ref(false);
const submit = () => {
	isSubmitted.value = true;
	if (v$.value.$invalid === true) return;

	const body = { ...toRaw(data.value) };
	emit("submit", body);
	close();
};

const isInvalid = (field: string) => {
	return v$.value[field].$invalid && isSubmitted.value;
};
</script>
