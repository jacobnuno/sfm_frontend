<template>
<div class="content" id="smf-show-field">
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12 col-md-6 offset-md-3">
          <card>
            <h4 slot="header" class="card-title">Torneo</h4>

            <div class="row">
              <div class="form-group col-sm-12 col-md-7 offset-md-2">
                  <label for="Name">Nombre</label>
                  <span class="span-input form-control">{{ Name }}</span>
              </div>
            </div>

            <!-- teams table -->
            <div class="row">
              <div class="col-sm-12 col-md-7 offset-md-2">
                <card class="card-plain">
                  <template slot="header">
                    <h4 class="card-title">Equipos Registrados</h4>
                  </template>
                  <div class="table-responsive">
                    <l-table class="table-hover text-center"
                            :columns="table1.columns"
                            :data="table1.data">
                    </l-table>
                  </div>
                </card>
              </div>
            </div>
            <!-- teams table -->
                        
            <router-link class="btn btn-danger btn-close float-right" :to="{ name: 'Tournaments' }">
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
  import tournamentTypes from '@/types/tournament';
  import { mapActions } from 'vuex';

  import matchDetailTypes from '@/types/matchDetail';
  import LTable from 'src/components/UIComponents/TableTeams.vue'
  const tableColumns = ['Nombre']

  export default {
    components: {
      Card, LTable
    },
    data () {
      return {
        id: null,
        Name: null,
        table1: {
          columns: [...tableColumns],
          data: [],
        }
      }
    },
    created() {      
      this.id = this.$route.params.id;
      this.getData();
    },
    methods: {
      ...mapActions({
        getTournament: tournamentTypes.actions.getTournament
      }),
      getData() {
       this.getTournament(this.id)
            .then(tournament => {
                this.Name = tournament.data.data.Name
                tournament.data.data.TournamentDetails.forEach(e => {
                  let element = {
                    'id': e.idTeam.id,
                    'nombre': e.idTeam.TeamName
                  }
                  this.table1.data.push(element)
                });
            })
            .catch(err => console.log('err: ', err))
      }
    }
  }

</script>

<style lang="scss">
  #smf-show-user-type {
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
