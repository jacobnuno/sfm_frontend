<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">

        <div class="col-12">
          <card class="card-plain">
            <template slot="header">
              <h4 class="card-title">Canchas</h4>
              <p class="card-category">Here is a subtitle for this table</p>
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
  const tableColumns = ['ID', 'Nombre', 'Complejo']
  const tableData = [
    {
        id: 1,
        nombre: 'Juan',
        puesto: 'Gerente'
    },
    {
        id: 2,
        nombre: 'Felipe Ortega Díaz',
        puesto: 'Arbitro'
    },
    {
        id: 3,
        nombre: 'Esteban Alatorre Ruíz',
        puesto: 'Arbitro'
    }
  ] 
  export default {
    components: {
      LTable,
      Card
    },
    data () {
      return {
        //tableData: this.gridData(),
        table1: {
          columns: [...tableColumns],
          data: [...tableData]
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
            console.log('fields: ', fields.data.fields)
            let a = [...fields.data.fields]
            let b = [...a]
            console.log('a', a)
            console.log('b', b)
            console.log('typeof: ', typeof(ll))
            return a;
          })
      }
    },
    mounted() {
        console.log('mounted')
        this.gridData()
    },
  }
</script>

<style>
</style>
