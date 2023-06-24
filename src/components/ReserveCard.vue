<template>
  <v-card style="z-index: 1000;">
    <v-card-title>Book Now!</v-card-title>
    <v-card-subtitle>At only ${{ cabin.price }} per night</v-card-subtitle>
    <v-card-actions>
      <v-row>
        <v-col cols="12" class="px-10">

<!--            TODO add disabled dates prop-->
            <Datepicker v-model="this.dates" :clearable="true"
                        :enable-time-picker="false"
                        :min-date="new Date()"
                        :partial-range="false"
                        no-disabled-range
                        placeholder="Check In - Check Out"
                        range
                        @update:model-value="onDateUpdated">
            </Datepicker>
          <v-text-field
            class="py-3"
            v-model="numberOfGuests"
            :rules="numberOfGuestsRules"
            :counter="10"
            label="Number of Guests"
            required
          ></v-text-field>
          <v-card-item class="pl-0">
            <v-btn
              append-icon="mdi-airplane-clock"
              color="purple"
              style="background-color: antiquewhite; width: 400px"
              @click="onReservePressed"
            >
              Reserve
            </v-btn>
          </v-card-item>
          <v-divider></v-divider>
          <v-card-item>${{  cabin.price  }} x {{ this.nrNights }} nights</v-card-item>
          <v-card-item class="mt-0">Total Price: ${{cabin.price *this.nrNights }}</v-card-item>
        </v-col>
      </v-row>

    </v-card-actions>
  </v-card>
</template>

<script>
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import BookingApiClient from "@/services/BookingApiClient";
import {useUserStore} from "@/store/user";

export default {
  name: "ReserveCard",
  props: ['cabin'],
  components: {Datepicker},
  data() {
    return {
      numberOfGuests: 1,
      dates: {},
      nrNights: 0,
      numberOfGuestsRules: [
        value => {
          if (!value) {
            return 'Please enter the number of guests'
          }
          if (value < 1) {
            return 'The number of guests must be greater than 0'
          }
          return true
        }
      ]
    }
  },
  setup() {
    return {
      userStore: useUserStore()
    }
  },
  methods: {
    onDateUpdated() {
      let startDate = this.dates[0]
      let endDate = this.dates[1]
      let diff = endDate.getTime() - startDate.getTime()
      this.nrNights = Math.ceil(diff / (1000 * 3600 * 24))
      console.log("nights: " + Math.ceil(diff / (1000 * 3600 * 24)))
    },
    setValueHandler(value) {
      this.numberOfGuests = value
    },
    async onReservePressed() {
      // TODO validate dates and navigate to reserve page
      try {
        // make request to API
        let reservation = {
          cabin_id: this.cabin.id,
          user_id: this.userStore.userDetails?.properties.user_id,
          start_date: this.dates[0],
          end_date: this.dates[1],
          price: this.cabin.price * this.nrNights,
          nr_guests: this.numberOfGuests
        }

        let response = await BookingApiClient.createNewBooking(this.userStore.access_token, reservation)
        if (response == null) {
          throw new Error("Reservation failed!")
        }

        this.$swal({
          title: 'Success',
          text: 'Reservation successful!',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
        this.$router.push({
          name: 'Tourist Bookings Page',
        })
      } catch (e) {
        this.$swal({
          title: 'Error',
          text: 'Reservation failed!',
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      }
    }
  }
}
</script>

<style scoped>
.v-card {
  overflow: unset !important;
}
</style>
