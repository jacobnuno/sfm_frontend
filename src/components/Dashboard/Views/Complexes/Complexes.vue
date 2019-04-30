<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">

        <div class="col-12">
          <card class="card-plain">
            <template slot="header">
              <router-link class="btn btn-primary btn-close float-right" :to="{ name: 'CreateComplex' }">
                Nuevo
              </router-link>
              <h4 class="card-title">Unidades</h4>
            </template>
            <div class="table-responsive">
              <l-table class="table-hover"
                       :columns="table1.columns"
                       :data="table1.data"
                       :redirectShow="'ShowComplex'"
                       :redirectEdit="'EditComplex'"
                       :deleteAction="'deleteComplex'">
              </l-table>
            </div>
          </card>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
  import complexTypes from '@/types/complex';
  import { mapActions } from 'vuex';
  import LTable from 'src/components/UIComponents/Table.vue'
  import Card from 'src/components/UIComponents/Cards/Card.vue'
  const tableColumns = ['ID', 'Nombre', 'Ubicación']
   
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
        getComplexes: complexTypes.actions.getComplexes
      }),
      gridData() {
        this.getComplexes()
          .then(complex => {
            complex.data.data.forEach(e => {
              let element = { 
                'id': e.id, 
                'nombre': e.ComplexName,
                'ubicación': e.Address
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
