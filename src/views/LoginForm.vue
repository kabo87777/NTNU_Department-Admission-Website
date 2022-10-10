<template>

<div class="mx-30">

  <h2 class="text-3xl font-bold text-gray-500 block">{{ title }}</h2>
  
  <form action="">

    <div class="mt-10">
      <label for="admission_ticket_ID" class="block">{{$t("准考證號碼")}}</label>
      <div class="pt-1">
        <InputText class="w-full" type="text" id="admission_ticket_ID"/>
      </div>
    </div>
    
    <div class="mt-3">
      <label for="password" class="block">{{$t("密碼")}}</label>

      <div class="pt-1">
        <InputText class="w-full" type="password" id="password"></InputText>
      </div>
    </div>
  
    <div class="mt-4">
      <Checkbox v-model="rememberMe"/>
      <label for="" class="ml-1">{{$t("記住我")}}</label>
      <a href="" class="float-right text-blue-500">{{$t("忘記密碼")}}</a>
    </div>
  
    <div class="mt-5">
      <Button class="w-full" :label="$t('登入')" />
    </div>
  </form>
</div>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import InputText from "primevue/inputtext";
import Checkbox from "primevue/checkbox";
import Button from "primevue/button";

defineProps<{
  title?: string
}>()

const rememberMe = ref(false)
</script>