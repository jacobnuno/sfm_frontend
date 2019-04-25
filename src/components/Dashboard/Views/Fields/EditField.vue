<template>
    <section id="smf-create-field">
        <form @submit.prevent="beforeUpdateField" class="col-sm-12 col-md-4 offset-md-4">
            <h2 class="create-title">Editar una Cancha</h2>
            <div class="form-group col-sm-12">
                <label for="FieldName">Nombre de la Cancha</label>
                <input type="text" autocomplete="off" class="form-control" id="FieldName" v-model="FieldName" v-validate="'required|alpha_spaces'" data-vv-name="FieldName" placeholder="Ingresa el nombre" required>
                <div class="invalid-feedback">{{ errors.first("FieldName") }}</div>
            </div>
            
            <div class="form-group col-sm-12">
                <label for="Complex">Complejo</label>
                <select class="form-control" id="Complex" name="Complex" v-model="Complex" required>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                </select>
            </div>
            
            <span class="alert alert-danger validation-error" v-if="error">A ocurrido un error</span>
            
            <div class="text-center buttons">
                <div class="form-group">
                    <button type="submit" class="btn btn-primary">Guardar</button>
                    <router-link class="btn btn-danger btn-close" :to="{ name: 'Fields' }">
                        Cerrar
                    </router-link>
                </div>
            </div>
        </form>
    </section>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import fieldTypes from '@/types/field';
import { mapActions } from 'vuex';

export default {
    components: { DatePicker },
    data() {
        return {
            id: null,
            FieldName: '',
            Complex: '',
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
            update: fieldTypes.actions.updateField,
            getField: fieldTypes.actions.getField
        }),
        getData() {
            this.getLeague(this.id)
            .then(field => {
                console.log('fields: ', field.data.data)
                let newField = field.data.data;
                this.FieldName = newField.FieldName
                this.Complex = newLeague["Complex Detail"].id
            })
            .catch(err => console.log('err: ', err))
        },
        beforeUpdateField() {
            this.update({
                id: this.id,
                FieldName: this.FieldName,
                Complex: this.Complex
            })
            .then(
                field => {
                    this.notifyVue('top', 'right', '¡Actualizado exitosamente!', 'primary')
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
    #smf-create-field {
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


