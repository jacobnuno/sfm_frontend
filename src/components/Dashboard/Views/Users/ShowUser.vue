<template>
<div class="content" id="smf-show-field">
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12 col-md-6 offset-md-3">
          <card>
            <h4 slot="header" class="card-title">Usuario</h4>

            <div class="row">
              <!--FirstName-->
              <div class="form-group col-sm-12 col-md-6">
                  <label for="FirstName">Nombre</label>
                  <span class="span-input form-control">{{ FirstName }}</span>
              </div>

              <!--LastName-->
              <div class="form-group col-sm-12 col-md-6">
                  <label for="LastName">Apellido Paterno</label>
                  <span class="span-input form-control">{{ LastName }}</span>
              </div>

              <!--SecondLastName-->
              <div class="form-group col-sm-12 col-md-6">
                  <label for="SecondLastName">Apellido Materno</label>
                  <span class="span-input form-control">{{ SecondLastName }}</span>
              </div>

              <!--Email-->
              <div class="form-group col-sm-12 col-md-6">
                  <label for="Email">Email</label>
                  <span class="span-input form-control">{{ Email }}</span>
              </div>

            </div>

            <router-link class="btn btn-danger btn-close float-right" :to="{ name: 'Users' }">
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
  import users from '@/types/user';
  import { mapActions } from 'vuex';

  export default {
    components: {
      Card
    },
    data () {
      return {
        id: null,
        FirstName: '',
        LastName: '',
        SecondLastName: '',
        Email: ''
      }
    },
    created() {
      this.id = this.$route.params.id;
      this.getData();
    },
    methods: {
      ...mapActions({
        getUser: users.actions.getUser
      }),
      getData() {
       this.getUser(this.id)
            .then(user => {
              this.FirstName = user.data.data.FirstName,
              this.LastName = user.data.data.LastName,
              this.SecondLastName = user.data.data.SecondLastName,
              this.Email = user.data.data.Email
            })
            .catch(err => console.log('err: ', err))
      }
    }
  }

</script>

<style lang="scss">
  #smf-show-user {
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
