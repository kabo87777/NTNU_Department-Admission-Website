<template>
    <div class="grid grid-cols-9 gap-x-4">
		<div class="col-span-5">
			<img
				src="/assets/login-page/Login-img.png"
				alt=""
				class="overflow-auto"
			/>
		</div>

		<div class="col-span-4 mt-20">
			<!-- Logo -->
			<div class="flex mt-2 justify-center items-center">
				<img
					src="/assets/login-page/NTNU-logo-B1.png"
					alt=""
					class="h-12"
				/>
				<Divider layout="vertical" />
				<div>
					<h1 class="text-3xl font-bold text-gray-500">
						資訊工程學系
					</h1>
					<h3 class="text-xs text-gray-400">
						Department of Computer Science and Information
						Enginering
					</h3>
				</div>
			</div>

			<div v-if="hasSlot('form')" class="mt-20">
				<!-- Form -->
				<slot name="form"></slot>
			</div>

		</div>
	</div>
</template>

<script lang="ts" setup>
import { useSlots } from 'vue';

const vue_slots=useSlots()

const hasSlot = (name: string)=>{
	return !!vue_slots[name]
}
</script>