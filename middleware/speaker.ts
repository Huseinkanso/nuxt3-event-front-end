export default defineNuxtRouteMiddleware(() => {
  const user: User | null = userStore().user;
  if(!!user)
  {
    if(user.type==1)
      return;
    else if(user.type==2)
      return navigateTo('/admin')
    else 
    return navigateTo('/')  
  }else 
  return navigateTo('/auth/login')
  
});
