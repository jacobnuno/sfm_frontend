<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">

        <div class="col-12">
          <card class="card-plain">
            <template slot="header">
              <router-link class="btn btn-primary btn-close float-right" :to="{ name: 'CreateTournament' }">
                Nuevo
              </router-link>
              <h4 class="card-title">Torneos</h4>
            </template>
            <div class="table-responsive">
              <l-table class="table-hover"
                       :columns="table1.columns"
                       :data="table1.data"
                       :redirectShow="'ShowTournament'"
                       :redirectEdit="'EditTournament'"
                       :deleteAction="'deleteTournament'">
              </l-table>
            </div>
          </card>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
  import tournamentTypes from '@/types/tournament';
  import { mapActions, mapState } from 'vuex';
  import LTable from 'src/components/UIComponents/TableTournamnets.vue'
  import Card from 'src/components/UIComponents/Cards/Card.vue'
  const tableColumns = ['Nombre', 'Liga']

  export default {
    components: {
      LTable,
      Card
    },
    data () {
      return {
        table1: {
          columns: [...tableColumns],
          data: []
        },
        error: null
      }
    },
    methods: {
      ...mapActions({
        getTournaments: tournamentTypes.actions.getTournaments
      }),
      gridData() {
        this.getTournaments()
          .then(tournaments => {
            tournaments.data.data.forEach(e => {
              let element = {
                'id': e.id,
                'nombre': e.Name,
                'liga': e.idLeague.LeagueName,
                'jornada': e.Season,
                'fase': e.Phase
              }
              this.table1.data.push(element)
            });
          })
      }
    },
    mounted() {
        this.gridData()
    },
  }
</script>

<style>
</style>
