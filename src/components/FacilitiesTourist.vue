<template>
  <v-card class="card-style">
    <v-card-item>
      <v-card-title>Facilities</v-card-title>
      <v-card-subtitle>What this place offers</v-card-subtitle>
    </v-card-item>
    <v-list
      :lines="false"
      density="compact"
      nav
    >
      <v-list-item
        v-for="(item, i) in this.facilities.slice(0, this.facilitiesToShow)"
        :key="i"
        :value="item"
        active-color="primary"
      >
        <template v-slot:prepend>
          <v-icon :icon="item.icon"></v-icon>
        </template>

        <v-list-item-title v-text="item.text"></v-list-item-title>
        <v-list-item-subtitle>aaa</v-list-item-subtitle>
      </v-list-item>
    </v-list>
    <v-card-actions>
      <v-btn @click="this.toggleFacilitiesButton">{{ this.facilitiesButtonText }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
//TODO remove hardcoded data and introduce props to pass data
export default {
  name: "FacilitiesTourist",
  data() {
    return {
      facilitiesButtonPressed: false,
      facilitiesButtonText: "Show More",
      facilitiesToShow: 3,
      facilities: [
        {text: 'Internet', icon: 'mdi-wifi', desc: 'free wifi is available'},
        {text: 'Parking', icon: 'mdi-parking', desc: 'free parking on site'},
        {text: 'Parking', icon: 'mdi-parking', desc: 'free parking on site'},
        {text: 'Parking', icon: 'mdi-parking', desc: 'free parking on site'},
        {text: 'Parking', icon: 'mdi-parking', desc: 'free parking on site'},
        {text: 'Parking', icon: 'mdi-parking', desc: 'free parking on site'},
      ],
    }
  },
  methods: {
    toggleFacilitiesButton() {
      console.log("Handler called, initial value of pressed is: " + this.facilitiesButtonPressed)
      this.facilitiesButtonPressed = !this.facilitiesButtonPressed
      console.log("Handler called, modified value of pressed is: " + this.facilitiesButtonPressed)
      if (this.facilitiesButtonPressed === false) {
        this.facilitiesButtonText = "Show Less"
        this.facilitiesToShow = this.facilities.length
      } else {
        this.facilitiesButtonText = "Show More"
        this.facilitiesToShow = 3
      }
    }
  }
}
</script>

<style scoped>

</style>
