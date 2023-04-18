// Utilities
import {defineStore} from "pinia";
import ApiClient from "@/services/ApiClient";

export const useCabinsStore = defineStore("cabins", {
  state: () => ({
    cabins: [],
    currentCabin: {}, // used by cabin details
    cabinsCount: 0,
    currentPage: 1,
    itemsPerPage: 0, // set by cabinsList
    search_params: {
      // user_id is not present here bcs this store is for tourist only
      start_date: null,
      end_date: null,
      location: null,
      capacity: null,
      min_price: null,
      max_price: null,
      rating: null,
    },
  }),
  actions: {
    async retrieveCabins() {
      let fetchCabinsParams = {
        page: this.currentPage,
        size: this.itemsPerPage,
      };
      fetchCabinsParams = {
        ...fetchCabinsParams,
        ...this.search_params,
      };
      let finalRes = await ApiClient.fetchCabins(fetchCabinsParams);

      for (let item of finalRes.items) {
        item.photos = await ApiClient.fetchPhotosOfCabin(item.id);
        if (item.photos.length !== 0 && item.photos.length !== undefined) {
          item.src = `http://localhost:8000/photos/${item.photos[0].id}`;
        } else {
          item.src =
            "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg";
        }
      }
      this.cabins = finalRes.items || [];
      this.cabinsCount = await ApiClient.countCabins();
      console.log("done fetching ", this.cabins, "on page ", this.currentPage);
    },

    async getCabinById(id) {
      this.currentCabin = await ApiClient.fetchCabinById(id);
      return this.currentCabin
    },

    async getPhotosOfCabin(id) {
      return await ApiClient.fetchPhotosOfCabin(id);
    },

    async getCabinsCount() {
      // get total count of cabins from api
      const apiURL = `http://localhost:8000/cabins/count`;
      const res = await fetch(apiURL);
      return await res.json();
    },

    setPage(value) {
      this.currentPage = value;
    },

    setItemsPerPage(value) {
      this.itemsPerPage = value;
    },

    setSearchParams(value) {
      this.search_params = Object.assign({}, this.search_params, value);
      console.log(
        "in cabins store: updated search params to: " +
          JSON.stringify(this.search_params)
      );
    },
  },
});
