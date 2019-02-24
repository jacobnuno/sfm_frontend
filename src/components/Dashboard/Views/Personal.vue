<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">

        <div class="col-12">
          <card class="card-plain">
            <template slot="header">
              <h4 class="card-title">Personal</h4>
              <p class="card-category">Here is a subtitle for this table</p>
            </template>
            <div class="table-responsive">
              <l-table class="table-hover"
                       :columns="table2.columns"
                       :data="table2.data"
                       :redirect="'User'">
              </l-table>
            </div>
          </card>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
  import LTable from 'src/components/UIComponents/Table.vue'
  import Card from 'src/components/UIComponents/Cards/Card.vue'
  const tableColumns = ['ID', 'Nombre', 'Puesto']
  const tableData = [
    {
        id: 1,
        nombre: 'Julian Mondragón Partida',
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
        table1: {
          columns: [...tableColumns],
          data: [...tableData]
        },
        table2: {
          columns: [...tableColumns],
          data: [...tableData]
        }
      }
    }
  }
</script>
<style>
</style>
