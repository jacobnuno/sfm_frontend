<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">

        <div class="col-12">
          <card class="card-plain">
            <template slot="header">
              <router-link class="btn btn-primary btn-close float-right" :to="{ name: 'CreateMatch' }">
                Nuevo
              </router-link>
              <h4 class="card-title">Partidos</h4>
            </template>
            <div class="table-responsive">
              <l-table class="table-hover"
                       :columns="table1.columns"
                       :data="table1.data"
                       :redirectShow="'ShowMatch'"
                       :redirectEdit="'EditMatch'"
                       :deleteAction="'deleteMatch'">
              </l-table>
            </div>
          </card>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
  import matchTypes from '@/types/match';
  //import matchDetailTypes from '@/types/matchDetail';
  import { mapActions } from 'vuex';
  import LTable from 'src/components/UIComponents/Table.vue'
  import Card from 'src/components/UIComponents/Cards/Card.vue'
  const tableColumns = ['ID', 'Liga', 'Local', 'Visitante', 'Resultado']

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
        matchDetails: {},
        error: null
      }
    },
    methods: {
      ...mapActions({
        getMatches: matchTypes.actions.getMatches,
        //getMatchDetails: matchDetailTypes.actions.getMatchDetails
      }),
      gridData() {
        this.getMatches()
          .then(matches => {
            console.log(matches)
            matches.data.data.forEach(e => {
              
              let element = {
                'id': e.id,
                'liga': e.IdLeague.LeagueName,
                'local': e.IdLocal.TeamName,
                'visitante': e.IdGuest.TeamName,
                'resultado': ''
              }
              this.table1.data.push(element)
            });
          })
      },/*
      populateMatchDetails() {
        this.getMatchDetails()
          .then(matchDetails => {
            console.log(matchDetails)
            matchDetails.data.data.forEach(e => {
              let element = { 
                'evento': e.MatchDetailName, 
                'minuto ocurrido': e.Time, 
                'jugador': this.date(e.EndDate),
                'equipo': e["Complex Detail"].ComplexName
              }
              this.table1.data.push(element)
            });
          })
      }*/
    },
    mounted() {
      //this.populateMatchDetails()
      this.gridData()
    },
  }
</script>

<style>
</style>
