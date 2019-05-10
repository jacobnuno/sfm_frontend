import Vue from 'vue'
import App from './App.vue'

// LightBootstrap plugin
import LightBootstrap from './light-bootstrap-main'
Vue.use(LightBootstrap)

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
Vue.component('fai', FontAwesomeIcon);

// router setup
import router from './routes/routes'

// vuex
import Vuex from 'vuex';
Vue.use(Vuex);

// sweet alert
import VueSweetalert2 from 'vue-sweetalert2';
Vue.use(VueSweetalert2);

// blockui
import BlockUI from 'vue-blockui';
Vue.use(BlockUI);

// types and modules
import globalTypes from '@/types/global';
import authModule from '@/modules/auth';
import leagueModule from '@/modules/league';
import fieldModule from '@/modules/field';
import userTypeModule from '@/modules/userType';
import matchEventModule from '@/modules/matchEvent';
import complexModule from '@/modules/complex';
import matchDetailModule from '@/modules/matchDetail';

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
    leagueModule,
    fieldModule,
    userTypeModule,
    matchEventModule,
    complexModule,
    matchDetailModule
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  store,
  router
})
