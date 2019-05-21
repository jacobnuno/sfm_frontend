<template>
<div class="content" id="smf-show-athlete">
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12 col-md-10 offset-md-1">
          <card>
            <h4 slot="header" class="card-title">Partido</h4>

            <div class="row">
              <div class="form-group col-sm-12 col-md-4">
                  <label for="Field">Campo</label>
                  <span class="span-input form-control">{{ Field }}</span>
              </div>

              <div class="form-group col-sm-12 col-md-4">
                  <label for="League">Liga</label>
                  <span class="span-input form-control">{{ League }}</span>
              </div>

              <div class="form-group col-sm-12 col-md-4">
                  <label for="Referee">Árbitro</label>
                  <span class="span-input form-control">{{ Referee }}</span>
              </div>
            </div>

            <div class="row">
              <div class="form-group col-sm-12 col-md-4">
                  <label for="Local">Equipo Local</label>
                  <span class="span-input form-control">{{ Local }}</span>
              </div>

              <div class="form-group col-sm-12 col-md-4">
                  <label for="Guest">Equipo Visitante</label>
                  <span class="span-input form-control">{{ Guest }}</span>
              </div>

              <div v-if="IsDraw == 1" class="form-group col-sm-12 col-md-4">
                  <label for="IsDraw">Resultado</label>
                  <span class="span-input form-control">Empataron</span>
              </div>

              <div v-else class="form-group col-sm-12 col-md-4">
                  <label for="Winner">Ganador</label>
                  <span class="span-input form-control">{{ Winner }}</span>
              </div>
            </div>

            <div class="row">
              <div class="form-group col-sm-12 col-md-4">
                  <label for="StartGame">Hora de comienzo</label>
                  <span class="span-input form-control">{{ StartGame }}</span>
              </div>

              <div class="form-group col-sm-12 col-md-4">
                  <label for="EndGame">Hora de finalización</label>
                  <span class="span-input form-control">{{ EndGame }}</span>
              </div>
            </div>

            <div class="row">
              

              
            </div>

                        
            <router-link class="btn btn-danger btn-close float-right" :to="{ name: 'Matches' }">
              Cerrar
            </router-link>
          </card>
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

  export default {
    components: {
      Card
    },
    data () {
      return {
        id: null,
        Field: null,
        League: null,
        Local: null,
        Guest: null,
        Referee: null,
        Winner: null,
        IsDraw: null,
        StartGame: null,
        EndGame: null,
        error: null
      }
    },
    created() {      
      this.id = this.$route.params.id;
      this.getData();
    },
    methods: {
      ...mapActions({
        getMatch: matchTypes.actions.getMatch,
        getTeam: teamTypes.actions.getTeam,
      }),
      date(value) {
        return value.split('T')[0];
      },
      getData() {
       this.getMatch(this.id)
          .then(match => {
            this.Field = match.data.data.IdField.FieldName
            this.League = match.data.data.IdLeague.LeagueName,
            this.Local = match.data.data.IdLocal.TeamName,
            this.Guest = match.data.data.IdGuest.TeamName
            this.Referee = match.data.data.IdReferee.FirstName + " " + match.data.data.IdReferee.LastName
            this.IsDraw = match.data.data.IsDraw
            this.StartGame = match.data.data.StartGame
            this.EndGame = match.data.data.EndGame
            this.getNameWinner(match.data.data.Winner)
          })
          .catch(err => console.log('err: ', err))
      },
      getNameWinner(teamId) {
            this.getTeam(teamId)
            .then(team => {
                this.Winner = team.data.data.TeamName
            })
      },
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
