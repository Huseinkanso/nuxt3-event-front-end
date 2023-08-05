<template>
    <client-only>
        <div class="my-3">
            <div class="d-flex justify-content-center">
                <div class="rounded border border-dark border-3 shadow p-4 my-2  bg-white">
                    <h1 class="text-center text-capitalize">add new password</h1>
                    <form @submit.prevent="submit">
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Email address</label>
                            <input v-model="form.email" type="email" class="form-control" id="exampleInputEmail1"
                                aria-describedby="emailHelp">
                        </div>
                        <error-field :errors="errors" field="email" />
                        <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label">Password</label>
                            <input v-model="form.password" type="password" class="form-control" id="exampleInputPassword1">
                        </div>
                        <error-field :errors="errors" field="password" />
                        <div class="mb-3">
                            <label for="passwordConfirmation" class="form-label">Confirm Password </label>
                            <input v-model="form.password_confirmation" type="password" class="form-control"
                                id="passwordConfirmation">
                        </div>
                        <error-field :errors="errors" field="password_confirmation" />
                        <div class="d-flex">
                            <button type="submit" class="btn btn-primary my-2 p-2">login</button>
                            <!-- <loading v-if="isLoading"/> -->
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </client-only>
</template>

<script setup>
const route=useRoute();
const {resetPassword,setLoading}=userStore();
const form=reactive({
    email:route.query.email,
    password:'',
    password_conirmation:'',
    token:route.query.token,

})

const submit=async()=>{
    setLoading()
    await resetPassword(form);
}

</script>

<style></style>