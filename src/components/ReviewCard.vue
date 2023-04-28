<template>
  <v-card>
    <v-list-item class="w-100 mt-5">
      <template v-slot:prepend>
        <v-avatar
          color="grey-darken-3"
          image="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
        ></v-avatar>
      </template>
      <v-list-item-title>Evan You</v-list-item-title>
      <v-list-item-subtitle>5.0</v-list-item-subtitle>
    </v-list-item>
    <v-card-text>Property Name</v-card-text>
    <v-card-text>DD-MM-YYYY</v-card-text>
    <v-card-text>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
      been the
      industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
      and
      scrambled it to make a type specimen book.
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "ReviewCard"
}
</script>

<style scoped>

</style>
