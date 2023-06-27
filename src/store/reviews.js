// Utilities
import {defineStore} from "pinia";
import ReviewApiClient from "@/services/ReviewApiClient";
import {useUserStore} from "@/store/user";

export const useReviewsStore = defineStore("reviews", {
  state: () => ({
    reviews: [],
    page: 1,
    itemsPerPage: 100,
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
    async getReviews({user_id, cabin_ids}) {
      let response = await ReviewApiClient.getReviews({
        user_id,
        cabin_ids,
        page: this.page,
        size: this.itemsPerPage
      })
      this.reviews = response.items
    },
    // eslint-disable-next-line no-unused-vars
    setPage(value) {
      this.page = value;
    },

    setItemsPerPage(value) {
      this.itemsPerPage = value;
    }
  }
});
