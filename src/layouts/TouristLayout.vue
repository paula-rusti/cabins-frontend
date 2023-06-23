<template>
  <v-app>
    <AppBar/>
    <tourist-side-navbar></tourist-side-navbar>

    <v-main>
      <router-view>

      </router-view>
    </v-main>

  </v-app>
</template>

<script>
import TouristSideNavbar from "@/components/TouristSideNavbar";
import AppBar from "@/components/AppBar.vue";
import {useUserStore} from "@/store/user";

export default {
  name: "TouristLayout",
  components: {TouristSideNavbar, AppBar},
  setup() {
    let userStore = useUserStore()
    return {userStore}
  },
  mounted() {
    if (this.userStore.userRole !== 'tourist') {
      this.$router.push({name: 'Owner Home Page'})
    }
  }
}
</script>

<style scoped>

</style>
