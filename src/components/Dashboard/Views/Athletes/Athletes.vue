<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">

        <div class="col-12">
          <card class="card-plain">
            <template slot="header">
              <router-link class="btn btn-primary btn-close float-right" :to="{ name: 'CreateAthlete' }">
                Nuevo
              </router-link>
              <h4 class="card-title">Jugadores</h4>
            </template>
            <div class="table-responsive">
              <l-table class="table-hover"
                       :columns="table1.columns"
                       :data="table1.data"
                       :redirectShow="'ShowAthlete'"
                       :redirectEdit="'EditAthlete'"
                       :deleteAction="'deleteAthlete'">
              </l-table>
            </div>
          </card>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
  import athleteTypes from '@/types/athlete';
  import { mapActions } from 'vuex';
  import LTable from 'src/components/UIComponents/Table.vue'
  import Card from 'src/components/UIComponents/Cards/Card.vue'
  const tableColumns = ['Nombre', 'Equipo']

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
        getAthletes: athleteTypes.actions.getAthletes
      }),
      gridData() {
        this.getAthletes()
          .then(athletes => {
            athletes.data.data.forEach(e => {
              let element = {
                'id': e.id,
                'nombre': e["Id User"].FirstName + " " + e["Id User"].LastName,
                'equipo': e["Athlete Team"].TeamName
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
