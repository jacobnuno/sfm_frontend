<template>
    <section id="smf-create-tournament">
        <form @submit.prevent="beforeCreateTournament" class="col-sm-12 col-md-8 offset-md-2">
            <h2 class="create-title">Crear un Torneo</h2>

            <div class="row">
                <div class="form-group col-sm-12 col-md-6">
                    <label for="tournamentName">Nombre</label>
                    <input type="text" autocomplete="off" class="form-control" id="tournamentName" v-model="tournamentName" v-validate="'required|alpha_dash'" data-vv-name="tournamentName" placeholder="Ingresa el nombre" required>
                    <div class="invalid-feedback">{{ errors.first("tournamentName") }}</div>
                </div>

                <div class="form-group col-sm-12 col-md-6">
                    <label for="idLeague">Liga</label>
                    <select class="form-control" id="idLeague" name="idLeague" v-model="idLeague" @change="onChangeLeague($event)" required>
                        <option selected disabled>Elije una opción</option>
                        <option v-for="option in leagueOptions" :key="option.value" :value="option.value">{{ option.text }}</option>
                    </select>
                </div>

            </div>

            <div class="row">
                <div class="form-group col-sm-11 col-md-10">
                    <label for="teams">Equipos</label>
                    <multiselect v-if="idLeague != null" v-model="teams" placeholder="Selecciona algunos equipos" label="name" track-by="code" :selectedLabel="'Seleccionado'" :selectLabel="'Presiona enter para seleccionar'" :deselectLabel="'Presiona enter para eliminar'" :options="teamOptions" :multiple="true" ></multiselect>
                    <span v-else class="alert alert-warning" style="display: block; text-align: center;">Seleccione una Liga</span>
                </div>

                <div class=" col-sm-1 col-md-2">
                    <label for="teams">Añadir Todos</label>
                    <button v-if="idLeague != null" type="button" class="btn btn-primary" @click="addAllTeams">Añadir</button>
                    <span v-else class="alert alert-warning" style="display: block; text-align: center;">Seleccione una Liga</span>
                </div>
            </div>

            

            <span class="alert alert-danger validation-error" v-if="error">A ocurrido un error</span>

            <div class="text-center buttons">
                <div class="form-group">
                    <button type="submit" tabindex=8 class="btn btn-primary">Guardar</button>
                    <router-link class="btn btn-danger btn-close" :to="{ name: 'Tournaments' }">
                        Cerrar
                    </router-link>
                </div>
            </div>
        </form>
    </section>
</template>

<script>
import Multiselect from 'vue-multiselect'
import tournamentTypes from '@/types/tournament';
import teamTypes from '@/types/team';
import leagueTypes from '@/types/league';
import { mapActions } from 'vuex';

export default {
    components: { Multiselect },
    data() {
        return {
            tournamentName: null,
            error: null,
            teams: [],
            allTeams: [],
            teamOptions: [],
            leagueOptions: [],
            idLeague: null
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
            createTournament: tournamentTypes.actions.createTournament,
            getTeamsByLeague: leagueTypes.actions.getTeamsByLeague,
            getLeagues: leagueTypes.actions.getLeagues
        }),
        beforeCreateTournament() {
            this.allTeams = []
            this.teams.forEach(e => {
                this.allTeams.push(e.code)
            })
            this.$validator.validateAll()
            if (!this.errors.any()) {
                this.createTournament({
                    tournament: { Name: this.tournamentName, IdLeague: this.idLeague},
                    teams: this.allTeams
                })
                .then(
                    field => {
                        this.notifyVue('top', 'right', '¡Registrado exitosamente!', 'success')
                        this.$router.push({ name: 'Tournaments'});
                    },
                    error => {
                        console.log(error)
                        this.notifyVue('top', 'right', error, 'danger')
                    }
                )
            }
        },
        addAllTeams() {
            this.teams = []
            this.teamOptions.forEach(e => {
                this.teams.push({ name: e.name, code: e.code })
            });
        },
        onChangeLeague(event) {
            this.populateTeams(event.target.value)
        },
        populateTeams(leagueId) {
            this.teams = []
            this.teamOptions = []
            this.getTeamsByLeague(leagueId)
            .then(teams => {
                teams.data.data.teams.forEach(e => {
                    this.teamOptions.push({ name: e.TeamName, code: e.id })
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
        }
    },
    mounted() {
        this.populateLeagues()
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
        .span-verify {
            display: block;
        }
    }
</style>
