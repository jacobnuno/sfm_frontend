<template>
<div class="content" id="smf-show-team">
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12 col-md-6 offset-md-3">
          <card>
            <h4 slot="header" class="card-title">Equipo</h4>

            <div class="row">
              <div class="form-group col-sm-12 col-md-6">
                  <label for="User">Usuario</label>
                  <span class="span-input form-control">{{ User }}</span>
              </div>

              <div class="form-group col-sm-12 col-md-6">
                  <label for="Team">Equipo</label>
                  <span class="span-input form-control">{{ Team }}</span>
              </div>
            </div>

            <div class="row">
              <div class="form-group col-sm-12 col-md-6">
                  <label for="BirthDate">Fecha de Nacimiento</label>
                  <span class="span-input form-control">{{ BirthDate }}</span>
              </div>

              <div class="form-group col-sm-12 col-md-6">
                  <label for="isCaptain">¿Es capitán?</label>
                  <span class="span-input form-control">{{ isCaptain }}</span>
              </div>
            </div>
                        
            <router-link class="btn btn-danger btn-close float-right" :to="{ name: 'Athletes' }">
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
  import athleteTypes from '@/types/athlete';
  import { mapActions } from 'vuex';

  export default {
    components: {
      Card
    },
    data () {
      return {
        id: null,
        User: null,
        Team: null,
        BirthDate: null,
        isCaptain: null,
        error: null
      }
    },
    created() {      
      this.id = this.$route.params.id;
      this.getData();
    },
    methods: {
      ...mapActions({
        getAthlete: athleteTypes.actions.getAthlete
      }),
      date(value) {
        return value.split('T')[0];
      },
      getData() {
       this.getAthlete(this.id)
                .then(athlete => {
                    this.User = athlete.data.data["Id User"].FirstName + " " + athlete.data.data["Id User"].LastName,
                    this.BirthDate = this.date(athlete.data.data.BirthDate)
                    this.Team = athlete.data.data["Athlete Team"].TeamName
                    this.isCaptain = (athlete.data.data.Captain) ? 'Si' : 'No'
                })
                .catch(err => console.log('err: ', err))
      }
    },

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
