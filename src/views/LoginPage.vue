<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-center text-center fill-height">

      <v-row class="justify-center">
        <v-col cols="6">
          <v-alert
            class="my-10"
            closable
            v-if="registered"
            type="success"
            >
            Registration successful! Please login.
          </v-alert>
          <h1 class="text-h2 font-weight-bold">Here you do login</h1>
          <div class="py-14" />
          <router-link :to="{name: 'Register Page'}">
            <h3>Don't have an account? Register Now!</h3>
          </router-link>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script>
export default {
  name: "LoginPage",
  data() {
    return {
      registered: false,
    }
  },
  mounted() {
    this.registered = this.$route.query.registered === 'true'
  }
}
</script>

<style scoped>

</style>
