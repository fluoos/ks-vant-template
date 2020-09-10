import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomeRouter from '../views/HomeRouter.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/home',
    meta: { keepAlive: false }
  },
  {
    path: '/home',
    name: 'home',
    redirect: '/home/first',
    component: HomeRouter,
    children: [
      {
        path: 'first',
        name: 'first',
        component: () => import(/* webpackChunkName: "home" */ '../views/HomeFirst.vue'),
        meta: { keepAlive: true }
      },
      {
        path: 'my',
        name: 'my',
        component: () => import(/* webpackChunkName: "home" */ '../views/HomeMy.vue'),
        meta: { keepAlive: true }
      }
    ],
    meta: { keepAlive: true }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/HomeMy.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
