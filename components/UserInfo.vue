<template>
    <div>
        <ul class="list-group p-2">
            <h5 class=" py-3 px-2 fw-bold text-secondary text-capitalize">your name:</h5>
            <li class="p-2 list-group-item">{{ user.name }}</li>

            <h5 class=" py-3 px-2 fw-bold text-secondary text-capitalize">your email:</h5>
            <li class="p-2 list-group-item">{{ user.email }}</li>

            <h5 class=" py-3 px-2 fw-bold text-secondary text-capitalize">first time you logged in:</h5>
            <li class="p-2 list-group-item">{{ user.created_at }}</li>

            <h5 class=" py-3 px-2 fw-bold text-secondary text-capitalize">last update info:</h5>
            <li class="p-2 list-group-item">{{ user.updated_at }}</li>

            <h5 class=" py-3 px-2 fw-bold text-secondary text-capitalize">email verification status:</h5>
            <li class="p-2 list-group-item">
                <span v-if="user.email_verified_at != null">{{ user.email_verified_at }}</span>
                <div v-else>
                    <a  style="cursor:pointer" @click.prevent="requestVerify" class="text-underline text-danger fs-4">click to verify your email</a>
                    <loading v-if="isLoading" />
                </div>
            </li>

        </ul>
    </div>
</template>

<script setup>
import loading from "./loading.vue";


const user = userStore().user;
const isLoading=ref(false);
function requestVerify() {
    isLoading.value=true;
    useNuxtApp().$api.post(`/email/verification-notification`)
        .then(res => {
            isLoading.value=false;
            console.log(res.data.notify)
        })
        .catch((er) => {
            isLoading.value=false;
            console.log(er)
        });

};
</script>

<style></style>