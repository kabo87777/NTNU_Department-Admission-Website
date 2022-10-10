<template>
	<div class="mx-30">
		<h1 v-if="hasSlot('h1')" class="text-3xl font-bold text-gray-500 block">
			<slot name="h1"></slot>
		</h1>

		<form action="">
			<div class="mt-10">
				<label for="admission_ticket_ID" class="block">{{
					$t("准考證號碼")
				}}</label>
				<div class="pt-1">
					<InputText
						class="w-full"
						type="text"
						id="admission_ticket_ID"
					/>
				</div>
			</div>

			<div class="mt-3">
				<label for="password" class="block">{{ $t("密碼") }}</label>

				<div class="pt-1">
					<InputText
						class="w-full"
						type="password"
						id="password"
					></InputText>
				</div>
			</div>

			<div class="mt-4">
				<Checkbox v-model="rememberMe" />
				<label for="" class="ml-1">{{ $t("記住我") }}</label>
<<<<<<< HEAD
				<router-link
					:to="forgetPwdLink"
					class="float-right text-blue-500"
				>
					{{ $t("忘記密碼") }}
				</router-link>
=======
				<a href="" class="float-right text-blue-500">{{
					$t("忘記密碼")
				}}</a>
>>>>>>> develop
			</div>

			<div class="mt-5">
				<Turnstile />
				<Button class="w-full" :label="$t('登入')" />
			</div>
		</form>
	</div>
</template>

<script setup lang="ts">
<<<<<<< HEAD
import { computed, ref, useSlots } from "vue";
=======
import { ref } from "vue";
>>>>>>> develop
import InputText from "primevue/inputtext";
import Checkbox from "primevue/checkbox";
import Button from "primevue/button";
import Turnstile from "@/components/Turnstile.vue";

<<<<<<< HEAD
const props = defineProps<{
	role: "applicant" | "manager";
}>();

const rememberMe = ref(false);

const forgetPwdLink = computed(() => {
	// Can use this line once manager route is changed to camelCase `forgetPassword`
	// return `/admission/${props.role}/forgetPassword`

	if (props.role === "applicant") {
		return "/admission/applicant/forgetPassword";
	} else if (props.role === "manager") {
		return "/admission/manager/forgetpassword";
	} else return "";
});

const vue_slots = useSlots();

const hasSlot = (name: string) => {
	return !!vue_slots[name];
};
=======
defineProps<{
	title?: string;
}>();

const rememberMe = ref(false);
>>>>>>> develop
</script>
