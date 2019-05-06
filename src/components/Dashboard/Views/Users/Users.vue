<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">

        <div class="col-12">
          <card class="card-plain">
            <template slot="header">
              <router-link class="btn btn-primary btn-close float-right" :to="{ name: 'CreateUser' }">
                Nuevo
              </router-link>
              <h4 class="card-title">Usuarios</h4>
            </template>
            <div class="table-responsive">
              <l-table class="table-hover"
                       :columns="table1.columns"
                       :data="table1.data"
                       :redirectShow="'ShowUser'"
                       :redirectEdit="'EditUser'"
                       :deleteAction="'deleteUser'">
              </l-table>
            </div>
          </card>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
  import users from '@/types/user';
  import { mapActions } from 'vuex';
  import LTable from 'src/components/UIComponents/Table.vue'
  import Card from 'src/components/UIComponents/Cards/Card.vue'
  const tableColumns = ['ID', 'Nombre', 'Apellido Paterno', 'Apellido Materno']

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
        getUsers: users.actions.getUsers
      }),
      gridData() {
        this.getUsers()
          .then(users => {
            users.data.data.forEach(e => {
              let element = {
                'id': e.id,
                'nombre': e.FirstName,
                'apellido paterno': e.LastName,
                'apellido materno': e.SecondLastName
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
