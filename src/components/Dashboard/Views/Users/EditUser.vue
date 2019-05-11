<template>
    <section id="smf-create-user">
        <form @submit.prevent="beforeUpdateField" class="col-sm-12 col-md-4 offset-md-4">
            <h2 class="create-title">Editar un Usuario</h2>

            <!--first name -->
            <div class="form-group col-sm-12">
                <label for="FirstName">Nombre</label>
                <input type="text" autocomplete="off" class="form-control" id="FirstName" v-model="FirstName" v-validate="'required|alpha_spaces'" data-vv-name="FirstName" placeholder="Ingresa el nombre" required>
                <div class="invalid-feedback">{{ errors.first("FirstName") }}</div>
            </div>

            <!--lastname-->
            <div class="form-group col-sm-12">
                <label for="LastName">Apellido Paterno</label>
                <input type="text" autocomplete="off" class="form-control" id="LastName" v-model="LastName" v-validate="'required|alpha_spaces'" data-vv-name="LastName" placeholder="Ingresa el apellido paterno" required>
                <div class="invalid-feedback">{{ errors.first("LastName") }}</div>
            </div>

            <!--secondlastname-->
            <div class="form-group col-sm-12">
                <label for="SecondLastName">Apellido Materno</label>
                <input type="text" autocomplete="off" class="form-control" id="SecondLastName" v-model="SecondLastName" v-validate="'required|alpha_spaces'" data-vv-name="SecondLastName" placeholder="Ingresa el apellido materno" required>
                <div class="invalid-feedback">{{ errors.first("SecondLastName") }}</div>
            </div>

            <!--email-->
            <div class="form-group col-sm-12">
                <label for="Email">Email</label>
                <input type="text" autocomplete="off" class="form-control" id="Email" v-model="Email" v-validate="'required|alpha_spaces'" data-vv-name="Email" placeholder="Ingresa el email" required>
                <div class="invalid-feedback">{{ errors.first("Email") }}</div>
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
import { mapActions } from 'vuex';

export default {
    data() {
        return {
            FirstName: '',
            LastName: '',
            SecondLastName: '',
            Email: '',
            error: null
        }
    },
    created() {
      this.id = this.$route.params.id;
      this.getData();
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
            updateUser: users.actions.updateUser,
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
        },
        beforeUpdateField() {
            this.updateUser({
                FirstName: this.FirstName,
                LastName: this.LastName,
                SecondLastName: this.SecondLastName,
                Email: this.Email
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
