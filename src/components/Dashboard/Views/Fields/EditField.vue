<template>
    <section id="smf-edit-field">
        <form @submit.prevent="beforeUpdateField" class="col-sm-12 col-md-4 offset-md-4">
            <h2 class="edit-title">Editar una Cancha</h2>
            <div class="form-group col-sm-12">
                <label for="FieldName">Nombre de la Cancha</label>
                <input type="text" autocomplete="off" class="form-control" id="FieldName" v-model="FieldName" v-validate="'required|alpha_spaces'" data-vv-name="FieldName" placeholder="Ingresa el nombre" required>
                <div class="invalid-feedback">{{ errors.first("FieldName") }}</div>
            </div>
            
            <div class="form-group col-sm-12">
                <label for="idComplex">Complejo</label>
                <select class="form-control" id="idComplex" name="idComplex" v-model="idComplex" required>
                    <option selected disabled>Elije una opción</option>
                    <option v-for="option in complexOptions" :key="option.value" :value="option.value" :selected="option.value == idComplex">{{ option.text }}</option>
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
import fieldTypes from '@/types/field';
import complexTypes from '@/types/complex';
import { mapActions } from 'vuex';

export default {
    data() {
        return {
            id: null,
            FieldName: null,
            idComplex: null,
            complexOptions: [],
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
            getField: fieldTypes.actions.getField,
            getComplexes: complexTypes.actions.getComplexes
        }),
        getData() {
            this.getField(this.id)
            .then(field => {
                let newField = field.data.data;
                this.FieldName = newField.FieldName
                this.idComplex = newField["Complex Detail"].id
            })
            .catch(err => console.log('err: ', err))
        },
        beforeUpdateField() {
            this.$validator.validateAll()
            if (!this.errors.any()) {
                this.update({
                    id: this.id,
                    FieldName: this.FieldName,
                    Complex: this.idComplex
                })
                .then(
                    field => {
                        this.notifyVue('top', 'right', '¡Actualizado exitosamente!', 'success')
                        this.$router.push({ name: 'Fields'});
                    },
                    error => {
                        console.log(error)
                        this.notifyVue('top', 'right', error, 'danger')
                    }
                )
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
    },
    mounted() {
        this.populateComplexes()
    }
}
</script>

<style lang="scss">
    #smf-edit-field {
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
    }
</style>


