<template>
    <form @submit.prevent="submit" class="">
        <div class="mb-4">
            <label class="form-label fw-light">Your Name *</label>
            <input v-model="form.name" class="form-control" type="text" placeholder="Enter email address" />
            <error-field v-if="errorFields" :errors="errorFields" field="name"></error-field>
        </div>
        <div class="mb-4">
            <label class="form-label fw-light">Email Address *</label>
            <input v-model="form.email" class="form-control" type="email" placeholder="Enter email address" />
            <error-field v-if="errorFields" :errors="errorFields" field="email"></error-field>
        </div>
        <div class="mb-4">
            <label class="form-label fw-light">Password *</label>
            <input v-model="form.password" class="form-control" type="password" placeholder="*******" />
            <error-field v-if="errorFields" :errors="errorFields" field="password"></error-field>
        </div>
        <div class="mb-4">
            <label class="form-label fw-light">Password Confirmation *</label>
            <input v-model="form.password_confirmation" class="form-control" type="text"
                placeholder="confirm your password" />
            <error-field v-if="errorFields" :errors="errorFields" field="password_confirmation"></error-field>
        </div>
        <button type="submit" class="btn btn-primary">Sign up</button>
        <loading v-if="isLoading" />
    </form>
</template>

<script setup>
import { storeToRefs } from "pinia";

const form = reactive({
    email: "kanso275@gmail.com",
    name: "hsen kanso",
    password: "09876e",
    password_confirmation: "09876e",
    type: 0,
})
const authStore = userStore();
const { isLoading, errorFields } = storeToRefs(authStore);
async function submit() {
    authStore.setLoading();
    await authStore.register(form, '/register');
}
</script>

<style></style>


<!-- // isLoading.value = true;
    // useNuxtApp().$api.get('/sanctum/csrf-cookie');
    // useNuxtApp().$api.post('/register',form)
    //     .then((res) => {
    //         isLoading.value = false;
    //         navigateTo('/auth/login');
    //     })
    //     .catch((er) => {
    //         isLoading.value = false;
    //         if (er.response && er.response.data && er.response.data.errors)
    //             errors.value = er.response.data.errors;
    //     }); -->
