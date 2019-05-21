<template>
  <div class="wrapper">
    <side-bar>
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link to="/admin/overview">
        <fai :icon="['fas', 'chart-pie']" class="icons" />
        <p>Dashboard</p>
      </sidebar-link>
      <!--
      <sidebar-link to="/admin/user">
        <i class="nc-icon nc-circle-09"></i>
        <p>User Profile</p>
      </sidebar-link>
      <sidebar-link to="/admin/table-list">
        <i class="nc-icon nc-notes"></i>
        <p>Table list</p>
      </sidebar-link>
      <sidebar-link to="/admin/typography">
        <i class="nc-icon nc-paper-2"></i>
        <p>Typography</p>
      </sidebar-link>
      <sidebar-link to="/admin/icons">
        <i class="nc-icon nc-atom"></i>
        <p>Icons</p>
      </sidebar-link>
      <sidebar-link to="/admin/maps">
        <i class="nc-icon nc-pin-3"></i>
        <p>Maps</p>
      </sidebar-link>
      <sidebar-link to="/admin/notifications">
        <i class="nc-icon nc-bell-55"></i>
        <p>Notifications</p>
      </sidebar-link>
      <sidebar-link to="personal">
        <i class="nc-icon nc-single-02"></i>
        <p>Personal</p>
      </sidebar-link>
      <sidebar-link to="/teams">
        <i class="nc-icon nc-planet"></i>
        <p>Equipos</p>
      </sidebar-link>
      -->
      <sidebar-link to="tournaments">
        <fai :icon="['fas', 'exchange-alt']" class="icons" />
        <p>Torneos</p>
      </sidebar-link>
      <sidebar-link to="fields">
        <fai :icon="['fas', 'square']" class="icons" />
        <p>Canchas</p>
      </sidebar-link>
      <sidebar-link to="leagues">
        <fai :icon="['far', 'futbol']" class="icons" />
        <p>Ligas</p>
      </sidebar-link>
      <sidebar-link to="teams">
        <fai :icon="['fas', 'clipboard-list']" class="icons" />
        <p>Equipos</p>
      </sidebar-link>
      <sidebar-link to="complexes">
        <fai :icon="['far', 'compass']" class="icons" />
        <p>Unidades</p>
      </sidebar-link>
      <sidebar-link to="user-types">
        <fai :icon="['fas', 'cubes']" class="icons" />
        <p>Tipos de Usuario</p>
      </sidebar-link>
      <sidebar-link to="users">
        <fai :icon="['fas', 'users']" class="icons" />
        <p>Usuarios</p>
      </sidebar-link>
      <sidebar-link to="athletes">
        <fai :icon="['fas', 'walking']" class="icons athletes" />
        <p>Jugadores</p>
      </sidebar-link>
      <sidebar-link to="matches">
        <fai :icon="['fas', 'calendar']" class="icons" />
        <p>Partidos</p>
      </sidebar-link>
      <sidebar-link to="match-events">
        <fai :icon="['fas', 'stopwatch']" class="icons" />
        <p>Eventos Partidos</p>
      </sidebar-link>
      <!--
      <sidebar-link to="/documents">
        <i class="nc-icon nc-badge"></i>
        <p>Documentos</p>
      </sidebar-link>
      <sidebar-link to="/stats">
        <i class="nc-icon nc-chart-bar-32"></i>
        <p>Estadísticas</p>
      </sidebar-link>
      -->
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click="toggleSidebar">

      </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .icons {
    font-size: 2.2em;
    padding-right: .2em;
    line-height: 2.3em;
  }
  .athletes {
    font-size: 2.9em;
  }
</style>

<script>
  import { library } from '@fortawesome/fontawesome-svg-core'
  import { faFutbol } from '@fortawesome/fontawesome-free-regular'
  import { faUsers, faWalking, faStopwatch, faCubes, faClipboardList, faCalendar, faChartPie, faSquare, faExchangeAlt } from '@fortawesome/fontawesome-free-solid'
  import { faCompass } from '@fortawesome/fontawesome-free-regular'
  library.add(faUsers)
  library.add(faFutbol)
  library.add(faCompass)
  library.add(faWalking)
  library.add(faStopwatch)
  library.add(faCubes)
  library.add(faClipboardList)
  library.add(faCalendar)
  library.add(faChartPie)
  library.add(faSquare)
  library.add(faExchangeAlt)

  import TopNavbar from './TopNavbar.vue'
  import ContentFooter from './ContentFooter.vue'
  import DashboardContent from './Content.vue'
  import MobileMenu from './MobileMenu.vue'
  export default {
    components: {
      TopNavbar,
      ContentFooter,
      DashboardContent,
      MobileMenu
    },
    methods: {
      toggleSidebar () {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false)
        }
      }
    }
  }

</script>
