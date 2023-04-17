<template>
  <v-container>
    <v-responsive class="d-flex fill-height">
      <v-row>
        <v-col cols="12">
          <h1>{{this.currentCabin.name}}</h1>
        </v-col>
        <v-col cols="12">
          <h4>
            <v-icon icon="mdi-map-marker"></v-icon>
            {{this.currentCabin.location}}
          </h4>
        </v-col>
        <v-col class="v-col-md-6 v-col-sm-12 v-col-xs-12" cols="12">
          <v-icon icon="mdi-star"></v-icon>
          Rating: {{this.rating}}
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
        <v-col cols="12">
          <p>Description: {{this.currentCabin.description}}</p>
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
                  v-for="(item, i) in [{ title: 'Rooms', icon: 'mdi-sofa', value: 3 },
                                        { title: 'Bathrooms', icon: 'mdi-shower-head', value: 3 },
                                        { title: 'Beds', icon: 'mdi-bed', value: 3 },
                                        { title: 'Fits', icon: 'mdi-account', value: 3 }
                                      ]"
                  :key="i"
                  :value="item"
                  active-color="primary"
                >
                  <template v-slot:prepend>
                    <v-icon :icon="item.icon"></v-icon>
                  </template>

                  <v-list-item-title
                    v-text="`${item.title}: ${item.value}`">
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
<!--        facilities-->
          <v-col class="v-col-md-4 v-col-sm-12 v-col-xs-12" cols="12">
            <facilities-tourist></facilities-tourist>
          </v-col>

        </v-row>
      </v-row>
      <!--        book  now-->
      <v-row>
        <v-col class="v-col-md-4 v-col-sm-12 v-col-xs-12" cols="12">
          <div class="pa-4">
            <reserve-card :price="this.currentCabin.price"></reserve-card>
          </div>
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
<!--      reviews-->
      <v-row>
        <v-col cols="12">
          <v-row>
            <v-col cols="12">
              <div class="pa-4">
                <p>
                  <v-icon class="pr-5" icon="mdi-star" size="35px"></v-icon>
                  <span class="pr-3 font-weight-bold">5.0</span>
                  <span class="pr-2">10</span>
                  <span>reviews</span>
                </p>
              </div>
            </v-col>
          </v-row>
<!--          v-if has reviews-->
          <v-row>
            <v-col>
              <div class="pa-4">
                <review-card></review-card>
              </div>
            </v-col>
            <v-col>
<!--              will navigate to a page dedicated to reviews-->
              <v-btn>See all reviews</v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

    </v-responsive>
  </v-container>
</template>

<script>
import {useCabinsStore} from "@/store/cabins";
import {mapState} from "pinia";

// lightgallery
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import Lightgallery from "lightgallery/vue";
import FacilitiesTourist from "@/components/FacilitiesTourist";
import HostInformationCard from "@/components/HostInformationCard";
import HostContactInfo from "@/components/HostContactInfo";
import ReviewCard from "@/components/ReviewCard";
import ReserveCard from "@/components/ReserveCard";

export default {
  name: "CabinDetails",
  components: {ReserveCard, ReviewCard, HostContactInfo, HostInformationCard, FacilitiesTourist, Lightgallery},
  props: {
    cabin_id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
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
      currCabin: {}
    }
  },
  computed: {
    ...mapState(useCabinsStore, ['cabins']),
    currentCabin() {
      let c_id = Number.parseInt(this.cabin_id)
      for (let cabin of this.cabins) {
        if (cabin.id === c_id) {
          return cabin
        }
      }
      return {}
    }
  },
  methods: {
    onInit: () => {
      console.log('lightGallery has been initialized');
    },
    onBeforeSlide: () => {
      console.log('calling before slide');
    }
  },
  created() {
    let c_id = Number.parseInt(this.cabin_id)
    for (let cabin of this.cabins) {
      if (cabin.id === c_id) {
        this.currCabin = cabin
      }
    }
  }
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
