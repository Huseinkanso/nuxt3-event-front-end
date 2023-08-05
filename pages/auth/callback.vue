<template>
    <div class="text-center m-auto bg-primary rounded shadow">
        <h2 class="text-white">please wait a minute...</h2>
    </div>
</template>
<script setup>
import { storeToRefs } from "pinia";

definePageMeta({
    layout: "guest-layout",
    middleware: "guest"
})
const store = userStore();
const {user} = storeToRefs(store)
const route = useRoute();
const { data } = await useApiFetch('/login/github/callback', { method: 'post', body: route.query });
console.log('before if', data.value);
const mydata = data.value
console.log('mydata', mydata);
store.setUser(mydata.user)
store.setNotification(mydata.notify);
useNuxtApp().$cookie.set("token", mydata.token);
// if (user.type == 1) navigateTo("/speaker/dashboard");
// else if (user.type == 2) navigateTo("/admin");
// else navigateTo("/");
// if (data.value) {
//     const dd = data.value
    // console.log(dd);
    // setNotification(dataRef.value.notify);
    // setUser(dataRef.value.user)
    // useNuxtApp().$cookie.set("token", dataRef.value.token);
    // const type=user.type
    // if (type == 1)  navigateTo("/speaker/dashboard");
    //   else if (type == 2)  navigateTo("/admin");
    //   else   navigateTo("/");
// }

</script>
