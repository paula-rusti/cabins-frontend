<template>
  <v-card>
    <v-list-item class="w-100 mt-5">
      <template v-slot:prepend>
        <v-avatar
          size="100"
          color="grey-darken-3"
          image="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
        ></v-avatar>
      </template>
      <v-list-item-title class="text-h5">Paula Rusti</v-list-item-title>
      <v-list-item-subtitle class="font-weight-bold">{{userType}}</v-list-item-subtitle>
      <v-list-item-subtitle class="font-italic">Joined 15.10.2020</v-list-item-subtitle>
    </v-list-item>
    <v-card-text>Description .... </v-card-text>

  </v-card>
</template>
<script>
export default {
  name: "ProfileCard",
  props: {
    userType: {
      required: true,
      type: String,
      validator(value) {
        return (value === 'Tourist' || value === 'Owner')
      }
    }
  }
}
</script>

<style scoped>

</style>
