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
              {{ item.columns.name }}
            </template>
            <template v-slot:item.actions="{ item }">
              <v-dialog
                transition="dialog-bottom-transition"
                persistent
                width="auto"
              >
                <template v-slot:activator="{ props }">
                  <v-btn
                    color="primary"
                    v-bind="props"
                  >Add Photo
                  </v-btn>
                </template>
                <template v-slot:default="{ isActive }">
                  <v-card>
                    <v-toolbar
                      color="primary"
                      :title="`${item.columns.name}`"
                    ></v-toolbar>
                    <v-card-text>
                      <div class="d-flex flex-column align-center">
                        <div class="text-h2 pa-12">Upload a photo</div>
                        <v-file-input
                          v-model="files"
                          color="deep-purple-accent-4"
                          style="width: 30vw"
                          counter
                          multiple
                          label="File input"
                          placeholder="Select your files"
                          prepend-icon="mdi-paperclip"
                          variant="outlined"
                          :show-size="1000"
                        >
                          <template v-slot:selection="{ fileNames }">
                            <template v-for="(fileName, index) in fileNames" :key="fileName">
                              <v-chip
                                v-if="index < 2"
                                color="deep-purple-accent-4"
                                label
                                size="small"
                                class="me-2"
                              >
                                {{ fileName }}
                              </v-chip>

                              <span
                                v-else-if="index === 2"
                                class="text-overline text-grey-darken-3 mx-2"
                              >
                                +{{ files.length - 2 }} File(s)
                              </span>
                            </template>
                          </template>
                        </v-file-input>
                      </div>
                    </v-card-text>
                    <v-card-actions class="justify-lg-space-around">
                      <v-btn
                        variant="text"
                        @click="isActive.value = false"
                      >Close
                      </v-btn>
                      <v-btn color="primary" @click="uploadPhoto(item); isActive.value = false">Upload</v-btn>
                    </v-card-actions>
                  </v-card>
                </template>
              </v-dialog>
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
      handler(_newValue, _) {
        this.getCabins()
      }
    }
  },
  setup() {
    return {
      managementStore: useManagementStore()
    }
  },
  data() {
    return {
      files: [],
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
        {key: 'actions', title: 'Actions'},
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
    },
    async uploadPhoto(item) {
      for (let i = 0; i < this.files.length; i++) {
        const formData = new FormData()
        formData.append('file', this.files[i])
        await this.managementStore.uploadPhoto(formData, {cabinId: item.raw.id, principal: false})
      }
      this.files = []
    }
  },
  mounted() {
    this.getCabins()
  }
}
</script>

<style scoped>

</style>
