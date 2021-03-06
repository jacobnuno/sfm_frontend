<template>
    <section id="smf-create-team">
        <form @submit.prevent="beforeUpdateTeam" class="col-sm-12 col-md-4 offset-md-4">
            <h2 class="create-title">Editar un Equipo</h2>
            
            <div class="form-group col-sm-12">
                <label for="TeamName">Nombre</label>
                <input type="text" autocomplete="off" class="form-control" id="TeamName" v-model="TeamName" v-validate="'required|alpha_spaces'" data-vv-name="TeamName" placeholder="Ingresa el nombre" required>
                <div class="invalid-feedback">{{ errors.first("TeamName") }}</div>
            </div>

            <div class="form-group col-sm-12">
                <label for="idLeague">Liga</label>
                <select class="form-control" id="idLeague" name="idLeague" v-model="idLeague" required>
                    <option disabled>Elije una opción</option>
                    <option v-for="option in leagueOptions" :key="option.value" :value="option.value" :selected="option.value == idLeague">{{ option.text }}</option>
                </select>
            </div>

            <span class="alert alert-danger validation-error" v-if="error">A ocurrido un error</span>

            <div class="text-center buttons">
                <div class="form-group">
                    <button type="submit" class="btn btn-primary">Guardar</button>
                    <router-link class="btn btn-danger btn-close" :to="{ name: 'Teams' }">
                        Cerrar
                    </router-link>
                </div>
            </div>
        </form>
    </section>
</template>

<script>
import teamTypes from '@/types/team';
import leagueTypes from '@/types/league';
import { mapActions } from 'vuex';

export default {
    data() {
        return {
            id: null,
            TeamName: '',
            idLeague: null,
            leagueOptions: [],
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
            updateTeam: teamTypes.actions.updateTeam,
            getTeam: teamTypes.actions.getTeam,
            getLeagues: leagueTypes.actions.getLeagues
        }),
        getData() {
            this.getTeam(this.id)
                .then(team => {
                    this.TeamName = team.data.data.TeamName,
                    this.idLeague = team.data.data["League Detail"].id
                })
                .catch(err => console.log('err: ', err))
        },
        beforeUpdateTeam() {
            this.$validator.validateAll()
            if (!this.errors.any()) {
                this.updateTeam({
                    id: this.id,
                    TeamName: this.TeamName,
                    League: this.idLeague
                })
                .then(
                    userType => {
                        this.notifyVue('top', 'right', '¡Actualizado exitosamente!', 'success')
                        this.$router.push({ name: 'Teams'});
                    },
                    error => {
                        console.log(error)
                        this.notifyVue('top', 'right', error, 'danger')
                    }
                )
            }
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
    },
}
</script>

<style lang="scss">
    #smf-create-team {
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
