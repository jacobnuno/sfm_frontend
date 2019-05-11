<template>
    <section id="smf-create-match-detail">
        <form @submit.prevent="beforeCreateMatchDetail" class="col-sm-12 col-md-6 offset-md-3">
            <h2 class="create-title">Crear un detalle de partido</h2>
            <div class="row">
                <div class="form-group col-sm-12 col-md-6">
                    <label for="idEvent">Evento</label>
                    <select class="form-control" id="idEvent" name="idEvent" v-model="idEvent" required>
                        <option selected disabled>Elije una opción</option>
                        <option v-for="option in eventOptions" :key="option.value" :value="option.value">{{ option.text }}</option>
                    </select>
                </div>

                <div class="form-group col-sm-12 col-md-6">
                    <label for="Time">Minuto Ocurrido</label>
                    <input v-validate="'required|numeric|min_value:0|max_value:120'" class="form-control" type="text" placeholder="Ingresa el minuto" name="Time">
                    <div class="invalid-feedback">{{ errors.first("Time") }}</div>
                </div>
            </div>
            
            <div class="row">
                <div class="form-group col-sm-12 col-md-6">
                    <label for="idTeam">Equipo</label>
                    <select class="form-control" id="idTeam" name="idTeam" v-model="idTeam" required>
                        <option selected disabled>Elije una opción</option>
                        <option v-for="option in teamOptions" :key="option.value" :value="option.value">{{ option.text }}</option>
                    </select>
                </div>

                <div class="form-group col-sm-12 col-md-6">
                    <label for="idPlayer">JUgador</label>
                    <select class="form-control" id="idPlayer" name="idPlayer" v-model="idPlayer" required>
                        <option selected disabled>Elije una opción</option>
                        <option v-for="option in playerOptions" :key="option.value" :value="option.value">{{ option.text }}</option>
                    </select>
                </div>
            </div>

            <span class="alert alert-danger validation-error" v-if="error">A ocurrido un error</span>
            
            <div class="text-center buttons">
                <div class="form-group">
                    <button type="submit" class="btn btn-primary">Guardar</button>
                    <router-link class="btn btn-danger btn-close" :to="{ name: 'MatchDetails' }">
                        Cerrar
                    </router-link>
                </div>
            </div>
        </form>
    </section>
</template>

<script>
import matchDetailTypes from '@/types/matchDetail';
import matchEventTypes from '@/types/matchEvent';
//import teamTypes from '@/types/team';
//import athleteTypes from '@/types/athlete';
import { mapActions } from 'vuex';

export default {
    data() {
        return {
            idEvent: null,
            Time: null,
            idTeam: null,
            idPlayer: null,
            eventOptions: [],
            teamOptions: [],
            playerOptions: [],
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
            create: matchDetailTypes.actions.create,
            getMatchEvents: matchEventTypes.actions.getMatchEvents
        }),
        beforeCreateMatchDetail() {
            this.create({
                idEvent: this.idEvent,
                StartDate: this.time1.getUTCFullYear() + "-" + (this.time1.getUTCMonth() + 1) + "-" + this.time1.getUTCDate(),
                EndDate: this.time2.getUTCFullYear() + "-" + (this.time2.getUTCMonth() + 1) + "-" + this.time2.getUTCDate(),
                Complex: this.Complex,
                GameDay: this.GameDay
            })
            .then(
                matchDetail => {
                    this.notifyVue('top', 'right', '¡Registrado exitosamente!', 'success')
                    this.$router.push({ name: 'MatchDetails'});
                },
                error => {
                    console.log(error)
                    this.notifyVue('top', 'right', error, 'danger')
                }
            )
        },
        populateMatchEvents() {
            this.getMatchEvents()
            .then(matchEvent => {
                matchEvent.data.data.forEach(e => {
                this.eventOptions.push({ text: e.Description, value: e.id })
                });
            })
        }
    },
    mounted() {
        this.populateMatchEvents()
    },
}
</script>

<style lang="scss">
    #smf-create-match-detail {
        .buttons {
            margin-top: 3em;
        }
        .create-title {
            color: var(--primary) !important;
        }
        .smf-datepicker input {
            border-radius: 4px !important;
            border: 1px solid #E3E3E3 !important;
            height: 40px;
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


