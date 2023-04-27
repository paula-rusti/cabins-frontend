<template>
  <v-navigation-drawer image="@/assets/360_gradient_green.jpg"
                       permanent
                       theme="dark"
  >
    <v-list nav>
      <v-list-item prepend-icon="mdi-home" title="Offers"
                   to="/tourist"></v-list-item>
      <v-list-item prepend-icon="mdi-message-draw" title="My Reviews" to="/tourist/reviews"></v-list-item>
      <v-list-item prepend-icon="mdi-book-marker" title="My Bookings" to="/tourist/bookings"></v-list-item>
      <v-list-item prepend-icon="mdi-account" title="My Profile" to="/tourist/profile"></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "TouristSideNavbar"
}
</script>

<style scoped>

</style>
