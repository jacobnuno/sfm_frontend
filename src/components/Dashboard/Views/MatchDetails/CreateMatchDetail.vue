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
                    <input v-validate="'required|numeric|min_value:0|max_value:120'" v-model="Time" autocomplete="off" class="form-control" type="text" placeholder="Ingresa el minuto" name="Time">
                    <div class="invalid-feedback">{{ errors.first("Time") }}</div>
                </div>
            </div>
            
            <div class="row">
                <div class="form-group col-sm-12 col-md-6">
                    <label for="idTeam">Equipo</label>
                    <select class="form-control" id="idTeam" name="idTeam" v-model="idTeam" @change="onChangeTeam($event)" required>
                        <option selected disabled>Elije una opción</option>
                        <option v-for="option in teamOptions" :key="option.value" :value="option.value">{{ option.text }}</option>
                    </select>
                </div>

                <div class="form-group col-sm-12 col-md-6">
                    <label for="idPlayer">Jugador</label>
                    <select v-if="idTeam != null" class="form-control" id="idPlayer" name="idPlayer" v-model="idPlayer" required>
                        <option selected disabled>Elije una opción</option>
                        <option v-for="option in athleteOptions" :key="option.value" :value="option.value">{{ option.text }}</option>
                    </select>
                    <span v-else class="alert alert-warning span-verify">Selecciona un Equipo</span>
                </div>
            </div>

            <span class="alert alert-danger validation-error" v-if="error">A ocurrido un error</span>
            
            <div class="text-center buttons">
                <div class="form-group">
                    <button type="submit" class="btn btn-primary">Guardar</button>
                    <router-link class="btn btn-danger btn-close" :to="{ name: 'ShowMatch', params: { id: idMatch } }">
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
import teamTypes from '@/types/team';
import athleteTypes from '@/types/athlete';
import { mapActions } from 'vuex';

export default {
    data() {
        return {
            idMatch: null,
            idEvent: null,
            Time: null,
            idTeam: null,
            idPlayer: null,
            idLocal: null,
            idGuest: null,
            eventOptions: [],
            teamOptions: [],
            athleteOptions: [],
            error: null
        }
    },
    created() {      
      this.idLocal = this.$route.params.idLocal;
      this.idGuest = this.$route.params.idGuest;
      this.idMatch = this.$route.params.idMatch;
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
            createMatchDetail: matchDetailTypes.actions.createMatchDetail,
            getMatchEvents: matchEventTypes.actions.getMatchEvents,
            getTeams: teamTypes.actions.getTeams,
            getPlayersByTeam: teamTypes.actions.getPlayersByTeam
        }),
        beforeCreateMatchDetail() {
            this.$validator.validateAll()
            if (!this.errors.any()) {
                this.createMatchDetail({
                    IdMatch: this.idMatch,
                    Event: this.idEvent,
                    Time: this.Time,
                    Team: this.idTeam,
                    Player: this.idPlayer
                })
                .then(
                    matchDetail => {
                        this.notifyVue('top', 'right', '¡Registrado exitosamente!', 'success')
                        this.$router.push({ name: 'ShowMatch', params: { id: this.idMatch } });
                    },
                    error => {
                        console.log(error)
                        this.notifyVue('top', 'right', error, 'danger')
                    }
                )
            }
        },
        populateMatchEvents() {
            this.getMatchEvents()
            .then(matchEvents => {
                matchEvents.data.data.forEach(e => {
                    this.eventOptions.push({ text: e.Description, value: e.id })
                });
            })
        },
        populateTeams() {
            this.getTeams()
            .then(teams => {
                teams.data.data.forEach(e => {
                    if(e.id == this.idLocal || e.id == this.idGuest) {
                        this.teamOptions.push({ text: e.TeamName, value: e.id })
                    }
                });
            })
        },
        onChangeTeam(event) {
            this.populateAthletes(event.target.value)
        },
        populateAthletes(teamId) {
            this.athleteOptions = []
            this.getPlayersByTeam(teamId)
            .then(athletes => {
                athletes.data.data.players.forEach(e => {
                    this.athleteOptions.push({ text: e["Id User"].FirstName + " " + e["Id User"].LastName, value: e.id })
                });
            })
        }
    },
    mounted() {
        this.populateMatchEvents()
        this.populateTeams()
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
        .span-verify {
            display: block; 
            text-align: center;
        }
    }
</style>


