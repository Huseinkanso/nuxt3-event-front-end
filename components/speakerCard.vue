<template>
    <div class="card" style="width:fit-content">
        <img :src="img" class="card-img-top" alt="image">
        <div class="card-body">
          <h5 class="card-title">{{ speaker_name }} </h5>
          <p class="card-text">{{ description }} </p>
          <NuxtLink :to="link" class="btn btn-primary">see profile</NuxtLink>
        </div>
      </div>
</template>

<script setup>
defineProps({
    speaker_name: {
    type: String,
    default: '',
  },
  link: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  img: {
    type: String,
    default: '',
  },
})
</script>

<style>

</style>