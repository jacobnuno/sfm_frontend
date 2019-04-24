<template>
<div class="content" id="smf-show-league">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <card>
            <h4 slot="header" class="card-title">Liga</h4>

            <div class="row">
              <div class="form-group col-sm-12 col-md-6">
                  <label for="LeagueName">Nombre de la Liga</label>
                  <span class="span-input form-control">{{ LeagueName }}</span>
              </div>
              <div class="form-group col-sm-12 col-md-3">
                  <label for="StartDate">Día de Inicio</label>
                  <span class="span-input">{{ StartDate }}</span>
              </div>
              <div class="form-group col-sm-12 col-md-3">
                  <label for="EndDate">Día de Finalización</label>
                  <span class="span-input">{{ EndDate }}</span>
              </div>
            </div>
            <div class="row">
              <div class="form-group col-sm-12 col-md-6">
                  <label for="Complex">Complejo</label>
                  <span class="span-input">{{ Complex }}</span>
              </div>
              <div class="form-group col-sm-12 col-md-6">
                  <label for="GameDay">Día(s) de Juego</label>
                  <span class="span-input form-control">{{ GameDay }}</span>
              </div>
            </div>
            
            <router-link :to="{ name: 'Leagues' }">
              <a class="btn btn-danger btn-close float-right">Cerrar</a>
            </router-link>
          </card>
        </div>
      </div>
    </div>
  </div>
  
</template>
<script>
  import Card from 'src/components/UIComponents/Cards/Card.vue'
  import leagueTypes from '@/types/league';
  import { mapActions } from 'vuex';

  export default {
    components: {
      Card
    },
    data () {
      return {
        id: null,
        LeagueName: null,
        StartDate: null,
        EndDate: null,
        Complex: null,
        GameDay: null
      }
    },
    created() {      
      this.id = this.$route.params.id;
      this.getData();
    },
    methods: {
      ...mapActions({
        getLeague: leagueTypes.actions.getLeague
      }),
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
      }
    },
    filters: {
      date(value) {
        return value.split('T')[0];
      }
    }
  }

</script>

<style lang="scss">
  #smf-show-league {
    .span-input {
      background-color: #F5F5F5;
      color: #888888;
      cursor: not-allowed;
      border: 1px solid #E3E3E3;
      border-radius: 4px;
      display: block;
      padding: .4em .6em;
    }
  }
</style>
