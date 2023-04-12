<template>
  <v-app>
    <v-app-bar title="Cabins Inc">
      <v-btn>Book Now!</v-btn>
    </v-app-bar>
    <v-main>
      <router-view>

      </router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "OwnerLayout"
}
</script>

<style scoped>

</style>
