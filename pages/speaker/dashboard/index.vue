<template>
    <div class="dashboard p-5 m-3">

    </div>
</template>

<script setup>
console.log(userStore().user);
console.log(userStore().loggedIn);
definePageMeta({
    middleware: ["speaker"],
    layout: "speaker",
})
</script>