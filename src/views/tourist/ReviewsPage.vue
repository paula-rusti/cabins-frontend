<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex fill-height">
<!--      <h1>Here you can see your reviews!</h1>-->
<!--      <h1>Choose between grouped by date and grouped by property</h1>-->
      <v-row>
        <v-col cols="3"></v-col>
        <v-col cols="6">
          <div v-for="review in this.reviewStore.reviews" :key="review.id" class="pa-4">
            <review-card :owner-name="review.user_id"
                         :property-name="review.cabin_id"
                         :grade="review.grade"
                         :date="review.created"
                         :content="review.description"
            ></review-card>
          </div>
        </v-col>
        <v-col cols="3"></v-col>
      </v-row>

      <v-row align="center" justify="center">
        <div>
          <v-pagination v-model="page" :length="pagesCount">
          </v-pagination>
        </div>
      </v-row>

    </v-responsive>
  </v-container>
</template>

<script>
import ReviewCard from "@/components/ReviewCard";
import {useReviewsStore} from "@/store/reviews";
import {useUserStore} from "@/store/user";
export default {
  name: "ReviewsPage",
  components: {ReviewCard},
  watch: {
    page: {
      // eslint-disable-next-line no-unused-vars
      handler(newValue, _) {
        this.getReviews()
      }
    }
  },
  setup() {
    return {
      reviewStore: useReviewsStore(),
      userStore: useUserStore()
    }
  },
  computed: {
    pagesCount() {
      try {
        let retVal =  Math.ceil(this.reviewStore.reviews.length / this.reviewStore.itemsPerPage);
        if (Number.isNaN(retVal)) {
          return 0
        }
        return retVal
      } catch (e) {
        return 0
      }
    }
  },
  methods: {
    getReviews() {
      this.reviewStore.getReviews({user_id: this.userStore.userDetails.properties.user_id})
    },
  },
  mounted() {
    this.getReviews()
  }
}
</script>

<style scoped>

</style>
