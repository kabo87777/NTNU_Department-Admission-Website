<template>
	<div class="fixed inset-y-0 left-0">
		<img src="/assets/login-page/Login-img.png" class="h-200" />
	</div>
	<!-- FIXME:附著在底下的空白，以免圖片露餡，但或許有更好的做法 -->
	<div
		class="fixed inset-y-0 right-0 z-30 bg-white"
		w="125 <sm:full lg:150"
	/>
	<div
		class="absolute inset-y-0 right-0 z-50 bg-white"
		w="125 <sm:full lg:150"
		px="lg:15"
	>
		<div class="flex flex-col py-4 gap-6 mx-8 h-full">
			<!-- 標題內容 -->
			<div space="y-18">
				<img
					src="/assets/login-page/NTNU-logo-B1.png"
					w="48"
					class="sm:invisible"
				/>
				<div class="m-8" space="y-2">
					<div class="<sm:hidden" text="lg secondary" font="light">
						國立台灣師範大學資訊工程學系 NTNU CSIE
					</div>
					<div text="3xl title" font="medium">
						資訊工程學系報名系統
					</div>
					<div text="lg title" font="medium">
						NTNU CSIE Admissions
					</div>
				</div>
			</div>

			<Divider align="center">
				<div class="px-4 font-light" text="sm body">請選擇系統</div>
			</Divider>

			<!-- 按鈕選項 -->
			<div class="w-4/5 mx-auto" space="y-12">
				<div class="flex-auto place-items-center">
					<router-link to="/admission">
						<button
							class="p-4 w-full"
							bg="hover:nGold-300 active:nGold-500"
							border="2 opacity-30 nGold-600 rounded-lg hover:nGold-300"
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
							bg="hover:nBlue-200 active:nBlue-500"
							border="2 opacity-30 nBlue-600 rounded-lg hover:nBlue-200"
							text="pReviewer hover:title active:white"
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
