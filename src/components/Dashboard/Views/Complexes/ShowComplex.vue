<template>
<div class="content" id="smf-show-match-event">
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12 col-md-6 offset-md-3">
          <card>
            <h4 slot="header" class="card-title">Evento Partido</h4>

            <div class="row">
              <div class="form-group col-sm-12 col-md-6">
                  <label for="Description">Descripción</label>
                  <span class="span-input form-control">{{ Description }}</span>
              </div>
            </div>
                        
            <router-link class="btn btn-danger btn-close float-right" :to="{ name: 'MatchEvents' }">
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
  import matchEventTypes from '@/types/matchEvent';
  import { mapActions } from 'vuex';

  export default {
    components: {
      Card
    },
    data () {
      return {
        id: null,
        Description: null
      }
    },
    created() {      
      this.id = this.$route.params.id;
      this.getData();
    },
    methods: {
      ...mapActions({
        getMatchEvent: matchEventTypes.actions.getMatchEvent
      }),
      getData() {
       this.getMatchEvent(this.id)
            .then(matchEvent => {
                this.Description = matchEvent.data.data.Description
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
