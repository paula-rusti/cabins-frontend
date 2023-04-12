<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-center text-center fill-height">

      <h1 class="text-h2 font-weight-bold">Here you do register</h1>
      <div class="py-14" />
      <router-link :to="{name: 'Login Page'}">
        <h3>Already have an account? Login Now!</h3>
      </router-link>

    </v-responsive>
  </v-container>
</template>

<script>
export default {
  name: "RegisterPage"
}
</script>

<style scoped>

</style>
