<template>
	<h1 class="text-4xl text-bold tracking-widest">專案設定</h1>
	<Divider class="bg-ntnuRed" />
	<h2 class="text-2xl text-bold tracking-widest inline-block">
		111年研究生審查
	</h2>
	<Button class="w-100px h-40px ml-20px p-button-outlined p-button-success">
		<img
			alt="logo"
			src="../../src/assets/project-setting/Check_fill.png"
			style="width: 1.5rem"
			class="fill-green-500"
		/>
		<span class="tracking-1px"> 保存 </span>
	</Button>
	<Button class="w-100px h-40px ml-20px p-button-outlined p-button-danger">
		<img
			alt="logo"
			src="../../src/assets/project-setting/Close_round.png"
			style="width: 1.5rem"
			class="fill-green-500"
		/>
		<span class="tracking-1px"> 刪除 </span>
	</Button>
	<h3 class="text-xs tracking-widest text-gray-500">
		2022/09/15 · 新增到專案
	</h3>
</template>

<script setup lang="ts">
import Divider from "primevue/divider";
import Button from "primevue/button";
</script>
