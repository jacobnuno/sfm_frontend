<template>
    <section id="smf-create-tournament">
        <form @submit.prevent="beforeCreateUserType" class="col-sm-12 col-md-4 offset-md-4">
            <h2 class="create-title">Crear un Torneo</h2>

            <div class="form-group col-sm-12">
                <label for="tournamentName">Nombre</label>
                <input type="text" autocomplete="off" class="form-control" id="tournamentName" v-model="tournamentName" v-validate="'required|alpha_spaces'" data-vv-name="tournamentName" placeholder="Ingresa el nombre" required>
                <div class="invalid-feedback">{{ errors.first("tournamentName") }}</div>
            </div>

            <div class="form-group col-sm-12">
                <label for="teams">Equipos</label>
                <multiselect v-model="value" tag-placeholder="Añade este tag" placeholder="Selecciona algunos equipos" label="name" track-by="code" :selectedLabel="'Seleccionado'" :selectLabel="'Presiona enter para seleccionar'" :deselectLabel="'Presiona enter para eliminar'" :options="options" :multiple="true" ></multiselect>
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
import Multiselect from 'vue-multiselect'
import userTypes from '@/types/userType';
import { mapActions } from 'vuex';

export default {
    components: { Multiselect },
    data() {
        return {
            tournamentName: '',
            error: null,
            value: [
                { name: 'Javascript', code: 'js' }
            ],
            options: [
                { name: 'Vue.js', code: 'vu' },
                { name: 'Javascript', code: 'js' },
                { name: 'Open Source', code: 'os' }
            ]
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
        addTag (newTag) {
        const tag = {
            name: newTag,
            code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
        }
        this.options.push(tag)
        this.value.push(tag)
        },
         ...mapActions({
            createUserType: userTypes.actions.createUserType
        }),
        beforeCreateUserType() {
            this.$validator.validateAll()
            if (!this.errors.any()) {
                this.createUserType({
                    tournamentName: this.tournamentName
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
}
</script>

<style lang="scss" src="vue-multiselect/dist/vue-multiselect.min.css">
    #smf-create-tournament {
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
