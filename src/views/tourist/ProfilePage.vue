<template>
  <h1 class="pa-7">My Profile</h1>
  <v-container  class="fill-height">
    <v-responsive class="d-flex fill-height">

      <v-row>
        <v-col cols="6">
          <div class="pa-5">
            <profile-card user-type="Tourist"></profile-card>
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
      <v-row>
        <v-col cols="6">
          <div class="colored-div">
            <span class="centered-number">234 Reviews</span>
          </div>
        </v-col>
        <v-col cols="6">
          <div class="colored-div">
            <span class="centered-number">300 Bookings</span>
          </div>
        </v-col>
      </v-row>
<!--      reviews graph-->
      <v-row>
        <v-col cols="6">
          <div class="colored-div" style="width: 1000px; height: 500px;
          background-color: dodgerblue; border-style: solid; border-color: blue">
            <span class="centered-number">Graph for Reviews</span>
          </div>
        </v-col>
      </v-row>
<!--      bookings graphs-->
      <v-row>
        <v-col cols="6">
          <div class="colored-div" style="width: 1000px; height: 500px;
          background-color: dodgerblue; border-style: solid; border-color: blue">
            <span class="centered-number">Graph for Bookings</span>
          </div>
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
/*  styles for the reviews and bookings numbers*/
.colored-div {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 300px;
  background-color: lightblue;
  border-radius: 0;
}

.centered-number {
  font-size: 36px;
  font-weight: bold;
  color: white;
}
</style>
