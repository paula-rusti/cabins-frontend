// Management store for managing cabins as an owner
import {defineStore} from 'pinia'
import {useUserStore} from "@/store/user";
import CabinsManagementApiClient from "@/services/CabinsManagementApiClient";


export const useManagementStore = defineStore('management', {
  state: () => ({
    cabinsData: [],
    cabinsCount: 0,
  }),
  actions: {
    async addCabin(cabinData) {
      let userStore = useUserStore()
      await CabinsManagementApiClient.addCabin(cabinData, userStore.access_token);
    },
    async retrieveCabins(page = 1, size = 100) {
      let userStore = useUserStore()
      let response = await CabinsManagementApiClient.getCabins(page, size, userStore.access_token,
        {user_id: userStore.userDetails.properties.user_id});
      this.cabinsData = response.items;
      this.cabinsCount = response.total;
    },
    async uploadPhoto(formData, {cabinId, principal}) {
      await CabinsManagementApiClient.uploadPhoto(formData, cabinId, principal);
    }
  }
})
