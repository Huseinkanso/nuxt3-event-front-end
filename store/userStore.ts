// import {defineStore} from "pinia";
import { defineStore } from "pinia";
import { useApiFetch } from "~/composables/useApiFetch";

export const userStore = defineStore("auth", () => {
  const user = ref<User | Speaker | null>(null);
  const loggedIn = computed(() => !!user.value);
  const notification = ref("");
  const isLoading = ref<boolean>(false);
  const errorFields = ref<object>({});
  function setLoading() {
    isLoading.value = true;
  }
  function setNotification(data: string) {
    notification.value = data;
    setTimeout(() => (notification.value = ""), 4000);
  }
  function setUser(data: User | Speaker) {
    user.value = data;
  }
  function setErrors(errors: object) {
    errorFields.value = errors;
    setTimeout(() => setErrors({}), 5000);
  }
  async function login(credentials: Credentials) {
    await useApiFetch("/sanctum/csrf-cookie");
    const route = useRoute();
    const { data, error } = await useApiFetch("/login", {
      method: "POST",
      body: credentials,
    });
    if (error.value) {
      if (error.value.data && error.value.data.errors)
        setErrors(error.value.data.errors);
    }
    if (data.value) {
      const response: TheResponse = data.value;
      if (response.user) {
        user.value = response.user;
        useNuxtApp().$cookie.set("token", response.token);
        setNotification(response.notify);
        if (user.value!.type == 1) return navigateTo("/speaker/dashboard");
        else if (route.query.redirect)
          return navigateTo(route.query.redirect as string);
        else return navigateTo("/");
      }
    }

    isLoading.value = false;
  }
  async function register(info: FormData, url: string) {
    await useApiFetch("/sanctum/csrf-cookie");

    const { data, error } = await useApiFetch(url, {
      method: "POST",
      // headers: { "content-type": "multiform/form-data" },
      //   url == "/speakerRegister"
      //     ? { "content-type": "multiform/form-data" }
      //     : { "content-type": "application/json" },
      body: info,
    });

    if (data.value) {
      const response: TheResponse = data.value;
      setNotification(response.notify);
      console.log(response);
      navigateTo("/auth/login");
    }

    if (error.value) {
      if (error.value.data && error.value.data.errors)
        setErrors(error.value.data.errors);
      else
        setErrors({ message: ["there is something wron ,try again please"] });
    }
    isLoading.value = false;
  }
  async function logout() {
    await useApiFetch("/logout", { method: "POST" });
    useNuxtApp().$cookie.remove("token");
    user.value = null;
    isLoading.value = false;
    navigateTo("/auth/login");
  }

  async function fetchUser() {
    const { data, error } = await useApiFetch("/me");
    console.log(data);

    if (data.value) {
      const response: TheResponse = data.value;
      user.value = response.user as User | Speaker;
    } else console.log(error);
    isLoading.value = false;
  }

  async function loginWithGithub() {
    await useApiFetch("/sanctum/csrf-cookie");
    const { data, error } = await useApiFetch("/login/github", {
      method: "get",
    });
    if (data.value) {
      const response: TheResponse = data.value;
      if (response.url) {
        window.location = response.url;
      }
    }
    isLoading.value = false;
  }
  async function callbackGithub() {
    const route = useRoute();
    console.log("arrive", route.query);
    const { data, error } = await useApiFetch("/login/github/callback", {
      method: "post",
      body: route.query,
    });
    isLoading.value = false;
    console.log("after request");
    // return login;

    if (data.value) {
      const response: TheResponse = data.value;
      user.value = response.user;
      useNuxtApp().$cookie.set("token", response.token);
      setNotification(response.notify);
      const type = user.value!.type;
      if (type == 1) return navigateTo("/speaker/dashboard");
      else if (type == 2) return navigateTo("/admin");
      else return navigateTo("/");
    }
    if (error.value) {
      setErrors({ message: [error.value.message] });
      console.log("error");
      console.log(error.value);
    }
    isLoading.value = false;
  }
  async function resetPassword(form: object) {
    const { data, error } = await useApiFetch("/reset-password", {
      method: "post",
      body: form,
    });
    if (data.value) {
      const response: TheResponse = data.value;
      setNotification(response.notify);
      return navigateTo("/login");
    }
    if (error.value) {
      setErrors(error.value.data.errors);
    }
    isLoading.value = false;
  }
  async function forgotPassword(theEmail: string) {
    await useApiFetch("/sanctum/csrf-cookie");
    const { data, error } = await useApiFetch("/forgot-password", {
      method: "post",
      body: { email: theEmail },
    });
    if (data.value) {
      const response: TheResponse = data.value;
      setNotification(response.notify);
      console.log("okay");
      window.location.href = "/auth/login";
      // return await navigateTo('/auth/login',{replace: true})
    }
    if (error.value) {
      if (error.value) setErrors(error.value.data.errors);
      // setErrors({
      //   message: ["you need to wait after the request to send another"],
      // });
      // createError('error in the email')
    }
    isLoading.value = false;
  }

  return {
    user,
    login,
    loginWithGithub,
    register,
    loggedIn,
    fetchUser,
    logout,
    notification,
    setNotification,
    isLoading,
    setLoading,
    errorFields,
    setErrors,
    callbackGithub,
    forgotPassword,
    resetPassword,
    setUser,
  };
});

/*
export const userStore = defineStore(
    "user",
    () => {
        const loggedIn = ref(false);
        const user = ref();
        const notification = ref("");
        function setNotification(data: string) {
            notification.value = data;
        }
        const isLoading = ref(false);
        function setLoggedId() {
            loggedIn.value = true;
        }
        function setUser(data: object) {
            user.value = data;
            loggedIn.value = true;
        }
        async function login(credentials: Credentials) {
            await useApiFetch("/sanctum/csrf-cookie");

            const login = await useApiFetch("/login", {
                method: "POST",
                body: credentials,
            });

            return login;
        }
        function logout() {
            loggedIn.value = false;
            user.value = undefined;
        }
        return {
            loggedIn,
            setLoggedId,
            logout,
            user,
            notification,
            setNotification,
            setUser,
            isLoading,
        };
    },
    {
        persist: {
            // storage:persistedState.cookiesWithOptions({expires:new Date(new Date().setDate(new Date().getDate() + 30))}),
            storage: persistedState.cookies,
        },
    }
);
*/
