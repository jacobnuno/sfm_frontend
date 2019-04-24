import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);

import leagueTypes from '@/types/league'
import authTypes from '@/types/auth'
import globalTypes from '@/types/global'
import { store } from '@/main'

import DashboardLayout from '../components/Dashboard/Layout/DashboardLayout.vue'

// GeneralViews
import NotFound from '../components/GeneralViews/NotFoundPage.vue'
import Login from '../components/GeneralViews/Login.vue'
import Registration from '../components/GeneralViews/Registration.vue'

// Personal
import Personal from 'src/components/Dashboard/Views/Personal.vue'

// Admin pages
import Overview from 'src/components/Dashboard/Views/Overview.vue'
import UserProfile from 'src/components/Dashboard/Views/UserProfile.vue'
import TableList from 'src/components/Dashboard/Views/TableList.vue'
import Typography from 'src/components/Dashboard/Views/Typography.vue'
import Icons from 'src/components/Dashboard/Views/Icons.vue'
import Maps from 'src/components/Dashboard/Views/Maps.vue'
import Notifications from 'src/components/Dashboard/Views/Notifications.vue'

// Leagues
import League from '@/components/Dashboard/Views/Leagues/League.vue'
import CreateLeague from '@/components/Dashboard/Views/Leagues/CreateLeague.vue'
import ShowLeague from '@/components/Dashboard/Views/Leagues/ShowLeague.vue'

// Guards

// Guard to auth user
var registerGuard = (to, from, next) => {
  if (!store.state.authModule.logged) {
    next({
      name: 'login'
    })
  } else {
    next()
  }
}

const router = new Router({
  routes: [
    {
      path: '/',
      component: DashboardLayout,
      redirect: '/admin/overview'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Registration
    },
    {
      path: '/admin',
      component: DashboardLayout,
      redirect: '/admin/overview',
      children: [
        {
          path: 'overview',
          name: 'Overview',
          component: Overview
        },
        {
          path: 'user',
          name: 'User',
          component: UserProfile
        },
        {
          path: 'table-list',
          name: 'Table List',
          component: TableList
        },
        {
          path: 'typography',
          name: 'Typography',
          component: Typography
        },
        {
          path: 'icons',
          name: 'Icons',
          component: Icons
        },
        {
          path: 'maps',
          name: 'Maps',
          component: Maps
        },
        {
          path: 'notifications',
          name: 'Notifications',
          component: Notifications
        },
        {
          path: 'personal',
          name: 'Personal',
          component: Personal,
          /*beforeEnter: registerGuard*/
        },
        {
          path: 'leagues',
          name: 'Leagues',
          component: League,
          /*beforeEnter: registerGuard*/
        },
        {
          path: 'create-league',
          name: 'createLeague',
          component: CreateLeague,
          /*beforeEnter: registerGuard*/
        },
        {
          path: 'show-league',
          name: 'ShowLeague',
          component: ShowLeague,
          /*beforeEnter: registerGuard*/
        }
      ]
    },
    { path: '*', component: NotFound }
  ],
  linkActiveClass: 'nav-item active'
})
/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default router
