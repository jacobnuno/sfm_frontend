<template>
    <section id="smf-edit-matches">
        <form @submit.prevent="beforeUpdateMatch" class="col-sm-12 col-md-6 offset-md-3">
            <h2 class="edit-title">Editar un Partido</h2>
            
            <div class="row">
                <div class="form-group col-sm-12 col-md-6">
                    <label for="idField">Cancha</label>
                    <select class="form-control" id="idField" name="idField" v-model="idField" required>
                        <option selected disabled>Elije una opción</option>
                        <option v-for="option in fieldOptions" :key="option.value" :value="option.value">{{ option.text }}</option>
                    </select>
                </div>
                <div class="form-group col-sm-12 col-md-6">
                    <label for="idLeague">Liga</label>
                    <select class="form-control" id="idLeague" name="idLeague" v-model="idLeague" required>
                        <option selected disabled>Elije una opción</option>
                        <option v-for="option in leagueOptions" :key="option.value" :value="option.value">{{ option.text }}</option>
                    </select>
                </div>
            </div>

            <div class="row">
                <div class="form-group col-sm-12 col-md-6">
                    <label for="idLocal">Local</label>
                    <select class="form-control" id="idLocal" name="idLocal" v-model="idLocal" required>
                        <option selected disabled>Elije una opción</option>
                        <option v-for="option in teamOptions" :key="option.value" :value="option.value">{{ option.text }}</option>
                    </select>
                </div>
                <div class="form-group col-sm-12 col-md-6">
                    <label for="idGuest">Visitante</label>
                    <select class="form-control" id="idGuest" name="idGuest" v-model="idGuest" required>
                        <option selected disabled>Elije una opción</option>
                        <option v-for="option in teamOptions" :key="option.value" :value="option.value">{{ option.text }}</option>
                    </select>
                </div>
            </div>

            <div class="row">
                <div class="form-group col-sm-12 col-md-6">
                    <label class="control-label" for="mRadio">¿Empataron?</label>
                    <div id="mRadio" class="form-control">
                        <label class="lbl-radio">
                            <input type="radio" name="optradio1" value="1" v-model="IsDraw">
                            Si
                        </label>
                        <label class="lbl-radio">
                            <input type="radio" name="optradio1" value="0" v-model="IsDraw">
                            No
                        </label>
                    </div>
                </div>
                <div v-if="IsDraw == 0" class="form-group col-sm-12 col-md-6">
                    <label class="control-label" for="mRadio">Ganador</label>
                    <div v-if="idLocal != null && idGuest != null" id="mRadio" class="form-control">
                        <label class="lbl-radio">
                            <input type="radio" name="optradio2" :value="idLocal" v-model="idWinner">
                            Local
                        </label>
                        <label class="lbl-radio">
                            <input type="radio" name="optradio2" :value="idGuest" v-model="idWinner">
                            Visitante
                        </label>
                    </div>
                    <span v-else class="alert alert-warning span-verify">Seleccione un equipo local y visitante</span>
                </div>
            </div>

            <div class="row">
                <div class="form-group col-sm-12 col-md-6">
                    <label for="time1">Hora de comienzo</label>
                    <input type="time" id="time1" name="time1" min="8:00" max="21:00" v-model="time1" class="form-control" required>
                </div>
                <div class="form-group col-sm-12 col-md-6">
                    <label for="time2">Hora de finalización</label>
                    <input type="time" id="time2" name="time2" min="8:00" max="21:00" v-model="time2" class="form-control" required>
                </div>
            </div>

            <div class="row">
                <div class="form-group col-sm-12 col-md-6">
                    <label for="gameDay">Día del Partido</label>
                    <date-picker v-model="gameDay" lang="es" :width="'100%'" :input-attr="{required: true}"></date-picker>
                </div>
                <div class="form-group col-sm-12 col-md-6">
                    <label for="idReferee">Árbitro</label>
                    <select class="form-control" id="idReferee" name="idReferee" v-model="idReferee" required>
                        <option selected disabled>Elije una opción</option>
                        <option v-for="option in userOptions" :key="option.value" :value="option.value">{{ option.text }}</option>
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
import DatePicker from 'vue2-datepicker';
import matchTypes from '@/types/match';
import leagueTypes from '@/types/league';
import teamTypes from '@/types/team';
import userTypes from '@/types/user';
import fieldTypes from '@/types/field';
import { mapActions } from 'vuex';

export default {
    components: { DatePicker },
    data() {
        return {
            id: null,
            idField: null,
            idLeague: null,
            idLocal: null,
            idGuest: null,
            idReferee: null,
            idWinner: null,
            IsDraw: 0,
            gameDay: null,
            time1: null,
            time2: null,
            fieldOptions: [],
            leagueOptions: [],
            teamOptions: [],
            userOptions: [],
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
            updateMatch: matchTypes.actions.updateMatch,
            getMatch: matchTypes.actions.getMatch,
            getTeams: teamTypes.actions.getTeams,
            getUsers: userTypes.actions.getUsers,
            getLeagues: leagueTypes.actions.getLeagues,
            getFields: fieldTypes.actions.getFields
        }),
        date(value) {
            return value.split('T')[0];
        },
        getData() {
            this.getMatch(this.id)
            
                .then(match => {
                    this.idField = match.data.data.IdField.id
                    this.idLeague = match.data.data.IdLeague.id,
                    this.idLocal = match.data.data.IdLocal.id,
                    this.idGuest = match.data.data.IdGuest.id
                    this.idReferee = match.data.data.IdReferee.id
                    this.idWinner = match.data.data.Winner
                    this.IsDraw = (match.data.data.IsDraw) ? 1 : 0
                    this.time1 = match.data.data.StartGame
                    this.time2 = match.data.data.EndGame
                    this.gameDay = new Date(match.data.data.GameDay)
                })
                .catch(err => console.log('err: ', err))
        },
        beforeUpdateMatch() {
            this.$validator.validateAll()
            if (!this.errors.any()) {
                this.updateMatch({
                    id: this.id,
                    Field: this.idField,
                    League: this.idLeague,
                    Local: this.idLocal,
                    Guest: this.idGuest,
                    Referee: this.idReferee,
                    Winner: this.idWinner,
                    IsDraw: this.IsDraw,
                    StartGame: this.time1,
                    EndGame: this.time2,
                    GameDay: this.GameDay
                })
                .then(
                    match => {
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
        populateTeams() {
            this.getTeams()
            .then(teams => {
                teams.data.data.forEach(e => {
                    this.teamOptions.push({ text: e.TeamName, value: e.id })
                });
            })
        },
        populateUsers() {
            this.getUsers()
            .then(users => {
                users.data.data.forEach(e => {
                    this.userOptions.push({ text: e.FirstName + " " + e.LastName, value: e.id })
                });
            })
        },
        populateLeagues() {
            this.getLeagues()
            .then(leagues => {
                leagues.data.data.forEach(e => {
                    this.leagueOptions.push({ text: e.LeagueName, value: e.id })
                });
            })
        },
        populateFields() {
            this.getFields()
            .then(fields => {
                fields.data.data.forEach(e => {
                    this.fieldOptions.push({ text: e.FieldName, value: e.id })
                });
            })
        }
    },
    mounted() {
        this.populateTeams()
        this.populateUsers()
        this.populateLeagues()
        this.populateFields()
    },
    computed: {
        GameDay() {
            return this.gameDay.getUTCFullYear() + "-" + (this.gameDay.getUTCMonth() + 1) + "-" + this.gameDay.getUTCDate()
        }
    }
}
</script>

<style lang="scss">
    #smf-edit-matches {
        .buttons {
            margin-top: 3em;
        }
        .edit-title {
            color: var(--primary) !important;
        }
        .validation-error {
            text-align: center;
            margin-bottom: 2em;
            width: 100%;
            display: block;
            border-radius: 4px;
        }
        .lbl-radio {
            padding: 0 .3em !important;
        }
    }
</style>
