<template>
  <v-container>
    <v-responsive class="d-flex fill-height">
      <v-row>
        <v-col cols="12">
          <h1>{{this.cabinStore.currentCabin?.name}}</h1>
        </v-col>
        <v-col cols="12">
          <h4>
            <v-icon icon="mdi-map-marker"></v-icon>
            {{this.cabinStore.currentCabin?.location}}
          </h4>
        </v-col>
        <v-col class="v-col-md-6 v-col-sm-12 v-col-xs-12" cols="12">
          <v-icon icon="mdi-star"></v-icon>
          Rating: {{this.rating}}
        </v-col>
        <v-col cols="12">
          <p>Description: {{this.cabinStore.currentCabin.description}}</p>
        </v-col>
        <v-col cols="12">
          <lightgallery
            :onBeforeSlide="onBeforeSlide"
            :onInit="onInit"
            :settings="lightGallerySettings"
            class="d-flex flex-row flex-wrap align-start justify-start"
          >
            <a v-for="(src, i) of this.images" :key="i" :href="src" class="gallery-item">
              <img :src="src" alt="img"/>
            </a>
          </lightgallery>
        </v-col>
<!--        cabin info section-->
        <v-row>
<!--          cabin internal organization-->
          <v-col class="v-col-md-4 v-col-sm-12 v-col-xs-12" cols="12">
            <v-card class="card-style">
              <v-card-item>
                <v-card-title>Cabin Info</v-card-title>
                <v-card-subtitle>Cabin's internal organization</v-card-subtitle>
              </v-card-item>

              <v-list
                :lines="false"
                density="compact"
                nav
                style="background-color: cornflowerblue"
              >
                <v-list-item
                  v-for="(item, i) in [{ title: 'Rooms', icon: 'mdi-sofa', key: 'nr_rooms' },
                                        { title: 'Bathrooms', icon: 'mdi-shower-head', key: 'nr_bathrooms' },
                                        { title: 'Beds', icon: 'mdi-bed', key: 'nr_beds' },
                                        { title: 'Fits', icon: 'mdi-account', key: 'capacity' }
                                      ]"
                  :key="i"
                  :value="item"
                  active-color="primary"
                >
                  <template v-slot:prepend>
                    <v-icon :icon="item.icon"></v-icon>
                  </template>

                  <v-list-item-title>
                    {{`${item.title}: ${this.cabinStore.currentCabin[item.key]}`}}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
<!--        facilities-->
          <v-col class="v-col-md-4 v-col-sm-12 v-col-xs-12" cols="12">
            <facilities-tourist :facilities="this.cabinStore.currentCabin.facilities || []"></facilities-tourist>
          </v-col>
          <!--        book  now-->
          <v-col class="v-col-md-4 v-col-sm-12 v-col-xs-12" cols="12">
            <div class="pa-4">
              <reserve-card :cabin="this.cabinStore.currentCabin"></reserve-card>
            </div>
          </v-col>
        </v-row>
      </v-row>

<!--      aici punem harta-->
      <v-row>
        <v-col cols="12">
          <div id="map" style="height: 1000px; width: 100vw"></div>
        </v-col>
      </v-row>
<!--      host information-->
      <v-row>
        <v-col class="v-col-md-7 v-col-xs-12 v-col-sm-12" cols="6">
          <host-information-card></host-information-card>
        </v-col>
        <!--      contact info for host-->
        <v-col class="v-col-md-5 v-col-xs-12 v-col-sm-12" cols="6">
          <host-contact-info></host-contact-info>
        </v-col>
      </v-row>
      <v-divider class="py-4"></v-divider>
<!--      reviews: conditionally render only if it has reviews-->
      <v-row justify="center" align-content="center">
        <v-col cols="12">
        <div class="pa-5">
          <rating-component></rating-component>
        </div>
        </v-col>
      </v-row>

    </v-responsive>
  </v-container>
</template>

<script>
import {useCabinsStore} from "@/store/cabins";
// todo add leaflet map without geocoder
// lightgallery
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import Lightgallery from "lightgallery/vue";
import FacilitiesTourist from "@/components/FacilitiesTourist";
import HostInformationCard from "@/components/HostInformationCard";
import HostContactInfo from "@/components/HostContactInfo";
import ReserveCard from "@/components/ReserveCard";
import RatingComponent from "@/components/RatingComponent";

export default {
  name: "CabinDetails",
  components: {
    RatingComponent,
    ReserveCard, HostContactInfo, HostInformationCard, FacilitiesTourist, Lightgallery},
  data() {
    return {
      cabin_id: null,
      rating: 0,
      lightGallerySettings: {
        plugins: [lgThumbnail, lgZoom],
        speed: 500,
        thumbnail: true,
        autoplayFirstVideo: false,
        pager: false,
        allowMediaOverlap: false,
        toggleThumb: true,
        mobileSettings: {
          controls: false,
          showCloseIcon: false,
          download: false,
          rotate: false
        }
      },
      images: [
        "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
        "https://picsum.photos/350/165?random"
      ],

      // map data
      marker: null,
      map: null,
    }
  },
  setup() {
    let cabinStore = useCabinsStore()
    return {cabinStore}
  },
  methods: {
    onInit: () => {
      console.log('lightGallery has been initialized');
    },
    onBeforeSlide: () => {
      console.log('calling before slide');
    },
    updateMap() {
      console.log("Mounted cabin details, latitude is ", this.cabinStore.currentCabin.latitude, " longitude is ", this.cabinStore.currentCabin.longitude)
      let map = this.map = L.map('map').setView([this.cabinStore.currentCabin.latitude, this.cabinStore.currentCabin.longitude], 18)
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);
      // place marker at location of cabin
      this.marker = L.marker([this.cabinStore.currentCabin.latitude, this.cabinStore.currentCabin.longitude]).addTo(map);
    }
  },
  async created() {
    console.log("Created cabin details")
    this.cabin_id = this.$route.params.cabin_id // extract params from route
    await this.cabinStore.getCabinById(this.cabin_id)  // fetches currentCabin in store
    await this.updateMap()
  },
}
</script>

<style lang="css">
@import 'lightgallery/css/lightgallery.css';
@import 'lightgallery/css/lg-thumbnail.css';
@import 'lightgallery/css/lg-zoom.css';

.reserve-card-sticky {
  position: fixed !important;
  right: 10%;
}

.invisible-gallery-item {
  width: 0;
  height: 0;
  display: none;
  visibility: hidden;
}

.gallery-item {
  height: 200px;
  padding: 5px;
  display: flex;
}


.card-style {
  background-color: aliceblue !important;
}

/*
 *  STYLE 5
 */

.scroll-style-5::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #F5F5F5;
}

.scroll-style-5::-webkit-scrollbar {
  width: 12px;
  background-color: #F5F5F5;
}

.scroll-style-5::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
  background-color: #555;
}

</style>
