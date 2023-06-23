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
          <v-alert
            class="my-10"
            closable
            v-if="login_failed"
            type="error"
          >
            Login failed. Please try again.
          </v-alert>

          <form>
            <v-text-field
              v-model="state.email"
              :error-messages="v$.email.$errors.map(e => e.$message)"
              label="E-mail"
              required
              @input="v$.email.$touch"
              @blur="v$.email.$touch"
            ></v-text-field>

            <v-text-field
              v-model="state.password"
              type="password"
              :error-messages="v$.password.$errors.map(e => e.$message)"
              label="Password"
              required
              @input="v$.password.$touch"
              @blur="v$.password.$touch"
            ></v-text-field>

            <v-select
              v-model="state.role"
              :items="roles"
              :error-messages="v$.role.$errors.map(e => e.$message)"
              label="Role"
              required
              @change="v$.role.$touch"
              @blur="v$.role.$touch"
            ></v-select>

            <v-btn
              class="me-4"
              @click="login"
            >
              Login
            </v-btn>
          </form>

          <router-link :to="{name: 'Register Page'}">
            <h3>Don't have an account? Register Now!</h3>
          </router-link>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script>
import {useUserStore} from "@/store/user";
import {email, required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";

const rules = {
  password: {required},
  email: {required, email},
  role: {required},
}

export default {
  name: "LoginPage",
  data() {
    return {
      v$: null,
      login_failed: false,
      registered: false,
      state: {
        email: '',
        password: '',
        role: 'tourist'
      },
      roles: [
        'tourist',
        'owner',
      ],
    }
  },
  setup() {
    const userStore = useUserStore()
    return { userStore: userStore }
  },
  methods: {
    async login() {
      const isFormCorrect = await this.v$.$validate()
      if (!isFormCorrect) return
      try {
        await this.userStore.loginUser({email: this.state.email, password: this.state.password, role: this.state.role})
        await this.redirectLoggedInUser()
      } catch (e) {
        console.log(e)
        this.login_failed = true
      }
    },
    async redirectLoggedInUser() {
      if (this.userStore.isLoggedIn) {
        if (this.userStore.userRole === 'tourist') {
          await this.$router.push({name: 'Tourist Home Page'})
        } else if (this.userStore.userRole === 'owner') {
          await this.$router.push({name: 'Owner Home Page'})
        }
      }
    }
  },
  created() {
    this.v$ = useVuelidate(rules, this.state)
  },
  mounted() {
    this.registered = this.$route.query.registered === 'true'
    this.redirectLoggedInUser()
  },
}
</script>

<style scoped>

</style>
