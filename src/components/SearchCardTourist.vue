<template>
  <v-card color="pink" min-height="550px">
    <v-card-title class="pb-5">SEARCH</v-card-title>
    <v-card-actions>
      <v-row>
        <v-col class="py-0" cols="12">
          <v-text-field v-model="this.search_params.location"
                        bg-color="white"
                        class="mx-auto"
                        label="Country/City"
                        prepend-inner-icon="mdi-magnify"
                        @update:modelValue="this.debouncedUpdateLocationToken"
          ></v-text-field>
        </v-col>
        <v-col class="py-0 pb-5" cols="12">
          <Datepicker v-model="this.search_params.dates"
                      :clearable="true"
                      :enable-time-picker="false"
                      :min-date="new Date()"
                      class="mx-auto"
                      no-disabled-range
                      placeholder="Check In - Check Out"
                      range>

          </Datepicker>
          <v-messages :active=true :messages="this.datepickerMessage"></v-messages>
        </v-col>
        <v-col class="py-0" cols="12">
          <v-text-field v-model="this.search_params.capacity"
                        bg-color="white"
                        class=" mx-auto"
                        label="Number of Guests"
                        prepend-inner-icon="mdi-magnify"
                        @update:modelValue="this.debouncedUpdateCapacity">
          </v-text-field>
        </v-col>
        <v-col cols="12">
          <v-autocomplete
            v-model="this.search_params.facilities"
            chips
            label="Facilities"
            :items="['Wifi', 'Spa', 'Pool', 'Parking']"
            multiple
            variant="solo"
          ></v-autocomplete>
        </v-col>

        <v-col cols="12">
          <v-text-field label="min price" bg-color="white" v-model="this.search_params.min_price">

          </v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field label="max price" bg-color="white" v-model="this.search_params.max_price">

          </v-text-field>
        </v-col>

        <v-col cols="12">
          <v-slider
            v-model="this.search_params.rating"
            label="Rating"
            :max="5"
            :step="1"
            hide-details
            class="ma-4"
          >
            <template v-slot:append>
              <v-text-field
                v-model="this.search_params.rating"
                type="number"
                style="width: 80px"
                density="compact"
                hide-details
                variant="outlined"
              ></v-text-field>
            </template>
          </v-slider>
        </v-col>

        <v-col cols="12">
          <v-btn block class="bg-white py-0 mx-auto" @click="this.searchButtonHandler()">SEARCH</v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
// TODO: add validations for search params with vuelidate
// TODO set search params into properties store and when search is pressed issue request there
// TODO then collect results and update page's properties


// no interaction with the store in this component
// just emit an event for the parent component
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

import _debounce from 'lodash/debounce'

import {useVuelidate} from "@vuelidate/core";

export default {
  name: "SearchCardTourist",
  components: {Datepicker},
  emits: ['searchEvent'],
  data() {
    return {
      v$: useVuelidate(), // integrate this component with vuelidate
      search_params: {
        dates: undefined,
        location: null,
        capacity: null,
        facilities: null,
        min_price: null,
        max_price: null,
        rating: null,
      },
      debouncedUpdateLocationToken: null,
      debouncedUpdateCapacity: null
    }
  },
  computed: {
    datepickerMessage() {
      // Object.keys(this.search.dates).length === 0 && this.search.dates.constructor === Object
      if (this.search_params.dates === undefined) {
        return "Required!"
      } else {
        return "--------"
      }
    }
  },
  methods: {
    // functions for updating location
    updateLocation(value) {  // debounced function
      console.log("debounce", value)
      if (/^[a-z]+$/i.test(value)) {
        console.log("location updated by user is valid")
      }
    },

    // functions for updating nr_of_guests
    updateCapacity(value) {  // debounced function
      if (!isNaN(value) && value <= 100) {
        console.log("capacity entered by the user is valid")
      }
    },

    searchButtonHandler() {
      console.log("Emitting event from search component with params ..")
      if (this.search_params.dates !== undefined) {
        this.search_params.start_date = this.search_params.dates[0]
        this.search_params.end_date = this.search_params.dates[1]
      } else {
        this.search_params.start_date = null
        this.search_params.end_date = null
      }
      delete this.search_params['dates']

      this.$emit('searchEvent', this.search_params)
    }
  },
  async mounted() {
    this.debouncedUpdateLocationToken = _debounce(this.updateLocation, 600)
    this.debouncedUpdateCapacity = _debounce(this.updateCapacity, 600)
  }
}
</script>

<style>
/* used by datepicker input */
.dp__input {
  height: 54px;
}

.v-messages__message {
  font-size: medium;
  color: black;
}
</style>
