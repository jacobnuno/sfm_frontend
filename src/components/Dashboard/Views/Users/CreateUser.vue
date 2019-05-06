<template>
    <section id="smf-create-user-types">
        <form @submit.prevent="beforeCreateUser" class="col-sm-12 col-md-4 offset-md-4">
            <h2 class="create-title">Crear un Tipo de Usuario</h2>
            <div class="form-group col-sm-12">
                <label for="FistName">Descripción</label>
                <input type="text" autocomplete="off" class="form-control" id="FistName" v-model="FistName" v-validate="'required|alpha_spaces'" data-vv-name="FistName" placeholder="Ingresa la descripción" required>
                <div class="invalid-feedback">{{ errors.first("FistName") }}</div>
            </div>

            <span class="alert alert-danger validation-error" v-if="error">A ocurrido un error</span>

            <div class="text-center buttons">
                <div class="form-group">
                    <button type="submit" tabindex=8 class="btn btn-primary">Guardar</button>
                    <router-link class="btn btn-danger btn-close" :to="{ name: 'UserTypes' }">
                        Cerrar
                    </router-link>
                </div>
            </div>
        </form>
    </section>
</template>

<script>
import userTypes from '@/types/user';
import { mapActions } from 'vuex';

export default {
    data() {
        return {
            FistName: '',
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
            createUserType: userTypes.actions.createUserType
        }),
        beforeCreateUserT() {
            this.createUserType({
                Description: this.Description
            })
            .then(
                field => {
                    this.notifyVue('top', 'right', '¡Registrado exitosamente!', 'success')
                    this.$router.push({ name: 'UserTypes'});
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
    #smf-create-user-types {
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
