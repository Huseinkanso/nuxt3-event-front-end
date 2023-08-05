<template>
    <client-only>
        <div class="my-3">
            <h3 class="text-center">type your email:</h3>
            <div class="d-flex justify-content-center">
                <div class="shadow p-4 my-2  bg-white">
                    <form @submit.prevent="submit">
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Enter Your Email:</label>
                            <input v-model="theEmail" type="email" class="form-control" id="exampleInputEmail1"
                                aria-describedby="emailHelp">
                            <error-field v-if="errorFields" :errors="errorFields" field="email"></error-field>
                        </div>
                        <div class="my-3">
                            <button type="submit" class="btn btn-primary">send</button>
                            <loading v-if="isLoading" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </client-only>
</template>

<script setup>
definePageMeta({
    middleware: ["guest"],
    layout: "guest-layout",
})
import { storeToRefs } from "pinia";
const store = userStore();
const { isLoading, errorFields } = storeToRefs(store);
const theEmail = ref("")
async function submit() {
    store.setLoading()
    await store.forgotPassword(theEmail.value);
}



</script>

<style></style>