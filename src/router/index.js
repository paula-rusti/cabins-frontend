// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
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

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
