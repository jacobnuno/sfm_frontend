<template>
<div class="content" id="smf-show-team">
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12 col-md-6 offset-md-3">
          <card>
            <h4 slot="header" class="card-title">Equipo</h4>

            <div class="row">
              <div class="form-group col-sm-12 col-md-6">
                  <label for="TeamName">Nombre</label>
                  <span class="span-input form-control">{{ TeamName }}</span>
              </div>

              <div class="form-group col-sm-12 col-md-6">
                  <label for="League">Liga</label>
                  <span class="span-input form-control">{{ League }}</span>
              </div>
            </div>
                        
            <router-link class="btn btn-danger btn-close float-right" :to="{ name: 'Teams' }">
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
  import teamTypes from '@/types/team';
  import { mapActions } from 'vuex';

  export default {
    components: {
      Card
    },
    data () {
      return {
        id: null,
        TeamName: '',
        League: null
      }
    },
    created() {      
      this.id = this.$route.params.id;
      this.getData();
    },
    methods: {
      ...mapActions({
        getTeam: teamTypes.actions.getTeam
      }),
      getData() {
       this.getTeam(this.id)
          .then(team => {
              this.TeamName = team.data.data.TeamName,
              this.League = team.data.data["League Detail"].LeagueName
          })
          .catch(err => console.log('err: ', err))
      }
    }
  }

</script>

<style lang="scss">
  #smf-show-team {
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
