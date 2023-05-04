<template>
  <h1>Here you will see your bookings for all the properties</h1>
  <v-container>
    <v-responsive>
      <div class="pa-7">
        <v-data-table
          :headers="headers"
          :items="bookings"
          multi-sort
        >
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
//todo connect pagination and take bookings from store
export default {
  name: "BookingsPage",
  components: {VDataTable},
  data() {
    return {
      headers: [
        { title: 'Property Name', key: 'propertyName' },
        { title: 'Owner Name', key: 'ownerName' },
        { title: 'Owner Email', key: 'ownerEmail' },
        { title: 'Check In', key: 'checkIn' },
        { title: 'Check Out', key: 'checkOut' },
        { title: 'Nights', key: 'nights' },
        { title: 'Total Price', key: 'totalPrice' },
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
      let retVal =  Math.ceil(this.bookingCount / this.itemsPerPage);
      if (Number.isNaN(retVal)) {
        return 0
      }
      return retVal
    }
  },
  methods: {
    ...mapActions(useBookingsStore, ['retrieveBookingsOfTourist', 'setPage', 'setItemsPerPage']),
    getBookings() {
      this.setPage(this.page)
      this.retrieveBookingsOfTourist(1)  // cabin id not used yet
    },
  },
  mounted() {
    this.setItemsPerPage(this.itemsPerPage)
    this.retrieveBookingsOfTourist(1)
  }
}
</script>

<style scoped>

</style>
