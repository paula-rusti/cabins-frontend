<template>
  <v-container>
    <v-responsive>
      <v-row>
        <v-col>
          <h1>Add Property</h1>
          <p>On this page you can add a new property.</p>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="ma-5 pr-10" cols="12">
          <v-card title="Property Data">
            <v-card-text>
              <v-text-field v-model="propertyData.name"
                            :error-messages="nameErrors"
                            clearable
                            label="Property Name"
                            variant="underlined"
                            @blur="this.v$.propertyData.name.$touch()"
                            @input="this.v$.propertyData.name.$touch()"
              >
              </v-text-field>
              <v-text-field v-model="propertyData.description"
                            :error-messages="descriptionErrors"
                            clearable
                            label="Property Description"
                            variant="underlined"
                            @blur="this.v$.propertyData.description.$touch()"
                            @input="this.v$.propertyData.description.$touch()"
              >
              </v-text-field>
              <v-text-field v-model="propertyData.location"
                            :error-messages="locationErrors"
                            clearable
                            label="Property Location"
                            variant="underlined"
                            @blur="this.v$.propertyData.location.$touch()"
                            @input="this.v$.propertyData.location.$touch()"
              >
              </v-text-field>

            </v-card-text>

            <div class="d-flex flex-row justify-space-around">
              <number-input input-type="price" @set-value="this.setValueHandler"></number-input>
              <number-input input-type="capacity" @set-value="this.setValueHandler"></number-input>
              <number-input input-type="nrRooms" @set-value="this.setValueHandler"></number-input>
              <number-input input-type="nrBeds" @set-value="this.setValueHandler"></number-input>
              <number-input input-type="nrBathrooms" @set-value="this.setValueHandler"></number-input>
            </div>

            <add-facility></add-facility>
          </v-card>

        </v-col>
        <v-col cols="12">
          <div class="text-center pb-5">
            <v-btn size="large" @click="this.submitForm()">Submit</v-btn>
          </div>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script>
import NumberInput from "@/components/NumberInput";
import AddFacility from "@/components/AddFacility";
import {maxLength, minLength, required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";
import {mapActions, mapState} from "pinia";
import {useManagementStore} from "@/store/management";

export default {
  name: "AddPropertyPage",
  components: {AddFacility, NumberInput},
  computed: {
    nameErrors() {
      const errors = []
      if (!this.v$.propertyData.name.$dirty) {
        return errors
      }
      !this.v$.propertyData.name.required.$response && errors.push("Propery name is required")
      !this.v$.propertyData.name.minLength.$response && errors.push("Property name must be at least 5 chars")
      !this.v$.propertyData.name.maxLength.$response && errors.push("Property name must be at most 100 chars")
      return errors
    },
    descriptionErrors() {
      const errors = []
      if (!this.v$.propertyData.description.$dirty) {
        return errors
      }
      !this.v$.propertyData.description.required.$response && errors.push("Propery description is required")
      !this.v$.propertyData.description.minLength.$response && errors.push("Property description must be at least 10 chars")
      !this.v$.propertyData.description.maxLength.$response && errors.push("Property description must be at most 500 chars")
      return errors
    },
    locationErrors() {
      const errors = []
      if (!this.v$.propertyData.location.$dirty) {
        return errors
      }
      !this.v$.propertyData.location.required.$response && errors.push("Propery location is required")
      !this.v$.propertyData.location.minLength.$response && errors.push("Property location must be at least 10 chars")
      !this.v$.propertyData.location.maxLength.$response && errors.push("Property location must be at most 100 chars")
      return errors
    },
    ...mapState(useManagementStore, ['cabinsData', "cabinsCount"]),
  },
  data() {
    return {
      v$: useVuelidate(),
      staticData: {
        pictograms: [
          {
            title: "General",
            value: "mdi-map-marker-check"
          },
          {
            title: "Pool",
            value: "mdi-pool"
          },
          {
            title: "Parking",
            value: "mdi-parking"
          }
        ]
      },
      propertyData: {
        name: null,   //max 100 characters, only letters
        description: null,  //max 500 characters
        location: null,   //country, city;  max 100 chars, only letters, comma present to separate country from city
        price: null,  // positive float
        currency: null, // Eur, Dollar for the moment ==> maybe find a nice icon library for all existing currencies
        rooms: null,  // all fields left are positive integers
        beds: null,
        bathrooms: null,
        capacity: null,

        cabinId: null,  //uniquely identifies a cabin of a certain owner, automatically filled by taking into consideration the existing ids from the management store
      },
    }
  },
  validations() {
    return {
      propertyData: {
        name: {required, minLength: minLength(5), maxLength: maxLength(100)},
        description: {required, minLength: minLength(10), maxLength: maxLength(500)},
        location: {required, minLength: minLength(10), maxLength: maxLength(100)}
      }
    }
  },
  methods: {
    ...mapActions(useManagementStore, ["addCabin"]),
    async requestAddCabin() {
      let cabinData = {
        user_id: null, // id of the logged in user, hardcoded as 1
        name: this.propertyData.name,
        description: this.propertyData.description,
        location: this.propertyData.location,
        price: this.propertyData.price,
        facilities: [], // use this for now, later send from the child component the facilities added (and validated)
        capacity: this.propertyData.capacity,
        nr_rooms: this.propertyData.rooms,
        nr_bathrooms: this.propertyData.bathrooms,
        nr_beds: this.propertyData.beds,
      }
      let apiResponse = null
      try {
        apiResponse = await this.addCabin(cabinData)  // method from management store
      } catch (e) {
        console.log("Error during adding cabin:")
        console.log(e)
      }
      return apiResponse
    },
    submitForm() {
      this.v$.$validate()
      if (!this.v$.$error) {
        // if ANY fail validation
        alert('Form successfully submitted.')
        console.log("Now call methods to send request to the backed")
        let addCabinResponse = this.requestAddCabin()
        console.log("add cabin response: ")
        console.log(addCabinResponse)
      } else {
        alert('Form failed validation')
      }
    },
    setValueHandler(type, value) {
      console.log("setValue was emitted with" + type + " " + value)
      switch (type) {
        case "price":
          this.propertyData.price = value
          break;
        case "nrRooms":
          this.propertyData.rooms = value
          break;
        case "nrBeds":
          this.propertyData.beds = value
          break;
        case "nrBathrooms":
          this.propertyData.bathrooms = value
          break;
        case "capacity":
          this.propertyData.capacity = value
          break;
      }
    }
  }
}
</script>

<style scoped>

</style>
