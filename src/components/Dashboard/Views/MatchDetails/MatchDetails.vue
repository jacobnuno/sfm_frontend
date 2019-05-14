<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">

        <div class="col-12">
          <card class="card-plain">
            <template slot="header">
              <router-link class="btn btn-primary btn-close float-right" :to="{ name: 'CreateMatchDetail' }">
                Nuevo
              </router-link>
              <h4 class="card-title">Eventos del Partido</h4>
            </template>
            <div class="table-responsive">
              <l-table class="table-hover"
                       :columns="table1.columns"
                       :data="table1.data"
                       :redirectShow="'ShowMatchDetail'"
                       :redirectEdit="'EditMatchDetail'"
                       :deleteAction="'deleteMatchDetail'">
              </l-table>
            </div>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import matchDetailTypes from '@/types/matchDetail';
  import { mapActions } from 'vuex';
  import LTable from 'src/components/UIComponents/Table.vue'
  import Card from 'src/components/UIComponents/Cards/Card.vue'
  const tableColumns = ['Evento', 'Minuto Ocurrido', 'Jugador', 'Equipo']

  export default {
    components: {
      LTable,
      Card
    },
    data () {
      return {
        table1: {
          columns: [...tableColumns],
          data: [],
        },
        error: null
      }
    }, 
    methods: {
      ...mapActions({
        getMatchDetails: matchDetailTypes.actions.getMatchDetails
      }),
      returnArray(obj) {
        let myArr = [];
        Object.keys(obj).map(function(key) {
          myArr.push([Number(key), obj[key]]);
        });
        return myArr;
      },
      date(value) {
        return value.split('T')[0];
      },
      gridData() {
        this.getMatchDetails()
          .then(matchDetails => {
            console.log(matchDetails)
            matchDetails.data.data.forEach(e => {
              let element = { 
                'id': e.id,
                'evento': e.MatchDetailName, 
                'minuto ocurrido': e.Time, 
                'jugador': this.date(e.EndDate),
                'equipo': e["Complex Detail"].ComplexName
              }
              this.table1.data.push(element)
            });
            
            //this.$set(this.table1, 'data', leagues.data.data);
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
