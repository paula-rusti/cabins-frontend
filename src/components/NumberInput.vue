<template>
  <div class="d-flex">
    <v-text-field v-model="inputValue"
                  :error-messages="inputValueErrors"
                  :label="getMatchingIcon()[1]"
                  :prepend-icon="getMatchingIcon()[0]"
                  clearable
                  variant="outlined"
                  @blur="this.v$.inputValue.$touch()"
                  @input="this.v$.inputValue.$touch()"
    ></v-text-field>
    <v-btn class="mx-2" icon="mdi-minus" @click="this.inputValue--"></v-btn>
    <v-btn icon="mdi-plus" @click="this.inputValue++"></v-btn>
  </div>
</template>

<script>
import {useVuelidate} from "@vuelidate/core";
import {between, numeric, required} from "@vuelidate/validators";

export default {
  name: "NumberInput",
  emits: ['setValue'],
  props: {
    inputType: {
      type: String,
      required: true,
      validator(value) {
        return ['capacity', 'nrRooms', 'nrBeds', 'nrBathrooms', 'price'].includes(value)
      }
    }
  },
  watch: {
    async inputValue() {
      const isFormCorrect = await this.v$.$validate()
      if (!isFormCorrect) return
      this.$emit('setValue', this.inputType, this.inputValue)
    }
  },
  computed: {
    inputValueErrors() {
      let errors = []
      if (!this.v$.inputValue.$dirty) {
        return errors
      }
      if (!this.v$.inputValue.required.$response) {
        errors.push(`${this.inputType} is required`)
      }
      if (!this.v$.inputValue.numeric.$response || !this.v$.inputValue.between.$response) {
        errors.push(`${this.inputType} must be a positive integer`)
      }
      return errors
    }
  },
  data() {
    return {
      v$: useVuelidate(),
      inputValue: 0
    }
  },
  validations() {
    return {
      inputValue: {required, numeric, between: between(1, 1000)},
    }
  },
  methods: {
    getMatchingIcon() {
      switch (this.inputType) {
        case 'capacity':
          return ['mdi-human-capacity-increase', 'Capacity']
        case 'nrRooms':
          return ['mdi-room-service', 'Rooms']
        case 'nrBeds':
          return ['mdi-bed', 'Beds']
        case 'nrBathrooms':
          return ['mdi-shower-head', 'Bathrooms']
        case 'price':
          return ['mdi-cash', 'Price']
        default:
          return ['mdi-help-box', 'Unknown']
      }
    }
  }
}
</script>

<style scoped>

</style>
