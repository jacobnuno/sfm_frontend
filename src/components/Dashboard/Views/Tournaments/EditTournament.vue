<template>
    <section id="smf-edit-tournament">
        <form @submit.prevent="beforeUpdateTournament" class="col-sm-12 col-md-8 offset-md-2">
            <h2 class="create-title">Editar un Torneo</h2>
            
            <div class="row">
                <div class="form-group col-sm-12 col-md-6">
                    <label for="tournamentName">Nombre</label>
                    <input type="text" autocomplete="off" class="form-control" id="tournamentName" v-model="tournamentName" v-validate="'required|alpha_dash'" data-vv-name="tournamentName" placeholder="Ingresa el nombre" required>
                    <div class="invalid-feedback">{{ errors.first("tournamentName") }}</div>
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
                    <button type="submit" class="btn btn-primary">Guardar</button>
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
            id: null,
            tournamentName: null,
            error: null,
            teams: [],
            allTeams: [],
            teamOptions: [],
            idLeague: null
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
            updateTournament: tournamentTypes.actions.updateTournament,
            getTournament: tournamentTypes.actions.getTournament,
            getTeamsByLeague: leagueTypes.actions.getTeamsByLeague
        }),
        getData() {
        this.getTournament(this.id)
            .then(tournament => {
                this.tournamentName = tournament.data.data.Name
                this.idLeague = tournament.data.data.IdLeague
                this.populateTeams(this.idLeague)
                tournament.data.data.TournamentDetails.forEach(e => {
                    this.teams.push({ name: e.idTeam.TeamName, code: e.idTeam.id })
                });
            })
            .catch(err => console.log('err: ', err))
        },
        beforeUpdateTournament() {
            this.allTeams = []
            this.teams.forEach(e => {
                this.allTeams.push(e.code)
            })
            this.$validator.validateAll()
            if (!this.errors.any()) {
                this.updateTournament({
                    id: this.id,
                    tournament: { Name: this.tournamentName },
                    teams: this.allTeams
                })
                .then(
                    tournament => {
                        this.notifyVue('top', 'right', '¡Actualizado exitosamente!', 'success')
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
    }
}
</script>

<style lang="scss" src="vue-multiselect/dist/vue-multiselect.min.css">
    #smf-edit-tournament {
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
