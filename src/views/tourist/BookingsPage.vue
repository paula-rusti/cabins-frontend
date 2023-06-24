<template>
  <h1>Here you will see your bookings </h1>
  <v-container>
    <v-responsive>
      <div class="pa-7">
        <v-data-table
          :headers="headers"
          :items="bookings"
          multi-sort
        >
          <template v-slot:item.actions="{ item }">
            <v-dialog
              transition="dialog-bottom-transition"
              persistent
              width="auto"
            >
              <template v-slot:activator="{ props }">
                <v-btn
                  color="primary"
                  v-bind="props"
                >Leave Review
                </v-btn>
              </template>
              <template v-slot:default="{ isActive }">
                <v-card>
                  <v-toolbar
                    color="primary"
                    :title="`${item.columns.tourist_name} - ${item.columns.cabin_name.name}`"
                  ></v-toolbar>
                  <v-card-text>
                    <div class="d-flex flex-column align-center">
                      <div class="text-h2 pa-12">How was your experience?</div>
                      <v-text-field
                        style="width: 30vw"
                        v-model="description"
                        label="Description"
                        outlined
                        multi-line
                      >
                      </v-text-field>
                      <v-rating
                        class="text-h2 pa-12 mx-auto"
                        v-model="currentRating"
                        hover
                      ></v-rating>
                    </div>
                  </v-card-text>
                  <v-card-actions class="justify-lg-space-around">
                    <v-btn
                      variant="text"
                      @click="isActive.value = false"
                    >Close
                    </v-btn>
                    <v-btn color="primary" @click="leaveReview(item); isActive.value = false">Review</v-btn>
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>
          </template>
          <template v-slot:bottom>
            <div class="text-center pt-2">
              <v-pagination
                v-model="page"
                :length="pagesCount"
              ></v-pagination>
            </div>
          </template>
        </v-data-table>
      </div>
    </v-responsive>
  </v-container>
</template>

<script>
import {VDataTable} from "vuetify/labs/components";
import {mapActions, mapState} from "pinia";
import {useBookingsStore} from "@/store/bookings";
import {useReviewsStore} from "@/store/reviews";
//todo connect pagination and take bookings from store
export default {
  name: "BookingsPage",
  components: {VDataTable},
  data() {
    return {
      description: "",
      currentRating: 0,
      headers: [
        {title: 'Tourist Name', key: 'tourist_name'},
        {title: 'Cabin Name', key: 'cabin_name.name'},
        {title: 'Check In', key: 'start_date'},
        {title: 'Check Out', key: 'end_date'},
        {title: 'Guests', key: 'nr_guests'},
        {title: 'Total Price', key: 'price'},
        {title: 'Actions', key: 'actions'}
      ],
      page: 1,
      itemsPerPage: 2,
    }
  },
  watch: {
    page: {
      // eslint-disable-next-line no-unused-vars
      handler(newValue, _) {
        this.getBookings()
      }
    }
  },
  computed: {
    ...mapState(useBookingsStore, ["bookingCount", "bookings"]),
    pagesCount() {
      let retVal = Math.ceil(this.bookingCount / this.itemsPerPage);
      if (Number.isNaN(retVal)) {
        return 0
      }
      return retVal
    }
  },
  setup() {
    return {
      reviewStore: useReviewsStore()
    }
  },
  methods: {
    ...mapActions(useBookingsStore, ['retrieveBookingsOfTourist', 'setPage', 'setItemsPerPage']),
    getBookings() {
      this.setPage(this.page)
      this.retrieveBookingsOfTourist(1)  // cabin id not used yet
    },
    async leaveReview(item) {
      try {
        await this.reviewStore.leaveReview({
          description: this.description,
          rating: this.currentRating,
          booking: item.raw
        })
        this.$swal({
          title: "Review Submitted",
          text: "Your review has been submitted",
          icon: "success",
          button: "Ok"
        })
      } catch (e) {
        this.$swal({
          title: "Error",
          text: "Something went wrong",
          icon: "error",
          button: "Ok"
        })
      }

    }
  },
  mounted() {
    this.setItemsPerPage(this.itemsPerPage)
    this.retrieveBookingsOfTourist(1)
  }
}
</script>

<style scoped>

</style>
