<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex fill-height">

      <h1 class="text-h2 font-weight-bold">Tourist Home Page</h1>
      <v-row>
        <v-col class="ma-2 v-col-md-3 v-col-lg-2 v-col-xl-2" cols="3">
          <search-card-tourist></search-card-tourist>
        </v-col>


        <v-col cols="6">
          <div class="pa-5">
            <property-card-tourist
              :id="Number(1)"
              description="Dummy Description"
              location="Dummy Location"
              name="Dummy Name"
              :price="Number(250)"
              src="https://picsum.photos/500/300?image=666"/>
          </div>
        </v-col>
      </v-row>

    </v-responsive>
  </v-container>
</template>

<script>
import PropertyCardTourist from "@/components/PropertyCardTourist";
import SearchCardTourist from "@/components/SearchCardTourist";

export default {
  name: "TouristHomePage",
  components: {PropertyCardTourist, SearchCardTourist},
}
</script>

<style scoped>
</style>
