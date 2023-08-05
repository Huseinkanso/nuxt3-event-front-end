<template>
    <ClientOnly>
        <nav aria-label="...">
            <ul class="pagination">
                <li class="page-item ">
                    <a
                    style="cursor:pointer;"
                    :class="{ disabled: !(!!paginationInfo.links.prev)  }"
                    class="page-link" @click="getEventsByUrl(paginationInfo.links.prev)"

                    >Previous</a>
                </li>
                <span v-for="index in paginationInfo.last_page" :key="index">

                    <li :class="{ active: index == paginationInfo.current_page }"  class="page-item">
                        <a style="cursor:pointer;" class="page-link" >{{ index }}</a>
                    </li>
                </span>
                <li class="page-item">
                    <a style="cursor:pointer;"
                    :class="{ disabled: !(!!paginationInfo.links.next)  }"
                      class="page-link" @click="getEventsByUrl(paginationInfo.links.next)">Next
                    </a>
                </li>
            </ul>
        </nav>
    </ClientOnly>
</template>

<script setup>
import { storeToRefs } from "pinia";

const eventStore=useEventStore();
const {paginationInfo} =storeToRefs(eventStore)
const {getEventsByUrl}=eventStore;
// defineProps([
// 'paginationInfo',
// 'fetchPaginationRequest'
// ])
</script>

<style>

</style>