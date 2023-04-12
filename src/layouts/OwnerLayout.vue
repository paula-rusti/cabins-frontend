<template>
  <v-app>
    <v-app-bar title="Cabins Inc">
      <v-btn :to="{
        name: 'Login Page',
        params: {
          fromOwner: true
        }
      }">Book Now!</v-btn>
      <v-btn>About Us</v-btn>
      <v-btn :to="{name: 'Login Page'}">Logout</v-btn>
    </v-app-bar>
    <owner-side-navbar></owner-side-navbar>

    <v-main>
      <router-view>

      </router-view>
    </v-main>

  </v-app>
</template>

<script>
import OwnerSideNavbar from "@/components/OwnerSideNavbar";

export default {
  name: "OwnerLayout",
  components: {OwnerSideNavbar}
}
</script>

<style scoped>

</style>
