import Vue from 'vue'
//import VueRouter from 'vue-router'
import App from './App.vue'

// LightBootstrap plugin
import LightBootstrap from './light-bootstrap-main'

// router setup
import router from './routes/routes'
// plugin setup
//Vue.use(VueRouter)
Vue.use(LightBootstrap)

// configure router
/*
const router = new VueRouter({
  routes, // short for routes: routes
  linkActiveClass: 'nav-item active'
}) */

// vuex
import Vuex from 'vuex';
Vue.use(Vuex);

// blockui
import BlockUI from 'vue-blockui';
Vue.use(BlockUI);

// types and modules
import globalTypes from '@/types/global';
import authModule from '@/modules/auth';
import leagueModule from '@/modules/league';

// vee-validate
import es from 'vee-validate/dist/locale/es';
import VeeValidate, { Validator } from 'vee-validate';
Validator.localize('es', es);
Vue.use(VeeValidate, {
  locale: 'es',
  classes: true,
  classNames: {
    valid: "is-valid",
    invalid: "is-invalid"
  }
});

// global store of vuex
export const store = new Vuex.Store({
  state: {
    processing: false
  },
  actions: {

  },
  getters: {
    [globalTypes.getters.processing]: state => state.processing,
  }, 
  mutations: {
    [globalTypes.mutations.startProcessing] (state) {
      state.processing = true;
    },
    [globalTypes.mutations.stopProcessing] (state) {
      state.processing = false;
    }
  },
  modules: {
    authModule,
    leagueModule
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  store,
  router
})
