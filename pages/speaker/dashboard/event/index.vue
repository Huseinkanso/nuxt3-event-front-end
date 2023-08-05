<template >
  <div class="container py-3">
    <div class="d-flex flex-column justify-content-center container">
      <div
        class="d-flex flex-lg-row flex-column justify-content-lg-between justify-content-center align-items-center p-3"
      >
        <h1 class="p-2">All New Events</h1>
        <div class="d-flex">
          <div
            class="d-flex flex-md-row flex-column justify-content-md-between justify-content-center"
          >
            <form @submit.prevent="searchEvents" class="position-relative p-3">
              <input
                type="text"
                placeholder="Event Name "
                class="form-controll p-1 rounded shadow border border-1 border-primary mx-2"
                v-model="form.searchValue"
              />
              <button type="submit" class="border-none bg-none search btn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-search"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
                  />
                </svg>
              </button>
            </form>
          </div>
          <div
            class="mx-3 d-flex align-items-center"
            @click="ResetSearch"
            v-if="isThereSearch"
            style="cursor: pointer; margin-left: -10px"
          >
            <button
              v-if="isThereSearch"
              @click="ResetSearch"
              type="button"
              class="btn btn-primary p-1"
              style="height: fit-content; padding: 0"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              data-bs-custom-class="custom-tooltip"
              data-bs-title="reset search"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-x"
                viewBox="0 0 16 16"
              >
                <path
                  d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div class="text-end">
        <nuxt-link to="/speaker/dashboard/event/create" class="btn btn-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-plus-circle"
            viewBox="0 0 16 16"
          >
            <path
              d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
            />
            <path
              d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
            />
          </svg>
          create new event</nuxt-link
        >
      </div>
    </div>
    <div v-if="!!status">
      <span class="text-secondary text-capitalize fs-3">
        {{ status }}
      </span>
    </div>
    <loading v-else-if="isLoading" />
    <div v-if="!!events">
      <section
        v-for="(event, i) in events"
        :key="i"
        class="w-80 p-5 my-2 mh-100 rounded shadow"
      >
        <LazyEventComponent :event="event" />
      </section>
    </div>
  </div>
</template>

<script  setup>
import { storeToRefs } from "pinia";

definePageMeta({
  middleware: ["speaker"],
  layout: "speaker",
});
const isThereSearch = ref(false);
const form = reactive({ searchValue: "" });
const eventStore = useEventStore();
const { isLoading, events, status } = storeToRefs(eventStore);

onMounted(async () => {
  const { getSpeakerEvent, setLoading } = useEventStore();
  setLoading();
  await getSpeakerEvent();
});
if (process.server) {
  await eventStore.getSpeakerEvent();
}
async function ResetSearch() {
  isThereSearch.value = false;
  eventStore.setLoading();
  await eventStore.getSpeakerEvent();
}
const searchEvents = async () => {
  if (form.searchValue == "") return;
  const url = `/event/speaker/${form.searchValue}`;
  eventStore.setLoading();
  isThereSearch.value = true;
  await eventStore.searchEvent(url);
};
</script>

<style>
.search {
  position: absolute;
  right: 12%;
  border: none;
  background: no-repeat;
  cursor: pointer;
}
</style>
