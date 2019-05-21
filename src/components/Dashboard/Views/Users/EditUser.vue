<template>
    <section id="smf-create-user">
        <form @submit.prevent="beforeUpdateUser" class="col-sm-12 col-md-6 offset-md-3">
            <h2 class="create-title">Editar un Usuario</h2>

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
                    <button type="submit" class="btn btn-primary">Guardar</button>
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
            id: null,
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
    created() {
      this.id = this.$route.params.id;
      this.getData();
    },
    methods: {
        ...mapActions({
            updateUser: users.actions.updateUser,
            getUser: users.actions.getUser,
            getUserTypes: userType.actions.getUserTypes
        }),
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
        getData() {
            this.getUser(this.id)
            .then(user => {
                this.FirstName = user.data.data.FirstName,
                this.LastName = user.data.data.LastName,
                this.SecondLastName = user.data.data.SecondLastName,
                this.Email = user.data.data.Email
            })
            .catch(err => console.log('err: ', err))
        },
        beforeUpdateUser() {
            this.$validator.validateAll()
            if (!this.errors.any()) {
                this.updateUser({
                    id: this.id,
                    FirstName: this.FirstName,
                    LastName: this.LastName,
                    SecondLastName: this.SecondLastName,
                    Email: this.Email,
                    Password: this.Password,
                    UserType: this.UserType
                })
                .then(
                    user => {
                        this.notifyVue('top', 'right', '¡Actualizado exitosamente!', 'success')
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
    #smf-create-user {
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
