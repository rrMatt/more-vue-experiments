import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import UsersPage from '@/components/UsersPage'
import AboutPage from '@/components/AboutPage'
import EventsPage from '@/components/EventsPage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomePage
    },
    {
      path: '/users',
      name: 'UsersCrud',
      component: UsersPage
    },
    {
      path: '/about',
      name: 'About',
      component: AboutPage
    },
    {
      path: '/events',
      name: 'Events',
      component: EventsPage
    }
  ]
})
