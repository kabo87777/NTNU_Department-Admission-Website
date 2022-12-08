<template>
	<!-- Background Image -->
	<img
		src="/assets/login-page/Login-img.png"
		class="fixed min-h-screen h-200"
	/>
	<!-- Content -->
	<div
		class="fixed h-screen z-50 right-0 bg-white"
		w="<md:screen md:min-112 screen-4/9"
	>
		<div flex="~ col" mx="auto" w="100" h="full" justify="center">
			<!-- NTNU School Logo -->
			<img
				src="/assets/login-page/NTNU-logo-B1.png"
				class="w-48 py-4 md:hidden"
			/>
			<!-- Title -->
			<div mx="4" space="y-2">
				<div text="secondary" font="light" class="<md:hidden">
					國立臺灣師範大學
				</div>
				<div text="3xl title" font="medium">資訊工程學系報名系統</div>
				<div text="xl title" font="medium">NTNU CSIE Admissions</div>
			</div>
			<!-- Divider -->
			<Divider align="center">
				<div p="4" text="sm body" font="light">請選擇系統</div>
			</Divider>
			<!-- Buttons -->
			<div flex="~ col gap-12" w="3/4" mx="auto">
				<router-link to="/admission">
					<button
						class="p-4 w-full border-2 text-pApplicant"
						border="2 opacity-30 nGold-500 rounded-lg"
						hover="text-title bg-nGold-300 border-nGold-300"
						active="text-white bg-nGold-500"
					>
						<div>招生系統 Admission System</div>
					</button>
				</router-link>
				<router-link to="/recruitment">
					<button
						class="p-4 w-full border-2 text-pReviewer"
						border="2 opacity-30 nBlue-500 rounded-lg"
						hover="text-title bg-nBlue-200 border-nBlue-200"
						active="text-white bg-nBlue-500"
					>
						<div>教師聘請系統 Recruitment System</div>
					</button>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import Button from "primevue/button";
import Divider from "primevue/divider";
</script>
