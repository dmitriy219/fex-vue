import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import ObjectView from './views/ObjectView.vue'
import PersonalAreaView from './views/PersonalAreaView.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/object/:id',
      name: 'object',
      component: ObjectView
    },
    {
      path: '/personal',
      name: 'PersonalArea',
      component: PersonalAreaView
    }
  ]
})
