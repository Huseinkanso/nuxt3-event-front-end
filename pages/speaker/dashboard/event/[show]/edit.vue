<template>
    <loading v-if="isLoading" />
    <div v-else class="py-4">
        <div class="container">
            <div class="row justify-content-center ">
                <div class="col-md-10  " v-if="event">
                    <form @submit.prevent="submit" class="form border border-dark border-2 rounded shadow p-3">
                        <div class="my-2 p-2">
                            <label for="" class="form-label text-capitalize">Name:</label>
                            <input type="text" v-model="event.name" class="form-control">
                            <error-field :errors="errors" field="name" />
                        </div>
                        <div class="my-2 p-2">
                            <label for="" class="form-label text-capitalize">current image:</label><br>
                            <img :src="event.image" style="width:150px;height:150px" alt="">
                        </div>
                        <div class="my-2 p-2">
                            <label for="" class="form-label text-capitalize">new image(optional):</label>
                            <input type="file" @change="handleFile" class="form-control">
                        </div>
                        <div class="my-2 p-2">
                            <label for="" class="form-label text-capitalize">Description:</label>
                            <textarea type="text" rows="4" v-model="event.description" class="form-control"></textarea>
                            <error-field :errors="errors" field="decription" />
                        </div>
                        <div class="my-2 p-2">
                            <label for="" class="form-label text-capitalize">address:</label>
                            <textarea rows="4" v-model="event.address" class="form-control"></textarea>
                            <error-field :errors="errors" field="address" />
                        </div>
                        <div class="my-2 p-2">
                            <label for="" class="form-label text-capitalize">ticket price:</label>
                            <input type="number" rows="4" v-model="event.ticket_price" class="form-control" />
                            <error-field :errors="errors" field="ticket_count" />
                        </div>
                        <div class="my-2 p-2">
                            <label for="" class="form-label text-capitalize">ticket remaining:</label>
                            <input type="number" rows="4" v-model="event.ticket_remaining" class="form-control" />
                            <error-field :errors="errors" field="ticket_remaining" />
                        </div>
                        <div class="my-2 p-2">
                            <label for="" class="form-label text-capitalize">categorie:</label>
                            <select v-model="event.categorie_name" class="form-select">
                                <option selected></option>
                                <option v-for="(categorie, i) in categories" :key="i" :value="categorie.categorie_name">
                                    {{ categorie.categorie_name }}
                                </option>
                            </select>

                            <error-field :errors="errors" field="categorie_name" />
                        </div>
                        <div class="my-2 p-2">
                            <label for="" class="form-label text-capitalize">published at:</label>
                            <input type="datetime-local" rows="4" v-model="event.published_at" class="form-control" />
                            <error-field :errors="errors" field="published_at" />
                        </div>
                        <div class="my-2 p-2">
                            <label for="" class="form-label text-capitalize">date:</label>
                            <input type="datetime-local" rows="4" v-model="event.date" class="form-control" />
                            <error-field :errors="errors" field="date" />
                        </div>
                        <div class="my-2 p-2">
                            <button type="submit" class="btn btn-primary py-2 px-3">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { storeToRefs } from "pinia";

definePageMeta({
    middleware: ["speaker"],
    layout: "speaker"
})
const route = useRoute();
const eventStore = useEventStore();


const { event, errors, isLoading, categories } = storeToRefs(eventStore);
const editedEvent = ref({
    name: '',
    description: '',
    address: '',
    image: '',
    ticket_price: '',
    ticket_remaining: '',
    published_at: '',
    date: '',
    categorie_name: ''
});
onBeforeMount(async () => {

    const route = useRoute();
    const { getEditEvent, getCategories, setLoading } = useEventStore();
    setLoading();
    await eventStore.getEditEvent(route.params.show);
    await eventStore.getCategories();
})
if (process.server) {
    const route = useRoute();
    const { getEditEvent, getCategories, setLoading } = useEventStore();
    setLoading();
    await eventStore.getEditEvent(route.params.show);
    await eventStore.getCategories();
}


// if (process.server) {
//     await eventStore.getEvent(route.params.show);
//     await eventStore.getCategories();
// }


function handleFile(e) {
    event.image = e.target.files[0]
};

const submit = async () => {
    eventStore.setLoading();
    const NewForm = new FormData()
    Object.keys(event).forEach((key) => {
        NewForm.set(key, event[key])
    })
    NewForm.set('_method', 'PATCH')
    await eventStore.updateEvent(NewForm, route.params.show);

}
// in axios patch we cant send 'content-type': 'multiform/form-data' so we use post and add manually
    // event with patchform it will not work we need to add manually the method and put content type
    // NewForm.set('_method', 'patch')
</script>

<style></style>




