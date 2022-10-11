<template>
	<div class="mx-30">
		<h1 v-if="hasSlot('h1')" class="text-3xl font-bold text-gray-500 block">
			<slot name="h1"></slot>
		</h1>
		<h2
			v-if="hasSlot('h2')"
			class="text-3xl font-bold text-gray-500 pt-5 block"
		>
			<slot name="h2"></slot>
		</h2>

		<form action="">
			<div class="pt-5">
				<label for="email" class="block">{{ $t("電子信箱") }}</label>
				<div class="pt-1">
					<InputText id="email" class="w-full" />
				</div>
			</div>

			<div class="mt-5">
				<Turnstile />
				<Button class="w-full" :label="$t('提交')" />
			</div>
		</form>
	</div>
</template>

<script setup lang="ts">
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Turnstile from "@/components/Turnstile.vue";
import { useSlots } from "vue";

const vue_slots = useSlots();

const hasSlot = (name: string) => {
	return !!vue_slots[name];
};
</script>
