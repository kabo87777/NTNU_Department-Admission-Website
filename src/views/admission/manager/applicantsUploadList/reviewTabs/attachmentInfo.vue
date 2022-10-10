<template>
    this is attachment info tab
</template>

<script setup lang="ts">
const props = defineProps(["userId"]);
const {userId} = props;
console.log(userId, "attachment info tab");
</script>