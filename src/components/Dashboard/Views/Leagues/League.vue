<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">

        <div class="col-12">
          <card class="card-plain">
            <template slot="header">
              <router-link class="btn btn-primary btn-close float-right" :to="{ name: 'CreateLeague' }">
                Nuevo
              </router-link>
              <h4 class="card-title">Ligas</h4>
            </template>
            <div class="table-responsive">
              <l-table class="table-hover"
                       :columns="table1.columns"
                       :data="table1.data"
                       :redirectShow="'ShowLeague'"
                       :redirectEdit="'EditLeague'"
                       :deleteAction="'deleteLeague'">
              </l-table>
            </div>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import leagueTypes from '@/types/league';
  import { mapActions, mapState } from 'vuex';
  import LTable from 'src/components/UIComponents/Table.vue'
  import Card from 'src/components/UIComponents/Cards/Card.vue'
  const tableColumns = ['Nombre', 'Día de Inicio', 'Día de Finalización', 'Complejo', 'Día de Juego']

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
        getLeagues: leagueTypes.actions.getLeagues
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
      getData() {
        this.getLeague(this.id)
          .then(league => {
            console.log('leagues: ', league.data.data)
            let newLeague = league.data.data;
            this.LeagueName = newLeague.LeagueName
            this.StartDate = this.date(newLeague.StartDate)
            this.EndDate = this.date(newLeague.EndDate)
            this.GameDay = newLeague.Day.Days
            this.Complex = newLeague["Complex Detail"].ComplexName
          })
          .catch(err => console.log('err: ', err))
      },
      gridData() {
        this.getLeagues()
          .then(leagues => {
            leagues.data.data.forEach(e => {
              let element = { 
                'id': e.id, 
                'nombre': e.LeagueName, 
                'día de inicio': this.date(e.StartDate), 
                'día de finalización': this.date(e.EndDate),
                'complejo': e["Complex Detail"].ComplexName,
                'día de juego': e.Day.Days
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
