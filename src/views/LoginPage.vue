<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-center text-center fill-height">

      <h1 class="text-h2 font-weight-bold">Here you do login</h1>
      <h2 v-if="fromTourist">Login into your Tourist account</h2>
      <h2 v-if="fromOwner">Login into your Owner account</h2>
      <div class="py-14" />
      <router-link :to="{name: 'Register Page'}">
        <h3>Don't have an account? Register Now!</h3>
      </router-link>


    </v-responsive>
  </v-container>
</template>

<script>
export default {
  name: "LoginPage",
  props: {
    fromTourist: Boolean,
    fromOwner: Boolean
  }
}
</script>

<style scoped>

</style>
