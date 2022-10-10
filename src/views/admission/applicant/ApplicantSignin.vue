<template>
	<LandingViewBase>
		<template #form>
			<LoginForm :title="$t('資訊工程學系報名系統')"/>
		</template>
	</LandingViewBase>
</template>

<script setup lang="ts">

import LandingViewBase from "@/views/LandingViewLayout.vue"
import LoginForm from "@/views/LoginForm.vue"

</script>
