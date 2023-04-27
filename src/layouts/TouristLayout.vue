<template>
  <v-app>
    <v-app-bar title="Cabins Inc">
      <v-btn :to="{
        name: 'Login Page',
        params: {
          fromTourist: true
        }
      }">Property Management</v-btn>
      <v-btn>About Us</v-btn>
      <v-btn :to="{name: 'Login Page'}">Logout</v-btn>
    </v-app-bar>
    <tourist-side-navbar></tourist-side-navbar>

    <v-main>
      <router-view>

      </router-view>
    </v-main>

  </v-app>
</template>

<script>
import TouristSideNavbar from "@/components/TouristSideNavbar";
export default {
  name: "TouristLayout",
  components: {TouristSideNavbar}
}
</script>

<style scoped>

</style>
