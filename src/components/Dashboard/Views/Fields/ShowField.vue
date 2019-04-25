<template>
<div class="content" id="smf-show-field">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <card>
            <h4 slot="header" class="card-title">Cancha</h4>

            <div class="row">
              <div class="form-group col-sm-12 col-md-6">
                  <label for="FieldName">Nombre de la Cancha</label>
                  <span class="span-input form-control">{{ FieldName }}</span>
              </div>
              <div class="form-group col-sm-12 col-md-6">
                  <label for="Complex">Complejo</label>
                  <span class="span-input">{{ Complex }}</span>
              </div>
            </div>
                        
            <router-link class="btn btn-danger btn-close float-right" :to="{ name: 'Fields' }">
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
  import fieldTypes from '@/types/field';
  import { mapActions } from 'vuex';

  export default {
    components: {
      Card
    },
    data () {
      return {
        id: null,
        FieldName: null,
        Complex: null
      }
    },
    created() {      
      this.id = this.$route.params.id;
      this.getData();
    },
    methods: {
      ...mapActions({
        getField: fieldTypes.actions.getField
      }),
      getData() {
        this.getField(this.id)
          .then(field => {
            console.log('field: ', field.data.data)
            let newField = field.data.data;
            this.FieldName = newField.FieldName
            this.Complex = newLeague["Complex Detail"].id
          })
          .catch(err => console.log('err: ', err))
      }
    }
  }

</script>

<style lang="scss">
  #smf-show-field {
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
