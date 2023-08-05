export default defineNuxtRouteMiddleware((to) => {
    const store=userStore();
    if(store.loggedIn)
        return;
    else  
        return navigateTo('/auth/login');    

})