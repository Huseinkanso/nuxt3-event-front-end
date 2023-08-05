<template>
    <nav class="navbar navbar-expand-lg navbar-dark  bg-dark" data-bs-theme="dark">
        <div class="container">
            <nuxt-link class="navbar-brand p-3" to="/">Eventile
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-calendar-event-fill" viewBox="0 0 16 16">
                    <path
                        d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zm-3.5-7h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5z" />
                </svg>
            </nuxt-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <nuxt-link class="nav-link " to="/">Home</nuxt-link>
                    </li>
                    <li class="nav-item">
                        <nuxt-link class="nav-link" to="/event">Event</nuxt-link>
                    </li>
                    <li class="nav-item">
                        <nuxt-link class="nav-link" to="/speakers">Speakers</nuxt-link>
                    </li>
                </ul>
                <li style="list-style: none;width:15%" v-if="loggedIn && !!user" class="nav-item dropdown text-white">
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                        aria-expanded="false">
                        {{ user.name }} <img v-if="user.image" :src="user.image" class="rounded"
                            style="width: 30px;height: 30px;" alt="img" />
                    </a>
                    <ul class="dropdown-menu ">
                        <span v-if="user.type == 0">
                            <li v-if="user.email_verified_at != null"><nuxt-link class="dropdown-item" to="/profile">
                                    profile</nuxt-link></li>
                            <li v-else><nuxt-link class="dropdown-item text-danger" to="/profile">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-exclamation-diamond-fill" viewBox="0 0 16 16">
                                        <path
                                            d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098L9.05.435zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                    </svg>
                                    profile
                                </nuxt-link></li>
                        </span>
                        <li v-if="user.type == 1"><nuxt-link class="dropdown-item" to="/speaker/dashboard">
                                dashboard</nuxt-link></li>
                        <li>
                            <hr class="dropdown-divider">
                        </li>

                        <li><a href="" @click.prevent="logout" class="dropdown-item">Logout</a></li>
                    </ul>
                </li>
                <ul v-else class="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <nuxt-link class="nav-link" to="/auth/login">login</nuxt-link>
                    </li>
                    <li class="nav-item">
                        <nuxt-link class="nav-link" to="/auth/register">register</nuxt-link>
                    </li>
                </ul>

            </div>
        </div>
    </nav>
</template>

<script setup >
const auth = userStore();
const loggedIn = computed(() => {
    return auth.loggedIn;
});
const user = computed(() => {
    return auth.user;
})
const logout = async () => {
    auth.setLoading();
    await auth.logout();
}


</script>

<style>
.router-link-active {
    color: white !important;
}
</style>