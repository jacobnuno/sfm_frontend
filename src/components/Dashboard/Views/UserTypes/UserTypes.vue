<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">

        <div class="col-12">
          <card class="card-plain">
            <template slot="header">
              <router-link class="btn btn-primary btn-close float-right" :to="{ name: 'CreateUserType' }">
                Nuevo
              </router-link>
              <h4 class="card-title">Tipos de Usuarios</h4>
            </template>
            <div class="table-responsive">
              <l-table class="table-hover"
                       :columns="table1.columns"
                       :data="table1.data"
                       :redirectShow="'ShowUserType'"
                       :redirectEdit="'EditUserType'"
                       :deleteAction="'deleteUserType'">
              </l-table>
            </div>
          </card>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
  import userTypes from '@/types/userType';
  import { mapActions, mapState } from 'vuex';
  import LTable from 'src/components/UIComponents/Table.vue'
  import Card from 'src/components/UIComponents/Cards/Card.vue'
  const tableColumns = ['Descripción']

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
        getUserTypes: userTypes.actions.getUserTypes
      }),
      gridData() {
        this.getUserTypes()
          .then(userTypes => {
            userTypes.data.data.forEach(e => {
              let element = {
                'id': e.id,
                'descripción': e.Description
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
