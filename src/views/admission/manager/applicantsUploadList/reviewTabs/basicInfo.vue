<template>
    this is basic info tab
</template>

<script setup lang="ts">
const props = defineProps(["userId"]);
const {userId} = props;
console.log(userId, "basic info tab");
</script>