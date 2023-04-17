<template>
  <v-card variant="flat">
    <v-card-title style="font-size: 20px !important;">Host Information</v-card-title>
    <v-row class="mt-1">
      <v-col class="v-col-lg-2 v-col-md-2 v-col-xs-6 v-col-sm-6" cols="6">
        <v-avatar
          size="80px"
        >
          <v-img
            alt="Avatar"
            src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
          ></v-img>
        </v-avatar>
      </v-col>
      <v-col class="v-col-lg-2 v-col-md-3 v-col-xs-6 v-col-sm-6" cols="6">
        <v-card-text style="font-size: 20px !important; padding-top: 0">Darth Vader</v-card-text>
        <v-card-text class="pt-0" style="font-size: 15px !important;">Joined in July 2020</v-card-text>
      </v-col>
      <v-col class="v-col-lg-4 v-col-md-4 v-col-xs-12 v-col-sm-12" cols="12">
        <div>
          <v-icon icon="mdi-shield-check"></v-icon>
          Identity Verified
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="10">
        <v-card-text style="font-size: 18px !important;">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
          industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
          and
          scrambled it to make a type specimen book.
        </v-card-text>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "HostInformationCard"
}
</script>

<style scoped>

</style>
