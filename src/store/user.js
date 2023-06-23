// Utilities
import {defineStore} from "pinia";
import UserApiClient from "@/services/UserApiClient";

export const useUserStore = defineStore("user", {
  state: () => ({
    isLoggedIn: false,
    userDetails: null,
    access_token: null,
    refresh_token: null,
  }),
  getters: {
    userRole: (state) => state.userDetails?.properties?.role,
  },
  actions: {
    async fetchUserDetails() {
      this.userDetails = await UserApiClient.fetchUserDetails(this.access_token);
    },
    async registerUser(userDetails) {
      console.log("registering user", userDetails);
      await UserApiClient.registerUser(userDetails)
    },
    async loginUser({email, password, role}) {
      let response = await UserApiClient.loginUser(email, password, role);
      this.isLoggedIn = true;
      this.access_token = response.access_token;
      this.refresh_token = response.refresh_token;
      await this.fetchUserDetails();
      await this.saveToWebstorage();
    },
    async logoutUser() {
      this.isLoggedIn = false;
      this.access_token = null;
      this.refresh_token = null;
      this.userDetails = null;
      await this.deleteWebStorage();
    },
    async saveToWebstorage() {
      localStorage.setItem("access_token", this.access_token);
      localStorage.setItem("refresh_token", this.refresh_token);
      localStorage.setItem("userDetails", JSON.stringify(this.userDetails));
    },
    async deleteWebStorage() {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("userDetails");
    },
    async loadFromWebstorage() {
      this.access_token = localStorage.getItem("access_token");
      this.refresh_token = localStorage.getItem("refresh_token");
      this.userDetails = JSON.parse(localStorage.getItem("userDetails"));
      if (this.access_token && this.refresh_token && this.userDetails) {
        this.isLoggedIn = true;
      }
    }
  }
});
