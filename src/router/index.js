// Composables
import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from "@/views/LandingPage.vue";
import LoginPage from "@/views/LoginPage.vue";
import RegisterPage from "@/views/RegisterPage.vue";
import TouristHomePage from "@/views/tourist/TouristHomePage.vue";
import CabinDetails from "@/views/tourist/CabinDetails.vue";
import ReviewsPage from "@/views/tourist/ReviewsPage.vue";
import ProfilePage from "@/views/tourist/ProfilePage.vue";
import BookingsPage from "@/views/tourist/BookingsPage.vue";

import ProfilePageOwner from "@/views/owner/ProfilePage.vue";
import BookingsPageOwner from "@/views/owner/BookingsPage.vue";
import CabinListPage from "@/views/owner/CabinListPage.vue";
import InsightPage from "@/views/owner/InsightPage.vue";
import AddPropertyPage from "@/views/owner/AddPropertyPage.vue";

const routes = [
  // TODO: remove home and refactor so that all pages which use landing layout to be under same parent
  {
    path: '/',
    component: () => import('@/layouts/LandingLayout'),
    children: [
      {
        path: '',
        name: 'Landing Page',
        component: () => LandingPage,
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/layouts/LandingLayout'),
    children: [
      {
        path: '',
        name: 'Login Page',
        props: true,
        component: () => LoginPage,
      }
    ]
  },
  {
    path: '/register',
    component: () => import('@/layouts/LandingLayout'),
    children: [
      {
        path: '',
        name: 'Register Page',
        props: true,
        component: () => RegisterPage,
      }
    ]
  },
  // all pages under tourist will use its parent layout
  {
    path: '/tourist/',
    component: () => import('@/layouts/TouristLayout'),
    children: [
      {
        path: '',
        name: 'Tourist Home Page',
        component: () => TouristHomePage,
      },
      {
        path: ':cabin_id',
        name: "Cabin Details",
        component: () => CabinDetails,
      },
      {
        path: 'reviews',
        name: "My Reviews",
        component: () => ReviewsPage
      },
      {
        path: 'profile',
        name: 'Tourist Profile Page',
        component: () => ProfilePage,
      },
      {
        path: 'bookings',
        name: 'Tourist Bookings Page',
        component: () => BookingsPage,
      }
    ]
  },
  // all pages under owner will use its parent layout
  {
    path: '/owner/',
    component: () => import('@/layouts/OwnerLayout'),
    children: [
      {
        path: '',
        name: 'Owner Home Page',
        component: () => CabinListPage,
      },
      {
        path: 'profile',
        name: 'Owner Profile Page',
        component: () => ProfilePageOwner,
      },
      {
        path: 'bookings',
        name: 'Owner Bookings Page',
        component: () => BookingsPageOwner,
      },
      {
        path: 'insight',
        name: 'Owner Insight Page',
        component: () => InsightPage,
      },
      {
        path: 'add-cabin',
        name: 'Owner Add Property Page',
        component: () => AddPropertyPage,
      }
    ]
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
