<template>
    <div class="d-flex flex-md-row flex-column justify-content-md-between justify-content-center ">
        <form @submit.prevent="search"  class="position-relative p-3">
            <input type="text" placeholder="Event Name "
                class="form-controll p-1 rounded shadow border border-1 border-primary  mx-2"
                v-model="form.searchValue">
                <button type="submit" class="border-none bg-none search"  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                      </svg>
                </button>
        </form>
    </div>
</template>

<script setup>

defineProps([
    'url',
])

const emit=defineEmits(['setLoading','setData'])
const form = reactive({ searchValue: '' })

function search() {
    emit('setLoading',true)
    if (form.searchValue == '') {
        return;
    }
    const urlFetch =  `/event/search/${form.searchValue}`;
    useNuxtApp().$api.get(urlFetch).then((res) => {
        emit('setLoading',false)
        console.log(res.data);
        emit('setData',res.data.events.data);
        // storePaginationInfo(res.data.events.meta, res.data.events.links);
    }).catch((er) => {
        emit('setLoading',false)
    })
}

</script>

<style>
.search{
    position: absolute;
    right: 12%;
    border: none;
    background: no-repeat;
    cursor: pointer;
}
</style>