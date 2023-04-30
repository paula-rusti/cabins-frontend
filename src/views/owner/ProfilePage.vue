<template>
  <h1 class="pa-7">My Profile</h1>
  <v-container  class="fill-height">
    <v-responsive class="d-flex fill-height">

      <v-row>
        <v-col cols="6">
          <div class="pa-5">
            <profile-card user-type="Owner"></profile-card>
          </div>
        </v-col>
        <v-col cols="6">
          <v-row>
            <v-col cols="12">
              <v-btn>Update Picture</v-btn>
            </v-col>
            <v-col cols="12">
              <v-btn>Update Description</v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script>
import ProfileCard from "@/components/ProfileCard";

export default {
  name: "ProfilePage",
  components: {ProfileCard}
}
</script>

<style scoped>

</style>
