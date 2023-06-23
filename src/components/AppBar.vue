<template>
  <v-app-bar title="Cabins Inc">
    <v-btn v-if="userStore.isLoggedIn" @click="logout">Logout</v-btn>
  </v-app-bar>
</template>

<script>
import {useUserStore} from "@/store/user";

export default {
  name: "AppBar",
  setup() {
    let userStore = useUserStore()
    return {userStore}
  },
  created() {
    this.userStore.loadFromWebstorage()
  },
  methods: {
    async logout() {
      await this.userStore.logoutUser()
      await this.$router.push({name: 'Landing Page'})
    }
  }
}
</script>

<style scoped>

</style>
