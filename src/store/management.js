// Management store for managing cabins as an owner
import {defineStore} from 'pinia'


export const useManagementStore = defineStore('management', {
  state: () => ({
    cabinsData: [],
    cabinsCount: 0,
    addedCabins: []
  }),
  actions: {
    // eslint-disable-next-line no-unused-vars
    async retrieveCabins(page = 1, size = 100) {

    }
  }
})
