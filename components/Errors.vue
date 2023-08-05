<template>
    <div v-if="errors" class="text-center">
        <ul class="list-group">
            <li class="list-group-item" v-for="(error, i) in errors" :key="i">
                <div class="text-danger" v-for="(obj, j) in error" :key="j">
                    {{ obj }}
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    errors: object
}>()


</script>

<style></style>
