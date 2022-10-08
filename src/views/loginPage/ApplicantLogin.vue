<template>
  <div class="grid grid-cols-9 gap-x-4">
    <div class="col-span-5 h-full" >
      <img src="../../assets/login-page/Login-img.png" alt="" class="overflow-auto">
    </div>

    <div class="col-span-4 mt-20">
      
      <!-- Logo -->
      <div class="flex mt-2 justify-center items-center">
        <img src="../../assets/login-page/NTNU-logo-B1.png" alt="" class="h-12">
        <Divider layout="vertical" />
        <div>
          <h1 class="text-3xl font-bold text-gray-500">資訊工程學系</h1>
          <h3 class="text-xs text-gray-400">
            Department of Computer Science and Information Enginering
          </h3>
        </div>
      </div>

      <!-- Form -->
      <div class="mt-10 justify-center mx-30">
        <h2 class="pt-6 text-3xl font-bold text-gray-500 inline-block">{{ $t("資訊工程學系報名系統") }}</h2>

        <div class="pt-6">
          <label for="ID" class="block text-base text-gray-600">{{ $t("准考證號碼") }}</label>
          <InputText id="ID" type="text" class="w-full"/>

          <label for="ID" class="block text-base text-gray-600 mt-3">{{ $t("密碼") }}</label>
          <InputText id="password" type="password" class="w-full"/>
          
          <div class="items-center mt-3">
            <span class="inline-block">
              <Checkbox />
              <label class="text-base text-gray-600 ml-1">{{ $t("記住我") }}</label>
            </span>
            <div class="float-right">

              <a href="" class="text-base text-blue-300">{{ $t("忘記密碼") }}</a>
            </div>
          </div>

          <div class="mt-10">
            <Button label="登入" class="w-full"/>
          </div>
        </div>
      </div>

    </div>
  </div>

</template>

<script setup lang="ts">
import InputText from "primevue/inputtext";
import Checkbox from "primevue/checkbox";
import Button from "primevue/button";
import { ref } from "vue";

</script>

