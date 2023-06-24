// Utilities
import {defineStore} from "pinia";
import BookingApiClient from "@/services/BookingApiClient";
import {useUserStore} from "@/store/user";


export const useBookingsStore = defineStore("bookings", {
  state: () => ({
    bookings: [],  // lista de obiecte pentru moment
    bookingCount: 2,   // mocked here, probabily will be fetched from the api through a specialized api call
    currentPageBookings: 1,
    itemsPerPageBookings: 0 // set by ReviewsPage
  }),
  actions: {
    // eslint-disable-next-line no-unused-vars
    async retrieveBookingsOfTourist() {
      let userStore = useUserStore()
      // take page and size into consideration when returning the reviews (server-side pagination)
      let page = this.currentPageBookings
      let size = this.itemsPerPageBookings
      let start = (page-1)*size
      // this.bookings = this.allBookings.slice(start, start+size)
      this.bookings = await BookingApiClient.fetchBookingsOfTourist(userStore.access_token, start, start+size)
    },

    async retrieveBookingsOfOwner() {
      let userStore = useUserStore()
      // take page and size into consideration when returning the reviews (server-side pagination)
      let page = this.currentPageBookings
      let size = this.itemsPerPageBookings
      let start = (page-1)*size
      // this.bookings = this.allBookings.slice(start, start+size)
      this.bookings = await BookingApiClient.fetchBookingsOfOwner(userStore.access_token, start, start+size)
    },

    setPage(value) {
      this.currentPageBookings = value;
    },

    setItemsPerPage(value) {
      this.itemsPerPageBookings = value;
    }
  }
});
