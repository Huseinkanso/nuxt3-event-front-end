import { defineStore } from "pinia";
import { useApiFetch } from "~/composables/useApiFetch";
import dateFormat from "dateformat";
export const useEventStore = defineStore("event", () => {
  const errors = ref<object>({});
  const isLoading = ref<boolean>(false);
  const notification = ref("");
  const events = ref<_Event[]>([]);
  const event = ref<_Event>();
  const categories = ref<{category:""}[]>([]);
  const status = ref<string>("");
  function setNotification(data: string) {
    notification.value = data;
    setTimeout(() => (notification.value = ""), 4000);
  }
  const paginationInfo = ref<EventPagination>({
    current_page: 0,
    from: 0,
    last_page: 0,
    links: [],
    to: 0,
    total: 0,
  });
  function setLoading() {
    isLoading.value = true;
  }
  function setErrors(data: object) {
    errors.value = data;
    setTimeout(() => (errors.value = {}), 4000);
  }
  function setStatus(data: string) {
    status.value = data;
  }
  function setPaginationInfo(info: EventPagination, links: Array<any>) {
    const { current_page, last_page, from, to, total } = info;
    paginationInfo.value = { current_page, last_page, from, to, total, links };
  }
  async function getEvents(category:string="") {
    let url = "";
    if (category != "") {
      url = `/event/category/${category}`;
      // form.searchValue = current_categorie.value;
    } else {
      url = `/event`;
    }
    const { data, error } = await useApiFetch(url);
    if (data.value) {
      const response: TheResponse = data.value;
      console.log(response);

      if (response.events.data.length == 0)
        setStatus("there is no event right now");
      else {
        setStatus(
          category == "" ? "all the events" : "event with category:" + category
        );
        events.value = response.events.data;
        setPaginationInfo(response.events.meta, response.events.links);
      }
    }
    if (error.value) {
      setErrors({ message: "there is a problem ,try again later" });
    }
    isLoading.value = false;
  }
  async function getCategories() {
    const { data, error } = await useApiFetch("/event/categories");
    if (data.value) {
      const response: TheResponse = data.value;
      categories.value = response.categories.data;
      console.log(categories.value);
    }
    if (error.value) {
      setErrors({ message: "there is an error fetching categories!!" });
    }
    isLoading.value = false;
  }
  async function searchEvent(url: string) {
    const { data, error } = await useApiFetch(url);
    if (data.value) {
      const response: TheResponse = data.value;
      debugger;
      if (response.events.data.length == 0) {
        setStatus("there is no event with this name ");
        events.value = [];
      } else {
        events.value = response.events.data;
        setStatus("event with the name " + url.split("/")[2]);
        setPaginationInfo(response.events.meta, response.events.links);
      }
    }
    if (error.value) {
      setErrors({ message: "there is a problem ,try again later" });
    }
    isLoading.value = false;
  }
  async function getEventByTime(time: string) {
    const { data, error } = await useApiFetch(`/event/time/${time}`);
    if (data.value) {
      const response: TheResponse = data.value;
      if (response.events.data.length == 0) {
        setStatus("there is no event " + time);
        events.value = [];
      } else {
        events.value = await response.events.data;
        setStatus("event " + time);
        setPaginationInfo(response.events.meta, response.events.links);
      }
    }
    if (error.value) {
      setErrors({ message: "there is a problem ,try again later" });
    }
    isLoading.value = false;
  }
  async function getEventsByUrl(url: string) {
    // the link is with the endponit so we extract the filtering
    const { data, error } = await useApiFetch("/" + url.split("/")[4]);
    if (data.value) {
      const response: TheResponse = data.value;
      debugger;
      if (response.events.data.length == 0) {
        setStatus("there is no event ");
        events.value = [];
      } else {
        events.value = response.events.data;
        setStatus("");
        setPaginationInfo(response.events.meta, response.events.links);
      }
    }
    if (error.value) {
      setErrors({ message: "there is a problem ,try again later" });
    }
    isLoading.value = false;
  }
  async function setEvent(event: FormData) {
    const { data, error } = await useApiFetch("/event", {
      method: "POST",
      body:  event ,
      // headers: { "content-type": "multiform/form-data" },
    });
    if (data.value) {
      const response: TheResponse = data.value;
      setNotification(response.notify);
      return navigateTo("/speaker/dashboard/event");
    }
    if (error.value) {
      if (error.value.data && error.value.data.errors)
        // error validate thing
        setErrors(error.value.data.errors);
      else setErrors(error.value);
    }
    isLoading.value = false;
  }
  async function getEditEvent(slug: String) {
    const { data, error } = useApiFetch(`/event/${slug}`);
    if (data.value) {
      const response: TheResponse = data.value;
      event.value = response.event;
    }
    if (error.value) {
      setNotification("there is something wrong try agin later");
      return navigateTo("/speaker");
    }
  }
  async function getEvent(slug: string) {
    const { data, error } = await useApiFetch(`/event/${slug}/info`);
    if (data.value) {
      const response: TheResponse = data.value;
      if (!!!response.event) setStatus("there is no event ");
      else {
        event.value = response.event;
        // if (event.value?.date) {
        //   event.value!.date = dateFormat(
        //     response.event.date,
        //     "dddd; mmmm dS; yyyy; h:MM:ss TT"
        //   );
        // }
      }
    }
    if (error.value) {
      setErrors({ message: "an error occur,try again later" });
    }
  }
  async function getSpeakerEvent() {
    const { data, error } = await useApiFetch("/myEvents", { method: "get" });

    if (data.value) {
      const response: TheResponse = data.value;
      if (!!!response.events) setStatus("there is no event ");
      else events.value = response.events;
    }
    if (error.value) {
      setErrors({ message: "an error occur,try again later" });
    }
    isLoading.value = false;
  }
  async function updateEvent(form: FormData, slug: string) {
    const { data, error } = useApiFetch(`/event/${slug}`, {
      method: "POST",
      body: form,
    });
    if (data.value) {
      const response: TheResponse = data.value;
      setNotification(response.notify);
      return navigateTo(`/speaker/dashboard/event`);
    }
    if (error.value) {
      if (error.value.data && error.value.data.errors)
        setErrors(error.value.data.errors);
      else setErrors(error.value);
    }
    // useNuxtApp().$api
    //     .post(`event/${useRoute().params.show}`, NewForm, {
    //         // method:'PATCH',
    //         headers: {
    //             // 'Authorization': `Bearer ${this.$cookie.get('token')} `,
    //             'Content-Type': 'multiform/form-data'
    //         },
    //     })
    //     .then((res) => {
    //         navigateTo('/event');
    //     })
    //     .catch((e) => {
    //         if (e.response.errors)
    //             this.errors = e.response.errors
    //     })
  }

  return {
    isLoading,
    errors,
    notification,
    setNotification,
    paginationInfo,
    status,
    event,
    events,
    categories,
    getEvents,
    getSpeakerEvent,
    getCategories,
    getEventByTime,
    getEventsByUrl,
    getEvent,
    getEditEvent,
    setEvent,
    updateEvent,
    setLoading,
    searchEvent,
  };
});
