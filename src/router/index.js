// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  // TODO: remove home and refactor so that all pages which use landing layout to be under same parent
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '', // kept just as demo fot the default layouts and views
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      }
    ],
  },
  {
    path: '/landing',
    component: () => import('@/layouts/LandingLayout'),
    children: [
      {
        path: '',
        name: 'Landing Page',
        component: () => import(/* webpackChunkName: "home" */ '@/views/LandingPage.vue'),
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
        component: () => import(/* webpackChunkName: "home" */ '@/views/LoginPage.vue'),
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
        component: () => import(/* webpackChunkName: "home" */ '@/views/RegisterPage.vue'),
      }
    ]
  },
  // all pages under tourist will use its parent layout
  {
    path: '/tourist',
    component: () => import('@/layouts/TouristLayout'),
    children: [
      {
        path: '',
        name: 'Tourist Home Page',
        component: () => import(/* webpackChunkName: "home" */ '@/views/tourist/TouristHomePage.vue'),
      }
    ]
  },
  // all pages under owner will use its parent layout
  {
    path: '/owner',
    component: () => import('@/layouts/OwnerLayout'),
    children: [
      {
        path: '',
        name: 'Owner Home Page',
        component: () => import(/* webpackChunkName: "home" */ '@/views/owner/OwnerHomePage.vue'),
      }
    ]
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
