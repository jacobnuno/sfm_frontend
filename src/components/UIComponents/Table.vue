<template>
  <table class="table">
    <thead>
      <slot name="columns">
        <th v-for="column in columns">{{column}}</th>
        <th>Opciones</th>
      </slot>
    </thead>
    <tbody>
    <tr v-for="item in data">
      <slot :row="item">
        <td v-for="column in columns" v-if="hasValue(item, column)">{{ itemValue(item, column) }}</td>
        <td>
          <button class="btn btn-primary btn-simple" v-on:click="send(redirectShow, item.id)">
            <fai :icon="['far', 'eye']" class="icons" />
          </button>
          <button class="btn btn-warning btn-simple" v-on:click="send(redirectEdit, item.id)">
            <fai :icon="['fas', 'pencil-alt']" class="icons" />
          </button>
          <button class="btn btn-danger btn-simple" v-on:click="areYouSureAlert()">
            <fai :icon="['fas', 'trash-alt']" class="icons" />
          </button>
        </td>
      </slot>
    </tr>
    </tbody>
  </table>
</template>
<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEye } from '@fortawesome/fontawesome-free-regular'
import { faPencilAlt } from '@fortawesome/fontawesome-free-solid'
import { faTrashAlt } from '@fortawesome/fontawesome-free-solid'
library.add(faEye)
library.add(faPencilAlt)
library.add(faTrashAlt)

  export default {
    name: 'l-table',
    props: {
      columns: Array,
      data: Array,
      redirectShow: String,
      redirectEdit: String
    },
    methods: {
      hasValue (item, column) {
        return item[column.toLowerCase()] !== 'undefined'
      },
      itemValue (item, column) {
        return item[column.toLowerCase()]
      },
      send(route, itemId) {
        this.$router.push({ name: route, params: { id: itemId } }) 
      },
      areYouSureAlert() {
        this.$swal({
          title: '¿Estás seguro?',
          text: 'No podrás revertir esta acción',
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: '¡Si, Elimínalo!',
          cancelButtonText: '¡Cancelar!',
          showCloseButton: true,
          showLoaderOnConfirm: true
        }).then((result) => {
          if(result.value) {
            this.$swal('Eliminado', 'Se ha eliminado satisfactoriamente', 'success')
          } else {
            this.$swal('Cancelado', 'Se ha cancelado', 'info')
          }
        })
      }
    }
  }
</script>
<style>
</style>
