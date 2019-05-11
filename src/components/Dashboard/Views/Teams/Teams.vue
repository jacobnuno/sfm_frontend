<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">

        <div class="col-12">
          <card class="card-plain">
            <template slot="header">
              <router-link class="btn btn-primary btn-close float-right" :to="{ name: 'CreateTeam' }">
                Nuevo
              </router-link>
              <h4 class="card-title">Equipos</h4>
            </template>
            <div class="table-responsive">
              <l-table class="table-hover"
                       :columns="table1.columns"
                       :data="table1.data"
                       :redirectShow="'ShowTeam'"
                       :redirectEdit="'EditTeam'"
                       :deleteAction="'deleteTeam'">
              </l-table>
            </div>
          </card>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
  import teamTypes from '@/types/team';
  import { mapActions } from 'vuex';
  import LTable from 'src/components/UIComponents/Table.vue'
  import Card from 'src/components/UIComponents/Cards/Card.vue'
  const tableColumns = ['ID', 'Nombre', 'Liga']

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
        getTeams: teamTypes.actions.getTeams
      }),
      gridData() {
        this.getTeams()
          .then(teams => {
            teams.data.data.forEach(e => {
              let element = {
                'id': e.id,
                'nombre': e.TeamName,
                'liga': e["League Detail"].LeagueName
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
