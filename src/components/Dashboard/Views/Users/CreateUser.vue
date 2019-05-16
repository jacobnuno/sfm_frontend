<template>
    <section id="smf-create-users">
        <form @submit.prevent="beforeCreateUser" class="col-sm-12 col-md-4 offset-md-4">
            <h2 class="create-title">Crear un  Usuario</h2>

            <div class="row">
                <!--first name -->
                <div class="form-group col-sm-12 col-md-6">
                    <label for="FirstName">Nombre</label>
                    <input type="text" autocomplete="off" class="form-control" id="FirstName" v-model="FirstName" v-validate="'required|alpha_spaces'" data-vv-name="FirstName" placeholder="Ingresa el nombre" required>
                    <div class="invalid-feedback">{{ errors.first("FirstName") }}</div>
                </div>

                <!--lastname-->
                <div class="form-group col-sm-12 col-md-6">
                    <label for="LastName">Apellido Paterno</label>
                    <input type="text" autocomplete="off" class="form-control" id="LastName" v-model="LastName" v-validate="'required|alpha_spaces'" data-vv-name="LastName" placeholder="Ingresa el apellido paterno" required>
                    <div class="invalid-feedback">{{ errors.first("LastName") }}</div>
                </div>
            </div>

            <div class="row">
                <!--secondlastname-->
                <div class="form-group col-sm-12 col-md-6">
                    <label for="SecondLastName">Apellido Materno</label>
                    <input type="text" autocomplete="off" class="form-control" id="SecondLastName" v-model="SecondLastName" v-validate="'required|alpha_spaces'" data-vv-name="SecondLastName" placeholder="Ingresa el apellido materno" required>
                    <div class="invalid-feedback">{{ errors.first("SecondLastName") }}</div>
                </div>

                <!--email-->
                <div class="form-group col-sm-12 col-md-6">
                    <label for="Email">Email</label>
                    <input type="text" autocomplete="off" class="form-control" id="Email" v-model="Email" v-validate="'required|email'" data-vv-name="Email" placeholder="Ingresa el email" required>
                    <div class="invalid-feedback">{{ errors.first("Email") }}</div>
                </div>
            </div>

            <div class="row">
                <!--password-->
                <div class="form-group col-sm-12 col-md-6">
                    <label for="Password">Contraseña</label>
                    <input type="password" autocomplete="off" class="form-control" id="Password" v-model="Password" v-validate="'required|min:6'" data-vv-name="Password" placeholder="Ingresa la contraseña" required>
                    <div class="invalid-feedback">{{ errors.first("Password") }}</div>
                </div>

                <!--userType-->
                <div class="form-group col-sm-12 col-md-6">
                    <label for="UserType">Role</label>
                    <select class="form-control" id="UserType" name="UserType" v-model="UserType" required>
                        <option selected disabled>Elije una opción</option>
                        <option v-for="option in userTypesOptions" :key="option.value" :value="option.value">{{ option.text }}</option>
                    </select>
                </div>
            </div>

            <span class="alert alert-danger validation-error" v-if="error">A ocurrido un error</span>

            <div class="text-center buttons">
                <div class="form-group">
                    <button type="submit" tabindex=8 class="btn btn-primary">Guardar</button>
                    <router-link class="btn btn-danger btn-close" :to="{ name: 'Users' }">
                        Cerrar
                    </router-link>
                </div>
            </div>
        </form>
    </section>
</template>

<script>
import users from '@/types/user';
import userType from '@/types/userType';
import { mapActions } from 'vuex';

export default {
    data() {
        return {
          FirstName: '',
          LastName: '',
          SecondLastName: '',
          Email: '',
          UserType: null,
          Password: null,
          userTypesOptions: [],
          error: null
        }
    },
    methods: {
        notifyVue (verticalAlign, horizontalAlign, msg, color) {
            const notification = {
            template: `<span>${ msg }.</span>`
            }

            this.$notifications.notify(
            {
                component: notification,
                icon: 'nc-icon nc-app',
                horizontalAlign: horizontalAlign,
                verticalAlign: verticalAlign,
                type: color
            })
        },
         ...mapActions({
            createUser: users.actions.createUser,
            getUserTypes: userType.actions.getUserTypes
        }),
        beforeCreateUser() {
            this.$validator.validateAll()
            if (!this.errors.any()) {
                this.createUser({
                FirstName: this.FirstName,
                LastName: this.LastName,
                SecondLastName: this.SecondLastName,
                Email: this.Email,
                Password: this.Password,
                UserType: this.UserType
                })
                .then(
                    field => {
                        this.notifyVue('top', 'right', '¡Registrado exitosamente!', 'success')
                        this.$router.push({ name: 'Users'});
                    },
                    error => {
                        console.log(error)
                        this.notifyVue('top', 'right', error, 'danger')
                    }
                )
            }
        },
        populateUserTypes() {
            this.getUserTypes()
            .then(userTypes => {
                userTypes.data.data.forEach(e => {
                this.userTypesOptions.push({ text: e.Description, value: e.id })
                });
            })
        }
    },
    mounted() {
        this.populateUserTypes()
    }
}
</script>

<style lang="scss">
    #smf-create-users {
        .buttons {
            margin-top: 3em;
        }
        .create-title {
            color: var(--primary) !important;
        }
        .validation-error {
            text-align: center;
            margin-bottom: 2em;
            width: 100%;
            display: block;
            border-radius: 4px;
        }
    }
</style>
