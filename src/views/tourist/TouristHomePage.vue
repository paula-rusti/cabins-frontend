<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex fill-height">

      <h1 class="text-h2 font-weight-bold">Tourist Home Page</h1>
      <v-row>
<!--        v-col-md-4 v-col-lg-2 v-col-xl-2-->
        <v-col class="ma-2" cols="3">
          <search-card-tourist @search-event="searchEventHandler"></search-card-tourist>
        </v-col>


        <v-col cols="6">
          <div v-for="cabin in this.cabins" :key="cabin.id" class="pa-5">
            <property-card-tourist
              :id="Number(cabin.id)"
              :description=cabin.description
              :location="cabin.location"
              :name="cabin.name"
              :price="cabin.price"
              src="https://picsum.photos/500/300?image=666"/>
          </div>
        </v-col>
      </v-row>

      <v-row cols="12">
        <div>
          <v-pagination v-model="page" :length="pagesCount">
          </v-pagination>
        </div>
      </v-row>

    </v-responsive>
  </v-container>
</template>

<script>
// TODO fetch cabins from the api
import PropertyCardTourist from "@/components/PropertyCardTourist";
import SearchCardTourist from "@/components/SearchCardTourist";

import {mapActions} from "pinia/dist/pinia";
import {useCabinsStore} from "@/store/cabins";
import {mapState} from "pinia";

export default {
  name: "TouristHomePage",
  components: {PropertyCardTourist, SearchCardTourist},
  data() {
    return {
      page: 1,
      itemsPerPage: 3,
    }
  },
  watch: {
    page: {
      // eslint-disable-next-line no-unused-vars
      handler(newValue, _) {
        this.getCabins()
      }
    }
  },
  computed: {
    ...mapState(useCabinsStore, ['cabinsCount', "cabins"]),
    pagesCount() {
     let retVal =  Math.ceil(this.cabinsCount / this.itemsPerPage);
     if (Number.isNaN(retVal)) {
       return 0
     }
     return retVal
    }
  },
  methods: {
    ...mapActions(useCabinsStore, ['retrieveCabins', 'setPage', 'setItemsPerPage', 'setSearchParams']),
    getCabins() {
      this.setPage(this.page)
      this.setItemsPerPage(this.itemsPerPage)
      this.retrieveCabins()
    },
    // eslint-disable-next-line no-unused-vars
    searchEventHandler(search_params) {
      this.page = 1
      this.setSearchParams(search_params)
      this.getCabins()
    }
  },
  mounted() {
    this.getCabins()
  }
}
</script>

<style scoped>
</style>
