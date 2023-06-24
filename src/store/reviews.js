// Utilities
import {defineStore} from "pinia";
import ReviewApiClient from "@/services/ReviewApiClient";
import {useUserStore} from "@/store/user";

export const useReviewsStore = defineStore("reviews", {
  state: () => ({
    reviews: [],  // lista de obiecte pentru moment
    currentReview: {}, // might need this when editing a review or something
    reviewCount: 4,   // mocked here, probabily will be fetched from the api through a specialized api call
    currentPageReviews: 1,
    itemsPerPageReviews: 0, // set by ReviewsPage
    allReviews: [
      {
        id: 1,
        cabinId: 1,
        ownerId: 1,
        cabinName: "Dummy Cabin Name",
        ownerName: "Dummy Review Poster Name 1",
        date: "01.05.2023",
        grade: 4.5,
        content: "Dummy content"
      },
      {
        id: 2,
        cabinId: 1,
        ownerId: 1,
        cabinName: "Dummy Cabin Name",
        ownerName: "Dummy Review Poster Name 2",
        date: "01.05.2023",
        grade: 4.5,
        content: "Dummy content"
      },
      {
        id: 3,
        cabinId: 1,
        ownerId: 1,
        cabinName: "Dummy Cabin Name",
        ownerName: "Dummy Review Poster Name 2",
        date: "01.05.2023",
        grade: 4.5,
        content: "Dummy content"
      },
      {
        id: 3,
        cabinId: 1,
        ownerId: 1,
        cabinName: "Dummy Cabin Name",
        ownerName: "Dummy Review Poster Name 2",
        date: "01.05.2023",
        grade: 4.5,
        content: "Dummy content"
      },
    ]
  }),
  actions: {
    async leaveReview({rating, booking, description}) {
      let userStore = useUserStore()
      let review = {
        grade: rating,
        description: description || "",
        booking_id: booking.id,
        cabin_id: booking.cabin_id
      }
      await ReviewApiClient.leaveReview(review, userStore.access_token)
    },
    // eslint-disable-next-line no-unused-vars
    retrieveReviewsOfCabin(cabinId) {
      // take page and size into consideration when returning the reviews (server-side pagination)
      let page = this.currentPageReviews
      let size = this.itemsPerPageReviews
      let start = (page-1)*size
      this.reviews = this.allReviews.slice(start, start+size)
    },
    setPage(value) {
      this.currentPageReviews = value;
    },

    setItemsPerPage(value) {
      this.itemsPerPageReviews = value;
    }
  }
});
