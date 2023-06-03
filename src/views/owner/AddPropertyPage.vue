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

            <div class="d-flex flex-row justify-space-around ">
              <v-text-field v-model="propertyData.latitude" readonly label="latitude" style="max-width: 600px" class="ms-10"></v-text-field>
              <v-text-field v-model="propertyData.longitude" readonly label="longitude" style="max-width: 600px" class="mx-10"></v-text-field>
              <v-text-field readonly label="location name: city, country" style="max-width: 600px" class="me-10"></v-text-field>
            </div>

          </v-card>

        </v-col>
        <v-col cols="12">
          <div class="text-center pb-5">
            <v-btn size="large" @click="this.submitForm()">Submit</v-btn>
          </div>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <h1>Aici vine harta</h1>
        </v-col>
      </v-row>

      <v-row class="ma-2">
        <v-col cols="4"></v-col>
        <v-col cols="auto">
          <div id="map" style="height: 1000px; width: 1000px"></div>
        </v-col>
        <v-col cols="4"></v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <h1>Dupa harta</h1>
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

const popup = L.popup();


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
      // map data
      marker: null,
      map: null,
      //vuelidate
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

        latitude: null,  // automatically filled by the map
        longitude: null,  // automatically filled by the map
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
    },

    onMapClick(e) {
      console.log("On click", e)
      console.log("Cords", e.latlng)
      this.marker.remove()
      this.marker = L.marker(e.latlng).addTo(this.map);
      popup.setLatLng(e.latlng).setContent("You clicked at " + e.latlng.toString()).openOn(this.map)

      // set lat and long -- shall be visible in the form
      this.propertyData.latitude = e.latlng.lat
      this.propertyData.longitude = e.latlng.lng
    }
  },
  mounted() {
    let map = this.map = L.map('map').setView([45.756415409400695, 21.229405403137207], 18)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    L.Control.geocoder().addTo(map);

    this.marker = L.marker([45.756415409400695, 21.229405403137207]).addTo(map);

    // Folosesti asta ca sa setezi locatia
    map.on("click", this.onMapClick)  // register listener
  },

  blockInput(event) {
    event.preventDefault()
  }
}

//todo listen to markgeocode event and look with debugger to see what it sends
</script>

<style scoped>


</style>
