// Utilities
import {defineStore} from "pinia";

export const useBookingsStore = defineStore("bookings", {
  state: () => ({
    bookings: [],  // lista de obiecte pentru moment
    bookingCount: 2,   // mocked here, probabily will be fetched from the api through a specialized api call
    currentPageBookings: 1,
    itemsPerPageBookings: 0, // set by ReviewsPage
    allBookings: [
    {
      propertyName: "Property 1",
      ownerName: "Owner 1",
      ownerEmail: "Email Owner 1",
      checkIn: "15.10.2020",
      checkOut: "20.10.2020",
      nights: 6,
      totalPrice: 1000
    },
    {
      propertyName: "Property 2",
      ownerName: "Owner 2",
      ownerEmail: "Email Owner 2",
      checkIn: "15.10.2021",
      checkOut: "20.10.2021",
      nights: 2,
      totalPrice: 1000
    }
  ]
  }),
  actions: {
    // eslint-disable-next-line no-unused-vars
    retrieveBookingsOfTourist(cabinId) {
      // take page and size into consideration when returning the reviews (server-side pagination)
      let page = this.currentPageBookings
      let size = this.itemsPerPageBookings
      let start = (page-1)*size
      this.bookings = this.allBookings.slice(start, start+size)
    },
    setPage(value) {
      this.currentPageBookings = value;
    },

    setItemsPerPage(value) {
      this.itemsPerPageBookings = value;
    }
  }
});
