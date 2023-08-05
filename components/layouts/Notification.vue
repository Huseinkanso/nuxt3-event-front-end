<template>
  <div v-if="notification || eventStore.notification"
    class="alert alert-success alert-dismissible fade show top-0 end-0 me-5 mt-5 position-absolute"
    style="width:fit-content" role="alert">
    {{ notification || eventStore.notification }}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>
  <!-- <div v-else class="alert alert-danger alert-dismissible fade show top-0 end-0" style="width:fit-content" role="alert">
        {{ text }}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div> -->
</template>

<script setup>
import { storeToRefs } from "pinia";
// defineProps(['text','status'])
const store = userStore();
const { notification } = storeToRefs(store)
const eventStore = useEventStore();
</script>

<style></style>