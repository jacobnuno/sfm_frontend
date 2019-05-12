<template>
    <section id="smf-edit-athletes">
        <form @submit.prevent="beforeUpdateAthlete" class="col-sm-12 col-md-6 offset-md-3">
            <h2 class="edit-title">Editar un Jugador</h2>
            
            <div class="row">
                <div class="form-group col-sm-12 col-md-6">
                    <label for="idUser">Usuario</label>
                    <select class="form-control" id="idUser" name="idUser" v-model="idUser" required>
                        <option selected disabled>Elije una opción</option>
                        <option v-for="option in userOptions" :key="option.value" :value="option.value">{{ option.text }}</option>
                    </select>
                </div>
                <div class="form-group col-sm-12 col-md-6">
                    <label for="BirthDate">Fecha de Nacimiento</label>
                    <date-picker v-model="time1" lang="es" :width="'100%'" :input-attr="{required: true}"></date-picker>
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
                    <label class="control-label" for="mRadio">¿Es capitán?</label>
                    <div id="mRadio" class="form-control">
                        <label class="lbl-radio">
                            <input type="radio" name="optradio" value="1" v-model="isCaptain">
                            Si
                        </label>
                        <label class="lbl-radio">
                            <input type="radio" name="optradio" value="0" v-model="isCaptain">
                            No
                        </label>
                    </div>
                </div>
            </div>

            <span class="alert alert-danger validation-error" v-if="error">A ocurrido un error</span>

            <div class="text-center buttons">
                <div class="form-group">
                    <button type="submit" class="btn btn-primary">Guardar</button>
                    <router-link class="btn btn-danger btn-close" :to="{ name: 'Athletes' }">
                        Cerrar
                    </router-link>
                </div>
            </div>
        </form>
    </section>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import teamTypes from '@/types/team';
import userTypes from '@/types/user';
import athleteTypes from '@/types/athlete';
import { mapActions } from 'vuex';

export default {
    components: { DatePicker },
    data() {
        return {
            id: null,
            idUser: '',
            idTeam: null,
            userOptions: [],
            teamOptions: [],
            BirthDate: new Date(),
            time1: null,
            isCaptain: 0,
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
            updateAthlete: athleteTypes.actions.updateAthlete,
            getAthlete: athleteTypes.actions.getAthlete,
            getTeams: teamTypes.actions.getTeams,
            getUsers: userTypes.actions.getUsers
        }),
        getData() {
            this.getAthlete(this.id)
                .then(athelete => {
                    this.idUser = athelete.data.data["Id User"].id
                    this.time1 = new Date(athelete.data.data.BirthDate)
                    this.idTeam = athelete.data.data["Athlete Team"].id
                    this.isCaptain = (athelete.data.data.Captain) ? 1 : 0
                })
                .catch(err => console.log('err: ', err))
        },
        beforeUpdateAthlete() {
            this.updateAthlete({
                id: this.id,
                User: this.idUser,
                BirthDate: this.time1.getUTCFullYear() + "-" + (this.time1.getUTCMonth() + 1) + "-" + this.time1.getUTCDate(),
                Team: this.idTeam,
                Captain: this.isCaptain
            })
            .then(
                athlete => {
                    this.notifyVue('top', 'right', '¡Actualizado exitosamente!', 'success')
                    this.$router.push({ name: 'Athletes'});
                },
                error => {
                    console.log(error)
                    this.notifyVue('top', 'right', error, 'danger')
                }
            )
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
                users.data.data.rows.forEach(e => {
                    this.userOptions.push({ text: e.FirstName + " " + e.LastName, value: e.id })
                });
            })
        }
    },
    mounted() {
        this.populateTeams(),
        this.populateUsers()
    },
}
</script>

<style lang="scss">
    #smf-edit-athletes {
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
