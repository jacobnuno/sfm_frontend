<template>
<div class="content" id="smf-show-athlete">
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12 col-md-10 offset-md-1">
          <card>
            <h4 slot="header" class="card-title">Partido</h4>

            <div class="row">
              <div class="form-group col-sm-12 col-md-3">
                  <label for="Field">Campo</label>
                  <span class="span-input form-control">{{ Field }}</span>
              </div>

              <div class="form-group col-sm-12 col-md-3">
                  <label for="League">Liga</label>
                  <span class="span-input form-control">{{ League }}</span>
              </div>

              <div class="form-group col-sm-12 col-md-3">
                  <label for="Referee">Árbitro</label>
                  <span class="span-input form-control">{{ Referee }}</span>
              </div>

              <div v-if="IsDraw == 1" class="form-group col-sm-12 col-md-3">
                  <label for="IsDraw">Resultado</label>
                  <span class="span-input form-control">Empataron</span>
              </div>

              <div v-else class="form-group col-sm-12 col-md-3">
                  <label for="Winner">Ganador</label>
                  <span class="span-input form-control">{{ Winner }}</span>
              </div>
            </div>

            <div class="row">
              <div class="form-group col-sm-12 col-md-3">
                  <label for="Local">Equipo Local</label>
                  <span class="span-input form-control">{{ Local }}</span>
              </div>

              <div class="form-group col-sm-12 col-md-3">
                  <label for="Guest">Equipo Visitante</label>
                  <span class="span-input form-control">{{ Guest }}</span>
              </div>

              <div class="form-group col-sm-12 col-md-2">
                  <label for="StartGame">Hora de comienzo</label>
                  <span class="span-input form-control">{{ StartGame }}</span>
              </div>

              <div class="form-group col-sm-12 col-md-2">
                  <label for="EndGame">Hora de finalización</label>
                  <span class="span-input form-control">{{ EndGame }}</span>
              </div>
              <div class="form-group col-sm-12 col-md-2">
                  <label for="GameDay">Día del Juego</label>
                  <span class="span-input form-control">{{ GameDay }}</span>
              </div>
            </div>      
            
          </card>

          <!-- match details table -->
          <div class="row">
            <div class="col-12">
              <card class="card-plain">
                <template slot="header">
                  <router-link class="btn btn-primary btn-close float-right" :to="{ name: 'CreateMatchDetail', params: { idLocal: idLocal, idGuest: idGuest, idMatch: id} }">
                    Nuevo
                  </router-link>
                  <h4 class="card-title">Eventos del Partido</h4>
                </template>
                <div class="table-responsive">
                  <l-table class="table-hover"
                          :columns="table1.columns"
                          :data="table1.data[0]"
                          :redirectShow="'ShowMatchDetail'"
                          :redirectEdit="'EditMatchDetail'"
                          :deleteAction="'deleteMatchDetail'">
                  </l-table>
                </div>
              </card>
            </div>
          </div>
          <!-- match details table -->
          <router-link class="btn btn-danger btn-close float-right" :to="{ name: 'Matches' }">
              Cerrar
            </router-link>
        </div>
      </div>
    </div>
  </div>
  
</template>
<script>
  import Card from 'src/components/UIComponents/Cards/Card.vue'
  import matchTypes from '@/types/match';
  import teamTypes from '@/types/team';
  import { mapActions } from 'vuex';

  import matchDetailTypes from '@/types/matchDetail';
  import LTable from 'src/components/UIComponents/Table.vue'
  const tableColumns = ['Evento', 'Minuto Ocurrido', 'Jugador', 'Equipo']

  export default {
    components: {
      Card,
      LTable,
    },
    data () {
      return {
        id: null,
        Field: null,
        League: null,
        idLocal: null,
        Local: null,
        idGuest: null,
        Guest: null,
        Referee: null,
        Winner: null,
        IsDraw: null,
        StartGame: null,
        EndGame: null,
        GameDay: null,
        error: null,
        table1: {
          columns: [...tableColumns],
          data: [],
        },
        elements: []
      }
    },
    created() {      
      this.id = this.$route.params.id;
      this.getData();
      this.gridData();
    },
    methods: {
      ...mapActions({
        getMatch: matchTypes.actions.getMatch,
        getTeam: teamTypes.actions.getTeam,
        getMatchDetailByMatch: matchDetailTypes.actions.getMatchDetailByMatch
      }),
      date(value) {
        return value.split('T')[0];
      },
      getData() {
       this.getMatch(this.id)
          .then(match => {
            this.Field = match.data.data.IdField.FieldName
            this.League = match.data.data.IdLeague.LeagueName
            this.Local = match.data.data.IdLocal.TeamName
            this.idLocal = match.data.data.IdLocal.id
            this.Guest = match.data.data.IdGuest.TeamName
            this.idGuest = match.data.data.IdGuest.id
            this.Referee = match.data.data.IdReferee.FirstName + " " + match.data.data.IdReferee.LastName
            this.IsDraw = match.data.data.IsDraw
            this.StartGame = match.data.data.StartGame
            this.EndGame = match.data.data.EndGame
            this.getNameWinner(match.data.data.Winner)
            this.GameDay = this.date(match.data.data.GameDay)
          })
          .catch(err => console.log('err: ', err))
      },
      getNameWinner(teamId) {
            this.getTeam(teamId)
            .then(team => {
                this.Winner = team.data.data.TeamName
            })
      },
      sortObject(obj) {
        obj.sort((a, b) => (a['minuto ocurrido'] > b['minuto ocurrido']) ? 1 : -1)
        return obj
      },
      gridData() {
        this.getMatchDetailByMatch(this.id)
          .then(matchDetails => {
            matchDetails.data.data.forEach(e => {
              let element = { 
                'id': e.id,
                'evento': e["MatchEvent"] .Description,
                'minuto ocurrido': e.Time, 
                'jugador': e.User.FirstName + " " + e.User.LastName,
                'equipo': e["IdTeam"].TeamName
              }
              this.elements.push(element)
              //this.table1.data.push(element)
            });
            this.table1.data.push(this.sortObject(this.elements))
          })
      }
    },
    mounted() {
      //this.gridData()
    },
  }

</script>

<style lang="scss">
  #smf-show-athlete {
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
