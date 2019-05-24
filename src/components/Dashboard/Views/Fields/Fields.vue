<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">

        <div class="col-12">
          <card class="card-plain">
            <template slot="header">
              <router-link class="btn btn-primary btn-close float-right" :to="{ name: 'CreateField' }">
                Nuevo
              </router-link>
              <h4 class="card-title">Canchas</h4>
            </template>
            <div class="table-responsive">
              <l-table class="table-hover"
                       :columns="table1.columns"
                       :data="table1.data"
                       :redirectShow="'ShowField'"
                       :redirectEdit="'EditField'"
                       :deleteAction="'deleteField'">
              </l-table>
            </div>
          </card>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
  import fieldTypes from '@/types/field';
  import { mapActions, mapState } from 'vuex';
  import LTable from 'src/components/UIComponents/Table.vue'
  import Card from 'src/components/UIComponents/Cards/Card.vue'
  const tableColumns = ['Nombre', 'Complejo']
   
  export default {
    components: {
      LTable,
      Card
    },
    data () {
      return {
        table1: {
          columns: [...tableColumns],
          data: []
        },
        error: null
      }
    }, 
    methods: {
      ...mapActions({
        getFields: fieldTypes.actions.getFields
      }),
      gridData() {
        this.getFields()
          .then(fields => {
            fields.data.data.forEach(e => {
              let element = { 
                'id': e.id, 
                'nombre': e.FieldName,
                'complejo': e["Complex Detail"].ComplexName
              }
              this.table1.data.push(element)
            });
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
