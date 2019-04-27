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
          <button class="btn btn-danger btn-simple" v-on:click="areYouSureAlert(item.id)">
            <fai :icon="['fas', 'trash-alt']" class="icons" />
          </button>
        </td>
      </slot>
    </tr>
    </tbody>
  </table>
</template>
<script>
import { mapActions } from 'vuex';
import fieldType from '@/types/field';
import leagueType from '@/types/league';
import userTypes from '@/types/userType';

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
      redirectEdit: String,
      deleteAction: String
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
      ...mapActions({
        deleteLeague: leagueType.actions.deleteLeague,
        deleteField: fieldType.actions.deleteField,
        deleteUserType: userTypes.actions.deleteUserType
      }),
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
      areYouSureAlert(itemId) {
        this.$swal({
          title: '¿Estás seguro?',
          text: 'No podrás revertir esta acción',
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Elimimar',
          cancelButtonText: 'Cancelar',
          showCloseButton: true,
          showLoaderOnConfirm: true
        }).then((result) => {
          if(result.value) {
            this[`${this.deleteAction}`]({
                id: itemId
            })
            .then(
                res => {
                    this.notifyVue('top', 'right', 'Eliminado exitosamente!', 'success')
                    location.reload();
                },
                error => {
                    console.log(error)
                    this.notifyVue('top', 'right', error, 'danger')
                }
            )
          }
        })
      }
    }
  }
</script>
<style>
</style>
