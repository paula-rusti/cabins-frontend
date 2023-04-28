<template>
  <v-card>
    <v-list-item class="w-100 mt-5">
      <template v-slot:prepend>
        <v-avatar
          color="grey-darken-3"
          image="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
        ></v-avatar>
      </template>
      <v-list-item-title>{{this.ownerName}}</v-list-item-title>
      <v-list-item-subtitle>{{this.grade}}</v-list-item-subtitle>
    </v-list-item>
    <v-card-text>{{this.propertyName}}</v-card-text>
    <v-card-text>{{this.date}}</v-card-text>
    <v-card-text>{{this.content}}</v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "ReviewCard",
  props: {
    ownerName: {
      type: String,
      required: true
    },
    ownerAvatar: {
      type: String,
      required: false,
      // eslint-disable-next-line no-unused-vars
      validator (value) {
        // should validate that value is a valid photo url
        // if url is not valid apply placeholder profile pic
        return true
      }
    },
    propertyName: {
      type: String,
      required: true
    },
    grade: {
      type: Number,
      required: true,
      // eslint-disable-next-line no-unused-vars
      validator(value) {
        // should validate that value is one of 1, 2, 3, 4, 5
        return true
      }
    },
    content: {
      type: String,
      required: false,
    },
    date: {
      type: String,
      required: true,
      // eslint-disable-next-line no-unused-vars
      validator (value) {
        // should validate that value is a date in the format dd.mm.yyyy
        return true
      }
    }
  }
}
</script>

<style scoped>

</style>
