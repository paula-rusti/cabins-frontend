<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex fill-height">
<!--      <h1>Here you can see your reviews!</h1>-->
<!--      <h1>Choose between grouped by date and grouped by property</h1>-->
      <v-row>
        <v-col cols="3"></v-col>
        <v-col cols="6">
          <div v-for="review in this.reviews" :key="review.id" class="pa-4">
            <review-card></review-card>
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
import {mapActions, mapState} from "pinia";
import {useReviewsStore} from "@/store/reviews";
export default {
  name: "ReviewsPage",
  components: {ReviewCard},
  data() {
    return {
      page: 1,
      itemsPerPage: 3,
    }
  },
  watch: {
    page: {
      // eslint-disable-next-line no-unused-vars
      handler(newValue, _) {
        this.getReviews()
      }
    }
  },
  computed: {
    ...mapState(useReviewsStore, ["reviewCount", "reviews"]),
    pagesCount() {
      let retVal =  Math.ceil(this.reviewCount / this.itemsPerPage);
      if (Number.isNaN(retVal)) {
        return 0
      }
      return retVal
    }
  },
  methods: {
    ...mapActions(useReviewsStore, ['retrieveReviewsOfCabin', 'setPage', 'setItemsPerPage']),
    getReviews() {
      this.setPage(this.page)
      this.retrieveReviewsOfCabin(1)  // cabin id not used yet
    },
  },
  mounted() {
    this.setItemsPerPage(this.itemsPerPage)
    this.retrieveReviewsOfCabin(1)
  }
}
</script>

<style scoped>

</style>
