<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-center text-center fill-height">
      <v-img
        contain
        height="300"
        src="@/assets/cabin_logo.png"
      />

      <div class="text-body-2 font-weight-light mb-n1">Welcome to</div>

      <h1 class="text-h2 font-weight-bold">Cabins Inc</h1>

      <div class="py-14" />

      <v-row class="d-flex align-center justify-center">

        <v-col cols="auto">
          <v-btn
            color="primary"
            href="https://next.vuetifyjs.com/introduction/why-vuetify/#feature-guides"
            min-width="228"
            rel="noopener noreferrer"
            size="x-large"
            variant="flat"
            :to="{
              name: 'Login Page'
            }"
          >
            <v-icon
              icon="mdi-speedometer"
              size="large"
              start
            />

            Login
          </v-btn>
        </v-col>

        <v-col cols="auto">
          <v-btn
            color="primary"
            href="https://next.vuetifyjs.com/introduction/why-vuetify/#feature-guides"
            min-width="228"
            rel="noopener noreferrer"
            size="x-large"
            variant="flat"
            :to="{
              name: 'Register Page'
            }"
          >
            <v-icon
              icon="mdi-speedometer"
              size="large"
              start
            />

            Register
          </v-btn>
        </v-col>

      </v-row>
    </v-responsive>
  </v-container>
</template>

<script>
import {useUserStore} from "@/store/user";

export default {
  name: "LandingPage",
  setup() {
    const userStore = useUserStore()
    return { userStore: userStore }
  },
  mounted() {
    this.redirectLoggedInUser()
  },
  methods: {
    async redirectLoggedInUser() {
      if (this.userStore.isLoggedIn) {
        if (this.userStore.userRole === 'tourist') {
          await this.$router.push({name: 'Tourist Home Page'})
        } else if (this.userStore.userRole === 'owner') {
          await this.$router.push({name: 'Owner Home Page'})
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
