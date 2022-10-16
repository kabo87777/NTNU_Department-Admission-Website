<template>
	<div class="mt-16px pl-8px pr-8px">
		<!-- TITLE -->
		<div class="mt-24px text-24px font-medium">{{ $t("就學經歷") }}</div>
		<div class="mt-32px"></div>

		<!-- SCHOOL EXPERIENCE -->
		<ReviewState category="就學經歷" itemName="在學證明" :order="1" />
		<EditState category="就學經歷" :order="2" />
		<CreateState category="就學經歷" />

		<!-- DIVIDER -->
		<FunnyDivider />

		<!-- TITLE -->
		<div class="mt-24px text-24px font-medium">
			{{ $t("考試與檢定分數") }}
		</div>
		<div class="mt-32px"></div>

		<!-- EXAM AND QUALIFICATION TEST SCORE -->
		<ReviewState category="考試與檢定分數" itemName="IELTS" :order="1" />
		<EditState category="考試與檢定分數" :order="2" />
		<CreateState category="考試與檢定分數" />

		<!-- DIVIDER -->
		<FunnyDivider />

		<!-- TITLE -->
		<div class="mt-24px text-24px font-medium">
			{{ $t("其他有利於審查資料") }}
		</div>
		<div class="mt-32px"></div>

		<!-- OTHER -->
		<ReviewState
			category="其他有利於審查資料"
			itemName="L紀是我爸"
			:order="1"
		/>
		<EditState category="其他有利於審查資料" :order="2" />
		<CreateState category="其他有利於審查資料" />

		<!-- DIVIDER -->
		<FunnyDivider />

		<div class="mt-32px"></div>
	</div>
</template>

<script setup lang="ts">
import ReviewState from "./components/reviewState.vue";
import EditState from "./components/editState.vue";
import CreateState from "./components/createState.vue";
import FunnyDivider from "../../../../../styles/funnyDivider.vue";
import "primeicons/primeicons.css";

const props = defineProps(["userId"]);
console.log(props.userId, "attachment info tab");
</script>
