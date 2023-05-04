<template>
  <v-list-item :prepend-icon="fIcon" :subtitle="fDescription" :title="fType" class="mb-5" max-width="50%">
    <template v-slot:append>
      <v-btn @click="deleteButtonClickedHandler()">DELETE {{ id }}</v-btn>
    </template>
  </v-list-item>
</template>

<script>
// component that will be dynamically added to another component
export default {
  name: "FacilityDisplay",
  emits: ["deleteFacility"],
  props: {
    id: {
      type: Number,
      required: true
    },
    fType: {
      type: String,
      required: true
    },
    fIcon: {
      type: String,
      required: true
    },
    fDescription: {
      type: String,
      required: true
    }
  },
  methods: {
    deleteButtonClickedHandler() {
      this.$emit("deleteFacility", this.id, this.fType)
    }
  }

}
</script>

<style scoped>

</style>
