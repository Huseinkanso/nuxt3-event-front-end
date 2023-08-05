import { defineStore } from "pinia";
import { useApiFetch } from "~/composables/useApiFetch";

export const speakerStore = defineStore("speaker", () => {
  const type = userStore().user?.type;
});
