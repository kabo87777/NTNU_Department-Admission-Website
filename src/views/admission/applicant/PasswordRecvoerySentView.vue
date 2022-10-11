<template>

<BaseLayout>
  <template #form>
    <PwdRecovery role="applicant"></PwdRecovery>
  </template>
</BaseLayout>

</template>

<script setup lang="ts">
import BaseLayout from '@/components/LandingViewLayout.vue'
import PwdRecovery from '@/components/PasswordRecoveryEmailSent.vue'
import { ref } from 'vue';

</script>