-- Active: 1681681428981@@localhost@3306@eventile
<template>
    <nuxt-link :to="`event/${event.slug}`"
        class="row justify-content-md-between justify-content-center text-decoration-none  ">


        <div class="col-md-8 col-10 " style="min-height:200px">
            <p>{{ event.name }}</p>
            <p class="text-secondary fs-md-5 mt-2">{{ formatDate(event.date) }}</p>
            <p class="text-secondary fs-md-5 mt-2">{{ event.address }}</p>
            <p v-if="event.published_at" class="text-secondary fs-md-5 ">Published at: {{ formatDate(event.published_at) }}</p>
            <p class="text-danger text-capitalise fs-3" v-else>not published yet</p>
            <p class="text-success fs-4 ">Category: {{ event.category }}</p>
        </div>
        <div class="col-md-4 col-10 ">

            <img class="mw-100 border border-gray-200 ml-4" :src="event.image" alt="event image" />
        </div>


    </nuxt-link>
</template>

<script setup>
import dateFormat from "dateformat";
defineProps({
    event,
})
const formatDate = (date) => {
    return dateFormat(date, "mmmm dS, yyyy, h:MM:ss TT")
}
</script>

<style></style>