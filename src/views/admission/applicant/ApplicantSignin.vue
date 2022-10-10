<template>
	<LandingViewBase>
		<template #form>
			<LoginForm :title="$t('資訊工程學系報名系統')"/>
		</template>
	</LandingViewBase>
</template>

<script setup lang="ts">

import LandingViewBase from "@/components/LandingViewLayout.vue"
import LoginForm from "@/components/LoginForm.vue"

</script>
