<template>
  <v-card color="pink" min-height="550px">
    <v-card-title class="pb-5">SEARCH</v-card-title>
    <v-card-actions>
      <v-row>
        <v-col class="py-0" cols="12">
          <v-text-field v-model="this.location"
                        bg-color="white"
                        class="mx-auto"
                        label="Country/City"
                        prepend-inner-icon="mdi-magnify"
                        @update:modelValue="this.debouncedUpdateLocationToken"
          ></v-text-field>
        </v-col>
        <v-col class="py-0 pb-5" cols="12">
          <Datepicker v-model="this.dates"
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
          <v-text-field v-model="this.capacity"
                        bg-color="white"
                        class=" mx-auto"
                        label="Number of Guests"
                        prepend-inner-icon="mdi-magnify"
                        @update:modelValue="this.debouncedUpdateCapacity">
          </v-text-field>
        </v-col>
        <v-col cols="12">
          <v-btn block class="bg-white py-0 mx-auto">SEARCH</v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
// TODO: add validations with vuelidate
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

import _debounce from 'lodash/debounce'

import {required, numeric} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";

export default {
  name: "SearchCardTourist",
  components: {Datepicker},
  data() {
    return {
      v$: useVuelidate(),
      dates: undefined,
      location: "",
      capacity: 0,
      // rules: {
      //   required: value => !!value || 'Required.',
      //   capacity_token: value => Number(value) <= 100 || "Invalid number of guests.",
      //   location_token: value => {
      //     return /^[a-z]+$/i.test(value) || 'Invalid location.'
      //   },
      // },
      debouncedUpdateLocationToken: null,
      debouncedUpdateCapacity: null
    }
  },
  computed: {
    datepickerMessage() {
      // Object.keys(this.search.dates).length === 0 && this.search.dates.constructor === Object
      if (this.dates === undefined) {
        return "Required!"
      } else {
        return "--------"
      }
    },
    // capacityErrors() {
    //   const errors = []
    //   if (!this.v$.capacity.$dirty) {
    //     return errors
    //   }
    //   !this.v$.capacity.required.$response && errors.push("Capacity is required")
    //   !this.v$.capacity.numeric.$response && errors.push("Capacity must be numeric")
    //   return errors
    // }
  },
  methods: {
    // functions for updating location
    updateLocation(value) {  // debounced function
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

    async mounted() {
      this.debouncedUpdateLocationToken = _debounce(this.updateLocation, 600)
      this.debouncedUpdateCapacity = _debounce(this.updateCapacity, 600)
    }
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
