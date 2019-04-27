<template>
    <section id="smf-create-field">
        <form @submit.prevent="beforeCreateField" class="col-sm-12 col-md-4 offset-md-4">
            <h2 class="create-title">Crear una cancha</h2>
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
                    <button type="submit" tabindex=8 class="btn btn-primary">Guardar</button>
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
import { mapActions } from 'vuex';

export default {
    data() {
        return {
            FieldName: '',
            Complex: '',
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
            create: fieldTypes.actions.createField
        }),
        beforeCreateField() {
            this.create({
                FieldName: this.FieldName,
                Complex: this.Complex
            })
            .then(
                field => {
                    this.notifyVue('top', 'right', '¡Registrado exitosamente!', 'success')
                    this.$router.push({ name: 'Fields'});
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


