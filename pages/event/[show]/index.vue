<template>
  <div v-if="event">
    <div class="container">
      <div
        class="d-flex flex-md-row flex-column gap-1 align-items-center justify-content-center p-2"
      >
        <div class="card w-md-25 my-md-3 w-75 p-2 shadow rounded">
          <img
            :src="event.image"
            class="card-img-top h-100"
            :alt="event.name"
          />
          <div class="card-body">
            <h5 class="card-title">About The Event</h5>
            <p class="card-text">{{ event.description }}</p>
          </div>
        </div>
        <section class="w-md-50 w-75 p-1">
          <div class="bg-gray-100 p-2 shadow-md rounded">
            <h1 class="text-2xl">{{ event.name }}</h1>
            <div class="p-2 my-2">
              <p class="text-sm my-4 flex text-capitalize">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-map-pins"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#2c3e50"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path
                    d="M10.828 9.828a4 4 0 1 0 -5.656 0l2.828 2.829l2.828 -2.829z"
                  />
                  <line x1="8" y1="7" x2="8" y2="7.01" />
                  <path
                    d="M18.828 17.828a4 4 0 1 0 -5.656 0l2.828 2.829l2.828 -2.829z"
                  />
                  <line x1="16" y1="15" x2="16" y2="15.01" />
                </svg>
                {{ event.address }}
              </p>
              <p class="text-sm my-4 flex text-capitalize">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-speakerphone"
                  width="44"
                  height="44"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#2c3e50"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M18 8a3 3 0 0 1 0 6" />
                  <path d="M10 8v11a1 1 0 0 1 -1 1h-1a1 1 0 0 1 -1 -1v-5" />
                  <path
                    d="M12 8h0l4.524 -3.77a.9 .9 0 0 1 1.476 .692v12.156a.9 .9 0 0 1 -1.476 .692l-4.524 -3.77h-8a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h8"
                  />
                </svg>
                host of the event:
                <nuxt-link
                  class="text-decoration-none text-sucess text-decoration-italic"
                  :to="`/speakers/${event.speaker_slug}`"
                  >{{ event.speaker_name }}</nuxt-link
                >
              </p>
              <p class="text-sm my-4 flex text-capitalize">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-calendar-event"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#2c3e50"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <rect x="4" y="5" width="16" height="16" rx="2" />
                  <line x1="16" y1="3" x2="16" y2="7" />
                  <line x1="8" y1="3" x2="8" y2="7" />
                  <line x1="4" y1="11" x2="20" y2="11" />
                  <rect x="8" y="15" width="2" height="2" />
                </svg>
                {{ event.date }}
              </p>
              <p class="text-sm my-4 flex text-capitalize">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-ticket"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#2c3e50"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <line x1="15" y1="5" x2="15" y2="7" />
                  <line x1="15" y1="11" x2="15" y2="13" />
                  <line x1="15" y1="17" x2="15" y2="19" />
                  <path
                    d="M5 5h14a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-3a2 2 0 0 0 0 -4v-3a2 2 0 0 1 2 -2"
                  />
                </svg>
                ${{ event.ticket_price }}
              </p>
              <p class="text-sm flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-circle-half"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#2c3e50"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 3v18" /></svg
                >{{ event.ticket_number }}
                <span class="text-primary"
                  >(remaining {{ event.ticket_remaining }})</span
                >
                <span
                  v-if="event.ticket_remaining <= 0"
                  class="text-danger text-capitalize fs-6"
                >
                  'there is no longer available tickets'
                </span>
              </p>
              <button
                v-if="event.ticket_remaining > 0"
                class="btn btn-success shadow p-2 my-2"
                @click="openPayModal"
              >
                Book Now
              </button>
              <PaymentPayNow
                v-if="isPayOpen"
                @close="isPayOpen = false"
                :amount="event.ticket_price"
                :ticket_remaining="event.ticket_remaining"
                :eventSlug="event.slug"
              />
            </div>
          </div>
        </section>
      </div>
      <div class="map my-4 py-4">
        <Map :lon="event.longitude" :lat="event.latitude" />
      </div>
      <div class="comments my-4">
        <comments :event_id="event.id" />
      </div>
    </div>
  </div>
  <div v-else>
    <h2 class="text-center fw-bold text-secondary text-italic">{{ status }}</h2>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
definePageMeta({
  middleware: "auth",
  layout: "default",
});
let isPayOpen = ref(false);
const eventStore = useEventStore();
const { event, status } = storeToRefs(eventStore);
const route = useRoute();
onMounted(async () => {
  await eventStore.getEvent(route.params.show);
});
const openPayModal = () => {
  isPayOpen.value = true;
};
</script>

<style>
.comments {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 30px;
}
</style>

