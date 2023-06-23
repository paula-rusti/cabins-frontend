// Utilities
import {defineStore} from "pinia";
import UserApiClient from "@/services/UserApiClient";

export const useUserStore = defineStore("user", {
  state: () => ({
    isLoggedIn: false,
    userDetails: null,
    jwt: null,
  }),
  actions: {
    async registerUser(userDetails) {
      console.log("registering user", userDetails);
      await UserApiClient.registerUser(userDetails)
    }
  }
});
