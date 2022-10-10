<template>
    this is applicant upload docs page
    <BasicInfo :userId=1 />
    <AttachmentInfo :userId=1 />
    <AdditionalInfo :userId=1 />
</template>

<script setup lang="ts">
import BasicInfo from "./reviewTabs/BasicInfo.vue";
import AttachmentInfo from "./reviewTabs/AttachmentInfo.vue";
import AdditionalInfo from "./reviewTabs/AdditionalInfo.vue";
</script>