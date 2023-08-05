<template>
  <loading v-if="isLoading" />
  <div v-else class="speakers my-5" style="min-height: 100vh">
    <div class="container">
      <h3 class="fw-bold">All Speakers</h3>
      <div v-if="!!status" class="text-secondary fw-bold text-italic">{{ status }}</div>
      <div
        v-if="speakers"
        class="row justify-content-center justify-content-md-around align-items-center flex-wrap"
      >
        <div
          v-for="(speaker, i) in speakers"
          :key="i"
          class="my-3 py-2 col-lg-4 col-md-5 col-sm-10"
        >
          <speakerCard
            :img="speaker.image"
            :speaker_name="speaker.name"
            :description="speaker.description"
            :link="`/speakers/${speaker.slug}`"
          />
        </div>
      </div>
      
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ["auth"],
});
const speakers = ref([]);
const isLoading = ref(false);
const status = ref("");
onMounted(async () => {
  await getSpeakers();
});
if (process.server) {
  await getSpeakers();
}

async function getSpeakers() {
  isLoading.value = true;
  const { data, error } = await useApiFetch("/speakers");
  if (data.value) {
    if(data.value.length==0)
        status.value='sorry could not get the speakers'
    else
        speakers.value = data.value.speakers;
  }
  if (error.value) {
    console.log(error.value);
  }
  isLoading.value = false;
}
</script>

<style></style>