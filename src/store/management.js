// Management store for managing cabins as an owner
import {defineStore} from 'pinia'
import ApiClient from "@/services/ApiClient";
import {useUserStore} from "@/store/user";


export const useManagementStore = defineStore('management', {
  state: () => ({
    cabinsData: [],
    cabinsCount: 0,
    addedCabins: []
  }),
  actions: {
    async addCabin(cabinData) {
      let userStore = useUserStore()
      console.log("adding cabin", cabinData);
      let response = await ApiClient.addCabin(cabinData, userStore.access_token);
      // TODO: handler response
    },
    // eslint-disable-next-line no-unused-vars
    async retrieveCabins(page = 1, size = 100) {

    }
  }
})
