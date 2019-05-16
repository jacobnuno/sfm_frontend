<template>
    <section id="smf-edit-match-detail">
        <form @submit.prevent="beforeUpdateMatchDetails" class="col-sm-12 col-md-4 offset-md-4">
            <h2 class="edit-title">Editar una Liga</h2>
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
                    <select class="form-control" id="idTeam" name="idTeam" v-model="idTeam" required>
                        <option selected disabled>Elije una opción</option>
                        <option v-for="option in teamOptions" :key="option.value" :value="option.value">{{ option.text }}</option>
                    </select>
                </div>

                <div class="form-group col-sm-12 col-md-6">
                    <label for="idPlayer">Jugador</label>
                    <select class="form-control" id="idPlayer" name="idPlayer" v-model="idPlayer" required>
                        <option selected disabled>Elije una opción</option>
                        <option v-for="option in athleteOptions" :key="option.value" :value="option.value">{{ option.text }}</option>
                    </select>
                </div>
            </div>

            <span class="alert alert-danger validation-error" v-if="error">A ocurrido un error</span>
            
            <div class="text-center buttons">
                <div class="form-group">
                    <button type="submit" class="btn btn-primary">Guardar</button>
                    <router-link class="btn btn-danger btn-close" :to="{ name: 'Matches' }">
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
            id: null,
            idMatch: 1,
            idEvent: null,
            Time: null,
            idTeam: null,
            idPlayer: null,
            eventOptions: [],
            teamOptions: [],
            athleteOptions: [],
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
            updateMatchDetail: matchDetailTypes.actions.updateMatchDetail,
            getMatchDetail: matchDetailTypes.actions.getMatchDetail,
            getMatchEvents: matchEventTypes.actions.getMatchEvents,
            getTeams: teamTypes.actions.getTeams,
            getAthletes: athleteTypes.actions.getAthletes
        }),
        date(value) {
            return value.split('T')[0];
        },
        getData() {
            this.getMatchDetail(this.id)
            .then(matchDetail => {
                this.Time = matchDetail.data.data[0].Time,
                this.idEvent = matchDetail.data.data[0]["MatchEvent"].id,
                
                this.idTeam = matchDetail.data.data[0]["IdTeam"].id,
                this.idPlayer = matchDetail.data.data[0]["User"].id
            })
            .catch(err => console.log('err: ', err))
        },
        beforeUpdateMatchDetails() {
            this.$validator.validateAll()
            if (!this.errors.any()) {
                this.updateMatchDetail({
                    id: this.id,
                    IdMatch: this.idMatch,
                    Event: this.idEvent,
                    Time: this.Time,
                    Team: this.idTeam,
                    Player: this.idPlayer
                })
                .then(
                    matchDetail => {
                        this.notifyVue('top', 'right', '¡Actualizado exitosamente!', 'success')
                        this.$router.push({ name: 'Matches'});
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
                this.teamOptions.push({ text: e.TeamName, value: e.id })
                });
            })
        },
        populateAthletes() {
            this.getAthletes()
            .then(athletes => {
                athletes.data.data.forEach(e => {
                this.athleteOptions.push({ text: e["Id User"].FirstName + " " + e["Id User"].LastName, value: e.id })
                });
            })
        }
    },
    mounted() {
        this.populateMatchEvents()
        this.populateTeams()
        this.populateAthletes()
    }
}
</script>

<style lang="scss">
    #smf-edit-match-detail {
        .buttons {
            margin-top: 3em;
        }
        .edit-title {
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


