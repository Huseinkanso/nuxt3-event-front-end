<template>
    <ClientOnly>
        <div class="container">
            <div class="tickets p-3">
                <h2 class="text-secondary py-4">Your Tickets information</h2>
                <div class="table table-responsive">
                    <table class="table">
                        <thead class="table-dark">
                            <th>Event name</th>
                            <th>Number Of Tickets</th>
                            <th>bought at</th>
                            <th>Date of Event</th>
                            <th>Status</th>
                            <th>Action</th>
                        </thead>
                        <tbody>
                            <tr v-for="(ticket, i) in tickets" :key="i">
                                <td>{{ ticket.event[0].name }}</td>
                                <td>{{ ticket.ticket_count }}</td>
                                <td>{{ ticket.created_at }}</td>
                                <td>{{ ticket.event[0].date }}</td>
                                <td v-if="checkAvailabilityTime(ticket.event[0].date)" class="fw-bold text-success">active</td>
                                <td v-else class="fw-bold text-danger"> Time pass </td>
                                <td v-if="!checkAvailabilityTime(ticket.event[0].date)">
                                    <svg style="cursor:pointer;width:25px;height:25px" xmlns="http://www.w3.org/2000/svg"
                                        width="16" height="16" fill="currentColor" class="bi bi-trash3-fill"
                                        viewBox="0 0 16 16">
                                        <path
                                            d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                                    </svg>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="payments p-3">
                <h2 class="text-secondary py-4">Your Payments</h2>
                <div class="table table-responsive">
                    <table class="table">
                        <thead class="table-dark">
                            <th>Amount</th>
                            <th>id of transaction</th>
                            <th>Date of purchased</th>
                        </thead>
                        <tbody>
                            <tr v-for="(payment, i) in payments" :key="i">
                                <td>$ {{ payment.amount }}</td>
                                <td>{{ payment.payment_id }}</td>
                                <td>{{ payment.created_at }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </ClientOnly>
</template>

<script setup>
import dateformat from "dateformat";
const payments= ref({});
const tickets= ref({});
const errors= ref({});

    onMounted(()=> {

        useNuxtApp().$api.get(`/payment`).then((res) => {
            payments.value = res.data.data;
        })
        useNuxtApp().$api.get(`/ticket`).then((res) => {
            tickets.value = res.data.data;
        })

    })

    function checkAvailabilityTime(date)
    {
        return dateformat()>date;
    }

    // onMounted(()=>{
    //     useNuxtApp().$api.get(`/payment`).then((res)=>{
    //         console.log(res);
    //     })
    // })

    //   const {data:payment}= await useAsyncData( 'payments', () => useNuxtApp().$api.get(`/payment`))
    //   const { data:ticket } = await useAsyncData( 'tickets', () => useNuxtApp().$api.get(`/ticket`))
    // async asyncData({ query, $axios, redirect, app }) {
    //   const data = await $axios.$get(`/payment`)
    //   const tickets = await $axios.$get(`/ticket`)
    //   return { payments: data.data, tickets: tickets.data }
    // }

</script>

<style></style>
