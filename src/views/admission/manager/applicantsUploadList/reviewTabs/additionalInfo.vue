<template>
    this is additional info tab
</template>

<script setup lang="ts">
const props = defineProps(["userId"]);
const {userId} = props;
console.log(userId, "additional info tab");
</script>