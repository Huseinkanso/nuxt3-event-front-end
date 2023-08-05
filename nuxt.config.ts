// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["bootstrap/dist/css/bootstrap.min.css"],
  devtools: { enabled: true },
  modules: [
    "@pinia/nuxt", // needed
    "@pinia-plugin-persistedstate/nuxt",
    "nuxt3-notifications",
  ],
  nuxtNotifications: {
    componentName: "MyNotifications", // 'foo-bar' or 'FooBar' for components of two or more words
  },
  app: {
    head: {
      script: [
        {
          src: "https://js.stripe.com/v3/",
        },
        {
          src: "/js/popper.min.js",
        },
        {
          src: "/js/bootstrap.bundle.min.js",
        },
      ],
    },
  },
  runtimeConfig: {
    public: {
      API_URL: "http://localhost/api",
      STRIPE_API_KEY:
        "pk_test_51MadUAAcMpAyTDG7T3gBDNgLJAYi9JwDD3Aprqx1sj9F3Ai39jD5q2MYd6WmaNesaCX1LTUdUVfRkn18ko9nbbBO00ifv0aRWp",
    },
  },
  vite: {
    define: {
      "process.env.DEBUG": false,
    },
  },
  imports: {
    dirs: ["store"],
  },
});
