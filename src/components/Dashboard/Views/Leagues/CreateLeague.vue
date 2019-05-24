<template>
    <section id="smf-create-league">
        <form @submit.prevent="beforeCreateLeague" class="col-sm-12 col-md-4 offset-md-4">
            <h2 class="create-title">Crear una Liga</h2>
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
                <label for="idComplex">Complejo</label>
                <select class="form-control" id="idComplex" name="idComplex" v-model="idComplex" required>
                    <option selected disabled>Elije una opción</option>
                    <option v-for="option in complexOptions" :key="option.value" :value="option.value">{{ option.text }}</option>
                </select>
            </div>
            <div class="form-group col-sm-12">
                <label for="idGameDay">Día de Juego</label>
                <select class="form-control" id="idGameDay" name="idGameDay" v-model="idGameDay" required>
                    <option selected disabled>Elije una opción</option>
                    <option v-for="option in gameDayOptions" :key="option.value" :value="option.value">{{ option.text }}</option>
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
import complexTypes from '@/types/complex';
import dayTypes from '@/types/day';
import { mapActions } from 'vuex';

export default {
    components: { DatePicker },
    data() {
        return {
            LeagueName: null,
            idComplex: null,
            complexOptions: [],
            gameDayOptions: [],
            idGameDay: null,
            StartDate: new Date(),
            EndDate: new Date(),
            time1: null,
            time2: null,
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
            create: leagueTypes.actions.create,
            getComplexes: complexTypes.actions.getComplexes,
            getDays: dayTypes.actions.getDays
        }),
        beforeCreateLeague() {
            this.$validator.validateAll()
            if (!this.errors.any()) {
                this.create({
                    LeagueName: this.LeagueName,
                    StartDate: this.time1.getUTCFullYear() + "-" + (this.time1.getUTCMonth() + 1) + "-" + this.time1.getUTCDate(),
                    EndDate: this.time2.getUTCFullYear() + "-" + (this.time2.getUTCMonth() + 1) + "-" + this.time2.getUTCDate(),
                    Complex: this.idComplex,
                    GameDay: this.idGameDay
                })
                .then(
                    league => {
                        this.notifyVue('top', 'right', '¡Registrado exitosamente!', 'success')
                        this.$router.push({ name: 'Leagues'});
                    },
                    error => {
                        console.log(error)
                        this.notifyVue('top', 'right', error, 'danger')
                    }
                ).catch(err => this.notifyVue('top', 'right', err, 'danger'))
            }
        },
        populateComplexes() {
            this.getComplexes()
            .then(complexes => {
                complexes.data.data.forEach(e => {
                    this.complexOptions.push({ text: e.ComplexName, value: e.id })
                });
            })
        },
        populateDays() {
            this.getDays()
            .then(days => {
                days.data.data.forEach(e => {
                    this.gameDayOptions.push({ text: e.Days, value: e.id })
                });
            })
        },
    },
    mounted() {
        this.populateComplexes()
        this.populateDays()
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


