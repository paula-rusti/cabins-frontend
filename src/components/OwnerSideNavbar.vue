<template>
  <v-navigation-drawer image="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
                       permanent
                       theme="dark"
  >
    <v-list nav>
      <v-list-item prepend-icon="mdi-home" title="Properties" to="/owner/"></v-list-item>
      <v-list-item prepend-icon="mdi-chart-line" title="Insight" to="/owner/insight"></v-list-item>
      <v-list-item prepend-icon="mdi-home-plus" title="Add Property" to="/owner/add-cabin"></v-list-item>
      <v-list-item prepend-icon="mdi-book-marker" title="Bookings" to="/owner/bookings"></v-list-item>
      <v-list-item prepend-icon="mdi-account" title="My Profile" to="/owner/profile"></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "OwnerSideNavbar"
}
</script>

<style scoped>

</style>
