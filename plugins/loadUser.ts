export default defineNuxtPlugin(async (nuxtApp) => {
    const auth = userStore();
    const token=useCookie('token');
    if (!auth.loggedIn && !!token.value) {
        console.log('plugin work',!auth.loggedIn && !!token.value);
        
      await auth.fetchUser()
    }
  })