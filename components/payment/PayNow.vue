<template>
    <div v-if="!ComponentLoading" class="modal fade show" tabindex="-1" id="exampleModal" aria-labelledby="exampleModalLabel" aria-model="true"
        style="display:block;">
        <div class="modal-dialog">
            <loading v-if="ComponentLoading" />
            <div v-else class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">buy now</h1>
                    <button type="button" @click="emit('close')" class="btn-close" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="mb-3">
                            <label for="name" class="col-form-label">your name:</label>
                            <input v-model="name" type="text" class="form-control" id="name">
                        </div>
                        <div id="card-element" class="p-3 border border-gray-900"></div>
                        <div class="mb-3">
                            <label for="ticket_Count" class="col-form-label">ticket count:</label>
                            <input v-model="ticket_count" type="number" :max="props.ticket_remaining" class="form-control" id="ticket_Count">
                            {{ props.ticket_remaining }}
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <loading v-if="isLoading" />
                    <button @click="process" type="button" class="btn btn-primary p-2 px-3">pay ${{ price }}</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup >
const name = ref('');
const ticket_count = ref(1);
const cardElement = ref(null);
const stripe = ref(null);
const ComponentLoading = ref(false);
const isLoading = ref(false);
const emit = defineEmits(['close']);
onMounted(() => {
    ComponentLoading.value = true;
    stripe.value = window.Stripe(useRuntimeConfig().public.STRIPE_API_KEY)
    const elements = stripe.value.elements()
    cardElement.value = elements.create('card')
    cardElement.value.mount('#card-element')
    ComponentLoading.value = false;
})
const props = defineProps({
    amount: { type: Number, default: 0 },
    eventSlug: { type: String, default: '' },
    ticket_remaining:{type:Number,default:-1},
})
const price = computed(() => {
    return props.amount * ticket_count.value
})
function process() {
    if (isLoading.value) return
    verifyCard()
}
async function verifyCard() {
    isLoading.value = true
    const { paymentMethod, error } = await stripe.value.createPaymentMethod(
        'card',
        cardElement.value,
        {
            billing_details: {
                name: name.value,
                address: {
                    city: 'test',
                    country: 'US',
                    line1: 'test',
                    postal_code: '24242',
                    state: 'test'
                }
            }
        }
    )
    //   console.log(error);
    if (error) {
        isLoading.value = false
        // Display "error.message" to the user...
    } else {
        // console.log(paymentMethod);
        await chargeCustomer(paymentMethod)
        emit('close')
        navigateTo('/event')
        isLoading.value = false
    }
};
async function chargeCustomer(paymentMethod) {
    const {data,error}=await useApiFetch(`/payment/${props.eventSlug}`,{method:"POST",body:{paymentMethod,ticket_count: ticket_count.value}})
    if(data.value)
    {
        console.log(data.value);
    }
    if(error.value)
    {
        console.log(error.value);
    }
    // await useNuxtApp().$api.post(`payment/${props.eventSlug}`, {
    //     paymentMethod,
    //     ticket_count: ticket_count.value
    // }).then((res) => console.log(res))
    //     .catch((er) => isLoading.value = false)
}
</script>

<style></style>
