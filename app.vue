<template>
    <NuxtLayout>
        <NuxtPage />
        <ClientOnly>
        <!-- <MyNotifications   position="top left"  :speed="500" />     v-if="displayNotification" :text="notification" -->
        <layoutsNotification  status="success" />
    </ClientOnly>
    </NuxtLayout>
</template>

<script setup>

import { storeToRefs } from "pinia";

const store = userStore();
const {notification}=storeToRefs(store)
// const displayNotification = ref(false);

// watch(notification, (newValue, oldValue) => {
//   if (newValue !== oldValue && newValue.length!=0) {
//     displayNotification.value = true;
//   }
// });
// watch(notification, async (newNotification, oldNotification) => {
//   if(newNotification!==oldNotification)
//   {
//     notify({
//         title:'dsef',
//         text:newNotification
//     })
//   }
// })

// console.log(token.value);
// onBeforeMount(async() => {
    
// })
// if(process.server)
// {
//     if(!store.loggedIn && !!token.value)
//     {
//         const { data, error } = await useApiFetch("/me");
//         store.user=data.value!.user as User|Speaker;
//     }
// }


// if (!store.loggedIn && !!token.value) {
//         const {data, error} = await useApiFetch("/me");
//         if(data.value)
//         {
//             console.log(data.value);
            
//             store.user=data.value.user;
//             redirectUser(store.user!.type, null);
//         }
//         if(error)
//         {
//             console.log(error);
            
//         }
//     }
// onBeforeMount(() => {
//     if (useNuxtApp().$cookie.get('token')) {
//         useNuxtApp().$api.get(`/sanctum/csrf-cookie`);
//         useNuxtApp().$api.get('/me').then((res) => {
//             userStore().setUser(res.data.user);
//         }).catch((err) => {
//             userStore().logout();
//             useNuxtApp().$cookie.remove('token');
//             navigateTo('/store/login');
//         })
//     }else
//     {
//         userStore().logout();
//         navigateTo('/auth/login');
//     }

// })
// watch(
//     () => userStore().notification,
//     (not, prevNot) => {
//         useToast().success(userStore().notification);
//     }
// )




</script>

<style></style>