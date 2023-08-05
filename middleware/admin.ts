export default defineNuxtRouteMiddleware(() => {
    const user: User | null = userStore().user;
    if(user)
        if(user.type==2)
            return;
        else 
            return abortNavigation();
    else 
        return navigateTo('/auth/login')            

  })