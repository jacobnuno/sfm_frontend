<template>
<div class="content" id="smf-show-match-detail">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <card>
            <h4 slot="header" class="card-title">Ver detalle del partido</h4>

            <div class="row">
              <div class="form-group col-sm-12 col-md-6">
                  <label for="Event">Evento</label>
                  <span class="span-input form-control">{{ Event }}</span>
              </div>
              <div class="form-group col-sm-12 col-md-6">
                  <label for="Time">Minuto Ocurrido</label>
                  <span class="span-input">{{ Time }}</span>
              </div>
            </div>
            <div class="row">
              <div class="form-group col-sm-12 col-md-6">
                  <label for="Player">Jugador</label>
                  <span class="span-input">{{ Player }}</span>
              </div>
              <div class="form-group col-sm-12 col-md-6">
                  <label for="Team">Equipo</label>
                  <span class="span-input">{{ Team }}</span>
              </div>
            </div>
            
            <router-link class="btn btn-danger btn-close float-right" :to="{ name: 'ShowMatch', params: { id: idMatch } }">
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
  import matchDetailTypes from '@/types/matchDetail';
  import { mapActions } from 'vuex';

  export default {
    components: {
      Card
    },
    data () {
      return {
        id: null,
        Event: null,
        idMatch: null,
        Time: null,
        Team: null,
        Player: null,
      }
    },
    created() {      
      this.id = this.$route.params.id;
      this.getData();
    },
    methods: {
      ...mapActions({
        getMatchDetail: matchDetailTypes.actions.getMatchDetail
      }),
      getData() {
        this.getMatchDetail(this.id)
          .then(matchDetail => {
            this.Time = matchDetail.data.data[0].Time,
            this.Event = matchDetail.data.data[0]["MatchEvent"].Description,
            this.idMatch = matchDetail.data.data[0].IdMatch
            this.Team = matchDetail.data.data[0]["IdTeam"].TeamName,
            this.Player = matchDetail.data.data[0]["User"].FirstName + " " + matchDetail.data.data[0]["User"].LastName
          })
          .catch(err => console.log('err: ', err))
      }
    }
  }

</script>

<style lang="scss">
  #smf-show-match-detail {
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
