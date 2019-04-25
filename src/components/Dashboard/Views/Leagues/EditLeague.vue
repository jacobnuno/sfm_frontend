<template>
    <section id="smf-create-league">
        <form @submit.prevent="beforeUpdateLeague" class="col-sm-12 col-md-4 offset-md-4">
            <h2 class="create-title">Editar una Liga</h2>
            <div class="form-group col-sm-12">
                <label for="LeagueName">Nombre de la Liga</label>
                <input type="text" autocomplete="off" class="form-control" id="LeagueName" v-model="LeagueName" v-validate="'required|alpha_spaces'" data-vv-name="LeagueName" placeholder="Ingresa el nombre" required>
                <div class="invalid-feedback">{{ errors.first("LeagueName") }}</div>
            </div>
            <div class="form-group col-sm-12">
                <label for="StartDate">Día de Inicio</label>
                <date-picker v-model="time1" lang="es" :width="'100%'" :input-attr="{required: true}"></date-picker>
            </div>
            <div class="form-group col-sm-12">
                <label for="EndDate">Día de Finalización</label>
                <date-picker v-model="time2" lang="es" :width="'100%'" :input-attr="{required: true}"></date-picker>
            </div>
            
            <div class="form-group col-sm-12">
                <label for="Complex">Complejo</label>
                <select class="form-control" id="Complex" name="Complex" v-model="Complex" required>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                </select>
            </div>
            <div class="form-group col-sm-12">
                <label for="GameDay">Día de Juego</label>
                <select class="form-control" id="GameDay" name="GameDay" v-model="GameDay" required>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                </select>
            </div>

            <span class="alert alert-danger validation-error" v-if="error">A ocurrido un error</span>
            
            <div class="text-center buttons">
                <div class="form-group">
                    <button type="submit" class="btn btn-primary">Guardar</button>
                    <router-link class="btn btn-danger btn-close" :to="{ name: 'Leagues' }">
                        Cerrar
                    </router-link>
                </div>
            </div>
        </form>
    </section>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import leagueTypes from '@/types/league';
import { mapActions } from 'vuex';

export default {
    components: { DatePicker },
    data() {
        return {
            id: null,
            LeagueName: '',
            Complex: '',
            GameDay: '',
            StartDate: new Date(),
            EndDate: new Date(),
            time1: null,
            time2: null,
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
            update: leagueTypes.actions.updateLeague,
            getLeague: leagueTypes.actions.getLeague
        }),
        date(value) {
            return value.split('T')[0];
        },
        getData() {
            this.getLeague(this.id)
            .then(league => {
                console.log('leagues: ', league.data.data)
                let newLeague = league.data.data;
                this.LeagueName = newLeague.LeagueName
                this.time1 = new Date(newLeague.StartDate)
                this.time2 = new Date(newLeague.EndDate)
                this.GameDay = newLeague.Day.id
                this.Complex = newLeague["Complex Detail"].id
            })
            .catch(err => console.log('err: ', err))
        },
        beforeUpdateLeague() {
            this.update({
                id: this.id,
                LeagueName: this.LeagueName,
                StartDate: this.time1.getUTCFullYear() + "-" + (this.time1.getUTCMonth() + 1) + "-" + this.time1.getUTCDate(),
                EndDate: this.time2.getUTCFullYear() + "-" + (this.time2.getUTCMonth() + 1) + "-" + this.time2.getUTCDate(),
                Complex: this.Complex,
                GameDay: this.GameDay
            })
            .then(
                league => {
                    this.notifyVue('top', 'right', '¡Actualizado exitosamente!', 'success')
                    this.$router.push({ name: 'Leagues'});
                },
                error => {
                    console.log(error)
                    this.notifyVue('top', 'right', error, 'danger')
                }
            )
        }
    }
}
</script>

<style lang="scss">
    #smf-create-league {
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


