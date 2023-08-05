<template>
    <div v-if="errors[field]" class="fs-6 text-danger fw-bold">{{ errors[field][0] }}</div>
</template>

<script setup >
defineProps(['errors', 'field'])
</script>

<style></style>
