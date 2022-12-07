<template>
	<div class="fixed inset-y-0 left-0">
		<img
			src="/assets/login-page/Login-img.png"
			class="h-full object-cover"
		/>
	</div>
	<div class="fixed inset-y-0 right-0 z-50 bg-white w-125 <sm:w-full">
		<div class="flex flex-col justify-center gap-8 mx-8 h-full">
			<!-- 標題內容 -->
			<div space="y-8">
				<div class="sm:invisible">
					<img
						src="/assets/login-page/NTNU-logo-B1.png"
						width="300"
					/>
				</div>
				<div class="mx-8" space="y-2">
					<div class="<sm:hidden" text="lg secondary" font="light">
						國立台灣師範大學資訊工程學系 NTNU CSIE
					</div>
					<div text="4xl title" font="medium">
						資訊工程學系報名系統
					</div>
					<div text="2xl title" font="medium">
						NTNU CSIE Admissions
					</div>
				</div>
			</div>

			<Divider align="center">
				<div class="px-4 text-body font-light">請選擇系統</div>
			</Divider>

			<!-- 按鈕選項 -->
			<div class="w-4/5 mx-auto" space="y-8" text="xl">
				<div class="flex-auto place-items-center">
					<router-link to="/admission">
						<button
							class="p-4 w-full"
							bg="hover:nGold-300 active:nGold-500"
							border="2 nGold-600 rounded-lg hover:nGold-300"
							text="pApplicant hover:title active:white"
						>
							<div>招生系統 Admission System</div>
						</button>
					</router-link>
				</div>
				<div class="flex-auto place-items-center">
					<router-link to="/recruitment">
						<button
							class="p-4 w-full"
							bg="hover:nRed-300 active:nRed-500"
							border="2 nRed-600 rounded-lg hover:nRed-300"
							text="pAdmin hover:title active:white"
						>
							<div>教師聘請系統 Recruitment System</div>
						</button>
					</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import Button from "primevue/button";
import Divider from "primevue/divider";
</script>
