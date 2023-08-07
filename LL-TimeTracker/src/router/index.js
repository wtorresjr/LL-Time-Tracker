import { createRouter, createWebHistory } from 'vue-router'
import UserOptions from '../views/UserOptions.vue'
import Login from '../components/login.vue'
import ReqAuth from '../views/LoginRequired.vue'

import store from '../store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: Login },
    { path: '/user-options', component: UserOptions, meta: { requiresAuth: true } },
    { path: '/req-auth', component: ReqAuth }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (store.state.isAuthenticated) {
      next() // Allow access to the route
    } else {
      // Redirect to login if not authenticated
      next('/req-auth')
    }
  } else {
    next() // Allow access to non-protected routes
  }
})

export default router
