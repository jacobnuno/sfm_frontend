<template>
  <card>
    <h4 slot="header" class="card-title">Profile</h4>
    <form>
      <div class="row">
        <div class="col-md-3">
          <fg-input type="text"
                    label="Nombre"
                    :disabled="true"
                    placeholder="Nombre"
                    v-model="Usuario.Nombre">
          </fg-input>
        </div>
        <div class="col-md-5">
          <fg-input type="text"
                    label="Apellido Paterno"
                    :disabled="true"
                    placeholder="Apellido Paterno"
                    v-model="Usuario.ApellidoPaterno">
          </fg-input>
        </div>
        <div class="col-md-4">
          <fg-input type="email"
                    label="Apellido Materno"
                    :disabled="true"
                    placeholder="Apellido Materno"
                    v-model="Usuario.ApellidoMaterno">
          </fg-input>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <fg-input type="email"
                    label="E-mail"
                    :disabled="true"
                    placeholder="Email"
                    v-model="Usuario.Correo">
          </fg-input>
        </div>
        <div class="col-md-6">
          <fg-input type="password"
                    label="Contraseña"
                    :disabled="true"
                    placeholder="Contraseña"
                    v-model="Usuario.ClaveAcceso">
          </fg-input>
        </div>
      </div>
      <div class="row">
        <div class="col-md-5" v-if="Deportista">
          <fg-input type="text"
                    label="Equipo"
                    :disabled="true"
                    v-model="Deportista.Equipo">
          </fg-input>
        </div>

        <div class="col-md-4">
          <fg-input type="text"
                    label="Rol"
                    :disabled="true"
                    v-model="Usuario.TipoUsuario">
          </fg-input>
        </div>

        <div class="col-md-3" v-if="Deportista">
          <fg-input type="text"
                    label="Fecha de Nacimiento"
                    :disabled="true"
                    v-model="Deportista.FechaNacimiento">
          </fg-input>
        </div>
      </div>

      <div class="text-center">
        <button type="submit" class="btn btn-info btn-fill float-right" @click.prevent="updateProfile">
          Update Profile
        </button>
      </div>
      <div class="clearfix"></div>
    </form>
  </card>
</template>
<script>
  import Card from 'src/components/UIComponents/Cards/Card.vue'

  export default {
    components: {
      Card
    },
    data () {
      return {
        Usuario: {
          id: 0,
          Equipo: 'Atlas',
          Nombre: 'Juan',
          Correo: 'juan@gmail.com',
          ApellidoPaterno: 'Perez',
          ApellidoMaterno: 'Mallorca',
          ClaveAcceso: '',
          TipoUsuario: 'Admin'
        },
        Deportista: {
          Equipo: 'Atlas',
          FechaNacimiento: '1995-02-11'
        }
      }
    },
    created() {      
      this.Usuario.id = this.$route.params.id;
    },
    methods: {
      updateProfile () {
        alert('Your data: ' + JSON.stringify(this.Usuario))
      }
    }
  }

</script>
<style>

</style>
