<template>
  <v-card
    class="mx-auto"
  >
    <v-container>
      <v-responsive>
        <v-row>
          <v-col cols="3">
            <v-img v-ripple="{ color: `text-primary` }"
                   :src=src
                   cover
                   style="border-radius: 50px; height: 237px"
            >
            </v-img>
          </v-col>
          <v-col cols="5">
            <v-card-title class="align-content-right text-h5">
              {{ name }}
            </v-card-title>
            <v-card-text>Description: {{ description }}</v-card-text>
            <v-card-text>Location: {{ location }}</v-card-text>
            <v-card-text>Price: {{ price }} lei</v-card-text>
          </v-col>
          <v-col cols="4">
            <v-card-actions>
              <v-btn
                color="purple lighten-2"
                :to="{
                  name: 'Cabin Details',
                  params: {
                    cabin_id: id
                  }
                }"
              >Explore</v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-responsive>
    </v-container>

  </v-card>
</template>

<script>
// TODO make this look better
// TODO add facilities here
export default {
  name: "CabinCard",
  props: {
    id: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true  // required bcs the explore button's redirection has a param whose value is linked to the same property
    },
    description: {
      type: String,
      required: false
    },
    location: {
      type: String,
      required: false
    },
    price: {
      type: Number,
      required: false
    },
    src: {
      type: String,
      required: false
    },
  }
}
</script>

<style scoped>
.white-text {
  color: white;
}
</style>
