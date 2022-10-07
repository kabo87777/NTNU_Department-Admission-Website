<template>
	<div class="grid grid-cols-2 gap-15px">
		<div>
			<img
				src="./../../assets/login-page/Login-img.png"
				class="h-screen"
			/>
		</div>
		<div>
			<div class="grid grid-cols-2">
				<img
					src="./../../assets/login-page/NTNU-logo-B1.png"
					class="h-15 w-80 mt-150px"
				/>
				<div class="mt-150px ml-50px text-4xl font-bold text-gray-500">
					{{ $t("資訊工程學系") }}
				</div>
			</div>
			<div class="mt-100px ml-150px text-4xl font-bold text-gray-500">
				{{ $t("資訊工程學系報名系統") }}
			</div>
			<div class="mt-50px ml-120px">
				<router-link to="/login">
					<Button :label="$t('申請者登入')" class="h-75px w-400px" />
				</router-link>
			</div>

			<div class="mt-50px ml-120px">
				<router-link to="/login">
					<Button
						:label="$t('審查委員/行政人員登入')"
						class="h-75px w-400px"
					/>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import Button from "primevue/button";
</script>
