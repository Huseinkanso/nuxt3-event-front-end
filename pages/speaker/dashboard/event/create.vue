<template>
    <div class="py-4">
        <div class="container">
            <div class="row justify-content-center ">
                <div class="col-md-10  ">
                    <form @submit.prevent="submit" class="form border border-dark border-2 rounded shadow p-3">
                        <div class="my-1 p-2">
                            <label for="" class="form-label text-capitalize">Name:</label>
                            <input type="text" v-model="event.name" class="form-control" placeholder="Name">
                            <error-field :errors="errors" field="name" />
                        </div>
                        <div class="my-1 p-2">
                            <label for="" class="form-label text-capitalize">image(optional):</label>
                            <input type="file" @change="handleFile" class="form-control">
                            <error-field :errors="errors" field="image" />
                        </div>
                        <div class="my-1 p-2">
                            <label for="" class="form-label text-capitalize">Description:</label>
                            <textarea type="text" rows="4" v-model="event.description" class="form-control" placeholder="Description"></textarea>
                            <error-field :errors="errors" field="decription" />
                        </div>
                        <div class="my-1 p-2">
                            <label for="" class="form-label text-capitalize">address:(Enter the valid coordinate for the event and the address name )  </label>
                            <textarea type="text" rows="4" v-model="event.address" class="form-control" placeholder="Address"></textarea>
                            <error-field :errors="errors" field="address" />
                            <div class="ms-4">
                                <label for="" class="form-label text-capitalize my-2">Longitude</label>
                                <input v-model="event.longitude" step="0.0000001" type="number"  class="form-control" >
                                <error-field :errors="errors" field="longitude" />
                                <label for="" class="form-label text-capitalize my-2">latitude</label>
                                <input v-model="event.latitude" step="0.0000001" type="number"  class="form-control" >
                                <error-field :errors="errors" field="latitude" />
                            </div>
                            
                            
                        </div>
                        <div class="my-1 p-2">
                            <label for="" class="form-label text-capitalize">ticket price(an integer):</label>
                            <input type="number" step="1"  v-model="event.ticket_price" class="form-control" />
                            <error-field :errors="errors" field="ticket_count" />
                        </div>
                        <div class="my-1 p-2">
                            <label for="" class="form-label text-capitalize">ticket number(an integer):</label>
                            <input type="number"   v-model="event.ticket_number" class="form-control" />
                            <error-field :errors="errors" field="ticket_number" />
                        </div>
                        <div class="my-1 p-2">
                            <label for="" class="form-label text-capitalize">category:</label>
                            <input  class="form-control" type="text"
                                v-model="event.category" placeholder="create new category " />
                            <error-field :errors="errors" field="category" />
                        </div>
                        <div class="my-1 p-2">
                            <label for="" class="form-label text-capitalize">published at:</label>
                            <input type="datetime-local"  v-model="event.published_at" class="form-control" />
                            <error-field :errors="errors" field="published_at" />
                        </div>
                        <div class="my-1 p-2">
                            <label for="" class="form-label text-capitalize">date:</label>
                            <input type="datetime-local"  v-model="event.date" class="form-control" />
                            <error-field :errors="errors" field="date" />
                        </div>
                        <div class="my-1 p-2">
                            <button type="submit" class="btn btn-primary py-2 px-3">create</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
const eventStore = useEventStore();
const isLocation = ref(false);

const newCategory=ref('');
function toggleCategory()
{
    createNewCategory.value=!createNewCategory.value;
}
definePageMeta({
    middleware: ["speaker"],
    layout: "speaker",
})
onMounted(async () => {
    await eventStore.getCategories();
})
if (process.server) {
    await eventStore.getCategories();
}

const { categories, errors } = storeToRefs(eventStore)
const user_id = userStore().user.id;
const event = reactive({
        name: '',
        description: '',
        address: '',
        image: '',
        ticket_price: 0,
        ticket_number: 0,
        longitude:0.0,
        latitude:0.0,
        published_at: '',
        date: '',
        category: '',
        speaker_id: user_id,
})

function handleFile(e) {
    event.image = e.target.files[0]
};
const submit = async () => {
    const NewForm = new FormData()
    Object.keys(event).forEach((key) => {
        NewForm.set(key, event[key])
    })
    console.log(NewForm.values());
    await eventStore.setEvent(NewForm);
    // console.log(NewForm);
    // NewForm.set('ticket_remaining', data.event.ticket_number)
    // useNuxtApp().$api
    //     .post('event', NewForm, {
    //         headers: {
    //             'content-type': 'multiform/form-data'
    //         }
    //     })
    //     .then((res) => {
    //         if (res.data && res.data.notify) {
    //             userStore().setNotification(res.data.notify);
    //         }
    //         navigateTo('/speaker/dashboard/event');
    //     })
    //     .catch((e) => {
    //         if (e.response && e.response.data && e.response.data.errors)
    //             data.errors = e.response.data.errors
    //     })

}


</script>

<style></style>
