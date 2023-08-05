<template>
    <LayoutsHeader />
    <LayoutsSidebar/>
        <!-- Main content -->
        <slot></slot>
    
    <LayoutsFooter />
</template>

<script setup>
import { storeToRefs } from "pinia";
const store = useEventStore()
const { isLoading, errors, notification } = storeToRefs(store);

// watch(errors, () => {
//     scrollToErrorField();
// });

// function scrollToErrorField() {
//     const errorField = document.getElementById('errorField');
//     // Or, if using a ref: const errorField = this.$refs.errorField;
// }
</script>


<style>

</style>







  <!-- <div class="sidebar open ">
    <svg @click="toggleClass" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
        class="bi bi-list toggle" viewBox="0 0 16 16">
        <path fill-rule="evenodd"
            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
    </svg>

</div> -->