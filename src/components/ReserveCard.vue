<template>
  <v-card height="300px" style="z-index: 1000;">
    <v-card-title>Book Now!</v-card-title>
    <v-card-subtitle>At only ${{ this.price }} per night</v-card-subtitle>
    <v-card-actions>
      <v-row>
        <v-col cols="12">

<!--            TODO add disabled dates prop-->
            <Datepicker v-model="this.dates" :clearable="true"
                        :enable-time-picker="false"
                        :min-date="new Date()"
                        :partial-range="false"
                        no-disabled-range
                        placeholder="Check In - Check Out"
                        range
                        style="width: 400px"
                        @update:model-value="onDateUpdated">
            </Datepicker>

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
          <v-card-item>${{ this.price }} x {{ this.nrNights }} nights</v-card-item>
          <v-card-item class="mt-0">Total Price: ${{ this.price*this.nrNights }}</v-card-item>
        </v-col>
      </v-row>

    </v-card-actions>
  </v-card>
</template>

<script>
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

export default {
  name: "ReserveCard",
  props: ['price'],
  components: {Datepicker},
  data() {
    return {
      dates: {},
      nrNights: 0
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
    onReservePressed() {
      // TODO validate dates and navigate to reserve page
      console.log("reserve button handler")
      // router.push({
      //   name: 'Reserve Page',
      //   params: {
      //     cabin_id: Number(this.cabin_id)
      //   }
      // })
    }
  }
}
</script>

<style scoped>
.v-card {
  overflow: unset !important;
}
</style>
