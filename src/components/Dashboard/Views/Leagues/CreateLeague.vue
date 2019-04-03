<template>
    <section id="smf-create-league">
        <form @submit.prevent="beforeCreateLeague" class="col-sm-12 col-md-8 offset-md-2">
            <h2 class="create-title">Crear una Liga</h2>
            <div class="form-group col-sm-8">
                <label for="LeagueName">Nombre de la Liga</label>
                <input type="text" class="form-control" id="LeagueName" placeholder="Ingresa el nombre">
            </div>
            <div class="form-group col-sm-8">
                <label for="StartDate">Día de Inicio</label>
                <datepicker class="smf-datepicker"></datepicker>
            </div>
            <div class="form-group col-sm-8">
                <label for="StartDate">Día de Finalización</label>
                <datepicker class="smf-datepicker"></datepicker>
            </div>
            <div class="form-group col-sm-8">
                <label for="Complex">Complejo</label>
                <select class="form-control" id="Complex">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                </select>
            </div>
            <div class="form-group col-sm-8">
                <label for="GameDay">Día de Juego</label>
                <select class="form-control" id="GameDay">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                </select>
            </div>
            
            <div class="text-center buttons">
                <div class="form-group">
                    <button type="submit" tabindex=8 class="btn btn-primary">Guardar</button>
                    <a class="btn btn-danger btn-close" tabindex=9 href="">Cancelar</a>
                </div>
            </div>
        </form>
    </section>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
export default {
    components: {
    Datepicker
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
    }

</style>


