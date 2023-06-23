<template>
  <v-app>
    <AppBar/>
    <v-main>
      <router-view>

      </router-view>
    </v-main>
  </v-app>
</template>

<script>
import AppBar from "@/components/AppBar.vue";

export default {
  name: "LandingLayout",
  components: {AppBar}
}
</script>

<style scoped>

</style>
