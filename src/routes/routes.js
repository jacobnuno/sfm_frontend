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
import EditLeague from '@/components/Dashboard/Views/Leagues/EditLeague.vue'

// Fields
import Fields from '@/components/Dashboard/Views/Fields/Fields.vue'
import CreateField from '@/components/Dashboard/Views/Fields/CreateField.vue'
import ShowField from '@/components/Dashboard/Views/Fields/ShowField.vue'
import EditField from '@/components/Dashboard/Views/Fields/EditField.vue'

// User Types
import UserTypes from '@/components/Dashboard/Views/UserTypes/UserTypes.vue'
import CreateUserType from '@/components/Dashboard/Views/UserTypes/CreateUserType.vue'
import ShowUserType from '@/components/Dashboard/Views/UserTypes/ShowUserType.vue'
import EditUserType from '@/components/Dashboard/Views/UserTypes/EditUserType.vue'

// Match Event
import MatchEvents from '@/components/Dashboard/Views/MatchEvents/MatchEvents.vue'
import CreateMatchEvent from '@/components/Dashboard/Views/MatchEvents/CreateMatchEvent.vue'
import ShowMatchEvent from '@/components/Dashboard/Views/MatchEvents/ShowMatchEvent.vue'
import EditMatchEvent from '@/components/Dashboard/Views/MatchEvents/EditMatchEvent.vue'

// Complex
import Complexes from '@/components/Dashboard/Views/Complexes/Complexes.vue'
import CreateComplex from '@/components/Dashboard/Views/Complexes/CreateComplex.vue'
import ShowComplex from '@/components/Dashboard/Views/Complexes/ShowComplex.vue'
import EditComplex from '@/components/Dashboard/Views/Complexes/EditComplex.vue'

// Match Detail
import MatchDetails from '@/components/Dashboard/Views/MatchDetails/MatchDetails.vue'
import CreateMatchDetail from '@/components/Dashboard/Views/MatchDetails/CreateMatchDetail.vue'
import ShowMatchDetail from '@/components/Dashboard/Views/MatchDetails/ShowMatchDetail.vue'
import EditMatchDetail from '@/components/Dashboard/Views/MatchDetails/EditMatchDetail.vue'

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
          name: 'CreateLeague',
          component: CreateLeague,
          /*beforeEnter: registerGuard*/
        },
        {
          path: 'show-league',
          name: 'ShowLeague',
          component: ShowLeague,
          /*beforeEnter: registerGuard*/
        },
        {
          path: 'edit-league',
          name: 'EditLeague',
          component: EditLeague,
          /*beforeEnter: registerGuard*/
        },
        {
          path: 'fields',
          name: 'Fields',
          component: Fields,
          /*beforeEnter: registerGuard*/
        },
        {
          path: 'create-field',
          name: 'CreateField',
          component: CreateField,
          /*beforeEnter: registerGuard*/
        },
        {
          path: 'show-field',
          name: 'ShowField',
          component: ShowField,
          /*beforeEnter: registerGuard*/
        },
        {
          path: 'edit-field',
          name: 'EditField',
          component: EditField,
          /*beforeEnter: registerGuard*/
        },
        {
          path: 'user-types',
          name: 'UserTypes',
          component: UserTypes,
          /*beforeEnter: registerGuard*/
        },
        {
          path: 'create-user-type',
          name: 'CreateUserType',
          component: CreateUserType,
          /*beforeEnter: registerGuard*/
        },
        {
          path: 'show-user-type',
          name: 'ShowUserType',
          component: ShowUserType,
          /*beforeEnter: registerGuard*/
        },
        {
          path: 'edit-user-type',
          name: 'EditUserType',
          component: EditUserType,
          /*beforeEnter: registerGuard*/
        },
        {
          path: 'match-events',
          name: 'MatchEvents',
          component: MatchEvents,
          /*beforeEnter: registerGuard*/
        },
        {
          path: 'create-match-event',
          name: 'CreateMatchEvent',
          component: CreateMatchEvent,
          /*beforeEnter: registerGuard*/
        },
        {
          path: 'show-match-event',
          name: 'ShowMatchEvent',
          component: ShowMatchEvent,
          /*beforeEnter: registerGuard*/
        },
        {
          path: 'edit-match-event',
          name: 'EditMatchEvent',
          component: EditMatchEvent,
          /*beforeEnter: registerGuard*/
        },
        {
          path: 'complexes',
          name: 'Complexes',
          component: Complexes,
          /*beforeEnter: registerGuard*/
        },
        {
          path: 'create-complex',
          name: 'CreateComplex',
          component: CreateComplex,
          /*beforeEnter: registerGuard*/
        },
        {
          path: 'show-complex',
          name: 'ShowComplex',
          component: ShowComplex,
          /*beforeEnter: registerGuard*/
        },
        {
          path: 'edit-complex',
          name: 'EditComplex',
          component: EditComplex,
          /*beforeEnter: registerGuard*/
        },
        {
          path: 'match-details',
          name: 'MatchDetails',
          component: MatchDetails,
          /*beforeEnter: registerGuard*/
        },
        {
          path: 'create-match-detail',
          name: 'CreateMatchDetail',
          component: CreateMatchDetail,
          /*beforeEnter: registerGuard*/
        },
        {
          path: 'show-match-detail',
          name: 'ShowMatchDetail',
          component: ShowMatchDetail,
          /*beforeEnter: registerGuard*/
        },
        {
          path: 'edit-match-detail',
          name: 'EditMatchDetail',
          component: EditMatchDetail,
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
