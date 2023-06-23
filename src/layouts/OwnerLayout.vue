<template>
  <v-app>
    <AppBar/>
    <owner-side-navbar></owner-side-navbar>

    <v-main>
      <router-view>

      </router-view>
    </v-main>

  </v-app>
</template>

<script>
import OwnerSideNavbar from "@/components/OwnerSideNavbar";
import AppBar from "@/components/AppBar.vue";
import {useUserStore} from "@/store/user";

export default {
  name: "OwnerLayout",
  components: {OwnerSideNavbar, AppBar},
  setup() {
    let userStore = useUserStore()
    return {userStore}
  },
  mounted() {
    if (this.userStore.userRole !== 'owner') {
      this.$router.push({name: 'Tourist Home Page'})
    }
  },
}
</script>

<style scoped>

</style>
