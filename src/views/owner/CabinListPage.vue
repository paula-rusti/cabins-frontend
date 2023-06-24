<template>
  <v-container class="mt-12">
    <v-responsive>
      <v-row>
        <v-col>
          <h1>Cabin Management</h1>
          <p>On this page you can manage and create Cabins.</p>
        </v-col>
      </v-row>
      <v-spacer class="my-10"/>
      <v-row>
        <v-col align="right">
          <v-btn
            class="mx-6"
            color="primary"
            prepend-icon="mdi-store-plus"
            @click="$router.push({name: 'Owner Add Property Page'})"
          >
            Add New Cabin
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card-title>
            Filter results
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              hide-details
              label="Search"
              single-line
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="cabinsData"
            :search="search"
          >
            <!-- Template Slot for cabin name to. -->
            <template v-slot:item.name="{ item }">
              <!-- todo make router link-->
              {{ item.columns.name }} - {{ item.raw.id }}
            </template>
            <template v-slot:bottom>
              <div class="text-center pt-2">
                <v-pagination
                  v-model="page"
                  :length="pagesCount"
                ></v-pagination>
              </div>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script>
import {VDataTable} from "vuetify/labs/components";
import {mapActions, mapState} from "pinia";
import {useManagementStore} from "@/store/management";

export default {
  name: "CabinList",
  components: {VDataTable},
  watch: {
    page: {
      handler(newValue, _) {
        this.getCabins()
      }
    }
  },
  data() {
    return {
      page: 1,
      itemsPerPage: 20,
      search: "",
      headers: [
        {
          align: 'start',
          key: 'name',
          title: 'Cabin Name',
        },
        {key: 'location', title: 'Location'},
        {key: 'capacity', title: 'Capacity'},
        {key: 'nr_rooms', title: 'Number of Rooms'},
        {key: 'nr_beds', title: 'Number of Beds'},
        {key: 'nr_bathrooms', title: 'Number of Badthrooms'},
        {key: 'price', title: 'Price'},
      ],
    }
  },
  computed: {
    ...mapState(useManagementStore, ['cabinsData', "cabinsCount"]),
    pagesCount() {
      return Math.ceil(this.cabinsCount / this.itemsPerPage)
    }
  },
  methods: {
    ...mapActions(useManagementStore, ["retrieveCabins"]),
    getCabins() {
      this.retrieveCabins(this.page, this.itemsPerPage)
    }
  },
  mounted() {
    this.getCabins()
  }
}
</script>

<style scoped>

</style>
