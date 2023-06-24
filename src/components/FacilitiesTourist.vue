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
        v-for="(item, i) in this.facilitiesComputed"
        :key="i"
        :value="item"
        active-color="primary"
      >
        <template v-slot:prepend>
          <v-icon :icon="item.icon"></v-icon>
        </template>

        <v-list-item-title>{{item.text}}</v-list-item-title>
        <v-list-item-subtitle>{{item.desc}}</v-list-item-subtitle>
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
  props: {
    facilities: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      facilitiesButtonPressed: false,
      facilitiesButtonText: "Show More",
      facilitiesToShow: 3,
    }
  },
  computed: {
    facilitiesComputed() {
      if (this.facilities.length > 0) {
        return this.facilities.slice(0, this.facilitiesToShow)
      } else {
        return [
          {icon: "mdi-sofa", text: "No facilities available", desc: "That's sad"},
        ]
      }
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
