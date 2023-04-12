<template>
  <v-app>
    <v-app-bar title="Cabins Inc">
      <v-btn>Property Management</v-btn>
    </v-app-bar>
    <v-main>
      <router-view>

      </router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "TouristLayout"
}
</script>

<style scoped>

</style>
