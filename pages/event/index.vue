<template>
        <div class="container py-3" style="min-height:100vh">
            <div class="d-flex flex-column justify-content-center  container">
                <div
                    class="d-flex flex-lg-row flex-column justify-content-lg-between justify-content-center align-items-center p-3">
                    <h1 class="p-2 ">All New Events</h1>
                    <div class="d-flex flex-md-row flex-column justify-content-md-between justify-content-center ">
                        <div class="dropdown m-auto p-3 ">
                            <button class="btn btn-dark dropdown-toggle" type="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                search by category
                            </button>
                            <ul class="dropdown-menu dropdown-menu-dark" data-bs-theme="dark">
                                <li v-for="(category, i) in categories" :key="i">
                                    <a style="cursor:pointer;" class="dropdown-item"
                                        @click="getEventsByCategory(category.category)">{{ category.category
                                        }}</a>
                                </li>

                            </ul>
                        </div>
                        <div class="dropdown m-auto p-3 ">
                            <button class="btn btn-dark dropdown-toggle" type="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                search by time
                            </button>
                            <ul class="dropdown-menu dropdown-menu-dark" data-bs-theme="dark">
                                <li>
                                    <a style="cursor:pointer;" class="dropdown-item text-capitalize"
                                        @click="fetchEventsByTime('today')">today</a>
                                    <a style="cursor:pointer;" class="dropdown-item text-capitalize"
                                        @click="fetchEventsByTime('tomorrow')">tomorrow</a>
                                    <a style="cursor:pointer;" class="dropdown-item text-capitalize"
                                        @click="fetchEventsByTime('nextWeek')">next week</a>
                                    <a style="cursor:pointer;" class="dropdown-item text-capitalize"
                                        @click="fetchEventsByTime('nextMonth')">next month</a>
                                </li>

                            </ul>
                        </div>
                        <div class="d-flex justify-content-center align-items-center">
                            <form @submit.prevent="searchEvent" class="position-relative p-3">
                                <input type="text" placeholder="Event Name "
                                    class="form-controll p-1 rounded shadow border border-1 border-primary  mx-2"
                                    v-model="form.searchValue">
                                <button type="submit" style="padding:4px" class="border-none bg-none search btn ">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-search" viewBox="0 0 16 16">
                                        <path
                                            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                    </svg>
                                </button>

                            </form>
                            <button v-if="isThereEvents" @click="ResetSearch" type="button"
                                class="btn btn-primary rounded p-1" style="height:fit-content;padding:0"
                                data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="custom-tooltip"
                                data-bs-title="reset search">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-x" viewBox="0 0 16 16">
                                    <path
                                        d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                </svg>
                            </button>
                        </div>
                    </div>

                </div>
                <div class="d-flex justify-content-end p-3" v-if="eventStore.paginationInfo">
                    <pagination v-if="eventStore.paginationInfo" />
                </div>

            </div>
            <loading v-if="isLoading" />
            <div>
                <div v-if="!!status">
                    <span class="text-secondary text-capitalize fs-3">
                        {{ status }}
                    </span>
                </div>

                <div v-if="!!eventStore.events">
                    <section v-for="(event, i) in events" :key="i" class="w-80 p-5 my-2 mh-100  rounded shadow">
                        <LazyEventComponent :event="event" :to="`event/${event.slug}`" />
                    </section>
                </div>

            </div>

        </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
definePageMeta({
    middleware: "auth",
    layout: "default",
})
// const status = ref('');
const form = reactive({ searchValue: '' })
const eventStore = useEventStore();
const isThereEvents = ref(false);
onMounted(async () => {
    eventStore.setLoading()
    await eventStore.getCategories();
    await eventStore.getEvents();
})
if (process.server) {
    const { getCategories, getEvents, setLoading } = useEventStore();
    eventStore.setLoading()
    await eventStore.getCategories();
    await eventStore.getEvents();
}
const { events, categories, isLoading, status } = storeToRefs(eventStore);

const searchEvent = async () => {
    if (form.searchValue == '')
        return;
    isThereEvents.value = true;
    const url = `/event/search/${form.searchValue}`
    eventStore.setLoading()
    await eventStore.searchEvent(url)
}
async function ResetSearch() {
    form.searchValue = ''
    isThereEvents.value = false;
    eventStore.setLoading();
    await eventStore.getEvents();
}
const getEventsByCategory = async (category:string) => {
    isThereEvents.value = true;
    eventStore.setLoading()
    await eventStore.getEvents(category);
}
const fetchEventsByTime = async (time: string) => {
    isThereEvents.value = true;
    eventStore.setLoading()
    await eventStore.getEventByTime(time)
}


// const events = ref({});
// const categories = ref([]);

// const isLoading = ref(false);

// const paginationData = ref({
//     current_page: 0,
//     from: 0,
//     to: 0,
//     last_page: 0,
//     total: 0,

// })
// variable to check if the first fetch or pagination fetch
// const current_time = ref('');
// const currentCategorie = ref('');
// const functionName = ref('');




// const isThereNext = computed(() => {
//     return paginationData.value.current_page === paginationData.value.last_page
// })
// const isTherePrev = computed(() => {
//     return paginationData.value.current_page === 1;
// })


// function fetchCategories() {
//     useNuxtApp().$api.get('categorie').then((res) => {
//         categories.value = res.data.categories;
//     })
// }

// function fetchEvents() {
//     isLoading.value = true;
//     let urlFetch = '';
//         if (current_categorie.value != '') {
//             urlFetch = `/categorie/${current_categorie.value}`;
//             // form.searchValue = current_categorie.value;
//         } else {
//             urlFetch = `/event`;
//         }
//     useNuxtApp().$api.get(urlFetch).then((res) => {
//         isLoading.value = false;
//         console.log(res);
//         if (res.data.events.data.length == 0) {
//             status.value = 'there is no events';
//         }
//         events.value = res.data.events.data;
//         storePaginationInfo(res.data.events.meta, res.data.events.links);
//         console.log(events.value);

//     })
//         .catch((er) => {
//             isLoading.value = false;
//             console.log(er)
//         })
// }



// function searchEvent(url) {
//     isLoading.value = true;
//     if (form.searchValue == '') {
//         return;
//     }
//     useNuxtApp().$api.get(`/event/search/${form.searchValue}`).then((res) => {
//         console.log(res.data);
//         isLoading.value = false;
//         if (events.value.length == 0) {
//             status.value = 'there is no event with this name';
//         } else {
//             events.value = res.data.events.data;
//             storePaginationInfo(res.data.events.meta, res.data.events.links);
//         }

//     }).catch((er) => {
//         isLoading.value = false;
//     })
// }

// function byCategory(categorie) {
//     current_categorie.value = categorie;
//     fetchEvents();
// }

// function fetchEventsByTime(time) {
//     form.searchValue = current_time.value;
//     isLoading.value = true;
//     useNuxtApp().$api.get( `/event/time/${time}`).then((res) => {
//         console.log(res);
//         isLoading.value = false;
//         events.value = res.data.events.data;
//         storePaginationInfo(res.data.events.meta, res.data.events.links);
//     }).catch((er) => {
//         isLoading.value = false;
//         console.log(er);
//     })
// }

// function fetchPaginationRequest(url)
// {
//     isLoading.value = true;
//     useNuxtApp().$api.get(url).then((res) => {
//         isLoading.value = false;
//         console.log(res);
//         if (res.data.events.data.length == 0) {
//             status.value = 'there is no events';
//         }
//         events.value = res.data.events.data;
//         storePaginationInfo(res.data.events.meta, res.data.events.links);
//         console.log(events.value);

//     })
//         .catch((er) => {
//             isLoading.value = false;
//             console.log(er)
//         })
// }

// function storePaginationInfo(info, links) {
//     paginationData.value.current_page = info.current_page;
//     paginationData.value.last_page = info.last_page;
//     paginationData.value.from = info.from;
//     paginationData.value.to = info.to;
//     paginationData.value.total = info.total;
//     paginationData.value.links = links;
//     console.log(paginationData.value);
// }
</script>

<style></style>
