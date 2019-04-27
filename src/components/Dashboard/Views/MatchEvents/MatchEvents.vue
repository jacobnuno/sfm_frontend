<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">

        <div class="col-12">
          <card class="card-plain">
            <template slot="header">
              <router-link class="btn btn-primary btn-close float-right" :to="{ name: 'CreateMatchEvent' }">
                Nuevo
              </router-link>
              <h4 class="card-title">Evento Partido</h4>
            </template>
            <div class="table-responsive">
              <l-table class="table-hover"
                       :columns="table1.columns"
                       :data="table1.data"
                       :redirectShow="'ShowMatchEvent'"
                       :redirectEdit="'EditMatchEvent'"
                       :deleteAction="'deleteMatchEvent'">
              </l-table>
            </div>
          </card>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
  import matchEventTypes from '@/types/matchEvent';
  import { mapActions } from 'vuex';
  import LTable from 'src/components/UIComponents/Table.vue'
  import Card from 'src/components/UIComponents/Cards/Card.vue'
  const tableColumns = ['ID', 'Descripción']
   
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
        getMatchEvents: matchEventTypes.actions.getMatchEvents
      }),
      gridData() {
        this.getMatchEvents()
          .then(matchEvent => {
            matchEvent.data.data.forEach(e => {
              let element = { 
                'id': e.id, 
                'descripción': e.Description
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
