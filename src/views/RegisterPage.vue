<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-center text-center fill-height">
      <v-row class="justify-center">
        <v-col cols="6">
          <h1>Register</h1>
          <v-alert
            class="my-10"
            closable
            v-if="registration_failed"
            type="error"
          >
            Registration failed! Please try again later.
          </v-alert>
          <form>
            <v-text-field
              v-model="state.full_name"
              :error-messages="v$.full_name.$errors.map(e => e.$message)"
              :counter="10"
              label="Full Name"
              required
              @input="v$.full_name.$touch"
              @blur="v$.full_name.$touch"
            ></v-text-field>

            <v-text-field
              v-model="state.username"
              :error-messages="v$.username.$errors.map(e => e.$message)"
              :counter="10"
              label="Username"
              required
              @input="v$.username.$touch"
              @blur="v$.username.$touch"
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

            <v-text-field
              v-model="state.email"
              :error-messages="v$.email.$errors.map(e => e.$message)"
              label="E-mail"
              required
              @input="v$.email.$touch"
              @blur="v$.email.$touch"
            ></v-text-field>

            <v-text-field
              v-model="state.phone_number"
              :error-messages="v$.phone_number.$errors.map(e => e.$message)"
              label="Phone Number"
              required
              @input="v$.phone_number.$touch"
              @blur="v$.phone_number.$touch"
            ></v-text-field>

            <v-select
              v-model="state.role"
              :items="roles"
              :error-messages="v$.role.$errors.map(e => e.$message)"
              label="Item"
              required
              @change="v$.role.$touch"
              @blur="v$.role.$touch"
            ></v-select>

            <v-btn
              class="me-4"
              @click="register"
            >
              submit
            </v-btn>
            <v-btn @click="clear">
              clear
            </v-btn>
          </form>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <router-link :to="{name: 'Login Page'}">
            <h3>Already have an account? Login Now!</h3>
          </router-link>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script>
import {useVuelidate} from "@vuelidate/core";
import {required, email} from "@vuelidate/validators";
import {useUserStore} from "@/store/user";

const rules = {
  full_name: {required},
  username: {required},
  password: {required},
  email: {required, email},
  phone_number: {required},
  role: {required},
}

export default {
  name: "RegisterPage",
  data() {
    return {
      v$: null,
      registration_failed: false,
      state: {
        full_name: '',
        username: '',
        password: '',
        email: '',
        phone_number: '',
        role: "tourist",
      },
      roles: [
        'tourist',
        'owner',
      ],
    }
  },
  setup() {
    const tasksStore = useUserStore()
    return { tasksStore: tasksStore }
  },
  created() {
    this.v$ = useVuelidate(rules, this.state)
  },
  methods: {
    async register() {
      const isFormCorrect = await this.v$.$validate()
      console.log(isFormCorrect, this.v$.$errors)
      if (!isFormCorrect) return
      try {
        await this.tasksStore.registerUser(this.state)
        this.$router.push({name: 'Login Page', query: {registered: true}})
      } catch (e) {
        console.log(e)
        this.registration_failed = true
      }
    },
    clear() {
      this.v$.$reset()
      this.state.full_name = ''
      this.state.username = ''
      this.state.password = ''
      this.state.email = ''
      this.state.phone_number = ''
      this.state.role = 'tourist'
      this.state.checkbox = false
    },
  }
}
</script>

<style scoped>

</style>
