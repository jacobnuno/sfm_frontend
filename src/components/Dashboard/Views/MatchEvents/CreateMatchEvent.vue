<template>
    <section id="smf-create-match-event">
        <form @submit.prevent="beforeCreateMatchEvent" class="col-sm-12 col-md-4 offset-md-4">
            <h2 class="create-title">Crear un Evento Partido</h2>
            <div class="form-group col-sm-12">
                <label for="Description">Descripción</label>
                <input type="text" autocomplete="off" class="form-control" id="Description" v-model="Description" v-validate="'required|alpha_spaces'" data-vv-name="Description" placeholder="Ingresa la descripción" required>
                <div class="invalid-feedback">{{ errors.first("Description") }}</div>
            </div>         

            <span class="alert alert-danger validation-error" v-if="error">A ocurrido un error</span>
            
            <div class="text-center buttons">
                <div class="form-group">
                    <button type="submit" tabindex=8 class="btn btn-primary">Guardar</button>
                    <router-link class="btn btn-danger btn-close" :to="{ name: 'MatchEvents' }">
                        Cerrar
                    </router-link>
                </div>
            </div>
        </form>
    </section>
</template>

<script>
import matchEventTypes from '@/types/matchEvent';
import { mapActions } from 'vuex';

export default {
    data() {
        return {
            Description: '',
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
            createMatchEvent: matchEventTypes.actions.createMatchEvent
        }),
        beforeCreateMatchEvent() {
            this.$validator.validateAll()
            if (!this.errors.any()) {
                this.createMatchEvent({
                    Description: this.Description
                })
                .then(
                    field => {
                        this.notifyVue('top', 'right', '¡Registrado exitosamente!', 'success')
                        this.$router.push({ name: 'MatchEvents'});
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

<style lang="scss">
    #smf-create-match-event {
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


