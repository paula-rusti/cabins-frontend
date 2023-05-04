<template>
  <v-card class="mx-5 mb-5" title="Add a Facility">
    <v-row class="">
      <v-col class="ml-5" cols="2">
        <v-select v-model="facilityData.type" :error-messages="facilityTypeErrors" :items="staticData.facilityTypes"
                  label="Facility Type"
                  variant="solo"
                  @blur="this.v$.facilityData.type.$touch()"
                  @input="this.v$.facilityData.type.$touch()"></v-select>
      </v-col>
      <v-col cols="6">
        <v-text-field ref="descriptionField"
                      v-model="facilityData.description"
                      :error-messages="facilityDescriptionErrors"
                      label="Facility Description"
                      variant="solo"
                      @blur="this.v$.facilityData.description.$touch()"
                      @input="this.v$.facilityData.description.$touch()"
        ></v-text-field>
      </v-col>
      <v-col class="ml-5 mb-5" cols="auto">
        <v-btn icon="mdi-pen-plus" @click="addFacilityDisplay()"></v-btn>
      </v-col>
    </v-row>
    <!--    facility display -->
    <template v-for="(child, index) in children" v-if="children.length>0" :key="index">
      <component :is="child.component" v-bind="child.props" @delete-facility="deleteFacilityHandler"></component>
    </template>
  </v-card>
</template>

<script>
import FacilityDisplay from "@/components/FacilityDisplay";
import {useVuelidate} from "@vuelidate/core";
import {maxLength, required} from "@vuelidate/validators";

const uniqueFacilityType = (value) => !(value in this.facilitiesAdded)  // maybe use this custom validator instead of manually checking for uniqueness

export default {

  name: "AddFacility",
  computed: {
    facilityDescriptionErrors() {
      const errors = []
      if (!this.v$.facilityData.description.$dirty) {
        return errors
      }
      !this.v$.facilityData.description.required.$response && errors.push("Facility description is required")
      !this.v$.facilityData.description.maxLength.$response && errors.push("Facility description can have max 50 chars")
      return errors
    },
    facilityTypeErrors() {
      const errors = []
      if (!this.v$.facilityData.type.$dirty) {
        return errors
      }
      !this.v$.facilityData.type.required.$response && errors.push("Facility type is required")
      return errors
    }
  },
  data() {
    return {
      v$: useVuelidate({$stopPropagation: true}), // stop propagation for description and type field in the parent
      staticData: {
        facilityTypes: ["Parking", "Pool", "Wifi", "Spa"],
        facilityIcons: {
          Parking: 'mdi-parking',
          Pool: 'mdi-pool',
          Wifi: 'mdi-wifi',
          Spa: 'mdi-spa'
        }
      },
      facilityData: {
        type: null,   // selected facility type, unique per logged in user
        description: null,
      },
      child_index: 0,
      children: [],         // facilityDisplay components will be stored here
      facilitiesAdded: {},
    }
  },
  validations() {
    return {
      facilityData: {
        type: {required},
        description: {required, maxLength: maxLength(50)}
      }
    }
  },
  methods: {
    clearAddFacility() {
      this.facilityData.type = null
      this.facilityData.description = null
      this.v$.$reset();
    },

    addFacilityDisplay() {
      this.v$.$validate() // checks all inputs
      if (this.v$.$error) {
        alert("Cannot add facility")
        this.clearAddFacility()
        return;
      }
      if (this.facilityData.type in this.facilitiesAdded) {
        alert("Only one facility per type ")
        this.clearAddFacility()
        return
      }

      this.children.push({
        component: FacilityDisplay,
        props: {
          id: this.child_index++,
          fType: this.facilityData.type,
          fIcon: this.staticData.facilityIcons[this.facilityData.type],
          fDescription: this.facilityData.description
        }
      })
      this.facilitiesAdded[this.facilityData.type] = {
        description: this.facilityData.description,
        icon: this.staticData.facilityIcons[this.facilityData.type]
      }
      this.clearAddFacility()
    },

    deleteFacilityHandler(id, fType) {
      const index = this.children.findIndex(c => c.id === id)
      this.children.splice(index, 1)
      delete this.facilitiesAdded[fType]
      this.child_index--
    }
  }
}
</script>

<style scoped>

</style>
