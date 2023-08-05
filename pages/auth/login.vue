<template>
    <client-only>
        <h3 class="text-center">login with your account</h3>
        <div class="w-full flex flex-wrap justify-center">
            <button class="btn btn-dark text-white form-control my-3" @click="loginWithGithub">

                Login With Github
            </button>
        </div>
        <form @submit.prevent="submit">
            <div class="mb-4">
                <label class="form-label fw-light">Email Address *</label>
                <input v-model="form.email" class="form-control" type="email" placeholder="Enter email address" />
            </div>
            <div class="mb-4">
                <label class="form-label fw-light">Password *</label>
                <input v-model="form.password" class="form-control" type="password" placeholder="*******" />
            </div>
            <error-field v-if="errorFields" :errors="errorFields" field="email"></error-field>
            <div class="mb-3 d-flex justify-content-between">
                <nuxt-link to="/auth/ForgotPassword"
                    class="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">forgot
                    your password</nuxt-link>
                <nuxt-link class="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                    to="/auth/register/registerUser">sign up new account</nuxt-link>
            </div>
            <div class="d-flex">
                <button type="submit" class="btn btn-primary my-2 p-2">login</button>
            </div>
            <loading  v-if="isLoading"/>
        </form>
    </client-only>
</template>

<script setup >
import { storeToRefs } from "pinia";

definePageMeta({
    middleware: ["guest"],
    layout: "guest-layout",
})
const form = reactive({
    email: "",
    password: "",
});
const authStore= userStore();
const { isLoading, errorFields } = storeToRefs(authStore);
async function submit() {
    authStore.setLoading();
    await authStore.login(form);
}

// async function githubLogin() {
//     setLoading();
//     const { data, error } = await store.loginWithGithub();
    

// }
   // useNuxtApp().$api.get('/login/github').then((res) => {
    //     isLoading.value = false;
    //     store.setNotification(res.data.notify)
    //     if (res.data.url) {

    //         window.location.href = res.data.url
    //     }
    // }).catch((er) => { isLoading.value = false; })

// async function submit() {
//     isLoading.value = true;
//     useNuxtApp().$api.get(`/sanctum/csrf-cookie`);
//     useNuxtApp().$api.post(`/login`, form)
//         .then(res => {
//             isLoading.value = false;
//             // expire after 30 days
//             useNuxtApp().$cookie.set('token', res.data.token, { expires: 30 });
//             useNuxtApp().$api.defaults.headers.common.Authorization = `Bearer ${res.data.token}`;
//             userStore().setUser(res.data.user)
//             userStore().setNotification(res.data.notify)

//             if(res.data.user.type==1)
//                 navigateTo('/speaker/dashboard')
//             else if (useRoute().query.redirect)
//                 navigateTo(useRoute().query.redirect);
//             else
//                 navigateTo('/');

//         })
//         .catch(er=> {
//             isLoading.value = false;
//             console.log(er);
//             if(er.response && er.response.data && er.response.data.errors)
//                 errors.value = er.response.data.errors;

//         });

// };



</script>

<style></style>
