<template>
  <client-only>
    verify...
  </client-only>
</template>

<script setup>
const route = useRoute();
const { setNotification,fetchUser } = userStore();
onMounted(async () => {

  const { data, error } = useApiFetch(`/email/verify/${route.query.id}/${route.query.hash}?expires=${route.query.expires}&signature=${route.query.signature}`);
  if (data.value) {
    setNotification(data.value.notify);
    await fetchUser();
    navigateTo('/');
  }
})
// export default {
//     mounted()
//     {
//         this.$api.get(`/email/verify/${this.$route.query.id}/${this.$route.query.hash}?expires=${this.$route.query.expires}&signature=${this.$route.query.signature}`)
//         .then((res)=>{
//             console.log(res.data.notify);
//             userStore().setNotification(res.data.data.notify);
//             // userStore().getUser();
//             navigateTo('/profile');

//         })
//         .catch((er)=>{

//         })
//     }
// }
</script>

<style></style>